import { Card, Text, SimpleGrid } from "@mantine/core";

type CardDetailProps = {
  title: string;
  details: any;
};

export function CardDetail({ title, details }: CardDetailProps) {
  const content = () => {
    switch (title) {
      case "Dados de sócios":
        return Object.entries(details).map(([key, value], index) => (
          <div key={`${key}${index}`}>
            {index > 0 ? <hr className="my-4 text-gray-600" /> : null}
            <SimpleGrid className="mt-4" cols={1} key={key}>
              <Text size="md" fw={600}>
                {key}
              </Text>

              <SimpleGrid cols={1}>
                {value && Array.isArray(value) && value.length > 0 ? (
                  value.map((associate, index) => (
                    <div key={`${associate}${index}`}>
                      {index > 0 ? (
                        <hr className="mb-4 text-gray-600"></hr>
                      ) : null}
                      <SimpleGrid
                        cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                      >
                        {Object.entries(associate).map(
                          ([itemTitle, itemValue]) => {
                            console.log(itemValue)
                            console.log(typeof itemValue)
                            
                            return (
                            <div key={itemTitle}>
                              <Text className="text-gray-600" size="md">
                                {itemTitle}
                              </Text>
                              {itemValue && typeof itemValue === "string" ? (
                                <Text className="text-gray-400" size="sm">
                                  {itemValue}
                                </Text>
                              ) : (
                                <Text className="text-gray-400" size="md">
                                  -
                                </Text>
                              )}
                            </div>
                          )}
                        )}
                      </SimpleGrid>
                    </div>
                  ))
                ) : (
                  <Text className="text-gray-600" size="md">
                    Nenhum sócio registrado
                  </Text>
                )}
              </SimpleGrid>
            </SimpleGrid>
          </div>
        ));

      default:
        return (
          <SimpleGrid className="mt-4" cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
            {Object.entries(details).map(([key, value], index) => (
              <div key={`${key}${index}`}>
                <Text className="text-gray-600" size="md">
                  {key}
                </Text>
                {value && typeof value === "string" ? (
                  <Text className="text-gray-400" size="sm">
                    {value}
                  </Text>
                ) : (
                  <Text className="text-gray-400" size="md">
                    -
                  </Text>
                )}
              </div>
            ))}
          </SimpleGrid>
        );
    }
  };

  return (
    <Card className="mb-4 p-4 md:p-8" shadow="sm" radius="md">
      <Text size="xl" fw={700}>
        {title}
      </Text>
      {content()}
    </Card>
  );
}
