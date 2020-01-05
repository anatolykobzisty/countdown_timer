import React from 'react';

import { Tabs } from 'antd';

import Timer from './components/Timer';
import Countdown from './components/Countdown';
import './App.scss';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="container">
      <Tabs defaultActiveKey="1">
        <TabPane tab="TIMER" key="1">
          <Timer />
        </TabPane>
        <TabPane tab="COUNTDOWN" key="2">
          <Countdown />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
