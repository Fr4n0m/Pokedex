const loadPokemonImages = function () {
  for (var i = 1; i <= 151; i++) {
    $(".PokemonImgs").append(
      `<img class="pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/` +
        i +
        `.png"/>`
    );
  }
};

$(document).ready(function () {
  loadPokemonImages(); // Load pokemon images
});

async function showInfoPokemon(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    //Actualizar datos de la pokedex
    $("#PokemonName").text(data.name);
    $(".PokedexImg").attr("src", data.sprites.front_default);
    $(".PokedexList").empty(); // Limpiar tipos, sino se acumulan
    data.types.forEach((type) => {
      $(".PokedexList").append(`<li>${type.type.name}</li>`);
    });
    $("#PokedexHeight").text(data.height);
    $("#PokedexWeight").text(data.weight);
  } catch (error) {
    console.error(
      `Error al obtener la información del Pokémon: ${name}`,
      error
    );
  }
}

document.addEventListener("click", function (event) {
  const pokemonImage = event.target.closest(".pokemon");

  if (pokemonImage) {
    const name = pokemonImage.getAttribute("src").match(/\/(\d+)\.png/)[1]; //Obtener nombre de la imagen al hacer click
    showInfoPokemon(name);
  }
});
