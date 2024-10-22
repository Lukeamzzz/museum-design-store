import { create } from 'zustand';

// This zustand store manages a list of products and can be accessed in any React component
export const useProductStore = create((set) => ({  // By wrapping the {} with () the function returns an object
    products: [], // The state is initialized with an empty products array
    setProducts: (products) => set({ products }), // Update the state

    // Create product in the database
    createProduct: async (newProduct) => {
        // Check if all necessary fields are provided
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success: false, message: 'Please provide all fields'};
        }
        
        // Send a POST request with the new product to the API and wait for the data to be fetched
        const res = await fetch('http://localhost:3000/api/products', { 
            method: 'POST',
            headers:{
                'Content-Type': 'application/json' // Indicates that the request body format is JSON
            },
            // Turn the new product object into a JSON string before sending it in the request body of the fetch call
            body: JSON.stringify(newProduct)
        })

        // Wait for the product to be successfully created in the backend (the response contains the created product in data.data)
        const data = await res.json();
        // Call the set function with a new products array that includes all existing products and the new one
        set((state) => ({ products: [...state.products, data.data] }));
        return {success: true, message: 'Product created successfully'};
    },

    // Fetch products 
    fetchProducts: async () => {
        const res = await fetch('http://localhost:3000/api/products'); // Wait the fetch of products from database
        const products = await res.json(); // Wait for the JSON parsing of the response to complete
        set({products: products.data}); // Update the state with the fetched products
    },

    // Delete product
    deleteProduct: async (productId) => {
        // Send the delete request with the specific id
        const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'DELETE'
        });
        const data = await res.json(); // Wait for the JSON parsing of the response to completed
        // If the response data has success as false
        if(!data.success) return { success: false, message: data.message };

        // Update the state, if the product's id is not equal to the provided productId, the product is kept in the filtered array
        // This removes any product with an id matching the productId and since we are modifying the state, it updates the UI immediately
        set((state) => ({ products: state.products.filter(product => product._id != productId) }))
        return { success: true, message: data.message };
    },

    // Update product
    updateProduct: async (productId, updatedProduct) => {
        // Check if all necessary fields are provided
        if(!updatedProduct.name || !updatedProduct.price || !updatedProduct.image){
            return {success: false, message: 'Please provide all fields'};
        }

        const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json' // Indicates that the request body format is JSON
            },
            // Turn the new product object into a JSON string before sending it in the request body of the fetch call
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message };
        
        // Update UI immediately without refreshing
        set((state) => ({ 
            products: state.products.map(product => product._id == productId ? data.data : product) 
        }));
        return({ success: true, message: data.message });
    }
}));