import { Anchor, Box, Breadcrumbs, Text } from '@mantine/core';
import { Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';

type BreadcrumbProps = { data: { title: string; href: string; }[] }

export function Breadcrumb({ data }: BreadcrumbProps) {
  const router = useRouter();

  const items = data.map((item, index) => {
    if (!item.href.length) {
      return (
        <Text c="dark" size="sm" fw={500} key={`breadcrumb-${index}`}>
          {item.title}
        </Text>
      );
    }

    return (
      <Anchor
        c="gray"
        fw={500}
        fz="sm"
        href="#"
        onClick={() => router.push(item.href)}
        key={`breadcrumb-${index}`}
      >
        {item.title}
      </Anchor>
    );
  });

  return (
    <Box component='div' my={8}>
      <Breadcrumbs separator="→" separatorMargin="sm" mt="xs">
        {items}
      </Breadcrumbs>
    </Box>
  );
}
