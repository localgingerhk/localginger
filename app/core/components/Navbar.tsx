import { Suspense } from "react"
import { Link as InternalLink, useSession } from "blitz"
import {
  Box,
  Flex,
  HStack,
  Button,
  Link,
  Avatar,
  IconButton,
  useColorMode,
  Spinner,
} from "@chakra-ui/react"
import { AddIcon, LockIcon } from "@chakra-ui/icons"
import { IoMoon, IoSunny } from "react-icons/io5"
import { RiAccountCircleLine } from "react-icons/ri"

const AuthSection = () => {
  const session = useSession()
  return (
    <>
      <Link
        as={InternalLink}
        href={session?.userId ? "/?add=listing" : "/login"}
        scroll={!session?.userId}
      >
        <a>
          <Button
            variant={"solid"}
            bg={"red.500"}
            color={"white"}
            size={"sm"}
            mr={3}
            leftIcon={session?.userId ? <AddIcon /> : <LockIcon />}
            _hover={{
              bg: "transparent",
              color: "red.500",
            }}
          >
            {session?.userId ? "Add" : "Login"}
          </Button>
        </a>
      </Link>
      {session?.userId && (
        <Link as={InternalLink} href="/account">
          <IconButton
            colorScheme="red"
            size={"lg"}
            variant={"ghost"}
            aria-label={"Go to account"}
            icon={<RiAccountCircleLine size={24} />}
          />
        </Link>
      )}
    </>
  )
}

const WrappedAuthSection = () => (
  <Suspense fallback={<Spinner />}>
    <AuthSection />
  </Suspense>
)

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <InternalLink href="/">
              <a>
                <Avatar
                  size={"sm"}
                  src={"/logo_only.webp"}
                  name="localginger.hk icon"
                  loading="lazy"
                />
              </a>
            </InternalLink>
          </Box>
        </HStack>

        <Flex alignItems={"center"}>
          <Link
            as={InternalLink}
            href={"/#discover"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <a>
              <Button
                color={"red.500"}
                bg={"transparent"}
                size={"sm"}
                mr={3}
                border={"2px"}
                borderColor={"red.500"}
                _hover={{
                  bg: "transparent",
                  borderColor: "transparent",
                }}
              >
                Discover
              </Button>
            </a>
          </Link>
          <WrappedAuthSection />
          <IconButton
            size={"lg"}
            variant={"ghost"}
            aria-label={"Toggle Color Mode"}
            onClick={toggleColorMode}
            icon={colorMode == "light" ? <IoMoon size={18} /> : <IoSunny size={18} />}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
