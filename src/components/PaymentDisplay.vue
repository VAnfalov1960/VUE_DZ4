<template>
<div>
  <h3>Страница {{ page }}</h3>
    <div class="display" v-for="(item, index) in items"
      :key="index">
      {{index+1}}. {{item.date}} {{item.category}}{{item.addcategory}} {{item.value}} руб.</div>

    <button @click="pages('1')" class="btn btn3">1</button>
    <button @click="pages('2')" class="btn btn3">2</button>
    <button @click="pages('3')" class="btn btn3">3</button>
</div>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PaymentDisplay',
  data: () => ({
    page: 1,
  }),
  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },
  methods: {
    ...mapActions([
      'fetchData',
    ]),
    pages(page) {
      this.page = page;
      this.fetchData(this.page);
    },
  },
  created() {
    this.pages('3');
  },
};
</script>

<style scoped>
.display {
  padding-left: 50px;
  text-align: left;
}
</style>
