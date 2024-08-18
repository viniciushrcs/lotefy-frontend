import { useEffect, useState } from 'react';
import { CardDetail } from '../../../components/CardDetail';
import { Template } from '../../../components/Template';
import { Transparency } from '../../../services/transparency';
import { getFormatterEnterpriseData } from '../../../services/transparency/middleware';
import { useRouter } from 'next/router';

export default function EnterpriseDetails() {
  const [data, setData] = useState<Array<{
    title: string;
    details: Record<string, string | number | undefined | Array<unknown>>;
  }>>([]);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      if (typeof router.query.id === 'string') {
        const enterprise = await Transparency.getEnterpriseById(router.query.id);
        setData(getFormatterEnterpriseData(enterprise.data));
      }
    };

    fetch();
  }, [router]);

  return (
    <Template>
      {data.map(({ title, details }) => (
        <CardDetail key={title} title={title} details={details} />
      ))}
    </Template>
  );
}
