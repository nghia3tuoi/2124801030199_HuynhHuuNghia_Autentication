import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import {
  AuthCredential,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useEffect } from "react";
import { Platform } from "react-native";
import { RootStackParamList } from "../../App";
import { useDispatch } from "react-redux";
import { LoginSuccess } from "../store/authSlice";
const useAuth2 = () => {
  const distpatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const auth = getAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Platform.select({
      ios: "233511515756-4dauq9qkcbfius75kfhi6ffmaot3gtvn.apps.googleusercontent.com",
    }),
    redirectUri:
      "com.googleusercontent.apps.233511515756-4dauq9qkcbfius75kfhi6ffmaot3gtvn:/oauth2redirect", // Đường dẫn chuyển hướng
  });

  useEffect(() => {
    const handleLogin = async () => {
      // Kiểm tra xem người dùng đã đăng nhập chưa
      if (auth.currentUser) {
        console.log("User is already logged in:", auth.currentUser);
        const user = auth.currentUser;
        const { email, emailVerified, uid, displayName, photoURL } = user;
        distpatch(
          LoginSuccess({ uid, email, displayName, emailVerified, photoURL })
        );
        navigation.navigate("ProfileDrawer");
        return; // Nếu đã đăng nhập, không cần thực hiện lại
      }
      if (response?.type === "success") {
        const { authentication } = response;
        const { idToken }: any = authentication;

        // Tạo credential từ idToken
        const credential = GoogleAuthProvider.credential(idToken);

        try {
          // Đăng nhập với credential
          const userCredential = await signInWithCredential(auth, credential);
          const user = userCredential?.user;
          const { email, emailVerified, uid, displayName, photoURL } = user;
          distpatch(
            LoginSuccess({ uid, email, displayName, emailVerified, photoURL })
          );
          console.log("User signed in:", userCredential.user);
          navigation.navigate("ProfileDrawer");
        } catch (error) {
          console.error("Error signing in: ", error);
        }
      }
    };

    handleLogin();
  }, [response]);

  return { promptAsync };
};
export default useAuth2;
