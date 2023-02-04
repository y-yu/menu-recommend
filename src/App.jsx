import * as React from 'react';
import {useState,useEffect,Fragment,createContext,useContext} from "react";
import ReactDom from 'react-dom'
import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from '@mui/material/Typography';
import Result from './contents/Result'
import Header from './contents/Header';
import MachineInputCard from './contents/MachineInputCard';
import NutritionAndTimeInputCard from './contents/NutritionAndTimeInputCard';
import ImageOfMenu from './contents/ImageOfMenu';
import LikeAndDislikeInputCard from './contents/LikeAndDislikeInputCard';
// import UseFoodInputCard_2 from './contents/UseFoodInputCard_2';
import ButtonOfCreateMenus from './contents/ButtonOfCreateMenus';
import UseFoodInputCard from './contents/UseFoodInputCard';

import {
  UseFoodNameDictContext,
  AllFoodArrayContext,
  LikeAndDislikeFoodNameDictContext,
  AllFoodNameDictContext,
  MachineContext,
  NutritionAndTimeContext,
  StapleContext,
  GenreContext,
  PeopleNumContext,
  MenuNumContext,
  LikeAndDislikeFoodNameSelectedListContext,
  TokenContext,
  MenuSupecifiedContext} from './contents/context.js';

//　デフォルトデータ
import data from './data/data.json';
let defaultNutritions  = data.defaultNutritions;
let defaultTimeNames = data.defaultTimeNames;
let defaultNutritionsParams = data.defaultNutritionsParams;
let defaultTimeParams = data.defaultTimeParams;
let defaultMachine = data.defaultMachine;
let defaultPeopleNum = data.defaultPeopleNum;
let defaultMenuNum = data.defaultMenuNum;
let defaultIdeal = data.defaultIdeal;
let defaultLikeAndDislikeFoodNameDict = data.defaultLikeAndDislikeFoodNameDict;
let defaultMainFood = data.defaultMainFood;
let defaultToken = data.defaultToken;


// postする時に必要なデータ
var ideal_values = 
{"energy":defaultNutritions["energy"]["defaultValue"],
"salt":defaultNutritions["salt"]["defaultValue"],
"protein":defaultNutritions["protein"]["defaultValue"],
"vegetable":defaultNutritions["vegetable"]["defaultValue"],
"time":defaultTimeNames["time"]["defaultValue"]}
var params = 
{"energy":defaultNutritionsParams["energy"]["defaultValue"],
"salt":defaultNutritionsParams["salt"]["defaultValue"],
"protein":defaultNutritionsParams["protein"]["defaultValue"],
"vegetable":defaultNutritionsParams["vegetable"]["defaultValue"],
"time":defaultTimeParams["time"]["defaultValue"],
"use_up":0.1}



