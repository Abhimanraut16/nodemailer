import { Button, Container, FormControl,FormErrorMessage,FormLabel,Heading,Input, Textarea,Text, useToast, position } from "@chakra-ui/react";
import { useState } from "react";
import { sendContactFrom } from "../lib/api";

const initValues = {name:"", email:"", subject:"", message:""}

const initState = {values: initValues}


export default function Home() {
  const toast = useToast()
  const [state, setState] = useState(initState)
  const [touched, setTouched] = useState({});

  const {values, isLoading, error }= state;

  const onBlur = ({target})=>
    setTouched((prev)=>({
      ...prev, [target.name]: true
    }))
  
    const handleChange = ({target})=>
      setState ((prev)=>({
        ...prev,
        values:{
          ...prev.values,
          [target.name]: target.value,
        },
      }))

    const onSubmit = async () =>{
      setState((prev)=>({
        ...prev,
        isLoading:true,
      }));

      try{
      await sendContactFrom(values)
      setTouched({});
      setState(initState);

      toast({
        title:"Message sent.",
        status: "success",
        duration:2000,
        position:"top",
      })
      
      }catch(error){
        setState((prev)=>({
          ...prev,
          isLoading:false,
          error: error.message
        }));
      }


    }






  return (
    <Container maxW='450px' mt={12}>
  <Heading>Contact</Heading>

  {error && (
    <Text color="red.300" my={4} fontSize="xl">{error}</Text>
  )}

  <FormControl isRequired isInvalid={touched.name && !values.name} >
    <FormLabel>Name</FormLabel>
    <Input type="text" name="name" value={values.name} onChange={handleChange}
    onBlur={onBlur}
      errorBorderColor="red.300" />
    <FormErrorMessage>Required</FormErrorMessage>
  </FormControl>

  
  <FormControl isRequired  isInvalid={touched.name && !values.name} >
    <FormLabel>Email</FormLabel>
    <Input type="text" name="email" value={values.email} onChange={handleChange}
    onBlur={onBlur} errorBorderColor="red.300"/>
       <FormErrorMessage>Required</FormErrorMessage>
  </FormControl>
  
  <FormControl isRequired  isInvalid={touched.name && !values.name}>
    <FormLabel>Subject</FormLabel>
    <Input type="text" name="subject" value={values.subject} onChange={handleChange}
    onBlur={onBlur} errorBorderColor="red.300"/>
       <FormErrorMessage>Required</FormErrorMessage>
  </FormControl>

  <FormControl isRequired  isInvalid={touched.name && !values.name}>
    <FormLabel>Message</FormLabel>
    <Textarea type="text" name="message" value={values.message} onChange={handleChange}
    onBlur={onBlur} errorBorderColor="red.300"/>
       <FormErrorMessage>Required</FormErrorMessage>
  </FormControl>

<Button variant = "outline" colorScheme = 'blue'
isLoading ={isLoading}
disabled ={!values.name || !values.email || !values.subject || !values.message} 
onClick={onSubmit}
>
  Submit
</Button>

  </Container>

  )
}
