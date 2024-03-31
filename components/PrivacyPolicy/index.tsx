import NextImage from "next/image";
import { Anchor, Button, Checkbox, Divider, Image, Text } from "@mantine/core";
import * as Icons from "../../public/icons/index";
import { useDisclosure } from "@mantine/hooks";
import PrivacyModal from "../PrivacyModal";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PrivacyPolicy() {
  const [opened, { open, close }] = useDisclosure(false);
  const [firstChecked, setFirstChecked] = useState(false);
  const [secondChecked, setSecondChecked] = useState(false);

  const router = useRouter();

  const handleNextClick = () => {
    router.push("/created-account");
  };

  return (
    <>
      <div>
        <Divider style={{ marginBlock: 0 }} />
        <div
          className="flex flex-row justify-center items-center gap-5 self-stretch my-5"
          onClick={open}
        >
          <Image
            component={NextImage}
            src={Icons.FileIcon}
            alt="Phone icon"
            h={48}
            w={48}
          />
          <div className="w-full gap-[8px]">
            <Text className="text-[#101828] text-lg not-italic font-bold leading-[30px]">
              política de Privacidade
            </Text>
            <Text className="text-[#767A86] text-base not-italic font-normal leading-6">
              Clique e leia o regulamento
            </Text>
          </div>
          <Image
            component={NextImage}
            src={Icons.ArrowRight}
            alt="Arrow right icon"
            h={24}
            w={24}
          />
        </div>
        <Divider my="lg" />
        <div className="mt-[0.75rem] mb-[2rem] gap-[1.063rem] flex flex-col">
          <Checkbox
            checked={firstChecked}
            color="#56D863"
            label="Aceito os Termos e Condições da Lotefy"
            onChange={(event) => setFirstChecked(event.currentTarget.checked)}
          />
          <Checkbox
            checked={secondChecked}
            color="#56D863"
            label="Concordo em receber comunicações da Lotefy"
            onChange={(event) => setSecondChecked(event.currentTarget.checked)}
          />
        </div>
        <Button
          variant="filled"
          color="#56D963"
          radius="xs"
          size="lg"
          fullWidth
          style={{ "--button-fz": "16px" }}
          className="mb-[2rem] font-light"
          onClick={handleNextClick}
        >
          Próximo
        </Button>
      </div>
      <PrivacyModal
        opened={opened}
        close={close}
        setFirstChecked={setFirstChecked}
        setSecondChecked={setSecondChecked}
      />
    </>
  );
}
