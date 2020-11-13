import * as React from 'react'
import {
    Tab
} from '../interface'

export interface TabNodeProps {
    prefixCls: string;
    tab: Tab;
    onClick: (e: React.MouseEvent | React.MouseEvent) => void
}
function TabNode({
    prefixCls,
    tab: { tab, key, disabled },
    onClick
}: TabNodeProps, ref: React.Ref<HTMLDivElement>) {
    const tabPrefix = `${prefixCls}-tab`
    let node: React.ReactElement = (
        <div>
            {/* Primary Tab Button */}
            <div
                role="tab"
                className={`${tabPrefix}-btn`}
                tabIndex={disabled ? null : 0}
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