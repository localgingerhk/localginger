import { Link as InternalLink, Image, useSession } from "blitz"
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  Heading,
  Container,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import SuspenseWithSpinner from "app/core/components/SuspenseWithSpinner"

const AddListing = () => {
  const session = useSession()
  return (
    <InternalLink href={session?.userId ? "/?add=listing" : "/login"} scroll={!session?.userId}>
      <a>
        <Button
          maxW={200}
          rounded={"md"}
          variant="outline"
          color={"red.500"}
          borderColor="red.500"
          _hover={{ bg: "red.500", color: "white" }}
        >
          <AddIcon mr={3} /> Add a new listing
        </Button>
      </a>
    </InternalLink>
  )
}

const Section = ({ onAddOpen }) => {
  return (
    <>
      <Box p={4} mb={10} mt={4}>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"} placeItems={"center"}>
          <Heading fontSize={["2xl", "3xl"]}>Know something we don&apos;t?</Heading>
          <Text color={useColorModeValue("gray.600", "gray.400")} fontSize={["md", "lg", "xl"]}>
            Do you know of a product, service, app or community made by Hong Kongers? Do share it
            with us by adding a listing here.
          </Text>
          <SuspenseWithSpinner>
            <AddListing />
          </SuspenseWithSpinner>
        </Stack>
      </Box>
      <Flex w={"full"} h={300} overflow={"hidden"} position={"relative"}>
        <Image
          alt="founder stories cta background"
          src="/section.webp"
          quality={100}
          layout="fill"
          objectFit="cover"
        />
        <VStack
          w={"full"}
          justify={"center"}
          px={[4, 8]}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          zIndex={9}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6} textAlign={"left"}>
            <Heading color={"white"} fontWeight={700} lineHeight={1.2} fontSize={["3xl", "4xl"]}>
              Learn something new. <br />
              Be inspired. <br />
              Stories from our founders.
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Button
                minW={120}
                bg={"red.500"}
                rounded={"md"}
                color={"white"}
                _hover={{ cursor: "default" }}
              >
                Coming soon
              </Button>
              <Text color={"white"} fontSize={"sm"} pl={3}>
                Sign up to our mailing list to be notified when we launch!
              </Text>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </>
  )
}

export default Section
