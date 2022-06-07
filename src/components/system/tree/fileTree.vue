<template>
  <div>
    <el-dialog
        title="确认要删除此项吗？"
        :visible.sync="delDialogVisible"
        width="30%"
        :append-to-body="true"
    >
      <span slot="footer">
        <el-button size="small" @click="delDialogVisible = false"
        >取 消</el-button
        >
        <el-button size="small" type="primary" @click="delSelect"
        >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-card>
      <div class="ly-tree-container">
        <el-input
            class="searchFile"
            placeholder="输入关键字进行搜索"
            v-model="filterText"
        ></el-input>
        <el-tree
            class="filter-tree"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            node-key="id"
            ref="tree"
            :expand-on-click-node="false"
            :render-content="renderContent"
        ></el-tree>
      </div>
    </el-card>

    <!-- 弹框***请选择文件 -->
    <el-dialog
        title="请选择文件"
        :visible.sync="uploadAlertS"
        :append-to-body="true"
        width="40%"
        top="14vh"
    >
      <el-upload
          drag
          class="upload-demo uploadAlertS"
          ref="upload"
          :action="'piperack/line/uploadDocument'"
          :data="uploadDocumentData"
          :headers="uploadHeader"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="importFormSubmitSuccess"
          :on-change="handleChange"
          :auto-upload="false"
          :before-upload="beforeAvatarUpload"
          :multiple="true"
          :limit="3"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip colorRed">
          文件格式不限制，最多同时上传3个文件，文件大小不超过100MB
        </div>
      </el-upload>

      <div class="importBtnBox">
        <el-button type="primary" @click="importFormSubmit()"
        >立即导入</el-button
        >
        <el-button @click="uploadAlertS = false">取消</el-button>
      </div>
      <div></div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getServiceTree,
  delItem,
  addItem,
  updateItem,
  // data
} from "@/components/system/tree/tree.api.js";
import { getEditContent, getDefaultContent } from "@/components/system/tree/tree.utils.js";
import "@/components/system/tree/tree.scss";
export default {
  name: "fileTree",
  data() {
    return {
      uploadAlertS: false, //是否显示上传文件窗口
      uploadHeader:{
        Authorization: 'admin'
      },
      uploadDocumentData: {
        lineId: '', //管线ID
        fileName: "" //文件名称
      },
      updateSuccessUrl: [], //上传成功后后台返回文件地址
      presentID: "", //当前操作文件ID
      // 文件列表
      fileList: [],
      isEdit: false,
      edit_name: "",
      is_superuser: "False",
      defaultProps: {
        children: "child",
        label: "name",
        address: "address"
      },
      select_id: null,
      select_level: null,
      select_node: null,
      delDialogVisible: false,
      // 树形结构搜索初始值
      filterText: "",
      newArray: []
    };
  },
  props: {
    lineIdSon: String,
    treeData: Array
  },
  created() {},
  watch: {
    // 文件树搜索
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    // 获取文件树列表

    // 查看文件列表
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //新建文件夹
    append(node, data, e) {
      //data未及时更新
      e = event || window.event;
      e.stopPropagation();
      if (!this.isEdit) {
        this.select_id = data.id;
        this.edit_name = "";

        const newChild = {
          name: "",
          level: data.level + 1,
          isEdit: true
        };

        this.isEdit = true;
        if (!data.child) {
          this.$set(data, "child", []);
        }
        //console.log("新增前文件结构",data);
        data.child.push(newChild);
        this.presentData = data;
        this.$emit("func", this.presentData);
      } else {
        this.$notify({
          type: "error",
          title: "操作提示",
          message: "有正在编辑或添加的选项未完成！",
          duration: 2000
        });
      }
    },

    remove(node, data, e) {
      e = event || window.event;
      e.stopPropagation();
      if (this.isEdit) {
        this.$notify({
          type: "error",
          title: "操作提示",
          message: "有正在编辑或添加的选项未完成！",
          duration: 2000
        });
        return;
      }
      this.select_node = node;
      this.delDialogVisible = true;
    },
    //限制文件大小
    beforeAvatarUpload: function(file) {
      const isLt100M = file.size / 1024 / 1024 < 100;
      if (!isLt100M) {
        this.$message.error("文件大小不能超过 100MB!");
      }
      return isLt100M;
    },
    // 上传文件
    importFormSubmit: function() {
      if (this.fileList.length) {
        this.$refs.upload.submit();
      } else {
        this.$message.error("请先选择文件！");
      }
    },
    // 上传按钮
    upDataFile(node, data, e) {
      this.uploadAlertS = true;
      this.presentData = data;
      this.presentID = data.id;
    },
    // 上传文件成功回调
    importFormSubmitSuccess: function(res, file, fileList) {
      // 上传成功后后台返回文件地址
      this.updateSuccessUrl = [];
      for (let i = 0; i < this.fileList.length; i++) {
        this.updateSuccessUrl.push({
          name: fileList[i].name,
          address: fileList[i].response.data.address
        });
      }
      for (let i = 0; i < this.updateSuccessUrl.length; i++) {
        const newChild = {
          id: new Date().getTime() + i,
          name: this.updateSuccessUrl[i].name,
          child: [],
          address: this.updateSuccessUrl[i].address
        };
        //console.log(newChild)
        this.presentData.child.push(newChild);
      }
      //console.log(this.updateSuccessUrl)
      // if (!this.presentData.child) {
      //   this.$set(this.presentData, "child", []);
      // }
      // const newChild = {
      //   id: new Date().getTime(),
      //   name: this.uploadDocumentData.fileName,
      //   child: [],
      //   address: this.updateSuccessUrl
      // };

      // if (!this.presentData.child) {
      //   this.$set(this.presentData, "child", []);
      // }
      // this.presentData.child.push(newChild);
      //console.log("更新后的文件树：",this.presentData);
      //console.log(res)
      this.$emit("func", this.presentData);
      if (res.status.code === 200) {
        this.$message({
          message: res.status.message,
          type: "success"
        });
        this.$refs.upload.clearFiles();
        setTimeout(() => {
          this.uploadAlertS = false;
        }, 1000);
      } else {
        this.$message({
          message: res.status.message,
          type: "warning"
        });
        this.$refs.upload.clearFiles();
      }
    },
    // 清空文件
    clearFiles(file, fileList) {},
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    // 选择文件后
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    delSelect() {
      delItem(this.treeData, { id: this.select_node.data.id });
      this.delDialogVisible = false;
      // this.$notify({
      //   type: "success",
      //   title: "操作提示",
      //   message: "删除成功!",
      //   duration: 2000
      // });
      // postRequest("piperack/line/deleteDocument",{id:this.select_node.data.id}).then(res=>{
      //   if (res.status.code === 200) {
      //     this.$message({
      //       message: res.status.message,
      //       type: "success"
      //     });
      //
      //   } else {
      //     this.$message({
      //       message: res.status.message,
      //       type: "warning"
      //     });
      //   }
      // })
    },

    update(node, data, e) {
      e = event || window.event;
      e.stopPropagation();
      if (this.isEdit) {
        this.$notify({
          type: "error",
          title: "操作提示",
          message: "有正在编辑或添加的选项未完成！",
          duration: 2000
        });
        return;
      }
      this.select_id = data.id;
      this.select_level = data.level;
      this.edit_name = data.name;
      this.isEdit = true;
    },

    editMsg(data, node, e) {
      e = event || window.event;
      e.stopPropagation();
      if (this.edit_name.replace(/^\s+|\s+$/g, "")) {
        if (!data.id) {
          let virtualNode = node.parent;
          // let params = {
          //   name: this.edit_name,
          //   id: virtualNode.data.id
          // };
          // let addChild = addItem(this.treeData, params);
          // 如果是用的真api,需要在添加的接口返回添加的节点
          // 添加成功后，将返回的节点加入数据中，然后删除掉没有id的假节点
          virtualNode.data.child.forEach((item, i) => {
            if (!item.id) {
              virtualNode.data.child.splice(i, 1);
            }
          });
          this.isEdit = false;
          this.select_id = null;
          this.select_level = null;
          this.$notify({
            type: "success",
            title: "操作提示",
            message: "添加成功！",
            duration: 2000
          });
          return;
        }

        let params = {
          name: this.edit_name,
          id: data.id
        };
        updateItem(this.treeData, params);
        this.isEdit = false;
        this.select_id = null;
        this.select_level = null;
        // this.$notify({
        //   type: "success",
        //   title: "操作提示",
        //   message: "编辑成功！",
        //   duration: 2000
        // });
        // postRequest("piperack/line/renameDocument",{id:params.id,fileName:params.name}).then(res=>{
        //   if (res.status.code === 200) {
        //     this.$message({
        //       message: res.status.message,
        //       type: "success"
        //     });
        //
        //   } else {
        //     this.$message({
        //       message: res.status.message,
        //       type: "warning"
        //     });
        //   }
        // })
      }
    },

    close(data, node, e) {
      e = event || window.event;
      e.stopPropagation();
      if (!data.id) {
        node.parent.data.child.forEach((item, i) => {
          if (!item.id) {
            node.parent.data.child.splice(i, 1);
          }
        });
      }
      this.select_id = null;
      this.select_level = null;
      this.edit_name = data.name;
      this.isEdit = false;
    },

    nameChange(e) {
      e = event || window.event;
      e.stopPropagation();
      this.edit_name = e.target.value;
    },

    isSelect(data) {
      return data.id === this.select_id && data.level === this.select_level;
    },

    renderContent(h, { node, data }) {
      // console.log("data",data)
      return (
          <span class="ly-tree-node">
      {(this.isEdit === true && this.isSelect(data)) || data.isEdit ? (
          <input
          placeholder="名称不能为空"
      class="ly-edit__text"
      on-keyup={() => this.nameChange()}
      value={this.edit_name}
      />
    ) : (
      <a href={data.address} target="_blanck">
          <span>{data.name}</span>
          </a>
    )}
      {(this.isEdit === true && this.isSelect(data)) || data.isEdit
          ? getEditContent.call(this, h, data, node)
          : getDefaultContent.call(this, h, data, node)}
    </span>
    );
    }
  }
};
</script>

<style lang="scss" scoped>
.colorRed {
  color: red;
}
.importBtnBox {
  margin-top: 8%;
}
.uploadAlertS,
.importBtnBox {
  text-align: center;
}
.searchFile {
  input {
    height: 48px !important;
    width: 600px !important;
  }
}
</style>
