import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

class CountdownInput extends PureComponent {
  render() {
    const {
      handleChangeSlider,
      handleChangeInputMinutes,
      handleChangeInputSeconds,
      valueFormMinutes,
      valueFormSeconds,
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
            value={valueFormMinutes * 60 + valueFormSeconds}
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
              value={valueFormMinutes}
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
              value={valueFormSeconds}
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
  valueFormMinutes: PropTypes.number,
  valueFormSeconds: PropTypes.number,
  disabled: PropTypes.bool,
};
CountdownInput.defaultProps = {
  handleChangeSlider: null,
  handleChangeInputMinutes: null,
  handleChangeInputSeconds: null,
  valueFormMinutes: 0,
  valueFormSeconds: 0,
  disabled: false,
};
export default CountdownInput;
