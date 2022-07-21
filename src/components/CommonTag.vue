<template>
  <div class="tabs">
    <!-- 高亮的显示:effect 判断路由路径和tag.name，两者一直显示高亮$route并非$router-->
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      size="small"
      @close="handleClose(tag, index)"
      class="pointer"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: 'CommonTag',
  methods: {
    //点击按钮，进行一个路由的切换
    changeMenu(item) {
      this.$router
        .push({
          name: item.name
        })
        .catch((err) => err)
    },
    ...mapMutations({
      close: 'closeTag'
    }),
    handleClose(tag, index) {
      const length = this.tags.length - 1
      this.close(tag)
      if (tag.name !== this.$route.name) {
        return
      }
      if (index === length) {
        //删除的为最后一个tag，跳转到左边的tag
        this.$router.push({
          name: this.tags[index - 1].name
        });
      } else {
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  },
  computed: {
    //与面包屑数据是一致的
    ...mapState({
      tags: (state) => state.tab.tabsList
    })
  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>