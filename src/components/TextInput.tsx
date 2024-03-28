import { forwardRef, type InputHTMLAttributes } from "react";

/* we don't need multiple classNames since the whole application contains a single text input */
interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {}

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input
    className="relative px-5 py-[17px] w-full placeholder-gray-400 text-gray-100 bg-[#1E1E29] rounded-lg drop-shadow-light outline-none caret-product"
    type="text"
    {...props}
    ref={ref}
  />
));

TextInput.displayName = "TextInput";

export default TextInput;
