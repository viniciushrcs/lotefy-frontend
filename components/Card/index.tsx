import { Paper, Text } from "@mantine/core";
import { AnyObject } from "../../services/http";

export function Card({ ventureData }: { ventureData: AnyObject }) {
  return (
    <Paper
      withBorder
      radius="md"
      className="cursor-pointer overflow-hidden transition-transform duration-150 ease-in-out shadow-md hover:scale-105 h-[20rem] w-[100%] bg-[#FFF]"
      style={{ borderLeft: "solid 4px #56D963" }}
    >
      <Text size="xl" fw={500} mt="md">
        {ventureData.nome}
      </Text>
      <Text size="sm" mt="sm" c="dimmed">
        Clique para saber mais.
      </Text>
    </Paper>
  );
}
