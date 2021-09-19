import { createStore } from 'vuex'
import { IAPIResponse } from '@/models/APIResponse';
import { Pokemon } from '@/models/Pokemon';
import { PokemonSpecies } from '@/models/PokemonSpecies';

const API_URL = "https://pokeapi.co/api/v2";

export default createStore({
  state: {
    pokemon: new Array<Pokemon>(),
  },
  mutations: {
    updatePokemon(state, newPokemon: Pokemon[]) {
      state.pokemon = newPokemon;
    }
  },
  actions: {
    async getPokemonById({commit}, id: number) {
      const res = await fetch(`${API_URL}/pokemon/${id}`);
      const pokemon = await res.json() as Pokemon;

      return pokemon;
    },
    async getPokemonByName({commit}, name: string) {
      const res = await fetch(`${API_URL}/pokemon/${name}`);
      const pokemon = await res.json() as Pokemon;

      return pokemon;
    },
    async getSpeciesByPokemon({commit}, speciesUrl: string) {
      const res = await fetch(speciesUrl);
      return await res.json() as PokemonSpecies;1
    },
    async getAllPokemon({commit}, url = `${API_URL}/pokemon?limit=50`){
      const response = await fetch(url);
      const parsedResponse = await response.json() as IAPIResponse;

      return parsedResponse;
    },
  },
})
