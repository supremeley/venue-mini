
<template>
  <view>
    <!-- <search @link="jumpToSearch"></search> -->
    <view class="title">
      <van-dropdown-menu active-color="#fe7115" class="title">
        <van-dropdown-item title="位置区域" :value="value1" :options="option1" @change="changeA" />
        <van-dropdown-item
          title="教学场馆"
          :value="value2"
          :options="option2"
          :disabled="!option2.length"
          @change="changeB"
        />
        <van-dropdown-item title="时间排序" :value="value3" :options="option3" @change="changeC" />
      </van-dropdown-menu>
    </view>
    <view class="plate">
      <venue-list v-for="item in 10" :key="item" :item="item"></venue-list>
      <loading v-if="isLoading"></loading>
      <default v-if="!isLoading && !list.length"></default>
    </view>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';
import store from '@/store';
import { mapState } from '@wepy/x';
import scroll from '@/mixins/scroll';

wepy.page({
  store,
  hooks: {},
  mixins: [scroll],
  data: {
    isLoading: true,
    option1: [
      { text: '附近', value: '1000' },
      { text: '5km', value: '5000' },
      { text: '10km', value: '10000' },
      { text: '30km', value: '30000' },
      { text: '不限', value: null },
    ],
    option2: [],
    option3: [
      { text: '正序', value: false },
      { text: '倒序', value: true },
    ],
    value1: '1000',
    value2: '',
    value3: '',
    icon: {
      locationGray: '/static/images/location_gray.png',
    },
    list: [],
  },
  computed: {
    ...mapState(['location', 'area']),
  },
  watch: {
    area() {
      this.list = [];
      this.isLoading = true;
      this.reset();
      this.fetchInfo();
    },
  },
  methods: {
    jumpToSearch() {
      this.linkPage(`/pages/search/index`);
    },
    jumpToCourse(id) {
      this.linkPage(`/pages/course/detail`, { id });
    },
    changeA(e) {
      this.value1 = e.$wx.detail;
      this.change();
    },
    changeB(e) {
      this.value2 = e.$wx.detail;
      this.change();
    },
    changeC(e) {
      this.value3 = e.$wx.detail;
      this.change();
    },
    change() {
      this.reset();
      this.list = [];
      this.fetchList();
    },
    fetchInfo() {
      // this.fetchList();
      // this.getVenueList();
    },
    async fetchList() {
      // this.isLoading = true;
      // let data = {
      //   current: this.current,
      //   size: this.size,
      // };
      // if (Object.keys(this.area).length > 1) {
      //   data.area = this.area.code;
      // } else {
      //   data = {
      //     ...data,
      //     ...this.location,
      //   };
      // }
      // if (this.value1) {
      //   data.range = this.value1;
      // }
      // if (this.value2) {
      //   data.venueId = this.value2;
      // }
      // if (this.value3) {
      //   data.desc = 'id';
      // }
      // const {
      //   data: { total, data: list },
      // } = await api.GET_INDEX_COURSES_LIST(data);
      // this.list = this.list.concat(list);
      // this.isLoading = false;
      // if (total <= this.current * this.size) {
      //   this.canScroll = false;
      // }
    },
    async getVenueList() {
      let data = {};

      if (Object.keys(this.area).length > 1) {
        data = {
          area: this.area.code,
        };
      } else {
        data = {
          ...this.location,
        };
      }

      const {
        data: { total, data: list },
      } = await api.GET_VENUE_LIST(data);

      if (list.length) {
        this.option2 = list.map((item) => {
          return { ...item, text: item.name, value: item.id };
        });
      } else {
        this.option2 = [{ text: '附近暂无场馆', disabled: true, value: null }];
      }
    },
  },
  created() {
    this.list = [];
    this.isLoading = true;
    this.reset();
    this.fetchInfo();
  },
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.van-dropdown-menu {
  height: 100% !important;
  // border-bottom: 2rpx solid #ededed;
}
.title {
  // display: flex;
  // align-items: center;
  // justify-content: space-around;
  height: 70rpx;

  border-bottom: 2rpx solid #ededed;
  &-item {
    font-size: 30rpx;

    display: flex;
    align-items: center;
    justify-content: center;
    &__text {
      margin-right: 10rpx;
    }
    &__arrow {
      transform: translate(0, 25%);

      border: 8rpx solid #202020;
      border-color: #202020 transparent transparent transparent;
    }
  }
}
.plate {
  padding: 0 30rpx;
}

</style>

<config>
{
  navigationBarTitleText: '场馆预定',
  usingComponents: {
    search: '~@/components/search',
    loading: '~@/components/loading',
    default: '~@/components/default',
    "venue-list": '~@/components/venue-list',
    "van-dropdown-menu": "module:@vant/weapp/dist/dropdown-menu/index",
    "van-dropdown-item": "module:@vant/weapp/dist/dropdown-item/index",
  }
}
</config>
