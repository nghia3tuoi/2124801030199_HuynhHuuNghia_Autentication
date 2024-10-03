import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
const useVocabulary = () => {
  // Hàm lấy tất cả từ vựng
  // Hàm lấy từ vựng theo trạng thái
  const getVocabularies = async (status: boolean | null) => {
    const vocabulariesCollection = collection(db, "vocabularies");
    let q;
    try {
      if (status === null) {
        // Nếu status là null, lấy tất cả từ vựng
        q = query(vocabulariesCollection, orderBy("createdAt", "desc")); // Truy vấn không có điều kiện
      } else {
        // Nếu có giá trị status, áp dụng điều kiện where
        q = query(vocabulariesCollection, where("status", "==", status)); // Thêm orderBy ở đây
      }

      const vocabularySnapshot = await getDocs(q);
      const vocabularyList = vocabularySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return vocabularyList;
    } catch (error) {}
  };

  const addVocabulary = async (front: string, back: string) => {
    try {
      await addDoc(collection(db, "vocabularies"), {
        front: front,
        back: back,
        status: false,
        createdAt: serverTimestamp(), // Tạo timestamp cho trường created
      });
      Toast.show({
        text1: 'Thông báo',
        text2: 'Thêm từ vựng thành công!',
        position: 'top',
        type: 'success',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (e:any) {
      Toast.show({
        text1: 'Thông báo',
        text2: `Thêm từ vựng thất bại! ${e.message}`,
        position: 'top',
        type: 'error',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };
  const updateVocabulary = async (
    id: any,
    front?: string,
    back?: string,
    status?: boolean | null
  ) => {
    const vocabularyRef = doc(db, "vocabularies", id);
    const updates: any = {};

    // Chỉ thêm vào đối tượng updates nếu tham số không phải là undefined
    if (front !== undefined) {
      updates.front = front;
    }
    if (back !== undefined) {
      updates.back = back;
    }
    if (status !== undefined) {
      updates.status = status;
    }

    // Luôn cập nhật trường updatedAt
    updates.updatedAt = serverTimestamp();

    try {
      await updateDoc(vocabularyRef, updates);
      Toast.show({
        text1: 'Thông báo',
        text2: 'Update vựng thành công!',
        position: 'top',
        type: 'success',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (e:any) {
      Toast.show({
        text1: 'Thông báo',
        text2: `Update từ vựng thất bại! ${e.message}`,
        position: 'top',
        type: 'error',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };
  // Hàm xóa từ vựng
  const deleteVocabulary = async (id: any) => {
    const vocabularyRef = doc(db, "vocabularies", id); // Lấy tài liệu theo ID
    try {
      await deleteDoc(vocabularyRef);
      Toast.show({
        text1: 'Thông báo',
        text2: 'Delete từ vựng thành công!',
        position: 'top',
        type: 'success',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (e:any) {
      Toast.show({
        text1: 'Thông báo',
        text2: `Delete từ vựng thất bại! ${e.message}`,
        position: 'top',
        type: 'error',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };
  return {
    getVocabularies,
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
  };
};
export default useVocabulary;
