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
import Typography from '@mui/material/Typography';

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
  const [error_message, setErrorMessage] = useState("");

  
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
    createMenus(navigate,requestBody, setLoading, setErrorMessage)
    setLoading(true);
  }

  const makeButtonOrNot = ()=>{
    if(!loading){
    return (  
      <div style={{"text-align": "center"}}>
        <Button color="success" variant="contained" endIcon={<SendIcon />} onClick={() => {createRequest()}}>
          献立を作成
        </Button>
        <Typography color="red">
            <br/>{error_message}
        </Typography>
      </div>  
      );
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

const createMenus = (navigate, requestBody, setLoading, setErrorMessage) => {
    setErrorMessage("");
    console.log(requestBody);

    // fetch('http://localhost:8000/menu', {
    fetch('https://ising-menu-recommend-api.com/menu', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({ 'Content-type' : 'application/json', 'Access-Control-Allow-Origin': '*' })
    })
    .then(res => {
      if (!res.ok) {
        console.log("エラー")
      }
      console.log(res.ok)
      console.log(res.status); 
      console.log(res.statusText);
      return res.json()
    })
    .then(data => {
      console.log(data)

      // 成功した時だけ
      if(data["status"] == "Done"){
        navigate('/result', {state: {'body':data}});
      }else{
        setLoading(false); //ローディングやめる
        if(data["detail"]["title"] == "Unauthorized"){
          setErrorMessage("マシンのトークンを確認してください")
          console.log(data["detail"]["message"])
        }
        else if(data["detail"]["title"] == "Internal Server Error"){
          setErrorMessage("エラーが起きました。時間を置いてもう一度お試しください。")
          console.log(data["detail"]["message"])
          console.log(data["detail"]["error"])
        }
        else{
          setErrorMessage("エラーが起きました。時間を置いてもう一度お試しください。")
          console.log("わからないエラー")
        }
      }
    })
    .catch(error => {
      setLoading(false); //ローディングやめる
      console.log(error)
      console.error('通信に失敗しました', error);
    })

  }

  export default ButtonOfCreateMenus