const Koa = require('koa');
const KoaRouter = require('koa-router');

/*
	koa服务器搭建流程:
		1.创建服务器应用实例	const app = express();
		2.将服务器应用实例挂载到某个端口上并监视
		3.注册路由接口
			-	创建路由器实例
			-	声明使用所有的路由(使用路由中间件)
			-	注册路由
*/

// 1.创建服务器应用实例	const app = express();
	const app = new Koa();
	
/*
	3.注册路由接口
		-	创建路由器实例
		-	声明使用所有的路由(使用路由中间件)
			注意:router.routes()该是中间件,router.routes是用于创建中间件的函数
		-	注册路由(最终目的获取数据)
			express:
				request	->	请求报文对象
				response->	响应报文对象(response.send(返回数据))
				next	->	执行下一个路由或者下一个中间件
			koa:
				ctx		->	request+response(ctx.body=需要返回的数据)
				next	->	执行下一个路由或者下一个中间件
*/

	const router = new KoaRouter();
	
	app.use(router.routes());
	
	router.get('/test',function(ctx,next){
		console.log('/test success')
		ctx.body="/test success"
	})
	
// 2.将服务器应用实例挂载到某个端口上并监视
	app.listen(3001,(error)=>{
		if(error){
			console.log('服务器启动失败!!')
		}else{
			console.log('服务器启动成功,启动于http://localhost:3001')
		}
	})