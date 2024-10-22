import { Container, Flex, Text, Button, useColorMode, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';

const NavBar = () => {
  const {colorMode, toggleColorMode} = useColorMode(); // Hook coming from Chakra UI to switch between ligth mode and dark mode

  return (
    <Container maxW={'1140px'} px={4}>
      <Flex h={'32'} alignItems={'center'} justifyContent={'space-between'} flexDir={{base:'column', sm:'row'}}>
        <Text fontSize={{base:'2xl', sm:'4xl'}} _hover={{textDecoration: 'underline'}}> 
          <Link to={'/'}>Museum Design Store</Link>
        </Text>

        <HStack spacing={'4'}>
          <Button backgroundColor={'transparent'} padding={0}>
            <Link to={'/create'}>
              <PlusSquareIcon fontSize={{base:'2xl', sm:'4xl'}}/>
            </Link>
          </Button>

          <Button onClick={toggleColorMode} backgroundColor={'transparent'} padding={0}>
            {/*If color mode == light, show the moon icon, else, show the sun icon*/}
            {colorMode == 'light' ? <MoonIcon fontSize={{base:'2xl', sm:'4xl'}}/> : <SunIcon fontSize={{base:'2xl', sm:'4xl'}}/>}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default NavBar;