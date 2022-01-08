import { Suspense } from "react"
import { Spinner } from "@chakra-ui/react"

const SuspenseWithSpinner = ({ children }) => <Suspense fallback={<Spinner />}>{children}</Suspense>

export default SuspenseWithSpinner
