
<template>
  <view>
    <view class="plate header">
      <view class="plate-item">
        <text class="plate-item__text">我的头像</text>
        <view class="plate-item__info">
          <image :src="icon.avatar" class="plate-item__info-icon" />
        </view>
        <van-icon name="arrow" />
      </view>
    </view>
    <view class="plate">
      <view class="plate-item">
        <text class="plate-item__text">我的昵称</text>
        <view class="plate-item__info">
          <input type="text" placeholder="请输入昵称" placeholderClass="input-placeholder" />
        </view>
        <van-icon name="arrow" />
      </view>
      <view class="plate-item">
        <text class="plate-item__text">手机号</text>
        <view class="plate-item__info">
          <input type="text" placeholder="请输入手机号" placeholderClass="input-placeholder" />
        </view>
        <van-icon name="arrow" />
      </view>
      <view class="plate-item">
        <text class="plate-item__text">邮箱</text>
        <view class="plate-item__info">
          <input type="text" placeholder="请输入有效邮箱地址" placeholderClass="input-placeholder" />
        </view>
        <van-icon name="arrow" />
      </view>
    </view>
    <view class="plate">
      <view class="plate-item">
        <text class="plate-item__text">关于小鹿人</text>
        <van-icon name="arrow" />
      </view>
    </view>
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
    memberInfo: {},
    icon: {
      avatar: '/static/images/avatar.png',
      mineBg: '/static/images/mine_ball.png',
      minePhone: '/static/images/mine_phone.png',
    },
  },
  computed: {
    ...mapState(['activeId', 'students']),
  },
  methods: {
    ...mapMutations(['saveStudents', 'setActiveId']),
    linkStudent() {
      this.linkPage('/pages/student/index');
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
.plate {
  margin: 30rpx 0;
  padding: 0 30rpx;

  color: #ccc;
  background: #fff;
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 100rpx;
    &:not(:last-child) {
      border-bottom: 2rpx solid #f4f4f4;
    }
    &__text {
      font-size: 32rpx;
      font-weight: 600;

      color: #202020;
    }
    &__info {
      flex: 1;

      padding: 0 20rpx;

      text-align: right;

      input {
        font-size: 32rpx;

        color: #666;
      }
      .input-placeholder {
        font-size: 32rpx;

        color: #ccc;
      }
      &-icon {
        width: 100rpx;
        height: 100rpx;
      }
    }
  }
}
.header {
  padding: 30rpx;
}

</style>

<config>
{
  navigationBarTitleText: '个人信息',
  "usingComponents": {
    "van-icon": "module:@vant/weapp/dist/icon/index"
  }
}
</config>
