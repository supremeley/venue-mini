
<template>
  <view>
    <view class="list">
      <view v-for="(item, index) in list" :key="index" class="list-item">
        <view class="list-item__date">
          <view class="list-item__date-month">05.23</view>
          <view class="list-item__date-year">2020</view>
        </view>
        <view class="list-item__info">
          <view></view>
          <view></view>
        </view>
        <view class="list-item__content">
          <view class="list-item__content-top">
            <text class="list-item__content-top-name">{{item.name}}</text>
            <text class="list-item__content-top-item">12:13</text>
          </view>
          <view class="list-item__content-dese">xxxxxxxxxxxxxxxxx</view>
        </view>
      </view>
    </view>
    <button class="btn" @click="jumpToBook">新增联系记录</button>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';
import scroll from '@/mixins/scroll';

wepy.page({
  hooks: {},
  mixins: [scroll],
  data: {
    id: null,
    list: [
      {
        title: '大班',
        name: '张三',
        age: '5岁',
        tag: '有基础',
        date: '2020-06-24',
        mobile: '13711111111',
        record: '1',
      },
      {
        title: '大班',
        name: '张三',
        age: '5岁',
        tag: '有基础',
        date: '2020-06-24',
        mobile: '13711111111',
        record: '1',
      },
      {
        title: '大班',
        name: '张三',
        age: '5岁',
        tag: '有基础',
        date: '2020-06-24',
        mobile: '13711111111',
        record: '1',
      },
    ],
    icon: {
      phone: '/static/images/phone.png',
    },
  },
  computed: {},
  methods: {
    jumpToBook() {
      this.linkPage(`/pages/manager/contact/index`, { id: this.id });
    },
    fetchInfo() {
      this.fetchList();
    },
    async fetchList() {
      const data = {
        current: this.current,
        size: this.size,
        desc: 'create_time',
      };
      const {
        data: { count, data: list },
      } = await api.GET_COURSE_MANAGER_LIST(data);
      // this.list = this.list.concat(list);
      if (count <= this.current * this.size) {
        this.canScroll = false;
      }
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
.list {
  padding: 30rpx;
  &-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    margin-bottom: 40rpx;
    &__date {
      flex-shrink: 0;
      &-month {
        font-size: 36rpx;
        font-weight: 600;

        margin-bottom: 12rpx;
      }
      &-year {
        font-size: 24rpx;
      }
    }
    &__info {
      flex-basis: 60rpx;
    }
    &__content {
      flex: 1;

      box-sizing: border-box;
      min-height: 200rpx;
      padding: 24rpx;

      border-radius: 10rpx;
      background: #fff;
      &-top {
        display: flex;
        align-items: center;

        margin-bottom: 12rpx;
        &-name {
          font-size: 36rpx;
          font-weight: 600;
        }
      }
    }
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
  navigationBarTitleText: '约课联系记录',
}
</config>
