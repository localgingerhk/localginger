import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { FormControl, FormLabel, Input, FormErrorMessage, FormHelperText } from "@chakra-ui/react"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Helper text. */
  helperText?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  visibility?: string
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, helperText, outerProps, fieldProps, labelProps, visibility, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    let normalizedError = error || submitError

    if (Array.isArray(error)) {
      normalizedError = error.join(", ")
    } else if (typeof error === "object") {
      normalizedError = Object.values(normalizedError).join(", ")
    }

    let setVisibility = {}
    if (visibility === "hidden") {
      setVisibility = {
        visibility: "hidden",
        position: "absolute",
        marginLeft: -90210,
      }
    }

    const { size, ...propsWithoutSize } = props

    return (
      <FormControl
        {...outerProps}
        isInvalid={touched && normalizedError}
        isRequired={props.required}
        {...setVisibility}
      >
        <FormLabel fontSize="xs" mb={1}>
          {label}
        </FormLabel>
        <Input {...input} disabled={submitting} {...propsWithoutSize} ref={ref} />
        <FormHelperText fontSize="xs">{helperText}</FormHelperText>
        <FormErrorMessage>{normalizedError}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledTextField
