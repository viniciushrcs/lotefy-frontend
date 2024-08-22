import RegisterInput from "../../RegisterInput";
import NextImage from "next/image";
import {
  Anchor,
  Group,
  Image,
  InputBase,
  Radio,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import * as Icons from "../../../public/icons/index";
import { IMaskInput } from "react-imask";
import BackButton from "../../../public/icons/BackButton.svg";
import { UseFormReturnType } from "@mantine/form";
import { VentureFormValues } from "../../../helpers/interfaces/forms";
import { Dispatch, SetStateAction } from "react";

interface Props {
  form: UseFormReturnType<
    VentureFormValues,
    (values: VentureFormValues) => VentureFormValues
  >;
  constituedSpeValue: string;
  nextStep: () => void;
  setConstituedSpeValue: Dispatch<SetStateAction<string>>;
}

export function EnterpriseData({
  form,
  constituedSpeValue,
  nextStep,
  setConstituedSpeValue,
}: Props) {
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
        inputDescription={"Digite as principais informações do empreendimento"}
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
}
