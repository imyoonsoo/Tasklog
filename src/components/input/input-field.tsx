import { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/cn";

import { useInputContext } from "./input-context";
import { InputWrapperStylesProps } from "./input-style";

interface InputFieldProps
  extends
    ComponentPropsWithRef<"input">,
    Omit<InputWrapperStylesProps, "error" | "disabled"> {}

/**
 * @description Input.Field
 * @param {string} className - Input.Field의 클래스 이름
 * @returns {JSX.Element} Input.Field 컴포넌트
 */
export function InputField({ className, type, ...props }: InputFieldProps) {
  const { isPasswordVisible, isDisabled } = useInputContext();

  // 비밀번호 타입일 경우 토글 상태에 따라 실제 type 결정
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <input
      type={inputType}
      disabled={isDisabled ?? props.disabled}
      className={cn(
        "w-full bg-transparent text-gray-300 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:text-gray-400",
        "autofill-field",
        className
      )}
      {...props}
    />
  );
}
