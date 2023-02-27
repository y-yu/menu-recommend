import * as React from 'react';
import {useContext} from "react";


import 'react-tabs/style/react-tabs.css';


import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider'

import LikeAndDislikeFoodNameInput from './LikeAndDislikeFoodNameInput';
import {LikeAndDislikeFoodNameSelectedListContext} from './context.js';

import typeToLabel from '../data/typeToLabel.json';

const AutoSuggestForLike = (props) => {

    let allCategory = Object.values(typeToLabel)
    let allFood = {} //全部の食材名の配列
    for(let category of allCategory){
      Object.assign(allFood, category)
    }
    
    let allType = Object.keys(allFood) //　食材名の全部の変換まえの食材名の配列

    const [likeAndDislikeFoodNameSelectedList, setLikeAndDislikeFoodNameSelectedList] = useContext(LikeAndDislikeFoodNameSelectedListContext);

    const makeInputComponents = () =>{
        var s = [];
        for(let likeAndDislikeFoodName of likeAndDislikeFoodNameSelectedList){
        s.push(<ul><LikeAndDislikeFoodNameInput name={likeAndDislikeFoodName}/><Divider /></ul>);
        }
        return <div>{s}</div>
    }

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

    return(
      <>
      {console.log(likeAndDislikeFoodNameSelectedList)}
      <Autocomplete 
        filterOptions={filterOptions}       
        disablePortal
        options={allType}
        getOptionLabel = {(food)=> food}
        id="like-and-dislike-input"
        renderInput={(params) => (
          <TextField {...params} label="好きな食材・嫌いな食材" variant="standard" sx={{width:250}} />
        )}
        onChange ={
          (event, newValue) => {
            console.log(newValue)
            if(newValue!=null)
              setLikeAndDislikeFoodNameSelectedList(new Set([...likeAndDislikeFoodNameSelectedList, newValue]))
          }
        }
      />
      <Box sx={{ width: '100%', height: 590, overflow: 'auto'}}>
        {makeInputComponents()}
      </Box>
    </>
    );
}

export default AutoSuggestForLike