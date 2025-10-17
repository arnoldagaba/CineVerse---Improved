import axios, { type AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbClient = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
    timeout: 10_000,
});

// Request interceptor for logging in development
tmdbClient.interceptors.request.use(
    (config) => {
        if (import.meta.env.DEV) {
            console.log(
                `[TMDB API] ${config.method?.toUpperCase()} ${config.url}`,
                config.params
            );
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
tmdbClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case StatusCodes.UNAUTHORIZED:
                    console.error("[TMDB API] Invalid API key");
                    break;
                case StatusCodes.NOT_FOUND:
                    console.error("[TMDB API] Resource not found");
                    break;
                case StatusCodes.TOO_MANY_REQUESTS:
                    console.error("[TMDB API] Rate limit exceeded");
                    break;
                case StatusCodes.INTERNAL_SERVER_ERROR:
                    console.error("[TMDB API] Server error");
                    break;
                default:
                    console.error(
                        `[TMDB API] Error ${status}:`,
                        error.response.data
                    );
            }
        } else if (error.request) {
            console.error("[TMDB API] Network error - no response received");
        } else {
            console.error("[TMDB API] Error:", error.message);
        }

        return Promise.reject(error);
    }
);
