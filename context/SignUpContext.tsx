import { createContext, useState, useMemo } from "react";

type Props = {
  children: React.ReactNode;
};

interface SignUpStore {
  userData: Record<string, string | undefined>;
  updateUserData: (_newUserData: Record<string, string>) => void;
}

export const SignUpContext = createContext<SignUpStore>({
  userData: {},
  updateUserData: () => {},
});

export const SignUpProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<Record<string, string>>({});

  const updateUserData = (newData: Record<string, string>) => {
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
