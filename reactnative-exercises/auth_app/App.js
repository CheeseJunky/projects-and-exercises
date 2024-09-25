import './gesture-handler/gesture-handler.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context.js';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit-outline"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuth && <AuthStack />}
      {authCtx.isAuth && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const tmpToken = await AsyncStorage.getItem('token');
      if (tmpToken) {
        authCtx.authenticate(tmpToken);
      }
      
      setIsLoadingLocal(false);
    }
    fetchToken();
  }, []);

  if (isLoadingLocal) {
    return <AppLoading />
  }

  return <Navigation />
}

export default function App() {

  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}