import NextImage from "next/image";
import { Image, TextInput, Text } from "@mantine/core";
import * as Icons from "../../public/icons/index";

export default function PasswordInput({
  password,
  handleInputChange,
  confirmPassword,
  error,
  confirmPasswordError,
}: any) {
  const checkPasswordMinimumLength = () => {
    const hasMinimumLength = password.length >= 8;
    return hasMinimumLength;
  };

  const checkPasswordSpecialCharacter = () => {
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasSpecialCharacter;
  };

  const isPasswordEmpty = password.trim() === "";

  return (
    <div>
      <TextInput
        type="password"
        placeholder="••••••••"
        radius="xs"
        size="md"
        className="mb-[1.5rem]"
        value={password}
        onChange={(event) => handleInputChange(event, "password-input")}
        error={error}
      />
      <TextInput
        type="password"
        placeholder="••••••••"
        radius="xs"
        size="md"
        className="mb-[1.5rem]"
        label={"Confirme sua senha"}
        value={confirmPassword}
        onChange={(event) => handleInputChange(event, "confirm-password-input")}
        error={confirmPasswordError}
        styles={{
          label: {
            color: "#0F1728",
            fontFamily: "DM Sans",
            fontSize: "14px",
            fontWeight: 700,
          },
        }}
      />
      <div className="mb-[20px]">
        <div className="flex gap-[8px]">
          <Image
            component={NextImage}
            src={
              isPasswordEmpty
                ? Icons.CheckIcon
                : checkPasswordMinimumLength()
                ? Icons.CheckIconGreen
                : Icons.CheckIconRed
            }
            alt="check icon"
            h={20}
            w={20}
          />
          <Text>Sua senha deve ter 8 caracteres</Text>
        </div>
        <div className="flex gap-[8px]">
          <Image
            component={NextImage}
            src={
              isPasswordEmpty
                ? Icons.CheckIcon
                : checkPasswordSpecialCharacter()
                ? Icons.CheckIconGreen
                : Icons.CheckIconRed
            }
            alt="check icon"
            h={20}
            w={20}
          />
          <Text>Deve conter um caractere especial (@#?!~{}, etc)</Text>
        </div>
      </div>
    </div>
  );
}
