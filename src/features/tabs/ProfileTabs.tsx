import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Colors from "../../utils/colors";
import Profile from "../screen/ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import Staffs from "../screen/StaffsScreen";

const Tab = createMaterialBottomTabNavigator();
export default function ProfileTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ProfileScreen"
      labeled={false}
      barStyle={{ backgroundColor: Colors.header }}
      activeColor={Colors.grey}
      inactiveColor={Colors.greyDark}
    >
      <Tab.Screen
        name="StaffScreen"
        component={Staffs}
        options={{
          tabBarIcon: () => (
            <MaterialIcons size={26} name="list" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <MaterialIcons size={26} name="person" style={{ color: "#ffae50" }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
