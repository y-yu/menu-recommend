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
    const [value, setValue] = useState(() =>{if(foodName in useFoodNameDict){return useFoodNameDict[foodName]['gram']}else{return 0}});
    const [buy, setBuy] = useState(false);
    const [useUp,setUseUp] = useState(false);
    // console.log(foodName)
    // console.log(useFoodNameDict)
    // setUseFoodNameDict({"a":{"gram":"food"}});
    // console.log(useFoodNameDict);
    
    useEffect(()=>{
          console.log(useFoodNameDict);
          console.log(value);
    // console.log(useFoodNameDict)
    // setUseFoodNameDict({"a":{"gram":"food"}});
    // console.log(useFoodNameDict);
    },[])

    // useEffect(()=>{makeValue('gram')},[value]);

    const makeValue=()=>{
      console.log(useFoodNameDict)

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
      // console.log(useFoodNameDict);
      // console.log(value)
      let newUseFoodNameDict = Object.assign(useFoodNameDict); 
      // console.log(newUseFoodNameDict)
      if(foodName in newUseFoodNameDict){
        newUseFoodNameDict[foodName]['gram'] = value; 
      }else{
        newUseFoodNameDict[foodName] = {'gram':value,'buy':false,'use_up':false};
      }
      // console.log(newUseFoodNameDict)
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


    return (
      <>
      {console.log(useFoodNameDict)}
      {makeValue()}
          <label>{foodName}：
            <input 
            type="number" 
            value = {value}
            // value={makeValue('gram')} 
            name={foodName} 
            onChange={
              (event) =>
               setV(event.target.value)
              // {console.log(useFoodNameDict);
              //   setUseFoodNameDict((useFoodNameDict) => 
              //   {
              //     let newUseFoodNameDict = Object.create(useFoodNameDict); 
              //     if(foodName in newUseFoodNameDict){
              //       newUseFoodNameDict[foodName]['gram'] = event.target.value; 
              //     }else{
              //       newUseFoodNameDict[foodName] = {'gram':event.target.value,'buy':false,'use_up':false};
              //     }
              //     console.log(newUseFoodNameDict)
              //   return newUseFoodNameDict})
              // }
            }
            />
          </label>
          <label>　Buy：
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
          <label>　UseUp：
            <input 
            type="checkbox" 
            name={foodName+"UseUp"} 
            checked={useUp} 
            onChange={(event) => 
              {
                setU(event.target.checked);
                // setUseFoodNameDict((useFoodNameDict) =>
                // {
                //   let newUseFoodNameDict = Object.assign(useFoodNameDict); 
                //   if(foodName in newUseFoodNameDict){
                //     newUseFoodNameDict[foodName]['use_up'] = event.target.checked; 
                //   }else{
                //     newUseFoodNameDict[foodName] = {'gram':0,'buy':false,'use_up':event.target.checked};
                //   }
                //   return newUseFoodNameDict
                // })
              }
            } 
            value={useUp}/>
          </label>
      </>
    );
};

export default UseFoodDataInput