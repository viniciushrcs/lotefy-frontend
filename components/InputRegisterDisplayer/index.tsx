import { Anchor, Image, InputBase, TextInput } from "@mantine/core";
import NextImage from "next/image";
import { FormEvent, useContext, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { SignUpContext } from "../../context/SignUpContext";
import { CpfValidator } from "../../helpers/cpfValidator";
import {
  isCompanyFieldsValid,
  verifyPasswordsFields,
  verifyPhoneAndEmail,
} from "../../helpers/verifySignUpFields";
import BackButton from "../../public/icons/BackButton.svg";
import * as Icons from "../../public/icons/index";
import CodeInput from "../CodeInput";
import PasswordInput from "../PasswordInput";
import PrivacyPolicy from "../PrivacyPolicy";
import RegisterInput from "../RegisterInput";
import Verify from "../Verify";
import { APP_ENVS } from "../../helpers/envs";

type KeyboardInputNames =
  | "cpf-input"
  | "name-input"
  | "phone-input"
  | "email-input"
  | "social-reason-input"
  | "cnpj-input"
  | "user-cnae"
  | "vgv-input"
  | "employees-input"
  | "password-input"
  | "confirm-password-input"
  | "createdat-user-input";

export function InputRegisterDisplayer(
  step: number,
  prevStep: any,
  nextStep: any
) {
  const { updateUserData, userData } = useContext(SignUpContext);
  const [verify, setVerify] = useState(0);
  const [inputs, setInputs] = useState<Record<KeyboardInputNames, string>>({
    "cpf-input": "",
    "name-input": "",
    "phone-input": "",
    "email-input": "",
    "social-reason-input": "",
    "cnpj-input": "",
    "user-cnae": "",
    "vgv-input": "",
    "employees-input": "",
    "password-input": "",
    "confirm-password-input": "",
    "createdat-user-input": "",
  });

  const [error, setError] = useState<Record<KeyboardInputNames, string>>({
    "cpf-input": "",
    "name-input": "",
    "phone-input": "",
    "email-input": "",
    "social-reason-input": "",
    "cnpj-input": "",
    "user-cnae": "",
    "vgv-input": "",
    "employees-input": "",
    "password-input": "",
    "confirm-password-input": "",
    "createdat-user-input": "",
  });

  useEffect(() => {
    updateUserData({
      cpf: inputs["cpf-input"],
      name: inputs["name-input"],
      phone: inputs["phone-input"],
      email: inputs["email-input"],
      socialReason: inputs["social-reason-input"],
      cnpj: inputs["cnpj-input"],
      userCnae: inputs["user-cnae"],
      vgv: inputs["vgv-input"],
      employees: inputs["employees-input"],
      password: inputs["password-input"],
      createdAt: inputs["createdat-user-input"],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, verify]);

  const renderRegisterInput = () => {
    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>,
      inputName: KeyboardInputNames
    ) => {
      const { value } = event.currentTarget;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [inputName]: value,
      }));
      setError((prevInputs) => ({
        ...prevInputs,
        [inputName]: "",
      }));
    };

    switch (step) {
      case 0:
        return (
          <>
            <RegisterInput
              icon={Icons.UserIconIdentification}
              inputHeader={"Seu CPF"}
              inputDescription={"Informe seu CPF, por favor"}
              buttonName={"Próximo"}
              nextStep={() => {
                !inputs["cpf-input"].length ||
                inputs["cpf-input"].length !== 14 ||
                CpfValidator.validate(inputs["cpf-input"]) === false
                  ? setError((prevInputs) => ({
                      ...prevInputs,
                      "cpf-input": "CPF inválido",
                    }))
                  : nextStep();
              }}
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
                error={error["cpf-input"]}
              />
            </RegisterInput>
            <div className="flex gap-[0.25rem] justify-center items-center mt-[-2rem]">
              <Image
                component={NextImage}
                src={BackButton}
                alt="Logo"
                h={20}
                w={20}
              />
              <Anchor
                href={"/login"}
                className="text-[#56D963] text-sm font-normal leading-5"
              >
                Volte ao login
              </Anchor>
            </div>
          </>
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
            nextStep={() => {
              !inputs["name-input"].length
                ? setError((prevInputs) => ({
                    ...prevInputs,
                    "name-input": "Campo obrigatório",
                  }))
                : nextStep();
            }}
          >
            <InputBase
              radius="xs"
              size="md"
              placeholder="Seu nome (como no RG)"
              className="mb-[1.5rem]"
              value={inputs["name-input"]}
              onChange={(event) => handleInputChange(event, "name-input")}
              error={error["name-input"]}
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
            nextStep={() => {
              verifyPasswordsFields(inputs, setError) === null
                ? nextStep()
                : verifyPasswordsFields(inputs, setError);
            }}
          >
            <PasswordInput
              password={inputs["password-input"]}
              handleInputChange={handleInputChange}
              confirmPassword={inputs["confirm-password-input"]}
              error={error["password-input"]}
              confirmPasswordError={error["confirm-password-input"]}
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
                nextStep={async () => {
                  const phoneAndEmailVerification = await verifyPhoneAndEmail(
                    inputs,
                    setError
                  );
                  phoneAndEmailVerification ? setVerify(1) : null;
                }}
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
                  error={error["phone-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Seu melhor e-mail"
                  className="mb-[1.5rem]"
                  type="email"
                  value={inputs["email-input"]}
                  onChange={(event) => handleInputChange(event, "email-input")}
                  error={error["email-input"]}
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
                  prevStep={() => setVerify(0)}
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
                prevStep={() => setVerify(1)}
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
            nextStep={() => {
              isCompanyFieldsValid(inputs, setError) === null
                ? nextStep()
                : isCompanyFieldsValid(inputs, setError);
            }}
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
              error={error["social-reason-input"]}
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="CNPJ"
              className="mb-[0.75rem]"
              value={inputs["cnpj-input"]}
              onChange={(event) => handleInputChange(event, "cnpj-input")}
              error={error["cnpj-input"]}
              component={IMaskInput}
              mask="00.000.000/0000-00"
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="CNAE"
              className="mb-[0.75rem]"
              value={inputs["user-cnae"]}
              onChange={(event) => handleInputChange(event, "user-cnae")}
              error={error["user-cnae"]}
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Em reais, qual seu VGV para daqui 5 anos?"
              className="mb-[0.75rem]"
              value={inputs["vgv-input"]}
              onChange={(event) => handleInputChange(event, "vgv-input")}
              error={error["vgv-input"]}
            />
            <TextInput
              radius="xs"
              size="md"
              placeholder="Quantos funcionários?"
              className="mb-[0.75rem]"
              value={inputs["employees-input"]}
              onChange={(event) => handleInputChange(event, "employees-input")}
              error={error["employees-input"]}
            />
            <InputBase
              className="mb-[0.75rem]"
              placeholder="Data de abertura"
              value={inputs["createdat-user-input"]}
              onChange={(event) =>
                handleInputChange(event, "createdat-user-input")
              }
              size="md"
              component={IMaskInput}
              mask="00/00/0000"
              error={error["createdat-user-input"]}
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
            backAnchorName={"Voltar"}
            prevStep={prevStep}
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
