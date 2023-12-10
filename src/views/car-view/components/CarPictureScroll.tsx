import React from 'react';
import {
    SafeAreaView, ScrollView, StyleSheet
} from 'react-native';
import {Image, View, Text, VStack} from '@gluestack-ui/themed';
import {useCars} from '../../../hooks/use-cars';
import {type Car} from '@/types';
import {Rating} from '../../car-list/components/Rating';

type Props = {
    curCar: Car;
};
export const CarPictureScroll = (car: Props) => {
    const {isLoading, isError} = useCars({});

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error</Text>;
    if (car.curCar === null) return <Text>No cars</Text>;
    /*
      TODO Add a image container for displaying the current picture and allowing for a user to select element from scrollview
    */
    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.containerInner}
                    horizontal={true}
                >
                    {car.curCar.images.map((image) => <Image
                        source={{uri: image}}
                        alt="Car image"
                        key={car.curCar.id}
                        width={100}
                        style={styles.image}
                    />)}
                </ScrollView>
                <VStack>
                    <Text size="lg" fontWeight="bold">
                        {car.curCar.make} {car.curCar.model}
                    </Text>
                    <Rating totalRatings={car.curCar.totalRatings} rating={car.curCar.rating} />
                </VStack>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex', flexDirection: 'column', width: '95%', marginX: 18, minHeight: '100%'
    },
    containerInner: {
        alignItems: 'center'
    },
    image: {
        width: 'auto', aspectRatio: 1.77, height: 200, borderRadius: 10
    },
    header: {
        marginTop: 24, width: '100%', height: 50, justifyContent: 'space-between', alignContent: 'center'
    }
});