import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Define a interface FooterProps
interface FooterProps {
  iconColor?: string;
  iconSize?: number;
}

// Define o componente Footer
const Footer: React.FC<FooterProps> = ({
  iconColor = "#4a5d6b",
  iconSize = 24,
}) => {
  const handleIconError = (error: Error) => {
    console.error("Erro ao carregar o ícone:", error);
    Alert.alert("Erro", "Não foi possível carregar o ícone.");
  };

  return (
    <View style={styles.footer}>
      <View style={styles.iconButton}>
        <Icon
          name="fort-awesome"
          size={iconSize}
          color={iconColor}
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
