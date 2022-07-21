<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu()">
      </el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          class="breadcrumb pointer"
          >{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data() {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    // 通过mutations来改变它的值
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    loginOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push("/login")
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList
    })
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb /deep/ .el-breadcrumb__item .is-link{
  color: #fff !important;
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;

  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>