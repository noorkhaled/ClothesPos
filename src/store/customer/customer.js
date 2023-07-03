import api from "../../api";
const loginapi = {
    state: {
     CUSTOMERS:[]
    

    },
    getters:{
        GET_CUSTOMERS:state=>{return state.CUSTOMERS}
// GET_USER_NAME:state=>{return state.USER_NAME},
// Get_menu_links:state=>{return state.MENU_LINKS}
    },
    mutations:{
        SET_CUSTOMERS(state,data)
        {
            state.CUSTOMERS=data
        },
     
    },
    actions:{

GET_CUSTOMERS(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/Customer/GET_CUSTOMER`).then(
            res=>{
                
                resolve(res)
                
            }
        )
    })
},
ADD_CUSTOMER(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.post(`/Customer/Add_CUSTOMER`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},










    }
}

export default loginapi;