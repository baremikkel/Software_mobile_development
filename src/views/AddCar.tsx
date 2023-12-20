import { Car, Fuel, Gear, Feature } from '../../src/types';
import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { RadioButton, Checkbox } from 'react-native-paper';

const EnumListRadio = ({ enumObject }) => {
    const [checked, setChecked] = React.useState(Object.keys(enumObject)[0])
    return (
        <View>
            {Object.entries(enumObject).map(([key, value]) => (
                <View key={key}>
                    <RadioButton.Item
                        label={value}
                        value={key}
                        status={checked === key ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(key)}
                    />
                </View>
            ))}
        </View>
    );
};
const EnumListCheckbox = ({ enumObject }) => {
    const [checkedItems, setCheckedItems] = React.useState({});

    const handleCheckboxChange = (key) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [key]: !prevCheckedItems[key],
        }));
    };

    return (
        <View>
            {Object.entries(enumObject).map(([key, value]) => (
                <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                        status={checkedItems[key] ? 'checked' : 'unchecked'}
                        onPress={() => handleCheckboxChange(key)}
                    />
                    <Text>{value}</Text>
                </View>
            ))}
        </View>
    )
}

export const AddCar = () => {
    const [addCar, setAddCar] = useState<Omit<Car, 'id' | 'rating' | 'totalRatings' | 'available'>>({
        fuel: Fuel.PETROL,
        gear: Gear.AUTOMATIC,
        features: [],
        images: [],
        make: '',
        model: '',
        price: 0,
        seats: 0,
        year: 0
    });
    const listCar = () => {

    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Model</Text>
            <TextInput style={styles.textArea} value={addCar.model} onChangeText={(val) => setAddCar((prev) => ({ ...prev, model: val }))} />
            <Text style={styles.text}>Year</Text>
            <TextInput style={styles.textArea} value={addCar.year} onChangeText={(val) => setAddCar((prev) => ({ ...prev, year: val }))}></TextInput>
            <Text style={styles.text}>Gear type</Text>
            <EnumListRadio enumObject={Gear} />
            <Text style={styles.text}>Seats</Text>
            <TextInput style={styles.textArea} value={addCar.seats} onChangeText={(val) => setAddCar((prev) => ({ ...prev, seats: val }))}></TextInput>
            <Text style={styles.text}>Fuel type</Text>
            <EnumListRadio enumObject={Fuel} />
            <Text style={styles.text}>Description</Text>
            <TextInput style={styles.textAreaDiscription} value={addCar.description} onChangeText={(val) => setAddCar((prev) => ({ ...prev, description: val }))}></TextInput>
            <Text style={styles.text}>Features</Text>
            <EnumListCheckbox enumObject={Feature} />
            <Text style={styles.text}>Price</Text>
            <TextInput style={styles.textArea} value={addCar.price} onChangeText={(val) => setAddCar((prev) => ({ ...prev, price: val }))}></TextInput>
            <Pressable onPress={listCar()}>
                <Text>List Car</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        marginLeft: 10,
        fontWeight: 'bold',
        width: 200,
    },
    textArea: {
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'black',
        width: 300
    },
    textAreaDiscription: {
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'black',
        width: 300,
        height: 200,
    }

});
