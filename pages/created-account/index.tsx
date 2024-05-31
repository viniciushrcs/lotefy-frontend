import logo from "../../public/images/Logo.png";
import NextImage from "next/image";
import { Image, Loader, Text } from "@mantine/core";
import GreenVector from "../../public/icons/green-vector.svg";
import ElipseVector from "../../public/icons/elipse-vector.svg";
import CircleVector from "../../public/icons/circle-vector.svg";
import GreenElipse from "../../public/icons/green-elipse.svg";
import YellowVector from "../../public/icons/yellow-vector.svg";
import styles from "../../styles/animations.module.css";
import { useContext, useEffect } from "react";
import { SignUpContext } from "../../context/SignUpContext";
import { useRouter } from "next/router";

export default function CreatedAccount() {
  const { userData } = useContext(SignUpContext);
  const router = useRouter();

  useEffect(() => {
    if (userData.accessToken) {
      localStorage.setItem("bearerToken", userData.accessToken.toString());
      setTimeout(() => {
        router.push("/dashboard");
      }, 7000);
    } else {
      router.push("/login");
    }
  }, [userData]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center top-0 absolute gap-[10rem]">
        <Image
          component={NextImage}
          src={GreenVector}
          alt="green vector"
          h={50}
          w={50}
          className={`${styles["fall-animation"]}`}
          style={{ "--i": 6 }}
        />
        <Image
          component={NextImage}
          src={YellowVector}
          alt="yellow vector"
          h={50}
          w={50}
          style={{ "--i": 4 }}
          className={`${styles["fall-animation"]}`}
        />
        <Image
          component={NextImage}
          src={GreenVector}
          alt="green vector"
          h={50}
          w={50}
          className={`${styles["fall-animation"]}`}
          style={{ "--i": 3 }}
        />
        <Image
          component={NextImage}
          src={ElipseVector}
          alt="elipse vector"
          h={50}
          w={50}
          style={{ "--i": 5 }}
          className={`${styles["fall-animation"]}`}
        />
        <Image
          component={NextImage}
          src={YellowVector}
          alt="yellow vector"
          h={50}
          w={50}
          style={{ "--i": 4 }}
          className={`${styles["fall-animation"]}`}
        />
        <Image
          component={NextImage}
          src={GreenVector}
          alt="green vector"
          h={50}
          w={50}
          className={`${styles["fall-animation"]}`}
          style={{ "--i": 7 }}
        />
        <Image
          component={NextImage}
          src={CircleVector}
          alt="circle vector"
          h={20}
          w={20}
          style={{ "--i": 1 }}
          className={`${styles["fall-animation"]}`}
        />

        <Image
          component={NextImage}
          src={GreenElipse}
          alt="green elipse"
          h={40}
          w={40}
          style={{ "--i": 2 }}
          className={`${styles["fall-animation"]}`}
        />
      </div>
      <div className="gap-[2.1rem] flex flex-col justify-center items-center">
        <Text className="text-[3.3rem]">👏</Text>
        <Image component={NextImage} src={logo} alt="Logo" h={56} w={328} />
        <Text className="text-[#0F1728] text-5xl font-medium leading-[140%] tracking-[0.48px]">
          Conta criada com sucesso!
        </Text>
        <div className="flex justify-center items-center gap-[10px]">
          <Loader color="#56D863" size="xs" />
          <Text>Aguarde enquanto geramos sua plataforma...</Text>
        </div>
      </div>
    </div>
  );
}
