import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../utils/colors";
import { Formik } from "formik";
import useUser from "../../hooks/useUser";
import { useState } from "react";

export default function ModalAddUser({
  isModal,
  user,
  handleToggleModal,
  handleGetAllUsers,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { addUser } = useUser();
  const handleAddUser = async (values: any) => {
    setIsLoading(true);
    await addUser(values);
    handleToggleModal();
    await handleGetAllUsers();
    setIsLoading(false);
  };
  return (
    <Modal
      animationType="fade" // Hoặc 'fade' hoặc 'none'
      transparent={true} // Nếu bạn muốn nền phía sau modal mờ
      visible={isModal} // Kiểm soát trạng thái hiển thị modal
      // onRequestClose={() => setModalVisible(false)} // Xử lý khi modal bị đóng
    >
      {isLoading && <ActivityIndicator size={26} />}
      {!isLoading && (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={handleToggleModal}
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>
            <Formik
              initialValues={{ email: "", name: "", position: "" }}
              validate={(values) => {
                const errors: any = {};
                // Kiểm tra email
                if (!values.email) {
                  errors.email = "Email là bắt buộc.";
                } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                  errors.email = "Email không hợp lệ.";
                }

                // Kiểm tra tên
                if (!values.name) {
                  errors.name = "Tên là bắt buộc.";
                }

                // Kiểm tra chức vụ
                if (!values.position) {
                  errors.position = "Chức vụ là bắt buộc.";
                }

                //   // Kiểm tra avatar
                //   if (!values.avatar) {
                //     errors.avatar = "Hình ảnh đại diện là bắt buộc.";
                //   } else if (!/^https?:\/\//.test(values.avatar)) {
                //     errors.avatar = "URL hình ảnh không hợp lệ.";
                //   }
                return errors;
              }}
              onSubmit={(values, actions) => {
                return handleAddUser(values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View>
                  <View>
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Email"
                      placeholderTextColor={Colors.text}
                      style={{
                        fontSize: 18,
                        color: Colors.text,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        padding: 10,
                        marginBottom: 6,
                      }}
                    />
                    {errors.email && touched.email && (
                      <Text style={{ color: "red" }}>{errors.email}</Text>
                    )}
                  </View>
                  {/* Trường Tên */}
                  <View>
                    <TextInput
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      placeholder="Tên"
                      placeholderTextColor={Colors.text}
                      style={{
                        fontSize: 18,
                        color: Colors.text,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        padding: 10,
                        marginBottom: 6,
                      }}
                    />
                    {errors.name && touched.name && (
                      <Text style={{ color: "red" }}>{errors.name}</Text>
                    )}
                  </View>

                  {/* Trường Chức Vụ */}
                  <View>
                    <TextInput
                      onChangeText={handleChange("position")}
                      onBlur={handleBlur("position")}
                      value={values.position}
                      placeholder="Chức vụ"
                      placeholderTextColor={Colors.text}
                      style={{
                        fontSize: 18,
                        color: Colors.text,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        padding: 10,
                        marginBottom: 6,
                      }}
                    />
                    {errors.position && touched.position && (
                      <Text style={{ color: "red" }}>{errors.position}</Text>
                    )}
                  </View>

                  {/* Nút Thêm */}
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit();
                    }}
                    style={{
                      backgroundColor: Colors.primary,
                      height: 48,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      marginBottom: 16,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: Colors.text, fontSize: 16 }}>
                      Thêm
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
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
    width: "80%",

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
