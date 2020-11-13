import TabContext from '../TabContext' 
import classNames from 'classnames'
import * as React from 'react'
import TabNode from './TabNode'

import {
    TabPosition,
} from '../interface'
export interface TabNavListProps {
    tabPosition: TabPosition;
    className?: string;
    style?: React.CSSProperties,
    onTabClick: (key: string, e: React.KeyboardEvent | React.MouseEvent) => void
}

function TabNavList({
    className,
    style,
    onTabClick
}: TabNavListProps, ref: React.Ref<HTMLDivElement>) {
    const { prefixCls, tabs } = React.useContext(TabContext)
    
    // =================== Tab =======================
    // tabNav
    const tabNodes: React.ReactElement[] = tabs.map( tab => {
        const { key } = tab
        return (
            <TabNode  
                tab={tab}
                prefixCls={prefixCls}
                key={key}
                onClick={(e) => {
                    onTabClick(key, e)
                }}
            ></TabNode>
        )
        
    })
    return (
        <div
            role="tablist"
            className={classNames(`${prefixCls}-nav`, className)}
            style={style}
        >
            { tabNodes }
            <div
                className={classNames(`${prefixCls}-ink-bar`)}
            >

            </div>
        </div>
    )

}
export default  React.forwardRef(TabNavList)