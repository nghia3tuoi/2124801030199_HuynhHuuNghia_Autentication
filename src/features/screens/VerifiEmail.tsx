import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../utils/colors";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { LoginSuccess } from "../../store/authSlice";

export default function VerifiEmail() {
  const { sendVerificationEmail, auth } = useAuth();
  const [isVerifi, setIsVerifi] = useState(false);
  const distpatch = useDispatch();
  const handleVerifi = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      if (auth.currentUser?.emailVerified === false) {
        setIsVerifi(false);
        sendVerificationEmail();
      } else {
        setIsVerifi(true);
        const { email, emailVerified, uid, displayName , photoURL} = user;
        distpatch(LoginSuccess({ uid, email, displayName, emailVerified , photoURL}));
      }
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.background]}
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      >
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: "white", fontSize: 16, marginBottom: 10 }}>
            Xác minh Email để có thể đăng nhập và sử dụng được hết các tính năng
            của app.
          </Text>
          {!isVerifi && (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={handleVerifi}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                Xác minh ngay
              </Text>
            </TouchableOpacity>
          )}
          {isVerifi && (
            <TouchableOpacity
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={handleVerifi}
              disabled={true}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Đã xác minh </Text>
              <Ionicons color="white" name="checkmark-circle" size={26} />
            </TouchableOpacity>
          )}
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
