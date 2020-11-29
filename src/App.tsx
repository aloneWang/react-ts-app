import React from 'react';
import Steps from './components/steps/examples/alternativeLabel'
import Test from './components/test'
import Upload from './components/upload'
import Tabs, { TabPane } from './components/tabs'
import './App.css';

import {UploadProps} from './components/upload/interface'
function App() {

  const renderTabBar = (props, DefaultTabBar) => (
    <div className="rendertab">
      <DefaultTabBar
        {...props} 
      />
    </div>
  )
  const uploadProps:UploadProps = {
    onSuccess(body, xhr) {
      console.log(body)
    },
    onError(e: Error) {
      console.log(e)
    },
    action: '/api/upload', // 在 nodeServe 仓库中
    method: 'post',
    name: 'img',
    multiple: true
  }  
  return (
    <div className="App">
      <Tabs defaultActiveKey="2" renderTabBar={renderTabBar} tabBarGutter={12}>
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
      <Upload {...uploadProps}>上传图片</Upload>
    </div>
  );
}

export default App;
