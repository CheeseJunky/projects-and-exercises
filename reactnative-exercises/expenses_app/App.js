import './gesture-handler/gesture-handler.js'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalPalette } from './constants/styles.js';
import IconButton from './components/buttons/IconButton.js';
import ExpensesContextProvider from './store/expenses-context.js';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalPalette.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalPalette.colors.primary500 },
        tabBarActiveTintColor: GlobalPalette.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton icon="add" size={24} color={tintColor} onPress={() => {
            navigation.navigate('ManageExpense');
          }} />
        ),
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='hourglass' size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalPalette.colors.primary500 },
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={
                { headerShown: false }
              }
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
