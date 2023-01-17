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
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import AutoSuggestFoodInput from './AutoSuggestFoodInput';
import { LikeAndDislikeFoodNameDictContext } from './context.js';

export default class LikeAndDislikeFoodNameInput extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        foodName: this.props.name,
        like : false,
        dislike : false
      };
    }
  
    static contextType = LikeAndDislikeFoodNameDictContext;

    componentDidUpdate(){
        let newLikeAndDislikeFoodNameDict = this.context[0]
        const setLikeAndDislikeFoodNameDict = this.context[1]
        // newLikeAndDislikeFoodNameDict[this.state.foodName]={"like":this.state.like,"dislike":this.state.dislike};
        // setLikeAndDislikeFoodNameDict(newLikeAndDislikeFoodNameDict);
        // console.log(this.context[0])
        // console.log(newLikeAndDislikeFoodNameDict["like"]);
        // console.log(this.state.foodName);
      
        if ((!(newLikeAndDislikeFoodNameDict["like"].includes(this.state.foodName))) && this.state.like){
          newLikeAndDislikeFoodNameDict["like"].push(this.state.foodName);
        }
        if ((!(newLikeAndDislikeFoodNameDict["dislike"].includes(this.state.foodName))) && this.state.dislike){
          newLikeAndDislikeFoodNameDict["dislike"].push(this.state.foodName);
        }
        if ((newLikeAndDislikeFoodNameDict["like"].includes(this.state.foodName)) && !this.state.like){
          newLikeAndDislikeFoodNameDict["like"] = newLikeAndDislikeFoodNameDict["like"].filter(x => x !== this.state.foodName)
        }
        if ((newLikeAndDislikeFoodNameDict["dislike"].includes(this.state.foodName)) && !this.state.dislike){
          newLikeAndDislikeFoodNameDict["dislike"] = newLikeAndDislikeFoodNameDict["dislike"].filter(x => x !== this.state.foodName)
        }

        setLikeAndDislikeFoodNameDict(newLikeAndDislikeFoodNameDict);
        console.log(newLikeAndDislikeFoodNameDict);
      
    }

  
    render(){
      return(
      <>
        {this.state.foodName}:
        <Checkbox 
        icon={<FavoriteBorder />} 
        checkedIcon={<Favorite />} 
        name={this.state.foodName+"Like"}
        checked={this.state.like} 
        onChange={(event) => this.setState({like: event.target.checked})} 
        value={this.state.like}/>
        {/* <Checkbox  name={this.state.foodName+"Like"} checked={this.state.like} onChange={(event) => this.setState({like: event.target.checked})} value={this.state.like}/> */}
        {/* <input type="checkbox" name={this.state.foodName+"Like"} checked={this.state.like} onChange={(event) => this.setState({like: event.target.checked})} value={this.state.like}/> */}
        <Checkbox 
        icon={<ThumbDownOffAltOutlinedIcon/>} 
        checkedIcon={<ThumbDownAltIcon/>} 
        name={this.state.foodName+"Dislike"} 
        checked={this.state.dislike} 
        onChange={(event) => this.setState({dislike: event.target.checked})}
        value={this.state.dislike}/>
        {/* <input type="checkbox" name={this.state.foodName+"Dislike"} checked={this.state.dislike} onChange={(event) => this.setState({dislike: event.target.checked})} value={this.state.dislike}/> */}
      </>
      );
    };
  }
