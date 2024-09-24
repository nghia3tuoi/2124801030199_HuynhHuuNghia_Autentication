import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../utils/colors";

export default function ModalRegister({
  isModal,

  error,
  onPress,
}: any) {
  return (
    <Modal
      animationType="fade" // Hoặc 'fade' hoặc 'none'
      transparent={true} // Nếu bạn muốn nền phía sau modal mờ
      visible={isModal} // Kiểm soát trạng thái hiển thị modal
      // onRequestClose={() => setModalVisible(false)} // Xử lý khi modal bị đóng
    >
      <View style={styles.centeredView}>
        {error && (
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.modalText}>{error}</Text>
              <View>
                <Ionicons name="close-circle" size={60} color="red" />
              </View>
            </View>
          </View>
        )}
        {!error && (
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={onPress}
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.modalText}>Đăng kí thành công!</Text>
              <View>
                <Ionicons name="checkmark-circle" size={60} color="green" />
              </View>
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
});
