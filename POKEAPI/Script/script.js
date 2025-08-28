const searchBtn = document.getElementById("searchBtn");
const pokemonInput = document.getElementById("pokemonInput");
const pokemonDisplay = document.getElementById("pokemonDisplay");

searchBtn.addEventListener("click", fetchPokemon);

async function fetchPokemon() {
  const query = pokemonInput.value.toLowerCase().trim();

  if (!query) {
    pokemonDisplay.innerHTML =
      "<p class='error'>Please enter a Pokémon name or ID.</p>";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    // Get name, image, and types
    const name = data.name;
    const img = data.sprites.front_default;
    const types = data.types.map((t) => t.type.name).join(", ");

    pokemonDisplay.innerHTML = `
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img src="${img}" alt="${name}">
      <p><strong>Type:</strong> ${types}</p>
    `;
  } catch (error) {
    pokemonDisplay.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
