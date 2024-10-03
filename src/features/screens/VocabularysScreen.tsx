import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../utils/colors";
import { useCallback, useEffect, useState } from "react";
import ModalAddVocabulary from "../../shared/components/ModalAddVocabulary";
import useVocabulary from "../../hooks/useVocabulary";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import * as Speech from 'expo-speech';
export default function VocabularysScreen({ navigation }: any) {
  const { addVocabulary, updateVocabulary, getVocabularies } = useVocabulary();
  const [vocabularies, setVocabularies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [selectTab, setSelectab] = useState("all");
  const [isPressed, setIsPressed] = useState<any>(false);
  const route = useRoute();

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
  //
  useEffect(() => {
    handleGetVocabularies(null);
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      handleGetVocabularies(null);
      // Nếu bạn muốn dọn dẹp khi màn hình không còn focus
      return () => {};
    }, [])
  );
  const handleAddVocabulary = async (front: string, back: string) => {
    await addVocabulary(front, back);
    handleGetVocabularies(null);
    handleToggleModalAdd();
  };

  const handleToggleModalAdd = (): void => {
    setIsModalAdd(!isModalAdd);
  };

  const handleUpdateVocabulary = async (item: any) => {
    await updateVocabulary(item.id, undefined, undefined, !item.status);
    let status: any = null;
    if (selectTab === "all") {
      status = null;
    } else if (selectTab === "not-learned") {
      status = false;
    } else {
      status = true;
    }
    handleGetVocabularies(status);
  };
  const handleGetVocabularies = async (status: boolean | null) => {
    setIsLoading(true);

    const vocabularies = await getVocabularies(status);
    setVocabularies(vocabularies);
    setIsLoading(false);
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("VocabularyDetailScreen", { index })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          borderBottomColor: Colors.primary,
          borderWidth: 0.5,
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 18 }}>{item?.front}</Text>
          <Text style={{ color: "grey", fontSize: 18 }}>{item?.back}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <TouchableOpacity onPress={() => {
            setIsPressed(item?.id);
            return playSound(item?.front);
          }}>
            <Ionicons name="volume-high" color={isPressed === item?.id ? "#1e90ff" : "white"} size={32} />
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
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.background]}
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            disabled={selectTab === "all"}
            onPress={() => {
              setSelectab("all");
              return handleGetVocabularies(null);
            }}
            style={{
              backgroundColor: "grey",
              padding: 2,
              borderStartStartRadius: 5,
              borderBottomStartRadius: 5,
            }}
          >
            <View
              style={{
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: selectTab === "all" ? "white" : "transparent",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>Tất cả</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={selectTab === "not-learned"}
            onPress={() => {
              setSelectab("not-learned");
              return handleGetVocabularies(false);
            }}
            style={{ backgroundColor: "grey", padding: 2 }}
          >
            <View
              style={{
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor:
                  selectTab === "not-learned" ? "white" : "transparent",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>Chưa học</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={selectTab === "learned"}
            onPress={() => {
              setSelectab("learned");
              return handleGetVocabularies(true);
            }}
            style={{
              backgroundColor: "grey",
              padding: 2,
              borderStartEndRadius: 5,
              borderBottomEndRadius: 5,
            }}
          >
            <View
              style={{
                padding: 5,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                backgroundColor:
                  selectTab === "learned" ? "white" : "transparent",
              }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>Đã học</Text>
            </View>
          </TouchableOpacity>
        </View>
        {selectTab === "all" && (
          <View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                All
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleToggleModalAdd}
              style={{
                alignSelf: "flex-end",
                backgroundColor: Colors.primary,
                width: 100,
                height: 30,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              <Ionicons name="add-circle-sharp" color={"white"} size={26} />
            </TouchableOpacity>
            {isLoading && <ActivityIndicator size={26} />}
            {!isLoading && (
              <FlatList
                style={{ marginBottom: 120 }}
                data={vocabularies}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
              />
            )}
          </View>
        )}
        {selectTab === "not-learned" && (
          <View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Not Learned
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleToggleModalAdd}
              style={{
                alignSelf: "flex-end",
                backgroundColor: Colors.primary,
                width: 100,
                height: 30,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              <Ionicons name="add-circle-sharp" color={"white"} size={26} />
            </TouchableOpacity>

            {isLoading && <ActivityIndicator size={26} />}
            {!isLoading && (
              <FlatList
                style={{ marginBottom: 120 }}
                data={vocabularies}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
              />
            )}
          </View>
        )}
        {selectTab === "learned" && (
          <View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Learned
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleToggleModalAdd}
              style={{
                alignSelf: "flex-end",
                backgroundColor: Colors.primary,
                width: 100,
                height: 30,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              <Ionicons name="add-circle-sharp" color={"white"} size={26} />
            </TouchableOpacity>

            {isLoading && <ActivityIndicator size={26} />}
            {!isLoading && (
              <FlatList
                style={{ marginBottom: 120 }}
                data={vocabularies}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
              />
            )}
          </View>
        )}
        <ModalAddVocabulary
          isModalAdd={isModalAdd}
          handleToggleModalAdd={handleToggleModalAdd}
          handleAddVocabulary={handleAddVocabulary}
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
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",

    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "white",
  },
});
