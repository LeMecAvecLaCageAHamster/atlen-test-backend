"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const movie_controller_1 = require("./controllers/movie/movie.controller");
const exceptions_handler_1 = require("./middlewares/exceptions.handler");
const unknownRoutes_handler_1 = require("./middlewares/unknownRoutes.handler");
/**
 * On créé une nouvelle "application" express
 */
const app = (0, express_1.default)();
/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express_1.default.json());
/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use((0, cors_1.default)());
/**
 * Toutes les routes CRUD pour les films
 */
app.use('/movies', movie_controller_1.MovieController);
/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', unknownRoutes_handler_1.UnknownRoutesHandler);
/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(exceptions_handler_1.ExceptionsHandler);
app.listen(config_1.config.API_PORT, () => console.log('Silence, ça tourne.'));
