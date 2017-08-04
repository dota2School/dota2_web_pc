<template>
  <div id="app">
    <div class = "leftPanel">
      <ul>
        <li><router-link to="/">用户统计</router-link></li>
        <li><router-link to="/ClockDetails">打卡明细统计</router-link></li>
        <li><router-link to="/TeacherRank">老师打卡排名</router-link></li>
        <li><router-link to="/StudentRank">学生打卡排名</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
  /*table 的默认样式*/
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /*img 的以及值域块的边框*/
  fieldset,
  img {
    border: 0;
  }
  /*li标签的默认样式*/
  li {
    list-style: none;
  }
  /*表单项的初始化*/
  input,
  button,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    border: 0;
    background: none;
    outline: none;
  }
  /*表单项或的焦点时样式*/
  button:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  /*a标签默认的样式*/
  a {
    -webkit-touch-callout: none;
    text-decoration: none;
    outline: 0;
    cursor: pointer;
    color: #333333;
  }
  a.red {
    color: #f42222;
  }
  a.blue {
    color: #2f7ce1;
  }
  a:hover,
  a:active,
  a:link,
  a:visited {
    text-decoration: none;
  }
  .btn.focus,
  .btn:focus,
  .btn:hover {
    color: #ffffff;
  }
  em,
  i {
    font-style: normal;
  }
  em {
    color: #f28c48;
  }
  body {
    background-color: #e7e8eb;
  }
  button {
    border: #d5d5d5 solid 1px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s;
    -moz-transition: background-color 0.2s;
    -webkit-transition: background-color 0.2s;
    -o-transition: background-color 0.2s;
  }
  button:active {
    background-color: #e7e8eb;
  }
  button.btn {
    background-color: #2f7ce1;
    color: #fff;
    width: 100%;
    height: 34px;
    padding: 10px;
    border: none;
    font-size: 16px;
    line-height: 14px;
  }
  button.btn:active {
    background-color: #2663b4;
  }
  button.btn.btn-gray {
    border: #d5d5d5 solid 1px;
    border-radius: 3px;
    background-color: #f0f0f0;
    color: #333333;
    line-height: 12px;
  }
  button.btn.btn-gray:active {
    background-color: #c0c0c0;
  }
  button.btn.btn-disabled {
    background-color: #c8c8c8;
    color: #fff;
  }
  button.btn.btn-disabled:active {
    background-color: #c8c8c8;
  }
  .blue {
    color: #2f7ce1;
  }
  .red {
    color: #f42222;
  }
  .bg-gray {
    background: #e7e8eb;
  }
  .spread {
    cursor: pointer;
  }
  .display {
    display: none;
  }
  .sort {
    display: inline;
    background: url("/static/mysort.png") left top no-repeat;
    padding: 0px 10px;
  }
  #app {
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    position: relative;
  }
  #app .leftPanel {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 120px;
    background: #FFFFFF;
    border: 1px solid #d5d5d5;
  }
  #app .leftPanel ul {
    overflow: hidden;
    padding-bottom: 50px;
  }
  #app .leftPanel li {
    line-height: 20px;
    padding: 10px;
  }
  #app .leftPanel li.active {
    border-left: 2px solid #2f7ce1;
    background: #F2F2F2;
    color: #2f7ce1;
  }
  #app .rightPanel {
    float: right;
    margin-left: 140px;
    padding-bottom: 100px;
    background: #FFFFFF;
    border: 1px solid #d5d5d5;
  }
  .searchDiv {
    padding: 10px;
  }
  .searchDiv .searchLabel {
    display: inline-block;
    padding: 10px;
    vertical-align: middle;
    white-space: normal;
  }
  .searchDiv .searchLabel input {
    padding: 5px;
    border: 1px solid #d5d5d5;
  }
  .searchDiv .searchLabel select {
    padding: 5px;
    border: 1px solid #d5d5d5;
  }
  .alert_div {
    display: none;
  }
  .alert-div .alert-content {
    padding: 15px 20px;
    font-size: 14px;
  }
  .alert-div .alert-content label {
    height: 30px;
    display: block;
  }
  .alert-div .alert-content label input[type=radio] {
    position: relative;
    top: 2px;
    margin-right: 6px;
  }
  .alert-div .alert-content textarea {
    width: 100%;
    height: 60px;
    padding: 10px;
    border: #d5d5d5 solid 1px;
    resize: none;
  }
  .alert-div .alert-content select {
    border: #d5d5d5 solid 1px;
    padding: 5px 10px;
    display: block;
    margin-top: 10px;
    width: 100%;
  }
  .alert-div .btn-div {
    text-align: center;
  }
  .alert-div .btn-div .btn {
    width: 80px;
    margin: 10px;
  }
  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 2px solid #2f7ce1;
    background: #fff;
  }
  .header .headerContent {
    width: 80%;
    margin: 0 auto;
    font-size: 20px;
  }
  table {
    font-size: 14px;
    color: #333333;
    border-collapse: collapse;
    line-height: 20px;
    table-layout: fixed;
    margin-bottom: 20px;
    width: 100%;
  }
  table caption {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-top: 1px solid #d5d5d5;
    border-bottom: none;
  }
  table th {
    padding: 10px 5px;
    border-top: #d5d5d5 solid 1px;
    border-bottom: #d5d5d5 solid 1px;
    background-color: #f4f5f9;
    font-weight: normal;
    text-align: center;
  }
  table td {
    padding: 10px 5px;
    border-top: #d5d5d5 solid 1px;
    border-bottom: #d5d5d5 solid 1px;
    background-color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  table td.heightlight {
    background: #5cafec;
  }
  table td .gray {
    color: #c8c8c8;
  }
  table td label {
    line-height: normal;
  }
  table.td-no-ellipsis td {
    white-space: normal;
    word-break: break-all;
  }
  table .deleteBtn,
  table .reciveBtn {
    cursor: pointer;
  }
  table .cosdiv {
    float: left;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  table .cosdiv.title {
    font-weight: bold;
  }
  .cosdivf {
    width: 440px;
    overflow: hidden;
    float: left;
    margin-left: 12px;
  }
  .table-div {
    display: block;
    overflow: hidden;
    width: 100%;
    border: #d5d5d5 solid 1px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .table-div .thead {
    height: 40px;
    line-height: 40px;
    border-bottom: #d5d5d5 solid 1px;
    background: #f4f5f9;
  }
  .table-div .thead span {
    display: inline-block;
    float: left;
    text-align: center;
  }
  .table-div .tlist {
    height: 22px;
    line-height: 22px;
    margin: 2px 0px 8px;
    cursor: pointer;
  }
  .table-div .tlist span {
    display: inline-block;
    float: left;
    text-align: center;
    color: #333;
  }
  .table-div .tlist.active {
    background: #2f7ce1;
  }
  .table-div .tlist.active span {
    color: #fff;
  }
  td.alertContent p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .childTable {
    width: 90%;
    margin: 0 auto;
    border: none;
  }
  .childTable td {
    border: none;
    background: #e7e8eb;
  }
  .page {
    height: 32px;
    text-align: right;
    line-height: 32px;
  }
  .page button {
    height: 32px;
    line-height: 30px;
    display: inline-block;
    padding: 0px 10px;
    margin: 0px 10px;
    cursor: pointer;
  }
  .page input[type=text] {
    height: 32px;
    line-height: 20px;
    border: #d5d5d5 solid 1px;
    padding: 5px 10px;
    width: 60px;
    margin-left: 10px;
  }
  .page .pageselect {
    height: 33px;
    line-height: 18px;
    border: #e7e7eb solid 1px;
    padding: 5px 8px;
    cursor: pointer;
    display: inline-block;
  }
  .page form {
    display: inline;
  }
  .page .prepage,
  .page .nextpage {
    display: inline;
    width: 30px;
    height: 32px;
    border: #e7e7eb solid 1px;
    padding: 6px 14px;
    margin: 0px 10px;
  }
  /* 分页样式 */
  .page-bar {
    height: 32px;
    line-height: 30px;
    margin: 34px 40px;
    text-align: right;
    color: #999;
  }
  .yn {
    display: inline-block;
    text-align: right;
  }
  .pagination,
  .input-div-base {
    display: inline-block;
  }
  .pagination li {
    float: left;
  }
  .next a,
  .previous a {
    vertical-align: top;
    height: 30px;
    line-height: 14px;
    font-size: 12px;
    padding: 7px 11px;
    border: 1px solid #d0d0d0;
    margin-right: 10px;
  }
  .tiaoye {
    width: 60px;
  }
  .licount {
    float: left;
    text-align: center;
    color: #333;
  }
  .pagination li a {
    vertical-align: top;
    display: block;
    height: 18px;
    line-height: 18px;
    padding: 5px 10px;
    margin-right: 10px;
    font-size: 12px;
    border: 1px solid #d0d0d0;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    border-radius: 2px;
  }
  .pagination ul {
    display: inline-block;
  }
  .pagination li.active a {
    color: #fff;
    background: #2f7ce1;
    border-color: #2f7ce1;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    border-radius: 2px;
  }
  .pagination li:hover a {
    color: #fff;
    background: #2f7ce1;
    border-color: #2f7ce1;
  }
  .input-div-base {
    margin-left: 10px;
    vertical-align: top;
    margin: 0 10px;
  }
  .input-div-base .form-control {
    width: 50px;
    height: 30px;
    line-height: 20px;
    padding: 5px 10px;
    border: 1px solid #d0d0d0;
  }
  .page-bar label,
  .page-bar .btn-info {
    vertical-align: top;
    height: 30px;
    font-size: 12px;
    padding: 7px 11px;
    margin-right: 10px;
  }
  .page-bar .btn-info {
    display: inline-block;
    width: 50px;
    line-height: 14px;
    color: #fff;
    background: #2F7CE1;
    border: 1px solid #d0d0d0;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    border-color: #2f7ce1;
    border-radius: 2px;
  }
</style>
