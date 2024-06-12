import {
  ActionIcon,
  Box,
  Button,
  Group,
  InputBase,
  NumberInput,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";
import { IMaskInput } from "react-imask";
import { PartnerFormValues } from "../../../helpers/interfaces/forms";

interface Props {
  partnerType: string;
  partnerForm: UseFormReturnType<
    PartnerFormValues,
    (values: PartnerFormValues) => PartnerFormValues
  >;
}

export function NestedArray({ partnerType, partnerForm }: Props) {
  const removeEmptyItems = () => {
    const values = partnerForm.getValues();

    if (partnerType === "pjPartner") {
      values.pfPartner.forEach((item, index) => {
        const isEmpty = Object.values(item).some((value) => value === "");
        if (isEmpty) {
          partnerForm.removeListItem("pfPartner", index);
        }
      });
    } else {
      values.pjPartner.forEach((item, index) => {
        const isEmpty = Object.values(item).some((value) => value === "");
        if (isEmpty) {
          partnerForm.removeListItem("pjPartner", index);
        }
      });
    }
  };

  useEffect(() => {
    removeEmptyItems();
    //eslint-disable-next-line
  }, [partnerType]);

  const pjFields = partnerForm.getValues().pjPartner.map((item, index) => (
    <Group key={item.key} mt="xs" className="flex items-center flex-nowrap">
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 15, sm: "xs" }}
        verticalSpacing={{ base: "xs", sm: "xs" }}
      >
        <InputBase
          placeholder="Nome completo"
          withAsterisk
          style={{ flex: 1 }}
          key={partnerForm.key(`pjPartner.${index}.name`)}
          {...partnerForm.getInputProps(`pjPartner.${index}.name`)}
        />
        <NumberInput
          min={0}
          max={100}
          withAsterisk
          placeholder="Participação"
          key={partnerForm.key(`pjPartner.${index}.participation`)}
          {...partnerForm.getInputProps(`pjPartner.${index}.participation`)}
        />
        <InputBase
          radius="xs"
          size="sm"
          placeholder="CNPJ"
          component={IMaskInput}
          mask="00.000.000/0000-00"
          key={partnerForm.key(`pjPartner.${index}.cnpj`)}
          {...partnerForm.getInputProps(`pjPartner.${index}.cnpj`)}
        />
        <InputBase
          placeholder="Razão social"
          key={partnerForm.key(`pjPartner.${index}.socialReason`)}
          {...partnerForm.getInputProps(`pjPartner.${index}.socialReason`)}
          className="w-[100%]"
          size="sm"
        />
        <InputBase
          placeholder="CNAE"
          key={partnerForm.key(`pjPartner.${index}.cnae`)}
          {...partnerForm.getInputProps(`pjPartner.${index}.cnae`)}
          className="w-[100%]"
          size="sm"
        />
        <InputBase
          placeholder="Data de abertura"
          key={partnerForm.key(`pjPartner.${index}.createdAt`)}
          {...partnerForm.getInputProps(`pjPartner.${index}.createdAt`)}
          size="md"
          component={IMaskInput}
          mask="00/00/0000"
        />
      </SimpleGrid>
      <ActionIcon
        color="red"
        onClick={() => partnerForm.removeListItem("pjPartner", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const pfFields = partnerForm.getValues().pfPartner.map((item, index) => (
    <Group key={item.key} mt="xs" className="flex items-center flex-nowrap">
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 15, sm: "xs" }}
        verticalSpacing={{ base: "xs", sm: "xs" }}
      >
        <InputBase
          radius="xs"
          size="sm"
          placeholder="CPF"
          component={IMaskInput}
          mask="000.000.000-00"
          key={partnerForm.key(`pfPartner.${index}.cpf`)}
          {...partnerForm.getInputProps(`pfPartner.${index}.cpf`)}
        />
        <NumberInput
          min={0}
          max={100}
          withAsterisk
          placeholder="Participação"
          key={partnerForm.key(`pfPartner.${index}.participation`)}
          {...partnerForm.getInputProps(`pfPartner.${index}.participation`)}
        />
        <InputBase
          placeholder="Função"
          key={partnerForm.key(`pfPartner.${index}.function`)}
          {...partnerForm.getInputProps(`pfPartner.${index}.function`)}
          className="w-[100%]"
          size="sm"
        />
      </SimpleGrid>
      <ActionIcon
        color="red"
        onClick={() => partnerForm.removeListItem("pfPartner", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box maw={500} mx="auto">
      {pjFields.length === 0 && partnerType === "pjPartner" && (
        <Text c="dimmed" ta="center">
          Nenhum Sócio
        </Text>
      )}
      {pfFields.length === 0 && partnerType === "pfPartner" && (
        <Text c="dimmed" ta="center">
          Nenhum Sócio
        </Text>
      )}

      {partnerType === "pjPartner" ? pjFields : pfFields}

      <Group justify="center" mt="md" className="mb-[2rem]">
        <Button
          color="black"
          radius="sm"
          onClick={() => {
            partnerType === "pjPartner"
              ? partnerForm.insertListItem("pjPartner", {
                  name: "",
                  cnpj: "",
                  participation: "",
                  socialReason: "",
                  cnae: "",
                  createdAt: "",
                  key: randomId(),
                })
              : partnerForm.insertListItem("pfPartner", {
                  cpf: "",
                  function: "",
                  participation: "",
                  key: randomId(),
                });
          }}
        >
          Adicionar sócio
        </Button>
      </Group>
    </Box>
  );
}
