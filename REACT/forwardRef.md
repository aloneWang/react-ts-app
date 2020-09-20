### React.forwardRef
创建一个组件， 接受渲染函数作为参数, 函数中 可以获取props， ref
```
const FancyButton = React.forwardRef((props, ref) => {
  return (
    <button ref={ref} {..props}>
      {props.children}
    </button>
  )
})
```