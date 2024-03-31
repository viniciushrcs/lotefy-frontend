import NextImage from "next/image";
import { Anchor, Button, Divider, Image, Text } from "@mantine/core";
import * as Icons from "../../public/icons/index";
import BackButton from "../../public/icons/BackButton.svg";
import { useContext } from "react";
import { SignUpContext } from "../../context/SignUpContext";
import { SignUpService } from "../../services/signUp";

export default function Verify({ setVerify, prevStep, nextStep }: any) {
  const { userData, updateUserData } = useContext(SignUpContext);

  const sendEmailVerification = async () => {
    try {
      if (userData) {
        const response = await SignUpService.signUp(
          userData.email,
          userData.password,
          userData.name
        );
        console.log(response, "SENDEMAIL");
        updateUserData({ userId: response?.data.user_id });
      } else return null;
    } catch (error) {
      console.error("Error in sendEmailVerification:", error);
      throw new Error("Error in sending email verification");
    }
  };

  const submit = async () => {
    sendEmailVerification();
    setVerify();
  };

  return (
    <div>
      <Divider style={{ marginBlock: 0 }} />
      <div
        className="flex flex-row justify-center items-center gap-5 self-stretch my-5"
        onClick={() => {
          userData.isVerified === "verified" ? {} : submit();
        }}
      >
        <Image
          component={NextImage}
          src={Icons.Phone}
          alt="Phone icon"
          h={48}
          w={48}
        />
        <div className="w-full">
          <Text className="text-[#101828] text-lg not-italic font-bold leading-[30px]">
            Verificar e-mail
          </Text>
        </div>
        {userData.isVerified === "verified" ? (
          <div className="bg-[#38DB6A] rounded-lg px-[0.624rem] py-1">
            <Text className="text-white text-center text-sm not-italic font-light leading-5">
              Verificado
            </Text>
          </div>
        ) : (
          <Image
            component={NextImage}
            src={Icons.ArrowRight}
            alt="Arrow right icon"
            h={24}
            w={24}
          />
        )}
      </div>
      <Divider my="lg" />
      {userData.isVerified === "verified" && (
        <>
          <Button
            variant="filled"
            color="#56D963"
            radius="xs"
            size="lg"
            fullWidth
            style={{ "--button-fz": "16px" }}
            className="mb-[2rem] font-light"
            onClick={nextStep}
          >
            Próximo
          </Button>
        </>
      )}
      <div className="flex gap-[0.25rem] justify-center items-center">
        <Image
          component={NextImage}
          src={BackButton}
          alt="Logo"
          h={20}
          w={20}
        />
        <Anchor
          className="text-[#56D963] text-sm font-normal leading-5"
          onClick={prevStep}
        >
          Voltar
        </Anchor>
      </div>
    </div>
  );
}
