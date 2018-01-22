<template>
  <div id="app">
    <!-- <div class = "leftPanel">
      <ul>
        <li><router-link to="/">用户统计</router-link></li>
        <li><router-link to="/ClockDetails">打卡明细统计</router-link></li>
        <li><router-link to="/TeacherRank">老师打卡排名</router-link></li>
        <li><router-link to="/StudentRank">学生打卡排名</router-link></li>
      </ul>
    </div>
    <router-view></router-view> -->
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" width="auto">
                    <router-link to="/">
                      <Menu-item name="1">
                          <Icon type="ios-navigate" :size="iconSize"></Icon>
                          <span class="layout-text">用户统计</span>
                      </Menu-item>
                    </router-link>
                    <router-link to="/ClockDetails">
                        <Menu-item name="2">
                            <Icon type="ios-keypad" :size="iconSize"></Icon>
                            <span class="layout-text">打卡明细统计</span>
                        </Menu-item>
                     </router-link>
                    <router-link to="/TeacherRank">
                        <Menu-item name="3">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">老师打卡排名</span>
                        </Menu-item>
                    </router-link>
                    <router-link to="/StudentRank">
                      <Menu-item name="4">
                          <Icon type="ios-analytics" :size="iconSize"></Icon>
                          <span class="layout-text">学生打卡排名</span>
                      </Menu-item>
                    </router-link>
                  <router-link to="/export">
                    <Menu-item name="5">
                      <Icon type="ios-analytics" :size="iconSize"></Icon>
                      <span class="layout-text">导出</span>
                    </Menu-item>
                  </router-link>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                      <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
   data () {
            return {
                spanLeft: 4,
                spanRight: 20
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 4 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 4) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                }
            }
        }
}
</script>
