import { useMemo, useState } from 'react';
import FoodContext from './FoodContext';

interface FoodProviderProps {
  children: React.ReactNode;
}

function FoodProvider({ children }: FoodProviderProps) {
  const [inputSearch, setInputSearch] = useState<any>([]);
  const [stateGlobal, setStateGlobal] = useState<any>([]);
  const [idDetails, setIdDetails] = useState<any>([]);
  const [localItems, setLocalItems] = useState<any>({});
  const values = useMemo(() => ({
    inputSearch,
    stateGlobal,
    setStateGlobal,
    setInputSearch,
    setIdDetails,
    localItems,
    setLocalItems,
    idDetails,
  }), [inputSearch, stateGlobal, idDetails, localItems]);

  return (
    <FoodContext.Provider value={ values }>
      {children}
    </FoodContext.Provider>
  );
}
export default FoodProvider;
