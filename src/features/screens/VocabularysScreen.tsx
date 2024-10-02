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
import { useEffect, useState } from "react";
import ModalAddVocabulary from "../../shared/components/ModalAddVocabulary";
import useVocabulary from "../../hooks/useVocabulary";

export default function VocabularysScreen({ navigation }: any) {
  const {
    addVocabulary,
    updateVocabulary,
    getVocabularies,
    vocabularies,
    isLoading,
  } = useVocabulary();

  const [isModalAdd, setIsModalAdd] = useState(false);
  const [selectTab, setSelectab] = useState("all");

  const handleAddVocabulary = async (front: string, back: string) => {
    await addVocabulary(front, back);
    handleToggleModalAdd();
  };

  const handleToggleModalAdd = (): void => {
    setIsModalAdd(!isModalAdd);
  };
  const handleSelectTab = (tabName: string): void => {
    setSelectab(tabName);
  };
  const handleUpdateVocabulary = async (item: any) => {
    await updateVocabulary(item.id, undefined, undefined, !item.status);
  };
  const handleGetVocabularies = async (
    status: boolean | null,
    tabName: string
  ) => {
    handleSelectTab(tabName);
    await getVocabularies(status);
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
          <TouchableOpacity>
            <Ionicons name="volume-high" color={"white"} size={32} />
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
              return handleGetVocabularies(null, "all");
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
              return handleGetVocabularies(false, "not-learned");
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
              return handleGetVocabularies(true, "learned");
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
