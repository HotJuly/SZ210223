import Vue from 'vue';
export default {
    name:"RouterLink",
    functional:true,
    props:{
        to:{
            type:String,
            required:true
        },
        tag:{
            type:String,
            default:"a"
        }
    },
    render:(_,{parent,data,props,children})=>{
        // 用于获取父组件的创建虚拟DOM方法
        const createElement = parent.$createElement;

        data.on={
            click:function(event){
                event.preventDefault();
                Vue.prototype.$router.push(props.to);
            }
        }

        data.attrs.href = props.to;

        return createElement(props.tag,data,children);
    }
}