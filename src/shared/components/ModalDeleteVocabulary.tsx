import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";

export default function ModalDeleteVocabulary({
  isModalDelete,
  handleToggleModalDelete,
  handleDeleteVocabulary,
  vocabularyCurrent,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal
      animationType="fade" // Hoặc 'fade' hoặc 'none'
      transparent={true} // Nếu bạn muốn nền phía sau modal mờ
      visible={isModalDelete} // Kiểm soát trạng thái hiển thị modal
      // onRequestClose={() => setModalVisible(false)} // Xử lý khi modal bị đóng
    >
      <View style={styles.centeredView}>
        {isLoading && <ActivityIndicator size={36} color={"white"} />}
        {!isLoading && (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Xác Nhận Xóa</Text>
            <Text style={styles.modalMessage}>
              Bạn có chắc chắn muốn xóa vocabulary này không?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={async () => {
                  setIsLoading(true);
                  await handleDeleteVocabulary(vocabularyCurrent);
                  setIsLoading(false);
                }}
                style={{
                  backgroundColor: "red",
                  width: 60,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleToggleModalDelete}
                style={{
                  backgroundColor: "green",
                  width: 60,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Nền mờ phía sau modal
  },
  modalView: {
    width: "60%",
    height: "20%",
    justifyContent: "space-between",
    backgroundColor: "grey",
    borderRadius: 10,
    shadowColor: "#000",
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
