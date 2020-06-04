import React from 'react';
import { Button, Space } from 'antd';
import './Timer.scss';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInMs: 0,
      isPlay: false,
      startFromMs: 0,
    };
    this.timerId = null;
  }

  timerControl = (delay) => {
    const { isPlay, timeInMs, startFromMs } = this.state;
    const startTime = Date.now();

    if (!isPlay) {
      this.timerId = setInterval(() => {
        this.setState({ timeInMs: Date.now() + startFromMs - startTime });
      }, delay);
    }

    if (isPlay) {
      clearInterval(this.timerId);
      this.setState({ isPlay: false, startFromMs: timeInMs });
    }
  };

  resetTimer = () => {
    clearInterval(this.timerId);
    this.setState({ isPlay: false, timeInMs: 0, startFromMs: 0 });
  };

  onStartClick = () => {
    this.setState(({ isPlay }) => ({ isPlay: !isPlay }));
    this.timerControl(10);
  };

  timeView = (time, digits) => {
    const result = ((time < 10) ? `0${time}` : time);
    return result.toString().slice(-digits);
  };

  timeCount = (timeInSec) => {
    const ms = Math.floor(timeInSec / 10);
    let time = timeInSec;
    time = (time - (time % 1000)) / 1000;
    const sec = time % 60;
    time = (time - sec) / 60;
    const min = time % 60;
    return `${this.timeView(min)}:${this.timeView(sec)}:${this.timeView(ms, 2)}`;
  };

  render() {
    const { timeInMs, isPlay } = this.state;
    const btnText = isPlay ? 'Pause' : 'Play';
    return (
      <div>
        <div className="timer__value">
          { this.timeCount(timeInMs) }
        </div>
        <div className="timer">
          <Space>
            <Button type="primary" className="timer__btn" onClick={this.onStartClick}>{btnText}</Button>
            <Button type="primary" className="timer__btn" danger onClick={this.resetTimer}>Reset</Button>
          </Space>
        </div>
      </div>
    );
  }
}

export default Timer;
