import { useToast, Box, HStack, IconButton, Image, Text, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Input, ModalFooter, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { React, useState } from 'react';
import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    // This functions come from the useDisclosure hook and are used on the modal that opens when the edit product icon is clicked 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast(); // Toast is used to notify or give feedback after an action has taken place 
    const { deleteProduct, updateProduct } = useProductStore(); // Extract the deleteProduct function and the updateProduct function from useProductStore 

    // Try to delete a product from the database with the method from the store/product.js file
    const handleDeleteProduct = async (productId) => {
        const { success, _ } = await deleteProduct(productId);
        // If the response success is false, show a notification to let the user know the process failed
        if(!success){
            toast({
            title: 'Oops, something went wrong',
            description: 'We encountered an issue while deleting the product. Please try again or contact our support team for assistance.',
            status: 'error',
            duration: 9000,
            isClosable: true
            });
        }
        else{ // If the response success is true, show a notification to let the user know the product has been deleted
            toast({
              title: 'Product deleted',
              description: 'The product has been successfully deleted from the system.',
              status: 'success',
              duration: 9000,
              isClosable: true
            })
        }
    };

    // Try to update the product in the database with the method from the store/product.js file
    const handleUpdateProduct = async (productId, updatedProduct) => {
        const { success, _ } = await updateProduct(productId, updatedProduct);
        if(!success){
            toast({
                title: 'Oops, something went wrong',
                description: 'We encountered an issue while updating the product. Please try again or contact our support team for assistance.',
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
        else{
            onClose(); // If the product is updated successfully, close the modal
            toast({
                title: 'Product updated',
                description: 'The product has been successfully updated in the system.',
                status: 'success',
                duration: 9000,
                isClosable: true
            })
        }
    };

    return (
        <Box maxWidth={'243px'} maxHeight={'431px'}  m={'4'} textAlign={'center'}
            transition={'0.3s'} _hover={{transform: 'translateY(-5px)'}}>
            <Image src={product.image} alt={product.name} rounded={'lg'}/>

            <Box p={'4'}>
                <Text fontSize={'1xl'} mb={'2'}>{product.name}</Text>
                <Text fontSize={'1xl'} mb={'2'}>${product.price}</Text>
                <HStack justifyContent={'center'}>
                    <IconButton icon={<EditIcon />} boxSize={'6'} backgroundColor={'transparent'} onClick={onOpen}/>
                    <IconButton icon={<DeleteIcon />} boxSize={'6'} backgroundColor={'transparent'} onClick={() => handleDeleteProduct(product._id)}/>
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent border={'2px'} rounded={'none'} my={'auto'}>
                    <ModalHeader mt={'4'}>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={'4'}>
                            {/* The value property fills the field with the current name, price or image url of the product */}
                            {/* The onChange property enables the modification of the fields, without it it would not be possible to write on them  */}
                            <Input placeholder={'Product name'} name={'name'} border={'1px'} rounded={'none'} 
                                value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name:e.target.value })}
                            />
                            <Input placeholder={'$0.00'} name={'price'} type={'number'} border={'1px'} rounded={'none'} 
                                value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price:e.target.value })}
                            />
                            <Input placeholder={'Image URL'} name={'image'} border={'1px'} rounded={'none'} 
                                value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image:e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button border={'1px'} rounded={'none'} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ProductCard;