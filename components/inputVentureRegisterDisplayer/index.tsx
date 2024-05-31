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
import { countryStates } from "../../helpers/states";
import { useRouter } from "next/navigation";
import {
  documentaryDiligenceFormConfi,
  mediatorFormConfig,
  ownerFormConfig,
  partnerFormConfig,
  propertyFormConfig,
  speFormConfig,
  ventureFormConfig,
} from "../../helpers/forms";
import { IconFileCv } from "@tabler/icons-react";
import { NestedArray } from "./NestedArray";
import { Enterprise } from "../../services/addEnterprise/indext";
import { User } from "../../services/user";
import { Regex } from "../../helpers/regex";
import { CreateEnterpriseDto } from "../../services/addEnterprise/interface";

export function InputVentureRegisterDisplayer(
  step: number,
  prevStep: any,
  nextStep: any
) {
  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const [constituedSpeValue, setConstituedSpeValue] = useState("yes");
  const [intermediaryValue, setIntermediaryValue] = useState("broker");
  const [paidInToSpeValue, setPaidInToSpeValue] = useState("no");
  const [partnerType, setPartnerType] = useState("pjPartner");
  const [ownerType, setOwnerType] = useState("fisicalPerson");
  const { updateUserData, userData } = useContext(SignUpContext);

  const router = useRouter();
  const form = useForm(ventureFormConfig(constituedSpeValue));
  const speForm = useForm(speFormConfig());
  const propertyForm = useForm(propertyFormConfig());
  const ownerForm = useForm(ownerFormConfig(ownerType));
  const mediatorForm = useForm(mediatorFormConfig(intermediaryValue));
  const documentaryDiligenceForm = useForm(documentaryDiligenceFormConfi());
  const partnerForm = useForm(partnerFormConfig(partnerType));

  useEffect(() => {
    updateUserData({
      ventureName: form.getValues().ventureName,
      constitutedSpe: constituedSpeValue,
      speCnpj: Regex.cleanCNPJ(form.getValues().speCnpj),
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
      ownerType: ownerType,
      ownerName: ownerForm.getValues().ownerName,
      ownerCpf: Regex.cleanCPF(ownerForm.getValues().ownerCpf),
      ownerRg: ownerForm.getValues().ownerRg,
      ownerCnpj: Regex.cleanCNPJ(ownerForm.getValues().ownerCnpj),
      ownerSocialReason: ownerForm.getValues().ownerSocialReason,
      ownerPjCreatedAt: ownerForm.getValues().ownerPjCreatedAt,
      ownerCnae: ownerForm.getValues().ownerCnae,
      intermediary: intermediaryValue,
      brokerName: mediatorForm.getValues().brokerName,
      brokerCpf: Regex.cleanCPF(mediatorForm.getValues().brokerCpf),
      brokerRg: mediatorForm.getValues().brokerRg,
      brokerCreci: mediatorForm.getValues().brokerCreci,
      realEstateCnpj: Regex.cleanCNPJ(mediatorForm.getValues().realEstateCnpj),
      realEstateSocialReason: mediatorForm.getValues().realEstateSocialReason,
      realEstateCnae: mediatorForm.getValues().realEstateCnae,
      realEstateName: mediatorForm.getValues().realEstateName,
      realEstateCreatedAt: mediatorForm.getValues().realEstateCreatedAt,
      negotiationStatus: mediatorForm.getValues().negotiationStatus,
      pjPartner: partnerForm.getValues().pjPartner,
      pfPartner: partnerForm.getValues().pfPartner,
      ventureStatus: documentaryDiligenceForm.getValues().ventureStatus,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleSubmit = async () => {
    const createEnterpriseDto: CreateEnterpriseDto = {
      constitutedSpe: userData.constitutedSpe === "yes" ? true : false,
      ownerType: userData.ownerType?.toString() || "",
      ventureName: userData.ventureName?.toString() || "",
      vgv: userData.vgv?.toString() || "",
      paidInToSpe: userData.paidInToSpe === "yes",
      negotiationStatus: userData.negotiationStatus?.toString() || "",
      propertyRegistration: userData.propertyRegistration?.toString() || "",
      propertyAddress: userData.propertyAddress?.toString() || "",
      propertyAddressNumber: userData.propertyAddressNumber?.toString() || "",
      propertyAddressDistrict:
        userData.propertyAddressDistrict?.toString() || "",
      propertyAddressCity: userData.propertyAddressCity?.toString() || "",
      propertyAddressState: userData.propertyAddressState?.toString() || "",
      speCnpj: userData.speCnpj?.toString() || "",
      speSocialReason: userData.speSocialReason?.toString() || "",
      speCnae: userData.speCnae?.toString() || "",
      speFantasyName: userData.speFantasyName?.toString() || "",
      speOpenDate: Regex.formatDate(userData.speOpenDate?.toString()) || "",
      speAddress: userData.speAddress?.toString() || "",
      speAddressNumber: userData.speAddressNumber?.toString() || "",
      speAddressDistrict: userData.speAddressDistrict?.toString() || "",
      speAddressComplement: userData.speAddressComplement?.toString() || "",
      speAddressCity: userData.speAddressCity?.toString() || "",
      speAddressState: userData.speAddressState?.toString() || "",
      ownerCnpj: userData.ownerCnpj?.toString() || "",
      ownerSocialReason: userData.ownerSocialReason?.toString() || "",
      ownerCnae: userData.ownerCnae?.toString() || "",
      ownerPjCreatedAt:
        Regex.formatDate(userData.ownerPjCreatedAt?.toString()) || "",
      ownerCpf: userData.ownerCpf?.toString() || "",
      ownerRg: userData.ownerRg?.toString() || "",
      intermediary: userData.intermediary?.toString() || "",
      brokerName: userData.brokerName?.toString() || "",
      brokerCpf: userData.brokerCpf?.toString() || "",
      brokerRg: userData.brokerRg?.toString() || "",
      brokerCreci: userData.brokerCreci?.toString() || "",
      realEstateCnpj: userData.realEstateCnpj?.toString() || "",
      realEstateSocialReason: userData.realEstateSocialReason?.toString() || "",
      realEstateCnae: userData.realEstateCnae?.toString() || "",
      realEstateName: userData.realEstateName?.toString() || "",
      realEstateCreatedAt:
        Regex.formatDate(userData.realEstateCreatedAt?.toString()) || "",
      ventureStatus: userData.ventureStatus?.toString() || "",
      userId: userData.userId?.toString() || "",
      pjPartner: userData.pjPartner as any[],
      pfPartner: userData.pfPartner as any[],
    };
    try {
      await Enterprise.createEnterprise(createEnterpriseDto);

      router.push("/dashboard", { scroll: false });
    } catch (error) {
      console.error("Erro ao criar o empreendimento:", error);
    }
  };

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
                href={"/dashboard"}
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
                prevStep={() => {
                  if (constituedSpeValue === "no") {
                    prevStep();
                    prevStep();
                  } else {
                    prevStep();
                  }
                }}
                isGrid
              >
                <SimpleGrid
                  cols={{ base: 1, sm: 2, lg: 2 }}
                  spacing={{ base: 15, sm: "xs" }}
                  verticalSpacing={{ base: "xs", sm: "xs" }}
                >
                  <InputBase
                    label="CEP"
                    radius="xs"
                    size="md"
                    placeholder="00000-000"
                    component={IMaskInput}
                    mask="00000-000"
                    key={propertyForm.key("propertyZipcode")}
                    {...propertyForm.getInputProps("propertyZipcode")}
                  />
                  <InputBase
                    label="Logradouro"
                    radius="xs"
                    size="md"
                    placeholder="Logradouro"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddress")}
                    {...propertyForm.getInputProps("propertyAddress")}
                  />
                  <InputBase
                    label="Número"
                    radius="xs"
                    size="md"
                    placeholder="Número"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddressNumber")}
                    {...propertyForm.getInputProps("propertyAddressNumber")}
                  />
                  <InputBase
                    label="Complemento"
                    radius="xs"
                    size="md"
                    placeholder="Complemento"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddressComplement")}
                    {...propertyForm.getInputProps("propertyAddressComplement")}
                  />
                  <InputBase
                    label="Bairro"
                    radius="xs"
                    size="md"
                    placeholder="Bairro"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddressDistrict")}
                    {...propertyForm.getInputProps("propertyAddressDistrict")}
                  />
                  <InputBase
                    label="Município"
                    radius="xs"
                    size="md"
                    placeholder="Município"
                    className="mb-[0.75rem]"
                    key={propertyForm.key("propertyAddressCity")}
                    {...propertyForm.getInputProps("propertyAddressCity")}
                  />
                  <Select
                    label="Estado"
                    radius="xs"
                    size="md"
                    placeholder="Estado"
                    className="mb-[0.75rem]"
                    data={countryStates.map((state) => state.uf)}
                    key={propertyForm.key("propertyAddressState")}
                    {...propertyForm.getInputProps("propertyAddressState")}
                  />
                  <InputBase
                    label="Matrícula do imóvel"
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
            <form
              onSubmit={ownerForm.onSubmit(() => {
                nextStep();
              })}
            >
              <RegisterInput
                icon={Icons.Id}
                inputHeader={"Dados do proprietário do imóvel"}
                inputDescription={
                  "Preencha alguns dados do proprietário do imóvel"
                }
                isGrid
                buttonName={"Próximo"}
                backAnchorName={"Voltar"}
                prevStep={prevStep}
              >
                <Group className={"flex items-center justify-center gap-[5px]"}>
                  <Text className="text-[#101828] text-base font-medium leading-6">
                    Tipo de proprietário
                  </Text>
                  <Radio.Group value={ownerType} onChange={setOwnerType}>
                    <Group mt="xs" style={{ marginBottom: "10px" }}>
                      <Radio
                        color="#56D963"
                        value="fisicalPerson"
                        label="Pessoa física"
                      />
                      <Radio
                        color="#56D963"
                        value="legalPerson"
                        label="Pessoa jurídica"
                      />
                    </Group>
                  </Radio.Group>
                </Group>
                <SimpleGrid
                  cols={{ base: 1, sm: 2, lg: 2 }}
                  spacing={{ base: 15, sm: "xs" }}
                  verticalSpacing={{ base: "xs", sm: "xs" }}
                >
                  {ownerType === "fisicalPerson" ? (
                    <>
                      <InputBase
                        label="Nome completo do proprietário"
                        radius="xs"
                        size="md"
                        placeholder="Nome completo do proprietário"
                        key={ownerForm.key("ownerName")}
                        {...ownerForm.getInputProps("ownerName")}
                      />
                      <InputBase
                        label="CPF do proprietário"
                        radius="xs"
                        size="md"
                        placeholder="000.000.000-00"
                        component={IMaskInput}
                        mask="000.000.000-00"
                        key={ownerForm.key("ownerCpf")}
                        {...ownerForm.getInputProps("ownerCpf")}
                      />
                      <InputBase
                        label="RG do proprietário"
                        radius="xs"
                        size="md"
                        placeholder="RG do proprietário"
                        key={ownerForm.key("ownerRg")}
                        {...ownerForm.getInputProps("ownerRg")}
                      />
                    </>
                  ) : (
                    <>
                      <InputBase
                        label="CNPJ do proprietário"
                        radius="xs"
                        size="md"
                        placeholder="00.000.000/0000-00"
                        component={IMaskInput}
                        mask="00.000.000/0000-00"
                        key={ownerForm.key("ownerCnpj")}
                        {...ownerForm.getInputProps("ownerCnpj")}
                      />
                      <InputBase
                        label="Razão social do proprietário"
                        placeholder="razão social"
                        key={ownerForm.key("ownerSocialReason")}
                        {...ownerForm.getInputProps("ownerSocialReason")}
                        size="md"
                      />
                      <InputBase
                        label="CNAE principal"
                        placeholder="CNAE"
                        key={ownerForm.key("ownerCnae")}
                        {...ownerForm.getInputProps("ownerCnae")}
                        size="md"
                      />
                      <InputBase
                        label="Data de abertura"
                        placeholder="00/00/0000"
                        key={ownerForm.key("ownerPjCreatedAt")}
                        {...ownerForm.getInputProps("ownerPjCreatedAt")}
                        size="md"
                        component={IMaskInput}
                        mask="00/00/0000"
                      />
                    </>
                  )}
                  <InputBase
                    label="CEP"
                    radius="xs"
                    size="md"
                    placeholder="00000-000"
                    component={IMaskInput}
                    mask="00000-000"
                    key={ownerForm.key("ownerZipcode")}
                    {...ownerForm.getInputProps("ownerZipcode")}
                  />
                  <InputBase
                    label="Logradouro"
                    radius="xs"
                    size="md"
                    placeholder="Logradouro"
                    className="mb-[0.75rem]"
                    key={ownerForm.key("ownerAddress")}
                    {...ownerForm.getInputProps("ownerAddress")}
                  />
                  <InputBase
                    label="Número"
                    radius="xs"
                    size="md"
                    placeholder="Número"
                    className="mb-[0.75rem]"
                    key={ownerForm.key("ownerAddressNumber")}
                    {...ownerForm.getInputProps("ownerAddressNumber")}
                  />
                  <InputBase
                    label="Complemento"
                    radius="xs"
                    size="md"
                    placeholder="Complemento"
                    className="mb-[0.75rem]"
                    key={ownerForm.key("ownerAddressComplement")}
                    {...ownerForm.getInputProps("ownerAddressComplement")}
                  />
                  <InputBase
                    label="Bairro"
                    radius="xs"
                    size="md"
                    placeholder="Bairro"
                    className="mb-[0.75rem]"
                    key={ownerForm.key("ownerAddressDistrict")}
                    {...ownerForm.getInputProps("ownerAddressDistrict")}
                  />
                  <InputBase
                    label="Município"
                    radius="xs"
                    size="md"
                    placeholder="Município"
                    className="mb-[0.75rem]"
                    key={ownerForm.key("ownerAddressCity")}
                    {...ownerForm.getInputProps("ownerAddressCity")}
                  />
                  <Select
                    label="Estado"
                    radius="xs"
                    size="md"
                    placeholder="Estado"
                    className="mb-[0.75rem]"
                    data={countryStates.map((state) => state.uf)}
                    key={ownerForm.key("ownerAddressState")}
                    {...ownerForm.getInputProps("ownerAddressState")}
                  />
                </SimpleGrid>
              </RegisterInput>
            </form>
          </div>
        );

      case 4:
        return (
          <div className="mb-[57%]">
            <form
              onSubmit={mediatorForm.onSubmit(() => {
                nextStep();
              })}
            >
              <RegisterInput
                icon={Icons.Id}
                inputHeader={"Dados do imóvel: corretor e situação"}
                inputDescription={
                  "Preencha mais alguns dados do imóvel de cadastro"
                }
                isGrid
                buttonName={"Próximo"}
                backAnchorName={"Voltar"}
                prevStep={prevStep}
              >
                <SimpleGrid
                  cols={{ base: 1, sm: 2, lg: 2 }}
                  spacing={{ base: 15, sm: "xs" }}
                  verticalSpacing={{ base: "xs", sm: "xs" }}
                >
                  <Select
                    label="Status da negociação"
                    size="md"
                    placeholder="Status da negociação"
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
                    key={mediatorForm.key("negotiationStatus")}
                    {...mediatorForm.getInputProps("negotiationStatus")}
                  />

                  <Group
                    className={"flex items-center justify-center gap-[5px]"}
                  >
                    <Text className="text-[#101828] text-base font-medium leading-6">
                      Corretor ou imobiliária?
                    </Text>
                    <Radio.Group
                      value={intermediaryValue}
                      onChange={setIntermediaryValue}
                    >
                      <Group mt="xs" style={{ marginBottom: "10px" }}>
                        <Radio
                          color="#56D963"
                          value="broker"
                          label="Corretor"
                        />
                        <Radio
                          color="#56D963"
                          value="realEstate"
                          label="Imobiliária"
                        />
                      </Group>
                    </Radio.Group>
                  </Group>
                  {intermediaryValue === "broker" ? (
                    <>
                      <InputBase
                        label="Nome do corretor"
                        radius="xs"
                        size="md"
                        placeholder="Nome do corretor"
                        key={mediatorForm.key("brokerName")}
                        {...mediatorForm.getInputProps("brokerName")}
                      />
                      <InputBase
                        radius="xs"
                        size="md"
                        label="CPF do corretor"
                        placeholder="000.000.000-00"
                        component={IMaskInput}
                        mask="000.000.000-00"
                        key={mediatorForm.key("brokerCpf")}
                        {...mediatorForm.getInputProps("brokerCpf")}
                      />
                      <InputBase
                        label="RG do corretor"
                        radius="xs"
                        size="md"
                        placeholder="RG do corretor"
                        key={mediatorForm.key("brokerRg")}
                        {...mediatorForm.getInputProps("brokerRg")}
                      />
                      <InputBase
                        className="mb-[0.75rem]"
                        radius="xs"
                        size="md"
                        label="CRECI do corretor"
                        placeholder="CRECI do corretor"
                        key={mediatorForm.key("brokerCreci")}
                        {...mediatorForm.getInputProps("brokerCreci")}
                      />
                    </>
                  ) : (
                    <>
                      <InputBase
                        className="mb-[0.75rem]"
                        label="Nome da imobiliária"
                        radius="xs"
                        size="md"
                        placeholder="Nome da imobiliária"
                        key={mediatorForm.key("realEstateName")}
                        {...mediatorForm.getInputProps("realEstateName")}
                      />
                      <InputBase
                        label="CNPJ da imobiliária"
                        radius="xs"
                        size="md"
                        placeholder="00.000.000/0000-00"
                        component={IMaskInput}
                        mask="00.000.000/0000-00"
                        key={mediatorForm.key("realEstateCnpj")}
                        {...mediatorForm.getInputProps("realEstateCnpj")}
                      />
                      <InputBase
                        label="Razão social da imobiliária"
                        placeholder="razão social"
                        key={mediatorForm.key("realEstateSocialReason")}
                        {...mediatorForm.getInputProps(
                          "realEstateSocialReason"
                        )}
                        size="md"
                      />
                      <InputBase
                        label="CNAE principal"
                        placeholder="CNAE"
                        key={mediatorForm.key("realEstateCnae")}
                        {...mediatorForm.getInputProps("realEstateCnae")}
                        size="md"
                      />
                      <InputBase
                        label="Data de abertura"
                        className="mb-[0.75rem]"
                        placeholder="00/00/0000"
                        key={mediatorForm.key("realEstateCreatedAt")}
                        {...mediatorForm.getInputProps("realEstateCreatedAt")}
                        size="md"
                        component={IMaskInput}
                        mask="00/00/0000"
                      />
                    </>
                  )}
                </SimpleGrid>
              </RegisterInput>
            </form>
          </div>
        );

      case 5:
        return (
          <div className="mb-[45%]">
            <form
              onSubmit={partnerForm.onSubmit(() => {
                nextStep();
              })}
            >
              <RegisterInput
                icon={Icons.Social}
                inputHeader={"Dados de sócios"}
                inputDescription={
                  "Preencha alguns dados de sócios do empreendimento."
                }
                isGrid
                buttonName={"Próximo"}
                backAnchorName={"Voltar"}
                prevStep={prevStep}
              >
                <Group mt="xs" style={{ marginBottom: "10px" }}>
                  <Text size="md" fw={700}>
                    Escolha o tipo de sócio:
                  </Text>
                  <Radio.Group value={partnerType} onChange={setPartnerType}>
                    <Group>
                      <Radio
                        color="#56D963"
                        value="pjPartner"
                        label="Pessoa jurídica"
                      />
                      <Radio
                        color="#56D963"
                        value="pfPartner"
                        label="Pessoa física"
                      />
                    </Group>
                  </Radio.Group>
                </Group>

                <NestedArray
                  partnerType={partnerType}
                  partnerForm={partnerForm}
                />
              </RegisterInput>
            </form>
          </div>
        );
      case 6:
        return (
          <div className="mb-[45%]">
            <form
              onSubmit={documentaryDiligenceForm.onSubmit(() => {
                nextStep();
                handleSubmit();
              })}
            >
              <RegisterInput
                icon={Icons.FileIcon}
                inputHeader={"Diligência documental e viabilidade do projeto"}
                inputDescription={
                  "Precisamos que envie alguns documentos do empreendimento para a viabilidade do projeto"
                }
                buttonName={"Cadastrar"}
                isGrid
                prevStep={prevStep}
                backAnchorName={"Voltar"}
              >
                <SimpleGrid
                  cols={{ base: 1, sm: 2, lg: 2 }}
                  spacing={{ base: 15, sm: "xs" }}
                  verticalSpacing={{ base: "xs", sm: "xs" }}
                >
                  <Select
                    label="Status do empreendimento"
                    size="md"
                    className="mb-[0.75rem]"
                    placeholder="Status do empreendimento"
                    data={[
                      "Prospecção (terreno não comprado)",
                      "Terreno comprado",
                      "Protocolado na prefeitura",
                      "Projeto aprovado",
                      "Registro de incorporação",
                      "Lançado",
                      "Obra em andamento",
                      "Obra concluída",
                      "Habita-se",
                      "Repase concluído",
                      "SPE encerrada",
                    ]}
                    key={documentaryDiligenceForm.key("ventureStatus")}
                    {...documentaryDiligenceForm.getInputProps("ventureStatus")}
                  />
                  <FileInput
                    className="mb-[0.75rem]"
                    withAsterisk
                    size="md"
                    leftSection={icon}
                    label="Adicione um documento"
                    placeholder="Documento"
                    leftSectionPointerEvents="none"
                  />
                </SimpleGrid>
              </RegisterInput>
            </form>
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
