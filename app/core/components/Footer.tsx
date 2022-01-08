import { ReactNode, useState, useEffect, Suspense } from "react"
import { Link as InternalLink, Image as NextImage, useSession, useMutation } from "blitz"
import {
  Link,
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  Input,
  Icon,
  IconButton,
  useColorModeValue,
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react"
import { FiGithub, FiShare2 } from "react-icons/fi"
import { BiMailSend, BiCodeAlt } from "react-icons/bi"
import { BsLightningFill } from "react-icons/bs"
import { IoStatsChart } from "react-icons/io5"
import Alert from "app/core/components/Alert"
import subscribe from "app/core/utils/subscribe"
import logout from "app/auth/mutations/logout"
import SuspenseWithSpinner from "app/core/components/SuspenseWithSpinner"

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  )
}

const AddListing = () => {
  const session = useSession()
  return (
    <InternalLink href={session?.userId ? "/?add=listing" : "/login"} scroll={!session?.userId}>
      Add a listing
    </InternalLink>
  )
}

const LogInOutButton = () => {
  const session = useSession()
  const [logoutMutation] = useMutation(logout)
  if (session?.userId) {
    return (
      <Link
        href={"#"}
        onClick={async () => {
          await logoutMutation()
        }}
        scroll={false}
      >
        Logout
      </Link>
    )
  }
  return <Link href="/login">Login</Link>
}

const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [alertText, setAlertText] = useState("")
  const [email, setEmail] = useState("")
  const toast = useToast()
  useEffect(() => {
    if (alertText) {
      onOpen()
    } else {
      onClose()
    }
  }, [alertText])
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Stack direction={"row"} spacing={3}>
                <NextImage
                  src={"/logo_word.png"}
                  width={200}
                  height={23}
                  alt="localginger word logo"
                />
                <Image
                  src={"/hk.svg"}
                  height={5}
                  display={"inline-block"}
                  boxShadow="lg"
                  alt="Hong Kong flag"
                  fontSize={1}
                />
              </Stack>
            </Box>
            <Box color="gray.500">
              <Text fontSize="xs" fontStyle="italic">
                hy·per-lo·cal [ hahy-per-loh-kuhl ]
              </Text>
              <Text fontSize="xs">
                relating to or focused on a very small geographical community, as a neighborhood
              </Text>
            </Box>
            <Stack direction={"row"} spacing={6}>
              <Link
                href="https://github.com/localgingerhk/localginger"
                target="_blank"
                rel="nofollow noopener"
              >
                <IconButton
                  size={"sm"}
                  aria-label={"GitHub repository"}
                  icon={<FiGithub size={18} />}
                />
              </Link>
              <IconButton
                d={["flex", "none"]}
                size={"sm"}
                aria-label={"Share"}
                icon={<FiShare2 size={18} />}
                onClick={() => {
                  try {
                    // @ts-ignore
                    navigator.share({
                      title: "localginger.hk - Awesome stuff made by Singaporeans",
                      url: "https://localginger.hk",
                    })
                  } catch (e) {}
                }}
              />
              <Link
                href="https://app.panelbear.com/share/104rkj82wxFYqkfp64s6fb/"
                target="_blank"
                rel="nofollow noopener"
              >
                <IconButton
                  size={"sm"}
                  aria-label={"Site statistics"}
                  icon={<IoStatsChart size={18} />}
                />
              </Link>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>About</ListHeader>
            <InternalLink href={"/#discover"}>Discover</InternalLink>
            <Link target="_blank" href={"#"}>
              Founder Stories<Text fontSize="sm"> - coming soon!</Text>
            </Link>
            <SuspenseWithSpinner>
              <LogInOutButton />
            </SuspenseWithSpinner>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Listings</ListHeader>
            <SuspenseWithSpinner>
              <AddListing />
            </SuspenseWithSpinner>
            <Link
              target="_blank"
              href={"https://github.com/localgingerhk/localginger/issues"}
              rel="nofollow noopener"
            >
              Issues
            </Link>
            <Link
              target="_blank"
              href={"https://github.com/localgingerhk/localginger"}
              rel="nofollow noopener"
            >
              Contribute
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <IconButton
                bg={useColorModeValue("green.400", "green.800")}
                color={useColorModeValue("white", "gray.800")}
                _hover={{
                  bg: "green.600",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
                onClick={async () => {
                  const subscribed = await subscribe(email, toast)
                  if (subscribed) setEmail("")
                }}
              />
            </Stack>
            <Text fontSize={"xs"} mt={3}>
              No spam, we promise
            </Text>
            <Text fontSize={"xs"} mt={3}>
              Built with{" "}
              <Link href="https://blitzjs.com/" rel="nofollow noopener" aria-label="Blitz.js">
                <Icon as={BsLightningFill} boxSize={5} color="gold" d={"inline-block"} />
              </Link>{" "}
              by{" "}
              <Link
                href="https://github.com/localgingerhk"
                textDecor="underline"
                target="_blank"
                rel="nofollow noopener"
              >
                @localginger
              </Link>{" "}
              © {new Date().getFullYear()} localginger.hk
            </Text>
            <Text fontSize={"xs"} mt={3}>
              Looking for a <Icon as={BiCodeAlt} boxSize={5} color="blue.500" d={"inline-block"} />{" "}
              job in HK? Check out{" "}
              <Link
                href="https://jobs.localginger.hk"
                textDecor="underline"
                target="_blank"
                rel="nofollow noopener"
              >
                Localginger Jobs
              </Link>
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
      <Alert alertText={alertText} setAlertText={setAlertText} />
    </Box>
  )
}

export default Footer
