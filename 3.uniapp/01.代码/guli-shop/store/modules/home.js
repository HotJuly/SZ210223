import req from '../../utils/req.js';
import {SETINDEXDATA} from '../mutation-types.js';
const state = {
	initData:"我是初始化数据",
	indexData:[]
};

const mutations = {
	[SETINDEXDATA](state,indexData){
		// console.log(111,indexData,num)
		state.indexData = indexData;
	}
}

const actions = {
	async getIndexData({commit}){
		const result =await req("/getIndexData");
		// console.log('result',result);
		commit(SETINDEXDATA,result);
	}
}

const getters = {
	
}

export default{
	state,
	mutations,
	actions,
	getters
}