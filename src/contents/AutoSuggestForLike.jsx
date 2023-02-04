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

import UseFoodDataInput from './UseFoodDataInput';
import LikeAndDislikeFoodNameInput from './LikeAndDislikeFoodNameInput';
import { AllFoodArrayContext, LikeAndDislikeFoodNameSelectedListContext} from './context.js';




const AutoSuggestForLike = (props) => {


    //全部の食材名の配列
    const allFoodArray = useContext(AllFoodArrayContext)

    const [likeAndDislikeFoodNameSelectedList, setLikeAndDislikeFoodNameSelectedList] = useContext(LikeAndDislikeFoodNameSelectedListContext);

    const makeInputComponents = () =>{
        var s = [];
        for(let likeAndDislikeFoodName of likeAndDislikeFoodNameSelectedList){
            console.log(likeAndDislikeFoodName)
        s.push(<ul><LikeAndDislikeFoodNameInput name={likeAndDislikeFoodName}/><Divider /></ul>);
        }
        return <div>{s}</div>;
    }

    return(<>
        {console.log(likeAndDislikeFoodNameSelectedList)}
        <Autocomplete        
        disablePortal
        options={allFoodArray}
        getOptionLabel={(food)=> food.name}
        id="like-and-dislike-input"
        renderInput={(params) => (
          <TextField {...params} label="好きな食材・嫌いな食材" variant="standard" sx={{width:250}} />
        )}
        onChange={(event, newValue)=>{if(newValue!=null)setLikeAndDislikeFoodNameSelectedList(new Set([...likeAndDislikeFoodNameSelectedList,newValue.name]))}}
      />
      <Box sx={{ width: '100%', height: 590, overflow: 'auto'}}>
      {makeInputComponents()}
      </Box>
      </>
    );
}

export default AutoSuggestForLike