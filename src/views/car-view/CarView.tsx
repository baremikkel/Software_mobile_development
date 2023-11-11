import React from 'react';
import {CarPictureScroll} from './components/CarPictureScroll';
import {View, Text} from '@gluestack-ui/themed';

export const CarView = ({route}): React.JSX.Element => {
    return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <CarPictureScroll curCar={route.params.car}/>
            <Text>
                This is the *** car view
            </Text>
        </View>);
}
