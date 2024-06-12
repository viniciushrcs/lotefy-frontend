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
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconSettings, IconSettingsFilled, IconUserFilled } from "@tabler/icons-react";
import logo from "../../public/images/Logo.png";
import Link from "next/link";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className="h-[5rem] pr-[3rem] pl-[3rem]">
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
          <Group className="flex gap-[2rem]" visibleFrom="sm">
            <Link href="/profile" className="no-underline text-[black]">
                <div className="items-center border border-[#D4D4D4] border-solid flex p-2 rounded-xl text-[#FFF] hover:bg-[#D4D4D4]">
                  <IconUserFilled style={{ height: 18 }} color="black" />
                </div>
            </Link>
              <Menu shadow="md" width={200}>
             <Menu.Target>
              <div className="items-center flex p-2 border border-[#D4D4D4] border-solid rounded-xl text-[#FFF] hover:bg-[#D4D4D4]">
                  <IconSettingsFilled style={{ height: 18 }} color="black" />
               </div>
            </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                  Configurações
                </Menu.Item>  
                <Link href="/login" className="no-underline text-[black]" onClick={() => localStorage.clear()}>              
                <Menu.Item
                  leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                  Sair
                </Menu.Item>
                </Link>
              </Menu.Dropdown>
            </Menu>
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
        withCloseButton={false}
      >
        <div className="flex justify-between p-[1rem]">
          <Image
            component={NextImage}
            src={logo}
            alt="Logo"
            h={25}
            w={170}
            priority
          />
        <Drawer.CloseButton></Drawer.CloseButton>
         
        </div>
       
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <div className="ml-2 mr-2 flex gap-2 rounded-[12px] items-center cursor-pointer hover:bg-[#56D963] hover:text-[#FFF] p-[10px]">
            <IconUserFilled style={{ height: 18 }} className="hover:color-[white]" />
            <Text className="text-[20px]">Perfil</Text>
          </div>

          <div className="ml-2 mr-2 flex gap-2 rounded-[12px] items-center cursor-pointer hover:bg-[#56D963] hover:text-[#FFF] p-[10px]">
            <IconSettingsFilled style={{ height: 18 }} className="hover:color-[white]" />
            <Text className="text-[20px]">Configurações</Text>
          </div>
        </ScrollArea>
      </Drawer>
      <Divider />
    </Box>
  );
}
