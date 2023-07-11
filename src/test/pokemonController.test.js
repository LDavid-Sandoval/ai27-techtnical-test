const pokemonService = require("../services/pokemonService");
const logger = require("../middlewares/logger");
const {
  getPokemon,
  deletePokemonById,
  deletePokemonByName,
  deletePokemonsByType,
  getPokemonsList,
} = require("../controllers/pokemonController");

// Mock de los módulos pokemonService y logger
jest.mock("../services/pokemonService", () => ({
  getPokemonByName: jest.fn(),
  deletePokemonById: jest.fn(),
  deletePokemonByName: jest.fn(),
  deletePokemonsByType: jest.fn(),
  listUserPokemons: jest.fn(),
}));
jest.mock("../middlewares/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe("getPokemon", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        name: "pikachu",
      },
      user: {
        id: "user-id",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get the Pokemon by name, save the data, and return the Pokemon data", async () => {
    // Arrange
    const pokemon = {
      id: 25,
      name: "pikachu",
      moves: ["move1", "move2"],
      types: ["electric"],
    };
    pokemonService.getPokemonByName.mockResolvedValueOnce(pokemon);

    // Act
    await getPokemon(req, res);

    // Assert
    expect(pokemonService.getPokemonByName).toHaveBeenCalledWith(
      "pikachu",
      "user-id"
    );
    expect(logger.info).toHaveBeenCalledWith("Data saved pokemon:", {
      userID: "user-id",
      pokemon,
    });
    expect(res.json).toHaveBeenCalledWith(pokemon);
  });

  it("should handle errors, log the error, and return an error message", async () => {
    // Arrange
    const error = new Error("Internal server error");
    pokemonService.getPokemonByName.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    await getPokemon(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(logger.error).toHaveBeenCalledWith("Failed to saved pokemon:", {
      error,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to get or saved pokemon",
    });
  });
});

describe("deletePokemonById", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        id: "pokemon-id",
      },
      user: {
        id: "user-id",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should delete the Pokemon by ID, log the data, and return a success message", async () => {
    pokemonService.deletePokemonById.mockResolvedValueOnce();

    await deletePokemonById(req, res);

    expect(pokemonService.deletePokemonById).toHaveBeenCalledWith(
      "pokemon-id",
      "user-id"
    );
    expect(logger.info).toHaveBeenCalledWith("Data delete pokemon by ID:", {
      userID: "user-id",
      id: "pokemon-id",
    });
    expect(res.json).toHaveBeenCalledWith({
      message: "Pokemon deleted successfully",
    });
  });

  it("should handle errors, log the error, and return an error message", async () => {
    const error = new Error("Internal server error");
    pokemonService.deletePokemonById.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    await deletePokemonById(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(logger.error).toHaveBeenCalledWith("Failed to Delete pokemon:", {
      error,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("deletePokemonByName", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        name: "pikachu",
      },
      user: {
        id: "user-id",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should delete the Pokemon by name, log the data, and return a success message", async () => {
    pokemonService.deletePokemonByName.mockResolvedValueOnce();

    await deletePokemonByName(req, res);

    expect(pokemonService.deletePokemonByName).toHaveBeenCalledWith(
      "pikachu",
      "user-id"
    );
    expect(logger.info).toHaveBeenCalledWith("Data delete pokemon by name:", {
      userID: "user-id",
      name: "pikachu",
    });
    expect(res.json).toHaveBeenCalledWith({
      message: "Pokemon deleted successfully",
    });
  });

  it("should handle errors, log the error, and return an error message", async () => {
    const error = new Error("Internal server error");
    pokemonService.deletePokemonByName.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    await deletePokemonByName(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(logger.error).toHaveBeenCalledWith(
      "Failed to delete pokemon by name pokemon:",
      { error }
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("deletePokemonsByType", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        type: "electric",
      },
      user: {
        id: "user-id",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should delete the Pokemons by type, log the data, and return a success message", async () => {
    pokemonService.deletePokemonsByType.mockResolvedValueOnce();

    await deletePokemonsByType(req, res);

    expect(pokemonService.deletePokemonsByType).toHaveBeenCalledWith(
      "electric",
      "user-id"
    );
    expect(logger.info).toHaveBeenCalledWith("Data delete pokemon by type:", {
      userID: "user-id",
      type: "electric",
    });
    expect(res.json).toHaveBeenCalledWith({
      message: "Pokemons deleted successfully",
    });
  });
});

describe("getPokemonsList", () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: {
        id: "user-id",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get the list of user's pokemons, log the data, and return the list", async () => {
    // Arrange
    const pokemons = [
      {
        id: 1,
        name: "pokemon1",
        moves: ["move1", "move2"],
        types: ["type1"],
      },
      {
        id: 2,
        name: "pokemon2",
        moves: ["move3", "move4"],
        types: ["type2"],
      },
    ];
    pokemonService.listUserPokemons.mockResolvedValueOnce(pokemons);

    // Act
    await getPokemonsList(req, res);

    // Assert
    expect(pokemonService.listUserPokemons).toHaveBeenCalledWith("user-id");
    expect(logger.info).toHaveBeenCalledWith("Data list pokemon:", {
      userID: "user-id",
      pokemon: pokemons,
    });
    expect(res.json).toHaveBeenCalledWith(pokemons);
  });
});
