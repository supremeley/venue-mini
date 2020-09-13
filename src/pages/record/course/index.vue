
<template>
  <view>
    <view class="plate">
      <view
        v-for="item in list"
        :key="item.id"
        class="list-item"
        @click="link('record/course/detail',item.id, item.classId)"
      >
        <image :src="item.headimg" class="list-item__img" />
        <view class="list-item__info">
          <view class="list-item__title">{{item.name}}</view>
          <view>
            <view class="list-item__desc">购买日期: {{item.orderTime}}</view>
            <view class="list-item__desc">学员姓名: {{item.studentName}}</view>
          </view>
          <view class="list-item__loc">
            <image :src="icon.locationGray" class="list-item__loc-icon" />
            <text>{{item.location}}</text>
          </view>
        </view>
        <view class="list-item__opt">
          <view class="list-item__opt-btn" @click.stop="link('operate/vacation',item.id, item.classId)">请假</view>
          <view class="list-item__opt-btn" @click.stop="link('operate/adjust',item.id, item.classId)">调课</view>
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
      locationGray: '/static/images/location_gray.png',
    },
  },
  methods: {
    link(type, id, cid) {
      let url = `/pages/${type}`;
      this.linkPage(url, { id, cid });
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

      let {
        data: { count, data: list },
      } = await api.GET_CLASS_BY_STUDENT(data);

      list = list.map((item) => {
        return {
          ...item,
          orderTime: item.orderTime.split(' ')[0],
        };
      });

      this.list = this.list.concat(list);

      this.isLoading = false;

      if (count <= this.current * this.size) {
        this.canScroll = false;
      }
    },
  },
  onShow() {
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
.plate {
  padding: 0 30rpx;

  border-top: 2rpx solid #eee;
  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 30rpx 0;

    border-bottom: 2rpx solid #f4f4f4;
    &__img {
      width: 180rpx;
      height: 200rpx;
      margin-right: 36rpx;

      border-radius: 10rpx;
    }
    &__info {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      height: 164rpx;
    }
    &__title {
      font-size: 30rpx;
      font-weight: 600;
    }
    &__desc {
      font-size: 26rpx;
      line-height: 36rpx;

      color: #9a9a9a;
    }
    &__loc {
      font-size: 24rpx;

      display: flex;
      align-items: center;

      color: #9a9a9a;
      &-icon {
        width: 22rpx;
        height: 22rpx;
        margin-right: 10rpx;
      }
    }
    &__opt {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      height: 200rpx;
      &-btn {
        font-size: 30rpx;
        font-weight: 400;
        line-height: 60rpx;

        width: 120rpx;
        margin-top: 20rpx;

        text-align: center;

        color: #fe7115;
        background: #fff1e7;
      }
    }
  }
}
</style>

<config>
{
  navigationBarTitleText: '我的课程',
  usingComponents: {
    loading: '~@/components/loading',
    default: '~@/components/default',
  }
}
</config>
