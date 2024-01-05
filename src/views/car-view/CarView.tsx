import React from 'react';
import { Box, Button, Center, FlatList, HStack, Image, Text, View, VStack } from '@gluestack-ui/themed';
import { ScrollView, StyleSheet } from 'react-native';
import { Rating } from '../../views/car-list/components/Rating';
import { updateAvailability } from '../../Test';
import { useNavigation } from '@react-navigation/native';


export const CarView = ({ route }): React.JSX.Element => {
  const currentCar = route.params.car;

  const buttonText = currentCar.available ? 'Book' : 'Unbook';
  const navigation = useNavigation();

  return (
    <View>
      <Center>
        <HStack style={styles.header}>
          <Text size="xl" fontWeight="$semibold" height="auto">
            {currentCar.make} {currentCar.model}
          </Text>
        </HStack>
        <Box>
          <ScrollView horizontal={true}>
            {currentCar.images.map((image) => <Image
              source={{ uri: image }}
              alt="Car image"
              key={currentCar.id}
              width={100}
              style={styles.image}
            />)}
          </ScrollView>
          <HStack style={styles.information}>
            <VStack>
              <Button style={styles.priceBox} onPress={
                () => { updateAvailability(currentCar.id);
                  navigation.navigate('CarList');
                  currentCar.available = !currentCar.available;
                }}>
                {buttonText}
                </Button>
                <Rating totalRatings={currentCar.totalRatings} rating={currentCar.rating} />
            </VStack>
            <VStack>
              <Text>
                {currentCar.fuel}
              </Text>
            </VStack>
            <VStack>
              <Text>
                Features:
              </Text>
              <FlatList
                data={currentCar.features}
                renderItem={({ item }) => <Text>{item}</Text>}
              />
            </VStack>
          </HStack>
        </Box>
      </Center>
      <Box margin={40} height={240} width={480} alignSelf={'center'} bgColor="$blue200">
        <Text>
          {currentCar.description}
        </Text>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    aspectRatio: 1.77,
    height: 200,
    borderRadius: 10,
    margin: 10
  },
  header: {
    marginTop: 24,
    marginLeft: 48,
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  information: {
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    marginX: 18,
    minHeight: '100%'
  },
  priceBox: {
    width: 80,
    height: 48,
    justifyContent: 'space-around',
    backgroundColor: '#6EBFED',
    borderRadius: 10
  }
});
