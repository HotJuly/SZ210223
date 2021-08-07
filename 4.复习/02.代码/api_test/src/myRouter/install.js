import RouterView from './components/view';
import RouterLink from './components/link';
function install(Vue){
    Vue.component('RouterView',RouterView);
    Vue.component('RouterLink',RouterLink);
}

export default install;