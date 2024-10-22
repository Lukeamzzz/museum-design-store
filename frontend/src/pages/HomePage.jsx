import { Container, VStack, Text, Icon, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GiBugNet } from "react-icons/gi";
import React, { useEffect } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore(); // Extract the fetchProducts function from useProductStore 

  // useEffect hook aplies the arrow function only when dependencies (value in the []) change
  useEffect(() => { 
    fetchProducts(); // This ensures the products are fetched whenever this component mounts
  }, [fetchProducts]); // Make the callback if the fetchProducts function itself changes, this effectively runs the fetch operation only once after the component mounts

  return (
    <Container maxW={'container.xl'} py={'12'}>
      <VStack spacing={'8'}>
        <Text fontSize={'4xl'}>
            Last Pieces
        </Text>

        {/* For small screens the grid will have 1 element per column, for medium screens 2 elements per column and for large screens 3 elements per column  */}
        <SimpleGrid columns={{base: '1', md: '2', lg: '3'}} spacingX={'32'}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {/* Only if there are no products in the database, render the next component */}
        {products.length == 0 && (
          <>
            <Icon as={GiBugNet} boxSize={'150'}/>
            <Text textAlign={'center'} fontSize={'xl'}>
              Sorry, we could not find any products <br />
              <Link to={'/create'}>
                <Text textDecoration={'underline'}>
                  Add product
                </Text>
              </Link>
            </Text>
          </>
        )}       
      </VStack>
    </Container>
  );
}

export default HomePage;