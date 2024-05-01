import NextImage from "next/image";
import { Image, Stepper } from "@mantine/core";
import * as Icons from "../../public/icons/index";

interface Data {
  label: string;
  description: string;
  icon: typeof Icons.UserIcon;
}
interface Props {
  active: number;
  data: Data[];
}

export default function StepperComponent({ active, data }: Props) {
  return (
    <>
      <Stepper
        active={active}
        orientation="vertical"
        color="#56D963"
        iconSize={49}
        allowNextStepsSelect={false}
        styles={{
          stepIcon: {
            backgroundColor: "#D6FFDA",
            border: "8px solid #D7F5DA",
          },
          stepBody: {
            color: "#0F1728",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
            fontFamily: "DM Sans",
          },
        }}
        completedIcon={
          <Image
            component={NextImage}
            src={Icons.CompletedIcon}
            alt="Logo"
            h={37}
            w={37}
            style={{
              backgroundColor: "#56D963",
              padding: "7px",
              borderRadius: "28px",
            }}
          />
        }
      >
        {data.map((e) => {
          return (
            <Stepper.Step
              label={e.label}
              description={e.description}
              icon={
                <Image
                  component={NextImage}
                  src={e.icon}
                  alt="Logo"
                  h={20}
                  w={20}
                />
              }
            />
          );
        })}
      </Stepper>
    </>
  );
}
