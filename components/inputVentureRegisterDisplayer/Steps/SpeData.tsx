import RegisterInput from "../../RegisterInput";
import {
  FileInput,
  Group,
  InputBase,
  Radio,
  rem,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import * as Icons from "../../../public/icons/index";
import { IMaskInput } from "react-imask";
import { UseFormReturnType } from "@mantine/form";
import { SpeFormValues } from "../../../helpers/interfaces/forms";
import { Dispatch, SetStateAction } from "react";
import { countryStates } from "../../../helpers/states";
import { IconFileCv } from "@tabler/icons-react";

interface Props {
  speForm: UseFormReturnType<
    SpeFormValues,
    (values: SpeFormValues) => SpeFormValues
  >;
  nextStep: () => void;
  prevStep: () => void;
  paidInToSpeValue: string;
  setPaidInToSpeValue: Dispatch<SetStateAction<string>>;
}

export function SpeData({
  speForm,
  paidInToSpeValue,
  setPaidInToSpeValue,
  nextStep,
  prevStep,
}: Props) {
  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

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
              accept="image/png,image/jpeg,application/pdf"
              clearable
              key={speForm.key("speUploadFile")}
              {...speForm.getInputProps("speUploadFile")}
            />
          </SimpleGrid>
        </RegisterInput>
      </form>
    </div>
  );
}
