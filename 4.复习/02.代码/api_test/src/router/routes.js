import Home from '../components/Home';
import About from '../components/About';
import Xixi from '../components/Xixi';
export default [
    {
        path:"/home",
        component:Home
    },
    {
        path:"/about",
        component:About,
        children:[
            {
                path:"/about/xixi",
                component:Xixi
            },
        ]
    }
]