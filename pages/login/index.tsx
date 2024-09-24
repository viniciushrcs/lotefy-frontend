import NextImage from "next/image";
import { Anchor, Button, Image, rem, Text, TextInput } from "@mantine/core";
import logo from "../../public/images/Logo.png";
import Background from "../../public/images/Section.png";
import RectangleIcon from "../../public/icons/Rectangle.svg";
import BackButton from "../../public/icons/BackButton.svg";
import { FormEvent, useContext, useState } from "react";
import { LoginService } from "../../services/login";
import { SignUpContext } from "../../context/SignUpContext";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import "@mantine/notifications/styles.css";

type KeyboardInputNames = "email-input" | "password-input";

export default function Login() {
  const [inputs, setInputs] = useState<Record<KeyboardInputNames, string>>({
    "email-input": "",
    "password-input": "",
  });

  const { updateUserData } = useContext(SignUpContext);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const router = useRouter();

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>,
    inputName: KeyboardInputNames
  ) => {
    setEmailError("");
    setPasswordError("");
    const { value } = event.currentTarget;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      if (inputs["email-input"].length && inputs["password-input"].length) {
        const response = await LoginService.login(
          inputs["email-input"],
          inputs["password-input"]
        );

        setCookie(null, "LotefyAPI.token", response?.data?.accessToken, {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        });
        router.push("/dashboard");
        return response;
      } else return null;
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Ops! Algo deu errado",
        message: "Verifique seu e-mail e senha e tente novamente.",
        icon: xIcon,
        autoClose: 4000,
        withCloseButton: true,
        position: "top-center",
      });
    }
  };

  const verifyFields = () => {
    if (!inputs["email-input"].length) setEmailError("E-mail inválido");
    if (!inputs["password-input"].length) setPasswordError("Senha inválida");
  };

  const handleSubmit = () => {
    verifyFields();
    handleLogin();
  };

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
            type="email"
            value={inputs["email-input"]}
            onChange={(event) => handleInputChange(event, "email-input")}
            error={emailError}
          />
          <TextInput
            type="password"
            placeholder="••••••••"
            radius="xs"
            size="md"
            className="mb-[1.5rem]"
            value={inputs["password-input"]}
            onChange={(event) => handleInputChange(event, "password-input")}
            error={passwordError}
          />

          <Button
            variant="filled"
            color="#56D963"
            radius="xs"
            size="md"
            fullWidth
            style={{ "--button-fz": "16px" }}
            className="mb-[2rem]"
            onClick={() => {
              handleSubmit();
            }}
          >
            iniciar
          </Button>
          <div className="flex gap-[0.25rem]  justify-center items-center ">
            <Text className="text-[#767A86] text-sm font-normal leading-5">
              Ainda não tem cadastro?
            </Text>
            <Anchor
              href={"/signup"}
              className="text-[#56D963] text-sm font-normal leading-5"
            >
              Crie uma conta
            </Anchor>
          </div>
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
