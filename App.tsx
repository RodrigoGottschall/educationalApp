import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import LoadingScreen from "./components/LoadingScreen";
import HomeScreen from "./components/HomeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StudentContextProvider } from "./StudentContext";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simula o carregamento da tela
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <StudentContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <LoadingScreen logoSource={require("./assets/logo.png")} />
          ) : (
            <HomeScreen />
          )}
        </View>
      </GestureHandlerRootView>
    </StudentContextProvider>
  );
};

export default App;
