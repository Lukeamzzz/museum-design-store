import mongoose from 'mongoose';

// A schema defines the structure and properties of a document in a MongoDB collection
// Each schema is composed by fields and the allowed data types
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},
{
    timestamps: true // Each time a product is created, the fields "createdAt" and "updatedAt" will be added automatically
});

// Based on the schema, create the product model
const Product = mongoose.model('Product', productSchema);

export default Product;