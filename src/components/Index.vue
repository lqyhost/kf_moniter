<template>
  <div class="frame">
    <el-container class="frame-container">
      <el-container>
        <el-aside width="200px" class="aside">
          <el-row class="menu-row">
            <el-col :span="24">
              <div >
                <a href="/" class="brand"><strong>kf</strong>监控系统</a>
              </div>
              <el-menu
                default-active="1"
                background-color="#545c64"
                active-text-color="#fff"
                text-color="#ddd"
                :router="true"
              >

                <el-menu-item index="1" :route="{ name: 'strategy_moniter' }">
                  <template #title>
                    <el-icon><picture-rounded /></el-icon>
                    <span>策略监控</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="2" :route="{ name: 'account_moniter' }">
                  <template #title>
                    <el-icon><postcard /></el-icon>
                    <span>账户监控</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="3" :route="{ name: 'system_manager' }">
                  <template #title>
                    <el-icon><comment /></el-icon>
                    <span>系统管理</span>
                  </template>
                </el-menu-item>

                <el-menu-item index="4" :route="{ name: 'help' }">
                  <template #title>
                    <el-icon><comment /></el-icon>
                    <span>帮助</span>
                  </template>
                </el-menu-item>
                
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main class="main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>

    </el-container>
  </div>
</template>

<script>

</script>

<style scoped>
.frame-container {
  height: 100vh;
}
.header {
  height: 60px;
  background: #00a65a;
  display: flex;
}

.header .brand {
  width: 200px;
  margin-left: 20px;
  background-color: #008d4c;
  font-size: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header .header-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #008d4c;
  /* margin-left: 20px; */
  /* margin-right: 20px; */
  color: #fff;
}

.header-content .signout {
  cursor: pointer;
}
.brand {
  width: 200px;
  /* margin-left: 20px; */
  background-color: #E6A23C;
  font-size: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.aside {
  background-color: #545c64;
}

.aside .el-menu .is-active {
  background-color: #434a50 !important;
}

.footer {
  background: gray;
}
</style>

<style scoped>
.el-menu {
  border-right: none;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  text-decoration: none;
  vertical-align: baseline;
}
</style>