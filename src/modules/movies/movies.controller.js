import { responseHandler } from "../../utils/response.handler.js";
import { moviesSchema } from "./index.js";
import { categoriesSchema } from "../categories/index.js"; // Adjust the import path as necessary

const { sendError, sendOk } = responseHandler;

class MoviesModule {

    async create(req, res) {
        try {
            const { body } = req;

            if (!body) {
                sendError(res, 404, "Request body is empty or undefined.");
                return;
            }

            const { title, description, releaseDate, category } = body;

            if (!title || !releaseDate || !category) {
                sendError(res, 400, "Title, release date, and category are required.");
                return;
            }

            const validCategory = await categoriesSchema.findById(category);
            if (!validCategory) {
                sendError(res, 400, "Invalid category ID.");
                return;
            }

            let movie = await moviesSchema.create({ title, description, releaseDate, category });

            if (movie) {
                movie.save();
                sendOk(res, 200, "Movie added successfully", movie);
                return;
            } else {
                sendError(res, 500, "Server error");
                return;
            }

        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }

    async getAll(req, res) {
        try {
            const movies = await moviesSchema.find().populate('category');
            sendOk(res, 200, 'Movies data received successfully', movies);
            return;
        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const movie = await moviesSchema.findById(id).populate('category');

            if (movie) {
                sendOk(res, 200, 'Movie data received successfully', movie);
                return;
            } else {
                sendError(res, 404, "Movie not found");
                return;
            }
        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }

    async update(req, res) {
        const { body, params } = req;

        if (!body) {
            sendError(res, 404, "Request body is empty or undefined");
            return;
        }

        if (!params || !params.id) {
            sendError(res, 404, "Request params is empty or undefined");
            return;
        }

        try {
            const { title, description, releaseDate, category } = body;
            const { id } = params;

            if (category) {
                const validCategory = await categoriesSchema.findById(category);
                if (!validCategory) {
                    sendError(res, 400, "Invalid category ID.");
                    return;
                }
            }

            const movie = await moviesSchema.findById(id);

            if (movie) {
                await moviesSchema.updateOne({ _id: id }, { title, description, releaseDate, category });
                const updatedMovie = await moviesSchema.findById(id).populate('category');
                sendOk(res, 200, "Movie updated successfully", updatedMovie);
                return;
            } else {
                sendError(res, 404, "Movie not found");
                return;
            }
        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }

    async remove(req, res) {
        const { params } = req;

        if (!params || !params.id) {
            sendError(res, 404, "Request params is empty or undefined");
            return;
        }

        try {
            const { id } = params;

            const movie = await moviesSchema.findById(id);

            if (movie) {
                await moviesSchema.deleteOne({ _id: id });
                sendOk(res, 200, "Movie deleted successfully", movie);
                return;
            } else {
                sendError(res, 404, "Movie not found");
                return;
            }
        } catch (error) {
            sendError(res, 500, error.message);
            return;
        }
    }
}

export const moviesModule = new MoviesModule();
