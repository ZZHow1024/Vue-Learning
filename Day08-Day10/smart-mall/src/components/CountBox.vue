<template>
  <div class="count-box">
    <button :disabled="value <= 1" :class="{'disabled-btn': value <= 1}" @click="changeValue(-1)" class="minus">-
    </button>
    <input @change="handleChange" class="input" type="number" :value="value">
    <button :disabled="value >= 20 || value >= stockTotal" :class="{'disabled-btn': value >= 20 || value >= stockTotal}"
            @click="changeValue(+1)" class="add">+
    </button>
  </div>
</template>

<script>
export default {
  name: 'CountBox',
  props: {
    value: {
      type: Number,
      default: 1
    },
    stockTotal: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changeValue (value) {
      this.$emit('input', this.value + value)
    },
    handleChange (e) {
      let value = +e.target.value
      if (isNaN(value)) {
        e.target.value = this.value
        return
      }

      value = Math.round(value)

      if (value <= 1) {
        this.$emit('input', 1)
      } else if (value >= this.stockTotal) {
        this.$emit('input', this.stockTotal)
      } else if (value >= 20) {
        this.$emit('input', 20)
      } else {
        this.$emit('input', value)
      }

      e.target.value = this.value
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;

  .disabled-btn {
    color: #c8c9cc;
    cursor: not-allowed
  }

  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background: #efefef;
  }

  .input {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    text-align: center;
    background: #efefef;
  }
}
</style>
