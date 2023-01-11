import * as React from 'react';
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


//　デフォルトデータ
import data from '../data/data.json';
let machineNames = data.machineNames;
let defaultMachine = data.defaultMachine;

export default class MachineInputCard extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Card sx={{height:700}}>
                <CardContent>
                <Typography variant="h5" component="div">
                    マシン
                </Typography>
                <Typography variant="body2">
                    <br/>使用するマシンを選択してください
                </Typography>
                </CardContent>
                <CardActions>
                    <FormControl>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={defaultMachine}
                        name="radio-buttons-group"
                        >
                            {machineNames.map((machineName) => {return <FormControlLabel value = {machineName} control={<Radio sx={{'&.Mui-checked': { color: '#52af77'}}}/>} label={machineName} onChange = {e => this.props.setFunc(e.target.value)}/>})}
                        </RadioGroup>
                    </FormControl>
                </CardActions>
            </Card>);
    };
}
