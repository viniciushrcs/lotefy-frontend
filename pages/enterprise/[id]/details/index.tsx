import useSWR from "swr";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";

import { CardDetail } from "../../../../components/CardDetail";
import { Template } from "../../../../components/Template";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import ActionableTitle from "../../../../components/ActionableTitle";

import { Transparency } from "../../../../services/transparency";
import { getFormatterEnterpriseData } from "../../../../services/transparency/middleware";

export default function EnterpriseDetails() {
  const router = useRouter();

  const { data = [], isLoading } = useSWR(
    `api/enterprise/?uid=${router.query.id}`,
    async () => {
      if (typeof router.query.id === "string") {
        const enterprise = await Transparency.getEnterpriseById(
          router.query.id
        );
        return getFormatterEnterpriseData(enterprise.data);
      }
    },
    {
      shouldRetryOnError: false,
    }
  );

  const itemsBreadcrumb = [
    { title: "Empreendimentos", href: "/dashboard" },
    { title: "Dados do empreendimento", href: "" },
  ];

  const handleClickDocsButton = () => {
    router.push(`/enterprise/${router.query.id}/docs`);
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
      <Breadcrumb data={itemsBreadcrumb} />
      <ActionableTitle
        title={data[0]?.details["Nome"]}
        titleButton="Ver Documentos"
        onClickButton={handleClickDocsButton}
      />

      {data.map(({ title, details }, index) => (
        <CardDetail
          key={`card-detail-${title}-${index}`}
          title={title}
          details={details}
        />
      ))}
    </Template>
  );
}
