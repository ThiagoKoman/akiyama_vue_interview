import { createRouter, createWebHistory } from 'vue-router';
import Estudantes from './components/EstudantesComponent.vue';
import Materias from './components/MateriasComponent.vue';
import Provas from './components/ProvaComponent.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Estudantes, 
  },
  {
    path: '/materias',
    name: 'materias',
    component: Materias, 
  },
  {
    path: '/provas/:id_do_aluno', 
    name: 'provas',
    component: Provas, 
    props: true, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, 
});

export default router;
