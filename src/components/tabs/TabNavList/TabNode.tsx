import * as React from 'react'
import {
    Tab
} from '../interface'

export interface TabNodeProps {
    prefixCls: string;
    tab: Tab;
    tabBarGutter?: number;
    onRemove?():void;
    onClick: (e: React.MouseEvent | React.MouseEvent) => void
}
function TabNode({
    prefixCls,
    tab: { tab, key, disabled },
    onClick,
    tabBarGutter,
}: TabNodeProps, ref: React.RefObject<HTMLDivElement>) {


    const tabPrefix = `${prefixCls}-tab`
    const nodeStyle: React.CSSProperties = {}
    nodeStyle.marginRight = tabBarGutter

    let node: React.ReactElement = (
        <div
            style={nodeStyle}
        >
            {/* Primary Tab Button */}
            <div
                role="tab"
                className={`${tabPrefix}-btn`}
                tabIndex={disabled ? null : 0}
                ref={ref}
                onClick={ e => {
                    onClick(e)
                }}
            >
                {tab}
            </div>
        </div>
    )
    return node
}

export default React.forwardRef(TabNode)