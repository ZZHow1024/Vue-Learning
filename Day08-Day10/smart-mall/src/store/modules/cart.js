import { changeCount, deleteCart, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, payload) {
      state.cartList = payload
    },

    clearCartList (state) {
      state.cartList = []
    },

    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },

    toggleAllCheck (state, checked) {
      state.cartList.forEach(item => {
        item.isChecked = checked
      })
    },

    changeCount (state, obj) {
      const {
        goodsId,
        goodsNum
      } = obj
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data: { list } } = await getCartList()
      // 增加每一项是否选中的 isChecked 状态
      list.forEach(item => {
        item.isChecked = true
      })

      context.commit('setCartList', list)
    },

    async changeCountAction (context, payload) {
      const {
        goodsId,
        goodsNum,
        goodsSkuId
      } = payload
      // 本地修改
      context.commit('changeCount', {
        goodsId,
        goodsNum
      })

      // 同步到后端
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },

    // 删除购物车中选中的商品
    async deleteAction (context) {
      const selectCartList = context.getters.selectCartList
      const cartIds = selectCartList.map(item => item.id)
      await deleteCart(cartIds)
      await context.dispatch('getCartAction')
      Toast.success('删除成功')
    }
  },
  getters: {
    // 所有商品数量
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的商品项
    selectCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },

    // 选中的商品数量
    selectCount (state, getters) {
      return getters.selectCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的商品总价
    selectPrice (state, getters) {
      return getters.selectCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },

    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
