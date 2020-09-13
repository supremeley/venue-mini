
<template>
  <view>
    <search @search="search"></search>
    <view class="history">
      <view class="history-title">
        <text>历史搜索</text>
        <image :src="icon.delete" mode="aspectFill" class="history-title__icon" />
      </view>
      <view class="history-list">
        <view v-for="item in 10" :key="item" class="history-list-item">浦江镇</view>
      </view>
    </view>
    <view class="section">
      <scroll-view scroll-y class="content">
        <venue-list v-for="item in 10" :key="item" :item="item"></venue-list>
      </scroll-view>
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
  mixins: [scroll],
  data: {
    isLoading: true,
    list: [],
    searchStr: '',
    icon: {
      delete: '/static/images/location_gray.png',
    },
  },
  computed: {
    ...mapState(['location', 'area']),
  },
  watch: {
    area() {
      this.list = [];
      this.isLoading = true;
      this.reset();
      this.fetchList(this.searchStr);
    },
  },
  methods: {
    jumpToCourse(id) {
      this.linkPage(`/pages/course/detail`, { id });
    },
    async fetchList(searchStr) {
      // this.isLoading = true;
      // let data = {};
      // if (Object.keys(this.area).length > 1) {
      //   data = {
      //     searchStr,
      //     current: this.current,
      //     size: this.size,
      //     range: this.value1,
      //     area: this.area.code,
      //   };
      // } else {
      //   data = {
      //     searchStr,
      //     ...this.location,
      //     current: this.current,
      //     size: this.size,
      //     range: this.value1,
      //   };
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
    search(searchStr) {
      this.searchStr = searchStr;
      this.isLoading = true;
      this.list = [];
      this.reset();
      this.fetchList(searchStr);
    },
  },
  created() {
    this.search('');
  },
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.history {
  margin-top: 20rpx;
  padding: 0 30rpx;

  &-title {
    font-size: 28rpx;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 30rpx;

    color: #999;
    &__icon {
      width: 40rpx;
      height: 40rpx;
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    &-item {
      font-size: 26rpx;
      font-weight: 600;
      line-height: 60rpx;

      margin-right: 20rpx;
      margin-bottom: 20rpx;
      padding: 0 20rpx;

      color: #202020;
      background: #f6f6f6;
    }
  }
}
.section {
  margin-top: 2rpx;
}
.content {
  box-sizing: border-box;
  height: calc(100vh - 102rpx);
  padding: 0 30rpx;
}

</style>

<config>
{
  usingComponents: {
    search: '~@/components/search',
    loading: '~@/components/loading',
    default: '~@/components/default',
    "venue-list": '~@/components/venue-list',
  }
}
</config>
