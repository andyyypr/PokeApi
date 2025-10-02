const PokeApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

async function dataPkmns(pkmnUrl) {
  const response = await fetch(pkmnUrl);
  return await response.json();
}

// Función para crear la card
async function createHtmlCard(data) {
  const container = document.querySelector(".card__container");

  //h2 para los movimientos de los pokemons
  const cardFace2 = document.createElement("DIV");
  cardFace2.classList.add("card__face", "back-2");
  const h2 = document.createElement("H2");
  h2.textContent = "Movements";
  cardFace2.appendChild(h2);

  for (const pokemon of data.results) {
    try {
      const info = await dataPkmns(pokemon.url);

      const card = document.createElement("DIV");
      card.classList.add("flip-card");

      const cardInner = document.createElement("DIV");
      cardInner.classList.add("flip-card-inner");

      //manejar los tipos(algunos tienen un solo tipo)
      const tipos = info.types.map((t) => t.type.name).join(" - ");

      cardInner.innerHTML = `
          
          <div class="card__face front">
            <p class="num_pkm">${info.id}</p>
            <img class="img_pkm" src=" ${info.sprites.front_default}" alt="${info.name}" />
            <h2 class="name_pkm">${info.name}</h2>
            <div class="data__container">
              <h3 id="weight_pkm">Weight: ${info.weight} kg</h3>
              <h3 id="height_pkm">Height: ${info.height}</h3>
            </div>
            <h3 id="type_pkmn">Type: ${tipos}</h3>
          </div>

        
          <div class="card__face back-1">
            <h2>Data</h2>
            <h3 class="pkmnDts">HP: ${info.stats[0].base_stat}</h3>
            <h3 class="pkmnDts">Attack: ${info.stats[1].base_stat}</h3>
            <h3 class="pkmnDts">Defense: ${info.stats[2].base_stat}</h3>
            <h3 class="pkmnDts">Sp. Atk: ${info.stats[3].base_stat}</h3>
            <h3 class="pkmnDts">Sp. Def: ${info.stats[4].base_stat}</h3>
            <h3 class="pkmnDts">Speed: ${info.stats[5].base_stat}</h3>
            <h3 class="pkmnDts">Base Experience: ${info.base_experience}</h3>
        </div>

      `;

      //movements
      const listMoves = document.createElement("div");
      listMoves.classList.add("movements__list");

      for (const movements of info.moves) {
        const movem = document.createElement("h3");
        movem.classList.add("movements__list-item");
        movem.textContent = movements.move.name;

        listMoves.appendChild(movem);
      }
      cardFace2.appendChild(listMoves);

      cardInner.innerHTML += cardFace2.outerHTML;
      card.appendChild(cardInner);
      container.appendChild(card);

      //evento para girar las cards
      let currentFace = 0;
      card.addEventListener("click", () => {
        currentFace = (currentFace + 1) % 3;
        cardInner.style.transform = `rotateY(${currentFace * 120}deg)`;
      });

      console.log("Card created");
    } catch (error) {
      console.error(`Error cargando ${pokemon.name}:`, error);
    }
  }
}
//

// Función principal para obtener los datos y crear las cards
async function getInfoAllPkms() {
  try {
    const response = await fetch(PokeApiUrl);
    const data = await response.json();
    await createHtmlCard(data);
  } catch (error) {
    console.error(error);
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  getInfoAllPkms();
});
