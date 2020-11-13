### useState
```
const [state, setState] = useState(inital)
```
返回一个state 和一个更新它的函数，初始值是 传入值inital

`setState(newState)` 更新 state 的函数，接受一个新值，并将组件的更新加入下次更新队列中

### 惰性出事state
如果初始化state 通过复杂的算法计算获得，则可以传一个函数，次函数只在初始渲染时调用
`useState(()=>{})`