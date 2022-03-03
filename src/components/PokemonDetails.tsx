import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterface';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull
}

export const PokemonDetails = ({ pokemon }: Props) => {

    //Manejo de las imagenes
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ ...StyleSheet.absoluteFillObject }}
        >

            {/* view drive types and ps */}
            <View style={{ ...styles.container, marginTop: 370 }}>
                <Text style={styles.title}>Types</Text>

                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text style={{ ...styles.regularText, marginRight: 15 }} key={type.name}>
                                {type.name}
                            </Text>
                        ))
                    }
                </View>

                <Text style={styles.title}>Peso</Text>
                <Text style={styles.regularText}>{pokemon.weight} Kg.</Text>

            </View>

            {/* view drive Sprites */}
            <View style={styles.container}>
                <Text style={styles.title}>Sprites</Text>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.front_shiny}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_shiny}
                    style={styles.basicSprite}
                />
            </ScrollView>

            {/* view drive Skills */}
            <View style={styles.container}>
                <Text style={styles.title}>Skill Base</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map(({ ability }) => (
                            <Text style={{ ...styles.regularText, marginRight: 15 }} key={ability.name}>
                                {ability.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* view drive Move */}
            <View style={styles.container}>
                <Text style={styles.title}>Moves</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map(({ move }) => (
                            <Text style={{ ...styles.regularText, marginRight: 15 }} key={move.name}>
                                {move.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* view drive stats */}
            <View style={styles.container}>
                <Text style={styles.title}>Stats</Text>
                <View>
                    {
                        pokemon.stats.map((stat, i) => (
                            <View key={stat.stat.name + i}
                                style={{ flexDirection: 'row' }}
                            >
                                <Text style={styles.regularStats}>
                                    {stat.stat.name}
                                </Text>
                                <Text style={styles.regularStatsTwo}>
                                    {stat.base_stat}
                                </Text>
                            </View>
                        ))
                    }
                </View>

                {/* sprite end */}
                <View style={{
                    marginBottom: 20,
                    alignItems: 'center'
                }}>
                    <FadeInImage
                        uri={pokemon.sprites.front_default}
                        style={styles.basicSprite}
                    />
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 20,
    },
    regularStats: {
        fontSize: 20,
        width: '90%',
        borderBottomWidth:1,
        borderBottomColor:'#438896',
    },
    regularStatsTwo: {
        fontSize: 20,
        fontWeight:'bold',
        width: '9%',
        borderBottomWidth:1,    
        borderBottomColor:'#438896',
    },
    basicSprite: {
        height: 100,
        width: 100
    }
})