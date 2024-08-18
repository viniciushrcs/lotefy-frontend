import {
  formatBooleanToText,
  formatCNPJ,
  formatCPF,
  formatDate,
  formatParticipation,
} from '../../helpers/formats';
import { EnterpriseDto } from './interface';

interface TransformedPartners {
  'Pessoa Jurídica':
    | Array<{
        Nome: string;
        Participação: number;
        CNPJ: string;
        'Razão Social': string;
        CNAE?: string;
        'Data de criação': string;
      }>
    | Array<{}>;
  'Pessoa Física':
    | Array<{
        Participação: number;
        CPF: string;
        Função: string;
      }>
    | Array<{}>;
}

interface ImovelData {
  title: string;
  details: {
    'Status da negociação'?: string;
    'Razão Social'?: string;
    CNAE?: string;
    'Nome da imobiliária'?: string;
    'Data da abertura'?: string;
    CNPJ?: string;
    CRECI?: string;
    CPF?: string;
    'O imóvel é integralizado na SPE?': string;
  };
}

function getTransformPartners(data: EnterpriseDto): TransformedPartners {
  let pjPartners: any[] = [];
  let pfPartners: any[] = [];

  if (data.spe_data && data.spe_data.pj_socios) {
    pjPartners = data.spe_data.pj_socios
      .filter(associate => associate.pj_socio)
      .map(associate =>
        associate.pj_socio
          ? {
              Nome: associate.pj_socio.razao_social,
              Participação: formatParticipation(associate.participacao),
              CNPJ: formatCNPJ(associate.pj_socio.cnpj),
              'Razão Social': associate.pj_socio.razao_social,
              CNAE: associate.pj_socio.cnae,
              'Data de criação': formatDate(associate.pj_socio.data_de_abertura),
            }
          : {}
      );

    pfPartners = data.spe_data.pj_socios
      .filter(associate => associate.pf_socio)
      .map(associate =>
        associate.pf_socio
          ? {
              Participação: formatParticipation(associate.participacao),
              CPF: formatCPF(associate.pf_socio.cpf),
              Função: associate.pf_socio.profissao,
            }
          : {}
      );
  }

  return {
    'Pessoa Jurídica': pjPartners,
    'Pessoa Física': pfPartners,
  };
}

function getImovelData(data: EnterpriseDto): ImovelData {
  if (data.imovel.imobiliaria) {
    return {
      title: 'Dados do imóvel: Imobiliaria',
      details: {
        'Status da negociação': data.imovel.imovel_status_negociacao,
        'Razão Social': data.imovel.imobiliaria.razao_social,
        CNAE: data.imovel.imobiliaria.cnae,
        'Nome da imobiliária': data.imovel.imobiliaria.nome_fantasia,
        'Data da abertura': formatDate(data.imovel.imobiliaria.data_de_abertura),
        CNPJ: formatCNPJ(data.imovel.imobiliaria.cnpj),
        'O imóvel é integralizado na SPE?': formatBooleanToText(
          data.imovel_integralizado
        ),
      },
    };
  }

  return {
    title: 'Dados do imóvel: Corretor',
    details: {
      CRECI: data.imovel.corretor.creci,
      CPF: formatCPF(data.imovel.corretor.cpf),
      'O imóvel é integralizado na SPE?': formatBooleanToText(data.imovel_integralizado),
    },
  };
}

const getEnterpriseData = (data: EnterpriseDto) => {
  if (data.spe_data) {
    return {
      Nome: data.nome,
      'Razão Social': data.spe_data.razao_social,
      'Nome Fantasia': data.spe_data.nome_fantasia,
      CNPJ: formatCNPJ(data.spe_data.cnpj),
      CNAE: data.spe_data.cnae,
      'Data de abertura': formatDate(data.spe_data.data_de_abertura),
      'SPE constituída?': formatBooleanToText(data.spe_constituida),
    };
  }

  return {
    Nome: data.nome,
    'SPE constituída?': formatBooleanToText(data.spe_constituida),
  };
};

const getProprietarioData = (data: EnterpriseDto) => {
  if (data.imovel.proprietario.cnpj) {
    return {
      'Razão Social': data.imovel.proprietario.razao_social,
      'Nome Fantasia': data.imovel.proprietario.nome_fantasia,
      'Data de abertura': formatDate(data.imovel.proprietario.data_de_abertura),
      CNPJ: formatCNPJ(data.imovel.proprietario.cnpj),
      CPF: formatCPF(data.imovel.proprietario.cpf),
      CNAE: data.imovel.proprietario.cnae,
    };
  }

  return {
    CPF: formatCPF(data.imovel.proprietario.cpf),
    RG: data.imovel.proprietario.rg,
  };
};

const getSPEData = (
  data: EnterpriseDto
): {
  title: string;
  details: any;
} => {
  return {
    title: 'Dados da SPE',
    details: {
      'Razão Social': data.spe_data.razao_social,
      'Nome Fantasia': data.spe_data.nome_fantasia,
      CNAE: data.spe_data.cnae,
      CNPJ: formatCNPJ(data.spe_data.cnpj),
      'Data de Abertura': formatDate(data.spe_data.data_de_abertura),
      'Contrato social da SPE': data.spe_data.documentos,
    },
  };
};

export const getFormatterEnterpriseData = (
  data: EnterpriseDto
): Array<{
  title: string;
  details: any;
}> => {
  const result = [
    {
      title: 'Dados do empreendimento',
      details: getEnterpriseData(data),
    },
    {
      title: 'Dados do proprietário do imóvel',
      details: getProprietarioData(data),
    },
    {
      title: 'Dados do Imóvel',
      details: {
        Matricula: data.imovel.matricula,
        Cidade: data.imovel.endereco[0].cidade,
        Estado: data.imovel.endereco[0].uf,
        Rua: data.imovel.endereco[0].rua,
        Número: data.imovel.endereco[0].numero,
        Bairro: data.imovel.endereco[0].bairro,
        Complemento: data.imovel.endereco[0].complemento,
      },
    },
    {
      ...getImovelData(data),
    },
    {
      title: 'Dados de sócios',
      details: getTransformPartners(data),
    },
  ];

  if (data.spe_data) {
    result.splice(1, 0, getSPEData(data));
  }

  return result;
};
