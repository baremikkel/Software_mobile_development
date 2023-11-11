import React from 'react';
import {
  FlatList, SafeAreaView, ScrollView, StyleSheet, Text
} from 'react-native';
import { Image, View } from '@gluestack-ui/themed';
import { useCars } from '../../../hooks/use-cars';
import { type Car } from '@/types';

type PictureProps = {
  curCar: Car;
};
export const CarPictureScroll = (props: PictureProps) => {
  const { isLoading, isError } = useCars({});

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;
  if (props.curCar === null) return <Text>No cars</Text>;
  /*
    TODO Add a image container for displaying the current picture and allowing for a user to select element from scrollview
  */
  return (<SafeAreaView style={{ flex: 1 }}>
        <View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.containerInner}
                horizontal={true}
            >
                {props.curCar.images.map((image) => <Image
                    source={{ uri: image }}
                    alt="Car image"
                    key={props.curCar.id}
                    width={100}
                    style={styles.image}
                />)}
            </ScrollView>
        </View>
    </SafeAreaView>);
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
