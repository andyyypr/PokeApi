const getPkmnNameUrl = require("../services/pokeApiGet");
const PokeApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

async function dataPkmns(pkmnUrl) {
  const response = await fetch(pkmnUrl);
  const dataPkmns = await response.json();
  return dataPkmns;
}

async function getAllPkms() {
  try {
    const data = await getPkmnNameUrl.getPkmn(PokeApiUrl);
    for (const pokemon of data.results) {
      const info = await dataPkmns(pokemon.url);
      console.log(`Nombre: ${info.name}`);
      console.log(info.order);
      console.log(info.past_abilities);
      console.log(info.past_type);
      console.log(info.sprites.front_default);
      console.log(info.weight);
    }
  } catch (error) {
    console.error(error);
  }
}

getAllPkms();
