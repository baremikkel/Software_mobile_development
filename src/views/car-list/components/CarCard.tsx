import type { Car } from '@/types';
import {HStack, Image, Text, View, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {Button, StyleSheet} from 'react-native';
import { Rating } from './Rating';
import {useNavigation} from "@react-navigation/native";


type Props = {
  car: Car;
};
export const CarView = ({ car }: Props) => {
  const navigation = useNavigation();
  return (
      <View>
        <Button
            onPress={()=>navigation.navigate('CarView')}>
        </Button>
      </View>
  )
}

export const CarCard = ({ car }: Props): JSX.Element => {
  return (
    <VStack style={styles.carCard}>
      <Image
        source={{ uri: car.images[0] }}
        style={styles.image}
        alt="Car image"
      />
      <HStack style={styles.information}>
        <VStack>
          <Text size="lg" fontWeight="bold">
            {car.make} {car.model}
          </Text>
          <Rating totalRatings={car.totalRatings} rating={car.rating} />
        </VStack>
        <CarView></CarView>
        <VStack style={styles.priceBox}>
          <Text size="xl" fontWeight="bold" textAlign="center" color="$white">
            {car.price}
          </Text>
          <Text size="xs" textAlign="center" color="$white">
            DKK/day
          </Text>
        </VStack>
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
    width: 70,
    height: 57,
    justifyContent: 'space-around',
    backgroundColor: '#6EBFED',
    borderRadius: 10
  }
});
