import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber, Space } from 'antd';

class InputCountdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInSec: 0,
    };
  }

  setTimeValue = (timeInSec) => {
    const { onChange } = this.props;
    if (onChange) onChange(timeInSec);
  };

  onChangeMinField = (value) => {
    const min = value || 0;
    const { maxTimeInMin } = this.props;

    this.setState(({ timeInSec }) => {
      const currentMin = Math.trunc(timeInSec / 60);
      const currentSec = timeInSec - currentMin * 60;
      let newTimeInSec = min * 60 + currentSec;

      if (min >= maxTimeInMin) {
        newTimeInSec = maxTimeInMin * 60;
      }

      this.setTimeValue(newTimeInSec);
      return {
        timeInSec: newTimeInSec,
      };
    });
  };

  onChangeSecField = (value) => {
    const sec = value || 0;
    this.setState(({ timeInSec }) => {
      const currentMin = Math.trunc(timeInSec / 60);
      const newTimeInSec = currentMin * 60 + sec;
      this.setTimeValue(newTimeInSec);
      return {
        timeInSec: newTimeInSec,
      };
    });
  };

  onSliderChange = (timeInSec) => {
    this.setState({ timeInSec });
    this.setTimeValue(timeInSec);
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { maxSliderInSec, state } = this.props;
    // eslint-disable-next-line react/prop-types
    const { timeInSec, startTimeInSec, isStarted } = state;
    const time = (isStarted) ? startTimeInSec : timeInSec;
    const minutes = Math.trunc(time / 60);
    const seconds = time - minutes * 60;

    return (
      <div>
        <Space>
          <span className="">Minutes:</span>
          <InputNumber
            name="minField"
            defaultValue={0}
            type="number"
            max={720}
            min={0}
            value={minutes}
            onChange={this.onChangeMinField}
            disabled={isStarted}
          />
          <span className="">Seconds:</span>
          <InputNumber
            name="secField"
            defaultValue={0}
            type="number"
            max={59}
            min={0}
            value={seconds}
            onChange={this.onChangeSecField}
            disabled={isStarted}
          />
        </Space>
        <div className="countdown__slider">
          <Slider
            defaultValue={0}
            max={maxSliderInSec}
            step={15}
            onChange={this.onSliderChange}
            value={typeof timeInSec === 'number' ? timeInSec : 0}
            disabled={isStarted}
          />
        </div>
      </div>
    );
  }
}

InputCountdown.defaultProps = {
  maxTimeInMin: 720,
  maxSliderInSec: 3600,
  timeInSec: 0,
  startTimeInSec: 0,
  isStarted: false,
};

InputCountdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  maxTimeInMin: PropTypes.number,
  maxSliderInSec: PropTypes.number,
  timeInSec: PropTypes.number,
  startTimeInSec: PropTypes.number,
  isStarted: PropTypes.bool,
};

export default InputCountdown;
