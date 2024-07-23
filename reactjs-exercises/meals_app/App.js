import './gesture-handler/gesture-handler.js'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen.js';

const Stack = createNativeStackNavigator ();

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
          name="MealCategories"
          component={CategoriesScreen}
          options={{
            title: "All Categories",
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
