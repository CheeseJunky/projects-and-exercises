import './gesture-handler/gesture-handler.js';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useEffect, useState } from 'react';
// import AppLoading from 'expo-app-loading';

import AllPlaces from './screens/AllPlaces.js'
import AddPlace from './screens/AddPlace.js';
import Map from './screens/Map.js';
import IconButton from './components/ui/IconButton.js';
import { Colors } from './constants/styles.js';
// import { init } from './util/database.js';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [dbInit, setDbInit] = useState(false);

  // useEffect(() => {
  //   init()
  //     .then(() => {
  //       setDbInit(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // if (!dbInit) {
  //   return <AppLoading />;
  // }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary400,
          }
        }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Favourite Places',
              headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "New Place"
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

