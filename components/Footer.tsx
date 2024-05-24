import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Footer: React.FC = () => {
  const handleIconError = (error: Error) => {
    console.error("Erro ao carregar o ícone:", error);
    Alert.alert("Erro", "Não foi possível carregar o ícone.");
  };

  return (
    <View style={styles.footer}>
      <View style={styles.iconButton}>
        <Icon
          name="fort-awesome"
          size={24}
          color="#4a5d6b"
          onError={handleIconError}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#a7b1bb",
    backgroundColor: "#ced8e0",
  },
  iconButton: {
    alignItems: "center",
  },
});

export default Footer;