<template>
  <div class="aboutPage">
    <div class="gradient-section">
      <h1 class="title">المستخدمين</h1>
      <div class="btn-start">
<BButton  @click="AddData">
  <i class="fa fa-plus"></i>
</BButton>
</div>
      <b-table striped hover 
      :fields="userfields"
      :items="USERS"
      @row-selected="onRowSelected"
      @row-clicked="check"
      selectable
      select-mode="single"
      ref="usertable"
      class="text">
    <template 
    #cell(Actions)="row"
    >
<i class="fa fa-edit iconuser"  @click="EditData(row.item)"></i>
<i class="fa fa-trash iconuser" style="margin-left:15px" @click="DeleteUser(row.item)"></i>


  </template>
 

    </b-table>
    

    
    </div>
    <div class="gradient-section gradient-section2">
      <BButton  @click="AddGroup" :disabled=" Object.keys(SELECTED_USER).length==0">
        <i class="fa fa-plus"></i>
إضافة مجموعة
</BButton>
      <b-table striped hover 
      :fields="GROUPFILEDS"
      :items="GROUPS"
    

      class="text">
    <template 
    #cell(Actions)="row"
    >
<i class="fa fa-trash iconuser" style="margin-left:15px" @click="DELETE_USER_GROUP(row.item)"></i>


  </template>
 

    </b-table>

    </div>
    <img class="heroAbout" src="@/assets/img/heroAbout.jpg" />
  <user-data ref="userdata" :USER_PROP="SELECTED_USER" @UserMod="ModUser"></user-data>
  <user-group ref="usergroup" :USER_PROP="SELECTED_USER" @AddGroup="addGroupUser"></user-group>
  </div>
</template>

<script>
import UserData from '@/components/CustomComponent/Users/UserData.vue';
import UserGroup from '@/components/CustomComponent/Users/UserGroup.vue';

