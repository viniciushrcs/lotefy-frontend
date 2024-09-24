import { SimpleGrid, Skeleton, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AddVentureCard } from "../../components/AddVentureCard";
import { Card } from "../../components/Card";
import { SignUpContext } from "../../context/SignUpContext";
import { Enterprise } from "../../services/enterprise";
import { AnyObject } from "../../services/http";
import { Template } from "../../components/Template";
import useSWR from "swr";
import { User } from "../../services/user";

function Dashboard() {
  const { userData, updateUserData } = useContext(SignUpContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUserData = async () => {
    const response = await User.getUser();

    if (response) {
      updateUserData({
        userId: response.userId,
        userName: response.userName,
        userEmail: response.userEmail,
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const { data: venture = [] } = useSWR(
    () => (userData.userId ? `api/dashboard/?uid=${userData.userId}` : null),
    async () => {
      if (userData.userId) {
        const enterprises = await Enterprise.getEnterprises(
          userData.userId.toString()
        );
        setIsLoading(false);
        return enterprises.data;
      }
    },
    {
      shouldRetryOnError: false,
      onError: () => {
        router.replace("/login");
      },
    }
  );

  return (
    <Template menuActive={"Empreendimentos"}>
      <div>
        <Text className="text-[20px] not-italic font-medium leading-[140%] mb-[1.5rem] tracking-[2px]">
          Empreendimentos
        </Text>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {isLoading ? (
            <Skeleton height={200} mb="md" />
          ) : venture.length ? (
            <>
              {venture.map((item: AnyObject, index: any) => (
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

export default Dashboard;
