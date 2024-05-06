import NextImage from "next/image";
import {
  Anchor,
  Group,
  Image,
  InputBase,
  Radio,
  Text,
  SimpleGrid,
  Select,
  Loader,
} from "@mantine/core";
import { FormEvent, useContext, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { SignUpContext } from "../../context/SignUpContext";
import BackButton from "../../public/icons/BackButton.svg";
import * as Icons from "../../public/icons/index";
import RegisterInput from "../RegisterInput";
import { APP_ENVS } from "../../helpers/envs";
import { countryStates } from "../../helpers/states";
import {
  verifyPropertyDataFields,
  verifySecondPropertyDataFields,
} from "../../helpers/verifyVentureRegistrationFields";
import { useRouter } from "next/navigation";

type KeyboardInputNames =
  | "venture-name"
  | "constituted-spe"
  | "spe-cnpj-input"
  | "spe-social-reason-input"
  | "spe-fantasy-name-input"
  | "spe-status-input"
  | "spe-cnae-input"
  | "spe-open-date"
  | "paidin-to-spe"
  | "spe-address-type-input"
  | "spe-address-input"
  | "spe-address-number-input"
  | "spe-address-complement-input"
  | "spe-address-district-input"
  | "spe-address-city-input"
  | "spe-address-state-input"
  | "spe-address-zipcode-input"
  | "property-address-zipcode-input"
  | "property-address-input"
  | "property-address-number-input"
  | "property-address-complement-input"
  | "property-address-district-input"
  | "property-address-city-input"
  | "property-address-state-input"
  | "property-registration"
  | "owner-name"
  | "owner-cpf"
  | "owner-rg"
  | "owner-cnpj"
  | "owner-complete-address"
  | "broker-name"
  | "broker-cpf"
  | "broker-creci"
  | "real-estate-name"
  | "negotiation-status"
  | "partner-complete-name"
  | "partner-cpf"
  | "partner-rg"
  | "partner-cnpj"
  | "partner-role"
  | "counterpart-from-the-partner"
  | "partner-percentage";

export function InputVentureRegisterDisplayer(
  step: number,
  prevStep: any,
  nextStep: any
) {
  const [speAddressStateValue, setSpeAddressStateValue] = useState<
    string | null
  >();
  const [propertyAddressStateValue, setPropertyAddressStateValue] = useState<
    string | null
  >();
  const [negociationStatusValue, setNegociationStatusValue] = useState<
    string | null
  >();
  const [constituedSpeValue, setConstituedSpeValue] = useState("yes");
  const [paidInToSpeValue, setPaidInToSpeValue] = useState("yes");
  const { updateUserData, userData } = useContext(SignUpContext);
  const [inputs, setInputs] = useState<Record<KeyboardInputNames, string>>({
    "venture-name": "",
    "constituted-spe": "",
    "spe-cnpj-input": "",
    "spe-social-reason-input": "",
    "spe-fantasy-name-input": "",
    "spe-status-input": "",
    "spe-cnae-input": "",
    "spe-open-date": "",
    "paidin-to-spe": "",
    "spe-address-type-input": "",
    "spe-address-input": "",
    "spe-address-number-input": "",
    "spe-address-complement-input": "",
    "spe-address-district-input": "",
    "spe-address-city-input": "",
    "spe-address-state-input": "",
    "spe-address-zipcode-input": "",
    "property-address-zipcode-input": "",
    "property-address-input": "",
    "property-address-number-input": "",
    "property-address-complement-input": "",
    "property-address-district-input": "",
    "property-address-city-input": "",
    "property-address-state-input": "",
    "property-registration": "",
    "owner-name": "",
    "owner-cpf": "",
    "owner-rg": "",
    "owner-cnpj": "",
    "owner-complete-address": "",
    "broker-name": "",
    "broker-cpf": "",
    "broker-creci": "",
    "real-estate-name": "",
    "negotiation-status": "",
    "partner-complete-name": "",
    "partner-cpf": "",
    "partner-rg": "",
    "partner-cnpj": "",
    "partner-role": "",
    "counterpart-from-the-partner": "",
    "partner-percentage": "",
  });

  const [error, setError] = useState<Record<KeyboardInputNames, string>>({
    "venture-name": "",
    "constituted-spe": "",
    "spe-cnpj-input": "",
    "spe-social-reason-input": "",
    "spe-fantasy-name-input": "",
    "spe-status-input": "",
    "spe-cnae-input": "",
    "spe-open-date": "",
    "paidin-to-spe": "",
    "spe-address-type-input": "",
    "spe-address-input": "",
    "spe-address-number-input": "",
    "spe-address-complement-input": "",
    "spe-address-district-input": "",
    "spe-address-city-input": "",
    "spe-address-state-input": "",
    "spe-address-zipcode-input": "",
    "property-address-zipcode-input": "",
    "property-address-input": "",
    "property-address-number-input": "",
    "property-address-complement-input": "",
    "property-address-district-input": "",
    "property-address-city-input": "",
    "property-address-state-input": "",
    "property-registration": "",
    "owner-name": "",
    "owner-cpf": "",
    "owner-rg": "",
    "owner-cnpj": "",
    "owner-complete-address": "",
    "broker-name": "",
    "broker-cpf": "",
    "broker-creci": "",
    "real-estate-name": "",
    "negotiation-status": "",
    "partner-complete-name": "",
    "partner-cpf": "",
    "partner-rg": "",
    "partner-cnpj": "",
    "partner-role": "",
    "counterpart-from-the-partner": "",
    "partner-percentage": "",
  });

  const router = useRouter();

  useEffect(() => {
    updateUserData({
      ventureName: inputs["venture-name"],
      constitutedSpe: constituedSpeValue,
      speCnpj: inputs["spe-cnpj-input"],
      speSocialReason: inputs["spe-social-reason-input"],
      speFantasyName: inputs["spe-fantasy-name-input"],
      speStatus: inputs["spe-status-input"],
      speCnae: inputs["spe-cnae-input"],
      speOpenDate: inputs["spe-open-date"],
      paidInToSpe: paidInToSpeValue,
      speAddressType: inputs["spe-address-type-input"],
      speAddress: inputs["spe-address-input"],
      speAddressNumber: inputs["spe-address-number-input"],
      speAddressComplement: inputs["spe-address-complement-input"],
      speAddressDistrict: inputs["spe-address-district-input"],
      speAddressCity: inputs["spe-address-city-input"],
      speAddressState: speAddressStateValue || "",
      speAddressZipcode: inputs["spe-address-zipcode-input"],
      propertyZipcode: inputs["property-address-zipcode-input"],
      propertyAddress: inputs["property-address-input"],
      propertyAddressNumber: inputs["property-address-number-input"],
      propertyAddressComplement: inputs["property-address-complement-input"],
      propertyAddressDistrict: inputs["property-address-district-input"],
      propertyAddressCity: inputs["property-address-city-input"],
      propertyAddressState: propertyAddressStateValue || "",
      propertyRegistration: inputs["property-registration"],
      ownerName: inputs["owner-name"],
      ownerCpf: inputs["owner-cpf"],
      ownerRg: inputs["owner-rg"],
      ownerCnpj: inputs["owner-cnpj"],
      ownerCompleteAddress: inputs["owner-complete-address"],
      brokerName: inputs["broker-name"],
      brokerCpf: inputs["broker-cpf"],
      brokerCreci: inputs["broker-creci"],
      realEstateName: inputs["real-estate-name"],
      negotiationStatus: negociationStatusValue || "",
      partnerCompleteName: inputs["partner-complete-name"],
      partnerCpf: inputs["partner-cpf"],
      partnerRg: inputs["partner-rg"],
      partnerCnpj: inputs["partner-cnpj"],
      partnerRole: inputs["partner-role"],
      counterpartFromThePartner: inputs["counterpart-from-the-partner"],
      partnerPercentage: inputs["partner-percentage"],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

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
                  <Radio.Group
                    value={constituedSpeValue}
                    onChange={setConstituedSpeValue}
                  >
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
                  component={IMaskInput}
                  mask="00.000.000/0000-00"
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
                  value={inputs["spe-social-reason-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-social-reason-input")
                  }
                  error={error["spe-social-reason-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Nome fantasia"
                  className="mb-[0.75rem]"
                  value={inputs["spe-fantasy-name-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-fantasy-name-input")
                  }
                  error={error["spe-fantasy-name-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Status"
                  className="mb-[0.75rem]"
                  value={inputs["spe-status-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-status-input")
                  }
                  error={error["spe-status-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CNAE principal"
                  className="mb-[0.75rem]"
                  value={inputs["spe-cnae-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-cnae-input")
                  }
                  error={error["spe-cnae-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  component={IMaskInput}
                  mask="00/00/0000"
                  placeholder="Data da abertura"
                  className="mb-[1.5rem]"
                  value={inputs["spe-open-date"]}
                  onChange={(event) =>
                    handleInputChange(event, "spe-open-date")
                  }
                  error={error["spe-open-date"]}
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
                  <Radio.Group
                    value={paidInToSpeValue}
                    onChange={setPaidInToSpeValue}
                  >
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
                <Select
                  value={speAddressStateValue}
                  radius="xs"
                  size="md"
                  placeholder="Estado"
                  className="mb-[0.75rem]"
                  data={countryStates.map((state) => state.uf)}
                  onChange={(event) => setSpeAddressStateValue(event)}
                  error={
                    !speAddressStateValue
                      ? error["spe-address-state-input"]
                      : ""
                  }
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
              </SimpleGrid>
            </RegisterInput>
          </div>
        );
      case 2:
        return (
          <div className="mb-[45%]">
            <RegisterInput
              icon={Icons.Home}
              inputHeader={"Dados do imóvel"}
              inputDescription={"Preencha alguns dados sobre o imóvel"}
              buttonName={"Próximo"}
              backAnchorName={"Voltar"}
              prevStep={prevStep}
              isGrid
              nextStep={() => {
                verifyPropertyDataFields(
                  inputs,
                  setError,
                  propertyAddressStateValue
                ) === null
                  ? nextStep()
                  : verifyPropertyDataFields(
                      inputs,
                      setError,
                      propertyAddressStateValue
                    );
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
                  placeholder="CEP"
                  component={IMaskInput}
                  mask="00000-000"
                  className="mb-[0.75rem]"
                  value={inputs["property-address-zipcode-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "property-address-zipcode-input")
                  }
                  error={error["property-address-zipcode-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Logradouro"
                  className="mb-[0.75rem]"
                  value={inputs["property-address-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "property-address-input")
                  }
                  error={error["property-address-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Número"
                  className="mb-[0.75rem]"
                  value={inputs["property-address-number-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "property-address-number-input")
                  }
                  error={error["property-address-number-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Complemento"
                  className="mb-[0.75rem]"
                  value={inputs["property-address-complement-input"]}
                  onChange={(event) =>
                    handleInputChange(
                      event,
                      "property-address-complement-input"
                    )
                  }
                  error={error["property-address-complement-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Bairro"
                  className="mb-[0.75rem]"
                  value={inputs["property-address-district-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "property-address-district-input")
                  }
                  error={error["property-address-district-input"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Município"
                  className="mb-[0.75rem]"
                  value={inputs["property-address-city-input"]}
                  onChange={(event) =>
                    handleInputChange(event, "property-address-city-input")
                  }
                  error={error["property-address-city-input"]}
                />
                <Select
                  value={propertyAddressStateValue}
                  radius="xs"
                  size="md"
                  placeholder="Estado"
                  className="mb-[0.75rem]"
                  data={countryStates.map((state) => state.uf)}
                  onChange={(event) => setPropertyAddressStateValue(event)}
                  error={
                    !propertyAddressStateValue
                      ? error["property-address-state-input"]
                      : ""
                  }
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Matrícula do imóvel"
                  className="mb-[1.5rem]"
                  value={inputs["property-registration"]}
                  onChange={(event) =>
                    handleInputChange(event, "property-registration")
                  }
                  error={error["property-registration"]}
                />
              </SimpleGrid>
            </RegisterInput>
          </div>
        );
      case 3:
        return (
          <div className="mb-[57%]">
            <RegisterInput
              icon={Icons.Id}
              inputHeader={"Dados do imóvel: proprietário, corretor e situação"}
              inputDescription={"Preencha mais alguns dados sobre o imóvel"}
              isGrid
              buttonName={"Próximo"}
              backAnchorName={"Voltar"}
              prevStep={prevStep}
              nextStep={() => {
                verifySecondPropertyDataFields(
                  inputs,
                  setError,
                  negociationStatusValue
                ) === null
                  ? nextStep()
                  : verifySecondPropertyDataFields(
                      inputs,
                      setError,
                      negociationStatusValue
                    );
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
                  placeholder="Nome completo do proprietário"
                  className="mb-[0.75rem]"
                  value={inputs["owner-name"]}
                  onChange={(event) => handleInputChange(event, "owner-name")}
                  error={error["owner-name"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CPF do proprietário"
                  component={IMaskInput}
                  mask="000.000.000-00"
                  className="mb-[0.75rem]"
                  value={inputs["owner-cpf"]}
                  onChange={(event) => handleInputChange(event, "owner-cpf")}
                  error={error["owner-cpf"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="RG do proprietário"
                  className="mb-[0.75rem]"
                  value={inputs["owner-rg"]}
                  onChange={(event) => handleInputChange(event, "owner-rg")}
                  error={error["owner-rg"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CNPJ do proprietário"
                  component={IMaskInput}
                  mask="00.000.000/0000-00"
                  className="mb-[0.75rem]"
                  value={inputs["owner-cnpj"]}
                  onChange={(event) => handleInputChange(event, "owner-cnpj")}
                  error={error["owner-cnpj"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Endereço completo do proprietário"
                  className="mb-[0.75rem]"
                  value={inputs["owner-complete-address"]}
                  onChange={(event) =>
                    handleInputChange(event, "owner-complete-address")
                  }
                  error={error["owner-complete-address"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Nome do corretor"
                  className="mb-[0.75rem]"
                  value={inputs["broker-name"]}
                  onChange={(event) => handleInputChange(event, "broker-name")}
                  error={error["broker-name"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CPF do corretor"
                  component={IMaskInput}
                  mask="000.000.000-00"
                  className="mb-[0.75rem]"
                  value={inputs["broker-cpf"]}
                  onChange={(event) => handleInputChange(event, "broker-cpf")}
                  error={error["broker-cpf"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CRECI do corretor"
                  className="mb-[0.75rem]"
                  value={inputs["broker-creci"]}
                  onChange={(event) => handleInputChange(event, "broker-creci")}
                  error={error["broker-creci"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Nome da imobiliária"
                  className="mb-[0.75rem]"
                  value={inputs["real-estate-name"]}
                  onChange={(event) =>
                    handleInputChange(event, "real-estate-name")
                  }
                  error={error["real-estate-name"]}
                />
                <Select
                  value={negociationStatusValue}
                  size="md"
                  placeholder="Status da negociação"
                  className="mb-[0.75rem]"
                  data={[
                    "Em estudo",
                    "Em negociação",
                    "Proposta feita",
                    "Proposta aceita",
                    "Minuta em discussão",
                    "Assinado em resolutivas",
                    "Resolutivas superadas",
                    "Escriturado",
                    "Stand-by",
                    "Descartado/Arquivado",
                  ]}
                  error={
                    !negociationStatusValue ? error["negotiation-status"] : ""
                  }
                  onChange={(event) => setNegociationStatusValue(event)}
                />
              </SimpleGrid>
            </RegisterInput>
          </div>
        );

      case 4:
        return (
          <div className="mb-[45%]">
            <RegisterInput
              icon={Icons.Social}
              inputHeader={"Dados de sócios ou participantes"}
              inputDescription={
                "Preencha alguns dados de sócios ou participantes do empreendimento."
              }
              isGrid
              buttonName={"Cadastrar"}
              backAnchorName={"Voltar"}
              prevStep={prevStep}
              nextStep={() => {
                nextStep();
                setTimeout(() => {
                  router.push("/dashboard", { scroll: false });
                }, 4000);
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
                  placeholder="Nome completo do(a) sócio(a)"
                  className="mb-[0.75rem]"
                  value={inputs["partner-complete-name"]}
                  onChange={(event) =>
                    handleInputChange(event, "partner-complete-name")
                  }
                  error={error["partner-complete-name"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CPF do(a) sócio(a)"
                  component={IMaskInput}
                  mask="000.000.000-00"
                  className="mb-[0.75rem]"
                  value={inputs["partner-cpf"]}
                  onChange={(event) => handleInputChange(event, "partner-cpf")}
                  error={error["partner-cpf"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="RG do(a) sócio(a)"
                  component={IMaskInput}
                  mask="00000-000"
                  className="mb-[0.75rem]"
                  value={inputs["partner-rg"]}
                  onChange={(event) => handleInputChange(event, "partner-rg")}
                  error={error["partner-rg"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="CNPJ do(a) sócio(a)"
                  component={IMaskInput}
                  mask="00.000.000/0000-00"
                  className="mb-[0.75rem]"
                  value={inputs["partner-cnpj"]}
                  onChange={(event) => handleInputChange(event, "partner-cnpj")}
                  error={error["partner-cnpj"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Função do(a) sócio(a)"
                  className="mb-[0.75rem]"
                  value={inputs["partner-role"]}
                  onChange={(event) => handleInputChange(event, "partner-role")}
                  error={error["partner-role"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Contra partida do(a) sócio(a)"
                  className="mb-[0.75rem]"
                  value={inputs["counterpart-from-the-partner"]}
                  onChange={(event) =>
                    handleInputChange(event, "counterpart-from-the-partner")
                  }
                  error={error["counterpart-from-the-partner"]}
                />
                <InputBase
                  radius="xs"
                  size="md"
                  placeholder="Porcentagem do(a) sócio(a)"
                  className="mb-[0.75rem]"
                  value={inputs["partner-percentage"]}
                  onChange={(event) =>
                    handleInputChange(event, "partner-percentage")
                  }
                  error={error["partner-percentage"]}
                />
              </SimpleGrid>
            </RegisterInput>
          </div>
        );
      default:
        return (
          <div className="text-center text-[#0F1728] text-base font-large leading-6">
            <Text>Cadastro concluído!</Text>
            <div className="flex gap-[5px]">
              <Loader size={20} color="#56D963" />
              <Text>Aguarde enquanto redirecionamos para seu dashboard.</Text>
            </div>
          </div>
        );
    }
  };

  return <div>{renderRegisterInput()}</div>;
}
