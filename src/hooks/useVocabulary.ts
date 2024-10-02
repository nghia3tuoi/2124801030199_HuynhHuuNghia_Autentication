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
const useVocabulary = () => {
  const [vocabularies, setVocabularies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getVocabularies(null); // Hoặc truyền giá trị trạng thái bạn muốn
  }, []);
  // Hàm lấy tất cả từ vựng
  // Hàm lấy từ vựng theo trạng thái
  const getVocabularies = async (status: boolean | null) => {
    setIsLoading(true);
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
      setVocabularies(vocabularyList);
      console.log("Successfully retrieved vocabularies"); // Thông báo thành công
    } catch (error) {
      console.error("Error fetching vocabularies:", error); // Ghi lại lỗi
      // Bạn có thể hiển thị thông báo cho người dùng ở đây nếu cần
    } finally {
      setIsLoading(false);
    }
  };

  const addVocabulary = async (front: string, back: string) => {
    try {
      const docRef = await addDoc(collection(db, "vocabularies"), {
        front: front,
        back: back,
        status: false,
        createdAt: serverTimestamp(), // Tạo timestamp cho trường created
      });
      getVocabularies(null);
    } catch (e) {
      console.error("Error adding vocabulary: ", e);
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
      await getVocabularies(null);
    } catch (e) {
      console.log(e);
    }
  };
  // Hàm xóa từ vựng
  const deleteVocabulary = async (id: any) => {
    const vocabularyRef = doc(db, "vocabularies", id); // Lấy tài liệu theo ID
    try {
      await deleteDoc(vocabularyRef);
      console.log("Vocabulary deleted successfully");
    } catch (e) {
      console.error("Error deleting vocabulary: ", e);
    }
  };
  return {
    getVocabularies,
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    vocabularies,
    isLoading
  };
};
export default useVocabulary;
