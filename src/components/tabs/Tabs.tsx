import * as React from 'react'
import classNames from 'classnames'
// import useMergedState from 'rc-util/lib/hooks/useMergedState';
// import toArray from 'rc-util/lib/Children/toArray';
import toArray from '../../util/toArray'
import useMergedState from '../../util/hook/useMergedState'
import TabPanelList from './TabPanelList'
import TabPane from './TabPanelList/TabPane'

import {
    TabPosition,
    Tab,
    AnimatedConfig,
    renderTabBar
} from './interface'
import { TabPaneProps } from './TabPanelList/TabPane';
import TabNavList from './TabNavList'
import TabContext from './TabContext'

import ResizeObserver from 'resize-observer-polyfill'
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    childrend?: React.ReactNode;
    animated?: boolean | AnimatedConfig;
    activeKey?: string;
    renderTabBar?: renderTabBar,
    tabBarGutter?: number,
    defaultActiveKey?: string;
    tabPosition?: TabPosition;
    onTabClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
}

function parseTabList(children: React.ReactNode): Tab[] {
    return toArray(children)
        .map((node: React.ReactElement<TabPaneProps>) => {
            if(React.isValidElement(node)) {
                const key = node.key !== undefined ? String(node.key) : undefined;
                return {
                    key,
                    ...node.props,
                    node
                }
            }
            return null
        })
        .filter( tab => tab)
}

function Tabs({
    prefixCls= 'rc-tabs',
    className,
    children,
    activeKey,
    animated = {
        inkBar: true
    },
    renderTabBar,
    tabBarGutter,
    defaultActiveKey,
    tabPosition = 'top',
    onTabClick,
    ...restProps

}:TabsProps, ref: React.Ref<HTMLDivElement>) {
    const tabs = parseTabList(children)

    // 处理 过渡 props 格式
    let mergedAnimated: AnimatedConfig 
    if(animated === false) {
        mergedAnimated = {
            inkBar: false
        }
    } else if(animated === true){
        mergedAnimated = {
            inkBar: true
        }
    } else {
        mergedAnimated = {
            inkBar: true,
            ...(typeof animated === 'object' ? animated : {})
        }
    }
    // ===================== Active Key =========================
    const [mergedActiveKey, setMergedActiveKey] = useMergedState<string>(() => tabs[0]?.key, {
        value: activeKey,
        defaultValue: defaultActiveKey    
    })
    const shareProps = {
        activeKey: mergedActiveKey,
        tabPosition: tabPosition,
        animated:mergedAnimated
    }

    // 点击触发 处理
    function musterClick(key: string, e: React.KeyboardEvent | React.MouseEvent): void {
        setMergedActiveKey(key)
        
        onTabClick?.(key, e)
    }
    let tabNavBar: React.ReactElement;

    const tabNavBarProps = {
        ...shareProps, 
        tabBarGutter,
        onTabClick: musterClick  // TanNode 点击触发回到顶层执行
    }
    // 一些 props 传入 NavBar
    if(renderTabBar) {
        tabNavBar = renderTabBar(tabNavBarProps, TabNavList)
    } else {
        tabNavBar = <TabNavList {...tabNavBarProps}/>
    }
    
    return (
        <TabContext.Provider value={{tabs, prefixCls}}>
            <div
                className={classNames(
                    prefixCls,
                    className,
                    `${prefixCls}-${tabPosition}`
                )}
                {...restProps}
            >
                {tabNavBar}
                <TabPanelList
                    {...shareProps}
                >
                </TabPanelList>
            </div>
        </TabContext.Provider>
    )
}


const ForwardTabs = React.forwardRef(Tabs)

export type ForwardTabsType = typeof ForwardTabs & {TabPane: typeof TabPane}

(ForwardTabs as ForwardTabsType).TabPane = TabPane;

export default ForwardTabs as ForwardTabsType
