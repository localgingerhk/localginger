import { AuthenticationError, Link as BLink, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Center, HStack, Text, Link } from "@chakra-ui/react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <BLink href={Routes.ForgotPasswordPage()}>
            <Link color="red.500" float="right" fontSize="sm">
              Forgot your password?
            </Link>
          </BLink>
        </div>
      </Form>

      <Center marginTop="1rem">
        <HStack fontSize="sm" spacing={2}>
          <Text>Or</Text>
          <BLink href={Routes.SignupPage()} passHref>
            <Link color="red.500">Sign Up</Link>
          </BLink>
        </HStack>
      </Center>
    </div>
  )
}

export default LoginForm
