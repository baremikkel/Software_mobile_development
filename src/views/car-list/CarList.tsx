import { ScrollView, StyleSheet } from 'react-native';
import { useCars } from '../../hooks/use-cars';
import { Button, Center, HStack, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { CarCard } from './components/CarCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createCar } from '../../Test';

export const CarList = (): JSX.Element => {
  const {
    data: cars,
    isLoading,
    isError
  } = useCars({filters: {available: true}});

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;
  if (cars?.length === 0) {
    return (
      <><Text>No cars</Text><Button onPress={createCar}>
        CLICK ME
      </Button></>);
  }

  return (
    <SafeAreaView>
      <Center>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.containerInner}
        >
          <HStack style={styles.header}>
            <Text size="xl" fontWeight="$semibold" height="auto">
              See available cars
            </Text>
            <Button onPress={() => {
              useCars({});
            }}>
              Update
            </Button>
          </HStack>
          <VStack gap={16} marginTop={24} >
            { cars?.map((car) => car.available ? <CarCard key={car.id} car={car}/> : <Text key={car.id}>{car.id} is booked</Text>
            )}
          </VStack>
        </ScrollView>
      </Center>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    marginX: 18,
    minHeight: '100%'
  },
  containerInner: {
    alignItems: 'center'
  },
  header: {
    marginTop: 24,
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignContent: 'center'
  }
});
