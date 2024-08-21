import RegisterInput from "../../RegisterInput";
import { FileInput, Loader, rem, Select, SimpleGrid } from "@mantine/core";
import * as Icons from "../../../public/icons/index";
import { UseFormReturnType } from "@mantine/form";
import { DocumentaryDiligenceFormValues } from "../../../helpers/interfaces/forms";
import { IconFileCv } from "@tabler/icons-react";
import { ValueComponent } from "../../ValueComponent";

interface Props {
  documentaryDiligenceForm: UseFormReturnType<
    DocumentaryDiligenceFormValues,
    (values: DocumentaryDiligenceFormValues) => DocumentaryDiligenceFormValues
  >;
  nextStep: () => void;
  prevStep: () => void;
  loading: boolean;
  handleSubmit: () => Promise<void>;
}

export function DiligenceData({
  documentaryDiligenceForm,
  loading,
  nextStep,
  prevStep,
  handleSubmit,
}: Props) {
  const icon = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  return (
    <div className="mb-[45%]">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Loader color="#56D963" type="bars" />
          </div>
        </div>
      )}
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
              accept="image/png,image/jpeg,application/pdf"
              clearable
              multiple
              key={documentaryDiligenceForm.key("diligenceDocument")}
              {...documentaryDiligenceForm.getInputProps("diligenceDocument")}
              valueComponent={ValueComponent}
            />
          </SimpleGrid>
        </RegisterInput>
      </form>
    </div>
  );
}
