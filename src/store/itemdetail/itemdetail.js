import api from "../../api";
const loginapi = {
    state: {
     USERS:[],
    COLORS:[],
    ITEM_DETAILS:[]

    },
    getters:{
GET_COLORS:state=>{
    let COLOR=[]
    state.COLORS.forEach(element => {
        COLOR.push({
            text:element.COLOR_HEXA +"$$"+element.COLOR_NAME,
            value:element.COLOR_ID
        })
    });
    return COLOR
},
GET_ITEM_DETAILS:state=>{
    return state.ITEM_DETAILS
}
    },

    
    mutations:{
    SET_COLORS(state,data){
        state.COLORS=data
    },
    SET_ITEM_DETAILS(state,data){
        state.ITEM_DETAILS=data
    }
    },
    actions:{

        GET_COLORS(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/ItemDetail/GET_COLORS`).then(
            res=>{
                resolve(res)
            }
        )
    })
},        GET_SIZES(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/ItemDetail/GET_SIZES`).then(
            res=>{
                resolve(res)
            }
        )
    })
},


ADD_COLOR(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.post(`/ItemDetail/ADD_COLOR`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
Edit_COLOR(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.put(`/ItemDetail/Edit_COLOR`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
DELETE_COLOR(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.delete(`/ItemDetail/DELETE_COLOR`,{params:{
            COLOR_ID:payload
        }}).then(
            res=>{
                resolve(res)
            }
        )
    })
},

ADD_NEW_ITEM_DETAIL(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.post(`/ItemDetail/ADD_NEW_ITEM_DETAIL_Test`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
GET_NEW_ITEM_DETAIL(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.post(`/ItemDetail/GET_NEW_ITEM_DETAIL`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
GET_ALL_NEW_ITEM_DETAIL(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/ItemDetail/GET_ALL_NEW_ITEM_DETAIL`).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},


DELET_NEW_ITEM_DETAIL(_,payload)
{
    
    return new Promise((resolve,reject)=>{
        api.post(`/ItemDetail/DELET_NEW_ITEM_DETAIL`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},

EDIT_NEW_ITEM_DETAIL_QTY(_,payload)
{
    
    return new Promise((resolve,reject)=>{
        api.post(`/ItemDetail/EDIT_NEW_ITEM_DETAIL_QTY`,payload).then(
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