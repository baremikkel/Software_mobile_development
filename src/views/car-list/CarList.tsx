import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useCars } from '../../hooks/use-cars';
import { Text } from '@gluestack-ui/themed';

export const CarList = (): JSX.Element => {
  const {
    data: cars,
    isLoading,
    isError
  } = useCars({
    filters: {}
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;
  if (cars?.length === 0) return <Text>No cars</Text>;

  return (
    <ScrollView style={styles.constainer}>
      {cars?.map((car) => (
        <View key={car.id} style={styles.image}>
          <Image source={{ uri: car.images[0] }} style={styles.image} />
          <Text>{car.make}</Text>
          <Text>{car.id}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: 'green'
  },
  image: {
    backgroundColor: 'red',
    width: 300,
    height: 300,
    margin: 5
  }
});
