import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'; 
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors';

//Configure ENV
dotenv.config();

//Configure Database
connectDB();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//REST API
app.get("/", (req, res) => {
	res.send("<h1>Welcome to my Ecommerce App</h1>")
})

//PORT
const PORT = process.env.PORT || 8080;

//RUN LISTENER
app.listen(PORT,() => {
	console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`);
});