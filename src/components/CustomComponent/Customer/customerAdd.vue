<template>
    <div >
    <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
    <BModal v-model="modal" no-close-on-backdrop cancel-hide hide-footer="true" :title="' إضافة عميل '" size="lg" >
    <BFormInput v-model="USER.CUSTOMER_NAME" placeholder="الاسم" class="inputtext"></BFormInput>
    
    <BFormInput type="number" v-model="USER.PHONE_NO" placeholder=" الهاتف" class="inputtext"></BFormInput>
    <BFormInput type="number" v-model="USER.PHONE_NO2" placeholder="2 الهاتف" class="inputtext"></BFormInput>
    <BFormInput v-model="USER.ADDRESS" placeholder="العنوان" class="inputtext"></BFormInput>
   
    <div>
      <hr/>
      <BButton :disabled="!validate"    
      :style="{'background':!validate?'grey':'#0d6efd'}"
      button-variant="primary" @click="AddOrEditUser"> إضافة</BButton>
      
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
                CUSTOMER_CODE:"",
                CUSTOMER_NAME:"",
                  ADDRESS:"",
                  PHONE_NO:"",
                  PHONE_NO2:"",
                
  
              }
          }
      },
  
  props:{
  
  
  },
  
  methods:{
      showModal(){
          this.add=false,
          this.modal=true
      },
      HideModal()
      {
          this.modal=false
      },
      AddOrEditUser(){
        
          this.$store.dispatch("ADD_CUSTOMER",this.USER).then(res=>{
if(res.data.StatusCode="200")
{
    this.USER.CUSTOMER_CODE=res.data.CUSTOMER_ID
    
    this.$emit('UserAdd',this.USER)
    this.modal=false
}
        this.showAlert(res.data.Message)
          })
         
          
      },
      showAlert(msg) {
      // Use sweetalert2
      this.$swal(msg);
    },
      
  },
  
  computed:{
      validate()
      {
          if(this.USER.CUSTOMER_NAME=="" || this.USER.CUSTOMER_NAME.trim().length<3
           || (this.USER.PHONE_NO=="" && this.USER.PHONE_NO2=="") )
          {
              return false
          }
          return true
      }
  },
  watch:{
     
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
      font-size: 1.6rem;
  }
  
  
  </style>