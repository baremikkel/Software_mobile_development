import React from 'react';
import {CarPictureScroll} from "./components/CarPictureScroll";
import {SafeAreaView} from "react-native";
export const CarView = (): JSX.Element => {
    return(
        <SafeAreaView>

            <CarPictureScroll></CarPictureScroll>
        </SafeAreaView>
    );
}
