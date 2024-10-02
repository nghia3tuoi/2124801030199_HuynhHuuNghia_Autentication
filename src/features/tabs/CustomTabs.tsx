import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Colors from "../../utils/colors";
import Profile from "../screens/ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import VocabularysScreen from "../screens/VocabularysScreen";

const Tab = createMaterialBottomTabNavigator();

export default  function CommonTabs() {
  return (
    <Tab.Navigator
      initialRouteName="VocabularysScreen"
      labeled={false}
      barStyle={{ backgroundColor: Colors.header }}
      activeColor={Colors.grey}
      inactiveColor={Colors.greyDark}
    >
      <Tab.Screen
        name="VocabularysScreen"
        component={VocabularysScreen}
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

