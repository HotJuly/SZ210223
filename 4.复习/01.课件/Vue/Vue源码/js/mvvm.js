/**
 * 构造函数，相当于vue
 * @param {*} options 配置对象
 */
function MVVM(options) {
  /*
    options = {
        el: "#app",
        data: {
          msg: "hello mvvm",
          form:{
            data:123,
            msg:666
          }
        }
      }
  */
  // 给实例对象vm添加$options，值是配置对象
  this.$options = options || {};
  // 给实例对象vm添加_data（原数据），值就是配置对象中data数据
  // 定义变量data，值就是配置对象中data数据
  var data = this._data = this.$options.data;

  //目前已有三个位置存储data对象地址值
  // this._data在Vue2中,改为this.$data
  // var data = (this._data = this.$options.data);

  // var data = this.$options.data

  
  // 缓存this，为了后面函数可以使用
  var me = this;


  // 重点一:数据代理
  // 效果:将data中的所有属性名,都映射到this身上
  // 目的:其实没有数据代理对响应式原理没有任何影响,因为数据代理的目的就是方便开发者读取data中的数据
  // 数据代理：将data中数据代理到this上
  // 遍历data数据提取所有key，对其数据代理
  // 结果:this.form.data  ->this.$data.form.data
  // 总结:数据代理次数只跟data对象的直系属性有关,有几个直系属性就代理几次,不会进行深度代理
  Object.keys(data).forEach(function (key) {
    // 数据代理的方法
    me._proxyData(key);
  });

  
  // ["msg"].forEach(function (key) {
  //   // 数据代理的方法
  //   vm._proxyData("msg");
  // });

  // 代理计算属性
  this._initComputed();

  /*
    响应式的思路分析:
      什么叫做响应式
        当某个属性值发生变化时,会重新渲染页面
        拆解:
          1.如何知道属性值发生变化
            与数据代理非常相似,通过将属性重写为get和set访问描述符,可以知道何时修改了数据
          2.如何重新更新页面
            更新与当前变化的响应式属性相关的DOM的内容
            通过dep和wacther之间的映射关系实现的
  */


  //重点二:数据劫持
  // 数据劫持（数据绑定）：将data数据（_data, 原数据）重新定义，定义成响应式
  // 数据劫持的次数,是根据data对象内部的属性名多少决定的
  observe(data, this);
  // observe(data, vm);



  // 重点三:模板解析：
  // 1. 将插值语法/指令语法解析
  // 2. new Watcher建立dep和watcher建立联系，才能变成响应式
  this.$compile = new Compile(options.el || document.body, this);
  // vm.$compile = new Compile("#app" || document.body, vm);
}

// 构造函数的原型对象
MVVM.prototype = {
  constructor: MVVM,
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },
  // 数据代理的方法：将data数据代理到vm上
  _proxyData: function (key, setter, getter) {
    // vm._proxyData("msg");  key=>"msg"
    // this._proxyData(key) 所以_proxyData的this指向vm
    var me = this;
    setter =
      setter ||
      // 将data数据代理到vm上
      Object.defineProperty(me, key, {
        configurable: false, // 不能重新配置和删除 
        enumerable: true, // 可以被枚举
        get: function proxyGetter() {
          // 代理属性的读方法
          // 实际上返回是原数据的值
          return me._data[key];
        },
        set: function proxySetter(newVal) {
          // 代理属性的写方法
          // 实际上更新原数据的值
          me._data[key] = newVal;
        },
      });

      // 在vm实例对象身上创建msg属性,该属性是访问描述符
      // 如果以后通过vm.msg读取该属性的结果,会触发之前定义的get方法,读取结果根据该函数的return决定
      // 如果以后通过vm.msg = 123设置该属性的值,会触发之前定义的set方法,该函数内部逻辑有你自己决定
      // get/set方法与value值不共存
      // Object.defineProperty(vm, "msg", {
      //   configurable: false, // 不能重新配置和删除 
      //   enumerable: true, // 可以被枚举
      //   get: function proxyGetter() {
      //     // 代理属性的读方法
      //     // 实际上返回是原数据的值
      //     return vm._data["msg"];
      //   },
      //   set: function proxySetter(newVal) {
      //     // 代理属性的写方法
      //     // 实际上更新原数据的值
      //     vm._data["msg"] = newVal;
      //   },
      // });
  },

  _initComputed: function () {
    var me = this;
    var computed = this.$options.computed;
    if (typeof computed === "object") {
      Object.keys(computed).forEach(function (key) {
        Object.defineProperty(me, key, {
          get:
            typeof computed[key] === "function"
              ? computed[key]
              : computed[key].get,
          set: function () {},
        });
      });
    }
  },
};
