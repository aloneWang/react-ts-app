## 学习react组件开发，顺带学ts

## ts
### 关键字 
+ type 
  类型别名，会给一个类型起个新名字， type 有时候 和 interface 很像
+ extends
  继承关键字
+ keyof
  索引类型操作符，对任何类型， keyof T 的结果为 T 上 已知的公共属性名的联合
+ Exclude
  type Exclude<T, U> = T extends U ? never : T;
  注意：
  ```
  Exclude<"1"| "2", "3"|"1"> ==
  Exclude<"1", "3"|"1"> | 
  Exclude<"2", "3"|"1">
  ===> never | "2" ===> "2"
  ```
+ Pick
  ```
    type Pick<T, K extends keyof T> = {
      [key in k]: T[key]
    }
  ```
  从一个复合类型中，取出几个想要的类型的组合



## React api
####  setState 更新 state 
语法
+ this.setState({comment: 'hellow'})
+ this.setState((state, props) => {
  return {}
})
第二种语法用来解决 异步更新state
## context
创建一个 context 对象，解决结构层次多的组件传参，类似 Vue 的 provide/inject
避免 一层一层 传入 props
## API
+ React.createContext
  ```
  const context = React.createContext(defaultValue)
  但 <context.Provider> 组件 没提供 value 属性 ，才会使用 defaultValue 值
  ```
+ context.Provider
  context 对象会返回一个 Provider React 组件，允许 消费组件（子组件） 订阅 context 的变化
+ context.contextType
  挂在 class 上 contextType 属性上被赋值一个 context。可以 `this.context ` 来访问 最近的 context的 值
  ```
  class MyClass extends React.Component {
    componentDidMount() {
      let value = this.context;
      /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
    }
    render() {
      let value = this.context;
      /* 基于 MyContext 组件的值进行渲染 */
    }
  }
  MyClass.contextType = MyContext;
  也可以在 class 里 设置 static contextType =  MyContext
  ```
+ context.Consumer
  `<context.Consumer>` 这里的  React 组件 也能订阅到  context 的变化
  ```
  <context.Consumer>
    // 这里 需要 函数 作为 子元素， 接收当前的 context 值， 如果最近的 provider 组件 没有 value值 ，则 取 default value
  </<context.Consumer>>
  ```



## React 命名空间
#### MouseEventHandler 事件句柄 泛型

#### React.FC
react 函数组件 接口类型
```
const Footre: React.FC<P> = () => {
  //
}
```

#### JSXElementConstructor(类型)
jsx 的标签的构造函数 -----> ReactElement.type

## 三方组件
rc-motion 动画组件


## 问题
#### 拖拽上传图片
在对input 标签 隐藏（display:none）后，在父标签上必须加上监听 `ondrop` 和 `ondragover` 事件，并且阻止默认动作