export default {
  components: { UserData,UserGroup },
data(){
  
return{
  SELECTED_USER:{},
  userfields:[
  
  {
      key:"Actions",label:" "
    },
    {
      key:"ADDRESS",label:"العنوان "
    },
    {
      key:"PHONE_NO",label:" الهاتف"
    },
    {
      key:"IS_ADMIN",label:" ادمين"
    },
    {
      key:"PASSWORD",label:"كلمة المرور"
    },
    {
      key:"USER_NAME",label:"اسم المستخدم"
    },
    {
      key:"USER_DESC",label:" الاسم"
    },
  ],
  USERS:[],
  GROUPS:[],
  GROUPFILEDS:[ {
      key:"Actions",label:" "
    },
    {
      key:"GROUP_NAME",label:"اسم المجموعة "
    },
    {
      key:"GROUP_ID",label:" رقم المجموعة"
    }]
,
oldindex:-1
}

},
methods:{
  check(item,index){
    
   if(this.oldindex==index)
   {
    this.SELECTED_USER={}
   return 
   }
   this.oldindex=index

  },
  onRowSelected(item)
  {
    this.SELECTED_USER=JSON.parse(JSON.stringify(item))
    this.GetGroups(item.id)
  },
  GetUsers()
{
  this.$store.dispatch("GET_USERS").then(
    res=>{
      if(res.data.StatusCode=="200"){
        this.USERS=res.data.USERS
      }
    }
  )
},
EditData(item){
  
  this.SELECTED_USER=JSON.parse(JSON.stringify(item))
  this.$refs.userdata.showModal(2)
},
AddGroup(){
  this.$refs.usergroup.showModal(1)
},

AddData()
{let user={
                USER_NAME:"",
                PASSWORD:"",
                ADDRESS:"",
                PHONE_NO:"",
                USER_DESC:"",
                IS_ADMIN:false,
                NATIONAL_ID:""

            }
  this.SELECTED_USER=JSON.parse(JSON.stringify(user))
  this.$refs.userdata.showModal(1)
},

ModUser(USER)
{
  
  if(USER.add)
  {
    this.$store.dispatch("ADD_USER",USER).then(res=>{
      if(res.data.StatusCode="200")
      {
        this.showAlert(res.data.Message)
        this.GetUsers();
      }
      else{
        this.showAlert('حدث خطأ')

      }
    }).catch(()=>{
      this.showAlert('حدث خطأ')
    })

  }else
  {
    this.$store.dispatch("moduser",USER).then(res=>{
      if(res.data.StatusCode="200")
      {
        this.showAlert(res.data.Message)
        this.GetUsers();
      }
      else{
        this.showAlert('حدث خطأ')

      }
    }).catch(()=>{
      this.showAlert('حدث خطأ')
    })

  }
},
DeleteUser(item)
{

 
            this.$swal({
              title: 'هل انت متأكد من حذف?',
              text: item.USER_NAME,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'حذف',
              cancelButtonText: 'لا'
            }).then((result) => {
              if (result.value) {
              
                this.$store.dispatch('Delete_user',item.id).then(res=>{
                  if(res.data.StatusCode="200")
                  {
                    this.showAlert(res.data.Message)
        this.GetUsers();
                  }
                  else
                  {
                    this.showAlert('حدث خطأ')
                  }
                })
              }
            });
}
,
showAlert(msg) {
      // Use sweetalert2
      this.$swal(msg);
    },
    GetGroups(id)
{
  this.$store.dispatch("Get_User_groups",id).then(
    res=>{
      
      if(res.data.StatusCode=="200"){
        this.GROUPS=res.data.GROUPS
      }
    }
  )
},



DELETE_USER_GROUP(item)
{

 
            this.$swal({
              title: 'هل انت متأكد من حذف?',
              text: item.GROUP_NAME,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'حذف',
              cancelButtonText: 'لا'
            }).then((result) => {
              if (result.value) {
              
                this.$store.dispatch('DELETE_USER_GROUP',{user_id:this.SELECTED_USER.id,group_id:item.GROUP_ID}).then(res=>{
                  if(res.data.StatusCode="200")
                  {
                    this.showAlert(res.data.Message)
                    this.GetGroups(this.SELECTED_USER.id)
                  }
                  else
                  {
                    this.showAlert('حدث خطأ')
                  }
                }).catch(err=>{
                  this.showAlert('حدث خطأ')
                })
              }
            });
},
addGroupUser(item)
{
  this.$store.dispatch('ADD_GROUP_USER',{user_id:this.SELECTED_USER.id,group_id:item}).then(res=>{
                  if(res.data.StatusCode="200")
                  {
                    this.showAlert(res.data.Message)
                    this.GetGroups(this.SELECTED_USER.id)
                  }
                  else
                  {
                    this.showAlert('حدث خطأ')
                  }
                })
}

},
mounted(){
  this.GetUsers()
}
};
</script>

<style scoped>
.gradient-section {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(transparent, rgb(0, 0, 0));
  z-index: -1;
  text-align: center;
  align-items: center;
  justify-content: top;
  overflow: hidden;
}
.gradient-section .title {
  position: absolute;
  align-self: center;
  text-align: center;
  /* letter-spacing: 0.3em; */
  font-weight: 100;
  text-indent: 0.3em;
  font-size: 3rem;
  color: #fff;
  text-transform: uppercase;
  font-family: "Magisho", sans-serif;
  margin-top: 3em;
  text-shadow: 1px 1px 2px black;
}
.gradient-section .text {
  position: absolute;
  align-self: center;
  text-align: center;
  font-family: "Magisho", sans-serif;
  font-size: 1.3rem;
  font-weight: 100;
  letter-spacing: 0.1em;
  margin-top: 10em;
  padding: 0em 20em;
  text-shadow: 1px 1px 2px black;
  color: #fff;
}

.heroAbout {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -5;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: -2;
  object-position: top;
  animation: fade-in 0.5s forwards;
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  .gradient-section .title {
    font-size: 2rem;
  }
  .gradient-section .text {
    font-size: 1rem;
    width: 40vh;
  }
}
.iconuser:hover{
color:darkgoldenrod;
cursor: pointer;
}
.btn-start
{
  justify-content: right;
    width: 100%;

    display: flex !important;
    margin-top: 160px;
    margin-right: 15px;

    
}

.btn-start button:hover{
  background:darkgoldenrod
}
.gradient-section2{
  margin-top:500px ;
}
</style>
