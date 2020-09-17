
<template>
  <view>
    <view class="header">
      <image :src="icon.avatar" mode="aspectFill" class="header__img" />
    </view>
    <view class="content">
      <view class="content-title">小鹿人一号场地</view>
      <view
        class="content-desc"
      >小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地小鹿人一号场地</view>
    </view>
    <view class="section">
      <view class="content-title">小鹿人一号场地</view>
      <view class="section-content">
        <image
          v-for="item in 10"
          :key="item"
          :src="icon.avatar"
          mode="aspectFill"
          class="section-content-item"
        />
      </view>
    </view>
    <button class="btn" @click="link">立即下单</button>
    <!-- <default ></default> -->
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
    icon: {
      avatar: '/static/images/avatar.png',
    },
  },
  computed: {
    ...mapState(['students', 'activeId']),
  },
  methods: {
    ...mapMutations(['setActiveId']),
    link() {
      this.linkPage('/pages/book/index');
    },
    async changeStudent(info) {
      const res = await api.SWITCH_STUDENT(info.id);
      if (res.data.code === 200) {
        this.toast(res.data.msg, 'success');
        wx.setStorageSync('memberInfo', info);
        this.setActiveId(info.id);
      }
    },
  },
  onShow() {},
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.header {
  &__img {
    width: 100%;
    height: 340rpx;
  }
}
.content {
  padding: 20rpx 30rpx;

  border-bottom: 20rpx solid #f3f3f3;
  &-title {
    font-size: 30rpx;
    font-weight: 600;

    margin-bottom: 20rpx;

    color: #202020;
  }
  &-desc {
    font-size: 26rpx;

    color: #9a9a9a;
  }
}
.section {
  padding: 20rpx 30rpx 160rpx;

  &-title {
    font-size: 30rpx;
    font-weight: 600;

    margin-bottom: 20rpx;

    color: #202020;
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      width: 220rpx;
      height: 220rpx;
      margin-bottom: 10rpx;
    }
  }
}
.btn {
  font-size: 36rpx;
  line-height: 90rpx;

  position: fixed;
  bottom: 60rpx;
  left: 50%;

  width: 630rpx;
  height: 90rpx;

  transform: translate(-50%, 0);

  color: #fff;
  border-radius: 45rpx;
  background: #fe7115;
  &::after {
    border: none;
  }
}

</style>

<config>
{
  navigationBarTitleText: '场地详情',
  usingComponents: {
    default: '~@/components/default',
  }
}
</config>
