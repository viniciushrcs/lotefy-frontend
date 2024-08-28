import useSWR from 'swr';
import {
  Button,
  Card,
  Flex,
  Loader,
  Modal,
  Pagination,
  SegmentedControl,
  Text,
  TextInput,
} from '@mantine/core';
import { useRouter } from 'next/router';

import {
  IconFileUpload,
  IconFileSearch,
} from '@tabler/icons-react';

import { Template } from '../../../../components/Template';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import ActionableTitle from '../../../../components/ActionableTitle';

import { Transparency } from '../../../../services/transparency';
import { getFormatterEnterpriseData } from '../../../../services/transparency/middleware';
import { SelectFilter } from '../../../../components/SelectFilter';
import { DocumentsTable } from '../../../../components/DocumentsTable';
import { UploadFileModal } from '../../../../components/UploadFileModal';
import { useDisclosure } from '@mantine/hooks';

export default function EnterpriseDetails() {
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);


  const { data = [], isLoading } = useSWR(
    `api/enterprise/?uid=${router.query.id}`,
    async () => {
      if (typeof router.query.id === 'string') {
        const enterprise = await Transparency.getEnterpriseById(router.query.id);
        return getFormatterEnterpriseData(enterprise.data);
      }
    },
    {
      shouldRetryOnError: false,
    }
  );

  const itemsBreadcrumb = [
    { title: 'Empreendimentos', href: '/dashboard' },
    { title: 'Documentos', href: '' },
  ];

  const handleClickDetailButton = () => {
    router.push(`/enterprise/${router.query.id}/details`);
  };

  if (isLoading) {
    return (
      <Template childrenClasses={'flex justify-center items-center'}>
        <Loader color="lime" />
      </Template>
    );
  }

  return (
    <Template>
      <UploadFileModal opened={opened} close={close} />

      <Breadcrumb data={itemsBreadcrumb} />
      <ActionableTitle
        title={data[0]?.details['Nome']}
        titleButton="Ver Detalhes"
        onClickButton={handleClickDetailButton}
      />

      <Card className="mb-4 p-4 md:p-8" shadow="sm" radius="md">
        <Card.Section className="flex justify-between" p="md">
          <TextInput
            className="w-[300px]"
            leftSectionPointerEvents="none"
            leftSection={<IconFileSearch size={20} />}
            label=""
            placeholder="Pesquisa rápida"
          />
          <Button
           onClick={open}
            variant="filled"
            color="#56D963"
            leftSection={<IconFileUpload size={20} />}
          >
            Adicionar documento
          </Button>
        </Card.Section>
      </Card>

      <Text size="xs" className='font-light pb-4'>300 arquivos encontrados</Text>

      <Card>
        <Card.Section withBorder inheritPadding py="xs">
          <Flex mih={65} align="center" justify="space-between">
            <SegmentedControl
              color="#56D963"
              data={['Últimos 30 dias', 'Últimos 60 dias', 'Últimos 90 dias']}
              transitionDuration={0}
            />
            {/* <SelectFilter /> */}
          </Flex>
        </Card.Section>
        <Card.Section withBorder inheritPadding py="xs">
          <DocumentsTable />
        </Card.Section>

        <Flex mih={65} align="center" justify="space-between">
          <Text size="sm">Entradas 1 à 5 de 50</Text>
          <Pagination total={10} color="#EEFEE9" classNames={{ dots: "text-[#AFB0B1]", control: "data-[active=true]:text-[#59D762] text-[#AFB0B1] border-none" }} />
        </Flex>
      </Card>
    </Template>
  );
}
