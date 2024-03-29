import RegisterInput from "../RegisterInput";
import * as Icons from "../../public/icons/index";
import { InputBase } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { FormEvent, useContext, useEffect, useState } from "react";
import Verify from "../Verify";
import PrivacyPolicy from "../PrivacyPolicy";
import CodeInput from "../CodeInput";
import PasswordInput from "../PasswordInput";
import { SignUpContext } from "../../context/SignUpContext";

type KeyboardInputNames =
  | "cpf-input"
  | "name-input"
  | "phone-input"
  | "email-input"
  | "social-reason-input"
  | "cnpj-input"
  | "completed-projects-input"
  | "vgv-input"
  | "employees-input"
  | "password-input";

export function InputRegisterDisplayer(
  step: number,
  prevStep: any,
  nextStep: any
) {
  const renderRegisterInput = () => {
    const [verify, setVerify] = useState(0);
    const [inputs, setInputs] = useState<Record<KeyboardInputNames, string>>({
      "cpf-input": "",
      "name-input": "",
      "phone-input": "",
      "email-input": "",
      "social-reason-input": "",
      "cnpj-input": "",
      "completed-projects-input": "",
      "vgv-input": "",
      "employees-input": "",
      "password-input": "",
    });

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>,
      inputName: KeyboardInputNames
    ) => {
      const { value } = event.currentTarget;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [inputName]: value,
      }));
    };

    const { userData, updateUserData } = useContext(SignUpContext);

    useEffect(() => {
      updateUserData({
        cpf: inputs["cpf-input"],
        name: inputs["name-input"],
        phone: inputs["phone-input"],
        email: inputs["email-input"],
        socialReason: inputs["social-reason-input"],
        cnpj: inputs["cnpj-input"],
        completedProjects: inputs["completed-projects-input"],
        vgv: inputs["vgv-input"],
        employees: inputs["employees-input"],
        password: inputs["password-input"],
      });
    }, [step, verify]);

    console.log(userData, "USER DATA");

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
              value={inputs["cpf-input"]}
              onChange={(event) => handleInputChange(event, "cpf-input")}
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
              value={inputs["name-input"]}
              onChange={(event) => handleInputChange(event, "name-input")}
            />
          </RegisterInput>
        );
      case 2:
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
            <PasswordInput
              password={inputs["password-input"]}
              handleInputChange={handleInputChange}
            />
          </RegisterInput>
        );
      case 3:
        switch (verify) {
          case 0:
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
                nextStep={() => setVerify(1)}
              >
                <InputBase
                  radius="xs"
                  size="md"
                  component={IMaskInput}
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                  className="mb-[1.5rem]"
                  value={inputs["phone-input"]}
                  onChange={(event) => handleInputChange(event, "phone-input")}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Seu melhor e-mail"
                  className="mb-[1.5rem]"
                  type="email"
                  value={inputs["email-input"]}
                  onChange={(event) => handleInputChange(event, "email-input")}
                />
              </RegisterInput>
            );
          case 1:
            return (
              <RegisterInput
                icon={Icons.MessageRegisterIcon}
                inputHeader={"Verifique sua conta"}
                inputDescription={
                  "Precisamos ter certeza de que você é o proprietário dos dados fornecidos."
                }
              >
                <Verify
                  setVerify={() => setVerify(2)}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              </RegisterInput>
            );

          case 2:
            return (
              <RegisterInput
                icon={Icons.MessageRegisterIcon}
                inputHeader={"Verificação de e-mail"}
                inputDescription={
                  "Enviamos um código de verificação para o endereço de e-mail fornecido"
                }
                backAnchorName={"Voltar"}
              >
                <CodeInput setVerify={() => setVerify(1)} />
              </RegisterInput>
            );
        }

      case 4:
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
              value={inputs["social-reason-input"]}
              onChange={(event) =>
                handleInputChange(event, "social-reason-input")
              }
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="CNPJ"
              className="mb-[0.75rem]"
              value={inputs["cnpj-input"]}
              onChange={(event) => handleInputChange(event, "cnpj-input")}
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Quantos empreendimentos já finalizados?"
              className="mb-[0.75rem]"
              value={inputs["completed-projects-input"]}
              onChange={(event) =>
                handleInputChange(event, "completed-projects-input")
              }
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Em reais, qual seu VGV para daqui 5 anos?"
              className="mb-[0.75rem]"
              value={inputs["vgv-input"]}
              onChange={(event) => handleInputChange(event, "vgv-input")}
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Quantos funcionários?"
              className="mb-[0.75rem]"
              value={inputs["employees-input"]}
              onChange={(event) => handleInputChange(event, "employees-input")}
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
            <PrivacyPolicy />
          </RegisterInput>
        );
      default:
        return <div />;
    }
  };

  return <div className="mb-[15%]">{renderRegisterInput()}</div>;
}
