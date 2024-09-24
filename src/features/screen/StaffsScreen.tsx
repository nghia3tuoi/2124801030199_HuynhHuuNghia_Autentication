import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../utils/colors";
import { useEffect, useState } from "react";
import ModalAddUser from "../../shared/components/ModalAddUser";
import useUser from "../../hooks/useUser";
import ModalEditUser from "../../shared/components/ModalEditUser";

export default function Staffs() {
  const { getAllUsers } = useUser();
  const [isModal, setIsModal] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [users, setUsers] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    handleGetAllUsers();
  }, []);
  const handleGetAllUsers = async () => {
    const users = await getAllUsers();
    if (users) {
      setUsers(users);
    }
  };
  const handleToggleModal = () => {
    setIsModal(!isModal);
  };
  const handleToggleModalEdit = (item: any) => {
    setIsModalEdit(!isModalEdit);
    setUser(item);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.position}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleToggleModalEdit(item);
          }}
        >
          <Ionicons name="pencil" size={26} color={"green"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="trash" size={26} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.background]}
        source={require("../../../assets/bg.png")}
        resizeMode="cover"
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              marginTop: 10,
              marginBottom: 10,
              fontSize: 18,
            }}
          >
            Manages Staff
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleToggleModal}
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
          <Text style={{ color: "white", fontSize: 16 }}>Add Staff</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.cell}>Email</Text>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Position</Text>
          <Text style={styles.cell}>Action</Text>
        </View>
        {users && (
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
        <ModalAddUser
          isModal={isModal}
          handleToggleModal={handleToggleModal}
          handleGetAllUsers={handleGetAllUsers}
        />
        <ModalEditUser
        user={user}
          isModalEdit={isModalEdit}
          handleToggleModalEdit={handleToggleModalEdit}
          handleGetAllUsers={handleGetAllUsers}
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
