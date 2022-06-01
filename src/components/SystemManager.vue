<template>
    <el-container class="frame-container1">
    <el-header class="header1">
    <el-menu
      :default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
      :router="true"
    >
    <el-menu-item index="/system_manager/account_manager">
    <template #title>
        <el-icon><house /></el-icon>
        <span>账户管理</span>
    </template>
    </el-menu-item>
    <el-menu-item index="/system_manager/strategy_manager">
    <template #title>
        <el-icon><house /></el-icon>
        <span>策略管理</span>
    </template>
    </el-menu-item>
    <el-menu-item index="/system_manager/risk_manager">
    <template #title>
        <el-icon><house /></el-icon>
        <span>风控管理</span>
    </template>
    </el-menu-item>

    
    </el-menu>
    </el-header>
    <el-container index="frame-container1">
        <el-main class="main1" >
        <router-view></router-view>
        </el-main>
    </el-container>
    </el-container> 
</template>

<script>
export default {
  name: "SystemManager"
}
</script>


<style scoped>
.frame-container1 {
  height: auto;
  width: auto;
}
.header1 {
  height: 60px;
  width: auto;
  background: #545c64;
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