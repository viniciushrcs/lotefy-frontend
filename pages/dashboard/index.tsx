import { Navbar } from "../../components/Navbar";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { SimpleGrid, Text } from "@mantine/core";
import { useState } from "react";
import { AddVentureCard } from "../../components/AddVentureCard";

export default function Dashboard() {
  const [active, setActive] = useState("Empreendimentos");

  //whether have business or not.
  const data: any[] = [];

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
              {data.length ? (
                data.map((_, index) => <Card key={index} />)
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
