import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import ProductListScreen from '@/screens/ProductListScreen';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import ShoppingCartScreen from '@/screens/ShoppingCartScreen';
import ProductSearchScreen from '@/screens/ProductSearchScreen';
import SplashScreen from '@/screens/SplashScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  ProductListScreen: undefined;
  ProductDetailScreen: { id: number };
  ShoppingCartScreen: undefined;
  ProductSearchScreen: undefined;
};

const Stack = createStackNavigator();

function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='ProductListScreen' component={ProductListScreen} />
        <Stack.Screen
          name='ProductDetailScreen'
          component={ProductDetailScreen}
        />
        <Stack.Screen
          name='ShoppingCartScreen'
          component={ShoppingCartScreen}
        />
        <Stack.Screen
          name='ProductSearchScreen'
          component={ProductSearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
