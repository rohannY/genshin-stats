import {useCheckbox, Chip, VisuallyHidden, tv} from "@nextui-org/react";


export default function Check() {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: true,
  });

  const checkbox = tv({
    slots: {
      base: "border-default hover:bg-default-200",
      content: "text-xs",
    },
    variants: {
      isSelected: {
        true: {
          base: "bg-none border border-amber-600",
          content: "text-amber-600 text-xs pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "bg-none border border-green-600",
          content:"text-green-600 text-xs pl-1",
        },
      },
    },
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <>
      <label {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <Chip
          classNames={{
            base: styles.base(),
            content: styles.content(),
          }}
          color={isSelected ? "warning" : "success"}
          size="sm"
          variant="dot"
          {...getLabelProps()}
        >
          {children ? children : isSelected ? "Pending" : "Done"}
        </Chip>
      </label>
    </>
  );
}
