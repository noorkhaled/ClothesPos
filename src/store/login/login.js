import api from "../../api";
const loginapi = {
    state: {
    USER_NAME:"",
    MENU_LINKS:[]
    

    },
    getters:{
GET_USER_NAME:state=>{return state.USER_NAME},
Get_menu_links:state=>{return state.MENU_LINKS}
    },
    mutations:{
        SET_USER_NAME(state,data)
        {
            state.USER_NAME=data
        },
        SET_MENU_LINKS(state,data){
            
            state.MENU_LINKS=data
        }
    },
    actions:{

Login(_,payload)
{
    return new Promise((resolve,reject)=>{
        api.post(`/ADMIN_USERS/Get_User`,payload).then(
            res=>{
                resolve(res)
            }
        )
    })
},
Get_menu_links({commit},payload)
{
    return new Promise((resolve,reject)=>{
        api.get(`/ADMIN_USERS/GET_SCREEN`,{params:{
            id:payload
        }}).then(
            res=>{
                if(res.data.StatusCode=="200")
                {
                    
                   commit("SET_MENU_LINKS",res.data.Screens)
                }
                resolve(res)
            }
        )
    })
},

    }
}

export default loginapi;