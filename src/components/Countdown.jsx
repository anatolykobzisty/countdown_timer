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
      runningTime: 0,
      disabledSlider: false,
    };
    this.audio = new Audio(audioSRC);
  }

  startCountdown = () => {
    this.setState(() => ({
      onCountdown: true,
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
        this.setState({ onCountdown: false, disabledSlider: false });
        this.audio.play();
      }
    }, 1000);
  };

  stopCountdown = () => {
    clearInterval(this.timer);
    this.setState({ onCountdown: false });
  };

  resetCountdown = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, onCountdown: false, disabledSlider: false });
  };

  handleChangeSlider = value => {
    this.setState({ onCountdown: false });
    this.setState(() => ({
      runningTime: value,
      startTimeCountdown: value,
    }));
  };

  handleChangeInputMinutes = value => {
    this.setState({
      runningTime: value * 60000,
      startTimeCountdown: value * 60000,
    });
  };

  handleChangeInputSeconds = value => {
    this.setState({
      runningTime: value * 1000,
      startTimeCountdown: value * 1000,
    });
  };

  msToTime = duration => {
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? ` 0${seconds} ` : ` ${seconds} `;
    return `${minutes} : ${seconds}`;
  };

  render() {
    const { onCountdown, startTimeCountdown, runningTime, disabledSlider } = this.state;
    return (
      <div className="countdown">
        <div className="countdown__inner">
          <div className="countdown__progress">
            <Progress
              percent={Math.round((runningTime / startTimeCountdown) * 100)}
              showInfo={false}
            />
          </div>
          <h1 className="countdown__display">{this.msToTime(runningTime)}</h1>
          <div className="countdown__control">
            <Button
              type={onCountdown ? 'danger' : 'primary'}
              onClick={onCountdown ? this.stopCountdown : this.startCountdown}
            >
              {onCountdown ? 'stop' : 'start'}
            </Button>
            <Button onClick={this.resetCountdown}>reset</Button>
          </div>
          <div className="countdowninput">
            <CountdownInput
              handleChangeSlider={this.handleChangeSlider}
              handleChangeInputMinutes={this.handleChangeInputMinutes}
              handleChangeInputSeconds={this.handleChangeInputSeconds}
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
