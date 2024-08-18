import { Button, Paper, Text } from "@mantine/core";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import Link from "next/link";

export function AddVentureCard() {
  return (
    <Paper
      withBorder
      radius="md"
      className="cursor-pointer overflow-hidden bg-[#FFF] h-[250px] w-[100%] text-center p-4 justify-evenly flex-col flex"
    >
      <Text className="text-[22px]">Cadastrar empreendimento</Text>
      <Text c="dimmed">Você não possui empreendimentos cadastrados</Text>
      <div>
        <Link href="/venture-registration">
          <Button
            leftSection={<IconSquareRoundedPlusFilled size={20} />}
            variant="filled"
            color="#56D963"
            className="text-[16px] h-[3rem] rounded-[12px]"
            onClick={() => {}}
          >
            Cadastrar novo
          </Button>
        </Link>
      </div>
    </Paper>
  );
}
