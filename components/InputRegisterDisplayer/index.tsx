import RegisterInput from "../RegisterInput";
import * as Icons from "../../public/icons/index";
import { InputBase } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { useContext, useState } from "react";
import { SignUpContext } from "../../context/SignUpContext";

export function InputRegisterDisplayer(
  step: number,
  prevStep: any,
  nextStep: any
) {
  const renderAlertModal = () => {
    const [value, setValue] = useState("Clear me");
    const { userData, updateUserData } = useContext(SignUpContext);

    console.log(userData, "isdjisdjsid");

    console.log(value, "LEOEOELEOL");

    switch (step) {
      case 0:
        return (
          <RegisterInput
            icon={Icons.UserIconIdentification}
            inputHeader={"Seu CPF"}
            inputDescription={"Informe seu CPF, por favor"}
            buttonName={"Próximo"}
            backAnchorName={"Volte ao login"}
            prevStep={prevStep}
            nextStep={nextStep}
          >
            <InputBase
              radius="xs"
              size="md"
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="000.000.000-00"
              className="mb-[1.5rem]"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
            />
          </RegisterInput>
        );
      case 1:
        return (
          <RegisterInput
            icon={Icons.UserCheckIcon}
            inputHeader={"Dados pessoais"}
            inputDescription={"Seu nome como está no RG, por favor."}
            buttonName={"Próximo"}
            backAnchorName={"Voltar"}
            prevStep={prevStep}
            nextStep={nextStep}
          >
            <InputBase
              radius="xs"
              size="md"
              placeholder="Seu nome (como no RG)"
              className="mb-[1.5rem]"
            />
          </RegisterInput>
        );
      case 2:
        return (
          <RegisterInput
            icon={Icons.MessageRegisterIcon}
            inputHeader={"Número de telefone e e-mail"}
            inputDescription={
              "Digite seu número de celular e e-mail para que possamos verificar seu acesso."
            }
            buttonName={"Verificar"}
            backAnchorName={"Voltar"}
            prevStep={prevStep}
            nextStep={nextStep}
          >
            <InputBase
              radius="xs"
              size="md"
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="(00) 00000-0000"
              className="mb-[1.5rem]"
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Seu melhor e-mail"
              className="mb-[1.5rem]"
              type="email"
            />
          </RegisterInput>
        );
      case 3:
        return (
          <RegisterInput
            icon={Icons.CompanyIcon}
            inputHeader={"Dados da empresa"}
            inputDescription={
              "Utilizamos esses dados para entender o momento da sua loteadora"
            }
            buttonName={"Próximo"}
            backAnchorName={"Voltar"}
            prevStep={prevStep}
            nextStep={nextStep}
          >
            <InputBase
              radius="xs"
              size="md"
              placeholder="Razao social completa"
              className="mb-[0.75rem]"
            />
            <InputBase
              radius="xs"
              size="md"
              component={IMaskInput}
              mask="99.999.999/9999-99"
              placeholder="CNPJ"
              className="mb-[0.75rem]"
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Quantos empreendimentos já finalizados?"
              className="mb-[0.75rem]"
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Em reais, qual seu VGV para daqui 5 anos?"
              className="mb-[0.75rem]"
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Quantos funcionários?"
              className="mb-[0.75rem]"
            />
          </RegisterInput>
        );
      case 4:
        return (
          <RegisterInput
            icon={Icons.PasswordIcon}
            inputHeader={"Crie sua senha"}
            inputDescription={
              "Esta é a senha que você usará para entrar na área de membros."
            }
            buttonName={"Próximo"}
            backAnchorName={"Voltar"}
            prevStep={prevStep}
            nextStep={nextStep}
          >
            <InputBase
              radius="xs"
              size="md"
              placeholder="••••••••"
              className="mb-[1.5rem]"
              type="password"
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="••••••••"
              className="mb-[1.5rem]"
              label="Confirme sua senha"
              type="password"
            />
          </RegisterInput>
        );
      case 5:
        return (
          <RegisterInput
            icon={Icons.FileRegisterIcon}
            inputHeader={"Termos de uso e politica de privacidade"}
            inputDescription={
              "Leia e aceite os termos de uso para completar seu cadastro no Lotefy"
            }
            buttonName={"Próximo"}
            backAnchorName={"Voltar"}
            prevStep={prevStep}
            nextStep={nextStep}
          >
            <InputBase
              radius="xs"
              size="md"
              component={IMaskInput}
              mask="000.000.000-00"
              placeholder="000.000.000-00"
              className="mb-[1.5rem]"
            />
          </RegisterInput>
        );
      default:
        return <div />;
    }
  };

  return <div>{renderAlertModal()}</div>;
}
