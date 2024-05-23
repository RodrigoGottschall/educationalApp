import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="fort-awesome" size={24} color="#4a5d6b" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#ced8e0'
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default Footer;
