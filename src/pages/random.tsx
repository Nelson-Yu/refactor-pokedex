import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import HiddenPokemonCard from "../components/PokemonCard";
import { pkmnToDto } from "../utils";
import { PokemonData } from "../utils/types";

interface PokemonProps {
  data: PokemonData;
}

export default function Random({ data }: PokemonProps) {
  const [reveal, setReveal] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center items-center h-full w-full flex-col">
        <div className="m-4">
          <Image
            src="https://camo.githubusercontent.com/5d1fe59c3f0e4cfb5480bb8d8b1eb3ba58906acef846904fde8afcc5f773adbb/68747470733a2f2f692e696d6775722e636f6d2f583962314b75362e706e67"
            alt="Who's that Pokemon?"
            height={75}
            width={200}
          />
        </div>

        <HiddenPokemonCard
          pokemon={data}
          reveal={reveal}
          showHint={showHint}
          hidden={true}
        />

        <div className="flex justify-center items-center flex-row">
          {/* <button
            onClick={() => setReveal(true)}
            className="m-2 p-2 w-32 flex justify-center items-center bg-white text-black border-red-600 border-4 rounded-md font-semibold text-2xl"
          >
            Reveal
          </button> */}
          <Button onClick={() => setReveal(true)}>Reveal</Button>
          <Button onClick={() => setShowHint(true)}>Hint</Button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const randomId = Math.floor(Math.random() * 906);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const pokemonData: PokemonData = await res.json();
  const data = pkmnToDto(pokemonData);

  return {
    props: { data },
  };
};
