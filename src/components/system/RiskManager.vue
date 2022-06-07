<template>

  <el-form ref="form" :rules="formRules" :inline="true" :model="form" label-width="80px">
    <!-- <div>
    <el-button type="primary" ref='btn1' @click="doLogin()" plain>设置</el-button>
    <el-form-item
      label="姓名"
      :prop="'loginid'"
      :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
      <el-input v-model="loginid"></el-input>
    </el-form-item>
    </div> -->
    <div v-for="(item, index) in form.riskItem" :key="index">
      <el-form-item
        label="风控标志"
        :prop="'riskItem.' + index + '.name'"
        :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="撤单设置">
        <el-form-item
          label="最大撤单数量"
          :prop="'riskItem.' + index + '.CancelNumber.MaxCancelNumber'"
          :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
          <el-input v-model="item.CancelNumber.MaxCancelNumber"></el-input>
        </el-form-item>
        <el-form-item
          label="最大撤单比例"
          :prop="'riskItem.' + index + '.CancelNumber.MaxCancelPercentage'"
          :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
          <el-input v-model="item.CancelNumber.MaxCancelPercentage"></el-input>
        </el-form-item>
        <el-form-item
          label="最大报单数量"
          style="width:500px"
          :prop="'riskItem.' + index + '.CancelNumber.MaxOrderNumber'"
          :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
          <el-input v-model="item.CancelNumber.MaxOrderNumber"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item
        label="资金占用"
        :prop="'riskItem.' + index + '.RiskDegree'"
        :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
        <el-input v-model="item.RiskDegree"></el-input>
        <el-input title="查询条件" style="width:230px" v-model="item.RiskDegree" placeholder="请输入资金占用比例" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center;" label="资金占用1">
        <el-form-item style="text-align: center;" label="资金占用2">
        <el-input style="width:230px" v-model="item.RiskDegree" placeholder="请输入学校" autocomplete="off"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button v-if="index+1 == form.riskItem.length" @click="addRiskItem" type="primary">增加</el-button>
        <el-button v-if="index !== 0" @click="deleteRiskItem(item, index)" type="danger">删除</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'RiskManager',
  data() {
    return {
      loginid: "",
      form: {
        dynamicItem: [
          {
            name: "",
            phone: ""
          }
        ],
        riskItem:[
          {
            name: "standard",
            CancelNumber:
            {
              MaxCancelNumber:-1,
              MaxCancelPercentage:-1,
              MaxOrderNumber:-1
            },
            RiskDegree: -1,
            VolumeControl:[
              {
                Net:-1,
                Short:-1,
                Long:-1
              }
            ],
            AmountControl:[
              {
                Percentage:-1,
                Abs:-1
              }
            ]
          }
        ]
      },
    }
  },
  methods: {
  addItem() {
    this.form.dynamicItem.push({
      name: "",
      phone: ""
    });
  },
  addRiskItem() {
    this.form.riskItem.push(
      {
        name: "",
        CancelNumber:
        {
          MaxCancelNumber:-1,
          MaxCancelPercentage:-1,
          MaxOrderNumber:-1
        },
        RiskDegree: -1,
        VolumeControl:[
          {
            Net:-1,
            Short:-1,
            Long:-1
          }
        ],
        AmountControl:[
          {
            Percentage:-1,
            Abs:-1
          }
        ]
      }
    );
  },
  sure(form) {
    console.log(this.form.dynamicItem.length, "length");
    this.$refs[form].validate(valid => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  },
  deleteRiskItem(item, index) {
    this.form.riskItem.splice(index, 1);
    console.log(this.form.riskItem, "删除");
  },
  deleteItem(item, index) {
    this.form.dynamicItem.splice(index, 1);
    console.log(this.form.dynamicItem, "删除");
  },

  }
}
</script>
