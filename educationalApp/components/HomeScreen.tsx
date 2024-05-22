import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=20&page=${page}`);
        const data = await response.json();
        setStudents(prevStudents => [...prevStudents, ...data.results]);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [page]);

  const filteredStudents = students.filter(student => {
    const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) && (!filter || student.gender === filter);
  });

  const handleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const numColumns = 1;
  const { width } = Dimensions.get('window');
  const cardWidth = (width - 40 - 10) / numColumns;

  const renderItem = ({ item }: { item: Student }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: item.picture.large }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.info}>{item.gender}</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.info}>{new Date(item.dob.date).toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>InnovateTech</Text>
        <View style={styles.searchContainerOuter}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Busca..."
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
            <View style={styles.searchIconContainer}>
              <Icon name="user" size={20} color="#999" />
            </View>
          </View>
          <TouchableOpacity style={styles.iconButton}>
          <View style={styles.searchIconContainer}>
              <Icon name="filter" size={30} color="#999" />
            </View> 
          </TouchableOpacity>
        </View>
      </View>

      {isLoading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          key={numColumns.toString()}
          data={filteredStudents}
          numColumns={numColumns}
          keyExtractor={(item) => item.dob.date}
          contentContainerStyle={styles.cardList}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isLoading && page > 1 ? (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color="#007AFF" />
                <Text style={styles.loadingMoreText}>CARREGANDO MAIS</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    maxWidth: '80%',
  },
  searchContainerOuter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  searchIconContainer: {
    paddingHorizontal: 10,  
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    fontSize: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'row', 
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15, 
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center', 
  },
  infoRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10, 
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  loadingMoreContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  loadingMoreText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
