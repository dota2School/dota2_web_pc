<template>
  <div class="rightPanel">
    <div class="searchDiv">
      <label class="searchLabel">更新时间
        <Datepicker v-on:on-change="dateChange"
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange" placeholder="选择日期和时间" style="width: 300px"></Datepicker>
      </label>
      <label class="searchLabel">open_id<Input type="text" placeholder="请输入open_id"  v-model="openId" ></Input></label>
      <label class="searchLabel">微信昵称<Input type="text"  placeholder="请输入微信昵称" v-model="wxnc" ></Input></label>
      <label class="searchLabel">注册昵称<Input type="text" placeholder="请输入注册昵称" v-model="zcnc"></Input></label>
      <label class="searchLabel">类型
        <Select v-model="selected1">
          <Option v-for="item in selected1Data" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
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
        <th>open_id</th>
        <th>微信昵称</th>
        <th>注册昵称</th>
        <th>头像</th>
        <th>类型</th>
        <th>班级</th>
        <th>DOTA2 ID</th>
        <th>天梯分</th>
        <th>擅长/想学</th>
        <th>信息更新时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows">
        <td>{{ row.openId }}</td>
        <td>{{ row.nickName }}</td>
        <td>{{ row.nickNameP }}</td>
        <td class="avatar"><img style="max-width: 80px;" :src = row.avatarUrl /></td>
        <td>{{ row.type }}</td>
        <td>{{ row.classType }}</td>
        <td>{{ row.streamId }}</td>
        <td>{{ row.rankScore }}</td>
        <td>{{ row.classContent }}</td>
        <td>{{ row.updateTime }}</td>
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
        selected1Data:[
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '学生'
          },
          {
            value: '2',
            label: '老师'
          },
        ],
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
      this.$http.get("/web/user").then(response=>{
        this.rows = response.data.rows;
        this.total = response.data.total;
        var num = parseInt(this.$data.total / 25);
        if(this.total%25!==0) num +=1;
        this.pageNum = num;
        this.success = response.data.success;
        console.log("pageNum  "+this.pageNum)
      },response=>{
        console.log("error request!")
      });
    },
    computed:{
    },
    methods:{
      dateChange(date){
        date = date.split(' - ')
        this.dataRange[0] = date[0].trim();
        this.dataRange[1]= date[1].trim();
        console.log("date change "+this.dataRange[0]+"   "+this.dataRange[1])
      },
      calculateUrl(item) {
        return "/web/user?start_update_time="+this.dataRange[0]
          +"&end_update_time="+this.dataRange[1]
          +"&open_id="+this.openId
          +"&nick_name_p="+this.wxnc
          +"&nick_name="+this.zcnc
          +"&type="+this.selected1
          +"&class_type="+this.selected2
          + "&page_num=" + (item-1);
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
        },function (response) {
          console.log("error request!")
        });
      },
    }
  }
</script>
<style>
</style>
