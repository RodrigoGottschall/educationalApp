import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import LoadingScreen from "./components/LoadingScreen";
import HomeScreen from "./components/HomeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <LoadingScreen logoSource={require("./assets/logo.png")} />
        ) : (
          <HomeScreen />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
