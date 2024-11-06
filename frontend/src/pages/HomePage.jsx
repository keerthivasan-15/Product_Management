import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import ProductCard from "../components/ProductCard"
import { useEffect } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'

const HomePage = () => {
    const {fetchProducts,products} = useProductStore();
   useEffect(()=>{
        fetchProducts();
    },[fetchProducts]);
    console.log(products);
  return (
    <Container maxW={"Container.xl"} py={12}>
        <VStack spacing={8}>
            <Text fontSize = {"30"} 
            fontWeight={"bold"} 
            fontFamily={"mono"}
            bgclip={"text"} 
            textAlign={"center"}>
                Current Products
            </Text>
            <SimpleGrid
            columns={{
                base:1,
                md:2,
                lg:4,
            }}
            spacing = {10}
            w={"full"}>
            {
                products.map((product)=>(
                    <ProductCard key = {product._id} product = {product}/>
                ))
            }
            </SimpleGrid>
            {products.length === 0 && (
            <Text fontFamily={"mono"}fontWeight="bold" fontSize="xl" textAlign="center" color="gray.500">
                No products found 😢{" "}
                <Link to = {"/create"}><Text as = "span" fontFamily={"mono"} color = "blue.500" _hover={{textDecoration:"underline"}}>
                Create a New Product</Text>
                </Link>
            </Text>
            )}
        </VStack>
    </Container>
  )
}

export default HomePage


