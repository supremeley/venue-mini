
<template>
  <view>
    <view class="header">
      <image
        :src="memberInfo.headimg || icon.avatar"
        mode="aspectFill"
        class="header-avatar"
        @click="openImage"
      />
      <view class="header-content" @click="linkDetail">
        <view class="header-info">{{memberInfo.name || '未登录'}}</view>
        <!-- <view class="header-btn" @click="linkStudent">学员管理</view> -->
        <view class="header-phone">
          <image :src="icon.minePhone" class="header-phone-icon" />
          <text>18279749829</text>
        </view>
      </view>
      <van-icon name="arrow" />
    </view>
    <view class="title">
      <image :src="icon.mineBg" class="title-bg" />
      <view class="title-tag">个人信息</view>
      <view class="title-content">
        <view class="title-content-item">
          <text>姓名：</text>
          <text>张三</text>
        </view>
        <view class="title-content-item">
          <text>姓名：</text>
          <text>张三</text>
        </view>
        <view class="title-content-item">
          <text>姓名：</text>
          <text>张三</text>
        </view>
        <view class="title-content-item">
          <text>姓名：</text>
          <text>张三</text>
        </view>
      </view>
    </view>
    <view class="more-list">
      <view
        v-for="item in menu"
        :key="item.title"
        class="more-list-item"
        @click="linkPage(item.url)"
      >
        <image :src="item.icon" class="more-list-item__icon" />
        <view class="more-list-item__right">
          <view class="more-list-item__right-text">{{item.title}}</view>
          <van-icon name="arrow" class="arrow" />
        </view>
      </view>
    </view>
    <!-- <view v-if="coach" class="teacher-list">
      <view
        v-for="item in teacherMenu"
        :key="item.title"
        class="teacher-list-item"
        @click="linkPage(item.url)"
      >
        <image :src="item.icon" class="teacher-list-item__icon" />
        <view class="teacher-list-item__info">
          <text class="teacher-list-item__info-text">{{item.title}}</text>
          <van-icon name="arrow" class="arrow" />
        </view>
      </view>
    </view>-->
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';
import { mapState, mapMutations } from '@wepy/x';
import store from '@/store';

