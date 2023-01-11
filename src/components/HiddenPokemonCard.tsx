import Image from "next/image";
import typeColours from "../utils/colours";
import { PokemonData } from "../utils/types";

interface HiddenPokemonCardProps {
  pokemon: PokemonData;
  reveal: boolean;
  showHint: boolean;
}

export default function HiddenPokemonCard({
  pokemon,
  reveal,
  showHint,
}: HiddenPokemonCardProps) {
  let statLabel = {
    hp: "HP",
    attack: "Atk",
    defense: "Def",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "Spe",
  };

  return (
    <>
      <div className="m-8 p-8 flex justify-center items-center flex-col border-4 border-red-600 rounded-lg bg-white text-black">
        <h1 className={`text-2xl ${!reveal ? "invisible" : "visible"}`}>
          {pokemon.name.toUpperCase()}
        </h1>
        <div className="flex flex-row justify-center items-center">
          {pokemon.types.map((pkmnType, index) => {
            let showType = reveal || showHint;

            let typeStyle = {
              color: `${
                typeColours[pkmnType.type.name as keyof typeof typeColours]
              }`,
              border: `solid 0.125rem ${
                typeColours[pkmnType.type.name as keyof typeof typeColours]
              }`,
              backgroundColor: showType
                ? `${
                    typeColours[pkmnType.type.name as keyof typeof typeColours]
                  }50`
                : "black",
              filter: showType ? "" : "brightness(0)",
            };

            return (
              <div
                key={index}
                style={typeStyle}
                className="m-2 min-w-[4rem] flex justify-center items-center font-semibold rounded-lg"
              >
                <div>{pkmnType.type.name}</div>
              </div>
            );
          })}
        </div>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={`Image of the pokemon named ${pokemon.name}`}
          width="200"
          height="200"
          style={{ filter: !reveal ? "brightness(0)" : "" }}
        />
        <div className="relative w-full flex justify-start items-start flex-col">
          {pokemon.stats.map((pkmnStat, index) => {
            let barStyle = {
              width: `${(pkmnStat.base_stat / 255) * 100}%`,
              backgroundColor: `${
                pkmnStat.base_stat < 50
                  ? "#EE8130"
                  : pkmnStat.base_stat < 100
                  ? "#F7D02C"
                  : "#7AC74C"
              }`,
            };

            return (
              <div
                key={index}
                className="w-full flex justify-between items-center"
              >
                <h3 className="font-semibold">
                  {statLabel[pkmnStat.stat.name as keyof typeof statLabel]}
                </h3>
                <div className="relative min-w-[80%] min-h-[1rem]">
                  <div style={barStyle} className="h-4 rounded"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
