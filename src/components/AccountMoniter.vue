<template>
  <div class="table1">
    <el-table
      :data="tableData"
      size="mini"
      style="width: 100%"
      @row-click="openlog"
      :row-style="tableRowStyle"
    >
      <el-table-column
        prop="process_name"
        label="进程名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="启停时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="delete"
        label="删除">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click = "switchProcess (scope.row)" >启动 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" plain v-if = "scope.row.buttonVisible" @click = "changeTable(scope.row.buttonVisible,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
  <el-button type="primary" ref='btn1' @click="doLog()" plain>stop load</el-button>
  <el-table height="400px" ref="table2" :data="logData">
    <el-table-column prop="date" label="日志级别" width="180"> </el-table-column>
    <el-table-column prop="name" label="进程名" width="180"> </el-table-column>
    <el-table-column prop="address" label="日志"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
const exampleData = new Array(20).fill({
  date: 1,
  name: 'test',
  address: 'test'
});
export default {
  name: 'AccountMoniter',
  data () {
    return {
      tableData: [],
      logData: exampleData,
      count: 0,
      load_more: true,
      logname:"test"
    }
  },
  inject:['reload'],
  beforeDestroy () {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    initData: function () {
      // let self = this;
      // this.$api.getStatus((resObj) => {
      // if (resObj.result < 0) {
      //     self.$alert("用户登录出错：" + resObj.message, "登录失败");
      // } else {
      //   this.tableData = resObj.userinfo;
      //   // this.reload()
      // }});
    },
    changeTable (buttonVisible, index) {
      this.tableData[index].buttonVisible = !buttonVisible
    },
    switchProcess (row) {
      let self = this;
      let raw_name = row.process_name
      this.$api.switch_status(raw_name, (resObj) => {
        if (resObj.result < 0) {
            self.$alert("无用户进程" + raw_name);
        } else {
          this.tableData = resObj.userinfo;
          // this.reload()
        }
      });
    },
    openlog (row) {
      let raw_name = row.process_name
      this.$message.success("日志" + raw_name);
      // self.$alert("日志" + raw_name);
      this.logData = [],
      this.logname = raw_name
    },
    doLog: function () {
        if (this.load_more)
        {
            this.load_more = false
            this.$refs.btn1.$el.innerText = "keep load"
        }
        else
        {
            this.load_more = true
            this.$refs.btn1.$el.innerText = "stop load"
        }
        },
    handleAddItem() {
        // 向数组中添加一条数据
        this.form.items.push({itemName: ''});
        //滚动到最后一行
        this.$nextTick(function(){ //此处必须使用nextTick函数,使页面渲染完后再执行
        this.$refs.table.bodyWrapper.scrollTop =this.$refs.table.bodyWrapper.scrollHeight;
        });
    }
  },
  mounted() {
    this.initData(); 
    this.timer = setInterval(() => {
    setTimeout(this.initData, 0)
    }, 1000*60)
    setInterval(() => {
        if (this.load_more)
        {
            this.count = this.count + 1;
            let eData = new Array(20).fill({
            date: this.count,
            name: 'DEBUG',
            address: this.logname
            });
            this.logData = this.logData.concat(eData);
            const table = this.$refs.table2;
            // 拿到表格中承载数据的div元素
            const divData = table.bodyWrapper;
            this.$message.success("test"+divData.scrollHeight);
            this.$nextTick(function(){ //此处必须使用nextTick函数,使页面渲染完后再执行
                divData.scrollTop =divData.scrollHeight;
            });
        }
        }, 3000);
  }
}
</script>