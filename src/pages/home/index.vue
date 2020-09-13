<template>
  <view class="wrap">
    <search @link="jumpToSearch"></search>
    <view class="quick">
      <image :src="icon.locationGray" mode="aspectFill" class="quick__img" />
      <view class="quick-content">
        <view class="quick-content-item">
          <text class="quick-content-item__text">日期</text>
          <text class="quick-content-item__date">2020-06-27</text>
          <image :src="icon.locationGray" mode="aspectFill" class="quick-content-item__icon" />
        </view>
        <view class="quick-content-item">
          <text class="quick-content-item__text">时间</text>
          <text class="quick-content-item__date">18:00</text>
          <image :src="icon.locationGray" mode="aspectFill" class="quick-content-item__icon" />
        </view>
        <button class="quick-content-btn">快速选馆</button>
      </view>
    </view>
    <view class="plate">
      <view class="plate-header">
        <text class="plate-header__title">附近场馆</text>
        <view class="plate-header__more" @click="switchTab('action')">
          <text>查看更多</text>
          <van-icon name="arrow" />
        </view>
      </view>
      <view class="plate-content">
        <venue-list v-for="item in 10" :key="item" :item="item"></venue-list>
      </view>
      <loading v-if="isLoading"></loading>
    </view>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import { mapState, mapMutations } from '@wepy/x';
import store from '@/store';
import api from '@/api/index';
import scroll from '@/mixins/scroll';

wepy.page({
  store,
  mixins: [scroll],
  data: {
    isLoading: true,
    list: [],
    loc: {},
    icon: {
      locationGray: '/static/images/location_gray.png',
    },
  },
  computed: {
    ...mapState(['location']),
  },
  watch: {
    location() {
      // this.fetchList();
    },
  },
  methods: {
    ...mapMutations(['saveLocation']),
    // link(type, id) {
    //   let url = `/pages/${ype}/detail`;
    //   this.linkPage(url, { id });
    // },
    jumpToSearch() {
      this.linkPage(`/pages/search/index`);
    },
    switchTab(url) {
      wx.switchTab({ url: `/pages/${url}/index` });
    },
    fetchInfo() {
      // this.getIndexDash();
      // this.fetchList();
    },
    async fetchList() {
      // const data = {
      //   current: this.current,
      //   size: this.size,
      //   ...this.loc,
      // };
      // const {
      //   data: { total, data: course },
      // } = await api.GET_INDEX_COURSES_LIST(data);
      // this.course = this.course.concat(course);
      // if (total <= this.current * this.size) {
      //   this.canScroll = false;
      // }
    },
    async getIndexDash() {
      const {
        data: {
          data: { coachs, hots, banners },
        },
      } = await api.GET_INDEX_DASH();

      this.coachs = coachs;
      this.hots = hots;
      this.banners = banners;
      this.isLoading = false;
    },
    async setLocation() {
      const data = {
        ...this.loc,
        code: 'GEOCODE',
        prantId: 0,
      };

      const {
        data: {},
      } = await api.SET_LOCATION(data);
    },
    getLocation() {
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          const distancelat = res.latitude;
          const distancelong = res.longitude;
          this.loc = { distancelat, distancelong };
          this.saveLocation(this.loc);
          wx.setStorageSync('location', this.loc);
        },
      });
    },
  },
  created() {
    this.loc = wx.getStorageSync('location');

    if (!Object.keys(this.loc).length) {
      this.loc = this.location;
      this.getLocation();
    }

    this.fetchInfo();
  },
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.wrap {
  padding-bottom: 30rpx;
}
.swiper {
  box-sizing: border-box;
  width: 100%;
  margin: 20rpx 0;
  padding: 0 30rpx;
  &-item {
    width: 100%;
    height: 300rpx;
    &__img {
      width: 100%;
      height: 100%;

      border-radius: 10rpx;
    }
  }
}
.quick {
  padding: 0 30rpx;

  &__img {
    width: 100%;
    height: 340rpx;
    margin-bottom: 20rpx;

    border-radius: 10rpx;
  }
  &-content {
    margin-bottom: 20rpx;
    padding: 30rpx 20rpx;

    border-radius: 10rpx;
    box-shadow: 0 5rpx 5rpx rgba(0, 0, 0, .2);
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      height: 90rpx;

      border-bottom: 2rpx solid #efefef;
      &__text {
        font-size: 32rpx;

        flex-basis: 120rpx;

        color: #666;
      }
      &__date {
        font-size: 36rpx;

        flex: 1;

        color: #fe7115;
      }
      &__icon {
        width: 32rpx;
        height: 32rpx;
      }
    }
    &-btn {
      font-size: 36rpx;
      line-height: 90rpx;

      width: 630rpx;
      height: 90rpx;
      margin-top: 30rpx;

      color: #fff;
      border-radius: 45rpx;
      background: #fe7115;
      &::after {
        border: none;
      }
    }
  }
}
.plate {
  margin: 20rpx 0;
  padding: 0 30rpx;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20rpx;
    &__title {
      font-size: 36rpx;
      font-weight: 600;
    }
    &__more {
      font-size: 26rpx;

      display: flex;
      align-items: center;

      color: #9a9a9a;
    }
  }
}

</style>

<config>
{
  usingComponents: {
    search: '~@/components/search',
    loading: '~@/components/loading',
    "venue-list": '~@/components/venue-list',
    "van-icon": "module:@vant/weapp/dist/icon/index"
  }
}
</config>
