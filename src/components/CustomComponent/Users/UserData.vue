<template>
  <div >
  <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
  <BModal v-model="modal" no-close-on-backdrop cancel-hide hide-footer="true" :title="add==1?'إضافة':'تعديل'"  >
  <BFormInput v-model="USER.USER_NAME" placeholder="اسم المستخدم" class="inputtext"></BFormInput>
  <BFormInput v-model="USER.PASSWORD" placeholder="كلمة المرور" class="inputtext"></BFormInput>
  <BFormInput v-model="USER.ADDRESS" placeholder="العنوان" class="inputtext"></BFormInput>
  <BFormInput type="number" v-model="USER.PHONE_NO" placeholder=" الهاتف" class="inputtext"></BFormInput>
  <BFormInput v-model="USER.NATIONAL_ID" placeholder=" رقم قومى" class="inputtext"></BFormInput>
  <BFormInput v-model="USER.USER_DESC" placeholder="الاسم " class="inputtext"></BFormInput>
 
  <BFormCheckbox
    
    v-model="USER.IS_ADMIN"
  >
   ادمن
  </BFormCheckbox>

  <div>
    <hr/>
    <BButton :disabled="!validate"    
    :style="{'background':!validate?'grey':'#0d6efd'}"
    button-variant="primary" @click="AddOrEditUser"> {{  add==1?'إضافة':'تعديل'}} </BButton>
    
    </div>
  
  </BModal>
</div>

</template>

<script>
export default {
    data(){
        return{
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
        this.add=id==1?true:false,
        this.modal=true
    },
    HideModal()
    {
        this.modal=false
    },
    AddOrEditUser(){
        
        this.USER.add=this.add
        this.$emit('UserMod',this.USER)
        this.modal=false
    }
    
},

computed:{
    validate()
    {
        if(this.USER.USER_NAME=="" || this.USER.PASSWORD=="" || this.USER.USER_DESC==""  || this.USER.NATIONAL_ID=="")
        {
            return false
        }
        return true
    }
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