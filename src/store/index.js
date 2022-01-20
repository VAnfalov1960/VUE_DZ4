import Vue from 'vue';
import Vuex from 'vuex';
// Подключение category из '@/store/category'
// и не забыть объявить внизу в modules
import category from '@/store/category';
import PaymentList from '../data/paymentList.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
  },
  mutations: {
    SET_PAYMENTS_LIST(state, paymentsList) {
      state.paymentsList = paymentsList;
    },
    ADD_PAYMENT_DATA(state, payment) {
      state.paymentsList.push(payment);
    },
  },
  getters: {
    paymentsList: (state) => state.paymentsList,
    paymentsListTotalAmount: ({ paymentsList }) => paymentsList
      .reduce((total, { value }) => total + value, 0),
  },
  actions: {
    // Пока не получается пробросить полученный page, 30 стр.
    // в PaymentList.page1 34 стр.
    // не получается делать замену PaymentList.page1 на PaymentList.page2...
    fetchData({ commit }, page) {
      if (page === '1') {
        setTimeout(() => {
          const paymentsList = PaymentList.page1;
          commit('SET_PAYMENTS_LIST', paymentsList);
        }, 1000);
      }
      if (page === '2') {
        setTimeout(() => {
          const paymentsList = PaymentList.page2;
          commit('SET_PAYMENTS_LIST', paymentsList);
        }, 1000);
      }
      if (page === '3') {
        setTimeout(() => {
          const paymentsList = PaymentList.page3;
          commit('SET_PAYMENTS_LIST', paymentsList);
        }, 1000);
      }
    },
  },
  modules: {
    category,
    PaymentList,
  },
});
