import { Text } from "@mantine/core";
import { useState } from "react";
import StepperComponent from "../../components/Stepper";
import logo from "../../public/images/Logo.png";
import NextImage from "next/image";
import { Image } from "@mantine/core";
import { InputRegisterDisplayer } from "../../components/InputRegisterDisplayer";

export default function SignUp() {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 6 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className="grid grid-cols-[1.88fr_1fr] h-screen">
      <div className="flex justify-center items-center ">
        <Image
          component={NextImage}
          src={logo}
          alt="Logo"
          h={29}
          w={170}
          pos={"absolute"}
          left={34}
          top={35}
        />
        {InputRegisterDisplayer(active, prevStep, nextStep)}
      </div>
      <div className="p-12">
        <Text className="text-[#0F1728] text-center text-[2rem] font-medium leading-[38px] pb-[5rem]">
          Passos para criar sua conta no Lotefy
        </Text>
        <StepperComponent active={active} />
      </div>
    </div>
  );
}
