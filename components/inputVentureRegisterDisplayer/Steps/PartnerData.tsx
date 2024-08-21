import RegisterInput from "../../RegisterInput";
import { Group, Radio, Text } from "@mantine/core";
import * as Icons from "../../../public/icons/index";
import { PartnerFormValues } from "../../../helpers/interfaces/forms";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturnType } from "@mantine/form";
import { NestedArray } from "../NestedArray";

interface Props {
  partnerForm: UseFormReturnType<
    PartnerFormValues,
    (values: PartnerFormValues) => PartnerFormValues
  >;
  nextStep: () => void;
  prevStep: () => void;
  partnerType: string;
  setPartnerType: Dispatch<SetStateAction<string>>;
}

export function PartnerData({
  partnerForm,
  nextStep,
  prevStep,
  partnerType,
  setPartnerType,
}: Props) {
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

          <NestedArray partnerType={partnerType} partnerForm={partnerForm} />
        </RegisterInput>
      </form>
    </div>
  );
}
