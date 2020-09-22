<template>
  <view>
    <scroll-view :scroll-into-view="'a'" scroll-x scroll-with-animation enable-flex class="title">
      <view v-for="item in 20" :key="item" class="title-item">
        <view class="title-item__head">今天</view>
        <view class="title-item__date">7月20日</view>
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
  navigationBarTitleText: '提交预定',
  usingComponents: {
    calendar: '~@/components/calendar',
  }
}
</config>
