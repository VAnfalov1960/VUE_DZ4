// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

export default {
  state: {
    // список категорий
    categoryList: [],
  },
  mutations: {
    // загружает все данные categoryList
    // (те, что в следующих двух строчках с правой стороны)
    // и кладёт их в state.categoryList
    SET_CATEGORY_LIST(state, category) {
      state.categoryList = category;
    },
    // возможно здесь должен пушить новые данные
    // пока просто загружаю все данные из 2-го массива
    ADD_CATEGORY_LIST(state, addСategory) {
      state.categoryList.push(addСategory);
    },
  },
  getters: {
    categoryList: ({ categoryList }) => categoryList,
    addCategoryList: ({ addCategoryList }) => addCategoryList,
  },
  // Ниже commit - сюда прилетает не весь state, а только метод commit (диструктуризуем)
  actions: {
    fetchCategoryList({ commit }) {
      setTimeout(() => {
        const categoryList = ['Выберите категорию', 'Подарки', 'Театр', 'Развлечения'];
        commit('SET_CATEGORY_LIST', categoryList);
        console.log(categoryList);
      }, 1000);
    },
    fetchAddCategoryList({ commit }, addcategory) {
      setTimeout(() => {
        const addCategoryList = addcategory;
        // const addСategoryList = this.addcategory;
        // ниже для вызова мутации передаём её название SET_ADD_CATEGORY_LIST
        // и передаём новые данные после запятой с правой стороны от addCategoryList,
        // т.е. из константы чуть выше
        commit('ADD_CATEGORY_LIST', addCategoryList);
      }, 1000);
    },
  },
};
