import * as React from 'react'
import classNames from 'classnames'
import TabContext from '../TabContext'
import { TabPosition } from '../interface'
export interface TabPanelListProps {
    activeKey: React.Key;
    tabPosition?: TabPosition;
}
export default function TabPanelList({
    tabPosition,
    activeKey,
}:TabPanelListProps) {
    const {tabs, prefixCls} = React.useContext(TabContext)
    return (
        <div className={classNames(`${prefixCls}-content-holder`)}>
            <div className={
                classNames(`${prefixCls}-content`,`${prefixCls}-content-${tabPosition}`)}
                >
                {
                    tabs.map( tab =>{
                        return React.cloneElement(tab.node, {
                            key: tab.key,
                            prefixCls,
                            tabKey: tab.key,
                            active: tab.key === activeKey
                        })
                    })
                }
            </div>
        </div>
    )
}