// @flow
import { createContext } from 'react';

//1回apiから取得したら不変のデータたち
export const AllFoodArrayContext = createContext([]);
export const AllFoodNameDictContext = createContext({});

//使用食材
export const UseFoodNameDictContext = createContext([{},()=>{}]);
//好き嫌い
export const LikeAndDislikeFoodNameDictContext = createContext([{},()=>{}]);
//使用するマシン
export const MachineContext = createContext(["",()=>{}]);
//栄養素と調理時間
export const NutritionAndTimeContext = createContext([{},()=>{}]);
//主食
export const StapleContext = createContext([{},()=>{}]);
//ジャンル
export const GenreContext = createContext([{},()=>{}]);
//人数
export const PeopleNumContext = createContext([{},()=>{}]);
//献立中のメニュー数
export const MenuNumContext = createContext([{},()=>{}]);
//好き嫌いの選ばれた名前のリスト
export const LikeAndDislikeFoodNameSelectedListContext = createContext([{},()=>{}]);
//amplifyのトークン
export const TokenContext = createContext(["",()=>{}]);
//メニュー数を指定するかどうか
export const MenuSupecifiedContext = createContext(["",()=>{}]);
