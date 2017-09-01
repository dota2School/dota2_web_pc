<template>
  <div class="rightPanel">
    <div class="searchDiv">
      <label class="searchLabel">更新时间
        <Date-picker v-on:on-change="dateChange"
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange" placeholder="选择日期和时间" style="width: 300px"></Date-picker>
      </label>
      <label class="searchLabel">open_id<Input class="width220" type="text" placeholder="请输入open_id"  v-model="openId" ></Input></label>
      <label class="searchLabel">微信昵称<Input class="width220" type="text"  placeholder="请输入微信昵称" v-model="wxnc" ></Input></label>
      <label class="searchLabel">注册昵称<Input class="width220" type="text" placeholder="请输入注册昵称" v-model="zcnc"></Input></label>
      <label class="searchLabel">
        班级类型
        <div class="selectWrapper width220">
          <Select v-model="selected2">
            <Option v-for="item in selected1Data2" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </label>
      <label class="searchLabel">
        班级名称
        <div class="selectWrapper width220">
          <Select v-model="class_name">
            <Option v-for="item in classNameData" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
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
        <th>打卡记录ID</th>
        <th>open_id</th>
        <th>打卡人微信昵称</th>
        <th>打卡人昵称</th>
        <th>头像</th>
        <th>教授时间</th>
        <th>打卡时间</th>
        <th>授课班型</th>
        <th>学生确认ID</th>
        <th>学生昵称</th>
        <th>学生微信昵称</th>
        <th>头像</th>
        <th>是否满意</th>
        <th>学生评论</th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="(row , i) in rows">
        <td>{{row.signId}}</td>
        <td>{{row.tOpenId}}</td>
        <td>{{row.tNickNameP}}</td>
        <td>{{row.tNickName}}</td>
        <td class="avatar"><img style="max-width: 80px;" :src = row.tAvatarUrl /></td>
        <td>{{row.tTeachTimeInt}}</td>
        <td>{{row.tTeachDate}}</td>
        <td>{{row.tClassType}}</td>
        <td>{{row.sOpenId}}</td>
        <td>{{row.sNickName}}</td>
        <td>{{row.sNickNameP}}</td>
        <td class="avatar"><img style="max-width: 80px;" :src = row.sAvatarUrl /></td>
        <td>{{row.sStatus}}</td>
        <td class="alertContent"><p @click="showContent(i)">{{row.sEvaluate}}</p></td>
        <Modal
          v-model="modal1"
          title="评价"
          v-show="i === showAlertIndex"
          @on-ok="ok"
          @on-cancel="ok">
          <p>{{row.sEvaluate}}</p>
        </Modal>
      </tr>
      </tbody>
    </table>
    <div class="page-bar">
      <Page :total='total' :page-size="25" @on-change="btnClick" :current ="cur"></Page>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueResource from 'vue-resource'
  Vue.use(VueResource);
  export default {
    name: 'Test',
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
        class_name: '',    //班级名称
        dataRange:['', ''],
        selected1Data2:[
          { value: '', label: '全部' },
          { value: '提高班', label: '提高班' },
          { value: '萌新班', label: '萌新班' }
        ],
        classNameData:[
          { value: '', label: '全部'  },
          { value: '萌新(1)班', label: '萌新(1)班' },
          { value: '萌新(2)班', label: '萌新(2)班' },
          { value: '萌新(3)班', label: '萌新(3)班' },
          { value: '萌新(4)班', label: '萌新(4)班' },
          { value: '萌新(5)班', label: '萌新(5)班' },
          { value: '萌新(6)班', label: '萌新(6)班' },
          { value: '萌新(7)班', label: '萌新(7)班' },
          { value: '萌新(8)班', label: '萌新(8)班' },
          { value: '萌新(9)班', label: '萌新(9)班' },
          { value: '萌新(10)班', label: '萌新(10)班' }

        ],
        showAlertIndex:-1,
        modal1:true
      }
    },
    created(){
      this.$http.get("/web/sign").then(response=>{
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
        return "/web/sign?start_sign_time="+this.dataRange[0]
          +"&end_sign_time="+this.dataRange[1]
          +"&open_id="+this.openId
          +"&nick_name_p="+this.wxnc
          +"&nick_name="+this.zcnc
          +"&class_type="+this.selected2
          +"&class_name="+this.class_name
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
      showContent (event) {
        this.showAlertIndex = event;
        this.modal1 = true;
        console.log("will show "+event)
      },
      ok(){
        this.showAlertIndex = -1;
        console.log("set "+this.showAlertIndex)
      }
    }
  }
</script>
<style>
</style>
