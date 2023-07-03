<template>
   <BModal v-model="modal" no-close-on-backdrop cancel-hide hide-footer="true" 
   
   title="إضافة صنف جديد" 
   class="my-modal"
   size="xl"
   >
<div class="d-flex">
<div style="    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;">
<div>
    <BImg :src="url" fluid alt="Responsive image"></BImg>
</div>
</div>
<div style="width:55% ;   direction: rtl;
    margin-left: 43px;">
     
    <label>
        كود الصنف
    </label>
    <BFormInput v-model="PRODUCT.ITEM_CODE" placeholder="كود الصنف" class="inputtext"></BFormInput>
     
    <label>
        الحجم    </label>
    <BFormInput v-model="PRODUCT.SIZE" placeholder="الحجم" class="inputtext"></BFormInput>
     
    <label>
        اللون
    </label>
    <BFormInput v-model="PRODUCT.COLOR" placeholder="اللون " class="inputtext"></BFormInput>
     
    <label>
         الوصف
    </label>
    <BFormInput v-model="PRODUCT.DESCRIPTION" placeholder="الوصف" class="inputtext"></BFormInput>
     
    <label>
         السعر
    </label>
    <BFormInput type="number" v-model="PRODUCT.PRICE" placeholder="السعر" class="inputtext"></BFormInput>
     
    <label>
         الكمية
    </label>
    <BFormInput type="number" v-model="PRODUCT.QTY" placeholder="الكمية" class="inputtext"></BFormInput>
     
    <label>
         صورة
    </label>
<input type="file" accept="image/*" @change="onFileChange" />
    


<div>
    
</div>
</div>
</div>
   </BModal>
</template>

<script>
export default {
    data(){
    return{
        url:"",
        PRODUCT:{
            ITEM_CODE:"",
            SIZE:"",
            COLOR:"",
            DESCRIPTION:"",
            QTY:0,
            PRICE:0
        },
        modal:false
    }},
methods:{
   
    showModal(){
        this.modal=true
    },
    HideModal()
    {
        this.modal=false
    },
}
}
</script>

<style scoped>
.modal .modal-huge {
  max-width: 2000px !important;
  width: 2000px !important;
}
label{
    display: flex;
    justify-content: right;
    font-family: cursive;
    font-size: 35px;
}
</style>