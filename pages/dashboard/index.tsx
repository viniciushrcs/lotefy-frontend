import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { SimpleGrid, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AddVentureCard } from "../../components/AddVentureCard";
import { useRouter } from "next/router";
import { SignUpContext } from "../../context/SignUpContext";
import { Enterprise } from "../../services/addEnterprise/indext";
import { AnyObject } from "../../services/http";
import withAuth from "../../components/WithAuth";

function Dashboard() {
  const [active, setActive] = useState("Empreendimentos");
  const { userData } = useContext(SignUpContext);
  const [venture, setVentures] = useState<AnyObject[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userData.userId) {
          const enterprises = await Enterprise.getEnterprises(
            userData.userId.toString()
          );
          setVentures(enterprises.data);
        }
      } catch (error) {
        router.replace("/login");
      }
    };

    fetchUserData();
  }, [router, userData]);

  const switchContent = () => {
    switch (active) {
      case "Empreendimentos":
        return (
          <>
            <Text className="text-[20px] not-italic font-bold leading-[140%] mb-[1.5rem]">
              Empreendimentos
            </Text>
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing={{ base: 10, sm: "xl" }}
              verticalSpacing={{ base: "md", sm: "xl" }}
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
          </>
        );
    }
  };

  return (
    <div className="bg-[#F8F9FA]">
      <Header />
      <div className="flex">
        <Navbar active={active} setActive={setActive} />
        <div className="m-4 w-[100%]">{switchContent()}</div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
