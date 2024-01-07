import type { Car } from '@/types';
import { Button, HStack, Image, Text, View, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Rating } from './Rating';
import { useNavigation } from '@react-navigation/native';

type Props = {
  car: Car;
};
export const GoToCarView = ({ car }: Props) => {
  const navigation = useNavigation();
  return (
      <View>
        <Pressable
            onPress={() => {
              navigation.navigate('CarView', { car });
            }}>
          <Text>Go to Car view</Text>
        </Pressable>
      </View>
  )
}

export const CarCard = ({ car }: Props): JSX.Element => {
  const firstCarImage = car.images.at(0);
  const navigation = useNavigation();
  return (
    <VStack style={styles.carCard}>
      {firstCarImage &&
      <Image
        source={{ uri: firstCarImage }}
        style={styles.image}
        alt="Car image"
      />}
      <HStack style={styles.information}>
        <VStack>
          <Text size="lg" fontWeight="bold">
            {car.make} {car.model} {car.id}
          </Text>
          <Rating totalRatings={car.totalRatings} rating={car.rating} />
        </VStack>
        <Button onPress={() => {
          navigation.navigate('CarView', { car });
        }} style={styles.priceBox}>
          <VStack alignContent={ 'center' }>
            <Text size="s" textAlign="center" color="$white" bold>
              {car.price}
            </Text>
            <Text size="xs" textAlign="center" color="$white">
              DKK/day
            </Text>
          </VStack>
        </Button>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    aspectRatio: 1.77,
    height: 200,
    borderRadius: 10
  },
  carCard: {
    width: '100%',
    padding: 4,
    gap: 8
  },
  information: {
    justifyContent: 'space-between'
  },
  priceBox: {
    width: 90,
    height: 50,
    justifyContent: 'space-around',
    backgroundColor: '#6EBFED',
    borderRadius: 100
  }
});
