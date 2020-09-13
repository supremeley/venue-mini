<template>
  <view>
    <view class="title">
      <view class="title-item">
        <view class="title-item__circle cancel"></view>
        <text class="title-item__text">已消:</text>
        <text class="title-item__num">{{cancelNum}}</text>
      </view>
      <view class="title-item">
        <view class="title-item__circle"></view>
        <text class="title-item__text">请假:</text>
        <text class="title-item__num">{{jiaNum}}</text>
      </view>
      <view class="title-item">
        <view class="title-item__circle can"></view>
        <text class="title-item__text">剩余:</text>
        <text class="title-item__num">{{canNum}}</text>
      </view>
    </view>
    <calendar type="show" :info="list"></calendar>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';
import store from '@/store';
import { mapState } from '@wepy/x';

wepy.page({
  store,
  data: {
    canNum: 0,
    jiaNum: 0,
    cancelNum: 0,
    list: [],
  },
  computed: {
    ...mapState(['calendar']),
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
    this.list = this.calendar.map((item) => {
      return {
        ...item,
        type: this.typeHandle(item.statusText),
        startTime: item.recordTime,
      };
    });

    let canNum = 0,
      jiaNum = 0,
      cancelNum = 0;
          // console.log(this.list)

    this.list.forEach((item) => {
      switch (item.type) {
        case 'cancel':
          cancelNum++;
          break;
        case 'jia':
          jiaNum++;
          break;
        case 'can':
          canNum++;
          break;
      }
    });

    this.canNum = canNum;
    this.jiaNum = jiaNum;
    this.cancelNum = cancelNum;
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
  justify-content: space-around;

  height: 140rpx;
  &-item {
    font-size: 26rpx;

    display: flex;
    align-items: center;

    color: #666;
    &__circle {
      width: 24rpx;
      height: 24rpx;
      margin-right: 10rpx;

      border-radius: 50%;
      background: #fe7115;
    }
    &__num {
      margin-left: 10rpx;

      color: #fe7115;
    }
  }
}
// .date {
//   text-align: center;
//   &-header {
//     font-size: 32rpx;
//     font-weight: 600;
//     line-height: 64rpx;
//   }
//   &-content {
//     font-size: 26rpx;

//     color: #666;
//     &__title {
//       display: flex;
//       align-items: center;
//       justify-content: space-evenly;

//       &-item {
//         line-height: 60rpx;

//         flex-basis: calc(100% / 7);
//       }
//     }
//     &__body {
//       display: flex;
//       align-items: center;
//       flex-wrap: wrap;
//       justify-content: space-evenly;

//       color: #9a9a9a;

//       &-item {
//         line-height: 60rpx;

//         display: flex;
//         flex-basis: calc(100% / 7);
//         justify-content: center;

//         text-align: center;
//         &__text {
//           width: 60rpx;

//           border-radius: 50%;
//         }
//       }
//     }
//   }
// }
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
  navigationBarTitleText: '课程日历',
  usingComponents: {
    calendar: '~@/components/calendar',
  }
}
</config>
