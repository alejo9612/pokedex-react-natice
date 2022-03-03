import { useState, useEffect } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonFull } from '../interfaces/pokemonInterface';


export const usePokemon = (id: string) => {

    //Manejo de la carga de datos
    const [isLoading, setIsLoading] = useState(true);

    const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);//Es una manera de inicializar sin error por el obj vacio

    const loadPokemon = async () => {
        const answer = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(answer.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemon();
    }, [])


    return {
        isLoading,
        pokemon
    }

}
