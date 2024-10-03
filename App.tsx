import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "./src/features/screens/LoginScreen";
import RegisterScreen from "./src/features/screens/RegisterScreen";
import "./src/config/firebaseConfig";
import { Provider } from "react-redux";
import store from "./src/store/index";
import VerifiEmail from "./src/features/screens/VerifiEmail";
import {
  ProfileDrawer,
  VocabularysDrawer,
} from "./src/features/drawer/CustomDrawer";
import ForgotPassword from "./src/features/screens/ForgotPassword";
import Toast from "react-native-toast-message";
import ChangePassword from "./src/features/screens/ChangePassword";
import VocabularysScreen from "./src/features/screens/VocabularysScreen";
import VocabularysDetailScreen from "./src/features/screens/VacabularyDetailScreen";

export type RootStackParamList = {
  Login: any;
  Register: any;
  ProfileDrawer: any;
  ForgotPassword: any;
  ChangePassword: any;
  VerifiEmail: any;
  Vocabularys: any;
  VocabularyDetailScreen: any;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Vocabularys" component={VocabularysDrawer} />
          <Stack.Screen
            name="VocabularyDetailScreen"
            component={VocabularysDetailScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "black" }, // Chỉnh màu header ở đây
              headerTintColor: "white", // Chỉnh màu văn bản của header nếu cần
              headerTitleStyle: { fontWeight: "bold" }, // Chỉnh kiểu chữ tiêu đề nếu cần
              headerBackTitle: "Back",
              headerTitle: "",
            }}
          />
          <Stack.Screen name="ProfileDrawer" component={ProfileDrawer} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="VerifiEmail" component={VerifiEmail} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
