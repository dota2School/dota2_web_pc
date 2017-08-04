<template>
  <div class="rightPanel">
    <div class="searchDiv">
      <label class="searchLabel">更新时间
        <Datepicker v-on:on-change="dateChange"
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange" placeholder="选择日期和时间" style="width: 300px"></Datepicker>
      </label>
      <label class="searchLabel">打卡人微信昵称<Input type="text"  placeholder="请输入微信昵称" v-model="wxnc" ></Input></label>
      <label class="searchLabel">打卡人注册昵称<Input type="text" placeholder="请输入注册昵称" v-model="zcnc"></Input></label>
      <label class="searchLabel">
        班级
        <Select v-model="selected2">
          <Option v-for="item in selected1Data2" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
      <label class="searchLabel">
        <Button type="primary" shape="circle" icon="ios-search" @click="search()">搜索</Button>
      </label>
      <label class="searchLabel">
        共<a class="blue">{{total}}</a>名用户
      </label>
    </div>
    <table class="td-no-ellipsis">
      <thead>
      <tr>
        <th>打卡人微信昵称</th>
        <th>打卡人昵称</th>
        <th @click="thClick('signTimes')">打卡次数<img src="/static/icon-sort.png"/></th>
        <th @click="thClick('ackTimes')">被确认次数<img src="/static/icon-sort.png"/></th>
        <th>打卡时长</th>
        <th>头像</th>
        <th>确认最多学生微信昵称</th>
        <th>确认最多学生昵称</th>
        <th>确认次数</th>
        <th>打卡时长</th>
        <th>学生头像</th>
        <th width="60">操作</th>
      </tr>
      </thead>
      <tbody v-for="(row,i) in rows">
      <tr class="open-panel">
        <td>{{row.tNickName}}</td>
        <td>{{row.tNickNameP}}</td>
        <td>{{row.signTimes}}</td>
        <td>{{row.ackTimes}}</td>
        <td>{{row.signLong}}</td>
        <td class="avatar"><img style="max-width: 80px;" :src = row.tAvatarUrl /></td>
        <td>{{row.ackNickName}}</td>
        <td>{{row.ackNickNameP}}</td>
        <td>{{row.stuAckTimes}}</td>
        <td>{{row.ackTeachTimeInt}}</td>
        <td class="avatar"><img style="max-width: 80px;" :src = row.sAvatarUrl /></td>
        <td class="spread blue" @click="spread(i)">展开</td>
      </tr>
      <tr class="o-panel" v-show="i == index && isShow">
        <td class="bg-gray" colspan="12">
          <table class="childTable">
            <tr v-for="sign in row.signData">
              <td>{{sign.signId}}</td>
              <td>{{sign.tOpenId}}</td>
              <td>{{sign.tNickName}}</td>
              <td>{{sign.tNickName}}</td>
              <td>{{sign.tTeachTimeInt}}</td>
              <td>{{sign.tTeachDate}}</td>
              <td>{{sign.tClassType}}</td>
              <td>{{sign.sOpenId}}</td>
              <td>{{sign.sNickName}}</td>
              <td>{{sign.sNickNameP}}</td>
              <td>{{sign.sStatus}}</td>
              <td class="alertContent"><p @click="showContent($event)">{{sign.sEvaluate}}</p></td>
            </tr>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="page-bar">
      <Page :total='total' :page-size="25" @on-change="btnClick" :current ="cur"></Page>
    </div>
  </div>
</template>

