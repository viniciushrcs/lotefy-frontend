import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, CheckIcon, Flex, Modal, Radio, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { Files } from "../../services/file/file";
import { AnyObject } from "../../services/http";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { mutate } from "swr";
import { useRouter } from "next/router";

type UploadFileModalProp = {
  opened: boolean;
  close: () => void;
  enterpriseData: AnyObject;
};

export function UploadFileModal({
  opened,
  close,
  enterpriseData,
}: UploadFileModalProp) {
  const [disableButton, setDisableButton] = useState(true);
  const [documentType, setDocumentType] = useState<string>("");

  const router = useRouter();

  function formatFileName(fileName: string) {
    return fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c");
  }

  const uploadFiles = async (files: File[]) => {
    await Promise.all(
      files.map(async (file) => {
        const formattedName = formatFileName(file.name);
        const newFile = new File([file], formattedName, { type: file.type });

        const documentId =
          documentType === "PJ"
            ? enterpriseData.speId
            : enterpriseData.enterpriseId;
        try {
          await Files.uploadFile(documentId, newFile, documentType);
          setDocumentType("");
          setDisableButton(true);
          acceptedFiles.length = 0;
        } catch (error) {
          notifications.show({
            color: "red",
            title: "Ops! Algo deu errado",
            message: "Por favor, tente fazer o upload dos arquivos novamente.",
            autoClose: 4000,
            withCloseButton: true,
            position: "top-center",
          });
        }
      })
    );
    mutate(`api/documents/?uid=${router.query.id}`);
    close();
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setDisableButton(false);
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setDocumentType("");
        setDisableButton(true);
        close();
        acceptedFiles.length = 0;
      }}
      centered
      size="650px"
      title="Selecione um arquivo para iniciar a importação"
    >
      <Modal.Body className="flex flex-col">
        <div {...getRootProps()} className="mb-8">
          <input
            {...getInputProps()}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
          <Flex
            align={"center"}
            columnGap={"20px"}
            justify={"center"}
            className={
              "w-full border-2 border-dashed border-gray-300 p-12 bg-gray-50"
            }
          >
            <IconUpload color="#56D963" stroke={2} size={30} />
            {acceptedFiles.length > 0 ? (
              acceptedFiles.map((file) => (
                <Text size="sm" className="text-center" key={file.name}>
                  {file.name}
                </Text>
              ))
            ) : (
              <Flex direction={"column"} align={"center"} justify={"center"}>
                <Text size="sm" fw={500}>
                  Selecione ou arraste o arquivo aqui
                </Text>
                <Text size="sm" c="gray" fw={300}>
                  Formatos aceitos ( PDF )
                </Text>
              </Flex>
            )}
          </Flex>
        </div>
        <Flex direction={"column"}>
          <Text size="sm" fw={500}>
            Selecione uma categoria:
          </Text>
          <Radio.Group value={documentType} onChange={setDocumentType}>
            <Flex columnGap={20} className="pt-4 pb-8">
              <Radio
                icon={CheckIcon}
                label="Documento do empreendimento"
                name="check01"
                value="Empreendimentos"
                color="lime.4"
              />
              <Radio
                icon={CheckIcon}
                label="Projeto e Aprovação"
                name="check02"
                value="Projetos"
                color="lime.4"
              />
              <Radio
                icon={CheckIcon}
                label="SPE e SCP"
                name="check03"
                value="PJ"
                color="lime.4"
              />
            </Flex>
          </Radio.Group>
        </Flex>
        <Button
          onClick={() =>
            !documentType
              ? notifications.show({
                  color: "yellow",
                  title: "Selecione uma categoria.",
                  message:
                    "Por favor, selecione uma categoria e tente fazer o upload dos arquivos novamente.",
                  autoClose: 4000,
                  withCloseButton: true,
                  position: "top-center",
                })
              : uploadFiles(acceptedFiles)
          }
          className="self-end"
          w={100}
          variant="filled"
          color="#56D963"
          disabled={disableButton}
        >
          Salvar
        </Button>
      </Modal.Body>
    </Modal>
  );
}
