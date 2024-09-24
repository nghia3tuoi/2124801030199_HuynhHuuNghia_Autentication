import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import Colors from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ModalRegister from "../../shared/components/ModalRegister";

export default function Register({ navigation }: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { error, register } = useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleRegister = async (values: any) => {
    setLoading(true);
    await register(values.email, values.password);
    setLoading(false);
    handleToggleModal();
  };
  const handleToggleModal = () => {
    setIsModal(!isModal);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          <ImageBackground
            style={[styles.background]}
            source={require("../../../assets/bg.png")}
            resizeMode="cover"
          >
            <View
              style={{
                borderWidth: 0.5,
                borderColor: Colors.primary,
                padding: 30,
                width: "80%",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <View>
                  <Image
                    source={require("../../../assets/logologin.jpg")}
                    width={100}
                    height={100}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      marginBottom: 20,
                    }}
                  />
                </View>
                <Text
                  style={{ color: Colors.text, fontSize: 24, marginBottom: 16 }}
                >
                  SIGN UP
                </Text>
              </View>

              <Formik
                initialValues={{ email: "", password: "", passwordConfirm: "" }}
                validate={(values) => {
                  const errors: any = {};
                  if (!values.email) {
                    errors.email = "Required Email";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  // Kiểm tra mật khẩu
                  if (!values.password) {
                    errors.password = "Required Password";
                  } else if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
                      values.password
                    )
                  ) {
                    errors.password =
                      "Password must least 6 character contain is [A-Z]-[a-z]-[0-9]";
                  }

                  if (!values.passwordConfirm) {
                    errors.passwordConfirm = "Required Password"; // Kiểm tra nếu không có giá trị mật khẩu xác nhận
                  } else if (
                    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
                      values.passwordConfirm
                    )
                  ) {
                    errors.passwordConfirm =
                      "Password must be at least 6 characters long and contain [A-Z], [a-z], and [0-9]"; // Kiểm tra định dạng mật khẩu
                  } else if (values.password !== values.passwordConfirm) {
                    errors.passwordConfirm = "Passwords do not match"; // Kiểm tra nếu hai mật khẩu không khớp
                  }

                  return errors;
                }}
                onSubmit={(values, actions) => {
                  return handleRegister(values);
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
                  <View>
                    <View>
                      <View
                        style={{
                          marginBottom: 6,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                          padding: 10,
                          borderBottomColor: Colors.primary,
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <Ionicons name="mail" color={Colors.text} size={18} />
                        <TextInput
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                          textContentType="emailAddress"
                          autoComplete="email"
                          autoCapitalize="none"
                          placeholder="Email"
                          placeholderTextColor={Colors.text}
                          style={{
                            fontSize: 18,
                            color: Colors.text,
                            borderWidth: 0,
                            flex: 1,
                          }}
                        />
                      </View>
                      {errors.email && touched.email && (
                        <Text
                          style={{
                            color: "red",
                            flexWrap: "wrap",
                            marginBottom: 6,
                            fontSize: 12,
                          }}
                        >
                          {errors.email}
                        </Text>
                      )}
                    </View>

                    <View>
                      <View
                        style={{
                          marginBottom: 6,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                          padding: 10,
                          borderBottomColor: Colors.primary,
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <Ionicons
                          name="lock-closed"
                          color={Colors.text}
                          size={18}
                        />
                        <TextInput
                          textContentType="newPassword"
                          autoComplete="off"
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                          autoCapitalize="none"
                          placeholder="Password"
                          placeholderTextColor={Colors.text}
                          secureTextEntry={!isPasswordVisible}
                          style={{
                            fontSize: 18,
                            color: Colors.text,
                            borderWidth: 0,
                            flex: 1,
                            height: 30,
                          }}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                          <Ionicons
                            name={isPasswordVisible ? "eye" : "eye-off"}
                            size={18}
                            color="gray"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {errors.password && touched.password && (
                      <Text
                        style={{
                          color: "red",
                          flexShrink: 1,
                          marginBottom: 6,
                          fontSize: 12,
                        }}
                      >
                        {errors.password}
                      </Text>
                    )}
                    <View style={{ marginBottom: 16 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                          padding: 10,
                          borderBottomColor: Colors.primary,
                          borderBottomWidth: 0.5,
                          marginBottom: 6,
                        }}
                      >
                        <Ionicons
                          name="lock-closed"
                          color={Colors.text}
                          size={18}
                        />
                        <TextInput
                          textContentType="newPassword" // Đặt thành "none" để tắt gợi ý mật khẩu mạnh
                          onChangeText={handleChange("passwordConfirm")}
                          onBlur={handleBlur("passwordConfirm")}
                          value={values.passwordConfirm}
                          autoCapitalize="none"
                          placeholder="Password Confirm"
                          placeholderTextColor={Colors.text}
                          secureTextEntry={!isPasswordVisible}
                          style={{
                            fontSize: 18,
                            color: Colors.text,
                            borderWidth: 0,
                            flex: 1,
                            height: 30,
                          }}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                          <Ionicons
                            name={isPasswordVisible ? "eye" : "eye-off"}
                            size={18}
                            color="gray"
                          />
                        </TouchableOpacity>
                      </View>
                      {errors.passwordConfirm && touched.passwordConfirm && (
                        <Text
                          style={{
                            color: "red",
                            flexShrink: 1,
                            marginBottom: 6,
                            fontSize: 12,
                          }}
                        >
                          {errors.passwordConfirm}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      style={{ alignSelf: "flex-end", marginBottom: 16 }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Login");
                        }}
                      >
                        <Text style={{ color: Colors.primary }}>Sign In</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                      }}
                      // disabled={isSubmitting}
                      style={{
                        backgroundColor: Colors.primary,
                        height: 48,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        marginBottom: 16,
                      }}
                    >
                      <Text style={{ color: Colors.text, fontSize: 16 }}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.text,
                    marginBottom: 16,
                    textAlign: "center",
                  }}
                >
                  Or other method login:
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <TouchableOpacity>
                    <Ionicons name="logo-google" color={"red"} size={36} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="logo-facebook" color={"blue"} size={36} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {loading && (
              <Modal transparent={true} animationType="fade" visible={loading}>
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
            {!loading && (
              <ModalRegister
                loading={loading}
                error={error}
                isModal={isModal}
                onPress={handleToggleModal}
              />
            )}
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Nền mờ phía sau modal
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
  },
});
