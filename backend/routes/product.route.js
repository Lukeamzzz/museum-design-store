import express from 'express';
import Product from '../models/product.model.js'
import mongoose from 'mongoose';

const router = express.Router(); // productRoutes

// There is no need to create a specific route for the endpoints since it has already been done at the index.js file
// For the update and delete an id is needed, so it is added to the route

// Create a product
router.post('/', async (req, res) => {
    const productBody = req.body; // User input (name, price and image defined in the product.model)

    if(!productBody.name || !productBody.price || !productBody.image){
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const newProduct = new Product(productBody); // Create the product with the user input

    try{
        // Try to save the product in the database
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct }); // Success message
    }
    catch(error){
        console.error(`Error creating product: ${error}`);
        res.status(500).json({ success: false, message: 'Server error' }); // Internal server error
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    const {id} = req.params; // Get the id specified at the route

    // Handle case were invalid id is given (product not found)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'Invalid product id' });
    }

    try{
        // Try to find the product with the given id and delete it
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted' }); // Success message
    }
    catch(error){
        console.error(`Error deleting product: ${error}`);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const {id} = req.params; // Get the id specified at the url
    const product = req.body; // User input (whatever the user wants to update)

    // Handle case were invalid id is given (product not found)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'Invalid product id' });
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}); // Params: id of the product and the fields to update
        // {new:true} shows the object after the update, to make sure the correct changes were routerlied
        res.status(200).json({ success: true, data: updatedProduct }) // Show the updated product
    }
    catch(error){
        console.error(`Error updating product: ${error}`);
        res.status(500).json({ success: false, message: 'Server error' })
    }
});

// See all products
router.get('/', async (req, res) => {
    try{
        const products = await Product.find({}); // This means fetch all the products that are on the database
        res.status(200).json({ success: true, data: products }); // Show the products
    }
    catch(error){
        console.error(`Error fetching products: ${error}`);
        res.status(500).json({ success: false, message: 'Server error' })
    }
});

export default router;