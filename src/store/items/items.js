import api from "../../api";
const loginapi = {
    state: {
   
    ITEMS:[]

    },
    getters:{
GET_ITEMS:state=>{
    return state.ITEMS
}
    },
    mutations:{
        SET_ITEMS(state,data)
        {
            state.ITEMS=data
        }
    },
    actions:{
        Get_Categories(_)
        {
            return new Promise((resolve,reject)=>{
                api.get(`/Items/GetCategories`).then(
                    res=>{
                        resolve(res)
                    }
                ).catch(err=>{
                    reject(err)
                })
            })
        },
        Get_Items(_)
        {
            return new Promise((resolve,reject)=>{
                api.get(`/Items/GetItems`).then(
                    res=>{
                        resolve(res)
                    }
                )
            })
        },
        AddCategories(_,payload)
        {
            return new Promise((resolve,reject)=>{
                api.get(`/Items/AddCategories`,{params:{
                    CAT:payload
                }}).then(
                    res=>{
                        resolve(res)
                    }
                )
            })
        },
        DeleteCat(_,payload)
        {
            return new Promise((resolve,reject)=>{
                api.delete(`/Items/DeleteCat`,{params:{
                    id:payload
                }}).then(
                    res=>{
                        resolve(res)
                    }
                )
            })
        },
        DeleteItem(_,payload)
        {
            return new Promise((resolve,reject)=>{
                api.delete(`/Items/DeleteItem`,{params:{
                    ITEM_CODE:payload
                }}).then(
                    res=>{
                        resolve(res)
                    }
                )
            })
        },
        
        ADDitem(_,payload)
        {
            
            return new Promise((resolve,reject)=>{
                api.post(`/Items/ADDitem`,payload).then(
                    res=>{
                        resolve(res)
                    }
                )
            })
        },
        Edititem(_,payload)
        {
            
            return new Promise((resolve,reject)=>{
                api.post(`/Items/Edititem`,payload).then(
                    res=>{
                        resolve(res)
                    }
                )
            })
        },
        
        

},

    
}

export default loginapi;