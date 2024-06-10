import { Avatar } from "@mantine/core";
import { Header } from "../../components/Header";
import withAuth from "../../components/WithAuth";

function Profile() {
  return (
    <div className="bg-[#F8F9FA]">
      <Header />
      <div className="bg-[#F8F9FA] h-screen flex justify-center">
        <div className="h-[113px] shadow-[0px_2px_5.5px_0px_rgba(0,0,0,0.02)] backdrop-blur-[10.49px] rounded-[15px] border-[1.5px] border-solid border-white bg-white w-4/5 mt-[70px] flex items-center p-[30px]">
          <Avatar color="cyan" radius="md" size="lg">
            CR
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);
