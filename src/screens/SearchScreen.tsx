import React from 'react';
import { View, Text, Platform, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInpunts } from '../components/SearchInpunts';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import { useState, useEffect } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterface';



const screenWidth = Dimensions.get('window').width;


export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    //Manejo del array que se manejara con respeco al tipado
    const [pokemonFilter, setPokemonFilter] = useState<SimplePokemon[]>([]);

    const [term, setTerm] = useState('');

    //Manejo del efecto alanzar segun corresponda, por el cambio en el input
    useEffect(() => {
        if (term.length === 0) {
            return setPokemonFilter([]);
        }

        //Con esta condición lo que hacemos es que validamos si no es un numero (false) filtre por name
        if (isNaN(Number(term))) {
            setPokemonFilter(
                simplePokemonList.filter(
                    (poke) => poke.name.toLocaleLowerCase()
                        .includes(term.toLocaleLowerCase())
                )
            )
        } else { //En este caso si es un numero me filtra por numero el pokemon
            const pokemonById = simplePokemonList.find((poke) => poke.id === term);
            setPokemonFilter(
                (pokemonById) ? [pokemonById] : []
            )
        }

    }, [term])


    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={{
            flex: 1,
            //marginTop: (Platform.OS === 'ios') ? top : top + 10,
            marginHorizontal: 20
        }}>
            <SearchInpunts
                onDebaunced={(value) => setTerm(value)} //Le indicamos el valor a la funcion que se recibe y se setea el valor
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 20,
                }}
            />

            <FlatList
                data={pokemonFilter}
                keyExtractor={(pokemon) => pokemon.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}

                //Header de la tabla
                ListHeaderComponent={(
                    <Text style={{
                        ...styles.title,
                        ...styles.globalMargin,
                        paddingBottom: 10,
                        marginTop: (Platform.OS === 'ios') ? top + 60 : top + 65,
                    }}>{term}</Text>
                )}
                renderItem={({ item }) => (<PokemonCard pokemon={item} />)}
            />
        </View>
    )
}

