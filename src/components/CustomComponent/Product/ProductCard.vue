<template>
  <div class="shop-section">
    <div class="outer-card">
      <!-- <router-link
        :to="{
          name: 'ProductDetails',
          params: { gender: 0, id: 0 },
        }"
        class="card"
      > -->
<div   class="card">
        <img class="card-image" :src="'data:image/jpeg;base64,'+p.ITEM_PIC" />
        <div class="card-bottom">
          <div class="card-text">
            <div class="item-title">
              <div class="d-flex justify-content-center" >
                  <i class="fa fa-trash" @click="DeleteItem"></i>

                  <i class="fa fa-edit" @click="EditItem"></i>
                </div>
              <div class="d-flex" style="justify-content: space-evenly;">
               
                <div>
                  {{ p.ITEM_CODE}}
            <span>:الكود</span>
                </div>
                <div>
                  {{ p.ITEM_NAME}}
            <span>:الاسم</span>
                </div>
             

          </div>
            </div>
            <div class="item-title">
              <div class="d-flex" style="justify-content: space-evenly;">
                <div>
                  {{ p.COLOR_NAME }}
            <span>:اللون</span>
                </div>
                <div>
                  {{ p.SIZE_NAME }}
            <span>:الحجم</span>
                </div>
             

          </div>
            </div>
            <!-- <p class="item-title">
              <span></span>

            </p>
            <p class="item-brand">{{ p.SIZE_NAME }}
              <span>:الحجم</span>

            </p> -->
           
            <!-- <p class="item-description">{{ p.Description }}</p> -->
          </div>
        </div>
      </div>
      <!-- </router-link> -->
      <div class="card-under">
        <div class="item-price">${{ p.ITEM_PRICE }}</div>
        <div class="item-price">{{ p.QTY }}
          <span>:الكمية</span>
</div>
      </div>
    </div>
  </div>
  <edit-item-qty ref="editQtydetail"
 @EditQty="EditQty"></edit-item-qty>

</template>

<script>
import  EditItemQty from '../Items/editItemQty.vue'
import {mapGetters} from 'vuex'
export default {
  components:{
    EditItemQty
  },
    computed:{
    
    },
    props:{
        p:{
            type:Object,
            defaAULT:{
                ITEM_CODE:"",
                   SIZE_NAME:"",
                   QTY:0,
                   COLOR_NAME:"",
                   Description:"",
                   ITEM_NAME:"",
                   CAT:"",
                   ITEM_PRICE:"0"
            }
        }
    },

    methods:{
DeleteItem()
{this.$emit("DeleteItemDetail",this.p)},
EditItem()
{
  this.$refs.editQtydetail.showModal()
},
EditQty(QTY)
{
  debugger
  this.p.QTY+=Number(QTY)
  this.$emit("EditItemDetail",this.p)
}
    }

    

}
</script>


<style scoped>
.shop-page {
  position: absolute;
  top: 0;
  z-index: -1;
}
.gradient-section {
  display: flex;
  position: absolute;
  width: 100vw;
  height: 46em;
  background-image: linear-gradient(transparent, rgb(0, 0, 0));
  text-align: center;
  justify-content: center;
  align-content: center;
}
.shop-title {
  position: absolute;
  align-self: center;
  text-align: center;
  letter-spacing: 0.3em;
  font-family: light;
  font-weight: 100;
  text-indent: 0.3em;
  font-size: 3rem;
  color: #fff;
  text-transform: uppercase;
  font-family: "Magisho", sans-serif;
}
.hero-image {
  position: relative;
  width: 100vw;
  height: 46em;
  object-fit: cover;
  display: block;
  z-index: -2;
  object-position: center;
  animation: fade-in 0.5s forwards;
}
.shop-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, 20em);
  grid-gap: 0.4em;
  justify-content: center;
  height: fit-content;
  /* width: 100vw; */
  padding: 0.5em 0em 5em 0em;
  /* background-color: rgba(0, 0, 0); */
}
.outer-card {
  position: relative;
  transition: transform 0.6s;
  cursor: pointer;
  border: 0px solid rgba(56, 56, 56, 0);
  overflow: hidden;
  width: 20em;
}

.card {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 20em;
  height: 26em;
  background: rgb(7, 7, 7);
  cursor: pointer;
  border: none;
  border-bottom: inherit;
  overflow: hidden;
  transition: transform 0.6s;
  justify-content: flex-end;
  align-items: center;
  /* background-color: rgba(0, 0, 0); */
  text-decoration: none;
}

.outer-card:hover {
  transform: translateY(-0.5em);
}

.outer-card:hover > .card > .card-bottom {
  opacity: 1;
}

.card-image {
  position: absolute;
  width: inherit;
  height: inherit;
  object-fit: cover;
  display: block;
  object-position: top;
  transition: transform 0.6s;
  filter: brightness(80%);
}

.outer-card:hover > .card > .card-image {
  transform: scale(1.1);
}

.card-bottom:hover > .card-image {
  transform: scale(1.1);

}
.card-bottom:hover{
  opacity: 0.1;
  background-color: rgb(109, 109, 109);

}
.card-bottom {
  display: flex;
  flex-direction: column;
  justify-self: center;
  position: relative;
  /* background: rgb(0, 0, 0); */
  bottom: 0;
  left: 0;
  margin: 0;
  width: 20em;
  height: 11em;
  z-index: 1;
  opacity:1;
  transition: opacity 1s;
  justify-content: center;
}

.card-text {
  padding: 1em 2em 1em 2em;
  font-size: 1rem;
  word-wrap: break-word;
  text-align: left;
  align-self: center;
  width: 85%;
}

.card-text > .item-title {
  font-size: 1.3rem;
  font-weight: 800;
  padding-bottom: 0.1em;
  color: rgb(214, 214, 214);
}

.card-text > .item-brand {
  font-size: 1.4rem;
  padding-bottom: 0.7em;
  color: rgb(214, 214, 214);
}

.card-text > .item-description {
  font-size: 0.7rem;
  color: rgb(214, 214, 214);
}

.card-under {
  /* padding: 0.5em 6.55em; */
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
  width: 12em;
  /* background-color: rgb(0, 0, 0); */
  border: none;
  border-top: none;
  transition: background-color 0.5s, all 1s;
  color: white;
}

.outer-card:hover > .card-under {
  background-color: rgb(204, 204, 204);
  color: black;
  border-bottom-right-radius: 2em;
  border-bottom-left-radius: 2em;
}

.card-under > .item-price {
  font-size: 2rem;
  padding-bottom: 0.1em;
  opacity: 0.8;
  margin-left: 0.5em;
}
</style>
