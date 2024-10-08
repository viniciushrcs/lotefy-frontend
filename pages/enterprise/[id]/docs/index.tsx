import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Button,
  Card,
  Flex,
  Loader,
  Pagination,
  SegmentedControl,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";

import { IconFileUpload, IconSearch } from "@tabler/icons-react";

import { Template } from "../../../../components/Template";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import ActionableTitle from "../../../../components/ActionableTitle";

import { Transparency } from "../../../../services/transparency";
import { DocumentsTable } from "../../../../components/DocumentsTable";
import { UploadFileModal } from "../../../../components/UploadFileModal";
import { useDisclosure } from "@mantine/hooks";
import { AnyObject } from "../../../../services/http";

export default function EnterpriseDetails() {
  const router = useRouter();

  const [opened, { open, close }] = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 15;

  const { data = { documents: [], enterprise: {} }, isLoading } = useSWR(
    `api/documents/?uid=${router.query.id}`,
    async () => {
      if (typeof router.query.id === "string") {
        const { data: documentsData } =
          await Transparency.getDocumentsByEnterpriseId(router.query.id);

        const { data: enterpriseData } = await Transparency.getEnterpriseIds(
          router.query.id
        );

        return {
          documents: documentsData,
          enterprise: enterpriseData,
        };
      }
    },
    {
      shouldRetryOnError: false,
    }
  );

  const filteredDocuments = data.documents.filter((doc: AnyObject) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocuments.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredDocuments.length);
  const currentDocuments = filteredDocuments?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsBreadcrumb = [
    { title: "Empreendimentos", href: "/dashboard" },
    { title: "Documentos", href: "" },
  ];

  const handleClickDetailButton = () => {
    router.push(`/enterprise/${router.query.id}/details`);
  };

  if (isLoading) {
    return (
      <Template childrenClasses={"flex justify-center items-center"}>
        <Loader color="lime" />
      </Template>
    );
  }

  return (
    <Template>
      <UploadFileModal
        opened={opened}
        close={close}
        enterpriseData={data.enterprise}
        docs={filteredDocuments.length}
      />

      <Breadcrumb data={itemsBreadcrumb} />
      <ActionableTitle
        title={data.enterprise.name}
        titleButton="Ver Detalhes"
        onClickButton={handleClickDetailButton}
      />

      <Card className="mb-4 p-8" shadow="sm" radius="md">
        <Card.Section className="flex justify-between" p="md">
          <TextInput
            label=""
            className="w-[400px]"
            leftSectionPointerEvents="none"
            leftSection={<IconSearch size={20} />}
            placeholder="Pesquisa rápida"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
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

      <Text size="xs" className="font-light pb-4">
        {filteredDocuments.length} arquivos encontrados
      </Text>

      <Card>
        <Card.Section withBorder inheritPadding py="sm" px="xl">
          <Flex mih={65} align="center" justify="space-between">
            <SegmentedControl
              color="#56D963"
              data={["Últimos 30 dias", "Últimos 60 dias", "Últimos 90 dias"]}
              transitionDuration={0}
            />
          </Flex>
        </Card.Section>
        <Card.Section withBorder inheritPadding py="xs">
          <DocumentsTable
            documents={currentDocuments}
            enterpriseData={data.enterprise}
          />
        </Card.Section>

        <Flex mih={65} align="center" justify="space-between">
          <Text size="xs" className="font-light pt-4">
            Entradas {startIndex + 1} à {endIndex} de {filteredDocuments.length}
          </Text>
          <Pagination
            value={currentPage}
            onChange={handlePageChange}
            total={totalPages}
            color="#EEFEE9"
            classNames={{
              dots: "text-[#AFB0B1]",
              control:
                "data-[active=true]:text-[#59D762] text-[#AFB0B1] border-none",
            }}
          />
        </Flex>
      </Card>
    </Template>
  );
}
