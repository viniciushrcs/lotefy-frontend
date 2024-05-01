import NextImage from "next/image";
import {
  Anchor,
  Group,
  Image,
  InputBase,
  Radio,
  TextInput,
  Text,
  SimpleGrid,
} from "@mantine/core";
import { FormEvent, useContext, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { SignUpContext } from "../../context/SignUpContext";
import BackButton from "../../public/icons/BackButton.svg";
import * as Icons from "../../public/icons/index";
import CodeInput from "../CodeInput";
import PasswordInput from "../PasswordInput";
import PrivacyPolicy from "../PrivacyPolicy";
import RegisterInput from "../RegisterInput";
import Verify from "../Verify";
import { APP_ENVS } from "../../helpers/envs";

type KeyboardInputNames =
  | "venture-name"
  | "fantasy-name-input"
  | "venture-status-input"
  | "venture-cnae-input"
  | "venture-social-reason-input"
  | "spe-cnpj-input"
  | "open-date"
  | "spe-address-type-input"
  | "spe-address-input"
  | "password-input"
  | "confirm-password-input"
  | "spe-address-number-input"
  | "spe-address-complement-input"
  | "spe-address-complement-input"
  | "spe-address-district-input"
  | "spe-address-city-input"
  | "spe-address-state-input"
  | "spe-address-zipcode-input";

export function InputVentureRegisterDisplayer(
  step: number,
  prevStep: any,
  nextStep: any
) {
  const { updateUserData, userData } = useContext(SignUpContext);
  const [verify, setVerify] = useState(0);
  const [inputs, setInputs] = useState<Record<KeyboardInputNames, string>>({
    "venture-name": "",
    "fantasy-name-input": "",
    "venture-status-input": "",
    "venture-cnae-input": "",
    "venture-social-reason-input": "",
    "spe-cnpj-input": "",
    "open-date": "",
    "spe-address-type-input": "",
    "spe-address-input": "",
    "password-input": "",
    "confirm-password-input": "",
    "spe-address-number-input": "",
    "spe-address-complement-input": "",
    "spe-address-district-input": "",
    "spe-address-city-input": "",
    "spe-address-state-input": "",
    "spe-address-zipcode-input": "",
  });

  const [error, setError] = useState<Record<KeyboardInputNames, string>>({
    "venture-name": "",
    "fantasy-name-input": "",
    "venture-status-input": "",
    "venture-cnae-input": "",
    "venture-social-reason-input": "",
    "spe-cnpj-input": "",
    "open-date": "",
    "spe-address-type-input": "",
    "spe-address-input": "",
    "password-input": "",
    "confirm-password-input": "",
    "spe-address-number-input": "",
    "spe-address-complement-input": "",
    "spe-address-district-input": "",
    "spe-address-city-input": "",
    "spe-address-state-input": "",
    "spe-address-zipcode-input": "",
  });

  useEffect(() => {
    updateUserData({
      cpf: inputs["venture-name"],
      name: inputs["fantasy-name-input"],
      phone: inputs["venture-status-input"],
      email: inputs["venture-cnae-input"],
      socialReason: inputs["venture-social-reason-input"],
      cnpj: inputs["spe-cnpj-input"],
      completedProjects: inputs["open-date"],
      vgv: inputs["spe-address-type-input"],
      employees: inputs["spe-address-input"],
      password: inputs["password-input"],
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
          <div className="mb-[10%]">
            <RegisterInput
              icon={Icons.FileIcon}
              inputHeader={"Dados do empreendimento"}
              inputDescription={
                "Digite as principais informações do empreendimento"
              }
              buttonName={"Próximo"}
              isGrid
              nextStep={() => {
                !inputs["venture-name"].length
                  ? setError((prevInputs) => ({
                      ...prevInputs,
                      "venture-name": "Nome inválido",
                    }))
                  : nextStep();
              }}
            >
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 2 }}
                spacing={{ base: 15, sm: "xs" }}
                verticalSpacing={{ base: "xs", sm: "xs" }}
              >
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Nome do empreendimento"
                  className="mb-[0.75rem]"
                  value={inputs["venture-name"]}
                  onChange={(event) => handleInputChange(event, "venture-name")}
                  error={error["venture-name"]}
                />

                <Group className="flex items-center justify-center gap-[0]">
                  <Text className="text-[#101828] text-base font-medium leading-6">
                    SPE constituída?
                  </Text>
                  <Radio.Group>
                    <Group mt="xs" style={{ marginBottom: "10px" }}>
                      <Radio color="#56D963" value="yes" label="Sim" />
                      <Radio color="#56D963" value="no" label="Não" />
                    </Group>
                  </Radio.Group>
                </Group>

                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CNPJ da SPE"
                  className="mb-[0.75rem]"
                  value={inputs["spe-cnpj-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-cnpj-input")
                  }
                  error={error["spe-cnpj-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Razao social completa"
                  className="mb-[0.75rem]"
                  value={inputs["venture-social-reason-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "venture-social-reason-input")
                  }
                  error={error["venture-social-reason-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Nome fantasia"
                  className="mb-[0.75rem]"
                  value={inputs["fantasy-name-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "fantasy-name-input")
                  }
                  error={error["fantasy-name-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Status"
                  className="mb-[0.75rem]"
                  value={inputs["venture-status-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "venture-status-input")
                  }
                  error={error["venture-status-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CNAE principal"
                  className="mb-[0.75rem]"
                  value={inputs["venture-cnae-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "venture-cnae-input")
                  }
                  error={error["venture-cnae-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  component={IMaskInput}
                  mask="00/00/0000"
                  placeholder="Data da abertura"
                  className="mb-[1.5rem]"
                  value={inputs["open-date"]}
                  onChange={(event) => handleInputChange(event, "open-date")}
                  error={error["open-date"]}
                />
              </SimpleGrid>
            </RegisterInput>
            <div className="flex gap-[0.25rem] justify-center items-center mt-[10rem]">
              <Image
                component={NextImage}
                src={BackButton}
                alt="Logo"
                h={20}
                w={20}
              />
              <Anchor
                href={`${APP_ENVS.lotefyBaseUrl}/dashboard`}
                className="text-[#56D963] text-sm font-normal leading-5"
              >
                Volte ao dashboard
              </Anchor>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="mb-[45%]">
            <RegisterInput
              icon={Icons.FileIcon}
              inputHeader={"Dados da SPE"}
              inputDescription={"Preencha os dados da SPE"}
              buttonName={"Próximo"}
              isGrid
              prevStep={prevStep}
              backAnchorName={"Voltar"}
              nextStep={() => {
                !inputs["venture-name"].length
                  ? setError((prevInputs) => ({
                      ...prevInputs,
                      "venture-name": "Nome inválido",
                    }))
                  : nextStep();
              }}
            >
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 2 }}
                spacing={{ base: 15, sm: "xs" }}
                verticalSpacing={{ base: "xs", sm: "xs" }}
              >
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Tipo de logradouro"
                  className="mb-[0.75rem]"
                  value={inputs["spe-address-type-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-address-type-input")
                  }
                  error={error["spe-address-type-input"]}
                />
                <Group className="flex items-center justify-center gap-[0]">
                  <Text className="text-[#101828] text-base font-medium leading-6">
                    O imóvel é integralizado na SPE?
                  </Text>
                  <Radio.Group>
                    <Group mt="xs" style={{ marginBottom: "10px" }}>
                      <Radio color="#56D963" value="yes" label="Sim" />
                      <Radio color="#56D963" value="no" label="Não" />
                    </Group>
                  </Radio.Group>
                </Group>

                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Logradouro"
                  className="mb-[0.75rem]"
                  value={inputs["spe-address-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-address-input")
                  }
                  error={error["spe-address-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Número"
                  className="mb-[0.75rem]"
                  value={inputs["spe-address-number-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-address-number-input")
                  }
                  error={error["spe-address-number-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Complemento"
                  className="mb-[0.75rem]"
                  value={inputs["spe-address-complement-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-address-complement-input")
                  }
                  error={error["spe-address-complement-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Bairro"
                  className="mb-[0.75rem]"
                  value={inputs["spe-address-district-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-address-district-input")
                  }
                  error={error["spe-address-district-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Município"
                  className="mb-[0.75rem]"
                  value={inputs["spe-address-city-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-address-city-input")
                  }
                  error={error["spe-address-city-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Estado"
                  className="mb-[0.75rem]"
                  value={inputs["spe-address-state-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-address-state-input")
                  }
                  error={error["spe-address-state-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CEP"
                  component={IMaskInput}
                  mask="00000-000"
                  className="mb-[0.75rem]"
                  value={inputs["spe-address-zipcode-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-address-zipcode-input")
                  }
                  error={error["spe-address-zipcode-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  component={IMaskInput}
                  mask="00/00/0000"
                  placeholder="Data da abertura"
                  className="mb-[1.5rem]"
                  value={inputs["open-date"]}
                  onChange={(event) => handleInputChange(event, "open-date")}
                  error={error["open-date"]}
                />
              </SimpleGrid>
            </RegisterInput>
          </div>
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
              //   verifyPasswordsFields(inputs, setError) === null
              //     ? nextStep()
              //     : verifyPasswordsFields(inputs, setError);
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
                nextStep={() => {
                  //   verifyPhoneAndEmail(inputs, setError) === null
                  //     ? setVerify(1)
                  //     : verifyPhoneAndEmail(inputs, setError);
                }}
              >
                <InputBase
                  radius="xs"
                  size="md"
                  component={IMaskInput}
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                  className="mb-[1.5rem]"
                  //   value={inputs["phone-input"]}
                  //   onChange={(event) => handleInputChange(event, "phone-input")}
                  //   error={error["phone-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Seu melhor e-mail"
                  className="mb-[1.5rem]"
                  type="email"
                  //   value={inputs["email-input"]}
                  //   onChange={(event) => handleInputChange(event, "email-input")}
                  //   error={error["email-input"]}
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
                backAnchorName={"Voltar"}
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
              //   isCompanyFieldsValid(inputs, setError) === null
              //     ? nextStep()
              //     : isCompanyFieldsValid(inputs, setError);
            }}
          >
            <InputBase
              radius="xs"
              size="md"
              placeholder="Razao social completa"
              className="mb-[0.75rem]"
              value={inputs["venture-social-reason-input"]}
              onChange={(event) =>
                handleInputChange(event, "venture-social-reason-input")
              }
              error={error["venture-social-reason-input"]}
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="CNPJ"
              className="mb-[0.75rem]"
              value={inputs["spe-cnpj-input"]}
              onChange={(event) => handleInputChange(event, "spe-cnpj-input")}
              error={error["spe-cnpj-input"]}
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Quantos empreendimentos já finalizados?"
              className="mb-[0.75rem]"
              // value={inputs["completed-projects-input"]}
              // onChange={(event) =>
              //   handleInputChange(event, "completed-projects-input")
              // }
              // error={error["completed-projects-input"]}
            />
            <InputBase
              radius="xs"
              size="md"
              placeholder="Em reais, qual seu VGV para daqui 5 anos?"
              className="mb-[0.75rem]"
              value={inputs["spe-address-type-input"]}
              onChange={(event) =>
                handleInputChange(event, "spe-address-type-input")
              }
              error={error["spe-address-type-input"]}
            />
            <TextInput
              radius="xs"
              size="md"
              placeholder="Quantos funcionários?"
              className="mb-[0.75rem]"
              // value={inputs["employees-input"]}
              // onChange={(event) => handleInputChange(event, "employees-input")}
              // error={error["employees-input"]}
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

  return <div>{renderRegisterInput()}</div>;
}
