import { SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AddVentureCard } from '../../components/AddVentureCard';
import { Card } from '../../components/Card';
import withAuth from '../../components/WithAuth';
import { SignUpContext } from '../../context/SignUpContext';
import { Enterprise } from '../../services/enterprise';
import { AnyObject } from '../../services/http';
import { Template } from '../../components/Template';

function Dashboard() {
  const { userData } = useContext(SignUpContext);
  const [venture, setVentures] = useState<AnyObject[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userData.userId) {
          const enterprises = await Enterprise.getEnterprises(userData.userId.toString());
          setVentures(enterprises.data);
        }
      } catch (error) {
        router.replace('/login');
      }
    };

    fetchUserData();
  }, [router, userData]);

  return (
    <Template menuActive={'Empreendimentos'}>
      <div>
        <Text className="text-[20px] not-italic font-medium leading-[140%] mb-[1.5rem] tracking-[2px]">
          Empreendimentos
        </Text>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          {venture.length ? (
            <>
              {venture.map((item, index) => (
                <Card ventureData={item} key={item.id || index} />
              ))}
              <AddVentureCard />
            </>
          ) : (
            <AddVentureCard />
          )}
        </SimpleGrid>
      </div>
    </Template>
  );
}

export default withAuth(Dashboard);