wepy.page({
  store,
  data: {
    coach: '',
    memberInfo: {},
    icon: {
      avatar: '/static/images/avatar.png',
      mineBg: '/static/images/mine_ball.png',
      minePhone: '/static/images/mine_phone.png',
    },
    menu: [
      {
        icon: '/static/images/mine_member.png',
        title: '我的会员',
        url: '/pages/record/course/index',
      },
      {
        icon: '/static/images/mine_book.png',
        title: '我的预定',
        url: '/pages/record/vacation/index',
      },
      {
        icon: '/static/images/mine_collect.png',
        title: '我的收藏',
        url: '/pages/record/index/index',
      },
      {
        icon: '/static/images/mine_message.png',
        title: '我的消息',
        url: '/pages/record/adjust/index',
      },
    ],
    teacherMenu: [
      {
        icon: '/static/images/mine_course.png',
        title: '约课管理',
        url: '/pages/manager/course/index',
      },
      {
        icon: '/static/images/mine_vacations.png',
        title: '请假管理',
        url: '/pages/manager/vacation/index',
      },
      {
        icon: '/static/images/mine_classes.png',
        title: '班级管理',
        url: '/pages/manager/class/index',
      },
      // {
      //   icon: '/static/images/mine_system.png',
      //   title: '学员管理',
      //   url: '/pages/manager/student/index',
      // },
    ],
  },
  computed: {
    ...mapState(['activeId', 'students']),
  },
  methods: {
    ...mapMutations(['saveStudents', 'setActiveId']),
    linkDetail() {
      this.linkPage('/pages/mine/detail');
    },
    openImage() {
      wx.chooseImage({
        count: 1,
        success: (e) => {
          const { tempFilePaths } = e;
          this.uploadImg(tempFilePaths[0]);
          this.$set(this.memberInfo, 'headimg', tempFilePaths[0]);
          wx.setStorageSync('memberInfo', this.memberInfo);
        },
      });
    },
    async uploadImg(url) {
      const data = {
        studentId: this.activeId,
      };

      const res = await api.UPLOAD_IMG(url, data);

      this.toast('上传头像成功');
    },
    fetchInfo() {
      this.getUserInfoByMine();
    },
    async getUserInfoByMine() {
      const { data } = await api.GET_USERINFO_BY_MINE();

      const { activeId, students } = data.data;

      this.setActiveId(activeId);

      if (!students.length) {
        this.toast('需要先报名课程');
      }
      this.saveStudents(students);

      const memberInfo = students.find((item) => item.id == activeId);

      if (!memberInfo) {
        this.memberInfo = data.data;
        return;
      }

      this.memberInfo = { ...memberInfo };

      wx.setStorageSync('memberInfo', memberInfo);

      this.option = [
        {
          icon: '/static/images/date.png',
          desc: this.formatTimer(
            memberInfo.birthday.replace(/-/g, '/'),
            'y-m-d'
          ),
          title: '出生日期',
        },
        {
          icon: '/static/images/info.png',
          desc: `${memberInfo.age}岁`,
          title: '我的年龄',
        },
        {
          icon: '/static/images/area.png',
          desc: memberInfo.recentActive,
          title: '最近上课',
        },
      ];
    },
  },
  onShow() {
    // const isReg = wx.getStorageSync('isReg');
    // if (!isReg) {
    //   this.linkPage('/pages/login/index');
    // } else {
    //   this.fetchInfo();
    // }
    // this.coach = wx.getStorageSync('coach');
  },
});
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;
  width: 100%;
  height: 290rpx;
  padding: 30rpx;
  padding-bottom: 120rpx;

  color: #fff;
  background: linear-gradient(89deg, #f98419 0%, #ef671b 100%);
  &-avatar {
    flex-shrink: 0;

    width: 150rpx;
    height: 150rpx;
    margin-right: 45rpx;

    border-radius: 50%;
  }
  &-content {
    flex: 1;
  }
  &-info {
    font-size: 40rpx;

    margin-bottom: 28rpx;
  }
  &-phone {
    font-size: 28rpx;

    display: flex;
    align-items: center;
    &-icon {
      width: 28rpx;
      height: 28rpx;
      margin-right: 10rpx;
    }
  }
  // &-btn {
  //   font-size: 24rpx;
  //   line-height: 50rpx;

  //   width: 150rpx;
  //   height: 50rpx;

  //   text-align: center;

  //   color: #fe7115;
  //   border-radius: 25rpx;
  //   background: #fff;
  // }
}
.title {
  position: relative;

  box-sizing: border-box;
  height: 306rpx;
  margin: 20rpx 30rpx;
  margin-top: -80rpx;
  padding-top: 80rpx;
  padding-left: 135rpx;

  border-radius: 10rpx;
  background: linear-gradient(128deg, #38393b 0%, #242528 100%);
  &-bg {
    position: absolute;
    right: 0;
    bottom: 0;

    width: 285rpx;
    height: 285rpx;
  }
  &-tag {
    font-size: 26rpx;
    font-weight: 600;
    line-height: 45rpx;

    position: absolute;
    top: 20rpx;
    left: 0;

    width: 130rpx;

    text-align: center;

    color: #553010;
    border-radius: 0 22.5rpx 22.5rpx 0;
    background: #e6b66e;
  }
  &-content {
    font-size: 28rpx;
    line-height: 50rpx;

    color: #e6b66e;
  }
}
.more-list {
  margin: 20rpx 30rpx;
  padding: 30rpx;

  border-radius: 10rpx;
  background: #fff;
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 108rpx;
    &:not(:last-child) {
      margin-bottom: 20rpx;
      .more-list-item__right {
        border-bottom: 2rpx solid #f4f4f4;
      }
    }
    &__icon {
      flex-shrink: 0;

      width: 44rpx;
      height: 44rpx;
      margin-right: 30rpx;
    }
    &__right {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: space-between;

      height: 100%;

      color: #666;

      &-text {
        font-size: 30rpx;
        font-weight: 600;

        color: #202020;
      }
    }
  }
}

</style>

<config>
{
  navigationBarTitleText: '我的',
  "usingComponents": {
    "van-icon": "module:@vant/weapp/dist/icon/index"
  }
}
</config>
