import * as React from 'react';
import {useState,useContext} from "react";
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from "@material-ui/core/Grid";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import {UseFoodNameDictContext} from './context.js';


const UseFoodDataInput=(props)=>{

    const foodName = props.name
    const genreName = props.genre

    const [useFoodNameDict, setUseFoodNameDict] = useContext(UseFoodNameDictContext);
    const [value, setValue] = useState(() =>{if(foodName in useFoodNameDict){return useFoodNameDict[foodName]['gram']}else{return 0}});

    const [use, setUse] = useState((foodName in useFoodNameDict));
    const [useUp,setUseUp] = useState(((foodName in useFoodNameDict) && (useFoodNameDict[foodName]['use_up'])));
    const [buy, setBuy] = useState(((foodName in useFoodNameDict) && (useFoodNameDict[foodName]['buy'])));
    const [isSupecified, setIsSupecified] = useState(((foodName in useFoodNameDict) && (!useFoodNameDict[foodName]['buy'])))
    

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const setRadio=(val)=>{
        if(val==="buy"){
            setBuy(true);
            let newUseFoodNameDict ={}
            for (let useFood in useFoodNameDict){
                newUseFoodNameDict[useFood]=useFoodNameDict[useFood]
            }     
            newUseFoodNameDict[foodName]['buy']=true;        
            setUseFoodNameDict(newUseFoodNameDict);                            
            setIsSupecified(false);
        }else{
            setBuy(false);
            let newUseFoodNameDict ={}
            for (let useFood in useFoodNameDict){
                newUseFoodNameDict[useFood]=useFoodNameDict[useFood]
            }     
            newUseFoodNameDict[foodName]['buy']=false;        
            setUseFoodNameDict(newUseFoodNameDict);        
            setIsSupecified(true);
        }
    }

    const fetch=()=>{
        if((foodName in useFoodNameDict) && !use){
            setUse(true)
        }else if(!(foodName in useFoodNameDict) && use){
            setUse(false)
        }
    }

    return (
        <>
            {fetch()}
            <Grid item xs={12} md={6}>
                <label>       
                    <Checkbox 
                        {...label} 
                        checked={use} 
                        color="success" 
                        onChange={(event) => 
                            {
                                let newUse = !use
                                setUse(newUse);
                                if(newUse){
                                    //　使う食材として登録
                                    let newUseFoodNameDict ={}
                                    for (let useFood in useFoodNameDict){
                                        newUseFoodNameDict[useFood]=useFoodNameDict[useFood]
                                    }     
                                    newUseFoodNameDict[foodName] = {'gram':value,'buy':true,'use_up':false};                                                              
                                    setUseFoodNameDict(newUseFoodNameDict); 
                                    setBuy(true)        
                                    setIsSupecified(false)                                                           
                                }else{
                                    //　使わない食材として辞書から消す
                                    console.log(foodName)
                                    let newUseFoodNameDict ={}
                                    for (let useFood in useFoodNameDict){
                                        newUseFoodNameDict[useFood]=useFoodNameDict[useFood]
                                    }     
                                    if(foodName in newUseFoodNameDict){
                                        delete newUseFoodNameDict[foodName]
                                    }
                                    
                                    setUseFoodNameDict(newUseFoodNameDict);
                                    setBuy(false)
                                    setUseUp(false)
                                    setIsSupecified(false)
                                    setValue(0)
                                }
                            }
                        } 
                    />
                    {foodName}
                </label>
            </Grid>
            <Grid item xs={12} md={6}>
                {
                    use 
                    && 
                    <FormControl>
                        {console.log(useFoodNameDict)}
                        <RadioGroup
                        row
                        defaultValue={(()=>{if((foodName in useFoodNameDict) && useFoodNameDict[foodName]['buy']){console.log(foodName,"buy");return "buy"}else{console.log(foodName,"isSupecified");return "isSupecified"}})()}
                        name="buy_or_g"
                        >
                        {console.log(123)}
                        <FormControlLabel value={"buy"} control={<Radio sx={{'&.Mui-checked': { color: '#52af77'}}}/>} label="買う" onChange = {e => setRadio(e.target.value)}/>
                        <FormControlLabel value={"isSupecified"} control={<Radio sx={{'&.Mui-checked': { color: '#52af77'}}} />} label="g入力" onChange = {e => setRadio(e.target.value)}/>
                        {
                            isSupecified
                            &&
                            <> 
                                <Grid item>
                                    <Input
                                        type = "number"
                                        sx={{width:{md:150,xs:'100%'}}}
                                        id={"input_"+foodName+'_g'}
                                        endAdornment={<InputAdornment position="end">g</InputAdornment>}
                                        value = {value}
                                        onChange={(event) => 
                                            {
                                                setValue(event.target.value);
                                                let newUseFoodNameDict ={}
                                                for (let useFood in useFoodNameDict){
                                                    newUseFoodNameDict[useFood]=useFoodNameDict[useFood]
                                                }     
                                                newUseFoodNameDict[foodName]['gram']=event.target.value                                              
                                                setUseFoodNameDict(newUseFoodNameDict); 
                                            }
                                        }
                                        min="0"
                                        inputProps={{ min: 0}}
                                    />
                                </Grid>

                                <Grid item>
                                    <label>
                                        使い切り
                                        <Checkbox
                                            {...label} 
                                            checked={useUp} 
                                            color="success" 
                                            onChange={(event) => 
                                                {
                                                setUseUp(!useUp);
                                                let newUseFoodNameDict ={}
                                                for (let useFood in useFoodNameDict){
                                                    newUseFoodNameDict[useFood]=useFoodNameDict[useFood]
                                                }     
                                                newUseFoodNameDict[foodName]['use_up']=!useUp                                                     
                                                setUseFoodNameDict(newUseFoodNameDict); 
                                                }
                                            } 
                                        />
                                    </label>
                                </Grid>                           
                            </>
                        }

                        </RadioGroup>
                    </FormControl>
                }
            </Grid>
        </>   
    );

}

export default UseFoodDataInput;