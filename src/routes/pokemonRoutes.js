const express = require("express");
const pokemonController = require("../controllers/pokemonController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:name", authenticateUser, pokemonController.getPokemon);
router.delete("/:id", authenticateUser, pokemonController.deletePokemonById);
router.delete(
  "/delete/:name",
  authenticateUser,
  pokemonController.deletePokemonByName
);
router.delete(
  "/delete-pokemons/:type",
  authenticateUser,
  pokemonController.deletePokemonsByType
);
router.get("/", authenticateUser, pokemonController.getPokemonsList);

module.exports = router;
