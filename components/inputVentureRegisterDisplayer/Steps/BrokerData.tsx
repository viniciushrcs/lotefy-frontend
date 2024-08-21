import RegisterInput from "../../RegisterInput";
import {
  Group,
  InputBase,
  Radio,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import * as Icons from "../../../public/icons/index";
import { IMaskInput } from "react-imask";
import { UseFormReturnType } from "@mantine/form";
import {
  MediatorFormValues,
  OwnerFormValues,
} from "../../../helpers/interfaces/forms";
import { Dispatch, SetStateAction } from "react";
import { countryStates } from "../../../helpers/states";

interface Props {
  mediatorForm: UseFormReturnType<
    MediatorFormValues,
    (values: MediatorFormValues) => MediatorFormValues
  >;
  nextStep: () => void;
  prevStep: () => void;
  intermediaryValue: string;
  setIntermediaryValue: Dispatch<SetStateAction<string>>;
}

export function BrokerData({
  mediatorForm,
  intermediaryValue,
  setIntermediaryValue,
  nextStep,
  prevStep,
}: Props) {
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
          inputDescription={"Preencha mais alguns dados do imóvel de cadastro"}
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

            <Group className={"flex items-center justify-center gap-[5px]"}>
              <Text className="text-[#101828] text-base font-medium leading-6">
                Corretor ou imobiliária?
              </Text>
              <Radio.Group
                value={intermediaryValue}
                onChange={setIntermediaryValue}
              >
                <Group mt="xs" style={{ marginBottom: "10px" }}>
                  <Radio color="#56D963" value="broker" label="Corretor" />
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
                  {...mediatorForm.getInputProps("realEstateSocialReason")}
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
}
