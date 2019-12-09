<template>
  <el-calendar v-model="value" id="calendar">
    <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
    <template slot="dateCell" slot-scope="{date, data}">
      <!--自定义内容-->
      <div  >
        <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
        <div v-for="(item,index) in calendarData" :key="index " @mouseover="hover(index)" @mouseout="showUpdate = -1">
           
        
          <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
            <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
              <el-tooltip class="item" effect="dark" :content="item.things" placement="right">
                <div class="is-selected">{{item.things}}</div>
         
              </el-tooltip>
            </div>
            <div v-else></div>
          </div>
          <div v-else></div>
        </div>

      </div>
    </template>
     
  </el-calendar>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
        showUpdate: -1,
      calendarData: [
       
        { months: ["01"], days: ["02"], things: "去公园野炊" },
        { months: ["11"], days: ["02"], things: "看星星" },
        { months: ["11"], days: ["02"], things: "看月亮" }
      ],
      value: new Date()
    };
  },
  methods:{
      hover(index){
          console.log(index)
         this.showUpdate = index
      }
  }
};
</script>
<style lang="less" scoped>
.calendar-day {
  text-align: center;
  height: 100px;
  color: #202535;
  line-height: 70px;
  font-size: 12px;
}
.is-selected {
  color: #f8a535;
  font-size: 10px;
  margin-top: 5px;
}
#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: "当月";
}
</style>