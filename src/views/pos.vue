<template>
  <div class="aboutPage">
    <div class="gradient-section allscrolls2">
      

      <h1 class="title">الفواتير</h1>
      <div
      class="text"
      >
      <div class="d-flex" style="justify-content: space-between;">
        <section class="orderdetail">
<div class="OrderItems">
  <div class="d-flex justify-content-center">
   
    <div>
      <h1>
              بيانات الفاتورة رقم {{ CURR_ORDER.ORDER_NO }}
            </h1>
    </div>
    
            
            
  </div>
  <hr>
  <div class="allscrolls2 itemdetailtable">
    <b-table striped hover :fields="OrderItemFields" :items="ORDER_ITEMS"
      class="itemdetailtable"
     > 
     <template #cell(TOTAL_PRICE)="row">
             
              {{ Number(row.item.QTY) * Number(row.item.ITEM_PRICE) }}

              </template>
              <template #cell(Actions)="row">
             
             <i class="fa fa-trash" @click="deleteItem(row.item)"></i>

             </template>
              
    </b-table>
    <div v-show="CURR_ORDER.ORDER_SER!=-1">
      <div class="checkout-card" style="margin:auto">
        <div class="header-checkout">
          <p class="checkout-title">إجمالى الفاتورة</p>
        </div>
        <div class="body-checkout">
          <p class="text-total">Total ${{ totalOrder }}</p>
        </div>
        <div class="footer-checkout" >
         
          <div class="checkout" @click.prevent="END_ORDER">Checkout</div>
          <!-- END_ORDER() -->
        </div>
      </div>
      <div  style="background-color: red;width: 25%;padding: 3px;margin:15px auto;cursor: pointer;" @click.prevent="deleteAllOrder">حذف</div>
 
      <b-modal v-model="show" id="modal" style="height: 90vh" size  = "xl" title="report">
  
  <vue-pdf-app id="pdf"  style="height: 80vh"  :pdf="pdf"></vue-pdf-app>
    
  </b-modal>

    </div>
    
    
  </div>
