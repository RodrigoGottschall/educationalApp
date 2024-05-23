import React from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";

interface LoadingScreenProps {
  logoSource: any;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ logoSource }) => {
  return (
    <View style={styles.container}>
      <Image source={logoSource} style={styles.logo} />
      <ActivityIndicator size="large" color="#007AFF" />
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
