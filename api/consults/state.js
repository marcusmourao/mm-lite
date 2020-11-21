import Vue from 'vue';

const INITIAL_STATE = {
  available: [],
  used: [],
};

const state = Vue.observable(INITIAL_STATE);

export default state;
