import NextImage from "next/image";
import { Anchor, Button, Image, Text } from "@mantine/core";
import BackButton from "../../public/icons/BackButton.svg";

interface Props {
  icon: any;
  inputHeader: string;
  inputDescription: string;
  buttonName?: string;
  backAnchorName?: string;
  prevStep?: any;
  nextStep?: any;
  children: React.ReactNode;
  isGrid?: boolean;
}

export default function RegisterInput({
  icon,
  inputHeader,
  inputDescription,
  buttonName,
  backAnchorName,
  prevStep,
  nextStep,
  children,
  isGrid,
}: Props) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`max-h-[22.8rem] max-w-[40rem] ${
          isGrid ? "w-[32rem]" : "w-[22rem]"
        } h-[22.8rem]`}
      >
        <div className="flex justify-center items-center flex-col text-center">
          <Image
            component={NextImage}
            src={icon}
            alt="Uses icon"
            h={48}
            w={48}
            className="mb-[2rem]"
          />
          <Text className="text-[#0F1728] text-[2rem] font-medium leading-[2.3rem] mb-3">
            {inputHeader}
          </Text>
          <Text className="text-[#767A86] text-base font-normal leading-6 mb-[2rem]">
            {inputDescription}
          </Text>
        </div>
        {children}
        {buttonName && (
          <Button
            variant="filled"
            color="#56D963"
            radius="xs"
            size="lg"
            fullWidth
            style={{ "--button-fz": "16px" }}
            className="mb-[2rem] font-light"
            onClick={nextStep}
          >
            {buttonName}
          </Button>
        )}
        {backAnchorName && (
          <div className="flex gap-[0.25rem] justify-center items-center">
            <Image
              component={NextImage}
              src={BackButton}
              alt="Logo"
              h={20}
              w={20}
            />
            <Anchor
              className="text-[#56D963] text-sm font-normal leading-5"
              onClick={prevStep}
            >
              {backAnchorName}
            </Anchor>
          </div>
        )}
      </div>
    </div>
  );
}
