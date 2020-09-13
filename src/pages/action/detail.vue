
<template>
  <view class="container">
    <swiper class="swiper">
      <swiper-item
        v-for="item in fetchData.attachs"
        :key="item.id"
        :interval="3000"
        autoplay
        circular
        class="swiper-item"
      >
        <image :src="item.url" mode="aspectFit" class="swiper-item__img" />
      </swiper-item>
    </swiper>
    <!-- <image :src="fetchData.headImg" mode="aspectFit" class="swiper-item__img" /> -->
    <view class="section">
      <view class="section-header">
        <text class="section-header__title">{{fetchData.name}}</text>
      </view>
      <!-- <view class="section-content">{{fetchData.intro}}</view>
      <view class="location">
        <view class="location-content">
          <view class="location-content__title">{{fetchData.address}}</view>
          <view class="location-content__text">{{fetchData.campus}}</view>
        </view>
        <view class="location-btn" @click="linkMap(fetchData.latitude,fetchData.longitude)">导航</view>
      </view>-->
    </view>
    <!-- <van-tabs color="#FE7115" animated>
      <van-tab v-for="item in titleOption" :key="item.name" :title="item.name">
        <view v-if="item.type=='detail'">
          <view class="section">
            <view class="section-header">
              <text class="section-header__title">{{fetchData.name}}</text>
            </view>
            <view class="section-content">{{fetchData.intro}}</view>
            <view class="location">
              <view class="location-content">
                <view class="location-content__title">{{fetchData.address}}</view>
                <view class="location-content__text">{{fetchData.campus}}</view>
              </view>
              <view class="location-btn" @click="linkMap(fetchData.latitude,fetchData.longitude)">导航</view>
            </view>
          </view>
        </view>
      </van-tab>
    </van-tabs>-->
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';

wepy.page({
  data: {
    id: null,
    fetchData: {},
    titleOption: [
      {
        name: `课程详情`,
        type: 'detail',
      },
    ],
    icon: {
      arrowCircle: '/static/images/arrow_circle.png',
    },
  },
  methods: {
    link(type, id) {
      const url = `/pages/${type}/detail`;
      this.linkPage(url, { id });
    },
    fetchInfo() {
      this.getActionDetail();
    },
    async getActionDetail() {
      const {
        data: { data: fetchData },
      } = await api.GET_ACTION_DETAIL(this.id);

      this.fetchData = fetchData;
    },
  },
  onLoad(opt) {
    this.id = opt.id;
  },
  onShow() {
    this.fetchInfo();
  },
});
</script>

<style lang="scss" scoped>
.container {
  // padding-bottom: 200rpx;
  background: #fff;
}
.swiper {
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 50px);
  &-item {
    width: 100%;
    height: calc(100vh - 50px);
    &__img {
      width: 100%;
      height: 100%;
    }
  }
}
.swiper-item__img {
  width: 100%;
  height: 100%;
}
.section {
  padding: 0 30rpx;

  background: #fff;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 100rpx;
    &__title {
      font-size: 36rpx;
      font-weight: 600;
    }
  }
  &-content {
    font-size: 26rpx;
    line-height: 32rpx;

    padding-bottom: 40rpx;

    color: #9a9a9a;
    border-bottom: 2rpx solid #ededed;
  }
}
.location {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 130rpx;
  &-content {
    &__title {
      font-size: 28rpx;
      font-weight: 600;
    }
    &__text {
      font-size: 24rpx;

      color: #9a9a9a;
    }
  }
  &-btn {
    font-size: 30rpx;
    font-weight: 400;
    line-height: 60rpx;

    width: 120rpx;

    text-align: center;

    color: #fe7115;
    background: #fff1e7;
  }
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 264rpx;
  padding: 0 30rpx;

  border-top: 20rpx solid #ededed;
  background: #fff;
  &-info__title {
    font-size: 26rpx;

    margin-right: 40rpx;

    color: #9a9a9a;
  }
  &-info__text {
    font-size: 26rpx;
  }
}
.plate {
  // padding: 40rpx 30rpx;
  border-top: 20rpx solid #ededed;
  background: #fff;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 40rpx;
    &__title {
      font-size: 36rpx;
      font-weight: 600;
      // margin-bottom: 30rpx;
    }
    &__more {
      font-size: 26rpx;

      color: #9a9a9a;
    }
  }
  &-content {
    display: flex;
    justify-content: space-between;
  }
  .list-item {
    width: 330rpx;
    padding: 40rpx 0 30rpx;

    text-align: center;

    border-radius: 10rpx;
    box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, .1);
    &__img {
      width: 155rpx;
      height: 155rpx;
      margin-bottom: 36rpx;

      border-radius: 50%;
    }
    &__title {
      font-size: 34rpx;
      font-weight: 600;
    }
    &__desc {
      font-size: 24rpx;

      margin: 24rpx 0;

      color: #9a9a9a;
    }
    &__detail {
      width: 56rpx;
      height: 56rpx;
    }
  }
}
.scroll-container {
  white-space: nowrap;
  .scroll-item {
    display: inline-block;

    margin-right: 20rpx;
    &__img {
      width: 270rpx;
      height: 190rpx;

      border-radius: 10rpx;
    }
  }
}
.end {
  padding-right: 0;
}
.schedule {
  padding: 30rpx 50rpx;
  &-title {
    font-size: 34rpx;
    font-weight: 600;
  }
  &-detail-item {
    font-size: 26rpx;
    line-height: 90rpx;

    text-indent: 50rpx;

    color: #666;
    border-bottom: 2rpx solid #ededed;
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
  navigationBarTitleText: '活动详情',
  usingComponents: {
    "van-tab": "module:@vant/weapp/dist/tab/index",
    "van-tabs": "module:@vant/weapp/dist/tabs/index",
    default: '~@/components/default',
  }
}
</config>
