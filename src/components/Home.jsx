import React from 'react'
import { Box, Image, Text } from "@chakra-ui/react";
import btc from "../assets/btc.png"
import { motion } from "framer-motion"

const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w={"full"} h={"85vh"}>
      <motion.div 
      style={{
        height:"80vh",
      }}
      animate={{
        translateY:"20px"
      }}
      transition={{
        duration:2,
        repeat :Infinity,
        repeatType:'reverse'
      }}
      >
      <Image width={'full'} h={"full"} objectFit={"contain"} src={btc} />
      </motion.div>
     
      <Text fontSize={'6xl'} textAlign={"center"} fontWeight={"semibold"} color={"whiteAlpha.900"} mt={"-20"}>Crypto-X</Text>
    </Box>
  )
}

export default Home