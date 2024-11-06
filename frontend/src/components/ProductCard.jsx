import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Input, Image,Heading, HStack, Text, IconButton, useColorModeValue, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, ModalFooter } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useProductStore } from '../store/product'
import React, { useState } from 'react'

const ProductCard = ({product}) => {
  const textColor = useColorModeValue("gray.600","gray.200"); 
  const bg = useColorModeValue("White","gray.800");
  const [updatedProduct,setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {deleteProduct,updateProduct} = useProductStore();
  const handleDeleteProduct = async(pid)=>{
    const {success,message}= await deleteProduct(pid);
    console.log(success,message);
    if(!success){
        toast({
            title:"Error",
            description:message,
            status:"error",
            isClosable:true,
        })
    }else{
        toast({
            title:"Success",
            description:message,
            status:"success",
            isClosable:true,
        })
  }};
  const handleUpdatedProduct = async(pid,updatedProduct)=>{
    const {success,message} = await updateProduct(pid,updatedProduct);
    onClose();
    if(!success){
        toast({
            title:"Error",
            description:message,
            status:"error",
            isClosable:true,
        })
    }else{
        toast({
            title:"Success",
            description:"Product Updated Successfully",
            status:"success",
            isClosable:true,
        })
    }
  };
  return (
    <Box
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={"all 0.3s"}
    bg={bg}
    _hover={{transform:"translateY(-5px)",shadow:"xl"}}>
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"}/>
        <Box p={4}>
            <Heading as="h3" fontFamily={"mono"} size={"md"} mb={2}>
                {product.name}
            </Heading>
        <Text fontWeight={"bold"} fontFamily={"mono"} fontSize={"xl"} color={textColor} mb={4}>
            ${product.price}
        </Text>


        <HStack spacing={2}>
            <IconButton onClick={onOpen} icon={<EditIcon/>} colorScheme={"blue"}/>
            <IconButton onClick={()=>handleDeleteProduct(product._id)} icon={<DeleteIcon/>} colorScheme={"red"}/>
        </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>UpdateProduct</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                            placeholder="Product Name"
                            name = "name"
                            value = {updatedProduct.name}
                            onChange = {(e)=>{
                                setUpdatedProduct({...updatedProduct,name : e.target.value});
                            }}/>
                            <Input 
                            placeholder="Price"
                            name = "price"
                            type = "number"
                            value = {updatedProduct.price}
                            onChange = {(e)=>{
                                setUpdatedProduct({...updatedProduct,price : e.target.value});
                            }}/>
                            <Input 
                            placeholder="Image URL"
                            name = "image"
                            value = {updatedProduct.image}
                            onChange = {(e)=>{
                                setUpdatedProduct({...updatedProduct,image : e.target.value});
                            }}/>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=>handleUpdatedProduct(product._id,updatedProduct)} colorScheme={"blue"} mr={3}>
                        Update
                        </Button>
                        <Button variant={"ghost"} onClick={onClose}>
                        Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard


