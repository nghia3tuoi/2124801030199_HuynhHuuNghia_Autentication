import { useState, useEffect } from "react";
import {
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { LoginError, LoginSuccess } from "../store/authSlice";
import Toast from "react-native-toast-message";


const useAuth = () => {
  const auth = getAuth();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const distpatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  });

  const register = async (email: any, password: any) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      sendVerificationEmail();
      setError(null);
    } catch (err: any) {
      setUser(null);
      // Kiểm tra mã lỗi để xác định xem email đã tồn tại hay chưa
      if (err.code === "auth/email-already-in-use") {
        setError("Email này đã được sử dụng.");
      } else {
        setError(err.message); // Xử lý các lỗi khác
      }
    }
  };

  const login = async (emailUser: any, password: any) => {
    try {
      // Gọi hàm đăng nhập
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailUser,
        password
      );
      // Nếu đăng nhập thành công, bạn có thể truy cập thông tin người dùng
      const user = userCredential?.user;
      const { email, emailVerified, uid, displayName,photoURL } = user;
      console.log(user)
      distpatch(LoginSuccess({ uid, email, displayName, emailVerified ,photoURL}));
      console.log("dang nhap than hcong");
      return user;
    } catch (err: any) {
      // Xử lý lỗi
      console.log(err.message);
      let strError: any = "";
      if (err?.code === "auth/wrong-password") {
        strError = "Mật khẩu không chính xác.";
      } else if (err?.code === "auth/user-not-found") {
        strError = "Email không tồn tại.";
      } else if (err?.code === "auth/invalid-credential") {
        strError = "Thông tin tài khoản không chính xác.";
      } else {
        strError = "Đăng nhập không thành công. Vui lòng thử lại.";
      }
      if (strError != "") {
        distpatch(LoginError(strError));
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const sendVerificationEmail = () => {
    const user = auth.currentUser;
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          // Email xác minh đã được gửi
          alert(
            "Email xác minh đã được gửi. Vui lòng kiểm tra hộp thư của bạn."
          );
        })
        .catch((error) => {
          // Xử lý lỗi
          if (error.code === "auth/too-many-requests") {
            alert(
              "Bạn đã gửi yêu cầu xác minh rồi. Vui lòng vào email để xác minh! "
            );
          } else {
            alert("Gửi email xác minh không thành công.");
          }
        });
    }
  };
  const changePassword = async (values: any) => {
    const user = auth.currentUser;
    const { currentPassword, newPassword } = values;
    if (user) {
      try {
        if (!user.email) {
          console.error("Email không hợp lệ.");
          return false;
        }
        // Tạo credential để xác thực lại
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        // Xác thực lại với credential
        await reauthenticateWithCredential(auth.currentUser, credential);
        // Nếu xác thực thành công, đổi mật khẩu
        await updatePassword(user, newPassword);
        Toast.show({
          text1: "Thông báo",
          text2: "Mật khẩu đã được thay đổi thành công!",
          position: "top",
          type: "success",
          visibilityTime: 3000,
          autoHide: true,
        });
        return true;
      } catch (error: any) {
        // Kiểm tra xem lỗi có phải do mật khẩu hiện tại không đúng không
        if (error.code === "auth/invalid-credential") {
          Toast.show({
            text1: "Thông báo",
            text2: "Mật khẩu hiện tại không đúng.",
            position: "top",
            type: "error",
            visibilityTime: 3000,
            autoHide: true,
          });
          return false; // Trả về false để báo lỗi
        } else {
          Toast.show({
            text1: "Thông báo",
            text2: "Có lỗi xảy ra khi đổi mật khẩu.",
            position: "top",
            type: "error",
            visibilityTime: 3000,
            autoHide: true,
          });
          return false; // Trả về false cho lỗi khác
        }
      }
    } else {
      console.log("Người dùng chưa đăng nhập.");
      return false;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        text1: "Thông báo",
        text2: "Password reset email sent successfully!",
        position: "top",
        type: "success",
        visibilityTime: 3000,
        autoHide: true,
      });
   
      // Bạn có thể hiển thị thông báo thành công cho người dùng ở đây
    } catch (error) {
      Toast.show({
        text1: "Thông báo",
        text2: "Error sending password reset email!",
        position: "top",
        type: "error",
        visibilityTime: 3000,
        autoHide: true,
      });
      
      // Hiển thị thông báo lỗi cho người dùng nếu cần
    }
  };

  return {
    user,
    error,
    register,
    login,
    logout,
    forgotPassword,
    sendVerificationEmail,
    changePassword,
    auth,

  };
};

export default useAuth;
