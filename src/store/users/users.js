import api from "../../api";
const loginapi = {
    state: {
     USERS:[]
    

    },
    getters:{
        GET_USERS:state=>{return state.USERS}
// GET_USER_NAME:state=>{return state.USER_NAME},
// Get_menu_links:state=>{return state.MENU_LINKS}
    },
    mutations:{
        SET_USERS(state,data)
        {
            state.USERS=data
        },
     
    },
    actions:{

GET_USERS(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/ADMIN_USERS/Get_Users`).then(
            res=>{
                resolve(res)
            }
        )
    })
},
ADD_USER(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.post(`/ADMIN_USERS/Add_USER`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
moduser(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.put(`/ADMIN_USERS/Edit_USER`,payload).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},

Get_User_groups(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.get(`/ADMIN_USERS/Get_User_groups`,{params:{
            id:payload
        }}).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
Get_groups(_)
{
    return new Promise((resolve,reject)=>{
        api.get(`/ADMIN_USERS/Get_groups`).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},

Delete_user(_,payload)
{
    
    return new Promise((resolve,reject)=>{
        api.delete(`/ADMIN_USERS/DELETE_USER`,{params:{
            id:payload
        }}).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
DELETE_USER_GROUP(_,payload)
{
    
    return new Promise((resolve,reject)=>{
        api.delete(`/ADMIN_USERS/DELETE_USER_GROUP`,{params:{
            user_id:payload.user_id,
            group_id:payload.group_id
        }}).then(
            res=>{
                resolve(res)
            }
        ).catch(err=>{
            reject(err)
        })
    })
},
ADD_GROUP_USER(_,payload)
{
    
    return new Promise((resolve,reject)=>{
        api.get(`/ADMIN_USERS/ADD_GROUP_USER`,{params:{
            user_id:payload.user_id,
            group_id:payload.group_id
        }}).then(
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