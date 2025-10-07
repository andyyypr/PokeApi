let limit = 40;
let offset = 0;

function getPokeApiUrl() {
  return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
}

async function dataPkmns(pkmnUrl) {
  const response = await fetch(pkmnUrl);
  return await response.json();
}
//Funcion para convertir la primera letra en Mayuscula
function capitalizar(str) {
  return str[0].toUpperCase() + str.slice(1);
}
//Funcion para formatear numeros
function formatearNumero(num) {
  if (num < 10) return `00${num}`;
  if (num < 100) return `0${num}`;
  return `${num}`;
}
// Función para limpiar el contenedor
function clearContainer() {
  const container = document.querySelector(".card__container");
  container.innerHTML = "";
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
          <div class="up_container">
            <p class="num_pkm">#${formatearNumero(info.id)}</p>
            <div class="color_type"></div>
          </div>
          
          <img class="img_pkm" src="${info.sprites.front_default}" alt="${
        info.name
      }" />
          <h2 class="name_pkm">${capitalizar(info.name)}</h2>
          <div class="data__container">
            <div class="info__item">
              <label>Weight</label>
              <p>${info.weight} kg</p>
            </div>
            <div class="info__item">
              <label>Height</label>
              <p>${info.height}</p>
            </div>
          </div>
          <div class="type__container">
            <label>Type</label>
            <p>${tipos}</p>
          </div>
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

      const limitedMoves = info.moves.slice(0, 10); // Mostrar solo primeros 10 movimientos
      for (const movements of limitedMoves) {
        const movem = document.createElement("h3");
        movem.classList.add("movements__list-item");
        movem.textContent = movements.move.name;
        listMoves.appendChild(movem);
      }
      cardFace2.appendChild(listMoves);

      cardInner.innerHTML += cardFace2.outerHTML;
      card.appendChild(cardInner);
      container.appendChild(card);

      listMoves.innerHTML = "";

      //evento para girar las cards
      let currentFace = 0;
      card.addEventListener("click", () => {
        currentFace = (currentFace + 1) % 3;
        cardInner.style.transform = `rotateY(${currentFace * 120}deg)`;
      });
    } catch (error) {
      console.error(`Error cargando ${pokemon.name}:`, error);
    }
  }
}
//

// Función principal para obtener los datos y crear las cards
async function getInfoAllPkms() {
  try {
    const response = await fetch(getPokeApiUrl());
    const data = await response.json();
    await createHtmlCard(data);
  } catch (error) {
    console.error(error);
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const pageLeft_Btm = document.querySelector(".page-left");
  const pageRight_Btm = document.querySelector(".page-right");

  pageRight_Btm.addEventListener("click", function () {
    offset += limit;
    clearContainer();
    getInfoAllPkms();
  });

  pageLeft_Btm.addEventListener("click", function () {
    if (offset > 0) {
      offset -= limit;
      clearContainer();
      getInfoAllPkms();
    }
  });

  getInfoAllPkms();
});
