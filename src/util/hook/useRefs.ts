// 获取 、 删除 ref 
import * as React from 'react'

export default function useRefs<T>():[(key: React.Key)=> React.RefObject<T>]  {
    const mapRef = new Map<React.Key, React.RefObject<T>>()
    const getRefKey = function(key) {
        if(!mapRef.has(key)) {
            mapRef.set(key, React.createRef<T>())
        }
        return mapRef.get(key)
    }
    return [getRefKey]
}