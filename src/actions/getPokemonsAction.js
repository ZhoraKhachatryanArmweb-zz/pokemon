import axios from 'axios'

export const consts = {
    GET_POKEMONS : 'GET_POKEMONS',
    GET_POKEMON_ID: 'GET_POKEMON_ID',
    NEXT_POKEMONS: 'NEXT_POKEMONS',
    PREV_POKEMONS: 'PREV_POKEMONS',
    GET_POKEMON_COLOR: 'GET_POKEMON_COLOR',
    GET_POKEMONS_TABLE: 'GET_POKEMONS_TABLE'
}

const Http = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            let headers = {
                'Content-Type': 'application/json',
            }
            axios.get(url, {
                headers: headers
            })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
        })
    },
}

export default function getPokemons(data) {
    return dispatch => {
        const url = 'https://pokeapi.co/api/v2/pokemon'
        Http.get(url)
        .then((response) => {
            dispatch({
                type: 'GET_POKEMONS',
                payload: response.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export function nextPokemons(data) {
    return dispatch => {
        const url = `${data}`
        Http.get(url)
        .then((response) => {
            dispatch({
                type: 'NEXT_POKEMONS',
                payload: response.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export function prevPokemons(data) {
    return dispatch => {
        const url =  `${data}`;
        Http.get(url)
        .then((response) => {
            dispatch({
                type: 'PREV_POKEMONS',
                payload: response.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export function pokemonId(data) {
    return dispatch => {
        const url = `https://pokeapi.co/api/v2/pokemon/${data.toLowerCase()}`
        Http.get(url)
        .then((response) => {
            dispatch({
                type: 'GET_POKEMON_ID',
                payload: response
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export function pokemonColor(data) {
    return dispatch => {
        const url = `https://pokeapi.co/api/v2/pokemon-color/${data.toLowerCase()}/`
        Http.get(url)
        .then((response) => {
            dispatch({
                type: 'GET_POKEMON_COLOR',
                payload: response
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export function getPokemonsTable(nextCount) {
    return function(dispatch) { 
        const url = 'https://pokeapi.co/api/v2/pokemon'       
        axios.get(url, { params: {offset: 10, limit: 10 } })        
        .then(response => {
            let { results } = response.data;            
            return Promise.all(results.map(pokemon => {
                return axios.get(pokemon.url)
                    .then(response => {
                        let { name, height, weight, sprites } = response.data
                        let pokemon = { avatar: sprites.front_default, name, height, weight }
                        return pokemon
                    });
            }))
            .then(response => {
                dispatch({
                    type: 'GET_POKEMONS_TABLE',
                    payload: response
                })
            })
        })
    }    
}