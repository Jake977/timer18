import React from 'react';
import * as PropTypes from 'prop-types';
import { Slider, InputNumber, Space } from 'antd';

class InputCountdown extends React.Component {
  constructor(props) {
    super(props);
    const { maxTimeInMin, maxSeconds, sliderStep } = this.props;
    this.maxTimeInMin = maxTimeInMin;
    this.maxSeconds = maxSeconds;
    this.sliderStep = sliderStep;
  }

  setTimeValue = (timeInSec) => {
    const { updateTime } = this.props;
    if (updateTime) updateTime(timeInSec);
  };

  onChangeMinField = (minutes) => {
    const min = minutes || 0;
    const { maxTimeInMin, timeInSec } = this.props;
    const currentMin = Math.trunc(timeInSec / 60);
    const currentSec = timeInSec - currentMin * 60;
    let newTimeInSec = min * 60 + currentSec;
    if (min >= maxTimeInMin) {
      newTimeInSec = maxTimeInMin * 60;
    }
    this.setTimeValue(newTimeInSec);
  };

  onChangeSecField = (seconds) => {
    const { maxTimeInMin, timeInSec } = this.props;
    const sec = seconds || 0;
    const currentMin = Math.trunc(timeInSec / 60);
    let newTimeInSec = currentMin * 60 + sec;

    if (currentMin >= maxTimeInMin) {
      newTimeInSec = maxTimeInMin * 60;
    }
    this.setTimeValue(newTimeInSec);
  };

  onSliderChange = (timeInSec) => this.setTimeValue(timeInSec);

  timeView = (time) => ((time < 10) ? `0${time}` : time);

  sliderFormatTip = (timeInSec) => {
    const minutes = Math.trunc(timeInSec / 60);
    const seconds = timeInSec - minutes * 60;
    return `${this.timeView(minutes)}:${this.timeView(seconds)}`;
  };

  render() {
    const {
      maxSliderInSec,
      timeInSec,
      startTimeInSec,
      isStarted,
    } = this.props;

    const time = (isStarted) ? startTimeInSec : timeInSec;
    const minutes = (startTimeInSec > 0) ? Math.trunc(time / 60) : 0;
    const seconds = time - minutes * 60;

    return (
      <div>
        <Space>
          <span className="">Minutes:</span>
          <InputNumber
            name="minField"
            defaultValue={0}
            type="number"
            max={this.maxTimeInMin}
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
            max={this.maxSeconds}
            min={0}
            value={seconds}
            onChange={this.onChangeSecField}
            disabled={isStarted}
          />
        </Space>
        <div className="countdown__slider">
          <Slider
            tipFormatter={this.sliderFormatTip}
            defaultValue={0}
            max={maxSliderInSec}
            step={this.sliderStep}
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
  maxSeconds: 59,
  sliderStep: 15,
  maxSliderInSec: 3600,
  timeInSec: 0,
  startTimeInSec: 0,
  isStarted: false,
};

InputCountdown.propTypes = {
  updateTime: PropTypes.func.isRequired,
  maxTimeInMin: PropTypes.number,
  maxSeconds: PropTypes.number,
  sliderStep: PropTypes.number,
  maxSliderInSec: PropTypes.number,
  timeInSec: PropTypes.number,
  startTimeInSec: PropTypes.number,
  isStarted: PropTypes.bool,
};

export default InputCountdown;
