import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert } from "react-native";
import Colors from "../../utils/colors";
import ProfileTabs from "../tabs/ProfileTabs";
import useAuth from "../../hooks/useAuth";

// Tạo Drawer content tùy chỉnh
const CustomDrawerContent = (props: any) => {
  const {logout,forgotPassword} = useAuth();
  const handleLogout = async() => {
    await logout();
    props.navigation.navigate("Login"); 
  };

  const handleChangePassword = () => {
    props.navigation.navigate("Login"); 
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: Colors.primary }}
    >
      <DrawerItem
        label="Change Password"
        labelStyle={{ color: Colors.text, fontSize: 16 }}
        onPress={handleChangePassword} // Không cần điều hướng
      />
      <DrawerItem
        label="Logout"
        labelStyle={{ color: Colors.text, fontSize: 16 }}
        onPress={handleLogout} // Không cần điều hướng
      />
    </DrawerContentScrollView>
  );
};
// Tạo Drawer cho HomeScreen
const Drawer = createDrawerNavigator();
export default function ProfileDrawer() {
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
        component={ProfileTabs}
      />
    </Drawer.Navigator>
  );
}
