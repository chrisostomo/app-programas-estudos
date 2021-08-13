<template>
  <div class="width: 100%">
    <div class="d-flex justify-center align-center mt-10">
      <div>
        <div class="mb-5 text-center">
          <h1 class="text-center">Programa de estudos</h1>
          <h2 class="font-weight-light">Para começar escolha o orgão e a banca</h2>
        </div>
        <div>
          <v-select
            solo
            flat
            :items="orgaos"
            placeholder="Escolha o orgão que esta estudando"
            v-model="orgao"
            item-text="nome_orgao"
            item-value="id_orgao"
            :loading="loading.orgaos"
            >
          </v-select>
        </div>
        <div>
          <v-select
            solo
            flat
            :items="bancas"
            placeholder="Escolha a banca"
            v-model="banca"
            item-text="nome_banca"
            item-value="id_banca"
            :loading="loading.bancas"
            >
          </v-select>
        </div>
      </div>
    </div>
    <v-row align="center" no-gutters>
      <v-progress-circular indeterminate v-if="loading.questoes"></v-progress-circular>
      <v-col v-if="canShowMessageEmpty && assuntos.length == 0">
        <div class="text-center">
          <div>
            Não existe resultado para essa combinação
          </div>
          <div>
            Bons Estudos!
          </div>
        </div>
      </v-col>
      <v-treeview
        :items="tree"
        item-text="assunto"
        :load-children="getChildren"
        >
        <template #append="{ item }">
          {{ getQuantidadeQuestoes(item) }}
        </template>
      </v-treeview>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      canShowMessageEmpty: false,
      loading: {
        orgaos: false,
        bancas: false,
        questoes: false,
      },
      orgao: null,
      orgaos: [],
      banca: null,
      bancas: [],
      questoes: [],
      assuntos: [],
      tree: []
    }
  },
  created(){
    this.getOrgaos()
  },
  watch: {
    orgao(){
      this.getBancas();
    },
    banca(){
      this.getQuestoes();
    }
  },
  methods: {

    async getOrgaos(){
      this.loading.orgaos = true
      this.orgaos = await this.$store.dispatch('ProgramaEstudos/getOrgaos')
      this.loading.orgaos = false

    },

    async getBancas(){
      this.loading.bancas = true
      this.bancas = await this.$store.dispatch('ProgramaEstudos/getBancas', this.orgao)
      this.loading.bancas = false
    },

    async getQuestoes(){
      this.loading.questoes = true

      this.$store.dispatch('ProgramaEstudos/getQuestoes', {
        id_orgao: this.orgao,
        id_banca: this.banca
      }).then( ({ questoes, assuntos }) => {
        this.questoes = questoes
        this.assuntos = assuntos.map( assunto => ({
            ...assunto,
            children: [],
          }))
        
        this.tree = this.assuntos
          .filter( assunto => !assunto.id_assunto_pai)

        }).finally( _ => {
          this.loading.questoes = false

          this.canShowMessageEmpty = true
        })
    },

    getChildren(assunto) {
      assunto.children = this.assuntos
        .filter( item => item.id_assunto_pai == assunto.id_assunto )
    },

    getQuantidadeQuestoes(assunto) {
      let quantidade = this.questoes
        .filter( questao => questao.id_assunto == assunto.id_assunto).length
      
      this.getChildren(assunto)

      if (assunto.children.length > 0) {
        for (let i = 0; i < assunto.children.length; i++) {
          const child = assunto.children[i];
          quantidade = quantidade + this.getQuantidadeQuestoes(child)
        }
      }

      return quantidade
    }

  }
}
</script>
