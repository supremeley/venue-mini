<template>
  <view class="header">
    <!-- <view class="location-container" @click="showPopup">
      <image :src="icon.location" class="location-icon" />
      <text>{{area.name}}</text>
    </view> -->
    <view class="search-container" @click="handleClick">
      <image :src="icon.search" class="search-icon" />
      <input
        v-model="searchStr"
        type="text"
        placeholder="请输入关键词查找"
        confirm-type="search"
        @confirm.stop="search"
      />
    </view>
    <van-popup :show="show" position="bottom" @close="cancel">
      <van-picker
        :columns="columns"
        :loading="loading"
        value-key="name"
        show-toolbar
        @change="onChange"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import { mapState, mapMutations } from '@wepy/x';
import store from '@/store';
import api from '@/api/index';

wepy.component({
  store,
  data: {
    loading: true,
    show: false,
    searchStr: '',
    // columns: {
    //   province_list: {},
    //   city_list: {},
    //   county_list: {},
    // },
    columns: [
      {
        values: [],
      },
      {
        values: [],
      },
      {
        values: [],
      },
    ],
    icon: {
      search: '/static/images/search.png',
      location: '/static/images/location.png',
    },
  },
  computed: {
    ...mapState(['area']),
  },
  events: {
    // 'index-broadcast': (...args) => {
    //   let $event = args[args.length - 1]
    //   console.log(`${this.$name} receive ${$event.name} from ${$event.source.name}`)
    // }
  },
  methods: {
    ...mapMutations(['setArea']),
    onChange(e) {
      const {
        index,
        value: [arr1, arr2],
      } = e.$wx.detail;

      if (index == 0) {
        const { code, name } = arr1;
        this.setLocation(1, code, true);
      }

      if (index == 1) {
        const { code, name } = arr2;
        this.setLocation(2, code, true);
      }
    },
    confirm(e) {
      this.show = false;
      const { value } = e.$wx.detail;
      const area = value[value.length - 1] || value[1];
      this.setArea(area);
    },
    cancel() {
      this.show = false;
    },
    handleClick() {
      this.$emit('link');
    },
    search() {
      this.$emit('search', this.searchStr);
    },
    async showPopup() {
      this.show = !this.show;
      if (this.show) this.setLocation(0, 0, true);
    },
    async setLocation(i, code, next) {
      const data = {
        // ...this.location,
        // code: 'GEOCODE',
        code,
      };
      const {
        data: { data: list },
      } = await api.SET_LOCATION(data);
      const values = list;
      if (values.length) {
        this.$set(this.columns, i, { values });
        if (next && i != 2) {
          this.setLocation(i + 1, values[0].code);
        }
      }

      this.loading = false;
    },
  },
});
</script>

<style lang="scss">
.header {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 60rpx;
  padding: 20rpx 30rpx;
}
.location {
  &-container {
    font-size: 28rpx;

    display: flex;
    align-items: center;
    flex-shrink: 0;

    margin-right: 30rpx;
  }
  &-icon {
    width: 24rpx;
    height: 24rpx;
    margin-right: 10rpx;
  }
}
.search {
  &-container {
    font-size: 28rpx;

    display: flex;
    align-items: center;
    flex: 1;

    box-sizing: border-box;
    width: 560rpx;
    height: 60rpx;
    padding: 0 30rpx;

    border-radius: 30rpx;
    background: #eee;
  }
  &-icon {
    width: 28rpx;
    height: 28rpx;
    margin-right: 20rpx;
  }
}
// .area {
//   position: absolute;
//   z-index: 1;
//   top: 100%;
//   left: 0;

//   width: 100%;
// }

</style>

<config>
{
  usingComponents: {
    "van-popup": "module:@vant/weapp/dist/popup/index",
    "van-picker": "module:@vant/weapp/dist/picker/index"
  }
}
</config>
