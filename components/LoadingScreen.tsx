import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  Alert,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from "react-native";

// Define a interface para o componente LoadingScreen
interface LoadingScreenProps {
  logoSource: { uri: string };
}

// Define o componente LoadingScreen
const LoadingScreen: React.FC<LoadingScreenProps> = ({ logoSource }) => {
  // Função para lidar com erros ao carregar o logo
  const handleImageError = (
    error: NativeSyntheticEvent<ImageErrorEventData>
  ) => {
    console.error("Erro ao carregar o logo:", error.nativeEvent.error);
    Alert.alert("Erro", "Não foi possível carregar o logo.");
  };

  return (
    <View style={styles.container}>
      <Image
        source={logoSource}
        style={styles.logo}
        onError={handleImageError}
      />
      <ActivityIndicator size="large" color="#758494" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default LoadingScreen;
