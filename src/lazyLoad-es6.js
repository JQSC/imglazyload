//利用Symbol数据类型的特性，构建私有函数
const _deferredTrigger = Symbol('_deferredTrigger');
const _isVisibleRange = Symbol('_isVisibleRange');
const _renderImg = Symbol('_renderImg');
const VERSION = '1.0';
const global = typeof window !== "undefined" ? window : this;

/**
 * 图片懒加载
 * @param {lazyAheadTop} 预加载:距离可视区一定距离进行预先加载
 * @param {lazyTime} 降低滚动条事件触发频率
 * @method init() 提供实例后的初始化方法,对页面需要图片懒加载区域进行初始渲染

 **/
//加入修饰器设置默认lazyAheadTop高度
//@distanceLimit(100)
class lazyLoadES6 {
    constructor() {
        this.defaultOptions = {
            lazyAheadTop: 0,
            lazyTime: 10
        }
        this.timeer = null;
        this.srcList = [];
    }
    [_isVisibleRange](el, dtop = 0) {
        //元素的位置
        let rect = el.getBoundingClientRect();
        return (rect.top - dtop) <= (global.innerHeight || global.document.documentElement.clientHeight)
    }
    [_renderImg]() {
        //类数组具有Symbol.itrater属性,可以用for of进行枚举
        const dtop = this.defaultOptions.lazyAheadTop;
        for (let el of this.srcList) {
            //需要判断当前元素是否满足条件
            if (this[_isVisibleRange](el, dtop)) {
                el.src = el.getAttribute('data-lazyimg');
            }
        }
    }
    [_deferredTrigger]() {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => this[_renderImg](this.srcList)
            , this.defaultOptions.lazyTime)
    }
    init(ops) {
        Object.assign(this.defaultOptions, ops || {});
        if (!global.document) {
            throw new Error("lazyLoad requires a window with a document");
        }
        //获取图片路径列表
        this.srcList = (global.document.getElementById(this.defaultOptions.containerID) || global.document).getElementsByTagName('img');
        this[_renderImg]();
        //监听滚动条延时触发渲染
        if (global.addEventListener) {
            global.addEventListener('scroll', ev => this[_deferredTrigger]());
        } else {
            global.attachEvent('onscroll', ev => this[_deferredTrigger]());
        }
    }
}
//配置默认的预加载高度
function distanceLimit(top = 0) {
    return function (target) {
        if (top > 500) return;
        target.defaultOptions.lazyAheadTop = top;
    }
}

//export default lazyLoadES6;