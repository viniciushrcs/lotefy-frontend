import NextImage from "next/image";
import { Anchor, Button, Image, InputBase, Text } from "@mantine/core";
import BackButton from "../../public/icons/BackButton.svg";
import UserIcon from "../../public/icons/UserIcon.svg";
import { IMaskInput } from "react-imask";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-[1.88fr_1fr] h-screen">
      <div className="flex justify-center items-center">
        <div className="max-h-[22.8rem] max-w-[22rem] w-[22rem] h-[22.8rem] ">
          <div className="flex justify-center items-center flex-col">
            <Image
              component={NextImage}
              src={UserIcon}
              alt="Uses icon"
              h={48}
              w={48}
              className="mb-[2rem]"
            />
            <Text className="text-[#0F1728] text-[2rem] font-medium leading-[2.3rem] mb-3">
              Seu CPF
            </Text>
            <Text className="text-[#767A86] text-base font-normal leading-6 mb-[2rem]">
              Informe seu CPF, por favor
            </Text>
          </div>
          <InputBase
            radius="xs"
            size="md"
            component={IMaskInput}
            mask="000.000.000-00"
            placeholder="000.000.000-00"
            className="mb-[1.5rem]"
          />
          <Button
            variant="filled"
            color="#56D963"
            radius="xs"
            size="md"
            fullWidth
            style={{ "--button-fz": "16px" }}
            className="mb-[2rem]"
          >
            Próximo
          </Button>
          <div className="flex gap-[0.25rem]  justify-center items-center">
            <Image
              component={NextImage}
              src={BackButton}
              alt="Logo"
              h={20}
              w={20}
            />
            <Anchor
              href="http://localhost:3000/login"
              className="text-[#56D963] text-sm font-normal leading-5"
            >
              Volte ao login
            </Anchor>
          </div>
        </div>
      </div>
      <div className="p-12">
        <Text className="text-[#0F1728] text-center text-[2rem] font-medium leading-[38px] pb-[5rem]">
          Passos para criar sua conta no Lotefy
        </Text>
      </div>
    </div>
  );
}
