
<template>
  <view>
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
    <view class="title">
      <view class="title-item">
        <view class="title-item__left">
          <view class="title-item__left-title">第一球场</view>
          <view class="title-item__left-tag">
            <text class="title-item__left-tag__text">第一球场</text>
            <text class="title-item__left-tag__text">第一球场</text>
          </view>
        </view>
        <view class="title-item__right">
          <image :src="icon.like" mode="aspectFill" class="title-item__right-icon" />
          <text class="title-item__right-num">123</text>
        </view>
      </view>
      <view class="title-item">
        <view class="title-item__left">
          <view class="title-item__left-title-b">第一球场</view>
          <view class="title-item__left-desc">第一球场</view>
        </view>
        <view class="title-item__right">
          <image :src="icon.locationOrange" mode="aspectFill" class="title-item__right-icon" />
        </view>
      </view>
      <view class="title-item">
        <text class="title-item__left-title-b">021-22222</text>
        <view class="title-item__right">
          <image :src="icon.mobile" mode="aspectFill" class="title-item__right-icon" />
        </view>
      </view>
    </view>
    <view class="plate">
      <view class="plate-header">营业时间</view>
      <view class="plate-content">质疑阿斯达所多的质疑阿斯达所多的质疑阿斯达所多的质疑阿斯达所多的质疑阿斯达所多的</view>
    </view>
    <view class="plate">
      <view class="plate-header">设施服务</view>
      <view class="plate-content">
        <view v-for="item in 10" :key="item" class="plate-content-item">
          <image :src="icon.mobile" mode="aspectFill" class="plate-content-item__icon" />
          <text>篮球</text>
        </view>
      </view>
    </view>
    <view class="plate">
      <view class="plate-header">所有场馆</view>
      <view class="plate-section">
        <view class="plate-section-item">
          <image :src="icon.bg" mode="aspectFill" class="plate-section-item__img" />
          <view class="plate-section-item__info">
            <view class="plate-section-item__info-title">小鹿人一号场地</view>
            <view class="plate-section-item__info-desc">靠近门口</view>
            <view class="plate-section-item__info-price">
              ￥300/
              <text class="plate-section-item__info-price-t">小时</text>
            </view>
          </view>
          <view class="plate-section-item__btn" @click="link">预定</view>
        </view>
      </view>
    </view>
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
// page {
//   background: #fff;
// }
.swiper {
  box-sizing: border-box;
  width: 100%;
  // margin: 20rpx 0;
  // padding: 0 30rpx;
  &-item {
    width: 100%;
    height: 340rpx;
    &__img {
      width: 100%;
      height: 100%;

      border-radius: 10rpx;
    }
  }
}
.title {
  margin-bottom: 20rpx;
  padding: 0 30rpx;

  background: #fff;
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 20rpx 0;
    &:not(:last-child) {
      border-bottom: 2rpx solid #efefef;
    }
    &__left {
      &-title {
        font-size: 30rpx;
        font-weight: 600;

        margin-bottom: 10rpx;

        color: #202020;
        &-b {
          font-size: 28rpx;
          font-weight: 500;

          margin-bottom: 10rpx;

          color: #202020;
        }
      }
      &-desc {
        font-size: 24rpx;

        color: #9a9a9a;
      }
      &-tag {
        display: flex;
        align-items: center;
        &__text {
          font-size: 22rpx;
          line-height: 30rpx;

          box-sizing: border-box;
          margin-right: 10rpx;
          padding: 0 10rpx;

          color: #fe7216;
          border: 2rpx solid #fe7216;
          border-radius: 4rpx;
        }
      }
    }
    &__right {
      display: flex;
      align-items: center;
      &-icon {
        width: 34rpx;
        height: 34rpx;
      }
      &-num {
        font-size: 28rpx;

        margin-left: 20rpx;

        color: #9a9a9a;
      }
    }
  }
}
.plate {
  box-sizing: border-box;
  margin-bottom: 20rpx;
  padding: 20rpx 30rpx;

  background: #fff;

  &-header {
    font-size: 36rpx;
    font-weight: 600;

    margin-bottom: 20rpx;

    color: #000;
  }
  &-content {
    font-size: 28rpx;

    display: flex;
    flex-wrap: wrap;

    color: #666;
    &-item {
      line-height: 1;

      display: flex;
      align-items: center;

      margin-right: 30rpx;
      margin-bottom: 20rpx;
      &__icon {
        width: 26rpx;
        height: 26rpx;
        margin-right: 20rpx;
      }
    }
  }
  &-section {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 20rpx;
      }
      &__img {
        flex-shrink: 0;

        width: 240rpx;
        height: 160rpx;

        border-radius: 10rpx;
      }
      &__info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-evenly;

        height: 160rpx;
        padding: 0 20rpx;
        &-title {
          font-size: 30rpx;
          font-weight: 600;

          color: #202020;
        }
        &-desc {
          font-size: 26rpx;

          color: #9a9a9a;
        }
        &-price {
          font-size: 30rpx;

          color: #fe7216;
          &-t {
            font-size: 22rpx;

            margin-left: -5rpx;
          }
        }
      }
      &__btn {
        font-size: 30rpx;
        line-height: 54rpx;

        flex-shrink: 0;

        width: 100rpx;

        text-align: center;

        color: #fff;
        border-radius: 5rpx;
        background: #fe7216;
      }
    }
  }
}

</style>

<config>
{
  navigationBarTitleText: '场馆详情',
  usingComponents: {
    default: '~@/components/default',
  }
}
</config>
