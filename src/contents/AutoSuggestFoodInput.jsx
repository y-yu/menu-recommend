import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";
import ReactDom from 'react-dom'
import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { render } from 'react-dom';
import Autosuggest from 'react-autosuggest';


import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@material-ui/core/Grid";
import Image from 'mui-image'
import Paper from '@material-ui/core/Paper' 
import Tooltip from '@mui/material/Tooltip';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import UseFoodDataInput from './UseFoodDataInput';
import LikeAndDislikeFoodNameInput from './LikeAndDislikeFoodNameInput';
import { UseFoodNameDictContext, AllFoodArrayContext, LikeAndDislikeFoodNameDictContext, AllFoodNameDictContext } from './context.js';

let FoodArray;
// // まずはここでコンテキストを作成。
// const ResourceContext = React.createContext(""); // 渡している空文字列はデフォルトの値。

// 自動候補用のクラス



// 入力したものが途中にも検索かけられるようにする
// 入力値に対するサジェスト項目を取得するロジック
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  console.log(value)
  console.log(FoodArray)
  return inputLength === 0 ? [] : FoodArray.filter((lang) =>
    (lang.name).indexOf(value) != -1
  );
};



// サジェスト項目が Object の場合、サジェスト選択時に Object のどの項目を表示するか決める(suggestion.name);
const getSuggestionValue = (suggestion) => (suggestion.name);

// サジェスト部分のレンダリングロジック
const renderSuggestion = (suggestion) => (
  <div>
    {console.log(suggestion)}
    {suggestion.name}
  </div>
);


