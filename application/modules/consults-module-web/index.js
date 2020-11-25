import { join } from 'path';

const routes = [
  {
    name: 'ConsultsView',
    path: '/consultas',
    component: join(__dirname, 'ConsultsView.vue'),
  },
  {
    name: 'BuyConsultsView',
    path: '/consultas/comprar',
    component: join(__dirname, 'BuyConsultsView.vue'),
  },

];

export default {
  name: 'consults',
  routes,
};
