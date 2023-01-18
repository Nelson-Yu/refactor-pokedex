import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { pkmnToDto } from "../utils";
import { PokemonData } from "../utils/types";

interface PokemonProps {
  data: PokemonData[];
}

export default function Home({ data: pokemonData }: PokemonProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/pokemon/${searchInput}`);
  };

  const renderRandomPokemon = () => {
    return pokemonData.map((pokemon) => (
      <PokemonCard key={pokemon.id} pokemon={pokemon} hidden={false} />
    ));
  };

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col justify-center items-center"
        >
          <input
            type="text"
            placeholder="Search for a Pokemon"
            onChange={(e) => handleChange(e)}
            className="m-2 p-2 flex justify-center items-center bg-white text-black border-red-600 border-4 rounded-md font-semibold text-2xl placeholder:italic"
          />
          <button
            type="submit"
            className="m-2 p-2 w-32 flex justify-center items-center bg-white text-black border-red-600 border-4 rounded-md font-semibold text-2xl"
          >
            Search
          </button>
        </form>

        <div className="flex justify-center items-center">
          {renderRandomPokemon()}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let pokemonData;

  try {
    const randomIds = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 906)
    );

    // charmander---------->pikachu------------------->mew

    // for (const id of randomIds) {
    //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    //   const data = await res.json();
    //   pokemonData.push(pkmnToDto(data));
    // }

    // charmander--->  |
    // pikachu--->     |
    // mew --->        |

    // [promise, promise, promise]
    const fetchPokemonArr = randomIds.map(
      async (id) => await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );

    // Promise chained solution
    // pokemonData = await Promise.all(fetchPokemonArr)
    //   .then((res) => Promise.all(res.map((r) => r.json())))
    //   .then((data) => data.map((d) => pkmnToDto(d)));

    // Non promise-chained solution
    // res = [response1, response2, response3]
    const responses = await Promise.all(fetchPokemonArr);

    // data = [responseData1, responseData2, responseData3]
    const data = await Promise.all(responses.map((r) => r.json()));

    // pokemonData = [data1, data2, data3]
    pokemonData = data.map((d) => pkmnToDto(d));
  } catch (err) {
    console.error(err);
  }

  return {
    props: { data: pokemonData },
  };
};
