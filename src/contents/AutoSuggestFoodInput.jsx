import * as React from 'react';
import {useState,useEffect,useContext} from "react";


import 'react-tabs/style/react-tabs.css';

import Autosuggest from 'react-autosuggest';


import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UseFoodDataInput from './UseFoodDataInput';
import LikeAndDislikeFoodNameInput from './LikeAndDislikeFoodNameInput';
import { UseFoodNameDictContext, AllFoodArrayContext, LikeAndDislikeFoodNameDictContext, LikeAndDislikeFoodNameSelectedListContext} from './context.js';

let FoodArray;


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
  const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext)

  const [likeAndDislikeFoodNameSelectedList, setLikeAndDislikeFoodNameSelectedList] = useContext(LikeAndDislikeFoodNameSelectedListContext);

  //全部の食材名の配列
  const allFoodArray = useContext(AllFoodArrayContext)
  console.log(allFoodArray)
  FoodArray = allFoodArray

  //好き嫌いの辞書
  const [likeAndDislikeFoodNameDict, setLikeAndDislikeFoodNameDict] = useContext(LikeAndDislikeFoodNameDictContext);


  //初めての時だけ
  useEffect(() => {
    console.log(useFoodNameDict)
    console.log(useFoodNameDict)
    console.log(allFoodArray)
  },[]);


  const onChange = (event, { newValue }) => {
    setValue(newValue)
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    console.log('onSuggestionsFetchRequested');
    let a = getSuggestions(value);
    setSuggestions(a)
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
      var newUseFoodNameDict = Object.assign(useFoodNameDict)
      if (!(getSuggestionValue(suggestion) in newUseFoodNameDict)){
        newUseFoodNameDict[getSuggestionValue(suggestion)] = {
          'gram':0,
          'buy':false,
          'use_up':false
        };
      }
      console.log(newUseFoodNameDict)
      setUseFoodNameDict(newUseFoodNameDict);
    }else{ 
      setLikeAndDislikeFoodNameSelectedList(new Set([...likeAndDislikeFoodNameSelectedList,getSuggestionValue(suggestion)]))
    }
  };

  const makeFoodArray = () =>{
    var s = [];
    if(type=="useFood"){
      for(let useFoodName in useFoodNameDict){
        console.log(useFoodName)
        console.log(useFoodNameDict[useFoodName]);
        s.push(
        <ul>
          <UseFoodDataInput name={useFoodName} type={"使用食材"} />
        </ul>);
      }
    }else{
      for(let likeAndDislikeFoodName of likeAndDislikeFoodNameSelectedList){
        s.push(<ul><LikeAndDislikeFoodNameInput name={likeAndDislikeFoodName}/></ul>);
      }
    }
    return <div>{s}</div>;
  }


  // Autosuggest will pass through all these props to the input element.
  const inputProps = {
    placeholder: '食材名',
    value,
    onChange: onChange,
  };


  return (
    <div>
      {console.log(useFoodNameDict)}
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
    </div>);

}



export default AutoSuggestFoodInput
