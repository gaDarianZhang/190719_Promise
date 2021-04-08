(function (w) {  
  
  const PENDING = "pending";
  const RESOLVED = 'resolved';
  const REJECTED = "rejected";
  
  /**
   * Promise构造函数
   * @param {function} executor 执行器函数 
   */
  function Promise(executor) {
    const self = this;
    self.status = PENDING;
    self.data = undefined;
    self.callbacks = [];


    function resolve(value) {
      if (self.status!=PENDING) return;
      self.status = RESOLVED;
      self.data = value;
      if (self.callbacks.length>0) {
        self.callbacks.forEach(callbackObjs => {
          setTimeout(()=>{callbackObjs.onResolved(value);},0);
          self.callbacks.pop();
        });
      }
    }

    function reject(reason) {
      if(self.status!=PENDING) return;
      self.status = REJECTED;
      self.data = reason;
      if (self.callbacks.length>0) {
        self.callbacks.forEach(callbackObjs=>{
          setTimeout(()=>{callbackObjs.onRejected(reason);},0);
          self.callbacks.pop();
        });
      }
    }
    try {
      executor(resolve,reject);
    } catch (error) {
      reject(error);
    }
  }
  /**
   * 用来指定成功/失败时的回调函数
   * @param {function} onResolved 
   * @param {function} onRejected 
   */
  Promise.prototype.then = function (onResolved, onRejected) { 
    const self = this; 
    self.callbacks.push({onResolved,onRejected});
    if (self.status != PENDING) {
      self.callbacks.forEach(callbackObjs => {
        if (self.status===RESOLVED) {
          setTimeout(()=>{callbackObjs.onResolved(self.data)});
        }else{
          setTimeout(()=>{callbackObjs.onRejected(self.data)});
        }
        self.callbacks.pop();
      });
    }
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
}
)(window)