### context
旨在解决那些嵌套多层的组件 传一些必要的 且冗余 的代码 ，而不必显式逐层传递props 

### API
+ React.createContext
    创建一个 `context` 对象
    ```
     const Mycontext = React.createContext(defaultValue)
    ```
    当组件树没有匹配到 `Provider`组件，defaultValue才会生效
+ Context.Provider
    Provider React 组件，允许消费组件订阅context 的变化
    `<Mycontext.Provider value={}>`, 其中的value 传递给 下面的消费组件，
    若value发生变化，下面的消费组件都会重新渲染，所以value类似于 `defaultValue`,只不过优先级更高
+ Class.contextType
    挂载在 class上 的一个 context 对象，然后可以通过 `this.context` 来访问最近的 context 
    ```
        class Myclass extends React.Component {
            static contextType = Mycontext
            render() {
                let value = this.context
            }
        }
    ```
+ Context.Consumer
    可以直接让你在函数组件订阅 context 的变化
    ```
    <Mycontext.Consumer>
        { value => /* 基于 context 进行渲染*/}
    </Mycontext.Consumer>
    ```
    其中的value 会取 最近的 provider 组件 value 否则取 defaultValue
+ context.dispalyName
    context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。
