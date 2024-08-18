import { useRouter } from 'next/navigation'

import { Badge, Button, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { AnyObject } from "../../services/http";

export function Card({ ventureData }: { ventureData: AnyObject }) {
  const router = useRouter()

  const handleClickButton = () => {
    console.log(ventureData)
    router.push(`/enterprise/${ventureData.empreendimento_id}`)
  }

  return (
    <Paper
      withBorder
      radius="md"
      className="cursor-pointer overflow-hidden transition-transform duration-150 ease-in-out shadow-md hover:scale-105 h-[250px] w-[100%] bg-[#FFF] flex flex-col justify-between"
      style={{ borderLeft: "solid 6px #56D963", padding: '1rem' }}
    >
      <Stack> 
        <Text size="xl" fw={500}>
          {ventureData.nome}
        </Text>
      </Stack>

      <Divider mt="md" />

      <Stack mt="md">
        <Group>
          <Text size="sm" >
            Imóvel Integralizado:
          </Text>
          <Badge color={ventureData.imovel_integralizado ? "green" : "red"}>
            {ventureData.imovel_integralizado ? "Sim" : "Não"}
          </Badge>
        </Group>
        <Group>
          <Text size="sm" >
            SPE Constituída:
          </Text>
          <Badge color={ventureData.spe_constituida ? "green" : "red"}>
            {ventureData.spe_constituida ? "Sim" : "Não"}
          </Badge>
        </Group>
      </Stack>

      <Divider mt="md" />

      <Button onClick={handleClickButton} variant="outline" color="teal" fullWidth mt="md">
        Clique para saber mais
      </Button>
    </Paper>
  );
}
