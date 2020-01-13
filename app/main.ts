import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./views/Home";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import store from './store'
import VueDevtools from 'nativescript-vue-devtools'
import Pager from 'nativescript-accordion/vue'

if (TNS_ENV !== 'production'){
  Vue.use(VueDevtools, { host: '192.168.3.200' })
  Vue.use(VueDevtools)
}

Vue.use(RadSideDrawer)
Vue.use(Pager)

Vue.config.silent = (TNS_ENV === 'production');
Vue.registerElement('ShadowedLabel', () => require('nativescript-shadowed-label').ShadowedLabel);

new Vue({
  store,
  render(h) {
    return h(
      App,
      [
        h(DrawerContent, { slot: 'drawerContent' }),
        h(Home, { slot: 'mainContent' })
      ]
    )
  }
}).$start();
