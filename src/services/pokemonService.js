const axios = require("axios");
const Pokemon = require("../database/models/Pokemon");

async function getPokemonByName(name, userID) {
  try {
    const response = await axios.get(`${process.env.URL_POKE_API}${name}`);
    const pokemon = new Pokemon({
      id: response.data.id,
      name: response.data.name,
      moves: response.data.moves.slice(0, 4).map((move) => move.move.name),
      types: response.data.types.map((type) => type.type.name),
      userID,
    });
    await pokemon.save();
    return pokemon;
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePokemonById(id, userID) {
  const pokemon = await Pokemon.findOneAndDelete({ id: id, userID });
  if (!pokemon) {
    throw new Error("Invalid pokemon id");
  }
}

async function deletePokemonByName(name, userID) {
  const pokemon = await Pokemon.findOneAndDelete({ name, userID });
  if (!pokemon) {
    throw new Error("Invalid pokemon name");
  }
}

async function listUserPokemons(userID) {
  const pokemons = await Pokemon.find(
    { userID },
    { _id: 0, userID: 0, __v: 0 }
  );
  return pokemons;
}

async function deletePokemonsByType(type, userID) {
  const pokemons = await Pokemon.deleteMany({ types: type, userID });
  return pokemons;
}

module.exports = {
  getPokemonByName,
  deletePokemonById,
  deletePokemonByName,
  listUserPokemons,
  deletePokemonsByType,
};
