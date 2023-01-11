import { PokemonData } from "./types";

const pkmnToDto = (pokemon: PokemonData): PokemonData => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    abilities: pokemon.abilities,
    types: pokemon.types,
    stats: pokemon.stats,
  };
};

export { pkmnToDto };
