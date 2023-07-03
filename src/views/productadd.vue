<template>
  <div class="aboutPage">
    <div class="gradient-section allscrolls2">
      <h1 class="title">المنتجات الرئيسية</h1>
      <div class="text" style="display: flex">
        <div style="width: 75%">
          <div class="d-flex" style="justify-content: end; margin-bottom: 23px">
            <div class="d-flex">
              <div>
                <BFormInput
                  v-model="PRICE_MORE"
                  placeholder="السعر اصغر من"
                ></BFormInput>

                <BFormInput
                  v-model="PRICE_LESS"
                  placeholder="السعر أكبر من"
                ></BFormInput>
              </div>
              <BFormInput
                v-model="ITEM_CODE"
                placeholder="اسم/ كود الصنف"
              ></BFormInput>
            </div>
            <BButton class="addBtn" @click="AddNewItem">+</BButton>
          </div>
          <div class="MainItems allscrolls2">
            <b-table
              striped
              hover
              :fields="itemfields"
              :items="getitemsSearch"
              selectable
              @row-selected="SelectMainItem"
              @row-clicked="CheckMainItem"
            >
              <template #cell(Actions)="row">
                <i
                  class="fa fa-trash iconuser"
                  style="margin-left: 15px"
                  @click="DeleteItem(row.item.ITEM_CODE)"
                ></i>
                <i class="fa fa-edit iconuser" @click="EditItem(row.item)"></i>
              </template>
            </b-table>
          </div>
          <div>
            <BButton
              class="addBtn"
              @click="AddnewItemToSell"
              :disabled="Object.keys(SELECTED_MAIN_ITEM).length == 0"
              >+</BButton
            >
            <carousel itemsToShow=5>
              <slide
                v-for="slide in PRODUCT_DETAILS"
                :key="slide"
                :breakpoints="breakpoints"
              >
                <div class="carousel__item">
                  <product-card :p="slide" @DeleteItemDetail="DeleteItemDetail"
                  @EditItemDetail="EditItemDetail"
                  ></product-card>
                </div>
              </slide>

              <template #addons>
                <navigation />
                <pagination />
              </template>
            </carousel>
            <!-- <b-table striped hover :fields="itemfields" :items="getitemsSearch">
              <template #cell(Actions)="row">
                <i
                  class="fa fa-trash iconuser"
                  style="margin-left: 15px"
                  @click="DeleteItem(row.item.ITEM_CODE)"
                ></i>
                <i class="fa fa-edit iconuser" @click="EditItem(row.item)"></i>
              </template>
            </b-table> -->
          </div>
        </div>

        <div
          style="
            width: 20%;
            display: block;
            justify-content: start;
            direction: rtl;
            margin-left: 20px;
          "
          class="listgroup"
        >
          <div>
            <label>
              تصنيف <i class="fa fa-save savebtn" @click="AddCat"></i>
            </label>
            <BFormInput
              v-model="CATEGORY"
              placeholder="اسم التصنيف"
              class="inputtext catinput"
              @keypress.enter="AddCat"
            ></BFormInput>

            <div class="MainItems">
              <BListGroup>
                <BListGroupItem
                  v-for="CATS in getCatSearch"
                  :key="CATS.CAT_ID"
                  :active="CATS.CAT_ID == SELECTED_CAT_ID"
                  @click="selectCat(CATS.CAT_ID)"
                  style="display: flex; justify-content: space-between"
                >
                  <span>
                    {{ CATS.CAT_NAME }}
                  </span>

                  <i
                    class="fa fa-trash savebtn"
                    @click="DeleteCat(CATS.CAT_ID)"
                  ></i>
                </BListGroupItem>

                <!-- <BListGroupItem >Dapibus ac facilisis in</BListGroupItem>
  <BListGroupItem >Morbi leo risus</BListGroupItem>
  <BListGroupItem >Porta ac consectetur ac</BListGroupItem>
  <BListGroupItem >Vestibulum at eros</BListGroupItem> -->
              </BListGroup>
            </div>
          </div>
          <div style="margin-top: 10px">
            <div class="d-flex" style="justify-content: space-between">
              <input type="color" v-model="SELECTED_COLOR.COLOR_HEXA" />

              <BFormInput
                v-model="SELECTED_COLOR.COLOR_NAME"
                placeholder="اسم اللون"
                class="colorinput"
                @keypress.enter="ADD_EDIT_COLOR"
              ></BFormInput>
              <i class="fa fa-save savebtn" @click="ADD_EDIT_COLOR"></i>
              <i
                class="fa fa-trash savebtn"
                :disabled="SELECTED_COLOR.COLOR_ID == -1"
                @click="DELETE_COLOR"
              ></i>
            </div>
            <div
              v-for="(color, index) in DRAW_COLORS"
              :key="index"
              class="d-flex"
              style="justify-content: space-between"
            >
              <div v-for="mycolor in color" :key="mycolor.COLOR_ID">
                <div
                  class="colorsquare"
                  :style="{ background: mycolor.COLOR_HEXA }"
                  @click="SelectColor(mycolor)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <items-mod
      ref="itemsMod"
      :ex1Options="CATEGOREIS"
      @addItem="AddItem"
      @editItem="EditOlditem"
      :ITEM_PROP="SELECTED_ITEM"
    ></items-mod>
    <NewItem
      ref="newItemToSell"
      :ITEM_CODE="SELECTED_MAIN_ITEM.ITEM_CODE"
      @RefreshGrid="getItemDetail()"
    ></NewItem>
  
    <!-- <img class="heroAbout" src="@/assets/img/pexel3.jpg" /> -->
  </div>
