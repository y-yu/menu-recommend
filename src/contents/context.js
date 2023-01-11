// @flow
import { createContext } from 'react';

export const ResourceContext = createContext({type:'light'});
// export const Resource2Context = createContext('light');
// useContext
// useFoodNameDict
// export const UseFoodNameDictContext = createContext([{useFoodNameDict:{}},()=>{}]);
export const UseFoodNameDictContext = createContext([{},()=>{}]);
export const LikeAndDislikeFoodNameDictContext = createContext([{},()=>{}]);
export const AllFoodArrayContext = createContext([]);
export const AllFoodNameDictContext = createContext({});
