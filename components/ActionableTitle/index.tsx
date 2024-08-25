import { Button, Flex, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

type ActionableTitleProp = { title: string; titleButton: string, onClickButton: () => void };

export default function ActionableTitle({ title, titleButton, onClickButton }: ActionableTitleProp) {
  return (
    <Flex mih={65} align="center" justify="space-between">
      <Text size="xl" fw={600}>
        {title}
      </Text>
      <Button onClick={onClickButton} variant="filled" color="teal" rightSection={<IconArrowRight size={14} />}>
        {titleButton}
      </Button>
    </Flex>
  );
}
