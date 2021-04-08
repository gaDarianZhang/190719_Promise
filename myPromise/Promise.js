(function (w) {  

  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
  /**
   * Promise构造函数
   *
   * @date 08/04/2021
   * @param {function} executor Promise构造函数传入的执行器函数
   */
  function Promise(executor) {
    const self = this;
    self.status = PENDING;
    self.data = undefined;
    self.callbacks = [];

    function resolve(value) {
      if (self.status!==PENDING) {
        return;
      }

      self.status = RESOLVED;
      self.data = value;
      for(let i = 0; i < self.callbacks.length; i++){
        setTimeout(()=>{
          self.callbacks[i].onResolved(value);
        });
      }
    }

    function reject(reason) {
      if (self.status!==PENDING) {
        return;
      }

      self.status = REJECTED;
      self.data = reason;
      for(let i = 0; i < self.callbacks.length; i++){
        setTimeout(()=>{
          self.callbacks[i].onRejected(reason);
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
   * 原型对象内的then函数
   *
   * @date 08/04/2021
   * @param {function} onResolved 处理成功的回调函数
   * @param {function} onRejected 处理失败的回调函数
   * @return {promise} 返回一个新的promise对象
   */
  Promise.prototype.then = function (onResolved,onRejected) {  
    /* 
      1.当前promise已经返回成功resolved,需要将onResolved回调函数加入消息队列,需要返回新promise
      2.当前promise已经返回失败rejected,需要将onRejected回调函数加入消息队列,需要返回新promise
      3.当前promise还是unsettled状态，将回调函数推入callbacks数组,这个将来怎么返回新promise对象呢？
      
      返回的新的promise对象状态：
      1.如果该then函数中的回调函数抛出异常，返回的promise为rejected，reason为error
      2.如果该then函数中的回调函数返回了promise对象，那么回调函数返回的promise对象的状态就是then需要返回的promise的状态
      3.其他情况下，then返回的promise对象状态为resolved，value为then中回调函数的返回值。
    */
    const self = this;
    //针对没有定义onResolved和onRejected函数的情况
    onResolved = typeof onResolved ==="function"?onResolved:value=>value;
    onRejected = typeof onRejected === "function"?onRejected:reason=>{throw reason};
    return new Promise((resolve,reject)=>{

      function handleReturnedPromise(callback) {
        try {
          const result = callback(self.data);//如果回调函数抛出异常，直接到catch
          if (result instanceof Promise) {
            //1.2如果该then函数中的回调函数返回了promise对象，那么回调函数返回的promise对象的状态就是then需要返回的promise的状态
            result.then(
              value=>{resolve(value)},
              reason=>{reject(reason)}
              // resolve,reject
            )
          } else{
            //1.3其他情况下，then返回的promise对象状态为resolved，value为then中回调函数的返回值。
            resolve(result);
          }
        } catch (error) {
          reject(error);//1.1.抛出异常
        }
      }

      //1.当前promise已经返回成功resolved,需要将onResolved回调函数加入消息队列,需要返回新promise
      if (self.status===RESOLVED) {
        setTimeout(()=>{
          /* try {
            const result = onResolved(self.data);//如果回调函数抛出异常，直接到catch
            if (result instanceof Promise) {
              //1.2如果该then函数中的回调函数返回了promise对象，那么回调函数返回的promise对象的状态就是then需要返回的promise的状态
              result.then(
                value=>{resolve(value)},
                reason=>{reject(reason)}
                // resolve,reject
              )
            } else{
              //1.3其他情况下，then返回的promise对象状态为resolved，value为then中回调函数的返回值。
              resolve(result);
            }
          } catch (error) {
            reject(error);//1.1.抛出异常
          } */
          handleReturnedPromise(onResolved);
        });
      }
      //2.当前promise已经返回失败rejected,需要将onRejected回调函数加入消息队列,需要返回新promise
      else if (self.status===REJECTED) {
        setTimeout(()=>{
          handleReturnedPromise(onRejected);
        });
      }
      //3.当前promise还是unsettled状态，将回调函数推入callbacks数组,这个将来怎么返回新promise对象呢？
      else{//异步任务还没返回结果
        // self.callbacks.push({onResolved,onRejected});
        self.callbacks.push({
          //这是对象内函数的简写形式，而且对象内定义的函数名刚好是onResolved和onRejected,
          //并不是then函数内传入的两个回调函数
          onResolved(value){
            handleReturnedPromise(onResolved);
          },
          onRejected(reason){
            handleReturnedPromise(onRejected);
          }
        })
      }
    });
  }



  /**
   * 原型对象内的catch函数
   * 
   * @date 08/04/2021
   * @param {function} onRejected 处理失败的回调函数
   * @return {promise} 
   */
  Promise.prototype.catch = function (onRejected) {  
    return this.then(undefined,onRejected);
  }

  Promise.resolve = function (value) {  

    return new Promise((resolve,reject)=>{
      if (value instanceof Promise) {
        value.then(resolve,reject);
      }else{
        resolve(value);
      }
    });
  }

  Promise.reject = function (reason) {  

    return new Promise((resolve,reject)=>{
      reject(reason);
    });
  }

  Promise.all = function (promises) {  

    return new Promise((resolve,reject)=>{
      let values = [];
      promises.forEach((promise,index) => {
        promise.then(
          value=>{
            values[index] = value;
            if (values.length===promises.length) {
              resolve(values);
            }
          },
          reason=>{reject(reason);}
        )
      });
    });
  }

  Promise.race = function (promises) {  

    return new Promise((resolve,reject)=>{
      promises.forEach(promise => {
        promise.then(resolve,reject);
      });
    });
  }

  Promise.delayResolve = function (value,time) {  
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if (value instanceof Promise) {
          value.then(resolve.reject);
        }else{
          resolve(value);
        }
      },time)
    })
  }

  Promise.delayReject = function (reason,time) {  
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        reject(reason);
      },time);
    })
  } 

  w.Promise = Promise;
})(window)