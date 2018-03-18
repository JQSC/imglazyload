# 图片懒加载
使用了HTML5的`date`属性，ES5模式下兼容IE8+,默认图片为`1 x 1`的blank.gif,
提供了简单的两种写法，es5的构造函数+原型的写法，和ES6的类式写法。

### 使用方式为
```js
    var el = new lazyLoadES6();
    el.init({
        lazyAheadTop: 100,
        lazyTime: 100,
        containerID: 'container'
    })
```

### 属性说明
| 参数          | 说明   | 类型  | 可选值  |默认值|
| ------------- |:------:| :-----:| :-----:| :-----:|
| `lazyAheadTop `| 距离可视区一定距离进行预先加载 | number |0-500|0|
| `lazyTime `| 滚动条事件延迟处理的时间 | number |--|10|
| `containerID `| 父元素id | string |--|--|

