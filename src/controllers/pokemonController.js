const pokemonService = require("../services/pokemonService");

async function getPokemon(req, res) {
  try {
    const { name } = req.params;
    const userID = req.user.id;
    const pokemon = await pokemonService.getPokemonByName(name, userID);
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePokemonById(req, res) {
  try {
    const { id } = req.params;
    const userID = req.user.id;
    await pokemonService.deletePokemonById(id, userID);
    res.json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePokemonByName(req, res) {
  try {
    const { name } = req.params;
    const userID = req.user.id;
    await pokemonService.deletePokemonByName(name, userID);
    res.json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePokemonsByType(req, res) {
  try {
    const { type } = req.params;
    const userID = req.user.id;
    await pokemonService.deletePokemonsByType(type, userID);
    res.json({ message: "Pokemons deleted successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getPokemonsList(req, res) {
  try {
    const userID = req.user.id;
    const pokemon = await pokemonService.listUserPokemons(userID);
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getPokemon,
  deletePokemonById,
  deletePokemonByName,
  deletePokemonsByType,
  getPokemonsList,
};
