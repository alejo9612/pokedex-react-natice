import { useState, useEffect } from 'react';


export const useDebouncedValue = (input: string = '', time: number = 500) => {

    //Manejo del cambio del input, segun el valor ingresado
    const [debouncedValue, setDebouncedValue] = useState(input);


    //Se dispara al notar un cambio en mi input
    useEffect(() => {

        //Control de la  respuesta segun el ffiltro de busqueda hecho
        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time);

        //Una vez note de nuevo un cambio, lo que hará es limpiar lo almacenado anteriormente
        return () => {
            clearTimeout(timeout);
        }

    }, [input])


    return {
        debouncedValue
    }
}

