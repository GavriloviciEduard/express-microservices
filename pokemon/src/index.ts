import cors from "cors";
import express, { Application } from "express";
import bodyParser from "body-parser";
import { pokemonRouter } from "./api/pokemon";

const app: Application = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(pokemonRouter);

app.listen(process.env.port || 8000);

export default app;
