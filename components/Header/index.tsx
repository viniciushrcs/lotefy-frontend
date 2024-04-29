import NextImage from "next/image";
import {
  Group,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettingsFilled, IconUserFilled } from "@tabler/icons-react";
import logo from "../../public/images/Logo.png";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className="h-[5rem] pr-6 pl-4">
        <Group justify="space-between" h="100%">
          <Image
            component={NextImage}
            src={logo}
            alt="Logo"
            h={25}
            w={170}
            className="ml-[1rem]"
            priority
          />
          <Group className="flex" visibleFrom="sm">
            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#D7F5DA] hover:text-gray-800 hover:rounded-[15px] text-[14px] p-[10px]">
              <div className="items-center flex p-2 bg-[#56D963] rounded-xl text-[#FFF]">
                <IconUserFilled style={{ height: 18 }} />
              </div>
              <Text>Perfil</Text>
            </div>
            <div className="flex gap-2 items-center cursor-pointer hover:bg-[#D7F5DA] hover:text-gray-800 hover:rounded-[15px] text-[14px] p-[10px]">
              <div className="items-center flex p-2 bg-[#56D963] rounded-xl text-[#FFF]">
                <IconSettingsFilled style={{ height: 18 }} />
              </div>
              <Text>Configurações</Text>
            </div>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <div className="ml-2 mr-2 flex gap-2 rounded-[12px] items-center cursor-pointer hover:bg-[#56D963] hover:text-[#FFF] p-[10px]">
            <Text className="text-[20px]">Perfil</Text>
          </div>

          <div className="ml-2 mr-2 flex gap-2 rounded-[12px] items-center cursor-pointer hover:bg-[#56D963] hover:text-[#FFF] p-[10px]">
            <Text className="text-[20px]">Configurações</Text>
          </div>
        </ScrollArea>
      </Drawer>
      <Divider />
    </Box>
  );
}
