import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../utils/colors";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { LoginSuccess } from "../../store/authSlice";

export default function ForgotPassword() {
  const { sendVerificationEmail, auth } = useAuth();

  const distpatch = useDispatch();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.background]}
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      >
        <View style={{ marginTop: 50 }}>
          <Text style={{ color: "white", fontSize: 16, marginBottom: 10 }}>
            Quên mật khẩu
          </Text>
          <TextInput />
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {}}
            disabled={true}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Đã xác minh </Text>
            <Ionicons color="white" name="checkmark-circle" size={26} />
          </TouchableOpacity>
        </View>
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
  },
});