const AutoSuggestFoodInput = (props) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [type, setType] = useState(props.type)

  //使う予定の食材の辞書(そのまま食材選択のボタンにする)
  // let useFoodNameDict = useContext(UseFoodNameDictContext)[0]
  // const setUseFoodNameDict = useContext(UseFoodNameDictContext)[1]
  // const [foodButtons, setFoodButtons] = useState(useFoodNameDict)
  // const [useFoodNameDict, setUseFoodNameDict] = useState(useContext(UseFoodNameDictContext)[0],useContext(UseFoodNameDictContext)[1]);
  // let foodButtons = useContext(UseFoodNameDictContext)[0]
  // const setFoodButtons = useContext(UseFoodNameDictContext)[1]
  const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext)
  const [selectedList, setSelectedList] = useState(new Set([]));
  // const [useFoodNameDict, setUseFoodNameDict] = useState(foodButtons)


  //全部の食材名の配列
  const allFoodArray = useContext(AllFoodArrayContext)
  // console.log(allFoodArray)
  FoodArray = allFoodArray

  //好き嫌いの辞書
  // let likeAndDislikeFoodNameDict = useContext(LikeAndDislikeFoodNameDictContext)[0];
  // const setLikeAndDislikeFoodNameDict = useContext(LikeAndDislikeFoodNameDictContext)[1];
  // const [likeAndDislikeFoodNameDict, setLikeAndDislikeFoodNameDict] = useContext(LikeAndDislikeFoodNameDictContext);



  

  //初めての時だけ
  useEffect(() => {
    console.log(useFoodNameDict)
    // let newUseFoodNameDict=useFoodNameDict
    // newUseFoodNameDict[1]=2
    // setUseFoodNameDict(newUseFoodNameDict)
    // console.log(useFoodNameDict)
    // console.log(allFoodArray)
    // setSuggestions({'name':1})
  },[]);

  const onChange = (event, { newValue }) => {
    // console.log(newValue);
    setValue(newValue)
    // console.log(value);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    console.log('onSuggestionsFetchRequested');
    let a = getSuggestions(value);
    setSuggestions(a)
    // this.setState({
    //   suggestions: getSuggestions(value, this.props.allFoodArray),
    // });
    // console.log(a);
    // setSuggestions({name:"a"});
    console.log(value)
    console.log(a);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    console.log('onSuggestionsClearRequested');
    setSuggestions([])
  };

  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    if (type=="useFood"){
      console.log(typeof suggestion);
      // this.buttons.push(suggestion);
      // foodButtonArray
      // var newFoodButtons = this.state.foodButtons;
      // stateArray.slice(0, stateArray.length);
      var newUseFoodNameDict = Object.assign(useFoodNameDict)
      if (!(getSuggestionValue(suggestion) in newUseFoodNameDict)){
        newUseFoodNameDict[getSuggestionValue(suggestion)] = {
          'gram':0,
          'buy':false,
          'use_up':false
        };
      }
      // else{
      //   // newUseFoodNameDict[getSuggestionValue(suggestion)]['gram']=0;
      //   // newFoodButtons[getSuggestionValue(suggestion)]['gram']=0;
      // }
      // this.setState({
      //   foodButtons:newFoodButtons
      // });
      console.log(newUseFoodNameDict)
      setUseFoodNameDict(newUseFoodNameDict);
    }else{
      // var newLikeAndDislikeFoodNameDict = Object.create(likeAndDislikeFoodNameDict);
      // newLikeAndDislikeFoodNameDict[getSuggestionValue(suggestion)] = {"like":false,"dislike":false}
      // setLikeAndDislikeFoodNameDict(newLikeAndDislikeFoodNameDict)
      // console.log(newLikeAndDislikeFoodNameDict)

      // this.props.likeAndDislikeFoodNameDict[getSuggestionValue(suggestion)]={"like":this.state.like,"dislike":this.state.dislike};

      // var newSelectedList = mapForSet(new Set())(selectedList);
      // console.log(typeof newSelectedList)
      // newSelectedList.add.bind(getSuggestionValue(suggestion));
      // setSelectedList(newSelectedList);
      // console.log(newSelectedList)
      setSelectedList(new Set([...selectedList,getSuggestionValue(suggestion)]))
    }
  };

  const makeFoodArray = () =>{
    var s = [];
    if(type=="useFood"){
      // for(let buttonName in foodButtons){
      for(let useFoodName in useFoodNameDict){
        console.log(useFoodName)
        // console.log(foodButtons[buttonName]['gram']);
        // s.push(<ul><UseFoodDataInput name={buttonName} counts={foodButtons[buttonName]['gram']} buy={foodButtons[buttonName]['buy']} use_up={foodButtons[buttonName]['use_up']}/></ul>);
        console.log(useFoodNameDict[useFoodName]);
        s.push(<ul><UseFoodDataInput name={useFoodName} /></ul>);
      }
    }else{
      // for(let buttonName in this.props.likeAndDislikeFoodNameDict){
      //   this.props.likeAndDislikeFoodNameDict[buttonName] = 
      //   s.push(<ul><LikeAndDislikeFoodNameInput name={buttonName}/></ul>);
      // }
      // for (let likeAndDislikeFoodName in likeAndDislikeFoodNameDict){
      //   s.push(<ul><LikeAndDislikeFoodNameInput name={likeAndDislikeFoodName}/></ul>)
      // }
      for(let likeAndDislikeFoodName of selectedList){
        s.push(<ul><LikeAndDislikeFoodNameInput name={likeAndDislikeFoodName}/></ul>);
      }
    }
    return <div>{s}</div>;
  }

  // render() {
  //   const  {value, suggestions, buttons} = this.state;

  //   // Autosuggest will pass through all these props to the input element.
  const inputProps = {
    placeholder: '食材名',
    value,
    onChange: onChange,
  };

  //   // Finally, render it!
  //   return (
  //     <div>
  //       <Autosuggest
  //         suggestions={suggestions}
  //         onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
  //         onSuggestionsClearRequested={this.onSuggestionsClearRequested}
  //         onSuggestionSelected={this.onSuggestionSelected}
  //         getSuggestionValue={getSuggestionValue}
  //         renderSuggestion={renderSuggestion}
  //         inputProps={inputProps}
  //       />
  //       {this.makeFoodArray()}
  //       {Make()}
  //     </div>
  //   );
  // }

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      {makeFoodArray()}
      {/* {console.log(suggestions)} */}
      {/* {Make()} */}
    </div>);

}


// -----------------------------------------------------------------------------



export default AutoSuggestFoodInput
