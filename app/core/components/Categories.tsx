import { Suspense, useEffect, useState } from "react"
import { useRouter, useRouterQuery, useQuery, Link } from "blitz"
import {
  Box,
  Icon,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react"
import { Search2Icon, CheckCircleIcon } from "@chakra-ui/icons"
import { DebounceInput } from "react-debounce-input"
import { IconType } from "react-icons"
import { FiShoppingBag } from "react-icons/fi"
import { FaRegHandSpock } from "react-icons/fa"
import { RiAppsLine } from "react-icons/ri"
import { BsPeople } from "react-icons/bs"
import getListingCount from "app/listings/queries/getListingCount"

interface StatsCardProps {
  title: string
  stat: string
  icon: IconType
  color: string
  toggle: boolean
  subtext: string
}
const StatCount = ({ category, toggle }) => {
  const [count, { refetch }] = useQuery(getListingCount, { where: { category } })
  useEffect(() => {
    refetch()
  }, [toggle])
  return (
    <StatNumber fontSize={"2xl"} fontWeight={"medium"} textAlign={"right"}>
      {count}
    </StatNumber>
  )
}
const WrappedStatNumber = (props) => (
  <Suspense fallback={<Spinner />}>
    <StatCount {...props} />
  </Suspense>
)
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, color, toggle, subtext } = props
  const router = useRouter()
  const query = useRouterQuery()
  const active = query.hasOwnProperty("category") && query.category === stat
  const nextQuery = {
    ...router.query,
    category: stat,
  }
  let { category, ...queryWithoutCategory } = nextQuery
  return (
    <Link
      shallow
      href={{
        query: active ? { ...queryWithoutCategory } : nextQuery,
      }}
    >
      <Stat
        as={"a"}
        px={{ base: 2, md: 4 }}
        py={1}
        shadow={"xl"}
        border={"3px solid"}
        borderColor={color}
        rounded={"lg"}
        cursor={"pointer"}
        color={active ? "white" : color}
        bg={active ? color : "transparent"}
        _hover={{
          bg: color,
          color: "white",
        }}
      >
        <Flex justifyContent={"space-between"}>
          <Box my={"auto"} alignContent={"center"}>
            {active ? <Icon as={CheckCircleIcon} boxSize={10} /> : <Icon as={icon} boxSize={10} />}
          </Box>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated textAlign={"right"}>
              {title}
            </StatLabel>
            <WrappedStatNumber category={stat} toggle={toggle} />
          </Box>
        </Flex>
        {subtext && (
          <Text fontSize={10} as="div">
            {subtext}
          </Text>
        )}
      </Stat>
    </Link>
  )
}

const Categories = (props) => {
  const router = useRouter()
  const params = new URLSearchParams()
  Object.keys(router.query).forEach((key) => {
    params.set(key, router.query[key] as string)
  })
  const [search, setSearch] = useState(params.get("search") || "")
  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }} id="discover">
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Products"}
          stat={"products"}
          icon={FiShoppingBag}
          color={"#2ecc71"}
          {...props}
          subtext="Physical products"
        />
        <StatsCard
          title={"Services"}
          stat={"services"}
          icon={FaRegHandSpock}
          color={"#3498db"}
          {...props}
          subtext="Intangible items"
        />
        <StatsCard
          title={"Apps"}
          stat={"app"}
          icon={RiAppsLine}
          color={"#9b59b6"}
          {...props}
          subtext="Web or mobile applications"
        />
        <StatsCard
          title={"Communities"}
          stat={"community"}
          icon={BsPeople}
          color={"#e74c3c"}
          {...props}
          subtext="Groups sharing a purpose"
        />
      </SimpleGrid>
      <Box maxW="3xl" mx={"auto"} my={8} mb={-2}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            /* eslint-disable */
            children={<Search2Icon color="gray.300" boxSize={6} padding={10} />}
          />
          <DebounceInput
            element={Input}
            minLength={2}
            debounceTimeout={300}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              const params = new URLSearchParams()
              Object.keys(router.query).forEach((key) => {
                params.set(key, params[key])
              })
              if (e.target.value) {
                params.set("search", e.target.value)
              } else {
                params.delete("search")
              }
              router.push(
                `${router.pathname}${params.toString() ? `?${params.toString()}` : ""}`,
                undefined,
                {
                  shallow: true,
                }
              )
            }}
            textAlign={"center"}
            fontSize={{ base: "lg", md: "2xl" }}
            py={6}
            placeholder={"What do you want to discover?"}
            shadow={"xl"}
            borderTop={"none"}
            borderRight={"none"}
            borderLeft={"none"}
            borderWidth={"2px"}
            borderRadius={"none"}
            borderColor={"red.300"}
            borderBottomStyle={"dashed"}
            _focus={{
              outline: "none",
            }}
            _hover={{
              borderColor: "red.500",
            }}
          />
        </InputGroup>
      </Box>
    </Box>
  )
}

export default Categories
