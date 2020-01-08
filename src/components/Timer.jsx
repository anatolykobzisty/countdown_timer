import React, { Component } from 'react';
import { Button } from 'antd';

class Timer extends Component {
  state = {
    timerOn: false,
    runningTime: 0,
  };

  startTimer = () => {
    const { runningTime } = this.state;
    const startTime = Date.now() - runningTime;
    this.setState({ timerOn: true });
    this.timer = setInterval(() => {
      this.setState({ runningTime: Date.now() - startTime });
    }, 20);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    const { timerOn } = this.state;

    if (timerOn) {
      this.stopTimer();
      return false;
    }
    return this.setState({
      runningTime: 0,
      timerOn: false,
    });
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
            <Button
              type={timerOn ? 'danger' : 'primary'}
              onClick={timerOn ? this.stopTimer : this.startTimer}
            >
              {timerOn ? 'stop' : 'start'}
            </Button>
            <Button onClick={this.resetTimer}>reset</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
