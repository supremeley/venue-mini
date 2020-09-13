<template>
  <view class="list-item" @click="link('venue', 1)">
    <view class="score_num">人气4.5</view>
    <image :src="icon.locationGray" mode="aspectFill" class="list-item__img" />
    <view class="list-item__title">
      <text class="list-item__title-left">浦江镇第一球场</text>
      <text class="list-item__title-right">可包场</text>
    </view>
    <view class="list-item__desc">
      <view class="list-item__desc-left">
        <image :src="icon.locationGray" mode="aspectFill" class="list-item__desc-left__icon" />
        <text>距离我3.2km</text>
      </view>
      <text class="list-item__desc-right">浦江镇1200号</text>
    </view>
  </view>
</template>

<script>
import wepy from '@wepy/core';

wepy.component({
  props: {
    item: {
      locationGray: '/static/images/location_gray.png',
    },
  },
  data: {
    icon: {
      locationGray: '/static/images/location_gray.png',
    },
  },
  methods: {
    link(type, id) {
      let url = `/pages/${ype}/detail`;
      this.linkPage(url, { id });
    },
  },
});
</script>

<style lang="scss">
.list-item {
  position: relative;
  &:not(:last-child) {
    margin-bottom: 20rpx;
  }
  &__img {
    width: 100%;
    height: 340rpx;
    margin-bottom: 20rpx;

    border-radius: 10rpx;
  }
  &__title {
    display: flex;
    overflow: hidden;
    align-items: center;

    margin-bottom: 20rpx;

    white-space: nowrap;
    text-overflow: ellipsis;
    &-left {
      font-size: 30rpx;
      font-weight: 600;

      margin-right: 20rpx;
    }
    &-right {
      font-size: 22rpx;
      line-height: 30rpx;

      padding: 0 10rpx;

      color: #fff;
      background: #fe7115;
    }
  }
  &__desc {
    font-size: 26rpx;

    display: flex;
    align-items: center;

    margin-bottom: 20rpx;

    color: #666;
    &-left {
      display: flex;
      align-items: center;

      margin-right: 20rpx;

      &__icon {
        width: 24rpx;
        height: 24rpx;
        margin-right: 10rpx;
      }
    }
    &-right {
      line-height: 1;

      overflow: hidden;

      padding: 0 20rpx;

      white-space: nowrap;
      text-overflow: ellipsis;

      border-left: 2rpx solid #666;
    }
  }
}
.score_num {
  font-size: 26rpx;
  line-height: 45rpx;

  position: absolute;
  top: 30rpx;
  right: 0;

  width: 140rpx;

  text-align: center;

  color: #fff;
  border-radius: 22.5rpx 0 0 22.5rpx;
  background: #fe7115;
}

</style>
