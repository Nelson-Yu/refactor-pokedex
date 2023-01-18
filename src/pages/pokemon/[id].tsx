import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import PokemonCard from "../../components/PokemonCard";
import { pkmnToDto } from "../../utils";
import { PokemonData } from "../../utils/types";

interface PokemonProps {
  data: PokemonData;
}

export default function Pokemon({ data }: PokemonProps) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center items-center h-screen w-screen">
        <PokemonCard pokemon={data} hidden={false} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonData: PokemonData = await res.json();
  const data = pkmnToDto(pokemonData);

  return {
    props: { data },
  };
};
