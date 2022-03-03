import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'


//Manejo del spinner carga
export const Loading = () => {
    return (
        <View style={stylesSearch.aciityContainer}>
            <ActivityIndicator
                size={60}
                color='#438896'
            />
            <Text>Loading ...</Text>
        </View>
    )
}

const stylesSearch = StyleSheet.create({
    aciityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})