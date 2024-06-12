import { Anchor, Button, Text, TextInput } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { SignUpContext } from "../../context/SignUpContext";
import { SignUpService } from "../../services/signUp";

export default function CodeInput({ setVerify }: any) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [codes, setCodes] = useState<Array<string>>(Array(6).fill(""));
  const [finalCode, setFinalCode] = useState<string>();
  const [codeError, setCodeError] = useState<boolean>(false);

  const { userData, updateUserData } = useContext(SignUpContext);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const nextIndex = index + 1;

    if (value && nextIndex < inputs.current.length) {
      inputs.current[nextIndex]?.focus();
    }

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  const handleInputDelete = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    const previousIndex = index - 1;

    if (e.key === "Backspace" && value === "" && previousIndex >= 0) {
      inputs.current[previousIndex]?.focus();
    }

    const newCodes = [...codes];
    setCodes(newCodes);
  };
  useEffect(() => {
    inputs.current = inputs.current
      .slice(0, 6)
      .map((_, index) => inputs.current[index]);
  }, []);

  useEffect(() => {
    const joinedCode = codes.join("");
    setFinalCode(joinedCode);
  }, [codes]);

  const codeVerify = async () => {
    try {
      const response = await SignUpService.userVerify(
        userData.email as string,
        finalCode
      );

      if (!response.data.session.access_token) setCodeError(true);

      updateUserData({
        isVerified: "verified",
        accessToken: response.data.session.access_token,
      });

      setVerify();

      return response;
    } catch (error) {
      updateUserData({ verifyCodeError: "codeVerify Error" });
      setCodeError(true);
    }
  };

  const submit = async () => {
    await codeVerify();
  };

  return (
    <div>
      <Text className="text-[#0F1728] text-sm font-bold leading-5 mb-[1.25em]">
        Digite o código
      </Text>
      <div>
        <form id="codeForm" className="flex gap-[12px] mb-[1.5rem]">
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              maxLength={1}
              ref={(input) => (inputs.current[index] = input)}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleInputDelete(index, e)}
              styles={{ input: { height: "5rem", fontSize: "2rem" } }}
            />
          ))}
        </form>
      </div>
      {codeError && (
        <Text className="flex text-[#FF624D] mb-[1rem] justify-center">
          Código inválido
        </Text>
      )}
      <Button
        variant="filled"
        color="#56D963"
        radius="xs"
        size="lg"
        fullWidth
        style={{ "--button-fz": "16px" }}
        className="mb-[2rem] font-light"
        onClick={() => {
          (finalCode && finalCode?.length < 6) || !finalCode
            ? setCodeError(true)
            : submit();
        }}
      >
        Verficar
      </Button>
      <div className="flex gap-[2.5px] mb-[2rem] justify-center mt-4">
        <Text>Não recebeu?</Text>
        <Anchor className="text-[#56D963]">Reenviar código</Anchor>
      </div>
    </div>
  );
}
