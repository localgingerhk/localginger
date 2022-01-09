import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { Flex, Stack, Box, Avatar } from "@chakra-ui/react"

const LoginPage: BlitzPage = () => {
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
          <LoginForm
            onSuccess={(_user) => {
              const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
              router.push(next)
            }}
          />
        </Box>
      </Stack>
    </Flex>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
