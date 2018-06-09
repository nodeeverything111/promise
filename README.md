# promise
finish basic promise function<br/>

promise是一种规范，为了解决js回调嵌套的问题，将异步代码以同步的形式进行展示，可读性提高<br/>
1、promise对象具有三种状态，pending、resolved、rejected，pending可以在resolve()或reject()方法作用下变为resolved或rejected状态，一旦变化不可再改变<br/>
2、以then方法链式组织代码，then具备两个参数，resolve回调及reject回调<br/>


代码思路:<br/>
promise看成对象，由Promise构造，对象具备status属性，doResolve及deReject属性方法，then作为promise实例对象调用的方法，挂在Promise的原型上，then方法给promise对象添加resolveCallback,rejectCallback,nextPromise属性<br/>
promise对象组成一条链路，链路节点理解为promise对象+定义的执行函数fn，fn执行完毕后，再执行promise对象的参数函数（加上setTimeout作异步），由promise对象的参数函数中的resolve或reject决定
接下来节点的走向<br/>
另外，promise对象的参数函数会在最后执行resolve或reject，所以要做异步处理
