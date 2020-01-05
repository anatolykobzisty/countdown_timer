import React, { Component } from 'react';
import { Button, Progress } from 'antd';
import CountdownInput from './CountdownInput';
import audioSRC from '../media/bell.mp3';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      runningTime: 0,
      startTime: 0,
      disabledSlider: false,
    };
    this.audio = new Audio(audioSRC);
  }

  startTimer = () => {
    this.setState(() => ({
      timerOn: true,
      disabledSlider: true,
    }));

    this.timer = setInterval(() => {
      const { runningTime } = this.state;
      const newTime = runningTime - 1000;
      if (newTime >= 0) {
        this.setState({
          runningTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false, disabledSlider: false });
        this.audio.play();
      }
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  handleClick = () => {
    const { timerOn } = this.state;
    if (timerOn) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, timerOn: false, disabledSlider: false });
  };

  handleChange = value => {
    this.setState(() => ({
      runningTime: value,
      startTime: value,
    }));
  };

  msToTime = duration => {
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? ` 0${seconds} ` : ` ${seconds} `;
    return `${minutes} : ${seconds}`;
  };

  render() {
    const { timerOn, startTime, runningTime, disabledSlider } = this.state;
    return (
      <div className="countdown">
        <div className="countdown__inner">
          <div className="countdown__progress">
            <Progress percent={Math.round((runningTime / startTime) * 100)} showInfo={false} />
          </div>
          <h1 className="countdown__display">{this.msToTime(runningTime)}</h1>
          <div className="countdown__control">
            <Button type={timerOn ? 'danger' : 'primary'} onClick={this.handleClick}>
              {timerOn ? 'stop' : 'start'}
            </Button>
            <Button onClick={this.handleReset}>reset</Button>
          </div>
          <div className="countdowninput">
            <CountdownInput
              onChange={this.handleChange}
              disabledSlider={disabledSlider}
              runningTime={runningTime}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
