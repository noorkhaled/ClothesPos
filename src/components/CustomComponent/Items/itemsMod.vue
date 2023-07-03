<template>
  <BModal
    v-model="modal"
    no-close-on-backdrop
    cancel-hide
    hide-footer="true"
    :title="add == 1 ? 'إضافة' : 'تعديل'"
    class="my-modal"
    size="xl"
  >
    <div class="d-flex">
      <div style="width: 90%; direction: rtl; margin-left: 43px">
        <label> كود الصنف </label>

        <BFormInput
          v-model="PRODUCT.ITEM_CODE"
          placeholder="كود الصنف"
          class="inputtext"
          :disabled="!add"
        ></BFormInput>

        <label> اسم الصنف </label>
        <BFormInput
          v-model="PRODUCT.ITEM_NAME"
          placeholder="اسم الصنف"
          class="inputtext"
        ></BFormInput>

        <label> التصنيف </label>
        <BFormSelect v-model="PRODUCT.CAT_ID" :options="CATS"></BFormSelect>
        <label> الوصف </label>
        <BFormTextarea
          id="textarea"
          v-model="PRODUCT.DESCRIPTION"
          placeholder="الوصف"
          rows="3"
          max-rows="6"
          class="inputtextarea"
        ></BFormTextarea>

        <label> السعر </label>
        <BFormInput
          type="number"
          v-model="PRODUCT.PRICE"
          placeholder="السعر"
          class="inputtext"
        ></BFormInput>

        <div>
          <hr />
          <BButton
            :disabled="!validate"
            class="BtnAdd"
            :style="{ background: !validate ? 'grey' : '#0d6efd' }"
            button-variant="primary"
            @click="AddOrEdititem"
          >
            {{ add == 1 ? "إضافة" : "تعديل" }}
          </BButton>
        </div>

        <div></div>
      </div>
    </div>
  </BModal>
</template>
 
 <script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      url: "",
      PRODUCT: {
        ITEM_CODE: "",
        DESCRIPTION: "",
        PRICE: 0,
        ITEM_NAME: "",
        CAT_ID: null,
      },
      modal: false,
      CATS: [],
      add: false,
    };
  },
  methods: {
    showModal(id) {
      (this.add = id == 1 ? true : false), (this.modal = true);
    },
    HideModal() {
      this.modal = false;
    },
    AddOrEdititem() {
      
      if (this.add) {
        this.$emit("addItem", this.PRODUCT);
      } else {
        this.$emit("editItem", this.PRODUCT);
      }
    },
  },
  computed: {
    ...mapGetters(["GET_ITEMS"]),
    validate() {
      if (
        this.PRODUCT.ITEM_CODE == "" ||
        this.PRODUCT.PRICE == "" ||
        this.PRODUCT.CAT_ID == "" ||
        this.PRODUCT.ITEM_NAME == "" ||
        this.GET_ITEMS.filter((x) => {
          return x.ITEM_CODE == this.PRODUCT.ITEM_CODE && this.add;
        }).length > 0
      ) {
        return false;
      }
      return true;
    },
  },
  props: {
    ex1Options: {
      type: Array,
      default: [],
    },
    ITEM_PROP: {
      type: Object,
      default: {
        ITEM_CODE: "",
        DESCRIPTION: "",
        PRICE: 0,
        ITEM_NAME: "",
        CAT_ID: null,
      },
    },
  },
  watch: {
    ex1Options(val) {
      val.forEach((element) => {
        this.CATS.push({
          text: element.CAT_NAME,
          value: element.CAT_ID,
        });
      });
    },
    ITEM_PROP(val) {
      this.PRODUCT = JSON.parse(JSON.stringify(val));
    },
  },
};
</script>
 
 <style scoped>
.modal .modal-huge {
  max-width: 2000px !important;
  width: 2000px !important;
}
label {
  display: flex;
  justify-content: right;
  font-family: cursive;
  font-size: 35px;
}
.inputtext {
  height: 3vh;
  font-size: 26px;
  margin-bottom: 15px;
}
.inputtextarea {
  margin-bottom: 15px;
  font-size: 26px;
}
.BtnAdd {
  padding: 20px;
  font-size: 20px;
}
</style>