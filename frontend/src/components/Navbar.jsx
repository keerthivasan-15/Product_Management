import { Container, Flex,Text, HStack,Button, useColorMode} from '@chakra-ui/react'
import { PiPlusSquare } from "react-icons/pi";
import {IoMoon} from "react-icons/io5"
import {LuSun} from "react-icons/lu"
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {colorMode,toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row",
        }}>
            <Text
            fontSize={{base : "22",sm : "28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign = {"center"}
            bgclip={"text"}
            >
                <Link to = {"/"}>Product Store 🛒</Link>
            </Text>    
        <HStack spacing={2} alignItems={"center"}>
            <Link to = {"/create"}>
                <Button>
                    <PiPlusSquare fontSize = {20}/>
                </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon/> : <LuSun size= "20"/>}
            </Button>
        </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar


