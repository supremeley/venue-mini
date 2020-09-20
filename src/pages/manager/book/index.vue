
<template>
  <view>
    <van-tabs color="#FE7115" animated sticky>
      <van-tab v-for="item in titleOption" :key="item.name" :title="item.name">
        <view class="section">
          <view v-for="item in 10" :key="item" class="list-item" @click="linkDetail(item.id)">
            <view class="list-item-header">
              <view class="list-item-header__info">
                <image :src="icon.title" class="list-item-header__info-icon" />
                <text class="list-item-header__info-text">小鹿人篮球馆</text>
                <van-icon name="arrow" />
              </view>
              <text class="list-item-header__status">已签到</text>
            </view>
            <view class="list-item-content">
              <image :src="icon.bg" class="list-item-content__img" />
              <view class="list-item-content__info">
                <view class="list-item-content__info-title">小鹿人1号场</view>
                <view class="list-item-content__info-date">2018-07-19</view>
                <view class="list-item-content__info-desc">
                  <text>共计3小时</text>
                  <view class="list-item-content__info-desc__price">
                    <text class="list-item-content__info-desc__price-tag">￥</text>
                    <text class="list-item-content__info-desc__price-num">900.00</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="list-item-bottom">
              <text class="list-item-bottom__date">2019-05-25 17:30:30</text>
              <view class="list-item-bottom__box">
                <view class="list-item-bottom__btn cancel">取消</view>
                <view class="list-item-bottom__btn">确认</view>
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
      title: '/static/images/title_icon.png',
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
      this.linkPage(`/pages/manager/book/detail`, { id });
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
  padding: 0 30rpx;

  border-radius: 10rpx;
  background: #fff;
  &:not(:last-child) {
    margin-bottom: 20rpx;
  }
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 100rpx;
    &__info {
      line-height: 1;

      display: flex;
      align-items: center;

      color: #999;
      &-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 15rpx;
      }
      &-text {
        font-size: 34rpx;
        font-weight: 600;

        margin-right: 10rpx;

        color: #202020;
      }
    }
    &__status {
      font-size: 26rpx;

      color: #fe7115;
    }
  }
  &-content {
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    padding-bottom: 30rpx;

    border-bottom: 2rpx solid #f4f4f4;

    &__img {
      width: 240rpx;
      height: 160rpx;
      margin-right: 20rpx;

      border-radius: 10rpx;
    }
    &__info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-evenly;
      &-title {
        font-size: 30rpx;
        font-weight: 600;

        color: #202020;
      }
      &-date {
        font-size: 26rpx;

        color: #999;
      }
      &-desc {
        font-size: 22rpx;

        display: flex;
        align-items: center;
        justify-content: space-between;

        color: #999;
        &__price {
          line-height: 1;

          display: flex;
          align-items: baseline;

          color: #202020;
          &-num {
            font-size: 30rpx;
            font-weight: 600;
          }
        }
      }
    }
  }
  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 90rpx;
    &__date {
      font-size: 24rpx;

      color: #999;
    }
    &__box {
      display: flex;
      align-items: center;
    }
    &__btn {
      font-size: 26rpx;
      line-height: 46rpx;

      width: 120rpx;

      text-align: center;

      color: #fe7115;
      border: 2rpx solid #fe7115;
      border-radius: 25rpx;
    }
    .cancel {
      margin-right: 20rpx;

      color: #999;
      border-color: #999;
    }
  }
}

</style>

<config>
{
  navigationBarTitleText: '预定管理',
  usingComponents: {
    loading: '~@/components/loading',
    default: '~@/components/default',
    "van-icon": "module:@vant/weapp/dist/icon/index",
    "van-tab": "module:@vant/weapp/dist/tab/index",
    "van-tabs": "module:@vant/weapp/dist/tabs/index",
  }
}
</config>
