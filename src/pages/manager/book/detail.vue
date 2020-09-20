
<template>
  <view>
    <view class="header">
      <view class="header__info">
        <image :src="icon.title" mode="aspectFill" class="header__info-icon" />
        <text class="header__info-text">小鹿人篮球馆</text>
      </view>
      <text class="header__status">已签到</text>
    </view>
    <view class="content">
      <image :src="icon.bg" class="content__img" />
      <view class="content__info">
        <view class="content__info-title">小鹿人1号场</view>
        <view class="content__info-date">2018-07-19</view>
        <view class="content__info-desc">
          <text>共计3小时</text>
          <view class="content__info-desc__price">
            <text class="content__info-desc__price-tag">￥</text>
            <text class="content__info-desc__price-num">900.00</text>
          </view>
        </view>
      </view>
    </view>
    <view class="session">
      <view class="session-header">预定信息</view>
      <view class="session-content">
        <view>客户姓名</view>
        <view>联系电话</view>
        <view>备注信息</view>
      </view>
    </view>
    <view class="session">
      <view class="session-header">订单信息</view>
      <view class="session-content">
        <view>订单编号</view>
        <view>下单时间</view>
        <view>支付时间</view>
        <view>入场时间</view>
      </view>
    </view>
    <button class="btn">确认订单</button>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';

wepy.page({
  data: {
    list: [],
    icon: {
      title: '/static/images/title_icon.png',
      bg: '/static/images/bg.png',
    },
  },
  methods: {
    link(type, id) {
      let url = `/pages/${type}/detail`;
      this.linkPage(url, { id });
    },
    fetchInfo() {
      // this.getTeacherDetail();
      // this.getCourseList();
    },
    async getTeacherDetail() {
      const data = {
        id: this.id,
      };

      const {
        data: { data: fetchData },
      } = await api.GET_TEACHER_DETAIL(this.id, data);

      this.fetchData = fetchData;
    },
    async getCourseList() {
      const data = {
        type: 'hot',
        coachId: this.id,
      };

      const {
        data: { data: courseList },
      } = await api.GET_RECOMMEND_BY_TEACHER(data);

      this.courseList = courseList;
    },
  },
  onLoad(opt) {
    this.id = opt.id;
  },
  onShow() {
    this.fetchInfo();
  },
  onShareAppMessage(e) {
    return {
      title: this.fetchData.name,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100rpx;
  padding: 0 30rpx;

  border-top: 2rpx solid #ededed;
  background: #fff;
  &__info {
    display: flex;
    align-items: center;

    color: #ccc;
    &-icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 20rpx;
    }
    &-text {
      font-size: 34rpx;
      font-weight: 600;

      color: #202020;
    }
  }
  &__status {
    font-size: 26rpx;

    color: #fe7115;
  }
}
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 220rpx;
  margin: 20rpx 0;
  padding: 0 30rpx;

  background: #fff;

  &__img {
    width: 240rpx;
    height: 160rpx;
    margin-right: 20rpx;

    border-radius: 10rpx;
  }
  &__info {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-evenly;

    height: 160rpx;
    &-title {
      font-size: 30rpx;
      font-weight: 600;

      color: #202020;
    }
    &-date {
      font-size: 26rpx;

      color: #999;
    }
    &-desc {
      font-size: 22rpx;

      display: flex;
      align-items: center;
      justify-content: space-between;

      color: #999;
      &__price {
        line-height: 1;

        display: flex;
        align-items: baseline;

        color: #202020;
        &-num {
          font-size: 30rpx;
          font-weight: 600;
        }
      }
    }
  }
}
.session {
  margin: 20rpx 0;
  padding: 0 30rpx;

  background: #fff;
  &-header {
    font-size: 34rpx;
    font-weight: 600;
    line-height: 90rpx;

    border-bottom: 2rpx solid #ededed;
  }
  &-content {
    font-size: 30rpx;
    line-height: 60rpx;

    padding: 30rpx 0;

    color: #666;
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
  navigationBarTitleText: '预定详情'
}
</config>
