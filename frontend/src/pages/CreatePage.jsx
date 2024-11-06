import {Button, Box, Container, Heading, Input, useColorModeValue, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
    const[newProduct,setNewProduct] = useState({
        name:"",
        price:"",
        image:"",
    });
    const {createProduct} = useProductStore();
    const toast = useToast();
    const handleAddProduct = async() =>{
        const {success,message} = await createProduct(newProduct);
        console.log("success",success);
        console.log("message",message);
        setNewProduct({name:"",price:"",image:""});
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
                isclosable:true,
            })
        }
    };
  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} fontFamily={"mono"} textAlign={"center"} size={"2xl"} mb={8}>
                Create New Product
            </Heading>
            <Box w={"full"} rounded={"lg"} shadow={"md"} bg={useColorModeValue("white","gray.800")} p={8}>
                <VStack spacing={4}>
                    <Input
                    placeholder="Product Name"
                    name = "name"
                    value = {newProduct.name}
                    onChange={(e)=>{
                        setNewProduct({...newProduct,name:e.target.value})
                    }}/>
                    <Input 
                    placeholder="Price"
                    name = "price"
                    value={newProduct.price}
                    onChange={(e)=>{
                        setNewProduct({...newProduct,price : e.target.value})
                    }}/>
                    <Input
                    placeholder="Image URL"
                    name = "image"
                    value={newProduct.image}
                    onChange={(e)=>{
                        setNewProduct({...newProduct,image:e.target.value})
                    }}/>
                    <Button colorScheme="blue" onClick={handleAddProduct}>Add Product</Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
  )
}
export default CreatePage


