import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert, View } from "react-native";
import Colors from "../../utils/colors";
import CommonTabs from "../tabs/CustomTabs";
import useAuth from "../../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import VocabularysScreen from "../screens/VocabularysScreen";

// Tạo Drawer content tùy chỉnh
const CustomDrawerContent = (props: any) => {
  const { logout, forgotPassword } = useAuth();
  const handleLogout = async () => {
    await logout();
    props.navigation.navigate("Login");
  };

  const handleChangePassword = () => {
    props.navigation.navigate("ChangePassword");
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: Colors.primary }}
    >
      <DrawerItem
      icon={()=><Ionicons name="lock-closed" size={24} color={'white'}/>}
        label="Change Password"
        labelStyle={{ color: Colors.text, fontSize: 16 }}
        onPress={handleChangePassword} // Không cần điều hướng
      />
   
       
        <DrawerItem
        icon={()=>  <Ionicons name="log-out-outline" size={26} color={'white'}/>}
          label="Logout"
          labelStyle={{ color: Colors.text, fontSize: 16 }}
          onPress={handleLogout} // Không cần điều hướng
        />

    </DrawerContentScrollView>
  );
};
// Tạo Drawer cho HomeScreen
const Drawer = createDrawerNavigator();
export function ProfileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors.primary, // Màu cho màn hình này
          },
          headerTintColor: "white", // Màu văn bản trên header
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="ProfileTabs"
        component={CommonTabs}
      />
    </Drawer.Navigator>
  );
}

export function VocabularysDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors.primary, // Màu cho màn hình này
          },
          headerTintColor: "white", // Màu văn bản trên header
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="CommonTabs"
        component={CommonTabs}
      />
    </Drawer.Navigator>
  );
}