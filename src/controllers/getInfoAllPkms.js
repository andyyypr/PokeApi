const getPkmnNameUrl = require("../services/pokeApiGet");
const PokeApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1&offset=0";

async function dataPkmns(pkmnUrl) {
  const response = await fetch(pkmnUrl);
  const dataPkmns = await response.json();
  return dataPkmns;
}

async function getInfoAllPkms() {
  try {
    const data = await getPkmnNameUrl.getPkmn(PokeApiUrl);
    for (const pokemon of data.results) {
      const info = await dataPkmns(pokemon.url);
      console.log(`Numero: ${info.id}`);
      console.log(`Imagen: ${info.sprites.front_default}`);
      console.log(`Nombre: ${info.name}`);
      console.log(`Peso: ${info.weight}`);
      console.log(`Altura: ${info.height}`);
      console.log(
        `Tipo: ${info.types[0].type.name} - ${info.types[1].type.name}`
      );
      //stats
      console.log(`HP: ${info.stats[0].base_stat}`);
      console.log(`attack: ${info.stats[1].base_stat}`);
      console.log(`defense: ${info.stats[2].base_stat}`);
      console.log(`special-attack: ${info.stats[3].base_stat}`);
      console.log(`special-defense: ${info.stats[4].base_stat}`);
      console.log(`speed: ${info.stats[5].base_stat}`);
      console.log(`Experiencia base: ${info.base_experience}`);

      //movements
    }
  } catch (error) {
    console.error(error);
  }
}

getInfoAllPkms();
