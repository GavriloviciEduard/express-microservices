import cors from "cors";
import express, { Application } from "express";
import bodyParser from "body-parser";
import { teamRouter } from "./api/team";

const app: Application = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(teamRouter);

app.listen(process.env.port || 8000);

export default app;
