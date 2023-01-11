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
  AllFoodNameDictContext} from './contents/context.js';

//　デフォルトデータ
import data from './data/data.json';
let nutritionsNames  = data.nutritionsNames;
let timeNames = data.timeNames;
let nutritionsParams = data.nutritionsParams;
let timeParams = data.timeParams;
let machineNames = data.machineNames;
let defaultMachine = data.defaultMachine;
let choose_category = data.choose_category

// // サジェストに表示する項目
// var allFoodArray = [];
// //タブの名前とそのカテゴリーに属する配列の辞書
// var allFoodNameDict = {};
//好きな食材と嫌いな食材の名前の辞書
// var likeAndDislikeFoodNameDict = {};

// postする時に必要なデータ
var ideal_values = 
{"energy":nutritionsNames["energy"]["defaultValue"],
"salt":nutritionsNames["salt"]["defaultValue"],
"protein":nutritionsNames["protein"]["defaultValue"],
"vegetable":nutritionsNames["vegetable"]["defaultValue"],
"time":timeNames["time"]["defaultValue"]}
var params = 
{"energy":nutritionsParams["energy"]["defaultValue"],
"salt":nutritionsParams["salt"]["defaultValue"],
"protein":nutritionsParams["protein"]["defaultValue"],
"vegetable":nutritionsParams["vegetable"]["defaultValue"],
"time":timeParams["time"]["defaultValue"],
"use_up":0.1}
//使う食材と使う量の辞書
// let useFoodNameDict = {}

// まずはここでコンテキストを作成。
// const ResourceContext = React.createContext("light"); 


const App = () => {
  const url = "http://localhost:8000/foods/front";
  const tabNames = ["手入力", "穀類", "いも及びデンプン類", "砂糖及び甘味類", "豆類", "種実類", "野菜類", "果実類", "キノコ類", "藻類", "魚介類", "肉類", "鶏卵", "乳類", "油脂類", "菓子類", "し好飲料", "調味料及び香辛料", "調理済み"];
  // const [foodNameDict, setFoodNameDict] = useState({});
  // const [foodNameArray, setFoodNameArray] = useState([]);
  const [machine, setMachine] = useState('Amplify');
  //使う食材と使う量の辞書
  const [useFoodNameDict, setUseFoodNameDict] = useState({});
  //タブに表示させる全部の食材名
  const [allFoodArray, setAllFoodArray] = useState([]);
  //好きな食材と嫌いな食材
  const [likeAndDislikeFoodNameDict, setLikeAndDislikeFoodNameDict] = useState({});
  // let allFoodArray = []
  //タブの名前とそのカテゴリーに属する配列の辞書
  const [allFoodNameDict, setAllFoodNameDict] = useState({});

  // //画面遷移
  const navigate = useNavigate();

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
      {console.log(useFoodNameDict)}
      {console.log(allFoodNameDict)}
      <Route path="/" element={
        <div>
        <Header />
        <ImageOfMenu/>
        <h3>アニーリングマシンで献立を作成してみませんか</h3>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <MachineInputCard setFunc = {setMachine} chosenMachine = {machine} machineNames = {machineNames} defaultMachine = {defaultMachine} ideal_values = {ideal_values}/>
          </Grid>
          <Grid item xs={4}>
            <NutritionAndTimeInputCard category = "nutritions" params = {params} ideal_values = {ideal_values}/>
          </Grid>
          <UseFoodNameDictContext.Provider value={[useFoodNameDict,setUseFoodNameDict]}>
            <AllFoodArrayContext.Provider value = {allFoodArray}>
              <LikeAndDislikeFoodNameDictContext.Provider value = {[likeAndDislikeFoodNameDict, setLikeAndDislikeFoodNameDict]}>
                <Grid item xs={4}>
                {/* // Providerコンポーネントで包むことによって、Provider配下のコンテキストを決定する */}
                  <LikeAndDislikeInputCard setUseFoodNameDict = {setUseFoodNameDict} useFoodNameDict = {useFoodNameDict} setLikeAndDislikeFoodNameDict = {setLikeAndDislikeFoodNameDict} likeAndDislikeFoodNameDict = {likeAndDislikeFoodNameDict} allFoodArray = {allFoodArray}/>
                </Grid>
              </LikeAndDislikeFoodNameDictContext.Provider>
            </AllFoodArrayContext.Provider>
          </UseFoodNameDictContext.Provider>
          <Grid item xs={12}>
            <AllFoodNameDictContext.Provider value = {allFoodNameDict}>
              <UseFoodNameDictContext.Provider value={[useFoodNameDict,setUseFoodNameDict]}>
                <AllFoodArrayContext.Provider value={allFoodArray}>
                  <UseFoodInputCard/>
                </AllFoodArrayContext.Provider>
              </UseFoodNameDictContext.Provider>
            </AllFoodNameDictContext.Provider>
          </Grid>
        </Grid>
        <Tabs>
          {/* <div>
            <button onClick={createMenus}>献立作成</button> 
          </div> */}
          <ButtonOfCreateMenus/>
        </Tabs>
        </div>
      } />
      <Route path="/result" element={<Result />} />
    </Routes>
    <Footer/>
    </>
  )
  
}  


export default App;