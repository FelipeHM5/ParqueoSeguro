// components/CustomHeader.js
import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const logo = require("../assets/iconoAuto.png"); 

export default function CustomHeader({ onSearchPress, onMenuPress }) {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />

      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onSearchPress}>
          <Ionicons name="search" size={24} color="white" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu" size={28} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#17224d",
    paddingTop: 40, // Para dispositivos con notch
    paddingBottom: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 150, // Altura del header
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 15,
  },
});
