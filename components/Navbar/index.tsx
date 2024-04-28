import { useState } from "react";
import { Group } from "@mantine/core";
import { IconHomeFilled, IconFileFilled } from "@tabler/icons-react";

const data = [
  { link: "", label: "Empreendimentos", icon: IconHomeFilled },
  { link: "", label: "Portal da transparência", icon: IconFileFilled },
];

export function LeftNavbar() {
  const [active, setActive] = useState("Empreendimentos");

  const links = data.map((item) => (
    <a
      className={`flex items-center p-2 rounded-sm text-[#A0AEC0] h-[50px] mb-3 no-underline ${
        item.label === active
          ? "shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.06)] rounded-[15px] bg-[#FFF] text-[16px]"
          : "hover:bg-gray-100 hover:text-gray-800 hover:rounded-[15px] text-[14px]"
      }`}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
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

  return (
    <Group>
      <nav className="h-[100vh] w-[300px] p-4 flex flex-col border-r border-gray-300 bg-[#F8F9FA]">
        <div className="flex flex-col flex-1">{links}</div>
      </nav>
    </Group>
  );
}
