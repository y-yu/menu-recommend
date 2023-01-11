import * as React from 'react';
import 'react-tabs/style/react-tabs.css';
import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'mui-image'

import kondateImage from '../images/kondateImage.jpg';

// 上部の画像のレンダリング
export default class ImageOfMenu extends React.Component {
    render(){
        return (<Image
        src={kondateImage}
        height="100%"
        width="100%"
        fit="cover"
        duration={3000}
        easing="cubic-bezier(0.7, 0, 0.6, 1)"
        showLoading={ false }
        errorIcon={ true }
        shift={null}
        distance="100px"
        shiftDuration={900}
        bgColor="inherit"
        />
        );
    }
  }