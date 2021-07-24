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
			注意:路由的地址,只能写绝对路径
*/

	const router = new KoaRouter();
	
	app.use(router.routes());
	
	router.get('/test',function(ctx,next){
		console.log('/test success')
		ctx.body="/test success"
	})
	
	const indexData = require('./datas/index.json');
	router.get('/getIndexData',function(ctx,next){
		// console.log('/test success')
		ctx.body=indexData
	})	
	
	const categoryDatas = require('./datas/categoryDatas.json');
	router.get('/getcategoryDatas',function(ctx,next){
		// console.log('/test success')
		ctx.body=categoryDatas
	})
	
	const indexCateList = require('./datas/indexCateList.json');
	router.get('/getindexCateList',async function(ctx,next){
		// console.log('/test success')
		// koa服务器中,要求如果是异步返回数据,函数必须返回的是promise对象
		await new Promise((resolve)=>{
			setTimeout(()=>{
				resolve();
			},2000)
		})
		ctx.body=indexCateList;
	})
	
	
	const goods = require('./datas/goods.json');
	router.get('/getGoodDetail',function(ctx,next){
		// koa框架获取参数
		console.log('/getGoodDetail success',ctx.query)
		// 注意:通过url传递的数据,一定会被变成字符串
		const {goodId} =ctx.query;
		
		const good = goods.find((good)=>{
			// 位运算符,是将数据先转为二进制,在进行位置的平移
			return good.id === goodId>>>0
		})
		
		ctx.body=good
	})	
	
// 2.将服务器应用实例挂载到某个端口上并监视
	app.listen(3001,(error)=>{
		if(error){
			console.log('服务器启动失败!!')
		}else{
			console.log('服务器启动成功,启动于http://localhost:3001')
		}
	})