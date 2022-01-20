<template>
  <div id="app">
    <MyHeader/>
    <main class="main">
      <button class="btn"
      @click="addRemoteForm">
        <p v-show="!show">Показать форму</p>
        <p v-show="show">Cкрыть форму</p>
      </button>
      <AddPaymentForm
        :show="show"
        @add-payment="addPayment"
        :categoryList="categoryList"
      />
      <PaymentDisplay
      :items="paymentsList"
      />
      <h3 v-show="paymentsListTotalAmount"  >Итого: {{ paymentsListTotalAmount }} руб.</h3>
    </main>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import MyHeader from '@/components/MyHead.vue';
import PaymentDisplay from '@/components/PaymentDisplay.vue';
import AddPaymentForm from '@/components/AddPaymentForm.vue';
import PaymentList from './data/paymentList.json';

export default {
  name: 'App',
  components: {
    MyHeader,
    AddPaymentForm,
    PaymentDisplay,
  },
  data: () => ({
    PaymentList,
    show: false,
    // paymentsList: [],
  }),
  methods: {
    ...mapMutations(['ADD_PAYMENT_DATA']),
    ...mapActions([
      'fetchData',
      'fetchCategoryList',
      'fetchAddCategoryList',
    ]),
    addPayment(data) {
      this.ADD_PAYMENT_DATA(data);
    },
    addRemoteForm() {
      this.show = !this.show;
    },
  },
  computed: {
    ...mapGetters([
      'paymentsList',
      'paymentsListTotalAmount',
      'categoryList',
    ]),
  },
  created() {
    this.fetchData();
    this.fetchCategoryList();
  },
};
</script>

<style>
* {
  margin: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  display: relative;
  width: 600px;
  min-height: 300px;
  margin: 10px auto;
  padding: 10px;
  background-color: blue;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
}
.btn {
  width: 208px;
  height: 50px;
  margin: 10px auto;
  border: 1px solid white;
  border-radius: 10px;
  background-color: rgb(29, 236, 29);
}
.btn:hover {
  cursor: pointer;
  background-color: green;
  color: white;
}
</style>
