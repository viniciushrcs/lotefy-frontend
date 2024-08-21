import { Loader, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SignUpContext } from "../../context/SignUpContext";
import {
  documentaryDiligenceFormConfig,
  mediatorFormConfig,
  ownerFormConfig,
  partnerFormConfig,
  propertyFormConfig,
  speFormConfig,
  ventureFormConfig,
} from "../../helpers/forms";
import { Regex } from "../../helpers/regex";
import { Enterprise } from "../../services/enterprise";
import { CreateEnterpriseDto } from "../../services/enterprise/interface";
import { Files } from "../../services/file/file";
import { User } from "../../services/user";
import {
  EnterpriseData,
  SpeData,
  PropertyData,
  OwnerData,
  BrokerData,
  PartnerData,
  DiligenceData,
} from "./Steps/index";

export function InputVentureRegisterDisplayer(
  step: number,
  prevStep: () => void,
  nextStep: () => void
) {
  const [constituedSpeValue, setConstituedSpeValue] = useState("yes");
  const [intermediaryValue, setIntermediaryValue] = useState("broker");
  const [paidInToSpeValue, setPaidInToSpeValue] = useState("no");
  const [partnerType, setPartnerType] = useState("pjPartner");
  const [ownerType, setOwnerType] = useState("fisicalPerson");
  const { updateUserData, userData } = useContext(SignUpContext);
  const [focused, setFocused] = useState<boolean>();
  const [propertyRegistrationValue, setPropertyRegistrationValue] =
    useState<string>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm(ventureFormConfig(constituedSpeValue));
  const speForm = useForm(speFormConfig());
  const propertyForm = useForm(propertyFormConfig());
  const ownerForm = useForm(ownerFormConfig(ownerType));
  const mediatorForm = useForm(mediatorFormConfig(intermediaryValue));
  const documentaryDiligenceForm = useForm(documentaryDiligenceFormConfig());
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
      speAddressNumber: speForm.getValues().speAddressNumber,
      speAddressState: speForm.getValues().speAddressState,
      speAddressZipcode: speForm.getValues().speAddressZipcode,
      speUploadFile: speForm.getValues().speUploadFile,
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
      ownerCpf: Regex.cleanCPF(ownerForm.getValues().ownerCpf),
      ownerRg: ownerForm.getValues().ownerRg,
      ownerCnpj: Regex.cleanCNPJ(ownerForm.getValues().ownerCnpj),
      ownerSocialReason: ownerForm.getValues().ownerSocialReason,
      ownerPjCreatedAt: ownerForm.getValues().ownerPjCreatedAt,
      ownerCnae: ownerForm.getValues().ownerCnae,
      intermediary: intermediaryValue,
      brokerCpf: Regex.cleanCPF(mediatorForm.getValues().brokerCpf),
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
      diligenceDocument: documentaryDiligenceForm.getValues().diligenceDocument,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  form.watch("speCnpj", async ({ value }) => {
    if (value.length === 18) {
      const speData = await User.getPjDataByCnpj(Regex.cleanCNPJ(value));
      if (speData.error) return;

      const { cnae, razao_social, nome_fantasia, data_de_abertura, pj_id } =
        speData.data;
      if (speData.data) {
        const speAddress = await Enterprise.getSpePjAddressByPjId(
          speData.data.pj_id
        );

        if (speAddress.error) return;

        form.setValues({
          speCnae: cnae,
          speSocialReason: razao_social,
          speFantasyName: nome_fantasia,
          speOpenDate: Regex.dateTransform(data_de_abertura),
        });
        if (speAddress) {
          const { rua, bairro, numero, complemento, cidade, uf } =
            speAddress.data;
          speForm.setValues({
            speAddress: rua,
            speAddressCity: cidade,
            speAddressComplement: complemento,
            speAddressDistrict: bairro,
            speAddressNumber: numero,
            speAddressState: uf,
          });
        }
      }
    }
  });

  propertyForm.watch("propertyRegistration", ({ value }) => {
    setPropertyRegistrationValue(value);
  });

  useEffect(() => {
    const searchProperty = async () => {
      if (propertyRegistrationValue && !focused) {
        const property = await Enterprise.getPropertyByRegistration(
          propertyRegistrationValue
        );
        if (property.error) return;
        if (!property.error) {
          const { rua, bairro, numero, complemento, cidade, uf } =
            property.data.endereco;

          propertyForm.setValues({
            propertyAddress: rua,
            propertyAddressCity: cidade,
            propertyAddressComplement: complemento,
            propertyAddressDistrict: bairro,
            propertyAddressNumber: numero,
            propertyAddressState: uf,
          });
        }
      }
    };

    searchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

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
      propertyAddressComplement:
        userData.propertyAddressComplement?.toString() || "",
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
      brokerCpf: userData.brokerCpf?.toString() || "",
      brokerCreci: userData.brokerCreci?.toString() || "",
      realEstateCnpj: userData.realEstateCnpj?.toString() || "",
      realEstateSocialReason: userData.realEstateSocialReason?.toString() || "",
      realEstateCnae: userData.realEstateCnae?.toString() || "",
      realEstateName: userData.realEstateName?.toString() || "",
      realEstateCreatedAt:
        Regex.formatDate(userData.realEstateCreatedAt?.toString()) || "",
      ventureStatus: documentaryDiligenceForm.getValues().ventureStatus || "",
      userId: userData.userId?.toString() || "",
      pjPartner: userData.pjPartner as any[],
      pfPartner: userData.pfPartner as any[],
      speUploadFile: userData.speUploadFile as File,
      diligenceDocument:
        documentaryDiligenceForm.getValues().diligenceDocument || undefined,
    };

    try {
      setLoading(true);

      const enterpriseData = await Enterprise.createEnterprise(
        createEnterpriseDto
      );

      const speId =
        enterpriseData?.responseObject?.speResponse?.createSpePjData?.data
          ?.pj_id;
      const ventureId =
        enterpriseData?.responseObject?.enterpriseResponse?.enterprise?.data
          ?.empreendimento_id;

      const fileProperties: (keyof CreateEnterpriseDto)[] = [
        "speUploadFile",
        "diligenceDocument",
      ];

      const bucketMapping: Partial<Record<keyof CreateEnterpriseDto, string>> =
        {
          speUploadFile: "PJ",
          diligenceDocument: "Empreendimentos",
        };

      const filesArray: { file: File; bucket: string }[] = [];

      fileProperties.forEach((property) => {
        const fileOrFiles = createEnterpriseDto[property];

        if (Array.isArray(fileOrFiles)) {
          fileOrFiles.forEach((file) => {
            if (file instanceof File) {
              filesArray.push({
                file,
                bucket: bucketMapping[property] as string,
              });
            }
          });
        } else if (fileOrFiles instanceof File) {
          filesArray.push({
            file: fileOrFiles,
            bucket: bucketMapping[property] as string,
          });
        }
      });

      await Promise.all(
        filesArray.map(async ({ file, bucket }) => {
          if (bucket === "PJ") {
            await Files.uploadFile(speId, file, bucket);
          } else if (bucket === "Empreendimentos") {
            await Files.uploadFile(ventureId, file, bucket);
          }
        })
      );

      router.push("/dashboard", { scroll: false });
    } catch (error) {
      console.error("Erro ao criar o empreendimento:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRegisterInput = () => {
    switch (step) {
      case 0:
        return (
          <EnterpriseData
            form={form}
            constituedSpeValue={constituedSpeValue}
            nextStep={nextStep}
            setConstituedSpeValue={setConstituedSpeValue}
          />
        );

      case 1:
        return (
          <SpeData
            speForm={speForm}
            nextStep={nextStep}
            prevStep={prevStep}
            paidInToSpeValue={paidInToSpeValue}
            setPaidInToSpeValue={setPaidInToSpeValue}
          />
        );
      case 2:
        return (
          <PropertyData
            propertyForm={propertyForm}
            nextStep={nextStep}
            prevStep={prevStep}
            constituedSpeValue={constituedSpeValue}
            setFocused={setFocused}
          />
        );
      case 3:
        return (
          <OwnerData
            ownerForm={ownerForm}
            nextStep={nextStep}
            prevStep={prevStep}
            ownerType={ownerType}
            setOwnerType={setOwnerType}
          />
        );

      case 4:
        return (
          <BrokerData
            mediatorForm={mediatorForm}
            nextStep={nextStep}
            prevStep={prevStep}
            intermediaryValue={intermediaryValue}
            setIntermediaryValue={setIntermediaryValue}
          />
        );

      case 5:
        return (
          <PartnerData
            partnerForm={partnerForm}
            nextStep={nextStep}
            prevStep={prevStep}
            partnerType={partnerType}
            setPartnerType={setPartnerType}
          />
        );
      case 6:
        return (
          <DiligenceData
            documentaryDiligenceForm={documentaryDiligenceForm}
            nextStep={nextStep}
            prevStep={prevStep}
            loading={loading}
            handleSubmit={handleSubmit}
          />
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
