import NextImage from "next/image";
import { Image, Stepper } from "@mantine/core";
import * as Icons from "../../public/icons/index";

interface Props {
  active: number;
  setActive: any;
}

export default function StepperComponent({ active, setActive }: Props) {
  return (
    <>
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
    </>
  );
}
