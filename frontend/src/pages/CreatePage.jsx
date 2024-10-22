import { useToast, Container, Text, VStack, useColorModeValue, Input, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {React, useState} from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  // Create a newProduct object and its setter, initialize the newProduct attributes
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  // Toast is used to notify or give feedback after an action has taken place
  const toast = useToast(); 

  const { createProduct } = useProductStore(); // Extract the createProduct function from useProductStore 
  // Try to create product in the database with the method from the store/product.js file
  const addProduct = async () => {
    const { success, _ } = await createProduct(newProduct); // Wait for the response
    // If the response success is false, show a notification to let the user know the process failed
    if(!success){
      toast({
        title: 'Oops, something went wrong',
        description: 'We encountered an issue while adding the product. Please try again or contact our support team for assistance.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
    }
    else{ // If the response success is true, show a notification to let the user know the product has been created
      toast({
        title: 'Product added!',
        description: 'The product has been successfully added to the system.',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      // Reset the input fields after the product is added
      setNewProduct({ name: '', price: '', image: '' });
    }
  };

  return (
    <Container maxW={'container.sm'} my={'20'} p={'6'} border={'2px'} shadow={'lg'}>
      <VStack spacing={'8'}>
        <Text fontSize={'4xl'}>
          Add product 
        </Text>
          <Input placeholder={'Product name'} border={'1px'} rounded={'none'} 
            name={'name'}
            value={newProduct.name} 
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input placeholder={'$0.00'} border={'1px'} rounded={'none'} 
            name={'price'}
            value={newProduct.price} 
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          />
          <Input placeholder={'Image URL'} border={'1px'} rounded={'none'} 
            name={'img'}
            value={newProduct.image} 
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />
          <Button rightIcon={<ArrowForwardIcon />} border={'1px'} rounded={'none'} bgColor={useColorModeValue('white', 'gray.800')}
            onClick={addProduct}> {/* On click call the addProduct function */}
            Continue
          </Button>
      </VStack>
    </Container>
  );
}

export default CreatePage;