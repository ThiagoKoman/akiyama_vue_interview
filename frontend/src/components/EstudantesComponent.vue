<template>
  <div class="mt-4 d-flex flex-column align-items-center">

    <!-- Formulário -->
    <form class="p-4 w-25 border border-secondary-subtle rounded shadow-sm bg-body-tertiary"
      @submit.prevent="addEstudante">
      <h3>[+] Adicionar estudante [+]</h3>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Nome:</span>
        <input type="text" class="form-control" v-model="nome" placeholder="..." required>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Email:</span>
        <input type="text" class="form-control" v-model="email" placeholder="..." required>
      </div>
      <button class='btn btn-success w-100' type="submit">Adicionar Estudante</button>
    </form>

    <!-- Lista de estudantes -->
    <h1 class="mt-5">Lista de Estudantes</h1>
    <table class="mt-2 table w-75 border">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Média</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estudante in estudantes" :key="estudante.id">
          <td class="align-middle">{{ estudante.nome }}</td>
          <td class="align-middle">{{ estudante.email }}</td>
          <td class="align-middle">{{ estudante.media }}</td>
          <td class="align-middle">
            <button class="btn btn-info mx-1" @click="goToProvas(estudante)">Ver Provas</button>
            <!-- <button class="btn btn-warning mx-1" @click="editEstudante(estudante.id)">Editar</button> -->
            <button class="btn btn-danger mx-1" @click="deleteEstudante(estudante.id)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'EstudantesComponent',
  data() {
    return {
      estudantes: [],
      nome: '',
      email: ''
    };
  },
  methods: {
    async fetchEstudantes() {
      try {
        const response = await axios.get('/estudantes');
        this.estudantes = response.data;
      } catch (error) {
        console.error('Erro ao buscar estudantes:', error);
      }
    },
    async addEstudante() {
      try {
        await axios.post('/estudantes', {
          nome: this.nome,
          email: this.email
        });
        this.nome = '';
        this.email = '';
        this.fetchEstudantes();
      } catch (error) {
        console.error('Erro ao adicionar estudante:', error);
      }
    },
    async deleteEstudante(id) {
      try {
        await axios.delete(`/estudantes/${id}`);
        this.fetchEstudantes();
      } catch (error) {
        console.error('Erro ao deletar estudante:', error);
      }
    },
    goToProvas(estudante) {
      this.$router.push({ name: 'provas', params: { id_do_aluno: estudante.id } });
    }
  },
  mounted() {
    this.fetchEstudantes();
  }
};
</script>




