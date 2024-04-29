import { Paper, Text } from "@mantine/core";

export function Card() {
  return (
    <Paper
      withBorder
      radius="md"
      className="cursor-pointer overflow-hidden transition-transform duration-150 ease-in-out shadow-md hover:scale-105 h-[20rem] w-[100%] bg-[#FFF]"
      style={{ borderLeft: "solid 4px #56D963" }}
    >
      <Text size="xl" fw={500} mt="md">
        Theming documentation
      </Text>
      <Text size="sm" mt="sm" c="dimmed">
        Extend default theme with any amount of additional colors, replace
        shadows, radius, spacing, fonts and many other properties to match your
        design requirements. Mantine theme is just an object, you can subscribe
        to it in any part of application via context and use it to build your
        own components.
      </Text>
    </Paper>
  );
}
