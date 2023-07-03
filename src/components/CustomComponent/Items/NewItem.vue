<template>
   <BModal v-model="modal" no-close-on-backdrop cancel-hide hide-footer="true" 
   
   title="إضافة منتج جديد" 
   class="my-modal"
   size="xl"
   >
<div class="d-flex">
<div style="    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;">
<div>
   <img :src="imagePreview" v-if="imagePreview" alt="Preview" class="preview-image" /> -->

    <!-- :src="imagePreview" v-if="imagePreview" alt="Preview" -->
    <!-- <BImg :src="imagePreview" v-if="imagePreview" alt="Preview"></BImg> -->
</div>
</div>
<div style="width:55% ;   direction: rtl;
    margin-left: 43px;">
     
    <label>
        كود الصنف
    </label>
    <BFormInput v-model="PRODUCT.ITEM_CODE" placeholder="كود الصنف" class="inputtext" disabled></BFormInput>
     
    <label>
        الحجم    </label>
   <BFormSelect v-model="PRODUCT.SIZE_CODE" :options="SIZES_COMPUTED"></BFormSelect> 
     
    <label>
        اللون
    </label>
    
   <BDropdown v-model="PRODUCT.COLOR_ID" text="اخنر اللون" variant="primary"  class="colordropdown">
    <BDropdownItem v-for="mycolor in GET_COLORS" :key="mycolor.value" @click="selectColor(mycolor.value)" >
        <div   :style="{ background: mycolor.text.slice(0,7) }">{{mycolor.text.slice(9)}}</div>
        </BDropdownItem>
    <!-- <BDropdownItem href="#">Another action</BDropdownItem>
    <BDropdownItem href="#">Something else here</BDropdownItem> -->
  </BDropdown>
  <div class="mt-3" v-if="CHOSENcolor!=''">
    اخترت: <strong>{{CHOSENcolor}}</strong>
  </div>
    <!-- <BFormInput v-model="PRODUCT.COLOR" placeholder="اللون " class="inputtext"></BFormInput> -->
     
    <!-- <label>
         الوصف
    </label>
    <BFormTextarea
          id="textarea2"
          v-model="PRODUCT.DESCRIPTION"
          placeholder="الوصف"
          rows="3"
          max-rows="6"
          class="inputtextarea"
        ></BFormTextarea> -->
     

     
    <label>
         الكمية
    </label>
    <BFormInput type="number" v-model="PRODUCT.QTY" placeholder="الكمية" class="inputtext"></BFormInput>
     
    <label>
         صورة
    </label>
<input type="file" accept="image/*" @change="onFileChange"  ref="fileInput"/>
    
<BButton @click="UploadItem" variant="primary">إضافة</BButton>

<div>
    
</div>
</div>
</div>
   </BModal>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    mounted(){
        this.GET_SIZES()
    },
    computed:{
        ...mapGetters(['GET_COLORS']),
        SIZES_COMPUTED(){
            let SIZESCOM=[]
            this.SIZES.forEach(element => {
                SIZESCOM.push({
            text:element.SIZE_NAME,
            value:element.SIZE_ID
        })
    })
    ;
    return SIZESCOM
        },
        CHOSENcolor(){
            
if( this.GET_COLORS.filter(z=>{return z.value==this.PRODUCT.COLOR_ID}).length>0)
{
    return this.GET_COLORS.filter(z=>{return z.value==this.PRODUCT.COLOR_ID})[0].text.slice(9)
}
return ""
           
        }

    },
    data(){
    return{
        url:"",
        PRODUCT:{
            ITEM_CODE:"",
            SIZE_CODE:"",
            COLOR_ID:"",
            QTY:0,
            ITEM_PIC:""
        },
        modal:false,
        imagePreview: null,
        SIZES:[],
        selectedFile: null,

    }},
methods:{
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
    onFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = event.target.files[0];

      this.previewImage(file);
    },

    previewImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    },
    showModal(){
        this.modal=true
    },
    HideModal()
    {  this.PRODUCT={
            ITEM_CODE:"",
            SIZE_CODE:"",
            COLOR_ID:"",
            QTY:0,
            ITEM_PIC:""
        },
        this.modal=false
    },
    selectColor(data)
    {
        
        this.PRODUCT.COLOR_ID=data}
,
uploadImage2(){
            
        const file = this.selectedFile;
 
        
     
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result.split(",")[1];
        debugger
        const formData = new FormData();
        formData.append("file", file);
        // formData.append("PRODUCT", JSON.stringify(this.PRODUCT));
        this.$store.dispatch("ADD_NEW_ITEM_DETAIL",formData).then(res=>{
        if(res.data.StatusCode=="200")
        {
            this.HideModal()
        }
    })
         }
  
        
    },
    UploadItem() {
      const file = this.selectedFile;
      if (file) {
        // Convert the file to base64 string
        const reader = new FileReader();
        reader.onload = () => {
            
          const base64String = reader.result.split(",")[1];
            this.PRODUCT.ITEM_PIC=base64String
          this.$store.dispatch("ADD_NEW_ITEM_DETAIL",this.PRODUCT).then(res=>{
            if(res.data.StatusCode=="200")
        {
            this.HideModal()
            this.$emit("RefreshGrid")
            
        }
        this.showAlert(res.data.Message)
    })
        };
        reader.readAsDataURL(file);
      }},

      showAlert(msg) {
      // Use sweetalert2
      this.$swal(msg);
    },

},
props:{
    ITEM_CODE:{
        type:Number,
        default:-1
    }
},
watch:{
    ITEM_CODE(val)
    {
        this.PRODUCT.ITEM_CODE=val
    }
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
.preview-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}
.colordropdown{
    width: 100%;
}
.dropdown-menu {
    width: 100% !important;

}
</style>