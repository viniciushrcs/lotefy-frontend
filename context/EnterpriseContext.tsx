import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface EnterpriseStore {
  enterpriseData: Record<string, string | any[] | undefined | File | null>;
  updateEnterpriseData: (
    _newUserData: Record<string, string | any[] | File | null>
  ) => void;
}

export const EnterpriseContext = createContext<EnterpriseStore>({
  enterpriseData: {},
  updateEnterpriseData: () => {},
});

export function EnterpriseProvider({ children }: Props) {
  const [enterpriseData, setEnterpriseData] = useState<
    Record<string, string | any[] | File | null>
  >({});

  const updateEnterpriseData = useCallback((
    newData: Record<string, string | any[] | File | null>
  ) => {
    setEnterpriseData(prevEnterpriseData => ({
      ...prevEnterpriseData,
      ...newData,
    }));
  }, []);

  const contextValue = useMemo<EnterpriseStore>(
    () => ({
      enterpriseData,
      updateEnterpriseData,
    }),
    [enterpriseData, updateEnterpriseData]
  );

  return (
    <EnterpriseContext.Provider value={contextValue}>
      {children}
    </EnterpriseContext.Provider>
  );
}

export function useData() {
  return useContext(EnterpriseContext);
}
