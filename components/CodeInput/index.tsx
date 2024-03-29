import { Anchor, Button, Text, TextInput } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { SignUpService } from "../../services/signUp";
import { SignUpContext } from "../../context/SignUpContext";

export default function CodeInput({ setVerify }: any) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [codes, setCodes] = useState<Array<string>>(Array(6).fill(""));
  const [finalCode, setFinalCode] = useState<string>();

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

    console.log("Código completo:", joinedCode, joinedCode.length);
  }, [codes]);

  const codeVerify = async () => {
    try {
      if (finalCode?.length === 6) {
        const response = await SignUpService.userVerify(
          userData.email,
          finalCode
        );
        updateUserData({
          isVerified: "verified",
          accessToken: response.data.session.access_token,
        });

        return response;
      }

      return null;
    } catch (error) {
      throw new Error("Error in sending code to verify account");
    }
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
              styles={{ input: { height: "5rem", fontSize: "3rem" } }}
            />
          ))}
        </form>
      </div>
      <Button
        variant="filled"
        color="#56D963"
        radius="xs"
        size="lg"
        fullWidth
        style={{ "--button-fz": "16px" }}
        className="mb-[2rem] font-light"
        onClick={() => {
          codeVerify();
          setVerify();
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
