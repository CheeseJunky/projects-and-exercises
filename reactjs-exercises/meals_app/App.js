import './gesture-handler/gesture-handler.js'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons} from '@expo/vector-icons'

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen.js';
import MealDetailScreen from './screens/MealDetailScreen.js';
import FavouritesScreen from './screens/FavouritesScreen.js';

const Stack = createNativeStackNavigator ();
const Drawer = createDrawerNavigator ();

function DrawerNavigatorSetup () {
  return <Drawer.Navigator
      screenOptions={{            
        headerStyle: { backgroundColor: '#5C09DB' },
        headerTintColor: '#FAFAFA',
        sceneContainerStyle: { backgroundColor: '#ebe1fc' },
        drawerContentStyle: { backgroundColor: '#FAFAFA'},
        drawerActiveTintColor: '#5C09DB'
      }}>
    <Drawer.Screen 
      name="MealCategories"
      component={CategoriesScreen}
      options={{
        title: "Categories",
        drawerIcon: ({color, size}) => <Ionicons name="list" color={color} size={size}/> 
      }}
    />
    <Drawer.Screen 
      name="Favourites"
      component={FavouritesScreen}
      options={{
        drawerIcon: ({color, size}) => <Ionicons name="star" color={color} size={size}/> 
      }}
    />
  </Drawer.Navigator>
}

export default function App() {
  return (
    <>
    <StatusBar style='light'/>
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{            
          headerStyle: { backgroundColor: '#5C09DB' },
          headerTintColor: '#FAFAFA',
          contentStyle: {backgroundColor: '#ebe1fc'}
        }}>
        <Stack.Screen 
          name="DrawerScreen"
          component={DrawerNavigatorSetup}
          options={{
            title: "All Categories",
            headerShown: false
          }}  
        />
        <Stack.Screen 
          name="MealOverview" 
          component={MealsOverviewScreen}
          // options={({route, navigation}) => {
          //   return {
          //     title: route.params.categoryId
          //   };
          // }}
          // alternative -> set from inside component
        />
        <Stack.Screen 
          name="MealDetailScreen" 
          component={MealDetailScreen}
          // options={{
          //   headerRight: () => {
          //     return <Button title="Tap me" onPress={console.log("tapped")}/>
          //   }
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
