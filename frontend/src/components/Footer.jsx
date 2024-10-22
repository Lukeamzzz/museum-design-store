import React from 'react';
import { Box, Text, Link, HStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box width="100%" textAlign="center">
      <Text>&copy; {new Date().getFullYear()} Museum Design Store. All Rights Reserved.</Text>
    </Box>
  );
};

export default Footer;
