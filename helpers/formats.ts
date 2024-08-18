export const formatNametoPath = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

export const formatBooleanToText = (value: boolean): string => (value ? 'Sim' : 'Não');

export const formatDate = (value: string): string => {
  let partOfDate = value.split("-");

  return `${partOfDate[2]}/${partOfDate[1]}/${partOfDate[0]}`;
}

export const formatParticipation = (participation: string): string =>
  `${participation}%`

export const formatCPF = (cpf: string) => {
  if (!cpf) return;

  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}


export const formatCNPJ = (cnpj: string) => {
  if (!cnpj) return;
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

