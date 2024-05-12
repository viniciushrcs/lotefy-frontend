import { createContext, useState, useMemo } from "react";

type Props = {
  children: React.ReactNode;
};

export const SignUpContext = createContext<SignUpStore>({
  userData: {},
  updateUserData: () => {},
});

interface SignUpStore {
  userData: Record<string, string | any[] | undefined>;
  updateUserData: (_newUserData: Record<string, string | any[]>) => void;
}

export const SignUpProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<Record<string, string | any[]>>({});

  const updateUserData = (newData: Record<string, string | any[]>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...newData,
    }));
  };

  const contextValue = useMemo<SignUpStore>(
    () => ({
      userData,
      updateUserData,
    }),
    [userData, updateUserData]
  );

  return (
    <SignUpContext.Provider value={contextValue}>
      {children}
    </SignUpContext.Provider>
  );
};
