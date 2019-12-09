<template>
  <div class="HomeStyle">
    <!-- <calendar></calendar> -->
    <div class="InputDiv">
      <!-- 下拉，搜索，日期模块 -->
      <div style="padding-top:25px;">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="公司名称：" prop="region">
                <el-select
                  v-model="companyId"
                  placeholder="请选择公司"
                  style="width:80%"
                  @change="selectGoodsByGroupId"
                >
                  <el-option
                    :label="item.companyName"
                    v-for="item in largeIdList"
                    :key="item.companyId"
                    :value="item.companyId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门：">
                <el-select v-model="departmentId" placeholder="请选择部门" style="width:80%">
                  <el-option
                    :label="item.departmentName"
                    :value="item.departmentId"
                    v-for="item in departmentList"
                    :key="item.departmentId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-bottom:5px">
              <el-form-item label="选择日期：" prop="querydate">
                <el-date-picker
                  v-model="queryTime"
                  type="month"
                  placeholder="选择日期"
                  style="width:80%; margin-right:40px;"
                  format="yyyy-MM"
                  value-format="yyyy-MM"
                  clear-icon="false"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工姓名：">
                <el-input placeholder="请输入员工姓名" style="width:80%" v-model="userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="员工工号：">
                <el-input placeholder="请输入员工工号" style="width:80%" v-model="userCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="oo">
                  <el-button
                    type="primary"
                    @click="submitForm()"
                    icon="el-icon-search"
                    :disabled="disabledShow"
                  >查询</el-button>

                  <el-button
                    @click="clearClick()"
                    icon="el-icon-circle-close"
                    style="margin-right:20%"
                  >清空</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 装机情况模块 -->
    <div class="tabBox" v-show="issShowStyle">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="装机情况" name="first">
          <!-- <div class="exportDiv">
            <el-button type="primary" icon="el-icon-download">导出</el-button>
          </div>-->
          <div class="Statistics">
            <ul>
              <li>
                <i class="el-icon-info iconStyle">
                  <span>{{this.companyName}}</span>
                  <span style="color:#666666; ">业绩</span>
                </i>
              </li>
              <li>
                年度净装机任务：
                <span style="font-size:16px;">{{this.yearNum }}</span> 台
              </li>
              <li>
                未完成数量：
                <span
                  style="color:#f07575;font-size:16px;"
                >{{this.notFinishedNum>'0'?this.notFinishedNum:'0'}}</span> 台
                <!-- <span style="color:#000;font-size:16px;">{{this.notFinishedNum}}</span> 台 -->
              </li>
              <li>
                {{this.queryTime.split('').slice(5).join('')}}月装机总量：
                <span
                  style="color:#8bd1bb;font-size:16px;"
                >{{this.installNum}}</span> 台
              </li>
              <li>
                {{this.queryTime.split('').slice(5).join('')}}月拆机总量：
                <span
                  style="color:#f07575;font-size:16px;"
                >{{this.dismantleNum}}</span> 台
              </li>
              <li>
                {{this.queryTime.split('').slice(5).join('')}}月净装机总量：
                <span
                  v-if="this.netInstalledNum<0"
                  style="color:#f07575;font-size:16px;"
                >
                  {{this.netInstalledNum>'0'?this.netInstalledNum:'0'}}
                  <span
                    style="font-size:0.24rem; color:#000;"
                  >台</span>
                </span>
                <span v-else-if="this.netInstalledNum==0" style="color:#000;font-size:16px;">
                  {{this.netInstalledNum>'0'?this.netInstalledNum:'0'}}
                  <span
                    style="font-size:0.24rem; color:#000;"
                  >台</span>
                </span>
                <span v-else style="color:#8bce73;font-size:16px;">
                  {{this.netInstalledNum>'0'?this.netInstalledNum:'0'}}
                  <span
                    style="font-size:0.24rem; color:#000;"
                  >台</span>
                </span>
              </li>
            </ul>
          </div>
          <!-- :style="'color:'+(this.netInstalledNum<0?'#f07575':'#8bce73')+';'" -->
          <div class="tableDivv">
            <el-table
              :data="tableData"
              style="width: 100%;font-size:14px;"
              :header-cell-style="{background:'#fafafa',color:'#000;',height:'50px;'}"
              v-loading="loading"
              :cell-style="cellStyle"
              :row-style="{height:'50px'}"
              row-key="name"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
              <el-table-column
                prop="name"
                label="部门名称"
                width="180"
                style="border:none;"
                align="center"
              ></el-table-column>
              <el-table-column prop="installNum" label="当月装机量" align="center"></el-table-column>
              <el-table-column prop="dismantleNum" label="当月拆机量" align="center"></el-table-column>
              <el-table-column prop="netInstalledNum" label="当月净装机量" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.netInstalledNum<0"
                    style="color:#f07575"
                  >{{ scope.row.netInstalledNum }}</span>
                  <span
                    v-else-if="scope.row.netInstalledNum==0"
                    style="color: #000"
                  >{{ scope.row.netInstalledNum }}</span>
                  <span v-else style="color: #8bce73">{{ scope.row.netInstalledNum }}</span>
                </template>
              </el-table-column>;
              <el-table-column prop="companyName" label="所在分支" align="center">
                <template>
                  <p>{{this.companyName}}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <p class="deliaStyle" @click="dialogVisiblee(scope.row)">当月详情</p>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- <div style="float:right;margin-top:20px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="1000"
              background
            ></el-pagination>
     
          </div>-->
        </el-tab-pane>
        <!-- 实收款情况模块 -->
        <el-tab-pane label="实收款情况" name="second">
          <div class="Statistics">
            <ul>
              <li>
                <i class="el-icon-info iconStyle">
                  <span>{{this.companyName}}</span>
                  <span style="color:#666666; ">业绩</span>
                </i>
              </li>
              <li>
                年度收款任务：
                <span style="font-size:16px;">{{this.yearNum|currency}}</span> 元
              </li>
              <li>
                年度未完成实收款：
                <span
                  style="color:#f07575;font-size:16px;"
                >{{this.uncompleteNum>'0'?this.uncompleteNum:'0'|currency}}</span> 元
                <!-- <span style="color:#f07575;font-size:16px;">{{this.uncompleteNum|currency}}</span> 元 -->
              </li>
              <li>
                {{this.queryTime.split('').slice(5).join('')}} 月收款累计：
                <span
                  style="color:#8bd1bb;font-size:16px;"
                >{{this.motuchNum|currency}}</span> 元
              </li>
              <li>
                年度收款累计：
                <span style="color:#8bd1bb;font-size:16px;">{{this.completeNum|currency}}</span> 元
              </li>
            </ul>
          </div>
          <div class="tableDiv">
            <el-table
              :data="tablePrice"
              style="width: 100%;font-size:14px;"
              :header-cell-style="{background:'#fafafa',color:'#000;',height:'50px;'}"
              v-loading="loading"
              :cell-style="cellStylee"
              :row-style="{height:'50px'}"
              row-key="name"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
              <el-table-column prop="name" label="部门名称" width="210" style="border:none;"></el-table-column>
              <el-table-column prop="receivable" label="当月收款任务" width="280" align="right">
                <template slot-scope="scope">
                  <span>{{scope.row.receivable|currency}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="netReceipts" label="当月收款金额" width="280">
                <template slot-scope="scope">
                  <span style="padding-left:30px">{{scope.row.netReceipts|currency}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="differenceNum" label="当月未完成差额" width="280">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.differenceNum<0"
                    style="color:#f07575;padding-left:30px"
                  >{{ scope.row.differenceNum|currency }}</span>
                  <span
                    v-else-if="scope.row.differenceNum==0"
                    style="color: #000;padding-left:30px"
                  >{{ scope.row.differenceNum|currency }}</span>
                  <span
                    v-else
                    style="color: #8bce73;padding-left:30px"
                  >{{ scope.row.differenceNum|currency }}</span>
                </template>
              </el-table-column>;
              <el-table-column prop="companyName" label="所在分支" width="280">
                <template>
                  <p>{{this.companyName}}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                  <p class="deliaStyle" @click="priceClick(scope.row)">当月详情</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pagiationDiv">
        <!-- <div class="pagiationLeft">
          <span>共50条记录</span>
          <span>
            第
            <span>1</span>/
            <span>80</span>页
          </span>
        </div>-->
      </div>
      <!-- echars模态框 -->
      <!-- 当月拆装机详情模块 -->
      <div class="modelTable">
        <el-dialog title="拆装机详情 (没有日期的拆装机数据不展示)" :visible.sync="dialogVisible" width="45%">
          <el-table
            :data="tableDatalist"
            style="width: 100%; font-size:14px;"
            align="center"
            :default-sort="{prop: 'date', order: 'ascending'}"
          >
            <el-table-column label="日期" prop="startTime" align="center"></el-table-column>
            <el-table-column label="装机门店" align="center" prop="inList" width="230">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.inList" :key="index" style="border-bottom:1px solid #ddd;height:30px;line-height:30px;margin-bottom:20px">
                  {{item.companyName}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="当天装机量" prop="inList" align="center"  width="100">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.inList" :key="index" >{{item.installNum}}</div>
              </template>
            </el-table-column>
            <el-table-column label="拆机门店" align="center" prop="diList">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.diList" :key="index" style="border-bottom:1px solid #ddd;height:30px;line-height:30px; font-size:12px;margin-bottom:20px">{{item.companyName}}</div>
              </template>
            </el-table-column>

            <el-table-column label="当天拆机量" prop="diList" align="center" width="100">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.diList" :key="index">{{item.dismantleNum}}</div>
              </template>
            </el-table-column>
          </el-table>
          <!-- <calendar width="500px" height="400px" marginTop="30px"></calendar> -->
        </el-dialog>
      </div>
      <!-- 实收款详情模态框 -->
      <div class="modelTable">
        <el-dialog title="实收款详情 (没有日期的实收款数据不展示)" :visible.sync="dialogVisibles" width="38%">
          <el-table :data="tabledataPrice" style="width: 100%; font-size:14px;" align="center">
            <el-table-column label="日期" prop="startTime" align="center"></el-table-column>
            <el-table-column label="实收款" prop="netReceipts" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.netReceipts|currency}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <calendar width="500px" height="400px" marginTop="30px"></calendar> -->
        </el-dialog>
      </div>
    </div>
    <!-- 判断如果有数据显示数据，没数据显示图片 -->
    <div v-if="mmm" class="showStyle">
      <div class="imgBox">
        <img src="../assets/images/tupian.png" alt />
      </div>
      <div class="titleBox">
        <span class="spanTitle">请在『搜索』框中选择需要查看的分支</span>
      </div>
    </div>
  </div>
</template>

<script>
import calendar from "../components/calendar";

import {
  queryCompany,
  queryDepartment,
  getList,
  dealiList,
  priceList,
  priceDelai
} from "../api/api";
export default {
  data() {
    return {
      ruleForm: {
        region: "",
        querydate: ""
      },
      rules: {
        region: [{ required: true, message: "请选择公司", trigger: "blur" }],
        querydate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "'blur','change"
          }
        ]
      },
      activeName: "first", //tab当前展示的那个
      dialogVisible: false, //模态框变量控制是否显示,
      dialogVisibles: false, //实收款模态框参数
      isShow: false,
      issShowStyle: false,
      largeIdList: [], //公司集合的展示
      departmentList: [], //部门集合的展示
      companyId: "", //传递ID,
      departmentId: "", //部门ID
      queryTime: "", //日期
      name: "", //姓名
      userCode: "", //工号
      mmm: true,
      tableData: [], //表格渲染
      companyName: "", //公司名称
      loading: false, //列表加载的动画
      tableShow: false,
      tableDatalist: [], //详情列表
      disabledShow: true,
      dismantleNum: "", //拆机数量
      installNum: "", //装机数量
      netInstalledNum: "", //净装机量
      notFinishedNum: "", //未完成量
      yearNum: "", //年度净装机量
      // yearNumPrice:'',//年度任务参数
      motuchNum: "", //月度收费的参数
      completeNum: "", //年度完成的参数
      uncompleteNum: "", //年度未完成
      tablePrice: [], //实收款数组
      tabledataPrice: [], //实收款详情数据
      startTime: "",
      monthTime: "", //日期显示
      userName: "",
      disList: [],
      inList: [], //门店名称
      companyNameS: "",
      companyNameList: [],
      newarr: []
    };
  },

  mounted() {
    this.queryCompanyList();
    this.getCurrentMonthFirst();
    // this.priceFunction();
  },

  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    //实收款接口
    priceFunction() {
      priceList(
        this.companyId,
        this.departmentId,
        this.queryTime,
        this.name,
        this.userCode
      )
        .then(res => {
          // console.log(res);
          this.tablePrice = res.data[0].list;

          this.companyName = res.data[0].companyName;
          if (this.departmentId) {
            this.yearNum = res.data[0].list[0].yearNum;
            this.motuchNum = res.data[0].list[0].monthNum;
            this.completeNum = res.data[0].list[0].completeNum; //这块是展示部门的数量
            this.uncompleteNum = res.data[0].list[0].uncompleteNum;
            this.companyName = res.data[0].list[0].name;
          } else {
            this.companyName = res.data[0].companyName;
            this.yearNum = res.data[0].yearNum;
            this.motuchNum = res.data[0].monthNum;
            this.completeNum = res.data[0].completeNum; //这块是展示公司的数量
            this.uncompleteNum = res.data[0].uncompleteNum;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //拆装机接口
    getlistConent() {
      getList(
        this.companyId,
        this.departmentId,
        this.queryTime,
        this.userName,
        this.userCode
      )
        .then(res => {
          // console.log(res);
          this.loading = false;
          this.tableData = res.data[0].list;
          this.companyName = res.data[0].companyName;
          console.log(this.companyName);
          if (this.departmentId) {
            this.yearNum = res.data[0].list[0].yearNum;
            this.dismantleNum = res.data[0].list[0].dismantleNum;
            this.notFinishedNum = res.data[0].list[0].notFinishedNum; //这块是展示部门的数量
            this.installNum = res.data[0].list[0].installNum;
            this.netInstalledNum = res.data[0].list[0].netInstalledNum;
            this.companyName = res.data[0].list[0].name;
          } else {
            this.companyName = res.data[0].companyName;
            this.yearNum = res.data[0].yearNum;
            this.dismantleNum = res.data[0].dismantleNum;
            this.notFinishedNum = res.data[0].notFinishedNum; //这块是展示公司的数量
            this.installNum = res.data[0].installNum;
            this.netInstalledNum = res.data[0].netInstalledNum;
          }
          //  this.initArray(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //当前的月份。
    getCurrentMonthFirst() {
      var date = new Date();
      date.setDate(1);
      var month = parseInt(date.getMonth() + 1);
      var day = date.getDate();
      if (month < 10) month = "0" + month;
      this.queryTime = date.getFullYear() + "-" + month;
    },

    //查询公司的集合
    queryCompanyList() {
      queryCompany().then(res => {
        // console.log(res);
        // console.log(res.data);
        this.largeIdList = res.data;
      });
    },
    //查询部门的集合
    selectGoodsByGroupId(val) {
      // console.log(val);
      this.disabledShow = false;
      if (val != null && val != "" && val != undefined) {
        this.axios
          .get("/winchem/reportController/queryDepartment", {
            params: {
              parentId: val
            }
          })
          .then(res => {
            // console.log(res);
            this.departmentList = res.data;
            this.departmentId = res.data[0].departmentId;
            // console.log(this.departmentId);
            // this.departmentId="";
            this.val = "";
          });
      }
    },

    //清空按钮
    clearClick() {
      this.companyId = "";
      this.departmentId = "";
      this.userName = "";
      this.userCode = "";
      this.issShowStyle = false;
      this.mmm = true;
      this.disabledShow = true;
    },
    //列表展示页面

    submitForm() {
      this.issShowStyle = true;
      this.mmm = false;
      this.loading = true;
      this.getlistConent(
        this.companyId,
        this.departmentId,
        this.queryTime,
        this.userName,
        this.userCode
      );
      this.priceFunction();
    },

    // initArray(arr) {
    //   let newArr = [];
    //   //这是底部渲染公司的名称变化
    //   arr.data[0].list.forEach(ele => {
    //     if (this.departmentId) {
    //       this.yearNum = ele.yearNum;
    //       this.dismantleNum = ele.dismantleNum;
    //       this.notFinishedNum = ele.notFinishedNum; //这块是展示部门的数量
    //       this.installNum = ele.installNum;
    //       this.netInstalledNum = ele.netInstalledNum;
    //       this.companyName = ele.name;
    //     } else {
    //       this.companyName = arr.data[0].companyName;
    //       this.yearNum = arr.data[0].yearNum;
    //       this.dismantleNum = arr.data[0].dismantleNum;
    //       this.notFinishedNum = arr.data[0].notFinishedNum; //这块是展示公司的数量
    //       this.installNum = arr.data[0].installNum;
    //       this.netInstalledNum = arr.data[0].netInstalledNum;
    //     }

    //     ele.children.forEach(ret => {
    //       //  console.log(ret)
    //       ret.companyName = arr.data[0].companyName; //公司的名称
    //       ret.name = ele.name; //部门的名称
    //       console.log(ret.name);
    //     });

    //     newArr = newArr.concat(ele.children); //合并数组
    //   });
    //   return newArr; //把数组return出去
    // },
    // initArrayPrice(arrAy) {
    //   let newArrr = [];
    //   //这是底部渲染公司的名称变化
    //   arrAy.data[0].departmentList.forEach(elel => {
    //     if (this.departmentId) {
    //       this.yearNum = elel.yearNum;
    //       this.motuchNum = elel.monthNum;
    //       this.completeNum = elel.completeNum; //这块是展示部门的数量
    //       this.uncompleteNum = elel.uncompleteNum;
    //       this.companyName = elel.departmentName;
    //     } else {
    //       this.companyName = arrAy.data[0].companyName;
    //       this.yearNum = arrAy.data[0].yearNum;
    //       this.motuchNum = arrAy.data[0].monthNum;
    //       this.completeNum = arrAy.data[0].completeNum; //这块是展示公司的数量
    //       this.uncompleteNum = arrAy.data[0].uncompleteNum;
    //     }

    //     elel.userReceivablesList.forEach(rett => {
    //       rett.companyName = arrAy.data[0].companyName; //公司的名称
    //       rett.departmentName = elel.departmentName; //部门的名称
    //     });

    //     newArrr = newArrr.concat(elel.userReceivablesList); //合并数组
    //   });
    //   return newArrr; //把数组return出去
    // },
    //拆装机当月详情

    dialogVisiblee(val) {
      var that = this;
      that.name = val.name; //获取input  username姓名字段
      that.queryTime = that.queryTime; //获取input  queryTime日期字段
      that.dialogVisible = true;

      dealiList(that.name, that.queryTime).then(res => {
        console.log(res);
        that.name = "";
        that.tableDatalist = res.data;
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].inList.length; j++) {
            that.inList = res.data[i].inList;
          }
        }
      });
    },

    //实收款详情
    priceClick(val) {
      var that = this;
      that.name = val.name; //获取input  username姓名字段
      that.queryTime = this.queryTime; //获取input  queryTime日期字段
      console.log(that.queryTime);
      that.dialogVisibles = true;

      priceDelai(that.name, that.queryTime).then(res => {
        // console.log(res);
        this.name = "";
        this.tabledataPrice = res.data;
      });
    },
    handleClick(tab, event) {
      // this.priceFunction();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //修改table的样式
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #fafafa;border:1px solid #ddd; color:#000;";
      } else {
        return "";
      }
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      //根据label别显示颜色
      // console.log(row);
      // console.log(row.column);

      if (row.column.label === "当月装机量") {
        return "color:#8bceb2; ";
      } else if (row.column.label === "当月拆机量") {
        return "color:#f0759d;";
      } else if (row.column.label === "当月净装机量") {
        if (this.netInstalledNum < 0) {
          return "color:#f07575";
        } else if (this.netInstalledNum > 0) {
          return "color:#8bce73";
        }
      }
    },
    cellStylee(row, column, rowIndex, columnIndex) {
      //根据label别显示颜色
      // console.log(row);
      // console.log(row.column);

      if (row.column.label === "当月收款任务") {
        return "color:#000; ";
      } else if (row.column.label === "当月收款金额") {
        return "color:#8bceb2;";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.oo {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.showStyle {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .imgBox {
    width: 30%;

    margin-top: 180px;
    img {
      width: 100%;
    }
  }
  .titleBox {
    width: 30%;
    .spanTitle {
      font-size: 35px;
    }
  }
}
.modelTable /deep/ .el-dialog__headerbtn .el-dialog__close {
  font-size: 32px;
}
.HomeStyle /deep/ .el-dialog__body {
  height: 400px;
  overflow-y: auto;
}
.modelTable /deep/ .el-table--scrollable-x .el-table__body-wrapper {
  overflow: hidden;
}
.HomeStyle /deep/ .el-table thead {
  background: none;
}
.InputDiv /deep/ .el-form-item__label {
  font-size: 0.24rem;
  color: #272727;
}
.el-picker-panel {
  width: 3rem !important;
  background: red;
}

.HomeStyle
  /deep/.el-table--scrollable-x
  .el-table__body-wrapper::-webkit-scrollbar {
  width: 0px;
}
.tabBox /deep/.el-tabs__nav-wrap::after {
  background-color: #fff;
}
.tabBox /deep/.el-tabs__item {
  padding: 0px 38px;
}
.tabBox /deep/ .el-tabs__active-bar {
  top: 0;
  height: 6px;
}
.tabBox /deep/ .el-tabs__item {
  font-size: 18px;
  padding-top: 10px;
  margin-bottom: 10px;
}
.tableDiv /deep/ .el-table th {
  text-align: right !important;
  height: 50px;
}
.tableDiv /deep/ .el-table td {
  text-align: right !important;
}
.deliaStyle {
  color: #1890ff;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
}
.HomeStyle {
  .inputBox {
    height: 100%;
    width: 100%;
  }
  .InputDiv {
    width: 100%;
    height: 170px;
    background: white;
    .demo-ruleForm {
      display: flex;
      flex-wrap: wrap;
      height: 80px;
    }
    .box1Style {
      display: flex;
    }
    .box2Style {
      display: flex;
    }
  }
  .tabBox {
    padding-left: 20px;
    margin-top: 20px;
    height: 100%;
    background: white;
    margin-bottom: 10px;
    .exportDiv {
      height: 50px;
      padding-top: 5px;
    }
    .Statistics {
      width: 99%;
      height: 50px;
      background: #e6f7ff;
      line-height: 50px;
      font-size: 0.24rem;
      border: 1px solid #91d5ff;
      border-radius: 5px;
      ul li:last-child {
        border: none;
      }
      ul {
        display: flex;

        li {
          padding-left: 50px;

          font-weight: bold;
        }
      }
      .iconStyle {
        padding: 6px;
        color: #108ee9;
        span {
          font-size: 18px;
          padding-left: 5px;
        }
      }
    }
    .tableDiv {
      margin-top: 8px;
    }
    .tableDivv {
      margin-top: 8px;
    }
    .pagiationDiv {
      .pagiationLeft {
        font-size: 14px;
        color: #929292;
      }
    }
  }
}
</style>