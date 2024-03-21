import NextImage from "next/image";
import { Anchor, Button, Image, Text, TextInput } from "@mantine/core";
import logo from "../../public/images/Logo.png";
import Background from "../../public/images/Section.png";
import RectangleIcon from "../../public/icons/Rectangle.svg";
import BackButton from "../../public/icons/BackButton.svg";

export default function Login() {
  return (
    <div className="grid grid-cols-[1fr_1.32fr] h-screen">
      <div className="flex justify-center items-center">
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
        <div className="max-h-[22.8rem] max-w-[22rem] w-[22rem] h-[22.8rem]">
          <Image
            component={NextImage}
            src={BackButton}
            alt="Logo"
            h={24}
            w={24}
            className="mb-8"
          />
          <Text className="text-[#0F1728] text-[2rem] font-medium leading-[2.3rem] mb-3">
            Login
          </Text>
          <Text className="text-[#767A86] text-base font-normal leading-6 mb-[2rem]">
            Faça login para acompanhar seu desempenho e verificar seus
            investimentos imobiliários!
          </Text>
          <TextInput
            placeholder="Seu e-mail"
            radius="xs"
            size="md"
            className="mb-[1.5rem]"
          />
          <Button
            variant="filled"
            color="#56D963"
            radius="xs"
            size="md"
            fullWidth
            style={{ "--button-fz": "16px" }}
            className="mb-[2rem]"
          >
            iniciar
          </Button>
          <div className="flex gap-[0.25rem]  justify-center items-center ">
            <Text className="text-[#767A86] text-sm font-normal leading-5">
              Ainda não tem cadastro?
            </Text>
            <Anchor
              href="http://localhost:3000/signup"
              className="text-[#56D963] text-sm font-normal leading-5"
            >
              Crie uma conta
            </Anchor>
          </div>
          <Text className="absolute text-[#767A86] text-[9px] font-normal leading-5 left-9 bottom-[29px]">
            Faça parte do mercado mais rentável do mundo.
          </Text>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${Background.src})` }}
        className=" bg-cover bg-center"
      >
        <div className=" flex-col justify-center items-start gap-[0.9375rem] pl-[10.3125rem] pr-[10.375rem] pt-[13.625rem] pb-[13.5625rem]">
          <div className="max-w-[1.875rem] max-h-[2.125rem]">
            <Image
              component={NextImage}
              src={RectangleIcon}
              alt="green rectangle"
              h={34}
              w={30}
            />
          </div>

          <Text className="text-white text-[2.5rem] not-italic font-medium leading-[60px] tracking-[-0.8px]">
            Desenvolva seu empreendimento com a plataforma que gerencia + 40
            milhões de reais em contratos de funding imobiliário e + 150 milhões
            de reais em V.G.V de empreendimentos
          </Text>
        </div>
      </div>
    </div>
  );
}
