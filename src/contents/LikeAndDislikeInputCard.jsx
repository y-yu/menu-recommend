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
import Box from '@mui/material/Box';

import AutoSuggestFoodInput from './AutoSuggestFoodInput';

//　デフォルトデータ
import data from '../data/data.json';
let machineNames = data.machineNames;
let defaultMachine = data.defaultMachine;
let cardSize = data.cardSize;

//好き嫌いのカードの大枠を作る

export default class LikeAndDislikeInputCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
      console.log(this.props.useFoodNameDict);
    }

    render(){
        return(
            <Card sx={{height:cardSize}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        好き嫌い
                    </Typography>
                    <Typography variant="body2">
                        <br/>好きな食材と嫌いな食材を選択してください
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ width: '100%', height:400, overflow: 'auto'}}>
                        <AutoSuggestFoodInput type = "likeAndDislike"/>
                    </Box>
                </CardActions>
          </Card>
        );
    }

}
