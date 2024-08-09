import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },

  mutations: {
    updateList (state, newList) {
      state.list = newList
    },

    updateCount (state, obj) {
      const goods = state.list.find(item => item.id === obj.id)
      goods.count = obj.count
    }
  },

  actions: {
    async fetchCart (context) {
      const res = await axios.get('http://localhost:3000/cart')
      context.commit('updateList', res.data)
    },

    async updateCount (context, obj) {
      await axios.patch(`http://localhost:3000/cart/${obj.id}`, {
        count: obj.count
      })

      context.commit('updateCount', obj)
    }
  },

  getters: {
    total (state) {
      return state.list.reduce((total, item) => total + item.count, 0)
    },

    totalPrice (state) {
      return state.list.reduce((total, item) => total + item.count * item.price, 0)
    }
  }
}
