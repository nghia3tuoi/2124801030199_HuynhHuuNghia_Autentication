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

import { Ionicons } from "@expo/vector-icons";

import { Formik } from "formik";
import { useState } from "react";

export default function ForgotPassword({ navigation }: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const handleForgotPassword = async (values: any) => {
    setIsLoading(true);
    await forgotPassword(values);
    setIsLoading(false);
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
            email: "",
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.email) {
              errors.email = "Required Email";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, actions) => {
            return handleForgotPassword(values.email);
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
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={{ color: "white", marginBottom: 6, fontSize: 16 }}>
                Enter your email to get back password.
              </Text>
              <View style={{ flexDirection: "row" }}>
                {/* TextInput cho mật khẩu hiện tại */}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="white"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              {errors.email && touched.email && (
                <Text
                  style={{
                    color: "red",
                    flexWrap: "wrap",
                    marginBottom: 16,
                    fontSize: 12,
                  }}
                >
                  {errors.email}
                </Text>
              )}
              {/* Nút đổi mật khẩu */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text style={styles.buttonText}>Forgot Password</Text>
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
    marginBottom: 6,
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
