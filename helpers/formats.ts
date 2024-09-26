export const formatNametoPath = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export const formatBooleanToText = (value: boolean): string =>
  value ? "Sim" : "Não";

export const formatDate = (value: string): string => {
  const date = new Date(value);
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
};

export const formatParticipation = (participation: string): string =>
  `${participation}%`;

export const formatCPF = (cpf: string) => {
  if (!cpf) return;

  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

export const formatCNPJ = (cnpj: string) => {
  if (!cnpj) return;
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};
