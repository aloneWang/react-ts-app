// 获取 、 删除 ref 
import * as React from 'react'

export default function useRefs<T>():[(key: React.Key)=> React.RefObject<T>, (key: React.Key)=> void]  {
    const mapRef = React.useRef(new Map<React.Key, React.RefObject<T>>())

    const getRefKey = function(key: React.Key) {
        if(!mapRef.current.has(key)) {
            mapRef.current.set(key, React.createRef<T>())
        }
        return mapRef.current.get(key)
    }

    function removeRef(key: React.Key) {
        mapRef.current.delete(key)
    }
    return [getRefKey, removeRef]
}