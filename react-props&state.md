# props & state
react最重要的一个思想就是组件化，那我们在开发过程中，有些时候需要组件与组件之间互相传值，这个时候我们就用到了props与state。
props在react中的作用是传递属性，也就是说，在定义组件与使用组件之间的一种传递属性的方式。
组件不仅可以通过属性传递值，还可以传递方法，执行方法依然是通过props对象传递方法。
无论是使用函数或是类来声明一个组件，它决不能修改它自己的props,它具有只读性。
React里，只需更新组件的state，然后根据新的state重新渲染用户界面（不需要操作DOM）

### props.children
this.props.children的值有三种可能：如果当前组件没有子节点，它就是undefined；如果有一个子节点，它的值就是object；如果有多个子节点，它的值就是Array，所以，处理this.props.children的时候要小心。
React提供了一个工具方法`React.children`来处理this.props.children，我们可以用React.children.map来遍历子节点，而不用担心this.props.children的数据类型是undefined和object。

props与state的区别：State是可变的，是组件内部维护的一组用于反映组件UI变化的状态集合；而Props对于使用它的组件来说，是只读的。
props与state都比较适合小型项目，不适合很多组件之间互相传值的大型项目，这时候，我们就可以用到redux。