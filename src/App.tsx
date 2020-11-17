import React from 'react';
import Steps from './components/steps/examples/alternativeLabel'
import Test from './components/test'
import Tabs, { TabPane } from './components/tabs'
import './App.css';

function App() {

  const renderTabBar = (props, DefaultTabBar) => (
    <div className="rendertab">
      <DefaultTabBar
        {...props} 
      />
    </div>
  )

  return (
    <div className="App">
      <Tabs defaultActiveKey="2" renderTabBar={renderTabBar}>
        <TabPane tab="tab 1" key="1">
          第1个
        </TabPane>
        <TabPane tab="tab 2" key="2">
          第2个
        </TabPane>
        <TabPane tab="tab 3" key="3">
          第3个
        </TabPane>
      </Tabs>
      {/* <Steps /> */}
    </div>
  );
}

export default App;
