import React, { Component } from 'react';
import { Button, Progress } from 'antd';
import CountdownInput from './CountdownInput';
import audioSRC from '../media/bell.mp3';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onCountdown: false,
      startTimeCountdown: 0,
      minutes: 0,
      seconds: 0,
      valueFormMinutes: 0,
      valueFormSeconds: 0,
      disabled: false,
    };
    this.audio = new Audio(audioSRC);
  }

  start = () => {
    const { minutes, seconds } = this.state;
    let countDownTime = minutes * 60 + seconds;
    this.setState({
      onCountdown: true,
      disabled: true,
    });
    this.timer = setInterval(() => {
      countDownTime -= 1;
      if (countDownTime < 0) {
        clearInterval(this.timer);
        this.audio.play();
        this.setState({
          onCountdown: false,
          valueFormMinutes: 0,
          valueFormSeconds: 0,
          disabled: false,
        });
      } else {
        this.setState({
          minutes: Math.floor(countDownTime / 60),
          seconds: Math.floor(countDownTime % 60),
          onCountdown: true,
        });
      }
    }, 1000);
  };

  stop = () => {
    clearInterval(this.timer);
    this.setState({ onCountdown: false });
  };

  reset = () => {
    clearInterval(this.timer);
    this.setState({
      minutes: 0,
      seconds: 0,
      onCountdown: false,
      disabled: false,
      valueFormMinutes: 0,
      valueFormSeconds: 0,
    });
  };

  handleChangeSlider = value => {
    this.setState({
      minutes: Math.floor(value / 60),
      seconds: Math.floor(value % 60),
      valueFormMinutes: Math.floor(value / 60),
      valueFormSeconds: Math.floor(value % 60),
      startTimeCountdown: value,
    });
  };

  handleChangeInputMinutes = value => {
    const { seconds } = this.state;
    this.setState({
      minutes: value,
      seconds: value === 720 ? 0 : seconds,
      valueFormMinutes: value,
      valueFormSeconds: value === 720 ? 0 : seconds,
      startTimeCountdown: value * 60 + (value === 720 ? 0 : seconds),
    });
  };

  handleChangeInputSeconds = value => {
    const { minutes } = this.state;
    this.setState({
      seconds: minutes === 720 ? 0 : value,
      valueFormSeconds: minutes === 720 ? 0 : value,
      startTimeCountdown: minutes === 720 ? 0 : value + minutes * 60,
    });
  };

  render() {
    const {
      onCountdown,
      startTimeCountdown,
      minutes,
      seconds,
      valueFormMinutes,
      valueFormSeconds,
      disabled,
    } = this.state;
    return (
      <div className="countdown">
        <div className="countdown__inner">
          <div className="countdown__progress">
            <Progress
              percent={Math.round(((minutes * 60 + seconds) / startTimeCountdown) * 100)}
              showInfo={false}
            />
          </div>
          <h1 className="countdown__display">
            {minutes < 10 ? `0${minutes}` : `${minutes}`} :{' '}
            {seconds < 10 ? ` 0${seconds} ` : ` ${seconds} `}
          </h1>
          <div className="countdown__control">
            <Button
              type={onCountdown ? 'danger' : 'primary'}
              onClick={onCountdown ? this.stop : this.start}
            >
              {onCountdown ? 'stop' : 'start'}
            </Button>
            <Button onClick={this.reset}>reset</Button>
          </div>
          <div className="countdowninput">
            <CountdownInput
              handleChangeSlider={this.handleChangeSlider}
              handleChangeInputMinutes={this.handleChangeInputMinutes}
              handleChangeInputSeconds={this.handleChangeInputSeconds}
              disabled={disabled}
              valueFormMinutes={valueFormMinutes}
              valueFormSeconds={valueFormSeconds}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
