import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

class CountdownInput extends PureComponent {
  render() {
    const {
      handleChangeSlider,
      handleChangeInputMinutes,
      handleChangeInputSeconds,
      minutes,
      seconds,
      disabled,
    } = this.props;
    return (
      <>
        <div className="countdowninput__slider">
          <Slider
            min={0}
            max={3600}
            step={15}
            onChange={handleChangeSlider}
            tooltipVisible={false}
            value={minutes * 60 + seconds}
            disabled={disabled}
            autoFocus
          />
        </div>
        <div className="countdowninput__inputnumber">
          <div className="countdowninput__inputnumber-minutes">
            <span>minutes</span>
            <InputNumber
              min={0}
              max={720}
              step={1}
              onChange={handleChangeInputMinutes}
              value={minutes}
              disabled={disabled}
            />
          </div>
          <div className="countdowninput__inputnumber-seconds">
            <span>seconds</span>
            <InputNumber
              min={0}
              max={59}
              step={1}
              onChange={handleChangeInputSeconds}
              value={seconds}
              disabled={disabled}
            />
          </div>
        </div>
      </>
    );
  }
}

CountdownInput.propTypes = {
  handleChangeSlider: PropTypes.func,
  handleChangeInputMinutes: PropTypes.func,
  handleChangeInputSeconds: PropTypes.func,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  disabled: PropTypes.bool,
};
CountdownInput.defaultProps = {
  handleChangeSlider: null,
  handleChangeInputMinutes: null,
  handleChangeInputSeconds: null,
  minutes: 0,
  seconds: 0,
  disabled: false,
};
export default CountdownInput;
