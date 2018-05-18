import { consts } from '../actions/getPokemonsAction';

const initial = {
  allPokemons: {},
  pokemonUnit: {},
  nextOrder: {},
  prevOrder: {},
  fetchNext: false,

};

export default function reducer(state = initial, action) {
  switch (action.type) {
    case consts.GET_POKEMONS: {
      state = Object.assign({}, state, {allPokemons: action.payload} );
      break;
    }
    case consts.GET_POKEMON_ID: {
      state = Object.assign({}, state, {pokemonUnit:action.payload.data} );
      break;
    }
    case consts.NEXT_POKEMONS: {
      state = Object.assign({}, state, {nextOrder:action.payload.next, fetchNext: true, allPokemons: action.payload});
      break;
    }
    case consts.PREV_POKEMONS: {
      state = Object.assign({}, state, {prevOrder:action.payload.previous, allPokemons: action.payload});
      break;
    }
    default:
    return state;
  }
  return state;
}
