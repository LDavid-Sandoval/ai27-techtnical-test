const express = require("express");
const pokemonController = require("../controllers/pokemonController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:name", authenticateUser, pokemonController.getPokemon);
router.delete(
  "/byId/:id",
  authenticateUser,
  pokemonController.deletePokemonById
);
router.delete(
  "/byName/:name",
  authenticateUser,
  pokemonController.deletePokemonByName
);
router.delete(
  "/byType/:type",
  authenticateUser,
  pokemonController.deletePokemonsByType
);
router.get("/", authenticateUser, pokemonController.getPokemonsList);

module.exports = router;
