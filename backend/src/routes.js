import { Router } from "express";

import CarController from "./app/controllers/CarController";

const routes = new Router();

routes.get("/cars", CarController.index);
routes.post("/cars", CarController.store);
routes.put("/cars/:id", CarController.update);
routes.delete("/cars/:id", CarController.delete);

export default routes;
