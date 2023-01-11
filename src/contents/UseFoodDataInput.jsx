import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import {UseFoodNameDictContext} from './context.js';

const UseFoodDataInput = (props) => {

    const foodName = props.name
    const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext);
    console.log(foodName)
    console.log(useFoodNameDict)


    const makeValue=(type)=>{
      if (type=='gram'){
        if(foodName in useFoodNameDict){return useFoodNameDict[foodName]['gram']}else{return 0}
      }else if(type=='buy'){
        if(foodName in useFoodNameDict){return useFoodNameDict[foodName]['buy']}else{return false}
      }else{
        if(foodName in useFoodNameDict){return useFoodNameDict[foodName]['use_up']}else{return false}
      }
    }
    return (
      <>
      {console.log(useFoodNameDict)}
          <label>{foodName}：
            <input 
            type="number" 
            value={makeValue('gram')} 
            name={foodName} 
            onChange={(event) => 
              {
                setUseFoodNameDict((useFoodNameDict) => 
                {
                  let newUseFoodNameDict = Object.create(useFoodNameDict); 
                  if(foodName in newUseFoodNameDict){
                    newUseFoodNameDict[foodName]['gram'] = event.target.value; 
                  }else{
                    newUseFoodNameDict[foodName] = {'gram':event.target.value,'buy':false,'use_up':false};
                  }
                  console.log(newUseFoodNameDict)
                return newUseFoodNameDict})
              }
            }
            />
          </label>
          <label>　Buy：
            <input
             type="checkbox" name={foodName+"Buy"} 
             checked={makeValue('buy')} 
             onChange={(event) => 
              {
                setUseFoodNameDict((useFoodNameDict) =>
                {
                  let newUseFoodNameDict = Object.create(useFoodNameDict); 
                  if(foodName in newUseFoodNameDict){
                    newUseFoodNameDict[foodName]['buy'] = event.target.checked; 
                  }else{
                    newUseFoodNameDict[foodName] = {'gram':0,'buy':event.target.checked,'use_up':false};
                  }
                  return newUseFoodNameDict
                })
              }
            } 
             value={makeValue('buy')}/>
          </label>
          <label>　UseUp：
            <input 
            type="checkbox" 
            name={foodName+"UseUp"} 
            checked={makeValue('use_up')} 
            onChange={(event) => 
              {
                setUseFoodNameDict((useFoodNameDict) =>
                {
                  let newUseFoodNameDict = Object.create(useFoodNameDict); 
                  if(foodName in newUseFoodNameDict){
                    newUseFoodNameDict[foodName]['use_up'] = event.target.checked; 
                  }else{
                    newUseFoodNameDict[foodName] = {'gram':0,'buy':false,'use_up':event.target.checked};
                  }
                  return newUseFoodNameDict
                })
              }
            } 
            value={makeValue('use_up')}/>
          </label>
      </>
    );
};

export default UseFoodDataInput