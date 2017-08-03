<template>
  <div class="rightPanel" id="app">
    <div class="searchDiv">
      <label class="searchLabel">更新时间
        <Datepicker v-on:on-change="dateChange"
                    format="yyyy/MM/dd HH:mm:ss"
                    type="datetimerange" placeholder="选择日期和时间" style="width: 300px"></Datepicker>
      </label>
      <label class="searchLabel">open_id  <input type="text"  v-model="openId" /></label>
      <label class="searchLabel">微信昵称<input type="text"  v-model="wxnc"  /></label>
      <label class="searchLabel">注册昵称<input type="text" v-model="zcnc" /></label>
      <label class="searchLabel">类型
        <select v-model="selected1">
          <option value="">全部</option>
          <option value="2">老师</option>
          <option value="1">学生</option>
        </select>
      </label>
      <label class="searchLabel">
        班级
        <select v-model="selected2">
          <option value="" disabled>全部</option>
          <option value="初级班">初级班</option>
          <option value="中级班">中级班</option>
          <option value="高级版">高级版</option>
        </select>
      </label>
      <label class="searchLabel">
        <button class="btn" @click="search()">搜索</button>
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
      <div class="pagination">
        <label>{{cur}} 页/共 {{pageNum}} 页</label>
        <ul>
          <li class="previous" v-if="showFirst" ><a class="fui-arrow-left"  @click="pre()">上一页</a></li>
          <li v-for="index in indexs" :class="{'active': cur == index}">
            <a @click="btnClick(index)">{{index}}</a>
          </li>
          <li class="next" v-if="showLast"><a class="fui-arrow-right" @click="next()">下一页</a></li>
        </ul>
      </div>
      <div class="input-div-base">到 <input id="pageNumber" type="text" class="form-control" v-model="toPageNum"> 页</div>
      <button class="btn btn-info" @click="goPage(toPageNum)"> 跳转</button>
    </div>
  </div>
</template>

<script>
  import VueResource from 'vue-resource'
  import Vue from 'vue'
  import Datepicker from 'iview/src/components/date-picker'
  import 'iview/dist/styles/iview.css';

  Vue.use(VueResource)
  export default {
    name: 'Test',
    components: {Datepicker},
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
        dataRange:['2016-01-01', '2016-02-15']
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
      },response=>{
        console.log("error request!")
      });
    },
    computed:{
      indexs(index) {
        var left = 1;
        var right = this.pageNum;
        var ar = [];
        if(this.pageNum >= 11){
          if(this.cur > 5 && this.cur < this.pageNum - 4){
            left = this.cur - 5;
            right = this.cur + 4;
          }
          else{
            if(this.cur <= 5){
              left = 1;
              right = 10;
            }else{
              right = this.pageNum;
              left = this.pageNum - 9;
            }
          }
        }
        while (left <= right){
          ar.push(left);
          left++;
        }
        return ar;
      },
      showLast() {
        return this.cur !== this.pageNum;
      },
      showFirst() {
        return this.cur !== 1
      }
    },
    methods:{
      dateChange(date){
        this.dataRange[0] = date[0];
        this.dataRange[1]= date[1];
      },
      calculateUrl(item) {
        return "/web/user?start_update_time="+this.startTime+" 00:00:00"
          +"&end_update_time="+this.endTime+" 00:00:00"
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
      goPage(toPageNum){
        this.cur = toPageNum;
        this.$http.get(this.calculateUrl(toPageNum)).then(function (response) {
          this.rows = response.data.rows;
          this.total = response.data.total;
          var num = parseInt(this.$data.total / 25);
          if(this.total%25!==0) num +=1;
          this.pageNum = num;
          this.success = response.data.success;
        },function (response) {
          console.log("error request!")
        });
      },
      pre(){
        this.$http.get(this.calculateUrl(this.data.cur-1)).then(function (response) {
          this.rows = response.data.rows;
          this.total = response.data.total;
          var num = parseInt(this.total / 25);
          if(this.total%25!==0) num +=1;
          this.pageNum = num;
          this.success = response.data.success;
        },function (response) {
          console.log("error request!")
        });
        this.cur = this.cur -1;
      },
      next(){
        this.$http.get(this.data.cur+1).then(function (response) {
          this.rows = response.data.rows;
          this.total = response.data.total;
          var num = parseInt(this.total / 25);
          if(this.total%25!==0) num +=1;
          this.pageNum = num;
          this.success = response.data.success;
        },function (response) {
          console.log("error request!")
        });
        this.cur = this.$data.cur + 1;
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
