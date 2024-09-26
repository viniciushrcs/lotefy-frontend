import NextImage from "next/image";
import { Button, Checkbox, Divider, Image, Loader, Text } from "@mantine/core";
import * as Icons from "../../public/icons/index";
import { useDisclosure } from "@mantine/hooks";
import PrivacyModal from "../PrivacyModal";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { SignUpContext } from "../../context/SignUpContext";
import { SignUpService } from "../../services/signUp";
import { Regex } from "../../helpers/regex";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export default function PrivacyPolicy() {
  const [opened, { open, close }] = useDisclosure(false);
  const [firstChecked, setFirstChecked] = useState(false);
  const [secondChecked, setSecondChecked] = useState(false);
  const { updateUserData, userData } = useContext(SignUpContext);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleNextClick = async () => {
    setLoading(true);
    try {
      const response = await SignUpService.createPjData(
        userData.userId?.toString(),
        Regex.cleanCNPJ(userData.cnpj?.toString()),
        userData.socialReason?.toString(),
        userData.employees?.toString(),
        userData.email?.toString(),
        Regex.formatDate(userData.createdAt?.toString()),
        userData.userCnae?.toString()
      );

      updateUserData({ userPjId: response.data.pj_id });
      router.push("/created-account");
    } catch (error) {
      setLoading(false);
      notifications.show({
        color: "red",
        title: "Ops! Algo deu errado",
        message: "Por favor, tente novamente mais tarde.",
        autoClose: 4000,
        withCloseButton: true,
        position: "top-center",
      });
    }
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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Loader color="#56D963" type="bars" />
          </div>
        </div>
      )}

      <PrivacyModal
        opened={opened}
        close={close}
        setFirstChecked={setFirstChecked}
        setSecondChecked={setSecondChecked}
      />
    </>
  );
}
