export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async getOrgaos() {
    return (await this.$axios.get('/api/v1/orgaos')).data
  },
  async getBancas(_, id) {
    return (await this.$axios.get(`/api/v1/bancas/${id}`)).data
  },
  async getQuestoes(_, { id_orgao, id_banca }) {
    return (
      await this.$axios.get(`/api/v1/questoes`, {
        params: {
          id_orgao,
          id_banca
        }
      })
    ).data;
  }
}
