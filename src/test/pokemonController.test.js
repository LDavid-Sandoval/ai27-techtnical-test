const pokemonService = require("../services/pokemonService");
const {
  getPokemon,
  deletePokemonById,
  deletePokemonByName,
  deletePokemonsByType,
  getPokemonsList,
} = require("../controllers/pokemonController");

// Mock del servicio pokemonService
jest.mock("../services/pokemonService", () => ({
  getPokemonByName: jest.fn(),
  deletePokemonById: jest.fn(),
  deletePokemonByName: jest.fn(),
  deletePokemonsByType: jest.fn(),
  listUserPokemons: jest.fn(),
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

  it("should get the Pokemon by name and return the Pokemon data", async () => {
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
    expect(res.json).toHaveBeenCalledWith(pokemon);
  });

  it("should handle errors and return an error message", async () => {
    // Arrange
    const error = new Error("Internal server error");
    pokemonService.getPokemonByName.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    // Act
    await getPokemon(req, res);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
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

  it("should delete the Pokemon by ID and return a success message", async () => {
    // Arrange
    pokemonService.deletePokemonById.mockResolvedValueOnce();

    // Act
    await deletePokemonById(req, res);

    // Assert
    expect(pokemonService.deletePokemonById).toHaveBeenCalledWith(
      "pokemon-id",
      "user-id"
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Pokemon deleted successfully",
    });
  });

  it("should handle errors and return an error message", async () => {
    // Arrange
    const error = new Error("Internal server error");
    pokemonService.deletePokemonById.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    // Act
    await deletePokemonById(req, res);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(error);
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

  it("should delete the Pokemon by name and return a success message", async () => {
    // Arrange
    pokemonService.deletePokemonByName.mockResolvedValueOnce();

    // Act
    await deletePokemonByName(req, res);

    // Assert
    expect(pokemonService.deletePokemonByName).toHaveBeenCalledWith(
      "pikachu",
      "user-id"
    );
    expect(res.json).toHaveBeenCalledWith({
      message: "Pokemon deleted successfully",
    });
  });

  it("should handle errors and return an error message", async () => {
    // Arrange
    const error = new Error("Internal server error");
    pokemonService.deletePokemonByName.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    // Act
    await deletePokemonByName(req, res);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(error);
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

  it("should delete the Pokemons by type and return a success message", async () => {
    // Arrange
    pokemonService.deletePokemonsByType.mockResolvedValueOnce();

    // Act
    await deletePokemonsByType(req, res);

    // Assert
    expect(pokemonService.deletePokemonsByType).toHaveBeenCalledWith(
      "electric",
      "user-id"
    );
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

  it("should get the list of user's pokemons and return the list", async () => {
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
    expect(res.json).toHaveBeenCalledWith(pokemons);
  });

  it("should handle errors and return an error message", async () => {
    // Arrange
    const err = new Error("Internal server error");
    pokemonService.listUserPokemons.mockRejectedValueOnce(err);
    // Arrange
    const error = new Error("Internal server error");
    pokemonService.listUserPokemons.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    // Act
    await getPokemonsList(req, res);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
