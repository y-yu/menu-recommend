import * as React from 'react';
import {useState,useEffect,useContext} from "react";


import 'react-tabs/style/react-tabs.css';

import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import UseFoodDataInput from './UseFoodDataInput';
import { UseFoodNameDictContext} from './context.js';


import typeToLabel from '../data/typeToLabel.json';

const AutoSuggestForFood = () => {
    //全部の食材名の配列
    let allCategory = Object.values(typeToLabel)
    let allFood = {}
    for(let category of allCategory){
      Object.assign(allFood, category)
    }
    
    let allType = Object.keys(allFood)
    let allLabel = Array.from(new Set(Object.values(allFood)))
    console.log(allLabel)
    console.log(allType)


    //使う予定の食材の辞書(そのまま食材選択のボタンにする)
    const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext)

    // クリックされた時に使用食材に入れる
    const addUseFoodNameDict=(newValue)=>{
        console.log(newValue)
        if(newValue != null){
            let foodName = newValue
            console.log(foodName)
            if(!(foodName in useFoodNameDict)){
                let newUseFoodNameDict ={}
                for (let useFood in useFoodNameDict){
                    newUseFoodNameDict[useFood]=useFoodNameDict[useFood]
                }               
                newUseFoodNameDict[foodName] = {'gram':0,'buy':true,'use_up':false};           
                setUseFoodNameDict(newUseFoodNameDict);              
            }
        }        
    }

    // 使う食材を全部見せる
    const showInputComponents=()=>{
        let tabContents = []
        for(let foodName in useFoodNameDict){
            console.log(foodName)
            tabContents.push(
            <ul>
                <Grid container spacing={2}>
                    <UseFoodDataInput name={foodName}/>
                </Grid>
                <Divider/>
            </ul>);
        }
        return <>{tabContents}</>;
    }

    //　フィルターにかける
    const filterOptions = (options, state) => {
        console.log(options)
        console.log(state)
        let newOptions = new Set();
        
        options.forEach((elem) => {
          if(elem.includes(state.inputValue)){
            newOptions.add(allFood[elem]);
          }
        });
        console.log(newOptions)
        return Array.from(newOptions);
      }

    return (
        <>
            <Autocomplete 
                filterOptions={filterOptions}       
                disablePortal
                options={allType}
                getOptionLabel = {(food)=> food}
                id="like-and-dislike-input"
                renderInput={(params) => (
                <TextField {...params} label="使用食材" variant="standard" sx={{width:250}} />
                )}
                onChange ={
                (event, newValue) => {
                    console.log(newValue)
                    addUseFoodNameDict(newValue)
                }
                }
                />
            <Box sx={{ width: '100%', height: 350, overflow: 'auto'}}>
                {showInputComponents()}
            </Box>
        </>
    );
}
export default AutoSuggestForFood
