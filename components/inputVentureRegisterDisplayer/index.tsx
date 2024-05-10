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
  TextInput,
  Button,
  Input,
  FileInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
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
import {
  propertyFormConfig,
  speFormConfig,
  ventureFormConfig,
} from "../../helpers/forms";
import { IconFileCv } from "@tabler/icons-react";

export function InputVentureRegisterDisplayer(
  step: number,
  prevStep: any,
  nextStep: any
) {
  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  const [speAddressStateValue, setSpeAddressStateValue] = useState<
    string | null
  >();
  // const [propertyAddressStateValue, setPropertyAddressStateValue] = useState<
  //   string | null
  // >();
  // const [negociationStatusValue, setNegociationStatusValue] = useState<
  //   string | null
  // >();
  const [constituedSpeValue, setConstituedSpeValue] = useState("yes");
  const [paidInToSpeValue, setPaidInToSpeValue] = useState("yes");
  const { updateUserData, userData } = useContext(SignUpContext);

  // const router = useRouter();
  const form = useForm(ventureFormConfig(constituedSpeValue));
  const speForm = useForm(speFormConfig());
  const propertyForm = useForm(propertyFormConfig());

  useEffect(() => {
    updateUserData({
      ventureName: form.getValues().ventureName,
      constitutedSpe: constituedSpeValue,
      speCnpj: form.getValues().speCnpj,
      speSocialReason: form.getValues().speSocialReason,
      speFantasyName: form.getValues().speFantasyName,
      speStatus: form.getValues().speStatus,
      speCnae: form.getValues().speCnae,
      speOpenDate: form.getValues().speOpenDate,
      paidInToSpe: paidInToSpeValue,
      speAddressType: speForm.getValues().speAddressType,
      speAddress: speForm.getValues().speAddress,
      speAddressComplement: speForm.getValues().speAddressComplement,
      speAddressDistrict: speForm.getValues().speAddressDistrict,
      speAddressCity: speForm.getValues().speAddressCity,
      speAddressState: speForm.getValues().speAddressState,
      speAddressZipcode: speForm.getValues().speAddressZipcode,
      propertyZipcode: propertyForm.getValues().propertyZipcode,
      propertyAddress: propertyForm.getValues().propertyAddress,
      propertyAddressNumber: propertyForm.getValues().propertyAddressNumber,
      propertyAddressComplement:
        propertyForm.getValues().propertyAddressComplement,
      propertyAddressDistrict: propertyForm.getValues().propertyAddressDistrict,
      propertyAddressCity: propertyForm.getValues().propertyAddressCity,
      propertyAddressState: propertyForm.getValues().propertyAddressState,
      propertyRegistration: propertyForm.getValues().propertyRegistration,
      // ownerName: inputs["owner-name"],
      // ownerCpf: inputs["owner-cpf"],
      // ownerRg: inputs["owner-rg"],
      // ownerCnpj: inputs["owner-cnpj"],
      // ownerCompleteAddress: inputs["owner-complete-address"],
      // brokerName: inputs["broker-name"],
      // brokerCpf: inputs["broker-cpf"],
      // brokerCreci: inputs["broker-creci"],
      // realEstateName: inputs["real-estate-name"],
      // negotiationStatus: negociationStatusValue || "",
      // partnerCompleteName: inputs["partner-complete-name"],
      // partnerCpf: inputs["partner-cpf"],
      // partnerRg: inputs["partner-rg"],
      // partnerCnpj: inputs["partner-cnpj"],
      // partnerRole: inputs["partner-role"],
      // counterpartFromThePartner: inputs["counterpart-from-the-partner"],
      // partnerPercentage: inputs["partner-percentage"],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const renderRegisterInput = () => {
    switch (step) {
      case 0:
        return (
          <form
            onSubmit={form.onSubmit(() => {
              if (constituedSpeValue === "no") {
                nextStep();
                nextStep();
              } else {
                nextStep();
              }
            })}
          >
            <RegisterInput
              icon={Icons.FileIcon}
              inputHeader={"Dados do empreendimento"}
              inputDescription={
                "Digite as principais informações do empreendimento"
              }
              buttonName={"Próximo"}
              isGrid
            >
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 2 }}
                spacing={{ base: 15, sm: "xs" }}
                verticalSpacing={{ base: "xs", sm: "xs" }}
              >
                <TextInput
                  withAsterisk
                  label="Nome do empreendimento"
                  placeholder="empreendimento"
                  key={form.key("ventureName")}
                  {...form.getInputProps("ventureName")}
                  size="md"
                />
                <Group
                  className={`flex items-center justify-center gap-[5px] ${
                    constituedSpeValue === "no" && "mb-[2.35rem]"
                  }`}
                >
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
                {constituedSpeValue === "yes" && (
                  <>
                    <Group>
                      <Text className="text-lg font-bold">Dados da SPE</Text>
                      <InputBase
                        withAsterisk
                        label="CNPJ"
                        placeholder="CNPJ"
                        key={form.key("speCnpj")}
                        component={IMaskInput}
                        mask="00.000.000/0000-00"
                        {...form.getInputProps("speCnpj")}
                        className="w-[100%]"
                        size="md"
                      />
                    </Group>
                    <InputBase
                      withAsterisk
                      label="Razão social"
                      placeholder="razão social"
                      key={form.key("speSocialReason")}
                      {...form.getInputProps("speSocialReason")}
                      className="w-[100%] flex flex-col justify-end"
                      size="md"
                    />
                    <InputBase
                      label="Nome fantasia"
                      placeholder="nome fantasia"
                      key={form.key("speFantasyName")}
                      {...form.getInputProps("speFantasyName")}
                      className="w-[100%]"
                      size="md"
                    />
                    <InputBase
                      withAsterisk
                      label="Status"
                      placeholder="Status"
                      key={form.key("speStatus")}
                      {...form.getInputProps("speStatus")}
                      className="w-[100%]"
                      size="md"
                    />
                    <InputBase
                      label="CNAE principal"
                      placeholder="CNAE"
                      key={form.key("speCnae")}
                      {...form.getInputProps("speCnae")}
                      className="w-[100%] mb-[0.75rem]"
                      size="md"
                    />
                    <InputBase
                      label="Data de abertura"
                      placeholder="00/00/0000"
                      key={form.key("speOpenDate")}
                      {...form.getInputProps("speOpenDate")}
                      className="w-[100%] mb-[0.75rem]"
                      size="md"
                      component={IMaskInput}
                      mask="00/00/0000"
                    />
                  </>
                )}
              </SimpleGrid>
            </RegisterInput>

            <div
              className={`flex gap-[0.25rem] justify-center items-center ${
                constituedSpeValue === "no" ? "mt-[1rem]" : "mt-[20rem]"
              }`}
            >
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
          </form>
        );

      case 1:
        return (
          <div className="mb-[45%]">
            <form
              onSubmit={speForm.onSubmit(() => {
                nextStep();
              })}
            >
              <RegisterInput
                icon={Icons.FileIcon}
                inputHeader={"Dados da SPE"}
                inputDescription={"Preencha os dados da SPE"}
                buttonName={"Próximo"}
                isGrid
                prevStep={prevStep}
                backAnchorName={"Voltar"}
              >
                <SimpleGrid
                  cols={{ base: 1, sm: 2, lg: 2 }}
                  spacing={{ base: 15, sm: "xs" }}
                  verticalSpacing={{ base: "xs", sm: "xs" }}
                >
                  <InputBase
                    withAsterisk
                    label="Tipo de logradouro"
                    key={speForm.key("speAddressType")}
                    {...speForm.getInputProps("speAddressType")}
                    size="md"
                    radius="xs"
                    placeholder="Tipo de logradouro"
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
                    withAsterisk
                    label="Logradouro"
                    radius="xs"
                    size="md"
                    placeholder="Logradouro"
                    key={speForm.key("speAddress")}
                    {...speForm.getInputProps("speAddress")}
                  />
                  <InputBase
                    withAsterisk
                    label="Número"
                    radius="xs"
                    size="md"
                    placeholder="Número"
                    key={speForm.key("speAddressNumber")}
                    {...speForm.getInputProps("speAddressNumber")}
                  />
                  <InputBase
                    label="Complemento"
                    radius="xs"
                    size="md"
                    placeholder="Complemento"
                    key={speForm.key("speAddressComplement")}
                    {...speForm.getInputProps("speAddressComplement")}
                  />
                  <InputBase
                    withAsterisk
                    label="Bairro"
                    radius="xs"
                    size="md"
                    placeholder="Bairro"
                    key={speForm.key("speAddressDistrict")}
                    {...speForm.getInputProps("speAddressDistrict")}
                  />
                  <InputBase
                    withAsterisk
                    label="Município"
                    radius="xs"
                    size="md"
                    placeholder="Município"
                    key={speForm.key("speAddressCity")}
                    {...speForm.getInputProps("speAddressCity")}
                  />
                  <Select
                    withAsterisk
                    label="Estado"
                    // value={speAddressStateValue}
                    radius="xs"
                    size="md"
                    placeholder="Estado"
                    key={speForm.key("speAddressState")}
                    {...speForm.getInputProps("speAddressState")}
                    data={countryStates.map((state) => state.uf)}
                  />
                  <InputBase
                    withAsterisk
                    label="CEP"
                    radius="xs"
                    size="md"
                    placeholder="00000-000"
                    component={IMaskInput}
                    mask="00000-000"
                    className="mb-[0.75rem]"
                    key={speForm.key("speAddressZipcode")}
                    {...speForm.getInputProps("speAddressZipcode")}
                  />
                  <FileInput
                    withAsterisk
                    size="md"
                    leftSection={icon}
                    label="Adicione seu contrato social"
                    placeholder="contrato social da SPE"
                    leftSectionPointerEvents="none"
                  />
                </SimpleGrid>
              </RegisterInput>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="mb-[45%]">
            <form
              onSubmit={propertyForm.onSubmit(() => {
                nextStep();
              })}
            >
              <RegisterInput
                icon={Icons.Home}
                inputHeader={"Dados do imóvel"}
                inputDescription={"Preencha alguns dados sobre o imóvel"}
                buttonName={"Próximo"}
                backAnchorName={"Voltar"}
                prevStep={prevStep}
                isGrid
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
                    key={propertyForm.key("propertyZipcode")}
                    {...propertyForm.getInputProps("propertyZipcode")}
                  />
                  <InputBase
                    radius="xs"
                    size="md"
                    placeholder="Logradouro"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddress")}
                    {...propertyForm.getInputProps("propertyAddress")}
                  />
                  <InputBase
                    radius="xs"
                    size="md"
                    placeholder="Número"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddressNumber")}
                    {...propertyForm.getInputProps("propertyAddressNumber")}
                  />
                  <InputBase
                    radius="xs"
                    size="md"
                    placeholder="Complemento"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddressComplement")}
                    {...propertyForm.getInputProps("propertyAddressComplement")}
                  />
                  <InputBase
                    radius="xs"
                    size="md"
                    placeholder="Bairro"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddressDistrict")}
                    {...propertyForm.getInputProps("propertyAddressDistrict")}
                  />
                  <InputBase
                    radius="xs"
                    size="md"
                    placeholder="Município"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddressCity")}
                    {...propertyForm.getInputProps("propertyAddressCity")}
                  />
                  <Select
                    // value={propertyAddressStateValue}
                    radius="xs"
                    size="md"
                    placeholder="Estado"
                    className="mb-[0.75rem]"
                    data={countryStates.map((state) => state.uf)}
                    key={propertyForm.key("propertyAddressState")}
                    {...propertyForm.getInputProps("propertyAddressState")}
                  />
                  <InputBase
                    radius="xs"
                    size="md"
                    placeholder="Matrícula do imóvel"
                    className="mb-[1.5rem]"
                    key={propertyForm.key("propertyRegistration")}
                    {...propertyForm.getInputProps("propertyRegistration")}
                  />
                </SimpleGrid>
              </RegisterInput>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="mb-[57%]">
            {/* <RegisterInput
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
            </RegisterInput> */}
          </div>
        );

      case 4:
        return (
          <div className="mb-[45%]">
            {/* <RegisterInput
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
            </RegisterInput> */}
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
