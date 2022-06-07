<template>
  <div class="home">
    <div class="fileBox">
      <el-button class="dialog" @click="importFileNew()">上传</el-button>
      <fileTree @func="getPresentData" :lineIdSon="lineId" :treeData="treeData"/>
      <el-button class="dialog" @click="saveFileTree()">保存</el-button>
      <el-button class="nodialog" @click="checkAlert=false">取消</el-button>
    </div>
    <div>
      <codemirror class="code" v-model="code" :options="cmOptions"></codemirror>
    </div>
  </div>

</template>

<script>
import fileTree from "@/components/system/tree/fileTree";

import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime' //sublime编辑器效果
import "codemirror/theme/dracula.css"// 配置里面也需要theme设置为monokai
import "codemirror/mode/vue/vue.js" // 配置里面也需要mode设置为vue
import 'codemirror/addon/selection/active-line' //光标行背景高亮，配置里面也需要styleActiveLine设置为true

export default {
  name: 'StrategyManager',
  data(){
    return {
      //文件树格式
      treeData:[
        {level: 1, id: 2, name: '文件夹01', child: [
            {level: 2, id: 101, name:"图片1.jpeg" , address:"https://uploader.shimo.im/f/R6dlsxchtpdU0tT7.png!thumbnail" },
            {level: 2, id: 102, name:"garden.png" , address:"https://oscimg.oschina.net/oscnet/up-f005a3a24024d675d766559fd13620e93ab.png" },
          ]},
        {level: 1, id: 3, name: '文件夹02', child: [
            {level: 2, id: 103, name:"图片3.jpeg" , address:"https://oscimg.oschina.net/oscnet/up-2bebbc3a274a46e2031cf8619f349bdf786.JPEG" },
            {level: 2, id: 104, name:"图片14.png" , address:"https://oscimg.oschina.net/oscnet/up-2bebbc3a274a46e2031cf8619f349bdf786.JPEG" },
            {level: 2, id: 105, name:"图片15.jpeg" , address:"https://oscimg.oschina.net/oscnet/up-2bebbc3a274a46e2031cf8619f349bdf786.JPEG" },
            {level: 2, id: 106, name:"图片104.png" , address:"https://oscimg.oschina.net/oscnet/up-2bebbc3a274a46e2031cf8619f349bdf786.JPEG" },
          ]},
      ],
      lineId: "", //树形结构管线ID
      // 代码
      code: "codes",
      cmOptions: {
          tabSize: 4,// tab的空格个数
          theme: 'dracula',//主题样式
          lineNumbers: true,//是否显示行数
          lineWrapping: true, //是否自动换行
          styleActiveLine: true,//line选择是是否加亮
          matchBrackets: true,//括号匹配
          mode: "python", //实现python代码高亮
          readOnly: false//只读
      }
    }
  },
  components: {
    fileTree,
    codemirror
  },
  methods: {
    //导入文件
    importFileNew(){
    },
    // 获取修改后的文件树
    getPresentData: function (e) {
      this.presentDataList = e;
    },
    // 保存文件树结构
    saveFileTree: function () {

    },
  }

}
</script>

<style lang="scss" scoped>
.home{
  .fileBox{
    width: 330px;
    display: block;
    margin: 10px auto;
    border-radius: 4px;
    position: absolute;
    left: 220px;
    top: 70px;
    // display: flex;
    .importBtn{
      display: flex;
      position: absolute;
    }
  }
}
</style>


<style lang="stylus">
.CodeMirror {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
}
</style>