import React, { useEffect, useContext, ComponentType } from "react";
import { useRouter } from "next/router";
import { User } from "../../services/user";
import { SignUpContext } from "../../context/SignUpContext";

interface WithAuthProps {
  updateUserData: (data: { userId: string }) => void;
}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const { updateUserData } = useContext(SignUpContext);

    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem("bearerToken");
        if (!token) {
          router.replace("/login");
          return;
        }

        try {
          const response = await User.userInfo(token);
          updateUserData({ userId: response.data.id });
        } catch (error) {
          router.replace("/login");
        }
      };

      fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
