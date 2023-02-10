import { Box, Container,Radio,RadioGroup,HStack, VStack,Text,Image, StatLabel, StatNumber,Stat, StatHelpText, StatArrow, Badge , Progress, Button } from '@chakra-ui/react'
import React from 'react';
import { useState, useEffect } from 'react';
import Loader from './Loader';
import axios from "axios";
import { server } from '../index';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';



const CoinDetails = () => {  
  const [coins , setCoins] = useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);
  const [days ,setdays] = useState("24h");
  const [chartArr ,setchartArr] = useState([]);
  const [currency , setCurrency] =useState("inr")

  const params = useParams();
  const currencySymbol = currency ==="inr"?"₹" :currency=== "eur"?"€" : "$";

const btns = ["24h" , "7d" , "14d" , "30d" , "60d" , "200d" , "1y" , "max" ];

const switchStats = (key)=>{
  switch (key) {
    case "24h":
      setdays("24h");
      setLoading(true);
      break;
  
    case "7d":
      setdays("7d");
      setLoading(true);
      break;
  
    case "14d":
      setdays("14d");
      setLoading(true);
      break;
  
    case "30d":
      setdays("30d");
      setLoading(true);
      break;
  
    case "60d":
      setdays("60d");
      setLoading(true);
      break;
  
    case  "200d" :
      setdays( "200d" );
      setLoading(true);
      break;
  
    case "1y":
      setdays("365d");
      setLoading(true);
      break;
  
    case  "max":
      setdays( "max");
      setLoading(true);
      break;
  
    default:
      setdays("24h");
      setLoading(true);
      break;
  }
}

  useEffect(() => {
    const getcoins = async () => {
     try{
      const { data } = await axios.get(`${server}/coins/${params.id}`);
      const { data:chartdata } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days= ${days}`);
      
      setCoins((data));
      setchartArr(chartdata.prices)
      setLoading(false);
     }catch(error){
      setLoading(false);
      setError(true);
     }
    }
    getcoins();
  }, [currency, days, params.id]);

  if(error)return <ErrorComponent message={"error while fetching coins"} />
  return (
    <Container maxW={'container.xl'}>

      {
        loading?<Loader/>:(
          <>
           <Box width={"full"} borderWidth={1}>
            <Chart arr={chartArr} currency={currencySymbol} days={days}/>
           </Box>

           <HStack p={"4"} overflowX={'auto'} >
            {
              btns.map((i)=>(
                <Button key={i} onClick={()=>switchStats(i)}>{i}</Button>
              ))
            }
           </HStack>
           <RadioGroup value={currency} onChange={setCurrency}>
          <HStack spacing={"4"}>
            <Radio value={'inr'}>Inr</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>
          </HStack>
        </RadioGroup>

        <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
          <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
            Last Updated on {Date(coins.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coins.image.large} w={16} h={16} objectFit={"contain"}/>          
            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>{currencySymbol}{coins.market_data.current_price[currency]}</StatNumber>
            
            <StatHelpText >
              <StatArrow type={coins.market_data.price_change_percentage_24h_in_currency > 0? 'increase' : 'decrease' }/>
              {coins.market_data.price_change_percentage_24h}%    
            </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'} bgColor={'blackAlpha.600'} color={'white'}>
              {`#${coins.market_cap_rank}`}
            </Badge>
            <CustomBar high={`${currencySymbol}${coins.market_data.high_24h[currency]}`} low={`${currencySymbol}${coins.market_data.low_24h[currency]}`} />

            <Box  width={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coins.market_data.max_supply} />
              <Item title={"Circulating Supply"} value={coins.market_data.circulating_supply} />
      
              <Item title={"Market Cap"} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}/>
              <Item title={"All Time Low"} value={`${currencySymbol}${coins.market_data.atl[currency]}`}/>
              <Item title={"All Time Low"} value={`${currencySymbol}${coins.market_data.ath[currency]}`}/>

            </Box>
        </VStack>
          
          </>
        )
      }
    </Container>
  )
}

const Item =({title , value})=>(
  <HStack justify={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value} </Text>
  </HStack>
)
const CustomBar = ({high ,low})=>(
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"}/>
    <HStack justifyContent={'space-between'} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={'sm'}>24hrs range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
)


export default CoinDetails