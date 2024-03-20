import NextImage from "next/image";
import {
  Anchor,
  Button,
  Group,
  Image,
  InputBase,
  Stepper,
  Text,
} from "@mantine/core";
import BackButton from "../../public/icons/BackButton.svg";
import UserIcon from "../../public/icons/UserIcon.svg";
import { IMaskInput } from "react-imask";
import { useState } from "react";
import * as Icons from "../../public/icons/index";

export default function LoginPage() {
  const [active, setActive] = useState(1);

  const nextStep = () =>
    setActive((current) => (current < 6 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
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
        <Stepper
          active={active}
          onStepClick={setActive}
          orientation="vertical"
          color="#56D963"
          iconSize={49}
          allowNextStepsSelect={false}
          styles={{
            stepIcon: {
              backgroundColor: "#D6FFDA",
              border: "8px solid #D7F5DA",
            },
            stepBody: {
              color: "#0F1728",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              fontFamily: "DM Sans",

              // "&[data-active]": {
              //   backgroundColor: "red",
              //   color: "red",
              // },
            },
          }}
          completedIcon={
            <Image
              component={NextImage}
              src={Icons.CompletedIcon}
              alt="Logo"
              h={37}
              w={37}
              style={{
                backgroundColor: "#56D963",
                padding: "7px",
                borderRadius: "28px",
              }}
            />
          }
        >
          <Stepper.Step
            label="Identificação"
            description="Usamos seu CPF para te identificar"
            icon={
              <Image
                component={NextImage}
                src={Icons.UserIcon}
                alt="Logo"
                h={20}
                w={20}
              />
            }
          />
          <Stepper.Step
            label="Dados pessoais"
            description="Digite seu nome e data de nascimento"
            icon={
              <Image
                component={NextImage}
                src={Icons.UserIconCheck}
                alt="Logo"
                h={20}
                w={20}
              />
            }
          />
          <Stepper.Step
            label="Número de telefone e e-mail"
            description="Utilizamos o seu número de telefone e conta de e-mail para validar o seu acesso"
            icon={
              <Image
                component={NextImage}
                src={Icons.MessageIcon}
                alt="Logo"
                h={20}
                w={20}
              />
            }
          />
          <Stepper.Step
            label="Dados da empresa"
            description="Utilizamos esses dados para entender o momento da sua loteadora"
            icon={
              <Image
                component={NextImage}
                src={Icons.BuildingIcon}
                alt="Logo"
                h={20}
                w={20}
              />
            }
          />
          <Stepper.Step
            label="Crie sua senha"
            description="Crie sua senha para acessar a plataforma"
            icon={
              <Image
                component={NextImage}
                src={Icons.PasscodeIcon}
                alt="Logo"
                h={20}
                w={20}
              />
            }
          />
          <Stepper.Step
            label="Termos de uso"
            description="Leia e aceite os termos de uso"
            icon={
              <Image
                component={NextImage}
                src={Icons.FileIcon}
                alt="Logo"
                h={20}
                w={20}
              />
            }
          />
          <Stepper.Completed> </Stepper.Completed>
        </Stepper>
        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </div>
    </div>
  );
}
