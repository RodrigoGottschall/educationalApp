import React, { useContext, useState } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import StudentDetailsModal from "./StudentDetailsModal";
import Footer from "./Footer";
import FilterIconButton from "./FilterIconButton";
import { Student, StudentContext } from "../StudentContext";

// Define o componente HomeScreen como uma função React
const HomeScreen: React.FC = () => {
  const { students, isLoading, filter, page, error, setFilter, setPage } =
    useContext(StudentContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função para buscar os alunos
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) &&
      (!filter || student.gender === filter)
    );
  });

  // Função para lidar com o fim da lista
  const handleEndReached = () => {
    setPage(page + 1);
  };

  // Define o número de colunas
  const numColumns = 1;
  // Define o tamanho da tela
  const { width } = Dimensions.get("window");
  // Define o tamanho do card
  const cardWidth = (width - 40 - 10) / numColumns;

  // Função para lidar com o clique no card
  const handleCardPress = (student: Student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Função para lidar com o filtro
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setPage(1);
  };

  // Função que renderiza os cards
  const renderItem = ({ item }: { item: Student }) => (
    <TouchableOpacity
      onPress={() => handleCardPress(item)}
      style={[styles.card, { width: cardWidth }]}
    >
      <Image source={{ uri: item.picture.large }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>
          {item.name.first} {item.name.last}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.info}>{item.gender}</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.info}>
            {new Date(item.dob.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
              <Icon name="user" size={20} color="#758494" />
            </View>
          </View>
          <FilterIconButton onFilterChange={handleFilterChange} />
        </View>
      </View>

      {isLoading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#758494" />
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
            isLoading ? (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color="#758494" />
                <Text style={styles.loadingMoreText}>CARREGANDO MAIS</Text>
              </View>
            ) : null
          }
        />
      )}

      <StudentDetailsModal
        student={selectedStudent}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
    maxWidth: "80%",
  },
  searchContainerOuter: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  searchIconContainer: {
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
    paddingLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
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
    justifyContent: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: "#666",
  },
  loadingMoreContainer: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 80,
  },
  loadingMoreText: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },
});

export default HomeScreen;