</div>

        </section>
        <section class="detailtable">  
          <div class="SearchHeader"
          style="height: 9vh;
    width: 100%;
    background: linear-gradient(45deg, #110d0d, transparent);"
          >
          <div class="d-flex">
            <BFormSelect v-model="PRODUCT.SIZE_CODE" :options="SIZES_COMPUTED"  class="inputtext" ></BFormSelect> 
            <BFormSelect v-model="PRODUCT.COLOR_ID" :options="COLORS_COMPUTED"  class="inputtext" ></BFormSelect> 
            <BFormInput v-model="PRODUCT.ITEM_CODE" class="inputtext"  type="text" placeholder="كود الصنف"></BFormInput>

            <!-- <BFormInput  class="inputtext"  type="text" placeholder="اللون"></BFormInput> -->
          </div>
          <div class="d-flex">
            <BFormSelect v-model="PRODUCT.CAT_ID" :options="CATEGOREIS_COMPUTED"  class="inputtext" ></BFormSelect>
            <BButton
            variant="danger"
            class="inputtext"
            @click="cancelSearch"
            >إلفاء
          </BButton>
          </div>
          <div>
        
          </div>
          </div>
          <div class="allscrolls2">
          <b-table striped hover :fields="itemfields" :items="GET_ITEM_DETAILS_SEARCH"
        
      class="itemdetailtable "
     >
      <template #cell(Actions)="row">
        <img class="card-image" :src="'data:image/jpeg;base64,'+row.item.ITEM_PIC_bytes" />

              </template>
              <template #cell(REQ_QTY)="row">
                <BFormInput  class="inputtext" v-model="row.item.REQ_QTY" type="number" :disabled="CURR_ORDER.ORDER_SER==-1" @keypress.enter="ADD_NEW_ITEM(row.item)"></BFormInput>

              </template>
              
      </b-table>

<BButton @click="()=>{this.ex1CurrentPage+=1}">>></BButton>

    </div>
</section>
        <section class="customerdetail">
          <div style="height: 100%;background:rgba(0, 0, 0, 0.05);">
            <h1>
              بيانات العميل
            </h1>
            <div class="d-flex justify-content-center">
              <BButton variant="success" style="font-size: 1.6rem;" @click="GetOldCustomer" :disabled="HIDE_ORDER">اختيار عميل قديم</BButton>
              <BButton variant="warning" style="font-size: 1.6rem;" @click="AddCustomer" :disabled="HIDE_ORDER"> عميل جديد</BButton>
              

            </div>
            <hr>
            <div class="CustomerDetail">
                <div>
                  {{ CUSTOMER.CUSTOMER_CODE }}
                <label>كود العميل</label>

                </div>
                <div>
                  {{ CUSTOMER.CUSTOMER_NAME }}
                  <label>اسم العميل</label>
                </div>
                <div>
                  {{ CUSTOMER.PHONE_NO   }}/{{  CUSTOMER.PHONE_NO2}}
                  <label>هاتف العميل</label></div>
                <div>
                  {{ CUSTOMER.ADDRESS }}
                  <label>عنوان العميل</label></div>
                <div></div>

            </div>
            <hr>
            <button
            class="AddOrderBtn"
            :style="{'background':!validateCust?'#b3b1b1':'#0d6efd'}"
            :disabled="HIDE_ORDER || !validateCust"
            @click="OpenOrder"
            >
              إنشاء فاتورة
            </button>
            <customerAdd ref="customernew" @UserAdd="ChosenUser"></customerAdd>
            <customerold ref="customerold" @UserAdd="ChosenUser"></customerold>

          </div>

        </section>
   
    </div>
      </div>
    
    </div>
    <!-- <img class="heroAbout" src="@/assets/img/heroAbout.jpg" /> -->
  </div>
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import customerAdd from '@/components/CustomComponent/Customer/customerAdd.vue';
import customerold from '@/components/CustomComponent/Customer/Allcustomer.vue';

import { mapGetters } from "vuex";

import VuePdfApp from "vue3-pdf-app";
// import this to use default icons for buttons
import "vue3-pdf-app/dist/icons/main.css";
export default {
  components: { customerAdd,customerold,VuePdfApp,VPagination },
  computed: {
    GET_ITEM_DETAILS_SEARCH(){

      return this.GET_ITEM_DETAILS.filter(x=>{
    return x.ITEM_CODE.toString().includes(this.PRODUCT.ITEM_CODE)
    &&
    (this.PRODUCT.COLOR_ID==-1?1==1:this.PRODUCT.COLOR_ID==x.COLOR_ID)
    &&
    (this.PRODUCT.SIZE_CODE==-1?1==1:this.PRODUCT.SIZE_CODE==x.SIZE_CODE)
    &&
    (this.PRODUCT.CAT_ID==-1?1==1:this.PRODUCT.CAT_ID==x.CAT_ID)

      })
    },ex1Rows(){
      return this.GET_ITEM_DETAILS.length
    }
  
,    ...mapGetters([

      "GET_ITEM_DETAILS",
      "GET_COLORS"
    ])
  ,
  validateCust(){
    if(this.CUSTOMER.CUSTOMER_CODE=="")
    {
      return false
    }
    return true
  },
  SIZES_COMPUTED(){
            let SIZESCOM=[]
            SIZESCOM.push({
            text:"اختر الحجم",
            value:-1
        })
            this.SIZES.forEach(element => {
                SIZESCOM.push({
            text:element.SIZE_NAME,
            value:element.SIZE_ID
        })})
        
      return SIZESCOM
      },
      
  COLORS_COMPUTED(){
            let SIZESCOM=[]
            SIZESCOM.push({
            text:"اختر اللون",
            value:-1
        })
            this.COLORS.forEach(element => {
                SIZESCOM.push({
            text:element.COLOR_NAME,
            value:element.COLOR_ID
        })})
        
      return SIZESCOM
      },
      CATEGOREIS_COMPUTED(){
            let SIZESCOM=[]
            SIZESCOM.push({
            text:"اختر التصنيف",
            value:-1
        })
            this.CATEGOREIS.forEach(element => {
                SIZESCOM.push({
            text:element.CAT_NAME,
            value:element.CAT_ID
        })})
        
      return SIZESCOM
      },
      totalOrder(){
        let TOTAL=0
        this.ORDER_ITEMS.forEach(x=>{
          TOTAL+= Number(x.QTY) * Number(x.ITEM_PRICE)
        })
        return TOTAL
      }
  },
  data() {
    return { 
      ex1CurrentPage:1,
      ex1PerPage:3,
      
      HIDE_ORDER:true,
      CUSTOMER:{
               CUSTOMER_CODE:"",
                CUSTOMER_NAME:"",
                  ADDRESS:"",
                  PHONE_NO:"",
                  PHONE_NO2:"",
                
  
              },
      CATEGOREIS:[],
      COLORS:[],
      PRODUCT:{
            ITEM_CODE:"",
            SIZE_CODE:-1,
            COLOR_ID:-1,
            CAT_ID:-1,
            QTY:0,
            ITEM_PIC:""
        },
      SIZES:[],
      CURR_ORDER:{
        ORDER_SER:-1,
        ORDER_NO:0
      },

      itemfields: [
        {
          key: "Actions",
          label: " ",
        },
        {
          key: "REQ_QTY",
          label: " الكمية المطلوبة ",
        },
        {
          key: "QTY",
          label: "الكمية ",
        },
        {
          key: "ITEM_PRICE",
          label: "السعر ",
        },
        {
          key: "COLOR_NAME",
          label: " اللون",
        },
        {
          key: "SIZE_NAME",
          label: " الحجم",
        },

        {
          key: "ITEM_NAME",
          label: " الاسم",
        },
        {
          key: "ITEM_CODE",
          label: " الكود",
        },
      ],
    OrderItemFields:[
    {
          key: "Actions",
          label: " ",
        },
    {
      
      key: "TOTAL_PRICE",
      label: "الإجمالى ",
    },
    {

          key: "QTY",
          label: "الكمية ",
        },
        {
          key: "ITEM_PRICE",
          label: "السعر ",
        },
        {
          key: "COLOR_NAME",
          label: " اللون",
        },
        {
          key: "SIZE_NAME",
          label: " الحجم",
        },

        {
          key: "ITEM_NAME",
          label: " الاسم",
        },
        {
          key: "ITEM_CODE",
          label: " الكود",
        },
    ],
    ORDER_ITEMS:[],
    pdf:"",
    show:false

    }
   
    
    },
    mounted(){
      this.GET_CURRENT_ORDER()
    this.Get_Items()
    this.GET_SIZES()
    this.GET_all_COLORS()
    this.Get_Categories()
  },
  methods:{
    Get_Items(){
      this.$store.dispatch("GET_ALL_NEW_ITEM_DETAIL").then(res=>{
        
        if(res.data.StatusCode=="200"){
          
          this.$store.commit("SET_ITEM_DETAILS",res.data.ITEM_DETAILS)
        }
      })
    },
    GET_SIZES(){
        this.$store
        .dispatch("GET_SIZES")
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.SIZES = res.data.COLORS;
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          // this.showAlert("حدث خطأ")
        });
    },
    GET_all_COLORS() {
      this.$store
        .dispatch("GET_COLORS")
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
             this.COLORS = res.data.COLORS;
            // this.$store.commit("SET_COLORS",res.data.COLORS)
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          // this.showAlert("حدث خطأ")
        });
    },
    Get_Categories() {
      this.$store
        .dispatch("Get_Categories")
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.CATEGOREIS = res.data.Categories;
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          // this.showAlert("حدث خطأ")
        });
    },
    cancelSearch(){
      this.PRODUCT={
            ITEM_CODE:"",
            SIZE_CODE:-1,
            COLOR_ID:-1,
            CAT_ID:-1,
            QTY:0,
            ITEM_PIC:""
        }},
        AddCustomer(){
        this.$refs.customernew.showModal()
        },
        GetOldCustomer(){
          this.$refs.customerold.GetAllCustomers()
          
          this.$refs.customerold.showModal()

        },
        GET_CURRENT_ORDER(){
          this.HIDE_ORDER=true
          this.$store.dispatch("GET_CURRENT_ORDER").then(res=>{
            debugger
            if(res.data.StatusCode=="201")
            {
              this.HIDE_ORDER=false
              this.ORDER_ITEMS=[]
              this.CURR_ORDER.ORDER_NO=0
              this.CURR_ORDER.ORDER_SER=-1
            }
            else if(res.data.StatusCode=="200")
            {
              this.ORDER_ITEMS=res.data.ORDER_ITEMS
              this.CUSTOMER=res.data.ORDER_DETAIL.customerData
              this.CURR_ORDER.ORDER_SER=res.data.ORDER_DETAIL.ORDER_SER
             this.CURR_ORDER.ORDER_NO=res.data.ORDER_DETAIL.ORDER_NO
            }
          })
        },

    showAlert(msg) {
      // Use sweetalert2
      this.$swal(msg);
    },
    ADD_NEW_ITEM(item)
    {
      if(item.QTY==0 || item.QTY<0)
      {
        item.QTY=0
        return
      }
      else
      {
        
        item.ORDER_SER=this.CURR_ORDER.ORDER_SER
        this.$store.dispatch("AddItem",item).then(res=>{
          if(res.data.StatusCode=="200")
          {
            this.GET_ORDER_ITEMS()
          }
        })
      }
    },
    ChosenUser(data)
    {
      this.CUSTOMER=data
    },

    GET_ORDER_ITEMS(){
      this.$store.dispatch("GET_ORDER_ITEMS",this.CURR_ORDER.ORDER_SER).then(res=>{
        if(res.data.StatusCode="200")
        {
             this.ORDER_ITEMS=res.data.ORDER_ITEMS 
        }
      })
    },
    OpenOrder()
    {
      this.$swal({
              title: 'هل انت متأكد من بداية فاتورة?',
              text: "",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'نعم',
              cancelButtonText: 'لا'
            }).then((result) => {
              if (result.value) {
             
                this.$store.dispatch("OpenOrder",{
                  CUSTOMER_CODE:this.CUSTOMER.CUSTOMER_CODE,
                  USER_CODE:localStorage.getItem("USER_CODE")
                }
              ).then(res=>{
if(res.data.StatusCode="200")
{
  this.CURR_ORDER.ORDER_SER=res.data.Order_Ser
  this.CURR_ORDER.ORDER_NO=res.data.Order_no
  
}
              })

              }})
  }
