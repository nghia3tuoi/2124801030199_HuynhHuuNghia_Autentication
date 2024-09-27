import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
export default function Profile() {
  const selectUser = useSelector((state: any) => state?.user);
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      >
        <View
          style={{
            paddingTop: 20,
            alignItems: "center",
            gap: 10,
            borderBottomColor: Colors.primary,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              width: 150,
              height: 150,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
                objectFit: "cover",
              }}
              source={{
                uri:
                  selectUser?.photoURL ||
                  "https://tse2.mm.bing.net/th?id=OIP.vkgpS-ywb-V8M7YoZ_S_nwAAAA&pid=Api&P=0&h=220",
              }}
            />
          </View>
          <Text
            style={{ color: Colors.text, fontSize: 20, fontWeight: "bold" }}
          >
            {selectUser?.displayName}
          </Text>
          <Text style={{ color: Colors.text, fontSize: 16, marginBottom: 20 }}>
            Trẻ không chơi già hối hận
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text
            style={{ color: Colors.text, fontSize: 20, fontWeight: "bold" }}
          >
            Chi tiết
          </Text>
          <View style={{ padding: 5, gap: 15 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="school" size={26} color={Colors.text} />
              <Text style={{ color: Colors.text, fontSize: 18 }}>
                Học tại{" "}
                <Text style={{ fontWeight: "bold" }}>Đại học Thủ dầu một</Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="home" size={26} color={Colors.text} />
              <Text style={{ color: Colors.text, fontSize: 18 }}>
                Sống tại <Text style={{ fontWeight: "bold" }}>Thủ dầu một</Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="heart" size={26} color={Colors.text} />
              <Text style={{ color: Colors.text, fontSize: 18 }}>Độc Thân</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Ionicons name="call" size={26} color={Colors.text} />
              <Text style={{ color: Colors.text, fontSize: 18 }}>
                0356014688
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                alignItems: "center",
                justifyContent: "center",
                height: 35,
                borderRadius: 5,
              }}
            >
              <Text
                style={{ fontSize: 18, color: Colors.text, fontWeight: "600" }}
              >
                Chỉnh sửa trang cá nhân
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10, marginBottom: 20 }}>
          <View style={{ width: "100%", height: 400 }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
                objectFit: "cover",
              }}
              source={{
                uri: "https://tse3.mm.bing.net/th?id=OIP.m72F76kNE7iOESxTqQ_2rgHaE8&pid=Api&P=0&h=220",
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
