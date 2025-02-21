
<template>
    <div class="mt-4 d-flex flex-column align-items-center">
        <!-- Formulário -->
        <form class="p-4 w-25 border border-secondary-subtle rounded shadow-sm bg-body-tertiary" @submit.prevent="addMateria">
            <h3>[+] Adicionar Matéria [+]</h3>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Nome:</span>
                <input type="text" class="form-control" v-model="nome" placeholder="..." required>
            </div>
            <button class='btn btn-success w-100' type="submit">Adicionar</button>
        </form>

        <!-- Lista de matérias -->
        <h1 class="mt-5">Lista de Matérias</h1>
        <table class="mt-2 table w-75 border">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="materia in materias" :key="materia.id">
                    <td class="align-middle">{{ materia.nome }}</td>
                    <td class="align-middle">
                        <button class="btn btn-danger mx-1" @click="deleteMateria(materia.id)">Deletar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import axios from '../axios';
export default {
    name: 'MateriasComponent',
    data() {
        return {
            materias: [],
            nome: ''
        };
    },
    methods: {
        async fetchMaterias() {
            try {
                const response = await axios.get('/materias');
                this.materias = response.data;
            } catch (error) {
                console.error('Erro ao buscar materias:', error);
            }
        },
        async addMateria() {
            try {
                await axios.post('/materias', {
                    nome: this.nome
                });
                this.nome = '';
                this.fetchMaterias(); 
            } catch (error) {
                console.error('Erro ao adicionar estudante:', error);
            }
        },
        async deleteMateria(id) {
            try {
                await axios.delete(`/materias/${id}`);
                this.fetchMaterias(); 
            } catch (error) {
                console.error('Erro ao deletar materia:', error);
            }
        }
    },
    mounted() {
        this.fetchMaterias(); 
    }
};
</script>
  
  
  
  
  