import * as React from 'react'
import classNames from 'classnames'


export interface TabPaneProps {
    tab?: React.ReactNode;
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;

    tabKey?: string;
    active?: boolean;

}
export default function TabPane({
    prefixCls,
    className,
    style,
    active,
    tabKey,
    children,
}: TabPaneProps) {
    const mergedStyle: React.CSSProperties = {}
    if(!active) {
        mergedStyle.display = 'none'
    }
    return (
        <div
            role='tabpanel'
            style={{...style, ...mergedStyle}}
            className={classNames(
                `${prefixCls}-tabpane`,
                active && `${prefixCls}-tabpane-active`,
                className
            )}
        >
            { active && children}
        </div>
    )
}