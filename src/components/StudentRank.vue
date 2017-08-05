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
        <th>学生微信昵称</th>
        <th>学生昵称</th>
        <th>头像</th>
        <th @click="thClick('signTimes')">确认数<img src="/static/icon-sort.png"/></th>
        <th @click="thClick('sSignLong')">打卡时长<img src="/static/icon-sort.png"/></th>
        <th>合作最多的老师微信昵称</th>
        <th>合作最多的老师注册昵称</th>
        <th>头像</th>
        <th>合作次数</th>
        <th width="60">操作</th>
      </tr>
      </thead>
      <tbody v-for="(row,i) in rows">
      <tr class="open-panel">
        <td>{{row.sNickNameP}}</td>
        <td>{{row.sNickName}}</td>
        <td class="avatar"><img style="max-width: 80px;" :src = row.sAvatarUrl /></td>
        <td>{{row.signTimes}}</td>
        <td>{{row.ackTeachTimeInt}}</td>
        <td>{{row.maxtNickNameP}}</td>
        <td>{{row.maxtNickName}}</td>
        <td class="avatar"><img style="max-width: 80px;" :src = row.maxtAvatarUrl /></td>
        <td>{{row.maxtTimes}}</td>
        <td class="spread blue" @click="spread(i)">展开</td>
      </tr>
      <tr class="o-panel" v-show="i == index && isShow">
        <td class="bg-gray" colspan="10">
          <table class="childTable">
            <tr v-for="(sign,j) in row.signData">
              <td>{{sign.signId}}</td>
              <td>{{sign.tOpenId}}</td>
              <td>{{sign.tNickNameP}}</td>
              <td>{{sign.tNickName}}</td>
              <td>{{sign.tTeachTimeInt}}</td>
              <td>{{sign.tTeachDate}}</td>
              <td>{{sign.tClassType}}</td>
              <td>{{sign.sOpenId}}</td>
              <td>{{sign.sNickName}}</td>
              <td>{{sign.sNickNameP}}</td>
              <td>{{sign.sStatus}}</td>
              <td class="alertContent"><p @click="showContent(i,j)">{{sign.sEvaluate}}</p></td>
              <Modal
                v-model="showAlert"
                title="评价"
                v-show="i === showI && j===showJ"
                @on-ok="ok"
                @on-cancel="ok">
                <p>{{sign.sEvaluate}}</p>
              </Modal>
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
  import Modal from 'iview/src/components/modal'
  Vue.use(VueResource)
  export default {
    name: 'Test',
    components: {Datepicker,Select, Option,Input,Page,Button,Modal},
    data(){
      return {
        rows:{},
        total:0,      //总注册人数
        pageNum:0,  //总页数
        success:0,
        list:null,
        cur:1,      //当前页码
        toPageNum:1,  //绑定跳转页面
        wxnc: '',      //微信昵称
        zcnc: '',      //注册昵称
        selected2: '',     //身份类型  1为学生   2为老师   默认为空
        dataRange:['', ''],
        order:'',
        orderType:'',
        index: 0,
        isShow: false,
        showI:-1,
        showJ:-1,
        showAlert:false,
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
      this.$http.get("/web/student/count").then(response=>{
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
            console.log(sign.tOpenId);
            if(group[sign.tOpenId] === undefined){
              group[sign.tOpenId] = [sign]
            }else{
              group[sign.tOpenId].push(sign)
            }
          })
          row.group = group;
          var maxTimes;
          var maxOpenId;
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
            row.maxtNickName = group[maxOpenId][0].tNickName;
            row.maxtNickNameP = group[maxOpenId][0].tNickNameP;
            row.maxtTimes = maxTimes;
            row.maxtAvatarUrl = group[maxOpenId][0].tAvatarUrl;
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
        return "/web/student/count?startTime="+this.dataRange[0]
          +"&endTime="+this.dataRange[1]
          +"&nick_name_p="+this.wxnc
          +"&nick_name="+this.zcnc
          +"&class_type="+this.selected2
          + "&pageNum=" + (item-1)
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
      spread:function (i) {        //展开
        this.index = i;
        this.isShow = !this.$data.isShow;
      },
      showContent (i,j) {
        this.showI = i;
        this.showJ = j;
        this.showAlert = true;
        console.log("will show "+event)
      },
      ok(){
        this.showI = -1;
        this.showJ = -1;
        console.log("set "+this.showI+"  "+this.showJ)
      }
    }
  }
</script>
<style>
</style>
