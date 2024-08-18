import { useState } from "react";
import { Group, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import { IconHomeFilled, IconFileFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface NavbarLinkProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const data = [
  { link: "/dashboard", label: "Empreendimentos", icon: IconHomeFilled },
  { link: "", label: "Portal da transparência", icon: IconFileFilled },
];

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {


  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={`w-[50px] h-[50px] rounded-md flex items-center justify-center hover:bg-[#D7F5DA] 
          ${
            active
              ? "rounded-[15px] bg-[#56D963] text-[#FFF]"
              : "text-[#56D963]"
          }`}
        data-active={active || undefined}
      >
        <Icon className="w-5 h-5" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function Navbar({
  active,
  setActive,
}: {
  active: string;
  setActive: (arg: string) => void;
}) {
  const router = useRouter()
  const links = data.map((item, index) => (
    <a
      key={index}
      className={`flex items-center p-2 rounded-[14px] text-[#A0AEC0] h-[50px] mb-3 no-underline ${
        item.label === active
          ? "shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.06)] rounded-[15px] bg-[#FFF] text-[16px]"
          : "hover:bg-[#D7F5DA] hover:text-gray-800 hover:rounded-[15px] text-[14px]"
      }`}
      data-active={item.label === active || undefined}
      href=""
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.link);
      }}
    >
      <div
        className={`items-center flex p-2 ${
          item.label === active
            ? "bg-[#56D963] rounded-xl text-[#FFF]"
            : "bg-[#FFF] rounded-xl text-[#56D963]"
        }`}
      >
        <item.icon className="w-5 h-5" />
      </div>
      <span className="ml-2">{item.label}</span>
    </a>
  ));

  const linksResponsive = data.map((item, index) => (
    <NavbarLink
      key={index}
      icon={item.icon}
      label={item.label}
      active={item.label === active}
      onClick={() => setActive(item.label)}
    />
  ));

  return (
    <>
      <Group visibleFrom="sm" className="h-screen">
        <nav className="h-[100vh] w-[300px] p-4 flex flex-col border-r border-gray-300 bg-[#F8F9FA]">
          <div className="flex flex-col flex-1">{links}</div>
        </nav>
      </Group>
      <Group hiddenFrom="sm" className="h-screen">
        <nav
          className="w-[80px] h-[100vh] p-4 flex flex-col"
          style={{ borderRight: "solid 1px lightgray" }}
        >
          <div className="flex-1">
            <Stack justify="center" gap={0}>
              {linksResponsive}
            </Stack>
          </div>
        </nav>
      </Group>
    </>
  );
}
