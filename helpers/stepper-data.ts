import * as Icons from "../public/icons/index";

export const signupstepperData = [
  {
    label: "Identificação",
    description: "Usamos seu CPF para te identificar",
    icon: Icons.UserIcon,
  },
  {
    label: "Dados pessoais",
    description: "Digite seu nome e data de nascimento",
    icon: Icons.UserIconCheck,
  },
  {
    label: "Crie sua senha",
    description: "Crie sua senha para acessar a plataforma",
    icon: Icons.PasscodeIcon,
  },
  {
    label: "Verificação de conta",
    description: "Utilizamos sua conta de e-mail para validar o seu acesso",
    icon: Icons.MessageIcon,
  },
  {
    label: "Dados da empresa",
    description:
      "Utilizamos esses dados para entender o momento da sua loteadora",
    icon: Icons.BuildingIcon,
  },
  {
    label: "Termos de uso",
    description: "Leia e aceite os termos de uso",
    icon: Icons.FileIcon,
  },
];

export const ventureStepperData = [
  {
    label: "Dados do empreendimento",
    description: "Digite as principais informações do empreendimento",
    icon: Icons.FileIcon,
  },
  {
    label: "Dados da SPE",
    description:
      "Esses dados ajudam a esclarecer o histórico e a administração do imóvel",
    icon: Icons.FileSearch,
  },
  {
    label: "Dados do imóvel: endereço e matrícula",
    description: "Preencha alguns dados do imóvel de cadastro",
    icon: Icons.Home,
  },
  {
    label: "Dados do imóvel: proprietário, corretor e situação",
    description: "Preencha mais alguns dados do imóvel de cadastro",
    icon: Icons.Id,
  },
  {
    label: "Dados de sócios ou participantes",
    description:
      "Preencha alguns dados de sócios ou participantes do empreendimento.",
    icon: Icons.Social,
  },
];
