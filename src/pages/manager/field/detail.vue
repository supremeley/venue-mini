
<template>
  <view class="wrap">
    <swiper
      :interval="3000"
      autoplay
      circular
      indicator-dots
      indicator-color="rgba(255,255,255,.3)"
      indicator-active-color="#fff"
      class="swiper"
    >
      <swiper-item v-for="item in 10" :key="item" class="swiper-item">
        <image :src="icon.bg" mode="aspectFill" class="swiper-item__img" />
      </swiper-item>
    </swiper>
    <view class="title">一号场地</view>
    <view class="content">
      <view class="plate">
        <view class="plate-header">基本信息</view>
        <view class="plate-content">
          <view class="input-opt">
            <text class="input-opt__text">场地类型:</text>
            <input type="text" class="input-opt__inp" />
          </view>
          <view class="input-opt">
            <text class="input-opt__text">场地价格:</text>
            <input type="text" class="input-opt__inp" />
          </view>
        </view>
      </view>
      <view class="plate">
        <view class="plate-header">场地描述</view>
        <view class="plate-content">
          <view class="input-opt">
            <text class="input-opt__text">阳光充足:</text>
            <input type="text" class="input-opt__inp" />
          </view>
        </view>
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
    icon: {
      like: '/static/images/like.png',
      locationOrange: '/static/images/location_orange.png',
      mobile: '/static/images/mobile.png',
      bg: '/static/images/bg.png',
    },
  },
  computed: {
    ...mapState(['students', 'activeId']),
  },
  methods: {
    ...mapMutations(['setActiveId']),
    link() {
      this.linkPage('/pages/field/index');
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
.wrap {
  padding: 30rpx;
}
.swiper {
  box-sizing: border-box;
  width: 100%;
  height: 340rpx;

  &-item {
    width: 100%;
    height: 100%;
    &__img {
      width: 100%;
      height: 100%;

      border-radius: 10rpx;
    }
  }
}
.title {
  font-size: 34rpx;
  font-weight: 600;
  line-height: 100rpx;

  padding: 0 30rpx;

  color: #202020;
  background: #fff;
}
.content {
  padding: 0 30rpx;

  border-radius: 0 0 20rpx 20rpx;
  background: #fff;
}
.plate {
  padding: 30rpx 0;

  &:not(:last-child) {
    border-bottom: 2rpx solid #efefef;
  }

  &-header {
    font-size: 34rpx;
    font-weight: 600;
    line-height: 1;

    position: relative;

    margin-bottom: 20rpx;
    padding: 0 20rpx;

    color: #202020;
    &::before {
      position: absolute;
      top: 50%;
      left: 0;

      width: 6rpx;
      height: 30rpx;

      content: "";
      transform: translateY(-50%);

      background: #fe7115;
    }
  }
  .input-opt {
    display: flex;
    align-items: center;

    height: 60rpx;
    &__text {
      font-size: 30rpx;

      color: #999;
    }
    &__inp {
      flex: 1;

      padding: 0 20rpx;
    }
  }
}

</style>

<config>
{
  navigationBarTitleText: '场地信息'
}
</config>
