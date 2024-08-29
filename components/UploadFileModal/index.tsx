import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, CheckIcon, Flex, Modal, Radio, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

type UploadFileModalProp = {
  opened: boolean;
  close: () => void;
};

export function UploadFileModal({ opened, close }: UploadFileModalProp) {
  const [disableButton, setDisableButton] = useState(true);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      setDisableButton(false);
    }
    console.log('Upload', acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      size="650px"
      title="Selecione um arquivo para iniciar a importação"
    >
      <Modal.Body className='flex flex-col'>
      <div {...getRootProps()} className='mb-8'>
        <input {...getInputProps()} className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none' />
        <Flex align={'center'} columnGap={"20px"} justify={'center'} className={"w-full border-2 border-dashed border-gray-300 p-12 bg-gray-50"}>
        <IconUpload color="#56D963" stroke={2} size={30} />
        {acceptedFiles.length > 0 ? (
          acceptedFiles.map(file => (
            <Text size='sm' className='text-center' key={file.name}>
              {file.name}
            </Text>
          ))
        ) : (
          <Flex direction={'column'} align={'center'} justify={'center'}>
            <Text size='sm' fw={500}>Selecione ou arraste o arquivo aqui</Text>
            <Text size='sm' c="gray" fw={300}>Formatos aceitos ( PDF )</Text>
          </Flex>
        )}</Flex>
      </div>
      <Flex direction={'column'}>
        <Text size='sm' fw={500}>Selecione uma categoria:</Text>
        <Flex columnGap={20} className='pt-4 pb-8'>
          <Radio
            icon={CheckIcon}
            label="Documento do empreendimento"
            name="check01"
            value="Documento do empreendimento"
            color="lime.4"
          />
          <Radio
            icon={CheckIcon}
            label="Projeto e Aprovação"
            name="check02"
            value="Projeto e Aprovação"
            color="lime.4"
          />
          <Radio
            icon={CheckIcon}
            label="SPE e SCP"
            name="check03"
            value="SPE e SCP"
            color="lime.4"
          />
        </Flex>
      </Flex>
      <Button className='self-end' w={100} variant="filled" color="#56D963" disabled={disableButton}>
        Salvar
      </Button></Modal.Body>
    </Modal>
  );
}
