import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber } from 'antd';

class CountdownInput extends PureComponent {
  render() {
    const { onChange, disabledSlider } = this.props;
    return (
      <>
        <div className="countdowninput__slider">
          <Slider
            min={0}
            max={3600000}
            step={15000}
            onChange={onChange}
            tooltipVisible={false}
            disabled={disabledSlider}
            autoFocus
          />
        </div>
        <div className="countdowninput__inputnumber">
          <div className="countdowninput__inputnumber-minutes">
            <span>minutes</span>
            <InputNumber
              min={0}
              max={43200000}
              step={60000}
              onChange={onChange}
              disabled={disabledSlider}
            />
          </div>
          <div className="countdowninput__inputnumber-seconds">
            <span>seconds</span>
            <InputNumber
              min={0}
              max={43200000}
              step={1000}
              onChange={onChange}
              disabled={disabledSlider}
            />
          </div>
        </div>
      </>
    );
  }
}

CountdownInput.propTypes = {
  onChange: PropTypes.func,
  disabledSlider: PropTypes.bool,
};
CountdownInput.defaultProps = {
  onChange: null,
  disabledSlider: false,
};
export default CountdownInput;
