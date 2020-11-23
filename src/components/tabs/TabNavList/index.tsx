import TabContext from '../TabContext' 
import classNames from 'classnames'
import * as React from 'react'
import TabNode from './TabNode'
import useRaf, { useRafState } from '../../../util/hook/useRaf'
import useRefs from '../../../util/hook/useRefs'
import ReactResizeObserver from '../../resizeObserver'

import {
    AnimatedConfig,
    TabPosition,
    TabSize,
    TabSizeMap
} from '../interface'
export interface TabNavListProps {
    tabPosition: TabPosition;
    className?: string;
    style?: React.CSSProperties,
    activeKey: string;
    animated: AnimatedConfig,
    tabBarGutter?: number,
    onTabClick: (key: string, e: React.KeyboardEvent | React.MouseEvent) => void
}

function TabNavList({
    className,
    style,
    onTabClick,
    activeKey,
    animated,
    tabBarGutter
}: TabNavListProps, ref: React.Ref<HTMLDivElement>) {
    console.log("组件更新")

    const { prefixCls, tabs } = React.useContext(TabContext)
    
    const [tabsizes, setTabSizes] = useRafState<TabSizeMap>(new Map())
    
    const [getRefKey, removeRef] = useRefs<HTMLDivElement>()
    
    const resizeObserveElement = useRaf( () => {
        setTabSizes(() =>{
            let newtabSize: TabSizeMap = new Map()
            tabs.forEach( tab => {
                const {key} = tab
                const tabNode = getRefKey(key)
                const {offsetWidth, offsetLeft} = tabNode.current
                newtabSize.set(key, {
                    width: offsetWidth,
                    left: offsetLeft
                })
            })
            return newtabSize
        })
    })
    
    // map
    // const taboffset = useOffset(tabsizes)

    // =================== Tab =======================
    // tabNav
    const tabNodes: React.ReactElement[] = tabs.map( tab => {
        const { key } = tab
        return (
            <TabNode  
                tab={tab}
                prefixCls={prefixCls}
                key={key}
                ref={ getRefKey(key) }
                tabBarGutter={tabBarGutter}
                onClick={(e) => {
                    onTabClick(key, e)
                }}
            ></TabNode>
        )
        
    })
    
    let inkStyle: React.CSSProperties = {}
    if(activeKey) {
        inkStyle = tabsizes.get(activeKey)
    }

    return (
        <ReactResizeObserver onResize={resizeObserveElement}>
            <div
                role="tablist"
                className={classNames(`${prefixCls}-nav`, className)}
                style={style}
            >
                { tabNodes }
                <div
                    className={classNames(
                        `${prefixCls}-ink-bar`,
                        {[`${prefixCls}-ink-bar-animated`]:  animated.inkBar})}
                    style={inkStyle}
                >

                </div>
            </div>
        </ReactResizeObserver>
    )

}
export default  React.forwardRef(TabNavList)