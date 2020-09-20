
<template>
  <view class="wrap">
    <view class="header">
      <view class="header__info">
        <image :src="icon.title" mode="aspectFit" class="header__info-icon" />
        <text class="header__info-text">小鹿人篮球馆</text>
      </view>
    </view>
    <view class="plate">
      <view class="plate-header">所有场馆</view>
      <view class="plate-section">
        <view v-for="item in 10" :key="item" class="plate-section-item">
          <image :src="icon.bg" mode="aspectFill" class="plate-section-item__img" />
          <view class="plate-section-item__info">
            <view class="plate-section-item__info-title">小鹿人一号场地</view>
            <view class="plate-section-item__info-desc">靠近门口</view>
            <view class="plate-section-item__info-price">
              ￥300/
              <text class="plate-section-item__info-price-t">小时</text>
            </view>
          </view>
          <view class="plate-section-item__btn" @click="link">预定</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';

wepy.page({
  hooks: {},
  data: {
    icon: {
      title: '/static/images/title_icon.png',
      bg: '/static/images/bg.png',
    },
  },
  methods: {
    link() {
      this.goBack();
    },
    verify() {
      let msg;
      if (!this.form.smsCode) msg = '请填写验证码';
      if (!this.form.phone) msg = '请填写手机号';
      if (!this.form.customerAge) msg = '请填写年龄';
      if (!this.form.customerName) msg = '请填写姓名';

      if (msg) {
        this.toast(msg);
      } else {
        return true;
      }
    },
    async submit() {
      if (!this.verify()) return;

      const data = {
        ...this.form,
        courseId: this.id,
      };

      const res = await api.BOOK_COURSES(data);

      if (res.data.code === 200) {
        this.toast(res.data.msg, 'success', 2000, () => this.goBack());
      } else {
        this.toast(res.data.msg, 'fail');
      }
    },
  },
  onLoad(opt) {
    this.id = opt.id;
  },
  created() {},
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
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
      margin-right: 10rpx;
    }
    &-text {
      font-size: 34rpx;
      font-weight: 600;

      color: #202020;
    }
  }
}
.plate {
  box-sizing: border-box;
  margin-bottom: 20rpx;
  padding: 20rpx 30rpx;

  border-top: 20rpx solid #f3f3f3;
  background: #fff;

  &-header {
    font-size: 36rpx;
    font-weight: 600;

    margin-bottom: 20rpx;

    color: #000;
  }
  &-section {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 20rpx;
      }
      &__img {
        flex-shrink: 0;

        width: 240rpx;
        height: 160rpx;

        border-radius: 10rpx;
      }
      &__info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-evenly;

        height: 160rpx;
        padding: 0 20rpx;
        &-title {
          font-size: 30rpx;
          font-weight: 600;

          color: #202020;
        }
        &-desc {
          font-size: 26rpx;

          color: #9a9a9a;
        }
        &-price {
          font-size: 30rpx;

          color: #fe7216;
          &-t {
            font-size: 22rpx;

            margin-left: -5rpx;
          }
        }
      }
      &__btn {
        font-size: 30rpx;
        line-height: 54rpx;

        flex-shrink: 0;

        width: 100rpx;

        text-align: center;

        color: #fff;
        border-radius: 5rpx;
        background: #fe7216;
      }
    }
  }
}

</style>

<config>
{
  navigationBarTitleText: '选择场地'
}
</config>
