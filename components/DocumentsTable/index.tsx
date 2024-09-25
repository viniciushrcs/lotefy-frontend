import { Table } from "@mantine/core";
import { formatDate } from "../../helpers/formats";
import { IconEye, IconFileDownload } from "@tabler/icons-react";

type Documents = {
  name: string;
  createdAt: string;
  category: string;
  signedUrl: string;
  fullDocumentName: string;
};

type DocumentsTableProp = {
  documents: Documents[];
};

export function DocumentsTable({ documents }: DocumentsTableProp) {
  const rows = documents.map((doc, index) => (
    <Table.Tr key={`${doc.name}${index}`}>
      <Table.Td className="font-semibold">{doc.name}</Table.Td>
      <Table.Td>{formatDate(doc.createdAt)}</Table.Td>
      <Table.Td>{doc.category}</Table.Td>
      <Table.Td>
        <div className="flex">
          <a
            href={doc.signedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center min-w-8 min-h-8 bg-[#F6F6F6] rounded-xl mr-3"
          >
            <IconEye size={20} color="#737577" />
          </a>
          <a
            href={doc.signedUrl}
            target="_blank"
            download={doc.fullDocumentName}
            className="flex justify-center items-center min-w-8 min-h-8 bg-[#F6F6F6] rounded-xl"
          >
            <IconFileDownload size={20} color="#737577" />
          </a>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table horizontalSpacing="xl" verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Data de upload</Table.Th>
          <Table.Th>Categoria</Table.Th>
          <Table.Th>Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
