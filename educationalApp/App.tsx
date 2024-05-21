import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import LoadingScreen from './components/LoadingScreen'; // Importe o componente
import logoInnovateTech from './assets/logo.png'; // Importe o logo

const HomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  return (
    <View>
      <LoadingScreen logoSource={logoInnovateTech} />
    </View>
  );
};
