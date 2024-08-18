import { useEffect, useState } from 'react';
import { CardDetail } from '../../../components/CardDetail';
import { Template } from '../../../components/Template';
import { Transparency } from '../../../services/transparency';
import { getFormatterEnterpriseData } from '../../../services/transparency/middleware';
import { useRouter } from 'next/router';
import { Loader } from '@mantine/core';
import useSWR from 'swr';

export default function EnterpriseDetails() {
  const router = useRouter();

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
      onError: () => {
        router.replace('/dashboard');
      },
    }
  );

  if (isLoading) {
    return (
      <Template childrenClasses={"flex justify-center items-center"}>
        <Loader color="lime" />
      </Template>
    )    
  }

  return (
    <Template>
      {data.map(({ title, details }) => (
        <CardDetail key={title} title={title} details={details} />
      ))}
    </Template>
  );
}
