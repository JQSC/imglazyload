/*
图片显示条件：
（元素当前位置相对可视区的top值） - （提前加载的配置高） <= （可视区的高度）
*/
(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global) :
            function (w) {
                if (!w.document) {
                    throw new Error("lazyLoad requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (global) {
    'use strict';

    global.lazyLoadES5 = function () {
        this.defaultOptions = {
            lazyAheadTop: 0,
            lazyTime: 10,
            containerID: null
        }
        this.timeer = null;
        this.srcList = [];
    }
    //判断位置是否达到显示的条件
    lazyLoadES5.prototype._isVisibleRange = function (el) {
        //元素的位置
        var rect = el.getBoundingClientRect();
        return (rect.top - this.defaultOptions.lazyAheadTop) <= (global.innerHeight || global.document.documentElement.clientHeight)
    }
    //renderImg
    lazyLoadES5.prototype._renderImg = function () {
        for (var i = 0, l = this.srcList.length; i < l; i++) {
            var el = this.srcList[i];
            //需要判断当前元素是否满足条件
            if (this._isVisibleRange(el)) {
                el.src = el.getAttribute('data-lazyimg');
            }
        }
    }
    //延迟render
    lazyLoadES5.prototype._deferredTrigger = function () {
        var self = this;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            self._renderImg(self.srcList)
        }, self.defaultOptions.lazyTime)
    }
    //初始化
    lazyLoadES5.prototype.init = function (ops) {
        var ops = ops || {};
        for (var key in ops) {
            if (ops[key]) {
                this.defaultOptions[key] = ops[key]
            }
        }
        //获取图片路径列表
        this.srcList = (global.document.getElementById(this.defaultOptions.containerID) || global.document).getElementsByTagName('img');

        this._renderImg();
        //监听滚动条延时触发渲染
        var self = this;
        if (global.addEventListener) {
            global.addEventListener('scroll', function () {
                self._deferredTrigger()
            });
        } else {
            global.attachEvent('onscroll', function () {
                self._deferredTrigger()
            });
        }
    }
})


