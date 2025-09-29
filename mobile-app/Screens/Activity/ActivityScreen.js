import React, {  useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Button } from "react-native-elements";


const db = getFirestore();

export default function ActivityScreen() {
    const [ nextReservation, setNextReservation ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const q = query(
            collection(db, "reservas"),
            where("userId", "==", auth.currentUser.uid),
            where("estado", "==", "activa")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const reservations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const ordenadas = reservations.sort((a, b) => {
                    const dateA = new Date(`${a.fecha}T${a.hora}`);
                    const dateB = new Date(`${b.fecha}T${b.hora}`);
                    return dateA - dateB;
                });
                setNextReservation(ordenadas[0]);
            } else {
                setNextReservation(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
        if (nextReservation) {
            const now = new Date();
            const startReservation = new Date(`${startReservation.fecha} ${startReservation.hora}`);
            if (now >= startReservation) {
                setNextReservation((prev) => ({ ...prev, stateUI: "activa" }));
            }
        }
    }, 10000);

    return () => clearInterval(interval);
}, [startReservation]);

    const handleCancelReservation = async () => {
        if (!nextReservation || !nextReservation.id) {
            Alert.alert("Error", "No se encontro la reserva")
            return;
        }

        Alert.alert(
            "Cancelar Reserva",
            "¿Estás seguro de que deseas cancelar esta reserva?",
            [
                {text: "No"},
                {text: "SI",
                    onPress: async () => {
                        try {
                            const reservationRef = doc(db, "reservas", String(nextReservation.id));
                            await updateDoc(reservationRef, { estado: "cancelada" });
                            Alert.alert("Reserva cancelada exitosamente.");
                        } catch (error) {
                            console.error("Error al cancelar la reserva: ", error);
                            Alert.alert("Error al cancelar la reserva. Inténtalo de nuevo.");
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!nextReservation) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No tienes reservas activas.</Text>
                <Text style={styles.subtitle}> Crea una reserva para disfrutar de ParqueoSeguro 🚗 </Text>
            </View>
        );
    }

    const now = new Date();
    const startReservation = new Date(`${nextReservation.fecha}T${nextReservation.hora}`);
    const isActive = nextReservation.stateUI === "activa" || now >= startReservation;

    return (
        <View style={styles.container}>
            {isActive ? (
                <>
                    <Text style= {styles.title} >Reserva Activa</Text>
                    <Text >Parqueadero: {nextReservation.parqueadero}</Text>
                    <Text >Placa: {nextReservation.placa}</Text>
                    <Text >Vehiculo: {nextReservation.vehiculo}</Text>
                    <Text >Fecha: {nextReservation.fecha}</Text>
                    <Text >Hora: {nextReservation.hora}</Text>
                    <View style={{ marginTop: 20 }}>
                        <Button title="Cancelar reserva" color="#ff4d4d" onPress={handleCancelReservation}/>
                    </View>
                </>
            ) : (
                <>
                <Text style={styles.title}> Proxima Reserva</Text>
                <Text>Parqueadero: {nextReservation.parqueadero}</Text>
                <Text>Placa: {nextReservation.placa}</Text>
                <Text>Vehiculo: {nextReservation.vehiculo}</Text>
                <Text>Fecha: {nextReservation.fecha}</Text>
                <Text>Se activara a las {nextReservation.hora} </Text>
                <View style={{ marginTop: 20 }}>
                        <Button title="Cancelar reserva" color="#ff4d4d" onPress={handleCancelReservation}/>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },

    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        width: "90%",
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        marginBottom: 5
    },
    status: {
        marginTop: 10,
        fontSize: 14,
        color: "green",
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    }
    },
);