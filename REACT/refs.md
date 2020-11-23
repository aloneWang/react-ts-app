## 释义
是对子组件的DOM的一个引用， 和 `Vue` 的 ref 类似
## api
+ React.createRef
  创建refs
+ React.useRef
  hook 函数, 返回一个ref对象，获取dom对象
  注意：当ref对象变化时，useRef 不会通知你，变更 .current 属性，不会造成重新渲染， 若想在 React 绑定或解绑 dom 运行 代码，则使用 `回调refs`
  useRef 返回的对象 在组件 的整个周期 中 都是保持不变的

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  render() {
    return (
      <div ref={ this.ref }><div/>
    )
  }
}
``` 
`注意：函数组件不能使用 refs 属性，因为它没有实例， 可以使用 forwardRef api ,接受 ref 再传入 DOM`
### 访问refs
ref.current 属性 指向 元素 的 引用
+ 当 ref属性 用于 HTML 时候， 其 current 值 接受 最底层的 DOM 元素
+ 当 ref 属性 用于 class 组件 时， 其 current 值 接受 class 组件 的实例
## 回调 refs
另一种 设置 refs 的方式
```
class MyComponent extends React.component {
  constructor(props) {
    super(props)
  }
  setRef(ele) {
    this.refs = ele
  }
  componentDidMount() {
    // 挂载后， 获取焦点
    if(this.refs) this.refs.focus()
  }
  render() {
    return (
      <input ref={ this.setRef } />
    )
  }
}
```
React 将在组件挂载时 ，调用 ref 回调函数 传入 dom元素， 在 卸载时 传入 null

## refs 转发
其实就是提升 refs 的值， 解决 嵌套的 refs属性
（允许 组件接受 refs属性， 并向下传递）
这里使用 函数组件 
```
const ref = React.createRef()
const FancyButton = React.forwardRef((props, ref) => {
  return (
    <input ref={ref}/>
  )
})
<FancyButton  ref={ref}/>
```
这里 ref 不在 props 属性中

## 高阶组件（HOC) 转发 refs 属性
```
function LogProps(component) {
  class Wrap extends React.component {
    render() {
      const {forwardRef, ...rest} = this.props
      return (
        <component ref={forwardRef} {...rest} />
      )
    }
  }
  return 
    React.forwardRef( (props, ref) => {
      return <Wrap  forwardRef={refs} {...props}/>
    })
}
const HOC = LogProps(FancyButton)
const ref= React.createRef()
<HOC ref={ref}/>

```