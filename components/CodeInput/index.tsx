import { Text, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

export default function CodeInput(this: any) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [codes, setCodes] = useState<Array<string>>(Array(6).fill(""));

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
    newCodes[index] = "";
    setCodes(newCodes);
  };
  useEffect(() => {
    inputs.current = inputs.current
      .slice(0, 6)
      .map((_, index) => inputs.current[index]);
  }, []);

  useEffect(() => {
    const joinedCode = codes.join("");
    console.log("Código completo:", joinedCode);
    // Aqui você pode fazer o que quiser com o código completo, como enviar para um servidor, etc.
  }, [codes]);

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
    </div>
  );
}
