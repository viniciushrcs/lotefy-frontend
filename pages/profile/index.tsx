import { Avatar, Button, Text } from "@mantine/core";
import { Header } from "../../components/Header";
import withAuth from "../../components/WithAuth";
import { IconEdit } from "@tabler/icons-react";

function Profile() {
  return (
    <div className="bg-[#F8F9FA]">
      <Header />
      <div className="h-[8rem] w-[100%] " style={{background:'linear-gradient(90deg, #56d963 0%, #268830 100%)'}}>
      </div>
      
     <div className="bg-[#F8F9FA] h-screen flex justify-center">
        <div className="h-[180px] shadow-[0px_2px_5.5px_0px_rgba(0,0,0,0.02)] backdrop-blur-[10.49px] rounded-[15px] border-[1.5px] border-solid border-white bg-white w-4/5 mt-[70px] flex items-center p-[30px] gap-[2rem] absolute top-24">
        <div>
          <Avatar color="cyan" radius="md" h={'120px'} w={'120px'}>
            CR
          </Avatar>
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          <div>
          <Text className="text-[1.4rem] font-semibold tracking-[1px]">Carol Ramos</Text>
          <Text className="text-[1.1rem] tracking-[1px]">Loteador</Text>    
          </div>
          <div>
            <Button  size="sm" radius="md" color='#56D963' leftSection={<IconEdit size={14} /> } >
              Editar
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);
