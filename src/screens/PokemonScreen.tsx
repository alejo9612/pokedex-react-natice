import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../navigator/Navigation';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

//Drive Type
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };


export const PokemonScreen = ({ navigation, route }: Props) => {

  const { simplePokemon } = route.params;
  const { name, id, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();
  const { isLoading, pokemon } = usePokemon(id);

  return (

    <View style={{ flex: 1 }}>

      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{ ...styles.backButton, top: top + 5 }}
        >
          <AntDesign name="arrowleft" size={35} color="white" />
        </TouchableOpacity>

        <Text
          style={{ ...styles.PokemonText, top: top + 40 }}
        >
          {name + '\n'}       # {id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />

        <FadeInImage
          uri={picture}
          style={styles.pokemonImage}
        />
      </View>

      {
        isLoading
          ? (<View style={styles.loadingIndicator}>
            <ActivityIndicator
              color='#438896'
              size={50}
            />
          </View>)
          : <PokemonDetails pokemon={pokemon}/>
      }

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: 370,
    backgroundColor: '#438896',
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  PokemonText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-end',//Niega lo que nos manda el padre
    right: 10,

  },
  pokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});