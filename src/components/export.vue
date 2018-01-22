<template>
  <div class="rightPanel">
    <div class="searchDiv">
      <label class="searchLabel">更新时间
        <Date-picker v-on:on-change="dateChange"
                     format="yyyy-MM-dd HH:mm:ss"
                     type="datetimerange" placeholder="选择日期和时间" style="width: 300px"></Date-picker>
      </label>
      <label class="searchLabel">打卡人微信昵称<Input class="width220" type="text"  placeholder="请输入微信昵称" v-model="wxnc" ></Input></label>
      <label class="searchLabel">打卡人注册昵称<Input class="width220" type="text" placeholder="请输入注册昵称" v-model="zcnc"></Input></label>
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

    <div>
      <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
    </div>

    <Table :columns="columns1" :data="rows" ref="table"></Table>

    <div class="page-bar">
      <Page :total='total' :page-size="25" @on-change="btnClick" :current ="cur"></Page>
    </div>
  </div>
</template>

<script>
  import VueResource from 'vue-resource'
  import Vue from 'vue'
  Vue.use(VueResource)
  export default {
    name: 'Test',
    data(){
      return {
        rows:[],
        total:0,      //总注册人数
        pageNum:0,  //总页数
        success:0,
        list:null,
        cur:1,      //当前页码
        toPageNum:1,  //绑定跳转页面
        wxnc: '',      //微信昵称
        zcnc: '',      //注册昵称
        selected2: '',     //身份类型  1为学生   2为老师   默认为空
        class_name: '',    //班级名称
        dataRange:['', ''],
        order:'',
        orderType:'',
        index: 0,
        isShow: false,
        showI:-1,
        showJ:-1,
        showAlert:false,
        columns1:[
          {
            title: '学生微信昵称',
            key: 'sNickNameP'
          },
          {
            title: '学生昵称',
            key: 'sNickName'
          },
          {
            title: '确认数',
            key: 'signTimes'
          },
          {
            title: '打卡时长',
            key: 'ackTeachTimeInt'
          },
          {
            title: '合作最多的老师微信昵称',
            key: 'maxtNickNameP'
          },
          {
            title: '合作最多的老师注册昵称',
            key: 'maxtNickName'
          },
          {
            title: '合作次数',
            key: 'maxtTimes'
          }
        ],
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
          { value: '萌新(10)班', label: '萌新(10)班' },
          { value: '萌新(11)班', label: '萌新(11)班' },
          { value: '萌新(12)班', label: '萌新(12)班' },
          { value: '萌新(13)班', label: '萌新(13)班' },
          { value: '萌新(14)班', label: '萌新(14)班' },
          { value: '萌新(15)班', label: '萌新(15)班' },
          { value: '萌新(16)班', label: '萌新(16)班' },
          { value: '萌新(17)班', label: '萌新(17)班' },
          { value: '萌新(18)班', label: '萌新(18)班' },
          { value: '萌新(19)班', label: '萌新(19)班' },
          { value: '萌新(20)班', label: '萌新(20)班' },
          { value: '提高(1)班', label: '提高(1)班'},
          { value: '提高(2)班', label: '提高(2)班'},
          { value: '提高(3)班', label: '提高(3)班'},
          { value: '提高(4)班', label: '提高(4)班'},
          { value: '提高(5)班', label: '提高(5)班'},
          { value: '提高(6)班', label: '提高(6)班'},
          { value: '提高(7)班', label: '提高(7)班'},
          { value: '提高(8)班', label: '提高(8)班'},
          { value: '提高(9)班', label: '提高(9)班'},
          { value: '提高(10)班', label: '提高(10)班'},
          { value: '提高(11)班', label: '提高(11)班'},
          { value: '提高(12)班', label: '提高(12)班'},
          { value: '提高(13)班', label: '提高(13)班'},
          { value: '提高(14)班', label: '提高(14)班'},
          { value: '提高(15)班', label: '提高(15)班'},
          { value: '提高(16)班', label: '提高(16)班'},
          { value: '提高(17)班', label: '提高(17)班'},
          { value: '提高(18)班', label: '提高(18)班'},
          { value: '提高(19)班', label: '提高(19)班'},
          { value: '提高(20)班', label: '提高(20)班'}
        ],
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
      exportData (type) {
        if (type === 1) {
          console.log(this.$refs.table);
          this.$refs.table.exportCsv({
            filename: 'The original data'
          });
        }
      },
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
          +"&class_name="+this.class_name
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
