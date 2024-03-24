import { Button, Modal, ScrollArea, Text } from "@mantine/core";

export default function PrivacyModal({
  opened,
  close,
  setFirstChecked,
  setSecondChecked,
}: any) {
  const handleButtonClick = () => {
    setFirstChecked(true);
    setSecondChecked(true);
    close(true);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      color="#56D863"
      size={"42%"}
      styles={{
        content: {
          marginTop: "2%",
          height: "95%",
          width: "41%",
          borderRadius: 24,
        },
        body: {
          height: "90%",
        },
      }}
    >
      <Text className="text-[#0F1728] text-center text-[32px] not-italic font-bold leading-[38px] mb-[2rem]">
        Termos de uso e politica de privacidade
      </Text>
      <ScrollArea
        mah={550}
        styles={{ root: { height: "100%" } }}
        className="px-[2rem] mb-[1.6rem] h-full"
      >
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Perspiciatis, fugit quae possimus explicabo quaerat non iste atque?
          Eligendi quae illo, veniam ab adipisci ullam esse voluptas. Dolore
          deleniti laborum eius. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Perspiciatis, fugit quae possimus explicabo quaerat
          non iste atque? Eligendi quae illo, veniam ab adipisci ullam esse
          voluptas. Dolore deleniti laborum eius. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Perspiciatis, fugit quae possimus
          explicabo quaerat non iste atque? Eligendi quae illo, veniam ab
          adipisci ullam esse voluptas. Dolore deleniti laborum eius. Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis,
          fugit quae possimus explicabo quaerat non iste atque? Eligendi quae
          illo, veniam ab adipisci ullam esse voluptas. Dolore deleniti laborum
          eius. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Perspiciatis, fugit quae possimus explicabo quaerat non iste atque?
          Eligendi quae illo, veniam ab adipisci ullam esse voluptas. Dolore
          deleniti laborum eius. eius. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Perspiciatis, fugit quae possimus explicabo quaerat
          non iste atque? Eligendi quae illo, veniam ab adipisci ullam esse
          voluptas. Dolore deleniti laborum eius. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Perspiciatis, fugit quae possimus
        </Text>
      </ScrollArea>
      <div className="mx-8">
        <Button
          variant="filled"
          color="#56D963"
          radius="xs"
          size="lg"
          fullWidth
          onClick={() => handleButtonClick()}
        >
          Li e aceito os termos e condições da plataforma
        </Button>
      </div>
    </Modal>
  );
}
