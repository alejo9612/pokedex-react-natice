import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { Result, SimplePokemon } from '../interfaces/pokemonInterface';

export const usePokemonPaginated = () => {

    const [isLoading, setIsLoading] = useState(true);
    //Asigacion de estado a manejar con el formato tipado del array
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40/');

    const loadPokemons = async () => {
        setIsLoading(true);
        const resp = await pokemonApi.get(nextPageUrl.current);
        // console.log(resp.data);
        nextPageUrl.current = resp.data.next;
        mapPokemonList(resp.data.results);
    }

    const mapPokemonList = (pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {

            //Se paramos el texto parra obtener su idd
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2];

            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return {
                id,
                picture,
                name
            }
        });

        setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }

}

