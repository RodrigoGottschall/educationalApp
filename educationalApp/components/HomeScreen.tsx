import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';

interface Student {
  picture: { large: string };
  name: { first: string; last: string };
  gender: string;
  dob: { date: string };
}

const HomeScreen: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=20');
        const data = await response.json();
        setStudents(data.results);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) && (!filter || student.gender === filter);
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InnovateTech Students</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Filtrar por gênero"
          onChangeText={setFilter}
          value={filter}
        />
      </View>

      <FlatList
        data={filteredStudents}
        horizontal
        keyExtractor={(item) => item.dob.date}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.picture.large }} style={styles.avatar} />
            <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
            <Text style={styles.info}>Gênero: {item.gender}</Text>
            <Text style={styles.info}>Nascimento: {new Date(item.dob.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5', // Cor de fundo suave
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Cor de texto escura
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff', // Fundo branco para o input
  },
  filterInput: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    width: 200, // Largura do card
    marginRight: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra para Android
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#666', // Cor de texto mais clara
  },
});

export default HomeScreen;