,
deleteItem(item){
  this.$swal({
              title: 'هل انت متأكد من حذف ?',
              text: "",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'حذف',
              cancelButtonText: 'لا'
            }).then((result) => {
              if (result.value) {

                this.$store.dispatch("deleteOrderItem",item).then(res=>{
    if(res.data.StatusCode="200")
        {
          this.GET_ORDER_ITEMS()
        }
       else
       {
        this.showAlert("حدث خطأ")
       }
  })
              }})

},
deleteAllOrder(){
  this.$store.dispatch("CancelOrder",this.CURR_ORDER.ORDER_SER).then(res=>{
    if(res.data.StatusCode="200"){
      this.showAlert(res.data.Message)
      this.GET_CURRENT_ORDER()
    }
  })
},END_ORDER(){
  this.$swal({
              title: 'هل انت متأكد من اتمام الفاتورة ?',
              text: "",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'نعم',
              cancelButtonText: 'لا'
            }).then((result) => {
              if (result.value) {
                this.$store.dispatch("END_ORDER",this.CURR_ORDER.ORDER_SER).then(res=>{
    if(res.data.StatusCode="200"){
      this.testrep(this.CURR_ORDER.ORDER_SER)
      this.showAlert(res.data.Message)
      this.GET_CURRENT_ORDER()
      this.Get_Items();
    }

            
})
}})
},
testrep(ORDER_SER){
  this.$store.dispatch("testrep",ORDER_SER).then((resp) => {

var content = resp.data;
var blob = new Blob([content]);
//  var blob = content;
this.readAsDataURL(blob).then(result => {
    // this.loader=false
  this.pdf = result;
   this.show = true;
})
})
},
readAsDataURL(blob){
        return new Promise((resolve) => {
  
          const reader = new FileReader();
          reader.onloadend = () =>   {
  
            resolve(reader.result)
          }
  
           reader.readAsDataURL(blob);
        })
  
      },
}

}
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
  overflow: scroll;
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
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  /* letter-spacing: 0.1em; */
  width: 100%;
  margin-top: 12em;
  /* padding: 0em 20em; */
  /* text-shadow: 1px 1px 2px black; */
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
.card-image {
  width:160px;
  height:160px;
  /* position: absolute; */
  /* width: inherit; */
  /* height: inherit; */
  object-fit: cover;
  display: block;
  object-position: top;
  transition: transform 0.6s;
  filter: brightness(80%);
}
.detailtable{
  width: 45%;
}
.orderdetail{
  width: 35%;
  
}
.customerdetail{
  width:20%
}
.itemdetailtable{
  width: 100%;
}
.inputtext{
  font-size: 1.7rem;
}
.CustomerDetail > div{
  margin-right: 15px;
  font: 1.3em sans-serif;
  font-weight: bold;
  color: #000;
  text-align: end;
  line-height: 100px;
}
.AddOrderBtn{
  font-size: 2rem;
  background: #b3b1b1;
    padding: 15px;
    border: 2px solid;
    border-radius: 11px;
}
.OrderItems{
  width: 100%;
 height: 100%;background:rgba(0, 0, 0, 0.05);
}
.checkout-card {
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: fit-content;
  color: #000;
  background-color: rgb(240, 240, 240);
  border-radius: 1em;
  align-items: center;
  position: inherit;
  margin: 1em 2em;
  border: 4px solid #333;
}
.checkout-card .header-checkout {
  position: relative;
  top: 0;
  width: 100%;
  display: flex;
  align-self: center;
  width: 15vw;
  height: fit-content;
  border-radius: 1em 1em 1em 1em;
  justify-content: center;
  border-bottom: 1px solid black;
  background-color: #d4d4d4;
}
.checkout-card .header-checkout .checkout-title {
  position: relative;
  font-family: "Magisho", sans-serif;
  font-size: 1.3em;
  width: 10vw;
  height: fit-content;
  margin: 0.8em 0;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.checkout-card .body-checkout {
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.checkout-card .body-checkout .text-box {
  position: relative;
  font-family: "Magisho", sans-serif;
  font-size: 0.9rem;
  width: 14vw;
  height: fit-content;
  padding: 0.8em 0em;
  margin: 0;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.checkout-card .body-checkout .text-total {
  position: relative;
  /* font-family: "Magisho", sans-serif; */
  font-size: 1.5rem;
  /* width: 10vw; */
  padding: 2em 0em;
  margin: 0;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.checkout-card .footer-checkout {
  position: relative;
  bottom: 0;
  /* width: 100%; */
  display: flex;
  align-self: center;
  width: 15vw;
  height: 7vh;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
  border-radius: 2em 2em 1em 1em;
  justify-content: center;
  border-top: 1px solid black;
  background-color: #eaeaea;
}
.checkout-card .footer-checkout .checkout {
  margin-bottom: 0.2em;
  display: block;
  transition: 0.5s;
  border: none;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0.8em 2em;
  align-self: center;
  text-align: center;
  bottom: 0;
  font-size: 1rem;
  font-family: "Magisho", sans-serif;
  width: 10vw;
  position: absolute;
  /* z-index: -1; */
  cursor: pointer;
  border-radius: 0.4em;
  margin-bottom: 0.5em;
}


.allscrolls2 {
  height: 100%;
}
.allscrolls2::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.allscrolls2::-webkit-scrollbar {
  width: 6px;
  height: 1px;
  background-color: #f5f5f5;
}
.allscrolls2::-webkit-scrollbar-thumb {
  width: 6px;
  height: 1px;
  background-color: #b87979;
}
</style>
