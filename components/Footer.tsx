import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from "react-native";
import logoSource from "../assets/footer.png";

interface FooterProps {
  logoWidth?: number;
  logoHeight?: number;
}

const Footer: React.FC<FooterProps> = ({
  logoWidth = 200,
  logoHeight = 50,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleFooterImageError = (
    error: NativeSyntheticEvent<ImageErrorEventData>
  ) => {
    console.error(
      `Erro ao carregar a imagem ${logoSource}:`,
      error.nativeEvent.error
    );
    setImageError(true);
  };

  return (
    <View style={styles.footer}>
      {imageError ? (
        <View style={styles.errorContainer}>
          {/* Caso queira exibir algo em caso de erro, pode colocar aqui */}
        </View>
      ) : (
        <Image
          source={logoSource}
          style={{ width: logoWidth, height: logoHeight }}
          onError={handleFooterImageError}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#13f8c4",
    backgroundColor: "#000",
  },
  errorContainer: {
    // Estilos para o container de erro, se necessário
  },
});

export default Footer;
