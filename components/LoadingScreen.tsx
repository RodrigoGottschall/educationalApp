import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Alert,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from "react-native";

interface LoadingScreenProps {
  logoSource: { uri: string };
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ logoSource }) => {
  const handleImageError = (
    error: NativeSyntheticEvent<ImageErrorEventData>
  ) => {
    console.error("Erro ao carregar o logo:", error.nativeEvent.error);
    Alert.alert("Erro", "Não foi possível carregar o logo.");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={logoSource}
        style={styles.imageBackground}
        onError={handleImageError}
        resizeMode="cover" // Cobre a tela inteira, ajustando a imagem
      >
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1, // Ocupa a tela inteira
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicatorContainer: {
    // Garante que o indicador fique centralizado
    position: "absolute",
  },
});

export default LoadingScreen;
