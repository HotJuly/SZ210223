function Observer(data) {
    // data->this._data
    // 保存原data数据到this上
    // 该处this取名叫做ob对象
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk: function(data) {
        var me = this;
        // var me = ob
        // 遍历data数据
        // data=>{
        //     msg:"hello mvvm"
        // }
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
        // ["msg"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm");
        // });
    },
    convert: function(key, val) {
        //     ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val);
        // this.defineReactive(_data, "msg", "hello mvvm");
    },

    // 将属性定义成响应式数据的方法
    defineReactive: function(data, key, val) {
        // this.defineReactive(_data, "msg", "hello mvvm");
        // 每一个响应式属性（data中的数据）
        // 都通过闭包的方式保存了一个dep
        // 每次调用defineReactive都会产生一个全新的dep对象
        // data对象中具有几个属性名，就会执行几次defineReactive
        // 可得：每个属性都对应着一个dep
        var dep = new Dep();
        // 递归遍历
        // 如果当前val是一个对象数据，也要变成响应式
        // 先将里面属性变成响应式，在将外面属性变成响应式
        // 深度递归数据劫持
        var childObj = observe(val);
        // var childObj = observe("hello mvvm");

        // 将data的数据重新定义，定义成响应式
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    // 建立dep和watcher的关系
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                // 更新data数据
                val = newVal;
                // 新的值是object的话，进行监听
                // 新的数据劫持
                childObj = observe(newVal);
                // 通知订阅者
                // 通知数据的dep对应所有的watcher，调用cb来更新用户界面
                dep.notify();
            }
        });
        div.onclick=function(){

        }

        // 此处正在重写_data对象上原有的msg属性,将他从value值变成get/set
        // Object.defineProperty(_data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define
        //     get: function() {
        //         if (Dep.target) {
        //             // 建立dep和watcher的关系
        //             dep.depend();
        //         }
        // 
        //          此处使用闭包缓存了原先的msg数据
        //         return val;
        //     },
        //     set: function(newVal) {
            // this._data.msg=123;
            //  如果响应式属性重新赋值,如果新值和旧值相同,那么视图不会重新渲染,生命周期update阶段都不会执行
        //         if (newVal === val) {
        //             return;
        //         }
        //         // 更新data数据
        //         val = newVal;
        //         // 新的值是object的话，进行监听
        //         // 新的数据劫持
        //             响应式属性创建的两个时机:
        //              1.整个组件初始化的时候,会将data中所有属性都进行深度劫持
                        // 2.当给一个响应式属性赋值的时候,会将新值进行深度劫持
        //         childObj = observe(newVal);
        //         // 通知订阅者
        //         // 通知数据的dep对应所有的watcher，调用cb来更新用户界面
        //         dep.notify();
        //     }
        // });
    }
};

function observe(value, vm) {
  // observe(data, vm);
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    // 唯一id
    this.id = uid++;
    // 保存watcher的容器
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        // dep.addSub(watcher);
        // dep身上的subs数组,存放了与他相关的watcher
        // 解释:该响应式属性被哪几个插值语法或者指令使用到了
        this.subs.push(sub);
    },

    depend: function() {
        // Dep.target 是 watcher
        // watcher.addDep(dep)
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 遍历watcher
        this.subs.forEach(function(sub) {
            // 调用watcher.update
            sub.update();
        });
    }
};

Dep.target = null;