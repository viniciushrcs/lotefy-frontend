import logo from "../../public/images/Logo.png";
import NextImage from "next/image";
import { Image, Loader, Text } from "@mantine/core";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function CreatedAccount() {
  useEffect(() => {
    var duration = 30 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 10, spread: 360, ticks: 200, zIndex: 0 };

    var vector = confetti.shapeFromPath({
      path: "M7.11328 4.64783L4.14594 19.961L18.0412 23.2311L15.0738 38.5442L28.9691 41.8144L26.0018 57.1275",
      //@ts-ignore
      matrix: [1, 0, 0, 1, 0, 0],
    });

    var elipseVector = confetti.shapeFromPath({
      path: "M36.6624 27.9693C32.8472 29.352 28.7959 29.6852 24.8597 28.9528C20.9241 28.2204 17.2168 26.4442 14.0541 23.782C10.8913 21.1198 8.36041 17.6453 6.68339 13.6528C5.00607 9.65963 4.2316 5.26358 4.43822 0.842482",
      //@ts-ignore
      matrix: [1, 0, 0, 1, 0, 0],
    });

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      var particleCount = 3;

      confetti({
        ...defaults,
        shapes: [elipseVector],
        colors: ["#56D863", "#FFE777"],
        particleCount,
        // Definindo uma origem no topo da tela com variação na posição X
        origin: { x: Math.random(), y: 0 },
        // Velocidade de queda positiva
        startVelocity: randomInRange(5, 10),
        // Direção da queda (para baixo)
        // tilt: randomInRange(10, 90),
        // Velocidade de rotação
        // rotation: randomInRange(0, 360),
      });

      confetti({
        ...defaults,
        shapes: [vector],
        colors: ["#56D863", "#FFE777"],
        particleCount,
        // Definindo uma origem no topo da tela com variação na posição X
        origin: { x: Math.random(), y: 0 },
        // Velocidade de queda positiva
        startVelocity: randomInRange(5, 10),
        // Direção da queda (para baixo)
        // tilt: randomInRange(10, 90),
        // Velocidade de rotação
        // rotation: randomInRange(0, 360),
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
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
