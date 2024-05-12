import { UseFormReturnType } from "@mantine/form";
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
import { IconTrash } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
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
  const fields = partnerForm.getValues().partner.map((item, index) => (
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
          key={partnerForm.key(`partner.${index}.name`)}
          {...partnerForm.getInputProps(`partner.${index}.name`)}
        />
        <NumberInput
          min={0}
          max={100}
          withAsterisk
          placeholder="Porcentagem"
          key={partnerForm.key(`partner.${index}.percentages`)}
          {...partnerForm.getInputProps(`partner.${index}.percentages`)}
        />
        <InputBase
          radius="xs"
          size="sm"
          placeholder="CPF"
          component={IMaskInput}
          mask="000.000.000-00"
          key={partnerForm.key(`partner.${index}.cpf`)}
          {...partnerForm.getInputProps(`partner.${index}.cpf`)}
        />
        <InputBase
          radius="xs"
          size="sm"
          placeholder="CNPJ"
          component={IMaskInput}
          mask="00.000.000/0000-00"
          key={partnerForm.key(`partner.${index}.cnpj`)}
          {...partnerForm.getInputProps(`partner.${index}.cnpj`)}
        />
        <InputBase
          placeholder="Função"
          key={partnerForm.key(`partner.${index}.function`)}
          {...partnerForm.getInputProps(`partner.${index}.function`)}
          className="w-[100%]"
          size="sm"
        />
        <InputBase
          placeholder="Contrapartida"
          key={partnerForm.key(`partner.${index}.counterpart`)}
          {...partnerForm.getInputProps(`partner.${index}.counterpart`)}
          className="w-[100%]"
          size="sm"
        />
      </SimpleGrid>
      <ActionIcon
        color="red"
        onClick={() => partnerForm.removeListItem("partner", index)}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const participantFields = partnerForm
    .getValues()
    .participants.map((item, index) => (
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
            key={partnerForm.key(`participants.${index}.name`)}
            {...partnerForm.getInputProps(`participants.${index}.name`)}
          />
          <InputBase
            radius="xs"
            size="sm"
            placeholder="CPF"
            component={IMaskInput}
            mask="000.000.000-00"
            key={partnerForm.key(`participants.${index}.cpf`)}
            {...partnerForm.getInputProps(`participants.${index}.cpf`)}
          />
          <InputBase
            radius="xs"
            size="sm"
            placeholder="CNPJ"
            component={IMaskInput}
            mask="00.000.000/0000-00"
            key={partnerForm.key(`participants.${index}.cnpj`)}
            {...partnerForm.getInputProps(`participants.${index}.cnpj`)}
          />
          <InputBase
            placeholder="Função"
            key={partnerForm.key(`participants.${index}.function`)}
            {...partnerForm.getInputProps(`participants.${index}.function`)}
            className="w-[100%]"
            size="sm"
          />
          <InputBase
            placeholder="Contrapartida"
            key={partnerForm.key(`participants.${index}.counterpart`)}
            {...partnerForm.getInputProps(`participants.${index}.counterpart`)}
            className="w-[100%]"
            size="sm"
          />
        </SimpleGrid>
        <ActionIcon
          color="red"
          onClick={() => partnerForm.removeListItem("participants", index)}
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    ));

  return (
    <Box maw={500} mx="auto">
      {fields.length === 0 && partnerType === "partner" && (
        <Text c="dimmed" ta="center">
          Nenhum Sócio
        </Text>
      )}
      {participantFields.length === 0 && partnerType === "participant" && (
        <Text c="dimmed" ta="center">
          Nenhum participante
        </Text>
      )}

      {partnerType === "partner" ? fields : participantFields}

      <Group justify="center" mt="md" className="mb-[2rem]">
        <Button
          color="black"
          radius="sm"
          onClick={() => {
            partnerType === "partner"
              ? partnerForm.insertListItem("partner", {
                  name: "",
                  cpf: "",
                  cnpj: "",
                  percentages: "",
                  function: "",
                  counterpart: "",
                  key: randomId(),
                })
              : partnerForm.insertListItem("participants", {
                  name: "",
                  cpf: "",
                  cnpj: "",
                  function: "",
                  counterpart: "",
                  key: randomId(),
                });
          }}
        >
          {partnerType === "partner"
            ? "Adicionar Sócio"
            : "Adicionar participante"}
        </Button>
      </Group>
    </Box>
  );
}
