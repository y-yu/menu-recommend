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
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@material-ui/core/Grid";
import Image from 'mui-image'
import Paper from '@material-ui/core/Paper' 
import Tooltip from '@mui/material/Tooltip';

import TextField from '@mui/material/TextField';

import { UseFoodNameDictContext, AllFoodArrayContext, LikeAndDislikeFoodNameDictContext, AllFoodNameDictContext } from './context.js';

//　デフォルトデータ
import data from '../data/data.json';
let nutritionsNames  = data.nutritionsNames;
let timeNames = data.timeNames;
let nutritionsParams = data.nutritionsParams;
let timeParams = data.timeParams;
let machineNames = data.machineNames;
let defaultMachine = data.defaultMachine;
let choose_category = data.choose_category

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

const ButtonOfCreateMenus=()=>{

    console.log("うううううう");
    const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext)
    //画面遷移
    const navigate = useNavigate();
    return (
    <Button color="success" variant="contained" endIcon={<SendIcon />} onClick={() => {createMenus(useFoodNameDict,navigate)}}>
        献立を作成
    </Button>    
    );
    
}

// 
var pageTransition = false;

const createMenus = (useFoodNameDict,navigate) => {

// const [pageTransition ,setPageTransition] = useState(false);

  // useEffect(() => {
  //   if(pageTransition == true){
  //     console.log("遷移する")
  //       pageTransition = false;
  //        navigate("/result", {state: {'body':menus}})
  //      }else{
  //       console.log("遷移しない")
  //      }
  // }, [pageTransition]);
  
        let menus = {}
    let requestBody = {
      "want_food_dict":useFoodNameDict,
      "ideal_values":ideal_values,
      "params":params,
      "choose_category":choose_category
    };
    console.log(requestBody);


    // axiosで書き直す


    fetch('http://localhost:8000/test', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({ 'Content-type' : 'application/json', 'Access-Control-Allow-Origin': '*' })
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      menus = data;
      // pageTransition = true;

      // setPageTransition(true);

      navigate('/result', {state: {'body':menus}});
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