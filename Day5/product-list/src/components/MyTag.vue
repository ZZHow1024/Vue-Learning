<template>
  <div class="tag">
    <div @dblclick="handleDblClick" v-if="!isInput" class="tag-content">
      {{ value }}
    </div>
    <div v-else>
      <input :value="value" @blur="handleBlur" @keydown.enter="handleEnter" v-focus ref="inp" type="text" class="tag-input">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInput: false
    }
  },

  props: {
    value: String,
  },

  methods: {
    handleDblClick() {
      this.isInput = true;
    },
    handleEnter() {
      this.$refs.inp.blur();
    },
    handleBlur(e) {
      this.$emit("input", e.target.value);
      this.isInput = false;
    }
  }
}
</script>

<style scoped>
.tag {
  padding: 8px; /* 内边距 */
  text-align: center; /* 文本居中对齐 */
}

.tag-content {
  margin: 0 auto;
  height: 100%;
  width: 60px;
}

.tag-input {
  margin: 0 auto;
  height: 100%;
  width: 52px;
}
</style>