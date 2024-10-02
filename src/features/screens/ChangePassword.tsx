import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../utils/colors";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { LoginSuccess } from "../../store/authSlice";
import { Formik } from "formik";

export default function ChangePassword({ navigation }: any) {
  const { changePassword } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangePassword = async (values: any) => {
    setIsLoading(true);
    const isSuccess = await changePassword(values);
    setIsLoading(false);
    if (isSuccess) {
      navigation.navigate("Login");
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      >
        {isLoading && (
          <Modal transparent={true} animationType="fade" visible={isLoading}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <ActivityIndicator size={26} color={Colors.primary} />
            </View>
          </Modal>
        )}
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.currentPassword) {
              errors.currentPassword = "Mật khẩu hiện tại là bắt buộc";
            }
            if (!values.newPassword) {
              errors.newPassword = "Mật khẩu mới là bắt buộc";
            } else if (values.newPassword.length < 6) {
              errors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
            }
            if (!values.newPasswordConfirm) {
              errors.newPasswordConfirm = "Xác nhận mật khẩu mới là bắt buộc";
            } else if (values.newPasswordConfirm !== values.newPassword) {
              errors.newPasswordConfirm = "Mật khẩu xác nhận không khớp";
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            return handleChangePassword(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={{ marginTop: 50 }}>
              <Text style={styles.title}>Đổi mật khẩu</Text>
              <View style={{ flexDirection: "row" }}>
                {/* TextInput cho mật khẩu hiện tại */}
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu hiện tại"
                  placeholderTextColor="white"
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={28}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              {touched.currentPassword && errors.currentPassword && (
                <Text style={styles.errorText}>{errors.currentPassword}</Text>
              )}

              <View style={{ flexDirection: "row" }}>
                {/* TextInput cho mật khẩu mới */}
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu mới"
                  placeholderTextColor="white"
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={28}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {touched.newPassword && errors.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              )}
              {/* TextInput cho mật khẩu mới */}
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={styles.input}
                  placeholder="Xác nhận mật khẩu mới"
                  placeholderTextColor="white"
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={handleChange("newPasswordConfirm")}
                  onBlur={handleBlur("newPasswordConfirm")}
                  value={values.newPasswordConfirm}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={28}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {touched.newPasswordConfirm && errors.newPasswordConfirm && (
                <Text style={styles.errorText}>
                  {errors.newPasswordConfirm}
                </Text>
              )}
              {/* Nút đổi mật khẩu */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
                <Ionicons color="white" name="checkmark-circle" size={26} />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 40,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 18,
    color: "white",
    flex: 1,
  },
  button: {
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
