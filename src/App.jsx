import * as React from 'react';
import {useState,useEffect,Fragment,createContext,useContext} from "react";
import ReactDom from 'react-dom'
import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { render } from 'react-dom';
import Autosuggest from 'react-autosuggest';


import './styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Image from 'mui-image'
import Paper from '@material-ui/core/Paper' 
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';

import BasicCard from './contents/Card';
import Result from './contents/Result'
import Header from './contents/Header';
import MachineInputCard from './contents/MachineInputCard';
import NutritionAndTimeInputCard from './contents/NutritionAndTimeInputCard';
import ImageOfMenu from './contents/ImageOfMenu';
import LikeAndDislikeInputCard from './contents/LikeAndDislikeInputCard';
import UseFoodInputCard from './contents/UseFoodInputCard';
import ButtonOfCreateMenus from './contents/ButtonOfCreateMenus';

import { ResourceContext,
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
  LikeAndDislikeFoodNameSelectedListContext} from './contents/context.js';

//　デフォルトデータ
import data from './data/data.json';
let defaultNutritions  = data.defaultNutritions;
let defaultTimeNames = data.defaultTimeNames;
let defaultNutritionsParams = data.defaultNutritionsParams;
let defaultTimeParams = data.defaultTimeParams;
let machineNames = data.machineNames;
let defaultMachine = data.defaultMachine;
let choose_category = data.choose_category;
let genreNames = data.genreNames;
let defaultPeopleNum = data.defaultPeopleNum;
let defaultMenuNum = data.defaultMenuNum;
let defaultIdeal = data.defaultIdeal;
let defaultLikeAndDislikeFoodNameDict = data.defaultLikeAndDislikeFoodNameDict;
let defaultMainFood = data.defaultMainFood;
let mainFoods = data.mainFoods;

// // サジェストに表示する項目
// var allFoodArray = [];
// //タブの名前とそのカテゴリーに属する配列の辞書
// var allFoodNameDict = {};
//好きな食材と嫌いな食材の名前の辞書
// var likeAndDislikeFoodNameDict = {};

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
//使う食材と使う量の辞書
// let useFoodNameDict = {}

// まずはここでコンテキストを作成。
// const ResourceContext = React.createContext("light"); 


