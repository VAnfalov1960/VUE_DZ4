<template>
  <div v-show="show" class="form">
    <p>Введите сумму</p>
    <label for="value">
      <input class="input" id="value" title="Сумма" type="text" placeholder="Сумма" v-model="value">
    </label>
    <p>Создайте новую категорию...</p>
    <label for="value">
      <input class="input" type="text" placeholder="Новая категория" v-model="addcategory">
    </label>
    <!-- Кнопку можно использовать просто для создания новой категории без создания записи -->
    <!-- <button class="btn" @click="addCategory">Создать новую категорию</button> -->
        <p>ИЛИ выберите из существующих</p>
    <label for="category">
      <select class="input input2" title="Выбор категории" v-model="category">
        <option
            v-for="(category, index) of categoryList"
            :value="category"
            :key='index'
        >
          {{ category }}
        </option>
      </select>
    </label>
    <p>Введите дату или она будет создана автоматически</p>
    <label for="date">
      <input class="input" title="Дата" type="text" placeholder="Введите дату" v-model="date">
    </label>
    <button class="btn" @click="addPayment">Добавить запись</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddPaymentForm',
  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
    show: {
      type: Boolean,
      default: false,
    },
    paymentListData: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    value: '',
    addcategory: '',
    category: '',
    date: '',
  }),
  methods: {
    ...mapActions([
      'fetchAddCategoryList',
    ]),
    addCategory(addcategory) {
      if ((this.addcategory !== '')) {
        this.fetchAddCategoryList(this.addcategory, addcategory);
        this.addcategory = '';
      }
    },
    resetData() {
      this.value = '';
      this.category = '';
      this.addcategory = '';
      this.date = '';
    },
    addPayment() {
      if (this.value !== ''
        && ((this.addcategory === '' && (this.category !== '' && this.category !== 'Выберите категорию'))
        || (this.addcategory !== '' && (this.category === '' || this.category === 'Выберите категорию')))) {
        if (this.addcategory !== '' && (this.category === '' || this.category === 'Выберите категорию')) {
          this.fetchAddCategoryList(this.addcategory);
        }
        if (this.category === 'Выберите категорию') {
          this.category = '';
        }
        const {
          value, addcategory, category, date, paymentDay,
        } = this;
        const data = {
          value: +value,
          addcategory,
          category,
          date: date || paymentDay,
        };
        this.$emit('add-payment', data);
        this.value = '';
        this.addcategory = '';
        this.category = '';
        this.date = '';
        this.resetData();
      }
    },
    remotePayment() {
      this.value = '';
      this.addcategory = '';
      this.category = '';
      this.date = '';
    },
  },
  computed: {
    paymentDay() {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      return `${day}.${month}.${year}`;
    },
  },
};
</script>

<style scoped>
.form {
  margin: 10px auto;
}
.input {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  margin: 10px auto;
  padding: 0 5px;
  border: 1px solid white;
  border-radius: 4px;
}
.input2 {
  width: 210px;
}
</style>
