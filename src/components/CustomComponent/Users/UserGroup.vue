<template>
  <div >
  <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
  <BModal v-model="modal" no-close-on-backdrop cancel-hide hide-footer="true" title="إضافة مجموعة"  >
    <BFormSelect v-model="ex1Selected" :options="ex1Options"></BFormSelect>

 

  <div>
    <hr/>
    <BButton :disabled="!validate"    
    :style="{'background':!validate?'grey':'#0d6efd'}"
    button-variant="primary" @click="AddOrEditUser"> إضافة </BButton>
    
    </div>
  
  </BModal>
</div>

</template>

<script>
export default {
    data(){
        return{
            ex1Selected:null,
             ex1Options : [

],
            modal:false,
            add:true,
            USER:{
                USER_NAME:"",
                PASSWORD:"",
                ADDRESS:"",
                PHONE_NO:"",
                USER_DESC:"",
                IS_ADMIN:false,
                NATIONAL_ID:""

            }
        }
    },

props:{

    USER_PROP:{
        type:Object,
        default:{
           
                USER_NAME:"",
                PASSWORD:"",
                ADDRESS:"",
                PHONE_NO:"",
                USER_DESC:"",
                IS_ADMIN:false

           
        }
    }

},

methods:{
    showModal(id){
        this.modal=true
    },
    HideModal()
    {
        this.modal=false
    },
    AddOrEditUser(){
        
        this.USER.add=this.add
        this.$emit('AddGroup',this.ex1Selected)
        this.modal=false
    },
    Get_groups()
    {
        this.$store.dispatch("Get_groups").then(
    res=>{
      if(res.data.StatusCode=="200"){
        this.ex1Options=res.data.GROUPS
      }
    }
  )
    }
    
},

computed:{
    validate()
    {
        if(this.ex1Selected==null)
        {
            return false
        }
        return true
    }
},
mounted(){
this.Get_groups();
},

watch:{
    USER_PROP(val)
    {
        this.USER=JSON.parse(JSON.stringify(val))
    }
    // add(val)
    // {
    //     this.USER=JSON.parse(JSON.stringify(this.USER_PROP))
    //     if(!val)
    //     {
    //         this.USER=JSON.parse(JSON.stringify(this.USER_PROP))
    //     }
    //     else
    //     {
    //         this.USER={
    //             USER_NAME:"",
    //             PASSWORD:"",
    //             ADDRESS:"",
    //             PHONE_NO:"",
    //             USER_DESC:"",
    //             IS_ADMIN:false

    //         }
    //     }
    
}


}

</script>

<style  scoped>
.inputtext{
    margin-bottom: 3px;
}


</style>