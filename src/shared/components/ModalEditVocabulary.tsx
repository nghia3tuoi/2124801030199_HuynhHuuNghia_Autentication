import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../utils/colors";
import { useEffect, useState } from "react";

export default function ModalEditVocabulary({
  isModalEdit,
  handleToggleModalEdit,
  handleUpdateVocabulary,
  vocabularyCurrent,
}: any) {
  // Chỉ cập nhật khi vocabularyCurrent thay đổi
  const [isLoading, setIsLoading] = useState(false);
  const [front, setFront] = useState(vocabularyCurrent?.front);
  const [back, setBack] = useState(vocabularyCurrent?.back);
  useEffect(() => {
    if (vocabularyCurrent) {
      setFront(vocabularyCurrent.front);
      setBack(vocabularyCurrent.back);
    }
  }, [isModalEdit]);

  return (
    <Modal
      animationType="fade" // Hoặc 'fade' hoặc 'none'
      transparent={true} // Nếu bạn muốn nền phía sau modal mờ
      visible={isModalEdit} // Kiểm soát trạng thái hiển thị modal
      // onRequestClose={() => setModalVisible(false)} // Xử lý khi modal bị đóng
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.centeredView}>
            {isLoading && (
              <ActivityIndicator size={36} color={Colors.primary} />
            )}
            {!isLoading && (
              <View style={styles.modal}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "grey", fontSize: 18 }}>Edit</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setFront("");
                      setBack("");
                      return handleToggleModalEdit();
                    }}
                  >
                    <Ionicons name="close" size={30} color={"grey"} />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      style={{
                        height: 100, // Điều chỉnh chiều cao cho hộp nhập liệu nhiều dòng
                        borderColor: "gray",
                        borderWidth: 1,
                        padding: 10,
                        marginTop: 10,
                        textAlignVertical: "top", // Giúp văn bản bắt đầu từ đầu
                      }}
                      placeholder="Mặt trước"
                      placeholderTextColor={"grey"}
                      value={front}
                      onChangeText={setFront}
                      multiline={true} // Cho phép nhập liệu nhiều dòng
                    />
                    <TextInput
                      style={{
                        height: 100, // Điều chỉnh chiều cao cho hộp nhập liệu nhiều dòng
                        borderColor: "gray",
                        borderWidth: 1,
                        padding: 10,
                        marginTop: 10,
                        textAlignVertical: "top", // Giúp văn bản bắt đầu từ đầu
                      }}
                      placeholder="Mặt sau"
                      placeholderTextColor={"grey"}
                      value={back}
                      onChangeText={setBack}
                      multiline={true} // Cho phép nhập liệu nhiều dòng
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    if (front === "" || back === "") {
                      return;
                    }
                    const item = {
                      id: vocabularyCurrent?.id,
                      front: front,
                      back: back,
                    };
                    setIsLoading(true);
                    await handleUpdateVocabulary(item);
                    setIsLoading(false);
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: Colors.primary,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, padding: 10, color: "white" }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Nền mờ phía sau modal
  },
  modal: {
    width: "80%",
    backgroundColor: "white",
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
});
