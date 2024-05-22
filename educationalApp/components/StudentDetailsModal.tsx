import React from 'react';
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface StudentDetailsModalProps {
  student: Student | null;
  isVisible: boolean;
  onClose: () => void;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, isVisible, onClose }) => {
  if (!student) return null;

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Image source={{ uri: student.picture.large }} style={styles.modalAvatar} />
        <Text style={styles.modalName}>{student.name.first} {student.name.last}</Text>
        <Text style={styles.modalInfo}>Email: {student.email}</Text>
        <Text style={styles.modalInfo}>Gênero: {student.gender}</Text>
        <Text style={styles.modalInfo}>Nascimento: {new Date(student.dob.date).toLocaleDateString()}</Text>
        <Text style={styles.modalInfo}>Telefone: {student.phone}</Text>
        <Text style={styles.modalInfo}>Nacionalidade: {student.nat}</Text>
        <Text style={styles.modalInfo}>Endereço: {student.location.street.name}, {student.location.street.number}, {student.location.city}, {student.location.state} - {student.location.postcode}</Text>
        <Text style={styles.modalInfo}>ID: {student.id.name} {student.id.value}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StudentDetailsModal;
