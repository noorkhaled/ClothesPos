import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import store from '../store/index'

import About from "../views/About.vue";
// import Mainitems from "../views/Mainitems.vue";

import users from "../views/Users.vue";

import Men from "../views/Men.vue";
import Women from "../views/Women.vue";
import Search from "../views/Search.vue";
import Checkout from "../views/Checkout.vue";
import ProductDetails from "../views/ProductDetails.vue";

import Pos from "../views/pos.vue"
import orders from "../views/orders.vue"
import productadd from "../views/productadd.vue"
import stockquery from "../views/stockquery.vue"
import dashboard from "../views/dashboard.vue"


const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
  {
    path: "/pos",
    name: "pos",
    component: Pos,
  },
  {
    path: "/orders",
    name: "orders",
    component: orders,
  },
  {
    path: "/productadd",
    name: "productadd",
    component: productadd,
  },
  {
    path: "/stockquery",
    name: "stockquery",
    component: stockquery,
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  // {
  //   path: "/Mainitems",
  //   name: "Mainitems",
  //   component: Mainitems,
  // },
  {
    path: "/users",
    name: "users",
    component: users,
  },
  {
    path: "/men",
    name: "Men",
    component: Men,
    props: true,
  },
  {
    path: "/women",
    name: "Women",
    component: Women,
    props: true,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    props: true,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    props: true,
  },
  {
    path: "/shop/:gender/:id",
    name: "ProductDetails",
    component: ProductDetails,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from, next) => {
  
  var basiccs = ["home","/" ,"About"]

    
  if(!basiccs.includes(to.name))
  {
    var haveAccess 
    
          if(store.getters['Get_menu_links'].length == 0)
          {
        await     store.dispatch("Get_menu_links",localStorage.getItem("USER_CODE")).then(() => {
                  haveAccess  = store.getters['Get_menu_links'].find(o => o.ROUTER_NAME == to.name)
                  // console.log(haveAccess)
              })
          }else
          {
              
               haveAccess = store.getters['Get_menu_links'].find(o => o.ROUTER_NAME == to.name)
               console.log(store.getters['Get_menu_links'])
          }
              if(typeof haveAccess !== 'undefined')
              {
             next(true)
                 
              }else
              {
                  next('/');
                  store.commit('SET_MENU_LINKS',[])
              }
  }else
  {
  
   next(true) 
   localStorage.setItem("USER_CODE",-1)
  }


}
  
  
    
  
  
  )

export default router;
