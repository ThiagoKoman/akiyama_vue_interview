<template>
  <div class="mt-4 d-flex flex-column align-items-center">
    <h1 class="mt-4">Provas de {{ estudante.nome }}</h1>
    <table class="table w-75">
      <thead>
        <tr>
          <th>Matéria</th>
          <th>Nota</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="materia in materias" :key="materia.id">
          <td class="align-middle">{{ materia.nome }}</td>
          
          <td class="align-middle">
            <span v-if="!materia.isEditing && materia.nota !== -1">{{ materia.nota }}</span>
            <span v-if="!materia.isEditing && materia.nota == -1">x</span>
            <input min=0 max=10 v-if="materia.isEditing" v-model="materia.nota" type="number" class="form-control" />
          </td>
          
          <td class="align-middle">
            <button class="btn btn-warning" v-if="!materia.isEditing && materia.nota !== -1" @click="editNota(materia)">
              Editar
            </button>
            <button class="btn btn-info" v-if="!materia.isEditing && materia.nota === -1" @click="addNota(materia)">
              Criar
            </button>
            
            <button class="btn btn-success mx-1" v-if="materia.isEditing" @click="saveNota(materia)">
              Salvar
            </button>
            <button class="btn btn-danger mx-1" v-if="materia.isEditing" @click="cancelEdit(materia)">
              Cancelar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../axios'; 

export default {
  name: 'ProvaComponent',
  props: ['id_do_aluno'], 
  data() {
    return {
      estudante: {},
      materias: [],
    };
  },
  created() {
    this.fetchProvas();
  },
  methods: {
    async fetchProvas() {
      try {
        const response = await axios.get(`/provas/${this.id_do_aluno}`);
        const data = response.data;
        if (data.estudante) {
          this.estudante = data.estudante;
          this.materias = data.materias;

          this.materias.forEach(materia => {
            materia.isEditing = false;
          });
          console.log(this.estudante, this.materias);
        } else {
          console.error('Erro ao carregar as provas');
        }
      } catch (error) {
        console.error('Erro ao buscar provas:', error);
      }
    },
    
    // Ativa o modo de edição
    editNota(materia) {
      materia.isEditing = true;
      materia.originalNota = materia.nota;
    },

    // Habilita a criação de uma nova nota
    addNota(materia) {
      materia.originalNota = -1; // Criando uma nova nota
      materia.nota = "";
      materia.isEditing = true;
    },

    // Salva a nota editada
    async saveNota(materia) {
      try {
        await axios.post(`/provas/${this.id_do_aluno}/nota`, {
          
          id_matéria: materia.id,
          nota: materia.nota
        });
        materia.isEditing = false;
        this.fetchProvas();
        console.log("Nota salva:", materia.nota);
      } catch (error) {
        console.error('Erro ao salvar a nota:', error);
      }
    },

    cancelEdit(materia) {
      if (materia.originalNota !== undefined  ) {
        materia.nota = materia.originalNota;
      }
      

      materia.isEditing = false;
    }
  },
};
</script>
