import {  Box, Stack, VStack, Text , Image} from '@chakra-ui/react'
import React from 'react'
import Founder from "../assets/founder.jpg"



const Footer = () => {
    return (
        <Box bgColor={'blackAlpha.900'} color={"whiteAlpha.700"} minH={48} px={"16"} py={["16", "8"]}>

            <Stack direction={["column", "row"]}
                h={"full"}
                alignItems={"center "}
            >
                <VStack w={"full"} alignItems={["centre", "flex-start"]}>
                    <Text fontWeight={'bold'}>About Us </Text>
                    <Text fontSize={"sm"} letterSpacing={"widest"} alignItems={["center", "left"]} >We are the best crypto trading platform in india and we provide our guidance at very reasonable prices. </Text>
                </VStack>
                <VStack>
                <Image
  borderRadius='full'
  boxSize='100px'
  src={Founder}
  alt='founder'
/>
                    <Text>Our Founder</Text>
                </VStack>

            </Stack>
        </Box>
    )
}

export default Footer