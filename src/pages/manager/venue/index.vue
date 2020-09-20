
<template>
  <view>
    <view class="section">
      <view v-for="item in 10" :key="item" class="list-item">
        <view class="list-item-tag">
          <image :src="icon.ring" class="list-item-tag__icon" />
          <text>5</text>
        </view>
        <view class="list-item-header">小鹿人篮球馆</view>
        <view class="list-item-content">
          <image :src="icon.bg" class="list-item-content__img" />
          <view class="list-item-content__circle">
            <van-circle :value="8" layer-color="#CCC" color="#FE7115" :size="70">
              <view>
                <view class="list-item-content__circle-num">8</view>
                <view class="list-item-content__circle-text">总场地</view>
              </view>
            </van-circle>
          </view>
          <view class="list-item-content__info">
            <view class="list-item-content__info-desc">
              <view class="list-item-content__info-desc__circle"></view>
              <text class="list-item-content__info-desc__text">空闲场地：</text>
              <text class="list-item-content__info-desc__num">3</text>
            </view>
            <view class="list-item-content__info-desc">
              <view class="list-item-content__info-desc__circle"></view>
              <text class="list-item-content__info-desc__text">已定场地：</text>
              <text class="list-item-content__info-desc__num">3</text>
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
            <view class="list-item-bottom__btn" @click="linkDetail(item.id)">场馆</view>
            <view class="list-item-bottom__btn" @click="linkField(item.id)">场地</view>
          </view>
        </view>
      </view>
    </view>
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
        name: '待支付',
        type: 'payment',
      },
      {
        name: '待确认',
        type: 'confirm',
      },
    ],
  },
  methods: {
    linkDetail(id) {
      this.linkPage(`/pages/manager/venue/detail`, { id });
    },
    linkField(id) {
      this.linkPage(`/pages/manager/field/index`, { id });
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
  &-tag {
    font-size: 34rpx;
    line-height: 1;

    position: absolute;
    top: 25rpx;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 120rpx;
    height: 45rpx;

    color: #fff;
    border-radius: 22.5rpx 0 0 22.5rpx;
    background: #fe7115;
    &__icon {
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
    }
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
    &__circle {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: center;

      padding: 0 40rpx;
      &-num {
        font-size: 40rpx;
        font-weight: 500;

        color: #202020;
      }
      &-text {
        font-size: 20rpx;

        color: #999;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      &-desc {
        display: flex;
        align-items: center;
        &__circle {
          width: 14rpx;
          height: 14rpx;
          margin-right: 10rpx;

          border-radius: 50%;
          background: #ccc;
        }
        &__text {
          font-size: 28rpx;

          color: #999;
        }
        &__num {
          font-size: 34rpx;

          color: #202020;
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

</style>

<config>
{
  navigationBarTitleText: '场馆管理',
  usingComponents: {
    loading: '~@/components/loading',
    default: '~@/components/default',
    "van-circle": "module:@vant/weapp/dist/circle/index"
  }
}
</config>