const App = () => {
  // const url = "http://localhost:8000/foods/front";
  const url = "https://ising-menu-recommend-api.com/foods/front";
  const tabNames = ["手入力", "穀類", "いも及びデンプン類", "砂糖及び甘味類", "豆類", "種実類", "野菜類", "果実類", "キノコ類", "藻類", "魚介類", "肉類", "鶏卵", "乳類", "油脂類", "菓子類", "し好飲料", "調味料及び香辛料", "調理済み"];

  const [machine, setMachine] = useState(defaultMachine);
  //使う食材と使う量の辞書
  const [useFoodNameDict, setUseFoodNameDict] = useState({});
  //タブに表示させる全部の食材名
  const [allFoodArray, setAllFoodArray] = useState([]);
  //好きな食材と嫌いな食材
  const [likeAndDislikeFoodNameDict, setLikeAndDislikeFoodNameDict] = useState(defaultLikeAndDislikeFoodNameDict);
  //タブの名前とそのカテゴリーに属する配列の辞書
  const [allFoodNameDict, setAllFoodNameDict] = useState({});

  //人数(デフォルト値)
  const [peopleNum, setPeopleNum] = useState(defaultPeopleNum);

  //メニュー数()
  const [menuNum, setMenuNum] = useState(defaultMenuNum);

  //主食
  const [staple, setStaple] = useState(defaultMainFood);

  //ジャンル
  const [genre, setGenre] = useState(["japanese"]);

  //値と重みの理想値
  const [ideal, setIdeal] = useState(defaultIdeal);

  //トークン
  const [token, setToken] = useState(defaultToken);

  // //画面遷移
  const navigate = useNavigate();

  //　好き嫌いで選択した食材リスト
  const [likeAndDislikeFoodNameSelectedList, setLikeAndDislikeFoodNameSelectedList] = useState(new Set([]));

  //メニュー数を指定するかどうか
  const [isSupecified, setIsSupecified] = useState("指定なし");

  useEffect(
    ()=>{
      const getData = () => {
        axios.get(url)
        .then(
          (res) => {
            var tmpDict = {};
            var tmpArray = [];
            for(let food of res.data){
              if(food.category==="seasoning"){
                continue;
              }
              if(tabNames[food.genre] in tmpDict){
                tmpDict[tabNames[food.genre]].push(food.name);
              }else{
                tmpDict[tabNames[food.genre]]=[food.name];
              }   
              tmpArray.push({"name":food.name});
            }

            setAllFoodArray(tmpArray);
            setAllFoodNameDict(tmpDict);
        })
        .catch(() => {console.log("Api落ちてるかも");});
      };
      getData();
    },
    []);
  

  function Footer() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
          {"このサービスで使用しているレシピデータは"} <br />
          <a href="https://park.ajinomoto.co.jp/recipe/" target="_blank" rel="noopener noreferrer">「レシピ大百科」</a><br />
          {"に掲載されているものです"}
          <br />
          <br />
      </Typography>
    );
  }

  return(
    <>
    <Routes>
      <Route path="/" element={
        <div>
        <Header />
        <ImageOfMenu/>
        <UseFoodNameDictContext.Provider value={[useFoodNameDict,setUseFoodNameDict]}>
        <LikeAndDislikeFoodNameSelectedListContext.Provider value={[likeAndDislikeFoodNameSelectedList, setLikeAndDislikeFoodNameSelectedList]}>
        <MachineContext.Provider value={[machine, setMachine]}>
        <StapleContext.Provider value={[staple, setStaple]}>
        <GenreContext.Provider value={[genre, setGenre]}>
        <PeopleNumContext.Provider value={[peopleNum,setPeopleNum]}>
        <MenuNumContext.Provider value={[menuNum, setMenuNum]}>
        <NutritionAndTimeContext.Provider value = {[ideal, setIdeal]}>
        <AllFoodArrayContext.Provider value = {allFoodArray}>
        <LikeAndDislikeFoodNameDictContext.Provider value = {[likeAndDislikeFoodNameDict, setLikeAndDislikeFoodNameDict]}>
        <AllFoodNameDictContext.Provider value = {allFoodNameDict}>
        <TokenContext.Provider value ={[token, setToken]}>
        <MenuSupecifiedContext.Provider value ={[isSupecified, setIsSupecified]}>
          <br />
          <Grid container spacing={3}> 
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Grid container spacing={3}> 
                  <Grid item md={4} xs={12}>
                    <MachineInputCard />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <NutritionAndTimeInputCard category = "nutritions" params = {params} ideal_values = {ideal_values}/>
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <LikeAndDislikeInputCard setUseFoodNameDict = {setUseFoodNameDict} useFoodNameDict = {useFoodNameDict} setLikeAndDislikeFoodNameDict = {setLikeAndDislikeFoodNameDict} likeAndDislikeFoodNameDict = {likeAndDislikeFoodNameDict} allFoodArray = {allFoodArray}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <UseFoodInputCard/>
              </Grid>
              <Grid item xs={1}></Grid>

          </Grid>
          <Tabs>
            <Grid container alignItems='center' justifyContent='center' direction="column">
              <br/>
                <ButtonOfCreateMenus/>
              <br/>
            </Grid>
          </Tabs>
        </MenuSupecifiedContext.Provider>
        </TokenContext.Provider>
        </AllFoodNameDictContext.Provider>
        </LikeAndDislikeFoodNameDictContext.Provider>
        </AllFoodArrayContext.Provider>
        </NutritionAndTimeContext.Provider>
        </MenuNumContext.Provider>
        </PeopleNumContext.Provider>
        </GenreContext.Provider>
        </StapleContext.Provider>
        </MachineContext.Provider>
        
        </LikeAndDislikeFoodNameSelectedListContext.Provider>
        </UseFoodNameDictContext.Provider>
        </div>
      } />
      <Route path="/result" element={<Result />} />
    </Routes>
    <Footer/>
    </>
  )
  
}  


export default App;