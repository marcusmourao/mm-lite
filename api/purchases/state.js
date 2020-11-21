import Vue from 'vue';

const INITIAL_STATE = {
  purchases: [],
};

const state = Vue.observable(INITIAL_STATE);

export default state;
