
// let wait = ms=>new Promise((resolve,reject)=>{setTimeout(resolve,ms)});

// wait(1000).then(value=>{console.log(value);console.log("resolved");console.log(obj);}).catch(reject=>{console.log(reject);});
// console.log("after wait");

// // setTimeout(()=>{console.log(obj);},1000);//出现错误无法处理

// setTimeout(()=>{console.log("2second later");},2000);


let p1 = Promise.resolve("p1:resolved");
let p2 = Promise.reject("p2:rejected");
let p3 = function (choice) {  
  return new Promise((resolve,reject)=>choice=="resolved"?resolve("p3:"+choice):reject("p3"+choice));
}

// p3("resolved").then(value=>{console.log(value);});

// Promise.all([p1,p3("resolved")]).then(value=>{console.log(value);},reason=>{console.log(reason);});

// [p1,p3("resolved")].reduce((p,f)=>p.then(()=>f),Promise.resolve("p0:resolved"));
//在node中会报错：TypeError: Cannot read property 'reduce' of undefined。去html文件中测试把
// [()=>{console.log(1);},()=>{console.log(2);},()=>{console.log(3);}].reduce((acc,cur)=>acc.then(cur),Promise.resolve(0)).then(value=>{console.log(value);})

// console.log([1,2,3].reduce((acc,cur)=>acc+cur,4));

let arr = [1,2,3];
console.log(arr.push(4,5));
console.log(arr);
for(let i = 0; i < 5; i++){
  console.log(arr.shift(arr[0]));  
  console.log(arr);
  // console.log(arr[0]);
  console.log("----------------------------");
}

let pp1 = new Promise((resolve,reject)=>{
  resolve("p1:resolved1");
});
let pp2 = new Promise((resolve,reject)=>{
  reject("p2:rejected2");
});

Promise.race([pp2,pp1]).then(
  value=>{console.log(value);},
  reason=>{console.log(reason);}
)