const App = () => {
  const url = "http://localhost:8000/foods/front";
  // const url = "https://ising-menu-recommend-api.com/foods/front";
  const tabNames = ["手入力", "穀類", "いも及びデンプン類", "砂糖及び甘味類", "豆類", "種実類", "野菜類", "果実類", "キノコ類", "藻類", "魚介類", "肉類", "鶏卵", "乳類", "油脂類", "菓子類", "し好飲料", "調味料及び香辛料", "調理済み"];
  // const [foodNameDict, setFoodNameDict] = useState({});
  // const [foodNameArray, setFoodNameArray] = useState([]);
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
  const [staple, setStaple] = useState(mainFoods[defaultMainFood]);

  //ジャンル
  const [genre, setGenre] = useState(["korean"]);

  //値と重みの理想値
  const [ideal, setIdeal] = useState(defaultIdeal);

  // //画面遷移
  const navigate = useNavigate();

  //　好き嫌いで選択した食材リスト
  const [likeAndDislikeFoodNameSelectedList, setLikeAndDislikeFoodNameSelectedList] = useState(new Set([]));

  useEffect(
    ()=>{
      const getData = () => {
        axios.get(url)
        .then(
          (res) => {
            var tmpDict = {};
            var tmpArray = [];
            for(let food of res.data){
              if(tabNames[food.genre] in tmpDict){
                // console.log(typeof tabNames[food.genre]);
                tmpDict[tabNames[food.genre]].push(food.name);
              }else{
                tmpDict[tabNames[food.genre]]=[food.name];
              }   
              // console.log(food.name)
              tmpArray.push({"name":food.name});
            }
            // setFoodNameDict(tmpDict);
            // setFoodNameArray(tmpArray);

            setAllFoodArray(tmpArray);
            setAllFoodNameDict(tmpDict);
        })
        .catch(() => {console.log("Api落ちてるかも");});
      };
      getData();
      // console.log(foodNameArray);
      // setAllFoodArray(foodNameArray);
    },
    []);
  

  

  // let makeTabNames = (nameArray) => {
  //   var returnStr= []
  //   for(let i = 0; i < nameArray.length; i++){
  //     returnStr.push(<Tab>{nameArray[i]}</Tab>);
  //   }
  //   return <TabList>{returnStr}</TabList>
  // };



  // class NutritionsAndTimeInput extends React.Component {
  //   constructor(props){
  //     super(props);
  //     this.state = {
  //       name:this.props.name,
  //       value:Number(this.props.value),
  //       parameter:Number(this.props.parameter),
  //       category:this.props.category
  //     }
  //   }

  //   componentDidUpdate(){
  //     ideal_values[this.state.name] = Number(this.state.value);
  //     params[this.state.name] = Number(this.state.parameter);
  //     console.log(this.state.name+":"+this.state.value);
  //   }

  //   render(){
  //     return (<>
  //         <ul>
  //           <label>
  //             {(this.state.category == "nutritions"?nutritionsNames[this.state.name]["ja"]:timeNames[this.state.name]["ja"])}<input type="number" value={this.state.value} name={this.state.name} onChange={(event) => this.setState({value: event.target.value})}/>
  //           </label>
  //         </ul>
  //         <ul>
  //           <label>
  //             パラメタ
  //           </label>
  //           <Col xs="3">
  //           <RangeSlider
  //             value={this.state.parameter}
  //             onChange={e => this.setState({parameter:Number(e.target.value)})}
  //             variant='info'
  //             min = {0}
  //             max = {1}
  //             step = {0.01}
  //           />
  //           </Col>
  //         </ul>
  //       </>
  //     );
  //   }

  // }


  // const createParameterInput = (paramsData,category) => {
  //   let str = []

  //   console.log(paramsData)
  //   for (let paramName in paramsData){
  //     console.log(paramName);
  //     console.log(paramsData[paramName]["defaultValue"]);
  //     str.push(
  //     <ul>
  //       <NutritionsAndTimeInput 
  //         name={paramName} 
  //         value={paramsData[paramName]["defaultValue"]} 
  //         parameter={(category=="nutritions" ? nutritionsParams[paramName]["defaultValue"]:timeParams[paramName]["defaultValue"])}
  //         category={category}
  //       />
  //     </ul>)
  //   }
  //   return str;
  // }


  function Footer() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          献立作成
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return(
    <>
    <Routes>
      {/* {console.log(useFoodNameDict)}
      {console.log(allFoodNameDict)} */}
      {console.log(mainFoods)}
      {console.log(staple)}
      {console.log(defaultMainFood)}
      {console.log("likeAndDislikeList:")}
      {console.log(likeAndDislikeFoodNameSelectedList)}
      {console.log("usedFood:")}
      {console.log(useFoodNameDict)}
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
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <MachineInputCard />
          </Grid>
          <Grid item xs={4}>
            <NutritionAndTimeInputCard category = "nutritions" params = {params} ideal_values = {ideal_values}/>
          </Grid>
          <Grid item xs={4}>
            <LikeAndDislikeInputCard setUseFoodNameDict = {setUseFoodNameDict} useFoodNameDict = {useFoodNameDict} setLikeAndDislikeFoodNameDict = {setLikeAndDislikeFoodNameDict} likeAndDislikeFoodNameDict = {likeAndDislikeFoodNameDict} allFoodArray = {allFoodArray}/>
          </Grid>
          <Grid item xs={12}>
            <UseFoodInputCard/>
          </Grid>
          </Grid>
          <Tabs>
            <Grid container alignItems='center' justifyContent='center' direction="column">
              <br/>
                <ButtonOfCreateMenus/>
              <br/>
            </Grid>
          </Tabs>
          {/* <ButtonOfCreateMenus/> */}
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