import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Đường dẫn đến tệp cấu hình firebase
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
      console.log("Người dùng đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };
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
  const updateUser = async (id:any, values: any) => {
    const {  name, email, position } = values;

    const userData = {
      name,
      email,
      position,
      updatedAt: new Date(), // Thêm thời gian cập nhật
    };

    try {
      // Cập nhật tài liệu trong Firestore
      await updateDoc(doc(db, "users", id), userData);
      console.log("Người dùng đã được cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  const generateRandomUserId = () => {
    return "user_" + Math.random().toString(36).substring(2, 9) + Date.now();
  };
  return { addUser, getAllUsers, updateUser };
};
export default useUser;
