import express from "express";

const router = express.Router();
const API_KEY = process.env.TMDB_API_KEY;

router.get("/", async (req, res) => {
    const page = req.query.page || 1;
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    res.json(data);
});

router.get("/search", async (req, res) => {
    const query = req.query.q;
    const page = req.query.page || 1;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    const data = await response.json();
    res.json(data);
});

router.get("/genre/:id", async (req, res) => {
    const page = req.query.page || 1;
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=${API_KEY}&page=${page}&with_genres=${req.params.id}`);
    const data = await response.json();
    res.json(data);
});

export default router;