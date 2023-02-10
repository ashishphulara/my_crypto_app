import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <Alert status='error' position={"fixed"} bottom={"250"} left={"50%"}  transform={"translatex(-50%)"}
    w={"container.lg"}>
      <AlertIcon/>
      <AlertTitle>there's something wrong!</AlertTitle>
      <AlertDescription>Check your internet connection or try back later.</AlertDescription>
    </Alert>
  )
}

export default ErrorComponent