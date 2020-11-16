// raf
import * as React from 'react'
import raf from 'raf'
export default function useRaf<Callback extends Function>(callback:Callback) {

    const removeRef = React.useRef(false)
    const rafRef = React.useRef<number>()

    function trigger(...args:any[]) {
        if(!removeRef.current) {
            raf.cancel(rafRef.current)
            rafRef.current = raf(() => {
                callback(...args)
            })
        }
       
    }
    // 卸载 清除副作用
    React.useEffect(() => {
        return () => {
            raf.cancel(rafRef.current)
            removeRef.current = true
        }
    },[])
    
    return trigger
}

type Callback<T> = (ori:T) => T

// 管理 tabsizes
export function useRafState<T>(defaultValue:T | (()=> T) ): [T, (updater:Callback<T>)=> void] {
    const batchRef = React.useRef<Callback<T>[]>([])
    const [, forceUpdate] = React.useState({})

    // 缓存 defaulteValue
    const state = React.useRef<T>( typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue)

    const flushUpdate = useRaf(() => {
        let current = state.current
        batchRef.current.forEach( callback => {
            current = callback(current)
        })
        batchRef.current = []

        state.current = current
        // 强制更新 渲染
        forceUpdate({})
    })

    function updater(callback:Callback<T>) {
        batchRef.current.push(callback)
        flushUpdate()
    }
    return [state.current, updater]
}