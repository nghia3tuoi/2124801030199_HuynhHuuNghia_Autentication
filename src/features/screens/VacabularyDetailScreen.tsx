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

export default function VocabularysDetailScreen({ route }: any) {
  const [selectedItems, setSelectedItems] = useState([]);
  const { vocabularies } = useVocabulary();
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const { index } = route.params; // Lấy item và index từ route
  const width = Dimensions.get("window").width;
  const { updateVocabulary } = useVocabulary();
  const handleUpdateVocabulary = async (item: any) => {
    await updateVocabulary(item.id, undefined, undefined, !item.status);
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
            onSnapToItem={(index) => console.log("current index:", index)}
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

                <TouchableOpacity
                  onPress={() => {
                    handleUpdateVocabulary(item);
                  }}
                >
                  <Ionicons
                    name="checkmark-circle-sharp"
                    color={item?.status === true ? "#1e90ff" : "white"}
                    size={32}
                  />
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
            <TouchableOpacity>
              <Ionicons name="volume-high" size={36} color={"white"} />
            </TouchableOpacity>
          </View>
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
