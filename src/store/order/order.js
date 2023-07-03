import api from "../../api";
const loginapi = {
    state: {
    //  CUSTOMERS:[]
    

    },
    getters:{
        // GET_CUSTOMERS:state=>{return state.CUSTOMERS}
// GET_USER_NAME:state=>{return state.USER_NAME},
// Get_menu_links:state=>{return state.MENU_LINKS}
    },
    mutations:{
        // SET_CUSTOMERS(state,data)
        // {
        //     state.CUSTOMERS=data
        // },
     
    },
    actions:{

 GET_CURRENT_ORDER(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/Orders/GET_CURRENT_ORDER`).then(
            res=>{
                
                resolve(res)
                
            }
        )
    })
},
OpenOrder(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.get(`/Orders/OpenOrder`,{
            params:{
                CUSTOMER_CODE:payload.CUSTOMER_CODE,
                USER_CODE:payload.USER_CODE
            }
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
AddItem(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.post(`/Orders/POST_ITEM`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
CancelOrder(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.delete(`/Orders/CancelOrder`,
        {
            params:{
                ORDER_SER:payload
            }
        }
        ).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
deleteOrderItem(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.post(`/Orders/deleteOrderItem`,
        payload
        ).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
GET_ORDER_ITEMS(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.get(`/Orders/GET_ORDER_ITEMS`,{
            params:{
                ORDER_SER:payload
              
            }
        }).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},


END_ORDER(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.get(`/Orders/END_ORDER`,
        {
            params:{
                ORDER_SER:payload
            }
        }
        ).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
testrep(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.get(`/Orders/PrintOrder?ORDER_SER=${payload}`,
      
        
             {responseType:'arraybuffer'}
        
        ).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
GetDashboard(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/Dashboard/GetDashboard`
      
      
        
        ).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
GET_ALL_ORDERS(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/Orders/GET_ALL_ORDERS`
        
        ).then(
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