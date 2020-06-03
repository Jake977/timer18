import React from 'react';
import {
  Button,
  Space,
  Divider,
  Row,
  Col,
  Progress,
} from 'antd';

import './Countdown.scss';
import InputCountdown from '../InputCountdown/InputCountdown';

const timerSound = require('../../sound/alarm.mp3');

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInSec: 0,
      isPlay: false,
      isStarted: false,
      startTimeInSec: 0,
    };
    this.countdownId = null;
    this.timerSound = new Audio(timerSound);
  }

  countdown = () => {
    const { timeInSec } = this.state;
    if (timeInSec <= 0) {
      clearInterval(this.countdownId);
      this.setState({ isPlay: false, isStarted: false });
      this.timerSound.play();
    } else {
      this.setState({ timeInSec: timeInSec - 1 });
    }
  };

  start = () => {
    const { isPlay } = this.state;
    if (!isPlay) {
      this.countdownId = setInterval(this.countdown, 1000);
      this.setState({ isPlay: true, isStarted: true });
    } else {
      clearInterval(this.countdownId);
      this.setState({ isPlay: false });
    }
  };

  reset = () => {
    clearInterval(this.countdownId);
    this.setState({ isPlay: false, timeInSec: 0, isStarted: false });
  };

  onChangeTime = (timeInSec) => {
    this.setState({
      timeInSec,
      startTimeInSec: timeInSec,
    });
  };

  progressBar = (timeInSec, startTimeInSec) => {
    const onePercent = (startTimeInSec / 100);
    return Math.trunc(100 - (timeInSec / onePercent));
  };

  timeView = (time) => ((time < 10) ? `0${time}` : time);

  render() {
    const {
      timeInSec,
      isPlay,
      isStarted,
      startTimeInSec,
    } = this.state;
    const minutes = Math.trunc(timeInSec / 60);
    const seconds = timeInSec - minutes * 60;
    const progress = (isStarted) ? this.progressBar(timeInSec, startTimeInSec) : 0;
    const btnText = isPlay ? 'Pause' : 'Play';
    return (
      <div>
        <Row gutter={[10, 10]}>
          <Col span={10}>
            <div className="countdown__timeview">
              {`${this.timeView(minutes)}:${this.timeView(seconds)}`}
            </div>
          </Col>
          <Col span={14}>
            <div className="countdown__progressBar">
              <Progress strokeLinecap="square" percent={progress} />
            </div>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div className="countdown__inputsBlock">
              <InputCountdown onChange={this.onChangeTime} state={this.state} />
            </div>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div className="countdown__btnBlock">
              <Space>
                <Button
                  type="primary"
                  className="countdown__btn"
                  onClick={this.start}
                  disabled={!timeInSec}
                >
                  {btnText}
                </Button>
                <Button
                  type="primary"
                  className="countdown__btn"
                  onClick={this.reset}
                  disabled={!timeInSec}
                  danger
                >
                  Reset
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Countdown;
