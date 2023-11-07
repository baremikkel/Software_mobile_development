import React from 'react';
import {CarPictureScroll} from "./components/CarPictureScroll";
import {View,Text} from "@gluestack-ui/themed";
export const CarView = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                This is the *** car view
            </Text>
            <CarPictureScroll>

            </CarPictureScroll>
        </View>
    );
}
