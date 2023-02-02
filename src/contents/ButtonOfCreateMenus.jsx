import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";

import axios from "axios";

import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import CircularProgress from '@mui/material/CircularProgress';

import { 
  MachineContext,
  NutritionAndTimeContext, 
  StapleContext, 
  GenreContext, 
  PeopleNumContext, 
  MenuNumContext, 
  UseFoodNameDictContext, 
  LikeAndDislikeFoodNameDictContext, 
  TokenContext,
  MenuSupecifiedContext
} from './context.js';


// postする時に必要なデータ



const ButtonOfCreateMenus=()=>{
  const [machine, setMachine] = useContext(MachineContext);
  const [ideal, setIdeal] = useContext(NutritionAndTimeContext);
  const [want_food, setUseFoodNameDict] = useContext(UseFoodNameDictContext);
  const [my_food, setMyFood] = useContext(LikeAndDislikeFoodNameDictContext);
  const [staple, setStaple] = useContext(StapleContext);
  const [genre, setGenre] = useContext(GenreContext);
  const [people, setPeople] = useContext(PeopleNumContext);
  const [count, setCount] = useContext(MenuNumContext);
  const [token, setToken] = useContext(TokenContext);
  const [isSupecified, setIsSupecified] = useContext(MenuSupecifiedContext);

  const [loading, setLoading] = useState(false);

  
  const createRequest=()=>{
    let menus = {}
    // setValue((val) => val.filter((text) => text !== "all"));
    let newGenre = [];
    // console.log(genre)
    for(let g of genre){
      if(g!="all"){
        newGenre.push(g);
      }
    }
    let newIdeal = Object.assign(ideal)
    for(let category of Object.keys(newIdeal)){
      newIdeal[category]["value"]=Number(newIdeal[category]["value"])
      newIdeal[category]["param"]=parseFloat(newIdeal[category]["param"])
    }

    let newWantFood = Object.assign(want_food)
    for(let food of Object.keys(newWantFood)){
      newWantFood[food]["gram"] = Number(newWantFood[food]["gram"])
    }


    let requestBody = {
      "machine" : machine,
      "ideal" : newIdeal,
      "my_food" : my_food,
      "want_food" : want_food,
      "staple" : staple,
      "genre" : newGenre,
      "people" : Number(people),
      "count" : (isSupecified == "指定なし"?0:Number(count)),
      "token" : token
    };
    createMenus(navigate,requestBody)
    setLoading(true);
  }

  const makeButtonOrNot = ()=>{
    if(!loading){
    return (    
      <Button color="success" variant="contained" endIcon={<SendIcon />} onClick={() => {createRequest()}}>
        献立を作成
      </Button>);
    }else{
      return <CircularProgress color="success" />
    }
  }

 
  //画面遷移
  const navigate = useNavigate();
  return (<>{makeButtonOrNot()}</>);
    
}

// 
var pageTransition = false;

const createMenus = (navigate, requestBody) => {

    let menus = {}
    console.log(requestBody);


    // axiosで書き直す


    // fetch('http://localhost:8000/menu', {
    fetch('https://ising-menu-recommend-api.com/menu', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({ 'Content-type' : 'application/json', 'Access-Control-Allow-Origin': '*' })
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      menus = data;
      // pageTransition = true;

      // setPageTransition(true);
      // 成功した時だけ
      if(menus["status"] == "Done"){
        navigate('/result', {state: {'body':menus}});
      }else{
        console.log("ステータス的に失敗");
      }
    })
    .catch(error => {
      console.log(error)
      console.error('通信に失敗しました', error);
    })

    

    // axios
    //   .post("http://localhost:8000/test", {
    //     body: JSON.stringify(requestBody),
    //     contentType: 'application/json', // リクエストの Content-Type
    //     dataType: "json", 
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  }

  export default ButtonOfCreateMenus