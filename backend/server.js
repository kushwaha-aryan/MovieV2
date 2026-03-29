import express from 'express'
import cors from "cors"
import review from "./api/reviews.route.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/reviews",review);
app.use("*splat",(req,res,next)=>
res.status(404).json({error : "Not Found"}))

export default app;

/*
http://localhost:8000/api/v1/reviews/
 */