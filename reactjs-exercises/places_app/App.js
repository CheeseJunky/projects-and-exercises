import './gesture-handler/gesture-handler.js'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces.js'
import AddPlace from './screens/AddPlace.js';
import IconButton from './components/ui/IconButton.js';
import { Colors } from './constants/styles.js';

const Stack = createNativeStackNavigator();

export default function App() {
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
            options={({navigation}) => ({
              title: 'Favourite Places',
              headerRight: ({tintColor}) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace') } />
            })}
          />
          <Stack.Screen 
            name="AddPlace" 
            component={AddPlace} 
            options={{
              title: "New Place"
            }}  
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

