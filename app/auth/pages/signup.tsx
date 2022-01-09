import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Flex, Stack, Box, Avatar } from "@chakra-ui/react"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "calc(100vh - 200px)",
      }}
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        p="2rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="lg"
        borderRadius="lg"
      >
        <Avatar bg="red.500" />
        <Box minW={{ base: "90%", md: "468px" }}>
          <SignupForm onSuccess={() => router.push(Routes.Home())} />
        </Box>
      </Stack>
    </Flex>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
