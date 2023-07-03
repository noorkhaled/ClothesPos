<template>
  <div class="aboutPage">
    <div class="gradient-section">
      <h1 class="title">المبيعات</h1>
     
      <p class="text">
        <div style="text-align: right;">
        <h3>
          مبيعاتى {{ mysales }}
        </h3>
      </div>
      <div>
        <b-table striped hover :fields="OrderItemFields" :items="ORDERS"
      class="itemdetailtable"
     > </b-table>
      </div>
      </p>
    </div>
    <img class="heroAbout" src="@/assets/img/heroAbout.jpg" />
  </div>
</template>

<script>
export default {
computed:{
  mysales(){
    let total=0;
     this.ORDERS.forEach(x=>
    {if(x.CR_USER==localStorage.getItem("USER_CODE"))
    {
      total+=x.ORDER_PRICE
    }}
    );
    return total;
  }
},
  data(){
    return{
      ORDERS:[],
      OrderItemFields:[   
      {
          key: "ORDER_PRICE",
          label: "السعر ",
        }, 
     
      {
          key: "CR_NAME",
          label: "البائع ",
        },
        {
          key: "CUSTOMER_NAME",
          label: "العميل ",
        },
       
        {
          key: "ORDER_DATE",
          label: "ناريخ الفاتورة ",
        },
      
        {
          key: "ORDER_NO",
          label: " رقم الفاتورة ",
        },
        ]
    }
  },
  created(){
    this.GET_ALL_ORDERS();
  },

  methods:{
    GET_ALL_ORDERS(){
      this.$store.dispatch("GET_ALL_ORDERS").then(res=>{
        
        if(res.data.StatusCode="200")
        {
          
             this.ORDERS=res.data.ORDERS 
        }
      })
    }
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
  margin-top: 18em;
  /* padding: 0em 20em; */
  text-shadow: 1px 1px 2px black;
  color: #fff;
  width: 80%;
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
</style>
