<template>
  <div class="search-page">
    <div class="gradient-section">
      <h1 class="search-title">بحث</h1>
    </div>
    <img class="hero-image" src="@/assets/img/heroSearch.jpg" />
    <div class="search-container">
      <input
        class="searchInput"
        type="text"
        v-model="CATEGORY"
        placeholder="التصنيف"
      />
      <input
        class="searchInput"
        type="text"
        v-model="COLOR"
        placeholder="اللون"
      />
      <input
        class="searchInput"
        type="text"
        v-model="SIZE"
        placeholder="الحجم"
      />
      <input
        class="searchInput"
        type="text"
        v-model="ITEM_NAME"
        placeholder="كود او اسم"
      />
      {{ ITEM_NAME }}
      <p class="search-result">
        "{{ searchWord }}" - ({{ GET_ITEM_DETAILS_SEARCH.length }})نتائج البحث 
      </p>
    </div>
    <div class="card-section">
      <div v-for="(p,index) in GET_ITEM_DETAILS_SEARCH" :key="index" class="outer-card">
        <div
    
          class="card"
        >
          <img class="card-image" :src="'data:image/jpeg;base64,'+p.ITEM_PIC" />
          <div class="card-text">
            <p class="item-brand">{{ p.CAT }}</p>
            <p class="item-title">{{ p.ITEM_NAME }}</p>
            <p class="item-title">{{ p.ITEM_CODE }}</p>
            <p class="item-title">{{ p.SIZE_NAME }}</p>
            <p class="item-color">Color: {{ p.COLOR_NAME }}</p>
            <p class="item-color">الكمية: {{ p.QTY }}</p>

            <p class="item-description">{{ p.Description }}</p>
            <p class="item-price">${{ p.ITEM_PRICE }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
    ORDER_ITEMS:[],
    ITEM_NAME:"",
    SIZE:"",
    COLOR:"",
    CATEGORY:""
    }
  },
  name: "Search",
  computed: {
    GET_ITEM_DETAILS_SEARCH(){
debugger
return this.ORDER_ITEMS.filter(x=>{
return ( x.ITEM_CODE.toString().includes(this.ITEM_NAME)
|| x.ITEM_NAME.toString().includes(this.ITEM_NAME))
&&(this.SIZE==""?1==1:x.SIZE_NAME==this.SIZE )
&&x.COLOR_NAME.toString().includes(this.COLOR)
&&x.CAT.toString().includes(this.CATEGORY)


})
},
    filteredProducts() {
      try {
        let a =
          this.$store.getters.getFilteredProduct ||
          this.$store.getters.allProducts;
        return a;
      } catch (e) {
        console.log(e);
      }
    },
    searchWord: {
      get() {
        return this.$store.state.searchWord;
      },
      set(value) {
        this.$store.dispatch("filterProducts", value);
      },
    },
  },
created(){
  this.GET_ORDER_ITEMS()
},
  methods:
  {
    GET_ORDER_ITEMS()
    {
      this.$store.dispatch("GET_ALL_NEW_ITEM_DETAIL").then(res=>{
        if(res.data.StatusCode="200")
        {
             this.ORDER_ITEMS=res.data.ITEM_DETAILS
        }
      })
    }
  }
};
</script>

<style scoped>
.search-page {
  position: absolute;
  top: 0;
  z-index: -1;
  background-color: black;
  height: 100%;
}

.gradient-section {
  display: flex;
  position: absolute;
  width: 100vw;
  height: 26em;
  background-image: linear-gradient(transparent, rgb(0, 0, 0));
  text-align: center;
  justify-content: center;
  align-content: center;
}

.search-title {
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
.search-container {
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
}
.search-container .searchInput {
  position: relative;
  display: flex;
  justify-content: left;
  outline: none;
  border: none;
  font-weight: 500;
  width: 13vw;
  height: 3vh;
  transition: 0.8s;
  background: transparent;
  font-family: "Magisho", sans-serif;
  text-indent: 0.4em;
  font-size: 18px;
  border: 1px solid rgb(90, 90, 90);
  border-radius: 0.4em;
  background-color: rgb(21, 21, 21);
  color: rgb(90, 90, 90);
}
.search-container .search-result {
  position: relative;
  display: flex;
  color: white;
  justify-content: right;
  width: 30vw;
  margin: 0;
  font-size: 1.2em;
  color: rgb(251, 251, 251);
  font-family: "Valverde", sans-serif;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 2px black;
}

.hero-image {
  position: relative;
  width: 100vw;
  height: 26em;
  top: 0;
  object-fit: cover;
  display: block;
  z-index: -2;
  object-position: center;
  animation: fade-in 0.5s forwards;
}

.card-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: 100%;
  padding: 0.5em 0em 5em 0em;
  background-color: rgba(0, 0, 0);
}
.card-section .outer-card {
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.6s;
  cursor: pointer;
  overflow: hidden;
}

.card-section .outer-card:first-child {
  border-top: 2px solid rgb(40, 40, 40);
}

.card-section .outer-card .card {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 50vw;
  height: 20em;
  background: rgb(7, 7, 7);
  cursor: pointer;
  border: none;
  border-bottom: inherit;
  overflow: hidden;
  transition: transform 0.6s;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(0, 0, 0);
  text-decoration: none;
  padding: 2em 0em;
  border-bottom: 2px solid rgb(40, 40, 40);
}

.outer-card:hover {
  transform: translateX(-0.6em);
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
  position: relative;
  width: 30vw;
  height: 40vh;
  min-width: 13vw;
  padding: 4em 0em;
}

.outer-card:hover > .card > .card-image {
  transform: scale(1.1);
}

.card-bottom:hover > .card-image {
  transform: scale(1.1);
}

.card-text {
  display: flex;
  flex-direction: column;
  padding: 1em 2em 1em 2em;
  font-size: 1rem;
  word-wrap: break-word;
  text-align: left;
  align-self: right;
  color: white;
  width: 50vw;
}
.card-text > .item-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: rgb(214, 214, 214);
  margin: 0;
  margin-bottom: 1em;
}
.card-text > .item-brand {
  margin: 0;
  font-size: 0.9em;
  color: rgb(180, 180, 180);
  font-family: "Valverde", sans-serif;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 2px black;
}
.card-text > .item-color {
  margin: 0;
  font-size: 0.9em;
  color: rgb(255, 255, 255);
  font-family: "Valverde", sans-serif;
  letter-spacing: 0.1em;
  text-shadow: 1px 1px 2px black;
}

.card-text > .item-description {
  font-size: 0.8rem;
  color: rgb(214, 214, 214);
}
.card-text > .item-price {
  display: flex;
  justify-content: left;
  margin-top: 2em;
  font-size: 1rem;
  letter-spacing: 0.2em;
  color: white;
  font-family: "Valverde", sans-serif;
  font-weight: 100;
}
</style>
