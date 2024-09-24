import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "./src/features/screen/LoginScreen";
import RegisterScreen from "./src/features/screen/RegisterScreen";
import HomeDrawer from "./src/features/drawer/ProfileDrawer";
import "./src/config/firebaseConfig";
import { Provider } from "react-redux";
import store from "./src/store/index";
import VerifiEmail from "./src/features/screen/VerifiEmail";
import ProfileDrawer from "./src/features/drawer/ProfileDrawer";
import ForgotPassword from "./src/features/screen/ForgotPassword";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ProfileDrawer" component={ProfileDrawer} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="VerifiEmail" component={VerifiEmail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
