import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

class CountdownInput extends PureComponent {
  render() {
    const {
      handleChangeSlider,
      handleChangeInputMinutes,
      handleChangeInputSeconds,
      disabledSlider,
      runningTime,
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
            value={runningTime}
            disabled={disabledSlider}
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
              value={runningTime}
              disabled={disabledSlider}
            />
          </div>
          <div className="countdowninput__inputnumber-seconds">
            <span>seconds</span>
            <InputNumber
              min={0}
              max={59}
              step={1}
              onChange={handleChangeInputSeconds}
              value={runningTime}
              disabled={disabledSlider}
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
  runningTime: PropTypes.number,
  disabledSlider: PropTypes.bool,
};
CountdownInput.defaultProps = {
  handleChangeSlider: null,
  handleChangeInputMinutes: null,
  handleChangeInputSeconds: null,
  runningTime: 0,
  disabledSlider: false,
};
export default CountdownInput;
