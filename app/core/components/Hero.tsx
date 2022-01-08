import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"

const Hero = () => {
  return (
    <Stack
      minH={100}
      direction={{ base: "column", md: "row" }}
      w={"full"}
      style={{ margin: "2rem 0" }}
    >
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        paddingBottom={{ base: 0, md: 8 }}
        marginBottom={{ base: "-2rem", md: 0 }}
      >
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            lineHeight={{ base: "2.5rem", md: "3.5rem" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text as={"span"}>Awesome stuff made by us</Text>{" "}
            <Image
              src={"/hk.svg"}
              height={{ base: "30px", md: "40px" }}
              width={{ base: "45px", md: "60px" }}
              fontSize={1}
              display={"inline-block"}
              boxShadow={"dark-lg"}
              borderRadius={"md"}
              ml={4}
              alt="Hong Kong flag"
            />
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} textAlign={{ base: "center", md: "left" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: ["10%", "20%"],
                position: "absolute",
                bottom: -1,
                left: 0,
                bg: "red.500",
                zIndex: -1,
              }}
            >
              localginger.hk
            </Text>{" "}
            is a listing of apps, services, products and communities made by Hong Kongers. Discover
            something new today while you <code>#supportlocal</code>!
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"building blocks"} objectFit={"cover"} src={"/hero.svg"} boxSize="100%" />
      </Flex>
    </Stack>
  )
}

export default Hero
