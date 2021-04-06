(function (w) {  
  
  
  /**
   * Promise构造函数
   * @param {function} executor 执行器函数 
   */
  function Promise(executor) {
    function resolve(value) {
      
    }

    function reject(reason) {
      
    }

    executor(resolve,reject)
  }
  /**
   * 用来指定成功/失败时的回调函数
   * @param {function} onResolved 
   * @param {function} onRejected 
   */
  Promise.prototype.then = function (onResolved, onRejected) {  

  }
  /**这是Promise原型对象上的catch函数
   * @param  {function} onRejected 这是onRejected函数的解释
   */

  Promise.prototype.catch = function (onRejected) {  
    
  }

  Promise.resolve = function (value) {  

  }

  Promise.reject = function (reason) {  

  }

  Promise.all = function (promiseArr) {  

  }

  Promise.race = function (promiseArr) {  

  }


  //向外暴露Promise
  w.Promise = Promise;
})(window)