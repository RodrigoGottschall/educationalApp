import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen logoSource={require('./assets/logo.png')} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('./assets/logo.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      )}
    </View>
  );
};

export default App;
