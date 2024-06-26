import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  NativeSyntheticEvent,
  ImageErrorEventData,
} from "react-native";
import { Student } from "../StudentContext";
import { Modalize } from "react-native-modalize";

// Define a interface para as propriedades do componente StudentDetailsModal
interface StudentDetailsModalProps {
  student: Student | null;
  isVisible: boolean;
  onClose: () => void;
}

// Define o componente StudentDetailsModal
const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  student,
  isVisible,
  onClose,
}) => {
  if (!student) return null;
  // Referência para o componente Modalize
  const modalizeRef = useRef<Modalize>(null);

  // Verifica se a modal deve ser aberta ou fechada
  useEffect(() => {
    if (isVisible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [isVisible]);

  // Função para lidar com erros ao carregar a imagem do estudante
  const handleError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.error(
      "Erro ao carregar imagem do estudante:",
      error.nativeEvent.error
    );
    Alert.alert("Erro", "Ocorreu um erro ao carregar a imagem do estudante.");
  };

  // Retorna o componente Modalize
  return (
    <Modalize ref={modalizeRef} adjustToContentHeight={true} onClosed={onClose}>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: student?.picture.large }}
          style={styles.modalAvatar}
          onError={handleError}
        />
        <View style={styles.modalContainer}>
          <Text style={styles.modalName}>
            {student?.name.first} {student?.name.last}
          </Text>
          <Text style={styles.modalInfo}>Email: {student?.email}</Text>
          <Text style={styles.modalInfo}>Gênero: {student?.gender}</Text>
          <Text style={styles.modalInfo}>
            Nascimento:{" "}
            {student && new Date(student.dob.date).toLocaleDateString()}
          </Text>
          <Text style={styles.modalInfo}>Telefone: {student?.phone}</Text>
          <Text style={styles.modalInfo}>Nacionalidade: {student?.nat}</Text>
          <Text style={styles.modalInfo}>
            Endereço: {student?.location.street.name},{" "}
            {student?.location.street.number}, {student?.location.city},{" "}
            {student?.location.state} - {student?.location.postcode}
          </Text>
          <Text style={styles.modalInfo}>
            ID: {student?.id.name} {student?.id.value}
          </Text>
        </View>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 50,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  modalAvatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default StudentDetailsModal;
