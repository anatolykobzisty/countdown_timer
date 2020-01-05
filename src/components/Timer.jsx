import React, { Component } from 'react';
import { Button } from 'antd';

class Timer extends Component {
  state = {
    timerOn: false,
    runningTime: 0,
  };

  handleClick = () => {
    this.setState(state => {
      if (state.timerOn) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
        }, 20);
      }
      return { timerOn: !state.timerOn };
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, timerOn: false });
  };

  msToTime = duration => {
    let milliseconds = parseInt((duration % 1000) / 10, 10);
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? ` 0${seconds} ` : ` ${seconds} `;
    milliseconds = milliseconds < 10 ? ` 0${milliseconds}` : ` ${milliseconds}`;
    return `${minutes} : ${seconds} : ${milliseconds}`;
  };

  render() {
    const { timerOn, runningTime } = this.state;
    return (
      <div className="timer">
        <div className="timer__inner">
          <h1 className="timer__display">{this.msToTime(runningTime)}</h1>
          <div className="timer__control">
            <Button type={timerOn ? 'danger' : 'primary'} onClick={this.handleClick}>
              {timerOn ? 'stop' : 'start'}
            </Button>
            <Button onClick={this.handleReset}>reset</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
