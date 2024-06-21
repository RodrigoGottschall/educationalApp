import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import StudentDetailsModal from "./StudentDetailsModal";
import Footer from "./Footer";
import { Student, StudentContext } from "../StudentContext";

const HomeScreen: React.FC = () => {
  const { students, isLoading, page, setPage } = useContext(StudentContext);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEndReached = () => {
    setPage(page + 1);
  };

  const numColumns = 1;

  const { width } = Dimensions.get("window");

  const cardWidth = (width - 40 - 10) / numColumns;

  const handleCardPress = (student: Student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
        <Text style={styles.title}>LO Personal</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Vídeos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Links</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#758494" />
        </View>
      ) : (
        <FlatList
          key={numColumns.toString()}
          data={students}
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

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#13f8c4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
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
    backgroundColor: "white",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    borderColor: "#13f8c4",
    borderWidth: 2,
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomeScreen;
