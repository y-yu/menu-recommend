import * as React from 'react';
import 'react-tabs/style/react-tabs.css';

import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

import {NutritionAndTimeContext} from './context';

//　デフォルトデータ
import data from '../data/data.json';
let defaultNutritions  = data.defaultNutritions;
let defaultTimeNames = data.defaultTimeNames;
let defaultNutritionsParams = data.defaultNutritionsParams;
let defaultTimeParams = data.defaultTimeParams;
let cardSize = data.cardSize;


export default class NutritionAndTimeInputCard extends React.Component {

    makeNutritionsNames(){

      let tmpComp = [];
      for (let nutritionsName in defaultNutritions){
        tmpComp.push(
        <>
          <NutritionsAndTimeInput 
          name = {nutritionsName}
          category="nutritions"
      />    
      <Divider/>
      </>)
      };

      for (let timeName in defaultTimeNames){
        tmpComp.push(<NutritionsAndTimeInput 
          name = {timeName} 
          category="time"
      />)
      }
      return <Box sx={{ width:'95%', height:600, overflow: 'auto'}}>{tmpComp}</Box>;
    }

    render(){
        return(
          <Card sx={{height:cardSize}} elevation={3}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        栄養素と調理時間
                    </Typography>
                    <Typography variant="body2">
                        <br/>栄養素の値と値の重みを設定してください
                        <br/>スライダーの値が0だと対応する制約は考慮されません
                    </Typography>
                </CardContent>
                <CardActions>
                  {this.makeNutritionsNames()}
                </CardActions>
          </Card>
        );
    }
}

  const NutritionsAndTimeInput = (props) => {

    const name = props.name;
    const category = props.category;

    let name_ja;
    let defaultValue;
    let defaultParameter;
    if (category=="nutritions"){
      name_ja = defaultNutritions[name]["ja"]
      defaultValue = defaultNutritions[name]["defaultValue"]
      defaultParameter = defaultNutritionsParams[name]["defaultValue"]
    }else{
      name_ja = defaultTimeNames[name]["ja"]
      defaultValue = defaultTimeNames[name]["defaultValue"]
      defaultParameter = defaultTimeParams[name]["defaultValue"]
    }

    const [ideal, setIdeal] = React.useContext(NutritionAndTimeContext);
    const [value, setValue] = React.useState(defaultValue);
    const [param, setParam] = React.useState(defaultParameter);

    React.useEffect(() =>
    {      
      let tmpIdeal = {}
      for(let id in ideal){
        tmpIdeal[id] = ideal[id]
      }
      tmpIdeal[name] = {
        "value" :  value,
        "param" : param
      }
      setIdeal(tmpIdeal);
      console.log(tmpIdeal);
    },
      [value, param]
    );

    const AddProperAdornment=()=>{
      if(name=="energy"){
        return "kcal"
      }else if(name=="time"){
        return "分"
      }else{return "g"}
    }

    
    return (
      <>
        <FormControl variant="standard" sx={{ m: 1, mt: 3 , width:150}}>
          <Typography variant="h9" component="div">
            {name_ja}
          </Typography>
          <Input
            type = "number"
            id={"input_"+name}
            endAdornment={<InputAdornment position="end">{AddProperAdornment()}</InputAdornment>}
            value = {value}
            onChange={(event) => setValue(event.target.value)}
            min="0"
            inputProps={{ min: 0}}
          />
        </FormControl>
        <br/>
        <br/>
        <Slider
          style={{ color: '#52af77'}}
          valueLabelDisplay="auto"
          slots={{
            valueLabel: ValueLabelComponent,
          }}
          value={Number(param)}
          min = {0}
          max = {0.5}
          step = {0.01}
          onChange={e => setParam(e.target.value)}/>
      </>
    );
  }



  function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };