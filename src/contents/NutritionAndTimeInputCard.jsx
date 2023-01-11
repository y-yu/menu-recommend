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
import Slider, { SliderThumb } from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';


//　デフォルトデータ
import data from '../data/data.json';
let nutritionsNames  = data.nutritionsNames;
let timeNames = data.timeNames;
let nutritionsParams = data.nutritionsParams;
let timeParams = data.timeParams;


export default class NutritionAndTimeInputCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // paramsData : this.props.paramsData,
            // category : this.props.category,
        }
    }



    makeNutritionsNames(){

      let tmpComp = [];
      for (let nutritionsName in nutritionsNames){
          tmpComp.push(<><NutritionsAndTimeInput 
          name = {nutritionsName}
          name_ja = {nutritionsNames[nutritionsName]["ja"]} 
          value = {nutritionsNames[nutritionsName]["defaultValue"]} 
          parameter={nutritionsParams[nutritionsName]["defaultValue"]}
          category="nutritions"
          params = {this.props.params}
          ideal_values = {this.props.ideal_values}
      />    
      <Divider/></>)
      };

      for (let timeName in timeNames){
        tmpComp.push(<NutritionsAndTimeInput 
          name = {timeName} 
          name_ja = {timeNames[timeName]["ja"]}
          value = {timeNames[timeName]["defaultValue"]} 
          parameter={timeParams[timeName]["defaultValue"]}
          category="time"
          params = {this.props.params}
          ideal_values = {this.props.ideal_values}
      />)
      }
      // return <div sx={{ display: "flex"}}>{tmpComp}</div>;
      return <Box sx={{ width:'95%', height:550, overflow: 'auto'}}>{tmpComp}</Box>;
    }

    render(){
        const  {category} = this.state;

        return(
          <Card sx={{height:700}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        栄養素
                    </Typography>
                    <Typography variant="body2">
                        <br/>栄養素の値と値の強さを設定してください<br/>パラメータは0だとこの制限は効かなくなります
                    </Typography>
                </CardContent>
                <CardActions>
                  {this.makeNutritionsNames()}
                </CardActions>
          </Card>
        );
    }
}

class NutritionsAndTimeInput extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        name:this.props.name,
        name_ja:this.props.name_ja,
        value:Number(this.props.value),
        parameter:Number(this.props.parameter),
        category:this.props.category,
        // showAlert:false
      }
    }

    componentDidUpdate(){
      this.props.ideal_values[this.state.name] = Number(this.state.value);
      this.props.params[this.state.name] = Number(this.state.parameter);
      // if (this.state.parameter == 0){
      //   console.log("説明出したいね");
      //   this.setState({showAlert:true});
      // }
      console.log(this.state.name+":"+this.state.value);
    }

    AddProperAdornment=()=>{
      if(this.state.name=="energy"){
        return "kcal"
      }else if(this.state.name=="time"){
        return "分"
      }else{return "g"}
    }

    render(){
      return (
      <><FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
         <Typography variant="h9" component="div">
            {this.state.name_ja}
         </Typography>
         {/* <FormHelperText id="standard-weight-helper-text">{this.state.name_ja}</FormHelperText> */}
         <Input
          type = "number"
          id={"input_"+this.state.name}
          endAdornment={<InputAdornment position="end">{this.AddProperAdornment()}</InputAdornment>}
          value = {this.state.value}
          onChange={(event) => this.setState({value: event.target.value})}
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
      value={Number(this.state.parameter)}
      min = {0}
      max = {0.5}
      step = {0.01}
      onChange={e => this.setState({parameter:Number(e.target.value)})}/>
      </>
    // <FormHelperText id="standard-weight-helper-text2">パラメータ</FormHelperText>
      );
    }

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