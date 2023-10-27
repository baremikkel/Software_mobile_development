import { NavigationContainer } from '@react-navigation/native';
import {
  type BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CarList } from './src/views/car-list/CarList';
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

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="CarList"
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

type Route = {
  name: string;
  component: () => JSX.Element;
  icon: any;
  disabled: boolean;
};

// @ts-expect-error Produces a complex type error, but it works
const routes: Route[] = [
  {
    name: 'AddCar',
    component: CarList,
    icon: AddIcon,
    disabled: true
  },
  {
    name: 'CarList',
    component: CarList,
    icon: MenuIcon,
    disabled: false
  },
  {
    name: 'Profile',
    component: CarList,
    icon: SettingsIcon,
    disabled: true
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
