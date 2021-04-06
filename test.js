function f1() {
  console.log(x,y);
}

function f2() {
  let x=1,y=2;
  f1(x,y);
}
// f2();


try {
  // return
  throw new Error("err1");

} catch (error) {
  console.log(error.message);
  // return;
} finally{
  console.log("finally");
}

// function fun() {
//   try {
//     try {
//       throw new Error("oops");
//     }
//     catch (ex) {
//       console.error("inner", ex.message);
//       throw ex;
//     }
//     finally {
//       console.log("finally");
//       return;
//     }
//   }
//   catch (ex) {
//     console.error("outer", ex.message);
//   }
  
// }
// console.log(fun());

// let promise1 = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     // console.log("setTimeout in promise");
//     resolve("set message in resolve");
//   },2000);
//   resolve("set message in resolve");
//   console.log("promise内的同步excutor回调函数");
// });

// promise1.then((value)=>{
//   console.log(value);
// },(reason)=>{
//   console.log(reason);
// });
// console.log(promise1);

// let p1 = new Promise((resolve,reject)=>{
  
//   throw "my error message";

// });

let timer1 = setTimeout(()=>{
  console.log("timer1");
},0);

let p1 = new Promise((resolve,reject)=>{
  
  setTimeout(()=>{
    reject("rejected")
  },0)

});

p1.then(
  value => {console.log("onResolved:",value);},
  reason => {console.log("onRejected:",reason);}
);

/* output:
  onRejected: my error message  */

// function Person(name) {
//   this.name = name;
// }
// Person.prototype.getThis = function () {
//   console.log(this);
// }
// let person1 = new Person("张三");
// person1.getThis()