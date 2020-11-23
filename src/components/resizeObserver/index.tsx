import * as React from 'react'

import ResizeObserver from 'resize-observer-polyfill'

interface ReactResizeObserverProps {
    children: React.ReactElement | React.ReactElement[] ;
    onResize?(): void
}

function ReactResizeObserver(props: ReactResizeObserverProps):  React.ReactElement {
    const {children, onResize} = props
    const ObserRef = React.useRef(null)
    const childNodes = React.Children.toArray(children)


    React.useEffect( () => {
        const RO = new ResizeObserver((entries) => {
            if(onResize) {
                Promise.resolve().then(() => {
                    onResize()
                })
            }
            
        })
        RO.observe(ObserRef.current)
        // destory
        return () => {
            RO.disconnect()
        } 
    },[])

    if(childNodes.length === 0) {
        console.error('nothing is observer')
        return null

    } else if(childNodes.length > 1) {
        console.warn('mount to first HTMLElement by default')
    }

    const RecEle:React.ReactElement[]= childNodes.map( child => {
        if(React.isValidElement(child)) {
            return child
        }
        return null

    }).filter( child => child)



    let childElement: React.ReactElement[]

    childElement = RecEle.map( (ele, index) => {
        let _ref = null
        if(index === 0) {
            _ref = ObserRef
        }
        return React.cloneElement(ele, {ref:_ref, key: `rc-resize-observe-`+index})
    })
    return (
       <>
        {childElement}
       </>
    )
    
}

export default ReactResizeObserver