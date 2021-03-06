import React from 'react'
import { Text, Image, FlatList, ActivityIndicator, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme'


export const HomeScreen = () => {

    //Manejo del top a manejar del a vista de la pantalla
    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    usePokemonPaginated();

    return (
        <>
            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />

            <View style={{ alignItems: 'center' }}>
                <FlatList
                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}

                    //Header de la tabla
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom:10
                        }}>Pokedex</Text>
                    )}
                    renderItem={({ item }) => (<PokemonCard pokemon={item} />)}

                    //infinite scroll
                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}

                    ListFooterComponent={(
                        <ActivityIndicator style={{ height: 100 }}
                            size={20}
                            color='#438896'
                        />
                    )}
                />
            </View>
        </>
    )
}
