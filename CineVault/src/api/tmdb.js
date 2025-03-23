import axios from "axios";

const API_KEY = "6fe1cc64430eb530bef8e904fba8f41c";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`,{
            params: {
                api_key: API_KEY,
                language: "fr-FR",
                page:1,
            },
        });
        return response.data.results;
    } catch(error) {
        console.error("Erreur lors de la recuperation des films:", error);
        return [];
    }
};