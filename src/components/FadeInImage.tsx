import React, { useState } from 'react'
import { ActivityIndicator, Animated, ImageErrorEventData, ImageStyle, NativeSyntheticEvent, StyleProp, View } from 'react-native'
import { useAnimation } from '../hooks/useAnimation';

//Interfaz de las propiedades necesarias
interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} } : Props) => {

    //Menjo de nuestr hook para mostrar animación
    const { opacity, fadeIn } = useAnimation();
    const [ isLoading, setIsLoading ] = useState( true );

    //Función que maneja mi estado de carga
    const finishLoading = () => {
        setIsLoading(false);
        fadeIn();
    }

    //Función que manejará el error de la carga Image
    const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
        setIsLoading( false );
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...style as any,
        }}>
            
            {
                isLoading && 
                    <ActivityIndicator 
                        style={{ position: 'absolute' }} 
                        color="grey"
                        size={ 30 }
                    />
            }

            <Animated.Image 
                source={{ uri }}
                onError={ onError } 
                onLoad={ finishLoading }
                style={{
                    ...style as any,
                    opacity
                }}
            />

        </View>
    )
}
