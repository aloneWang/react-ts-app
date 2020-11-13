import * as React from 'react'
import { Tab } from './interface'

export interface TabContextProps {
    tabs: Tab[];
    prefixCls: string
}

// 创建 tabs 的 context 对象
export default React.createContext<TabContextProps>(null)