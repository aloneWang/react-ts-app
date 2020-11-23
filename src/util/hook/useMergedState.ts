// 合并处理有关联的 porps
import * as React from 'react'
import { useState} from 'react'

export default function useMergedState<T, R= T>(
    defaultSetValue: T | (() => T), 
    option?: {
        value?:T ,
        defaultValue?: T | (()=>T)
    }
): [R, (value:T) => void] {
    const {value, defaultValue} = option

    const [innerValue, setInnerval] = useState(()=>{
        // 初次渲染执行
        if(value) {
            return value
        }
        if(defaultValue) {
            return typeof defaultValue === 'function'
            ? (defaultValue as any)() 
            : defaultValue
        }
        return typeof defaultSetValue === 'function' ? (defaultSetValue as any)() : defaultSetValue;
    })

    let mergedValue = value  || innerValue

    function triggerChange(newValue:T):void {
        setInnerval(newValue)
    }
    return [mergedValue ,triggerChange]
}
