import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { Result, SimplePokemon } from '../interfaces/pokemonInterface';

export const usePokemonSearch = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const loadPokemons = async () => {
        const resp = await pokemonApi.get('https://pokeapi.co/api/v2/pokemon?limit=1200');
        // console.log(resp.data);
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

        setSimplePokemonList(newPokemonList);
        setIsFetching(false);
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isFetching,
        simplePokemonList,
    }

}

