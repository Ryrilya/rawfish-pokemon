import { createStore } from 'vuex'
import { IAPIResponse, ISource } from '@/models/APIResponse';
import { IPokemon } from '@/models/IPokemon';

const API_URL = "https://pokeapi.co/api/v2";

export default createStore({
  state: {
    pokemon: new Array<IPokemon>(),
  },
  mutations: {
    updatePokemon(state, newPokemon: IPokemon[]) {
      state.pokemon = newPokemon;
    }
  },
  actions: {
    async getPokemonById({commit}, id: number) {
      const res = await fetch(`${API_URL}/pokemon/${id}`);
      const pokemon = await res.json() as IPokemon;

      return pokemon;
    },
    /** 
     * This function is called at the very beginning and whenever the user
     * clicks "previous" or "next" button on the interface.
    */
    async getAllPokemon({commit}, url = `${API_URL}/pokemon?limit=50`){
      const response = await fetch(url);
      const parsedResponse = await response.json() as IAPIResponse;

      return parsedResponse;
    },
  },
})
