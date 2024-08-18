import { ReactNode, useState } from "react";
import { Header } from "../Header"
import { Navbar } from "../Navbar"

type TemplateProps = {
  children: ReactNode;
  menuActive?: string;
}

export const Template = ({ children, menuActive = "" }: TemplateProps) => {
  const [active, setActive] = useState(menuActive);

  return (
    <div className="bg-[#F8F9FA]">
      <Header />
      <div className="flex">
        <Navbar active={active} setActive={setActive} />
        <div className="m-4 w-[100%]">{children}</div>
      </div>
    </div>
  )
}
