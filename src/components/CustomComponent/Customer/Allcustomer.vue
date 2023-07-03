<template>
    <div >
    <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
   <BModal v-model="modal" no-close-on-backdrop cancel-hide hide-footer="true" :title="' إضافة عميل '" size="lg" >
   <div>
    <BFormInput v-model="CUSTOMER_NAME" placeholder="بحث" class="inputtext"></BFormInput>

<div v-for="customer in SEARCH_CUSTOMERS" :key="customer.CUSTOMER_CODE"

>
<div class="customerdetail" @dblclick="ChooseCustomer(customer)">
    ({{ customer.PHONE_NO }}/{{ customer.PHONE_NO2 }})  <span style="font-weight: bold;">{{ customer.CUSTOMER_NAME }}</span> /<span style="color:darkgoldenrod">{{ customer.CUSTOMER_CODE }}</span>
</div>
</div>

   </div>
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
  import { mapGetters } from "vuex";

  export default {
    created(){
        this.GetAllCustomers()
    },
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
                
  
              },
              CUSTOMER_NAME:""
          }
      },
  
  props:{
  
  
  },
  
  methods:{
    GetAllCustomers(){
        this.$store.dispatch("GET_CUSTOMERS").then(res=>{
            if(res.data.StatusCode="200"){
                this.$store.commit("SET_CUSTOMERS",res.data.CUSTOMER)
            }
        })
    },
      showModal(){
          this.add=false,
          this.modal=true
      },
      ChooseCustomer(customer){
        this.$emit('UserAdd',customer)
        this.modal=false
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
    ...mapGetters(['GET_CUSTOMERS']),
      validate()
      {
          if(this.USER.CUSTOMER_NAME=="" || this.USER.CUSTOMER_NAME.trim().length<3
           || (this.USER.PHONE_NO=="" && this.USER.PHONE_NO2=="") )
          {
              return false
          }
          return true
      },
      SEARCH_CUSTOMERS(){
        return this.GET_CUSTOMERS.filter(x=>{
            
            return x.CUSTOMER_NAME.includes(this.CUSTOMER_NAME) ||
            x.CUSTOMER_CODE.toString().includes(this.CUSTOMER_NAME) ||
            (x.PHONE_NO==null?false:x.PHONE_NO.toString().includes(this.CUSTOMER_NAME)) ||
            (x.PHONE_NO2==null?false:x.PHONE_NO2.toString().includes(this.CUSTOMER_NAME) )
        })
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
  .customerdetail{
    font-size: 1.6rem;
    margin-bottom: 3px;
text-align: right;
background: #e5e5e5;
    padding: 5px;
    margin-bottom: 5px;
  }
  
  </style>