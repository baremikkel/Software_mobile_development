import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
export const ListedCar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.text}>Your car has now been listed!</Text>
                <Text style={styles.text}>🎉</Text>
            </View>
            <View>
                <Text>since this is not a requirement, it hasnt been added to firebase</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 30,
    }
})