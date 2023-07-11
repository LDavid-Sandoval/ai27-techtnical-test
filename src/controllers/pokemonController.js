const pokemonService = require("../services/pokemonService");
const logger = require("../middlewares/logger");

async function getPokemon(req, res) {
  try {
    const { name } = req.params;
    const userID = req.user.id;

    const pokemon = await pokemonService.getPokemonByName(name, userID);
    logger.info("Data saved pokemon:", { userID, pokemon });
    res.json(pokemon);
  } catch (error) {
    logger.error("Failed to saved pokemon:", { error });
    console.error(error);
    res.status(500).json({ error: "Failed to get or saved pokemon" });
  }
}

async function deletePokemonById(req, res) {
  try {
    const { id } = req.params;
    const userID = req.user.id;
    logger.info("Data delete pokemon by ID:", { userID, id });
    await pokemonService.deletePokemonById(id, userID);
    res.json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    logger.error("Failed to Delete pokemon:", { error });
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePokemonByName(req, res) {
  try {
    const { name } = req.params;
    const userID = req.user.id;
    logger.info("Data delete pokemon by name:", { userID, name });
    await pokemonService.deletePokemonByName(name, userID);
    res.json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    logger.error("Failed to delete pokemon by name pokemon:", { error });
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePokemonsByType(req, res) {
  try {
    const { type } = req.params;
    const userID = req.user.id;
    logger.info("Data delete pokemon by type:", { userID, type });
    await pokemonService.deletePokemonsByType(type, userID);
    res.json({ message: "Pokemons deleted successfully" });
  } catch (error) {
    logger.error("Failed to delete pokemon by type:", { error });
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getPokemonsList(req, res) {
  try {
    const userID = req.user.id;
    const pokemon = await pokemonService.listUserPokemons(userID);
    logger.info("Data list pokemon:", { userID, pokemon });
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
