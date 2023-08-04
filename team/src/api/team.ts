import express from "express";
import prisma from "../db/prisma";

const teamRouter = express.Router();

enum teamRoutes {
    GET_ALL = "/team",
    GET = "/team/:id",
    CREATE = "/team",
    DELETE = "/team/:id",
    UPDATE = "/team/:id",
}

teamRouter.get(teamRoutes.GET_ALL, async (_, response) => {
    const team = await prisma.team.findMany();
    response.json(team);
});

teamRouter.get(teamRoutes.GET, async (request, response) => {
    const { id } = request.params;
    const team = await prisma.team.findUnique({ where: { id: Number(id) } });
    response
        .status(team ? 200 : 400)
        .json(team || { error: "Team not found!" });
});

teamRouter.post(teamRoutes.CREATE, async (request, response) => {
    try {
        const { name } = request.body;
        const createdTeam = await prisma.team.create({
            data: {
                name,
            },
        });
        return response.status(201).json(createdTeam);
    } catch (error) {
        console.error("Error creating team:", error);
        return response.status(500).json({ error: "Could not create team!" });
    }
});

teamRouter.delete(teamRoutes.DELETE, async (request, response) => {
    const { id } = request.params;
    const deletedTeam = await prisma.team.delete({ where: { id: Number(id) } });
    response
        .status(deletedTeam ? 200 : 400)
        .json(deletedTeam || { error: "Team not found!" });
});

teamRouter.put(teamRoutes.UPDATE, async (request, response) => {
    try {
        const { id } = request.params;
        const { name } = request.body;

        const updatedTeam = await prisma.team.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
            },
        });
        return response.json(updatedTeam);
    } catch (error) {
        console.error("Error updating team:", error);
        return response.status(500).json({ error: "Could not update team!" });
    }
});

export { teamRouter };
