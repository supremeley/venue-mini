
<template>
  <view>
    <view class="section">
      <view v-for="item in 10" :key="item.id" class="list-item" @click="jumpToTeacher(item.id)">
        <image :src="icon.phone" mode="aspectFill" class="list-item__avatar" />
        <view class="list-item__content">
          <view class="list-item__title">name</view>
          <view class="list-item__desc">
            <image :src="icon.phone" mode="aspectFill" class="list-item__desc-icon" />
            <text class="list-item__desc-text">1378888888</text>
          </view>
        </view>
        <view class="list-item__btn">查看预定</view>
      </view>
    </view>
    <loading v-if="isLoading"></loading>
    <default v-if="!isLoading && !list.length"></default>
  </view>
</template>

<script>
import wepy from '@wepy/core';
// import api from '@/api/index';
import scroll from '@/mixins/scroll';

wepy.page({
  mixins: [scroll],
  data: {
    isLoading: true,
    list: [],
    icon: {
      phone: '/static/images/phone.png',
    },
  },
  methods: {
    jumpToTeacher(id) {
      this.linkPage(`/pages/teacher/detail`, { id });
    },
    fetchInfo() {
      this.fetchList();
    },
    async fetchList() {
      // this.isLoading = true;
      // const data = {
      //   current: this.current,
      //   size: this.size,
      // };
      // const {
      //   data: { count, data: list },
      // } = await api.GET_TEACHER_LIST(data);
      // this.list = this.list.concat(list);
      // this.isLoading = false;
      // if (count <= this.current * this.size) {
      //   this.canScroll = false;
      // }
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
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: 180rpx;
  height: 180rpx;
  padding: 0 30rpx;

  border-radius: 10rpx;
  background: #fff;
  &:not(:last-child) {
    margin-bottom: 20rpx;
  }
  &__avatar {
    flex-shrink: 0;

    width: 116rpx;
    height: 116rpx;
    margin-right: 20rpx;

    border-radius: 50%;
  }
  &__content {
    flex: 1;
  }
  &__title {
    font-size: 34rpx;
    font-weight: 600;

    margin-bottom: 20rpx;
  }
  &__desc {
    font-size: 30rpx;

    display: flex;
    overflow: hidden;
    align-items: center;

    color: #9a9a9a;
    &-icon {
      width: 28rpx;
      height: 28rpx;
      margin-right: 5rpx;
    }
    &-text {
      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  &__btn {
    font-size: 26rpx;
    line-height: 50rpx;

    flex-basis: 160rpx;
    flex-shrink: 0;

    text-align: center;

    color: #fe7115;
    border: 2rpx solid #fe7115;
    border-radius: 27rpx;
  }
}

</style>

<config>
{
  navigationBarTitleText: '客户管理',
  usingComponents: {
    loading: '~@/components/loading',
    default: '~@/components/default',
  }
}
</config>
