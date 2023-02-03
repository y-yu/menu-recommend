import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { LikeAndDislikeFoodNameDictContext , LikeAndDislikeFoodNameSelectedListContext} from './context.js';

const LikeAndDislikeFoodNameInput=(props)=>{

    const foodName = props.name;
    const[like, setLike] = useState(false);
    const[dislike, setDislike] = useState(false);
    const[likeAndDislikeFoodNameDict, setLikeAndDislikeFoodNameDict] = useContext(LikeAndDislikeFoodNameDictContext);
    const[likeAndDislikeFoodNameSelectedList, setLikeAndDislikeFoodNameSelectedList] = useContext(LikeAndDislikeFoodNameSelectedListContext);

    useEffect(()=>{
        let newLikeAndDislikeFoodNameDict = Object.assign(likeAndDislikeFoodNameDict);
      
        if ((!(newLikeAndDislikeFoodNameDict["like"].includes(foodName))) && like){
          newLikeAndDislikeFoodNameDict["like"].push(foodName);
        }
        if ((!(newLikeAndDislikeFoodNameDict["dislike"].includes(foodName))) && dislike){
          newLikeAndDislikeFoodNameDict["dislike"].push(foodName);
        }
        if ((newLikeAndDislikeFoodNameDict["like"].includes(foodName)) && !like){
          newLikeAndDislikeFoodNameDict["like"] = newLikeAndDislikeFoodNameDict["like"].filter(x => x !== foodName)
        }
        if ((newLikeAndDislikeFoodNameDict["dislike"].includes(foodName)) && !dislike){
          newLikeAndDislikeFoodNameDict["dislike"] = newLikeAndDislikeFoodNameDict["dislike"].filter(x => x !== foodName)
        }

        setLikeAndDislikeFoodNameDict(newLikeAndDislikeFoodNameDict);
        console.log(newLikeAndDislikeFoodNameDict);    
      },[like,dislike]
    );


  const deleteComponent=(foodName)=>{
    let newSelectedList = new Set(likeAndDislikeFoodNameSelectedList);
    newSelectedList.delete(foodName);
    setLikeAndDislikeFoodNameSelectedList(newSelectedList);
    
    let newLikeAndDislikeFoodNameDict = Object.assign(likeAndDislikeFoodNameDict);
    if (newLikeAndDislikeFoodNameDict["like"].includes(foodName)){
      newLikeAndDislikeFoodNameDict["like"] = newLikeAndDislikeFoodNameDict["like"].filter(x => x !== foodName)
    }
    if (newLikeAndDislikeFoodNameDict["dislike"].includes(foodName)){
      newLikeAndDislikeFoodNameDict["dislike"] = newLikeAndDislikeFoodNameDict["dislike"].filter(x => x !== foodName)
    }

    console.log(foodName+"を消しました")
    return;
  }  

    return(
    <>
    {console.log("likeAndDislikeList:"+likeAndDislikeFoodNameSelectedList)}
      {foodName}:
      <Tooltip title="Like">
        <Checkbox 
        icon={<FavoriteBorder />} 
        checkedIcon={<Favorite />} 
        name={foodName+"Like"}
        checked={like} 
        onChange={(event)=>setLike(event.target.checked)}
        value={like}/>
      </Tooltip>
      <Tooltip title="Dislike">
        <Checkbox 
        icon={<ThumbDownOffAltOutlinedIcon/>} 
        checkedIcon={<ThumbDownAltIcon/>} 
        name={foodName+"Dislike"} 
        checked={dislike} 
        onChange={(event)=>setDislike(event.target.checked)}
        value={dislike}/>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={()=>{deleteComponent(foodName)}}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
    );

  }

export default LikeAndDislikeFoodNameInput