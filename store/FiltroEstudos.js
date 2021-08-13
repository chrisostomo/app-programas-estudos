export const state = () => ({
  items: [],
})

export const getters = {
  find: (state) => id => state.items.find( item => item.id == id ),
  findByState: (state) => uf => state.items.filter( item => item.endereco_uf == uf ),
}

export const actions = {
  async search({ commit }, params) {
    const items = (await this.$api.get('/search', { params })).data
    commit('SET_ITEMS', items)
  },

  async orgao({ commit }, params) {
    const orgaos = (await this.$api.get('/api/v1/orgaos', { params })).data
    commit('SET_ORGAOS', orgaos)
  },
}

export const mutations = {
  SET_ITEMS: (state, items) => {
    state.items = items
  },
  SET_ORGAOS: (state, orgaos) => {
    state.orgaos = orgaos
  },
}
