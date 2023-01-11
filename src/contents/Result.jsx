import React,{useState,useEffect} from "react";
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header";

import Grid from "@material-ui/core/Grid";

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";

const Result = () => {
    const location = useLocation(); 
    let state = location.state;
    console.log(state.body);
    let resultMenus = state.body;
  
    let resultArray = [];
    // for (let resultMenu of resultMenus){
    for (let i=0;i<resultMenus.length; i++){
      let resultMenu = resultMenus[i];
      console.log(resultMenu.menu.map(menu => menu.title));
      resultArray.push(<h3>献立{i+1}</h3>);

      let tmp = resultMenu.menu.map(
        menu => {
          return (<>
            <Grid item xs={12/resultMenu.menu.length}>
              <img className="recipeImage" src={menu.image_url}/><br/>
              <a href={menu.url}>{menu.title}</a><br/>
              <h7>{"時間:"+menu.time+"分"}</h7>
            </Grid>
          </>)
        }
      );
      resultArray = resultArray.concat(<Grid container spacing={2}>{tmp}</Grid>);
      resultArray.push(<br />);
    }
    return (<><Header/>{resultArray}<Link to='/'>戻る</Link></>);
  }

  export default Result;