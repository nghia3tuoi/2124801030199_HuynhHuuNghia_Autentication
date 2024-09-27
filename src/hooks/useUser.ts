import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Đường dẫn đến tệp cấu hình firebase
import Toast from "react-native-toast-message";
const useUser = () => {
  // Hàm để thêm người dùng
  const addUser = async (values: any) => {
    const { name, email, position } = values;
    const userId = generateRandomUserId();
    console.log(userId);
    const userData = {
      name,
      email,
      position,
      createdAt: new Date(),
    };
    try {
      await setDoc(doc(db, "users", userId), userData);
      Toast.show({
        text1: 'Thông báo',
        text2: 'Người dùng đã được thêm thành công!',
        position: 'top',
        type: 'success',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      Toast.show({
        text1: 'Thông báo',
        text2: 'Lỗi khi thêm người dùng!',
        position: 'top',
        type: 'error',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  }
  const getAllUsers = async () => {
    try {
      // Lấy collection 'users'
      const querySnapshot = await getDocs(collection(db, "users"));

      // Duyệt qua từng document trong querySnapshot và lấy dữ liệu
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID của document (userId)
        ...doc.data(), // Dữ liệu của user
      }));
      return users;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  const updateUser = async (id: any, values: any) => {
    const { name, email, position } = values;

    const userData = {
      name,
      email,
      position,
      updatedAt: new Date(), // Thêm thời gian cập nhật
    };

    try {
      // Cập nhật tài liệu trong Firestore
      await updateDoc(doc(db, "users", id), userData);
      Toast.show({
        text1: 'Thông báo',
        text2: 'Người dùng đã được cập nhật thành công!',
        position: 'top',
        type: 'success',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      Toast.show({
        text1: 'Thông báo',
        text2: 'Lỗi khi cập nhật người dùng!',
        position: 'top',
        type: 'error',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!userId) {
      console.error("Không có userId để xóa!");
      return;
    }

    try {
      // Xóa tài liệu trong Firestore
      await deleteDoc(doc(db, "users", userId));
      Toast.show({
        text1: 'Thông báo',
        text2: 'Người dùng đã được xóa thành công!',
        position: 'top',
        type: 'success',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      Toast.show({
        text1: 'Thông báo',
        text2: 'Lỗi khi xóa người dùng!',
        position: 'top',
        type: 'error',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };
  const generateRandomUserId = () => {
    return "user_" + Math.random().toString(36).substring(2, 9) + Date.now();
  };
  return { addUser, getAllUsers, updateUser,deleteUser };
};
export default useUser;
