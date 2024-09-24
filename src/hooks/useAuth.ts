import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { LoginError, LoginSuccess } from "../store/authSlice";

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
      const { email, emailVerified, uid, displayName } = user;
      distpatch(LoginSuccess({ uid, email, displayName, emailVerified }));
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
  // Hàm quên mật khẩu
  const forgotPassword = async (email: string) => {
    const auth = getAuth(); // Lấy đối tượng auth từ Firebase
    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        "Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn."
      );
    } catch (error: any) {
      // Xử lý lỗi
      console.error(error);
      alert("Có lỗi xảy ra: " + error.message);
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
  const getCurrentUser = () => {
    return auth.currentUser;
  };
  return {
    user,
    error,
    register,
    login,
    logout,
    forgotPassword,
    sendVerificationEmail,
    auth,
  };
};

export default useAuth;
