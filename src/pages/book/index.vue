
<template>
  <view class="wrap">
    <view class="header">
      <view class="header__info">
        <image :src="icon.title" mode="aspectFit" class="header__info-icon" />
        <text class="header__info-text">小鹿人篮球馆</text>
      </view>
    </view>
    <view class="section">
      <image :src="icon.bg" mode="aspectFill" class="section__img" />
      <view class="section__info">
        <view class="section__info-title">小鹿人一号场地</view>
        <view class="section__info-desc">靠近门口</view>
        <view class="section__info-price">
          ￥300/
          <text class="section__info-price-t">小时</text>
        </view>
      </view>
      <van-icon name="arrow" class="arrow"></van-icon>
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
.section {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 20rpx 0;
  padding: 30rpx;

  background: #fff;
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
}
.arrow {
  color: #999;
}

</style>


<config>
{
  navigationBarTitleText: '提交预定',
  usingComponents: {
    loading: '~@/components/loading',
    default: '~@/components/default',
    "van-icon": "module:@vant/weapp/dist/icon/index"
  }
}
</config>