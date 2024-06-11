import { Avatar, Button, Card, Skeleton, Text } from "@mantine/core";
import { Header } from "../../components/Header";
import withAuth from "../../components/WithAuth";
import { IconArrowNarrowLeft, IconEdit } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "../../services/user";
import { SignUpContext } from "../../context/SignUpContext";
import { Regex } from "../../helpers/regex";

function Profile() {
  const router = useRouter();
  const { updateUserData, userData } = useContext(SignUpContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("bearerToken");
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const response = await User.userInfo(token);
        console.log(response, "LELELELEL");
        updateUserData({
          userName: response.data.user_metadata.name,
          userEmail: response.data.user_metadata.email,
        });
      } catch (error) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="bg-[#F8F9FA]">
      <Header />
      <div
        className="h-[8rem] w-[100%] "
        style={{
          background: "linear-gradient(90deg, #56d963 0%, #268830 100%)",
        }}
      >
        <Button
          leftSection={<IconArrowNarrowLeft />}
          className="mt-[1rem] ml-[1rem] border-none focus:bg-transparent hover:bg-transparent "
          variant="outline"
          color="white"
          size="12px"
          h={30}
          onClick={() => router.push("/dashboard")}
        >
          Voltar para o dashboard
        </Button>
      </div>

      <div className="h-screen flex justify-center">
        <div
          className="h-[120px] shadow-[0px_2px_5.5px_0px_rgba(0,0,0,0.2)] rounded-[15px] bg-white w-4/5 mt-[70px] flex items-center p-[20px] gap-[2rem] absolute top-[6rem] backdrop-blur-[15px]"
          style={{ backgroundColor: "rgb(255 255 255 / 60%)" }}
        >
          <Avatar color="cyan" radius="md" h={"90px"} w={"90px"}>
            {Regex.getInitials(userData.userName?.toString())}
          </Avatar>
          <div className="w-full h-full flex flex-col justify-between">
            <div>
              <Skeleton visible={loading} height={20} radius="xl" width="50%">
                <Text className="text-[1rem] font-semibold tracking-[1px]">
                  {userData.userName?.toString()}
                </Text>
              </Skeleton>
              <Text className="text-[0.8rem] tracking-[1px] mt-[5px]">
                Loteador
              </Text>
            </div>
            <div>
              <Button
                h="28px"
                w="90px"
                radius="sm"
                color="#56D963"
                p={0}
                leftSection={<IconEdit size={12} />}
              >
                Editar
              </Button>
            </div>
          </div>
        </div>
        <Card className="h-[300px] w-[80%] mt-[8rem] shadow-[0px_2px_5.5px_0px_rgba(0,0,0,0.2)] rounded-[15px] p-[20px]">
          <h1 className="text-lg not-italic font-bold leading-[140%]">
            Informações do perfil
          </h1>

          <div className="text-xs not-italic font-normal leading-[150%] flex gap-[10px] mb-[10px]">
            <b>Nome:</b>
            <Skeleton visible={loading} height={12} radius="xl" width="50%">
              {userData.userName?.toString()}
            </Skeleton>
          </div>
          <div className="text-xs not-italic font-normal leading-[150%] flex gap-[10px] mb-[10px]">
            <b>E-mail:</b>
            <Skeleton visible={loading} height={12} radius="xl" width="50%">
              {userData.userEmail?.toString()}
            </Skeleton>
          </div>
          <div className="text-xs not-italic font-normal leading-[150%] flex gap-[10px] mb-[10px]">
            <b>Celular:</b> (11) 991989952
          </div>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(Profile);
