import React from 'react';
import * as ReactDOM from 'react-dom';
import './App.scss';
import { Tabs } from 'antd';
import Timer from '../Timer/Timer';
import Countdown from '../Countdown/Countdown';

const { TabPane } = Tabs;

class App extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Tabs defaultActiveKey="timer">
          <TabPane tab="Timer" key="timer">
            <Timer />
          </TabPane>
          <TabPane tab="Countdown" key="countdown">
            <Countdown />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
