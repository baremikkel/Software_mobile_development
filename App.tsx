import { NavigationContainer } from '@react-navigation/native';
import {
  type BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CarList } from './src/views/car-list/CarList';
import { AddCar } from './src/views/AddCar';
import { ListedCar } from './src/views/ListedCar'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  AddIcon,
  GluestackUIProvider,
  Icon,
  MenuIcon,
  SettingsIcon,
  Text,
  View
} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { TouchableOpacity } from 'react-native';
import { registerRootComponent } from 'expo';
import React from 'react';
import { CarView } from './src/views/car-view/CarView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="CarViewWithNavigator"
              tabBar={(props) => TabBar({ ...props })}
              screenOptions={{
                headerShown: false
              }}
            >
              {routes.map((route) => (
                <Tab.Screen
                  key={route.name}
                  name={route.name}
                  component={route.component}
                />
              ))}
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

const CarRouter = () => {
  return <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name="CarList" component={CarList}
    />
    <Stack.Screen name="CarView" component={CarView}
    />
  </Stack.Navigator>
}

type Route = {
  name: string;
  component: () => JSX.Element;
  icon: any;
  disabled: boolean;
};

// @ts-expect-error Produces a complex typ
// e error, but it works
const routes: Route[] = [
  {
    name: 'AddCar',
    component: AddCar,
    icon: AddIcon,
    disabled: false
  },
  {
    name: 'CarViewWithNavigator',
    component: CarRouter,
    icon: MenuIcon,
    disabled: false
  },
  {
    name: 'Profile',
    component: CarList,
    icon: SettingsIcon,
    disabled: true
  },
  {
    name: 'ListedCar',
    component: ListedCar,
    disabled: false
  }
];

function TabBar({
  state,
  descriptors,
  navigation
}: BottomTabBarProps): JSX.Element {
  return (
    <View
      display="flex"
      flexDirection="row"
      paddingHorizontal="$8"
      paddingVertical="$4"
      justifyContent="space-between"
      width="$full"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const matchedRoute = routes.find((r) => r.name === route.name);
        const icon = matchedRoute?.icon ? (
          <Icon
            as={matchedRoute.icon}
            size="xl"
            color={matchedRoute.disabled ? '$backgroundDark200' : '$black'}
          />
        ) : (
          <Text>?</Text>
        );

        const isFocused = state.index === index;

        const onPress = (): void => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = (): void => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        // TODO: Add background highlight if the tab is focused
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={matchedRoute?.disabled}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default App;
registerRootComponent(App);
