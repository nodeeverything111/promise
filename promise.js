var Promise=function(fn){

	this.state='pending';
	//_this保存当前实例对象的引用
	var _this=this;
	//doresolve方法，完成当前promise对象状态的改变，并且异步执行resolvecallback方法，
	var doResolve=function(){
		_this.state='resolved';
		setTimeout(function(){
			if(_this.resolveCallback){
				var result=_this.resolveCallback();
				//注意，如果resolvecallback返回自定义promise对象时，要把自定义的promise加入到链路中
				if(result instanceof Promise){
					result.resolveCallback=_this.nextPromise.resolveCallback;
					result.rejectCallback=_this.nextPromise.rejectCallback;
					result.nextPromise=_this.nextPromise.nextPromise;
					_this.nextPromise=result;
				}
				//如果resolvecallback时普通的方法，直接调用nextPromise的doResolve方法，将nextPromise状态置为resolved
				else{
					_this.nextPromise.doResolve();
				}
			}
		})
		
	}
	var doReject=function(){
		_this.state='rejected';
		setTimeout(function(){
			if(_this.rejectCallback){
				var result=_this.rejectCallback();
				if(result instanceof Promise){
					result.resolveCallback=_this.nextPromise.resolveCallback;
					result.rejectCallback=_this.nextPromise.rejectCallback;
					result.nextPromise=_this.nextPromise.nextPromise;
					_this.nextPromise=result;
				}
				else{
					_this.nextPromise.doResolve();
				}
			}
		})
		
	}
	this.doResolve=doResolve;
	this.doReject=doReject;
	//需要等待then方法执行完毕，构造完promise链路，再调用fn方法
	fn && setTimeout(function(){
		fn(doResolve,doReject)
	})
}

Promise.prototype.then=function(resolveFn,rejectFn){
	this.resolveCallback=resolveFn;
	this.rejectCallback=rejectFn;
	this.nextPromise=new Promise();
	return this.nextPromise;
}