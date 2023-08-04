import express, { response } from "express";
import prisma from "../db/prisma";

const pokemonRouter = express.Router();

enum pokemonRoutes {
    GET_ALL = "/pokemon",
    GET = "/pokemon/:id",
    CREATE = "/pokemon",
    DELETE = "/pokemon/:id",
    UPDATE = "/pokemon/:id",
}

pokemonRouter.get(pokemonRoutes.GET_ALL, async (_, response) => {
    const pokemon = await prisma.pokemon.findMany();
    response.json(pokemon);
});

pokemonRouter.get(pokemonRoutes.GET, async (request, response) => {
    const { id } = request.params;
    const pokemon = await prisma.pokemon.findUnique({
        where: { id: Number(id) },
    });
    response
        .status(pokemon ? 200 : 404)
        .json(pokemon || { error: "Pokemon not found!" });
});

pokemonRouter.post(pokemonRoutes.CREATE, async (request, response) => {
    const { name, type, teamId } = request.body;
    try {
        const newPokemon = await prisma.pokemon.create({
            data: {
                name,
                type,
                teamId,
            },
        });
        response.status(201).json(newPokemon);
    } catch (error) {
        console.error("Error creating pokemon:", error);
        response.status(400).json({ error: "Failed to create Pokemon!" });
    }
});

pokemonRouter.delete(pokemonRoutes.DELETE, async (request, response) => {
    const { id } = request.params;
    const deletedPokemon = await prisma.pokemon.delete({
        where: { id: Number(id) },
    });
    response
        .status(deletedPokemon ? 200 : 400)
        .json(deletedPokemon || { error: "Pokemon not found!" });
});

pokemonRouter.put(pokemonRoutes.UPDATE, async (request, response) => {
    try {
        const { id } = request.params;
        const { name, type, teamId } = request.body;

        const updatedPokemon = await prisma.pokemon.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                type,
                teamId,
            },
        });
        return response.json(updatedPokemon);
    } catch (error) {
        console.error("Error updating pokemon:", error);
        return response
            .status(500)
            .json({ error: "Could not update pokemon!" });
    }
});

export { pokemonRouter };