<script>
  import VueResource from 'vue-resource'
  import Vue from 'vue'
  import Datepicker from 'iview/src/components/date-picker'
  import 'iview/dist/styles/iview.css';
  import {Select, Option} from 'iview/src/components/select';
  import Input from 'iview/src/components/input';
  import Page from 'iview/src/components/page';
  import Button from 'iview/src/components/button';


  Vue.use(VueResource)
  export default {
    name: 'Test',
    components: {Datepicker,Select, Option,Input,Page,Button},
    data(){
      return {
        rows:{},
        total:0,      //总注册人数
        pageNum:0,  //总页数
        success:0,
        list:null,
        cur:1,      //当前页码
        toPageNum:1,  //绑定跳转页面
        openId: '',    //open_Id
        wxnc: '',      //微信昵称
        zcnc: '',      //注册昵称
        selected1: '',     //身份类型  1为学生   2为老师   默认为空
        selected2: '',     //班级类型
        dataRange:['', ''],
        order:'',
        orderType:'',
        index: 0,
        isShow: false,
        selected1Data2:[
          {
            value: '',
            label: '全部'
          },
          {
            value: '初级班',
            label: '初级班'
          },
          {
            value: '中级班',
            label: '中级班'
          },
          {
            value: '高级班',
            label: '高级班'
          }
        ]
      }
    },
    created(){
      this.$http.get("/web/teacher/count").then(response=>{
        this.rows = response.data.rows;
        this.total = response.data.total;
        var num = parseInt(this.$data.total / 25);
        if(this.total%25!==0) num +=1;
        this.pageNum = num;
        this.success = response.data.success;
        this.sort()
      },response=>{
        console.log("error request!")
      });
    },
    computed:{
    },
    methods:{
      sort(){
        this.rows.forEach(function (row) {
          var group = {};
          row.signData.forEach(function (sign) {
            console.log(sign.sOpenId);
            if(group[sign.sOpenId] === undefined){
              group[sign.sOpenId] = [sign]
            }else{
              group[sign.sOpenId].push(sign)
            }
          })
          row.group = group;
          var maxTimes;
          var maxOpenId;
          var long = 0;
          for(var openId in  group){
            if(maxTimes === undefined || maxTimes< group[openId].length){
              maxTimes = group[openId].length
              maxOpenId = openId;
            }
          }
          if(maxTimes !== undefined && maxTimes !==0){
            var l = 0;
            group[maxOpenId].forEach(function(iteam){
              l+=iteam.tTeachTimeInt;
            });
            row.ackNickName = group[maxOpenId][0].sNickName;
            row.ackNickNameP = group[maxOpenId][0].sNickNameP;
            row.stuAckTimes = maxTimes;
            row.sAvatarUrl = group[maxOpenId][0].sAvatarUrl;
            row.ackTeachTimeInt = l;
          }
        })
      },
      thClick(thName) {
        this.order = thName;
        if(this.orderType === 'asc'|| this.orderType === ''){
          this.orderType = 'desc'
        }else{
          this.orderType = 'asc';
        }
        this.search();
      },
      dateChange(date){
        date = date.split(' - ')
        this.dataRange[0] = date[0].trim();
        this.dataRange[1]= date[1].trim();
        console.log("date change "+this.dataRange[0]+"   "+this.dataRange[1])
      },
      calculateUrl(item) {
        return "/api/web/teacher/count?start_time="+this.dataRange[0]
          +"&end_time="+this.dataRange[1]
          +"&nick_name_p="+this.wxnc
          +"&nick_name="+this.zcnc
          +"&class_type="+this.selected1
          + "&page_num=" + (item-1)
          +"&order="+this.order
          +"&orderType="+this.orderType;
      },
      btnClick(item) {
        if(item !== this.$data.cur){
          this.cur = item;
          this.$http.get(this.calculateUrl(item)).then(function (response) {
            this.rows = response.data.rows;
            this.total = response.data.total;
            var num = parseInt(this.total / 25);
            if(this.total%25!==0) num +=1;
            this.pageNum = num;
            this.success = response.data.success;
            this.sort()
          },function (response) {
            console.log("error request!")
          });
        }
      },
      search() {
        this.$http.get(this.calculateUrl(1)).then(function (response) {
          this.rows = response.data.rows;
          this.total = response.data.total;
          this.cur = 1;
          var num = parseInt(this.total / 25);
          if(this.total%25!==0) num +=1;
          this.pageNum = num;
          this.success = response.data.success;
          this.sort();
        },function (response) {
          console.log("error request!")
        });
      },
    }
  }
</script>
<style>
  .searchLabel {
    display: inline-block;
    padding: 10px;
    vertical-align: middle;
    white-space: normal;
  }
</style>
