
<template>
  <view>
    <van-tabs color="#FE7115" animated sticky>
      <van-tab v-for="item in titleOption" :key="item.name" :title="item.name">
        <view class="section">
          <view v-for="item in 10" :key="item" class="list-item" @click="linkDetail">
            <view class="list-item-header">一号场地</view>
            <view class="list-item-content">
              <image :src="icon.bg" class="list-item-content__img" />
              <view class="list-item-content__info">
                <view v-for="info in 8" :key="info" class="list-item-content__info-item">
                  <view class="list-item-content__info-item__title">09:00</view>
                  <view>空闲</view>
                </view>
              </view>
            </view>
            <view class="list-item-bottom">
              <view class="list-item-bottom__left">
                <text>今日已接待</text>
                <text class="list-item-bottom__left-num">5</text>
                <text>场次</text>
              </view>
              <view class="list-item-bottom__box">
                <view class="list-item-bottom__btn book">预定</view>
                <view class="list-item-bottom__btn">启用</view>
              </view>
            </view>
          </view>
        </view>
      </van-tab>
    </van-tabs>
    <loading v-if="isLoading"></loading>
    <default v-if="!isLoading && !list.length"></default>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';
import scroll from '@/mixins/scroll';

wepy.page({
  mixins: [scroll],
  data: {
    isLoading: true,
    list: [],
    icon: {
      ring: '/static/images/ring.png',
      bg: '/static/images/bg.png',
    },
    titleOption: [
      {
        name: `全部`,
        type: 'all',
      },
      {
        name: '空闲',
        type: 'payment',
      },
      {
        name: '使用中',
        type: 'confirm',
      },
    ],
  },
  methods: {
    linkDetail(id) {
      this.linkPage(`/pages/manager/field/detail`, { id });
    },
    fetchInfo() {
      this.fetchList();
    },
    async fetchList() {
      this.isLoading = true;

      const data = {
        current: this.current,
        size: this.size,
      };

      const {
        data: { count, data: list },
      } = await api.GET_TEACHER_LIST(data);

      this.list = this.list.concat(list);

      this.isLoading = false;

      if (count <= this.current * this.size) {
        this.canScroll = false;
      }
    },
  },
  onShow() {
    // this.list = [];
    // this.isLoading = true;
    // this.reset();
    // this.fetchInfo();
  },
});
</script>

<style lang="scss" scoped>
.section {
  padding: 30rpx;
}
.list-item {
  position: relative;

  padding: 0 30rpx;

  border-radius: 10rpx;
  background: #fff;
  &:not(:last-child) {
    margin-bottom: 20rpx;
  }
  &-header {
    font-size: 34rpx;
    font-weight: 600;
    line-height: 100rpx;

    height: 100rpx;

    color: #202020;
  }
  &-content {
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    padding-bottom: 30rpx;

    border-bottom: 2rpx solid #f4f4f4;
    &__img {
      flex-shrink: 0;

      width: 190rpx;
      height: 160rpx;
      margin-right: 20rpx;

      border-radius: 10rpx;
    }

    &__info {
      display: flex;
      flex: 1;
      flex-wrap: wrap;

      &-item {
        font-size: 22rpx;

        width: 75rpx;
        height: 75rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;

        text-align: center;

        color: #fff;
        border-radius: 5rpx;
        background: #ccc;
        &__title {
          font-size: 24rpx;
        }
      }
    }
  }
  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 90rpx;
    &__left {
      font-size: 24rpx;

      color: #202020;
      &-num {
        margin: 0 5rpx;

        color: #fe7115;
      }
    }
    &__box {
      display: flex;
      align-items: center;
    }
    &__btn {
      font-size: 26rpx;
      line-height: 46rpx;

      width: 120rpx;
      margin-left: 20rpx;

      text-align: center;

      color: #fe7115;
      border: 2rpx solid #fe7115;
      border-radius: 25rpx;
    }
  }
}
.book {
  color: #0ebeff;
  border-color: #0ebeff;
}

</style>

<config>
{
  navigationBarTitleText: '场地管理',
  usingComponents: {
    loading: '~@/components/loading',
    default: '~@/components/default',
    "van-tab": "module:@vant/weapp/dist/tab/index",
    "van-tabs": "module:@vant/weapp/dist/tabs/index",
  }
}
</config>
