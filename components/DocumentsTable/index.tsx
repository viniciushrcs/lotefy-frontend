import { Table } from '@mantine/core';
import { formatDate } from '../../helpers/formats';
import { IconEye, IconFileDownload } from '@tabler/icons-react';

export function DocumentsTable() {
  const dateMock = formatDate('2023-10-02');

  const elements = [
    {
      name: 'Nome do documento',
      date: dateMock,
      category: 'Projeto e Aprovação',
      href: '',
    },
    {
      name: 'Nome do documento',
      date: dateMock,
      category: 'Documento do empreendimento',
      href: '',
    },
    { name: 'Nome do documento', date: dateMock, category: 'SPE e SCP' },
    { name: 'Nome do documento', date: dateMock, category: 'SPE e SCP', href: '' },
    {
      name: 'Nome do documento',
      date: dateMock,
      category: 'Documento do empreendimento',
      href: '',
    },
  ];

  const rows = elements.map((element, index) => (
    <Table.Tr key={`${element.name}${index}`}>
      <Table.Td className="font-semibold">{element.name}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>
        <div className="flex">
          <a
            href={element.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center min-w-8 min-h-8 bg-[#F6F6F6] rounded-xl mr-3"
          >
            <IconEye size={20} color="#737577" />
          </a>
          <a
            href={element.href}
            download="document.pdf"
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
