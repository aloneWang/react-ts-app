import * as React from 'react'
import { useEffect, useState } from 'react'
export default function Test(props): React.ReactElement{
    console.log(props.children)
    // useEffect(()=>{
    //     console.log('effect')
    // })
    console.log(props.children)
    // const [state, setState] = useState(0)
    // console.log(state)
    // setTimeout(()=>{
    //     setState(()=> 1)
    //     console.log('time')
    // },1000)
    return props.children ? props.children : null
}