import { Select} from "@mantine/core";


export function SelectFilter() {
  
  return (
<Select
              label=""
              clearable
              defaultValue=""
              placeholder="Ordenar por"
             
              data={['Mais recentes', 'Mais antigos', '', 'Vue']}
            />)
}
