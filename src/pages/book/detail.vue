<template>
  <view>
    <scroll-view
      :scroll-into-view="'a'"
      scroll-x
      scroll-with-animation
      enable-flex
      class="title"
    >
      <view v-for="item in 20" :key="item" class="title-item">
        <view class="title-item__head">今天</view>
        <view class="title-item__date">7月20日</view>
      </view>
    </scroll-view>
    <scroll-view scroll-x scroll-y class="content">
      <view class="content-body">
        <view class="content-title">
          <view class="content-title__zh"></view>
          <view v-for="item in 6" :key="item" class="content-title__item">
            一号场
          </view>
        </view>
        <view v-for="item in 12" :key="item" class="content-body__item">
          <text class="content-body__item-title">09:00-</text>
          <view class="content-body__item-inner">
            <view
              v-for="item in 6"
              :key="item"
              class="content-body__item-inner__i"
              >$300</view
            >
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';
// import store from '@/store';
// import { mapState } from '@wepy/x';

wepy.page({
  // store,
  data: {
    canNum: 0,
    jiaNum: 0,
    cancelNum: 0,
    list: [],
  },
  computed: {
    // ...mapState(['calendar']),
  },
  watch: {},
  methods: {
    typeHandle(type) {
      switch (type) {
        case '已消':
          return 'cancel';
        case '请假':
          return 'jia';
        case '进行中':
          return 'can';
        default:
          return 'can';
      }
    },
  },
  onLoad(opt) {},
  onShow() {
    // this.init();
    // this.list = this.calendar.map((item) => {
    //   return {
    //     ...item,
    //     type: this.typeHandle(item.statusText),
    //     startTime: item.recordTime,
    //   };
    // });
    // let canNum = 0,
    //   jiaNum = 0,
    //   cancelNum = 0;
    // // console.log(this.list)
    // this.list.forEach((item) => {
    //   switch (item.type) {
    //     case 'cancel':
    //       cancelNum++;
    //       break;
    //     case 'jia':
    //       jiaNum++;
    //       break;
    //     case 'can':
    //       canNum++;
    //       break;
    //   }
    // });
    // this.canNum = canNum;
    // this.jiaNum = jiaNum;
    // this.cancelNum = cancelNum;
  },
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.title {
  display: flex;
  align-items: center;

  height: 120rpx;

  text-align: center;

  color: #202020;
  border-bottom: 2rpx solid #efefef;

  &-item {
    flex-basis: 160rpx;
    flex-shrink: 0;
    &__head {
      font-size: 28rpx;
      font-weight: 600;
      line-height: 40rpx;
    }
    &__date {
      font-size: 24rpx;
      line-height: 32rpx;
    }
  }
}
.content {
  // padding: 30rpx 0;

  height: 300rpx;
    position: relative;
  &-title {
    height: 100rpx;
    display: flex;
position: sticky;
top: 0;
line-height: 100rpx;
    align-items: stretch;
    // padding-left: 120rpx;
    margin-bottom: 10rpx ;
    &__zh {
      flex-basis: 120rpx;
      flex-shrink: 0;
    background: #fff;
position: relative;
z-index: 1;
    }
    &__item {
      flex-basis: 118rpx;
      padding: 0 2rpx;
      text-align: center;
    background: #fff;

      font-size: 28rpx;
      flex-shrink: 0;
      color: #666;
    }
  }
  &-body {
    &__item {
      display: flex;
      align-items: stretch;
      height: 60rpx;

      &-title {
        flex-basis: 120rpx;
        font-size: 28rpx;
        text-align: right;
        flex-shrink: 0;
        color: #202020;
        transform: translateY(calc(-50% - 2px));
    background: #fff;
        line-height: 60rpx;
      padding-bottom: 4rpx;
position: sticky;
left:0;
      }
      &-inner {
        display: flex;
        flex: 1;
        &__i {
          flex-basis: 120rpx;
          flex-shrink: 0;
          color: #fff;
          background: #1ad1a0;
          border-radius: 4rpx;
          margin: 0 2rpx 4rpx;
          text-align: center;
          line-height: 60rpx;
          font-size: 28rpx;
        }
      }
    }
  }
}
.cancel {
  color: #fff;
  background: #aaa;
}
.can {
  color: #fff;
  background: #1ad1a0;
}
.jia {
  color: #fff;
  background: #ff6c17;
}
</style>

<config>
{
  navigationBarTitleText: '提交预定'
}
</config>
