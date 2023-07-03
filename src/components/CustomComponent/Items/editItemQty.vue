<template>
   <BModal
    v-model="modal"
    no-close-on-backdrop
    cancel-hide
    hide-footer="true"
    :title="'تعديل كمية'"
    class="my-modal"
    size="xl"
  >
  <h2>
    تعديل الكمية
  </h2>
  <BFormInput type="number" v-model="ITEM_QTY" placeholder="الكمية" class="inputtext" ></BFormInput>
  <span>
    - للاضافة ضع الرقم بالموجب للنقص ضع ب 
  </span>
  <div>
  <BButton @click="EditQty" variant="primary">
    تعديل
  </BButton>
</div>
  </BModal>
</template>

<script>
export default {
    data(){
    return{
        modal:false,
        ITEM_QTY:0
    }},
    methods:{
    showModal() {
        this.modal = true;
    },
    HideModal() {
      this.modal = false;
    },
    EditQty()
    {
        if(this.ITEM_QTY==0)
        {
            return
        }
        this.$emit("EditQty",this.ITEM_QTY)
    }}
}
</script>

<style>

</style>