</template>

<script>
import itemsMod from "@/components/CustomComponent/Items/itemsMod.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import NewItem from "@/components/CustomComponent/Items/NewItem.vue";
import { mapGetters } from "vuex";
import ProductCard from "@/components/CustomComponent/Product/ProductCard.vue";

export default {
  components: {
    itemsMod,
    NewItem,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    ProductCard,
},
  computed: {
    ...mapGetters(["GET_ITEMS"]),
    getitemsSearch() {
      return this.GET_ITEMS.filter((x) => {
        return (
          (x.ITEM_CODE.toString().includes(this.ITEM_CODE) ||
            x.ITEM_NAME.includes(this.ITEM_CODE)) &&
          x.PRICE > this.PRICE_LESS &&
          (this.PRICE_MORE == 0 ? 1 == 1 : x.PRICE < this.PRICE_MORE) &&
          (this.SELECTED_CAT_ID == -1
            ? 1 == 1
            : x.CAT_ID == this.SELECTED_CAT_ID)
        );
      });
    },
    getCatSearch() {
      return this.CATEGOREIS.filter((x) => {
        return x.CAT_NAME.includes(this.CATEGORY);
      });
    },
    DRAW_COLORS() {
      let COLOR_ARRAY = [];
      let NoOfArrays = Math.ceil(this.COLORS.length / 6);
      for (let z = 0; z < NoOfArrays; z++) {
        COLOR_ARRAY.push([]);
        for (let x = 0; z * 6 + x < 6 * z + 6; x++) {
          if (z * 6 + x >= this.COLORS.length) {
            break;
          }

          COLOR_ARRAY[z].push(this.COLORS[z * 6 + x]);
        }
      }
      return COLOR_ARRAY;
    },
  },
  data() {
    return {
      settings: {
        itemsToShow: 4,
        snapAlign: "center",
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 4,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 4,
          snapAlign: "start",
        },
      },
      SELECTED_COLOR: {
        COLOR_ID: -1,
        COLOR_NAME: "",
        COLOR_HEXA: "",
      },
      ex1CurrentPage: 1,
      ex1PerPage: 5,
      SELECTED_ITEM: {},
      ITEM_CODE: "",
      PRICE_LESS: 0,
      PRICE_MORE: 0,
      CATEGOREIS: [],
      CATEGORY: "",
      SELECTED_CAT_ID: -1,
      items: [],
      itemfields: [
        {
          key: "Actions",
          label: " ",
        },
        {
          key: "PRICE",
          label: "السعر ",
        },
        {
          key: "DESCRIPTION",
          label: " الوصف",
        },
        {
          key: "CAT_NAME",
          label: " التصنيف",
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
      COLORS: [],
      SELECTED_MAIN_ITEM: {
        ITEM_CODE: -1,
      },
      oldindex: -1,
      TEST: {},
      PRODUCT_DETAILS: [],
    };
  },
  methods: {
    CheckMainItem(item, index) {
      if (this.oldindex == index) {
        this.SELECTED_MAIN_ITEM = {};
        return;
      }
      this.oldindex = index;
    },
    SelectMainItem(item) {
      this.SELECTED_MAIN_ITEM = item;
      this.getItemDetail();
    },
    getItemDetail() {
      this.$store
        .dispatch("GET_NEW_ITEM_DETAIL", this.SELECTED_MAIN_ITEM)
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.PRODUCT_DETAILS = res.data.ITEM_DETAILS;
          }
        });
    },
    selectCat(id) {
      if (this.SELECTED_CAT_ID == id) {
        this.SELECTED_CAT_ID = -1;
        return;
      }
      this.SELECTED_CAT_ID = id;
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
    GET_ALL_ITEMS() {
      this.$store
        .dispatch("Get_Items")
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.$store.commit("SET_ITEMS", res.data.ITEMS);
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          // this.showAlert("حدث خطأ")
        });
    },
    AddCat() {
      if (this.CATEGORY == "" || this.CATEGORY == null) {
        this.showAlert("لا يمكن اضافة تصنيف و الاسم فارغ");
        return;
      } else if (
        this.CATEGOREIS.filter((x) => {
          return x.CAT_NAME == this.CATEGORY;
        }).length > 0
      ) {
        this.showAlert("هذا التصنيف تم اضافته من قبل");
        return;
      }
      this.$store
        .dispatch("AddCategories", this.CATEGORY)
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.Get_Categories();
            this.showAlert("تم الاضافة بنجاح");
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          this.showAlert("حدث خطأ");
        });
    },
    DeleteCat(id) {
      this.$store
        .dispatch("DeleteCat", id)
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.showAlert(res.data.Message);

            this.Get_Categories();
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          // this.showAlert("حدث خطأ")
        });
    },
    DeleteItem(id) {
      this.$store
        .dispatch("DeleteItem", id)
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.showAlert(res.data.Message);

            this.GET_ALL_ITEMS();
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          // this.showAlert("حدث خطأ")
        });
    },

    AddNewItem() {
      let PRODUCT = {
        ITEM_CODE: "",
        DESCRIPTION: "",
        PRICE: 0,
        ITEM_NAME: "",
        CAT_ID: null,
      };
      this.SELECTED_ITEM = JSON.parse(JSON.stringify(PRODUCT));
      this.$refs.itemsMod.showModal(1);
    },
    EditItem(item) {
      this.SELECTED_ITEM = JSON.parse(JSON.stringify(item));

      this.$refs.itemsMod.showModal(2);
    },
    AddItem(item) {
      this.$store
        .dispatch("ADDitem", item)
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.$refs.itemsMod.HideModal();
            this.GET_ALL_ITEMS();
            this.showAlert(res.data.Message);
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {});
    },
    EditOlditem(item) {
      this.$store
        .dispatch("Edititem", item)
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.$refs.itemsMod.HideModal();
            this.GET_ALL_ITEMS();
            this.showAlert(res.data.Message);
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {});
    },
    GET_COLORS() {
      this.$store
        .dispatch("GET_COLORS")
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.COLORS = res.data.COLORS;
            this.$store.commit("SET_COLORS", res.data.COLORS);
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          // this.showAlert("حدث خطأ")
        });
    },
    ADD_EDIT_COLOR() {
      if (
        this.SELECTED_COLOR.COLOR_NAME == "" ||
        this.SELECTED_COLOR.COLOR_NAME == null
      ) {
        this.showAlert("لا بد من كتابة اسم اللون");
        return;
      }
      if (
        this.COLORS.filter((x) => {
          return (
            x.COLOR_NAME == this.SELECTED_COLOR.COLOR_NAME ||
            x.COLOR_HEXA == this.SELECTED_COLOR.COLOR_NAME
          );
        }).length > 0 &&
        this.SELECTED_COLOR.COLOR_ID == -1
      ) {
        this.showAlert("لقد تم اضافة هذا اللون من قبل");
        return;
      }
      let API = this.SELECTED_COLOR.COLOR_ID == -1 ? "ADD_COLOR" : "Edit_COLOR";

      this.$store
        .dispatch(API, this.SELECTED_COLOR)
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.GET_COLORS();
            this.showAlert(res.data.Message);
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          this.showAlert("حدث خطا");
        });
    },
    SelectColor(color) {
      this.SELECTED_COLOR = color;
    },
    DELETE_COLOR() {
      if (this.SELECTED_COLOR.COLOR_ID == -1) {
        return;
      }
      this.$store
        .dispatch("DELETE_COLOR", this.SELECTED_COLOR.COLOR_ID)
        .then((res) => {
          if ((res.data.StatusCode = "200")) {
            this.showAlert(res.data.Message);

            this.GET_COLORS();
            this.SELECTED_COLOR = {
              COLOR_ID: -1,
              COLOR_NAME: "",
              COLOR_HEXA: "",
            };
          } else {
            this.showAlert(res.data.Message);
          }
        })
        .catch((err) => {
          // this.showAlert("حدث خطأ")
        });
    },
    AddnewItemToSell() {
      this.$refs.newItemToSell.showModal();
    },
    DeleteItemDetail(item)
    {
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

                this.$store.dispatch("DELET_NEW_ITEM_DETAIL",item).then(res=>{
    if(res.data.StatusCode="200")
        {
          this.getItemDetail();
        
        }
       else
       {
        this.showAlert("حدث خطأ")
       }
  })}
})
    },
    EditItemDetail(item){
      this.$swal({
              title: 'هل انت متأكد من تعديل ?',
              text: "",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'نعم',
              cancelButtonText: 'لا'
            }).then((result) => {
              if (result.value) {

                this.$store.dispatch("EDIT_NEW_ITEM_DETAIL_QTY",item).then(res=>{
    if(res.data.StatusCode="200")
        {
          this.getItemDetail();
        
        }
       else
       {
        this.showAlert("حدث خطأ")
       }
  })}
})
    },
    showAlert(msg) {
      // Use sweetalert2
      this.$swal(msg);
    },
  },
  mounted() {
    this.Get_Categories();
    this.GET_ALL_ITEMS();
    this.GET_COLORS();
  },
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
  overflow: scroll;
}
.gradient-section .title {
  position: absolute;
  align-self: center;
  text-align: center;
  font-weight: 100;
  text-indent: 0.3em;
  font-size: 1.6rem;
  color: #fff;
  text-transform: uppercase;
  font-family: "Magisho", sans-serif;
  margin-top: 5em;
  text-shadow: 1px 1px 2px black;
}
.gradient-section .text {
  position: absolute;
  align-self: center;
  text-align: center;
  font-family: "Magisho", sans-serif;
  font-size: 1.3rem;
  font-weight: 100;
  margin-top: 13em;
  text-shadow: 1px 1px 2px black;
  color: #fff;
  width: 100%;
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
.listgroup {
  font-size: 1.6rem !important;
  height: 40vh;
}
.savebtn:hover {
  color: darkgoldenrod;
  cursor: pointer;
}
.inputtext {
  height: 3vh;
  font-weight: bold;
  font-size: 1.6rem;
}
.addBtn {
  width: 65px;
  height: 65px;
  background: cornflowerblue;
  font-size: 1.6rem;
}
.addBtn:hover {
  color: darkgoldenrod;
}
.MainItems {
  max-height: 30vh;
  overflow: scroll;
  font-size: 1.63rem !important;
}
.catinput {
  margin-bottom: 10px;
  height: 40px !important;
}
.colorinput {
  width: 70%;
}
.colorsquare {
  width: 30px;
  height: 30px;
  padding: 25px;
  border-radius: 10px;
  margin: 15px;
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  /* background-color: var(--vc-clr-primary); */
  /* color: var(--vc-clr-white); */
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
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
