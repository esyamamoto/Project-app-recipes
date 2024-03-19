import { createContext } from 'react';
import { GlobalType } from '../type';

const GlobalContext = createContext<GlobalType>({
  searchText: {
    text: '',
    type: '',
  },
  searchType: {
    text: '',
    type: '',
  },
  searchData: [],
});

export default GlobalContext;
