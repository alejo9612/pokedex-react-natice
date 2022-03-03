import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View, Platform, StyleProp, ViewStyle } from 'react-native';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useState, useEffect } from 'react';


//Manejo de las props a recibir con su respectiva funcion de style y function
interface Props {
    style?: StyleProp<ViewStyle>
    onDebaunced: (value: string) => void;
}

export const SearchInpunts = ({ style, onDebaunced }: Props) => {

    //Menjo de mi estado segun cambio de textvalue
    const [textValue, setTextValue] = useState('');
    //Manejo de mi hook para controlar el cambio de busqueda
    const { debouncedValue } = useDebouncedValue(textValue, 1000);

    useEffect(() => {
        //console.log({debouncedValue}) nos toma el dato una vez se deje de escribir
        onDebaunced(debouncedValue); //Se le encia como argumento el cambio notado en el hook propio
    }, [debouncedValue])


    return (
        <View style={{
            ...styles.container,
            ...style as any//confia en mi typescript
        }}>
            <View style={{
                ...styles.TextBackground,
                top: (Platform.OS === 'ios') ? 0 : 2
            }}>
                <TextInput
                    placeholder='Search Pokemon'
                    style={styles.textInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={setTextValue}
                />
                <Ionicons name="search-outline" size={25} color='grey' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'green'
    },
    TextBackground: {
        backgroundColor: '#F3F1F3',
        height: 40,
        borderRadius: 80,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 18
    }
})