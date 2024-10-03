import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Text,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import Colors from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import React, { useEffect, useRef, useState } from "react";
import useVocabulary from "../../hooks/useVocabulary";
import Carousel from "react-native-reanimated-carousel";
import ModalEditVocabulary from "../../shared/components/ModalEditVocabulary";
import ModalDeleteVocabulary from "../../shared/components/ModalDeleteVocabulary";
import * as Speech from 'expo-speech';

export default function VocabularysDetailScreen({ route }: any) {
  const [vocabularies, setVocabularies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vocabularyCurrent, setVocabularyCurrent] = useState<any>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isPressed, setIsPressed] = useState<any>(false);

  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const { index } = route.params; // Lấy item và index từ route
  const width = Dimensions.get("window").width;
  const { updateVocabulary, getVocabularies, deleteVocabulary } =
    useVocabulary();

  useEffect(() => {
    handleGetVocabularies();
  }, []);
  const playSound = (word:any) => {
    Speech.speak(word, {
      language: 'en-US',
      onDone: () => {
        setIsPressed(null); // Đặt lại isPressed về false sau khi phát âm xong
      },
      onStopped: () => {
        setIsPressed(null); // Đặt lại isPressed về false nếu phát âm bị dừng
      }
    });
    };
  const handleGetVocabularies = async () => {
    const vocabularies: any = await getVocabularies(null);
    setVocabularies(vocabularies);
    setVocabularyCurrent(vocabularies[index]);
  };
  const handleUpdateStatusVocabulary = async (item: any) => {
    handleSelectItem(item);
    await updateVocabulary(item?.id, undefined, undefined, !item?.status);
  };
  const handleUpdateVocabulary = async (item: any) => {
    await updateVocabulary(item?.id, item?.front, item?.back, undefined);
    await handleGetVocabularies();
    setVocabularyCurrent(item);
    handleToggleModalEdit();
  };
  const handleDeleteVocabulary = async (item: any) => {
    await deleteVocabulary(item?.id);
    handleGetVocabularies();
    handleToggleModalDelete();
  };
  const handleSelectItem = (item: any) => {
    let updatedItems = [...selectedItems]; // Tạo một bản sao của selectedItems để không thay đổi trực tiếp mảng cũ

    if (updatedItems.includes(item?.id)) {
      // Nếu đã tồn tại, xóa item đó
      updatedItems = updatedItems.filter((id) => id !== item?.id);
    } else {
      // Nếu chưa tồn tại, thêm item vào
      updatedItems.push(item?.id);
    }

    // Cập nhật lại trạng thái
    setSelectedItems(updatedItems);
  };

  const handleToggleModalEdit = () => {
    setIsModalEdit(!isModalEdit);
  };
  const handleToggleModalDelete = () => {
    setIsModalDelete(!isModalDelete);
  };
  const flipToFront = () => {
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setFlipped(false);
  };

  const flipToBack = () => {
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setFlipped(true);
  };

  const flipInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [{ rotateY: flipInterpolate }],
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.background]}
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Carousel
            loop
            width={width}
            defaultIndex={index}
            data={vocabularies}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => {
              if (index != null) {
                setCurrentIndex(index);
                const currentItem = vocabularies[index];
                setVocabularyCurrent(currentItem);
                setFlipped(false);
              }
            }}
            renderItem={({ item, index }: any) => (
              <View
                key={index}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  flex: 1,
                  gap: 10,
                }}
              >
                <View>
                  <Text style={{ color: "white" }}>
                    {index}/{vocabularies?.length}
                  </Text>
                </View>

                <TouchableOpacity onPress={flipped ? flipToFront : flipToBack}>
                  <Animated.View style={[animatedStyle]}>
                    <View
                      style={{
                        width: width - 100,
                        height: 300,
                        backgroundColor: "white",
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: "black",
                        }}
                      >
                        {flipped === false ? item.front : item.back}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            )}
          />

          <View
            style={{
              backgroundColor: Colors.primary,
              width: "100%",
              height: 80,
              padding: 10,
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={()=>{
                setIsPressed(vocabularyCurrent?.id);
              return playSound(vocabularyCurrent?.front)
            }}>
              <Ionicons name="volume-high" size={36} color={isPressed === vocabularyCurrent?.id ? "#1e90ff" : "white"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleModalEdit}>
              <Ionicons name="pencil" size={36} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleModalDelete}>
              <Ionicons name="trash-bin" size={36} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        <ModalEditVocabulary
          handleToggleModalEdit={handleToggleModalEdit}
          handleUpdateVocabulary={handleUpdateVocabulary}
          isModalEdit={isModalEdit}
          vocabularyCurrent={vocabularyCurrent}
        />
        <ModalDeleteVocabulary
          handleToggleModalDelete={handleToggleModalDelete}
          handleDeleteVocabulary={handleDeleteVocabulary}
          isModalDelete={isModalDelete}
          vocabularyCurrent={vocabularyCurrent}
        />
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
