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
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import Colors from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ModalLogin from "../../shared/components/ModalLogin";
import { useSelector } from "react-redux";
import useAuth2 from "../../hooks/useAuth2";

export default function Login({ navigation }: any) {
  const { login, auth } = useAuth();
  const { promptAsync } = useAuth2();
  const user = useSelector((state: any) => state?.user);
  const error = useSelector((state: any) => state?.error);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // Truy cập trực tiếp vào state
  const handleLogin = async (values: any) => {
    setLoading(true);
    const user = await login(values.email, values.password);
    setLoading(false);
    if (user && user?.emailVerified) {
      return navigation.navigate("ProfileDrawer");
    }
   
    handleToggleModal();
  };

  const handleToggleModal = () => {
    setIsModal(!isModal);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
                  WELCOME
                </Text>
              </View>

              <Formik
                initialValues={{ email: "", password: "" }}
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
                  return errors;
                }}
                onSubmit={(values, actions) => {
                  return handleLogin(values);
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
                          textContentType="password"
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
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 16,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          return navigation.navigate("ForgotPassword");
                        }}
                      >
                        <Text style={{ color: Colors.primary }}>
                          Forgot Password
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setValues({ email: "", password: "" });
                          return navigation.navigate("Register");
                        }}
                      >
                        <Text style={{ color: Colors.primary }}>Sign Up</Text>
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
                        Sign In
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
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      promptAsync();
                    }}
                  >
                    <Ionicons name="logo-google" color={"red"} size={36} />
                  </TouchableOpacity>
                  {/* <TouchableOpacity>
                    <Ionicons name="logo-facebook" color={"blue"} size={36} />
                  </TouchableOpacity> */}
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
              <ModalLogin
                error={error}
                isModal={isModal}
                user={user}
                onPress={handleToggleModal}
                navigation={() => {
                  setIsModal(false);
                  return navigation.navigate("VerifiEmail");
                }}
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
});
