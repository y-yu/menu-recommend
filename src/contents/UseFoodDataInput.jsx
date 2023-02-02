import * as React from 'react';
import {useState,useContext} from "react";
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import {UseFoodNameDictContext} from './context.js';

const UseFoodDataInput = (props) => {

    const foodName = props.name
    const type = props.type
    const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext);
    const [value, setValue] = useState(() =>{if(foodName in useFoodNameDict){return useFoodNameDict[foodName]['gram']}else{return 0}});
    const [buy, setBuy] = useState(false);
    const [useUp,setUseUp] = useState(false);

    const makeValue=()=>{

      if(foodName in useFoodNameDict){
        if(useFoodNameDict[foodName]['gram']!=value){
          setValue(useFoodNameDict[foodName]['gram']);
        }
      }

      if(foodName in useFoodNameDict){
        if(useFoodNameDict[foodName]['buy']!=buy){
          setBuy(useFoodNameDict[foodName]['buy']);
        }
      }

      if(foodName in useFoodNameDict){
        if(useFoodNameDict[foodName]['use_up']!=useUp){
          setUseUp(useFoodNameDict[foodName]['use_up']);
        }
      }
      
    }

    const setV=(value)=>{
      let newUseFoodNameDict = Object.assign(useFoodNameDict); 
      if(foodName in newUseFoodNameDict){
        newUseFoodNameDict[foodName]['gram'] = value; 
      }else{
        newUseFoodNameDict[foodName] = {'gram':value,'buy':false,'use_up':false};
      }
      setUseFoodNameDict(newUseFoodNameDict);
      setValue(value);
    }

    const setB=(B)=>{
      let newUseFoodNameDict = Object.assign(useFoodNameDict); 
      if(foodName in newUseFoodNameDict){
        newUseFoodNameDict[foodName]['buy'] = B; 
      }else{
        newUseFoodNameDict[foodName] = {'gram':0,'buy':B,'use_up':false};
      }
      setUseFoodNameDict(newUseFoodNameDict);
      console.log(B);
      setBuy(B);
    }

    const setU=(U)=>{
      let newUseFoodNameDict = Object.assign(useFoodNameDict); 
      if(foodName in newUseFoodNameDict){
        newUseFoodNameDict[foodName]['use_up'] = U; 
      }else{
        newUseFoodNameDict[foodName] = {'gram':0,'buy':false,'use_up':U};
      }
      setUseFoodNameDict(newUseFoodNameDict);
      console.log(U);
      setUseUp(U);
    }

    const deleteComponent=(foodName)=>{
      let newUseFoodNameDict = {};
      for(let i in useFoodNameDict){
        newUseFoodNameDict[i]=useFoodNameDict[i];
      }
      delete newUseFoodNameDict[foodName]; 
      setUseFoodNameDict(newUseFoodNameDict);
      console.log(newUseFoodNameDict)
      console.log(foodName+"を消しました")
      return;
    }

    const addDeleteButton=(type)=>{
      if(type=="使用食材"){
        return (
        <Tooltip title="Delete">
          <IconButton onClick={()=>{deleteComponent(foodName)}}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>);
      }
    }



    return (
      <>
      {makeValue()}
          <label>{foodName}：
            <input 
            type="number" 
            value = {value}
            name={foodName} 
            onChange={
              (event) =>
               setV(event.target.value)
            }
            min="0"
            inputProps={{ min: 0}}
            />
          </label>
          <label>　買う：
            <input
             type="checkbox" name={foodName+"Buy"} 
             checked={buy} 
             onChange={(event) => 
              {
                setB(event.target.checked)
              }
            } 
             value={buy}/>
          </label>
          <label>　使い切り：
            <input 
            type="checkbox" 
            name={foodName+"UseUp"} 
            checked={useUp} 
            onChange={(event) => 
              {
                setU(event.target.checked);
              }
            } 
            value={useUp}/>
          </label>
          {addDeleteButton(type)}
      </>
    );
};

export default UseFoodDataInput