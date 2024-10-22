// This file is the entry point for the API
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/product.route.js'
import { connectDB } from './config/db.js';

const app = express();
app.use(express.json()); // Allows to use JSON data in the req.body
app.use(cors()); // The browser blocks requests if they have different origins, with cors those requests can be allowed

// Use '/api/products' as the default route for products, productRoutes is the router declared in the 'product.route.js' file
app.use('/api/products', productRoutes);

// Load the '.env' file content into default variable 'process.env' so we can get the port value
dotenv.config(); 
// Get the port value declared on the '.env' file (this is a good practice instead of hardcoding the port number on the function below)
const PORT = process.env.PORT 

// Listen for port 3000, make the callback function once it is ready
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
