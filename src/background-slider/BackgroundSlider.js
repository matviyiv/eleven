import React, { Component } from 'react';
import './background-slider.styles.css';

import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';

export default class BackgroundSlider extends Component {
  static defaultProps = {
    changeTime: 3000
  }

  state = {
    activeIndex: randomImageIndex()
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setTimer();
  }

  setTimer = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({activeIndex: randomImageIndex()});
    }, this.props.changeTime);
  }

  render() {
    const { activeIndex } = this.state;
    const imagesList = [image1, image2, image3, image4 ].map((img, index) => {
      let imageClass = 'background__image background__image';
      imageClass += activeIndex === index ? '--visible' : '--hidden';
      return (<div className={imageClass} style={{backgroundImage: `url(${img})`}} key={index}></div>);
    })

    return (
      <div className="background">
        <div className="background__container">
          {imagesList}
        </div>
      </div>
    );
  }
}

function randomImageIndex() {
  return Math.floor(Math.random() * 3) + 0 ;
}