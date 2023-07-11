const axios = require("axios");
const Pokemon = require("../database/models/Pokemon");
const {
  getPokemonByName,
  deletePokemonById,
  deletePokemonByName,
  listUserPokemons,
  deletePokemonsByType,
} = require("../services/pokemonService");
jest.mock("axios");
jest.mock("../database/models/Pokemon", () => ({
  findOneAndDelete: jest.fn(),
  find: jest.fn(),
  deleteMany: jest.fn(),
  save: jest.fn(),
}));

describe("deletePokemonById", () => {
  it("should delete the Pokemon by ID", async () => {
    // Arrange
    const id = "pokemon-id";
    const userID = "user-id";
    const mockFindOneAndDelete = jest.fn().mockResolvedValueOnce({});

    Pokemon.findOneAndDelete.mockImplementation(mockFindOneAndDelete);

    // Act
    await deletePokemonById(id, userID);

    // Assert
    expect(Pokemon.findOneAndDelete).toHaveBeenCalledWith({ id, userID });
    expect(mockFindOneAndDelete).toHaveBeenCalledWith({ id, userID });
  });

  it("should throw an error if the Pokemon ID is invalid", async () => {
    // Arrange
    const id = "invalid-pokemon-id";
    const userID = "user-id";
    const mockFindOneAndDelete = jest.fn().mockResolvedValueOnce(null);

    Pokemon.findOneAndDelete.mockImplementation(mockFindOneAndDelete);

    // Act & Assert
    await expect(deletePokemonById(id, userID)).rejects.toThrow(
      "Invalid pokemon id"
    );
    expect(Pokemon.findOneAndDelete).toHaveBeenCalledWith({ id, userID });
    expect(mockFindOneAndDelete).toHaveBeenCalledWith({ id, userID });
  });
});

describe("deletePokemonByName", () => {
  it("should delete the Pokemon by name", async () => {
    // Arrange
    const name = "pikachu";
    const userID = "user-id";
    const mockFindOneAndDelete = jest.fn().mockResolvedValueOnce({});

    Pokemon.findOneAndDelete.mockImplementation(mockFindOneAndDelete);

    // Act
    await deletePokemonByName(name, userID);

    // Assert
    expect(Pokemon.findOneAndDelete).toHaveBeenCalledWith({ name, userID });
    expect(mockFindOneAndDelete).toHaveBeenCalledWith({ name, userID });
  });

  it("should throw an error if the Pokemon name is invalid", async () => {
    // Arrange
    const name = "invalid-pokemon-name";
    const userID = "user-id";
    const mockFindOneAndDelete = jest.fn().mockResolvedValueOnce(null);

    Pokemon.findOneAndDelete.mockImplementation(mockFindOneAndDelete);

    // Act & Assert
    await expect(deletePokemonByName(name, userID)).rejects.toThrow(
      "Invalid pokemon name"
    );
    expect(Pokemon.findOneAndDelete).toHaveBeenCalledWith({ name, userID });
    expect(mockFindOneAndDelete).toHaveBeenCalledWith({ name, userID });
  });
});

describe("listUserPokemons", () => {
  it("should return the list of user's pokemons", async () => {
    // Arrange
    const userID = "user-id";
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
    const mockFind = jest.fn().mockResolvedValueOnce(pokemons);

    Pokemon.find.mockImplementation(mockFind);

    // Act
    const result = await listUserPokemons(userID);

    // Assert
    expect(Pokemon.find).toHaveBeenCalledWith(
      { userID },
      { _id: 0, userID: 0, __v: 0 }
    );
    expect(mockFind).toHaveBeenCalledWith(
      { userID },
      { _id: 0, userID: 0, __v: 0 }
    );
    expect(result).toEqual(pokemons);
  });
});

describe("deletePokemonsByType", () => {
  it("should delete the pokemons by type", async () => {
    // Arrange
    const type = "electric";
    const userID = "user-id";
    const deleteResult = {
      deletedCount: 2,
    };
    const mockDeleteMany = jest.fn().mockResolvedValueOnce(deleteResult);

    Pokemon.deleteMany.mockImplementation(mockDeleteMany);

    // Act
    const result = await deletePokemonsByType(type, userID);

    // Assert
    expect(Pokemon.deleteMany).toHaveBeenCalledWith({ types: type, userID });
    expect(mockDeleteMany).toHaveBeenCalledWith({ types: type, userID });
    expect(result).toEqual(deleteResult);
  });
});
