## 释义
一种标签语法
## 例子
```
const element = <h1>hello, world</h1>
```
### 支持嵌入表达式
使用大括号包裹
```
cons name = 'wenxi'
const element = <h1>hellow,{name}</h1>
```
### jsx 特定属性
使用引号将属性值指定为字符串字面量
```
const element = <h1 tabIndex="0" />
```
`注意: jsx 属性才用 小驼峰规则`
使用大括号包裹js表达式
```
const element = <img src={user} />
```
### jsx 防止 xss 注入攻击
React DOM 在渲染所有输入内容之前会进行转义，确保不会注入那些并非自己编写的内容

### jsx 怎样 转成 js对象
Babel 会把 jsx 通过 React.createElement() 函数调用
一下两种代码完全等效
```
const element= <h1 className="greeting">hello, world</h1>
```

```
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'hello, world'
)
```
`以下是通过React.createElement 转成的简化对象`：
```
// 简化的对象
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'hello, world'
    }
}
```
这些对象被称为 `React 元素`, 描述了你希望在屏幕上看到的内容， react 通过读取这些对象，然后使用它们构建DOM 以及随时更新

### props.children
jsx 中 开始标签 和 闭合标签 中的内容 统称 尾 `props.children`
```
function Component(props) {
    return (
        <>
        props.children
        </>
    )
}
<Component> 
    这里是props.children
</Component>
```
下面展示两张 控制台打印的 `props.children对象` 结构
![图片](/public/props.children结构图.png)

### React 的 类型（一些概要）
#### JSXElementConstructor(类型)
jsx 的标签的构造函数 -----> ReactElement.type

