
<template>
  <view class="wrap">
    <view class="header">
      <view class="header__info">
        <image :src="icon.title" mode="aspectFit" class="header__info-icon" />
        <text class="header__info-text">小鹿人篮球馆</text>
      </view>
    </view>
    <view class="section" @click="link">
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
    <view class="content">
      <view class="content-header">
        <text class="content-header__title">选择时间</text>
        <view class="content-header__opt">
          <text>共计:3小时</text>
          <van-icon name="arrow" class="arrow"></van-icon>
        </view>
      </view>
      <view class="content-info">
        <text>2020-06-27 13:00-14:00</text>
      </view>
    </view>
    <view class="content">
      <view class="content-header">
        <text class="content-header__title">选择时间</text>
        <view class="content-header__opt">
          <input type="number" placeholder="请输入您的联系电话" placeholder-class="placeholder" />
        </view>
      </view>
    </view>
    <view class="content">
      <view class="content-header">
        <text class="content-header__title">备注信息</text>
      </view>
      <view class="content-info">
        <textarea type="textarea" placeholder="请输入您的备注信息" placeholder-class="placeholder" />
      </view>
    </view>
    <view class="footer">
      <view class="footer-content">
        <view class="footer-content__text">合计:</view>
        <view class="footer-content__price">
          <text class="footer-content__price-tag">￥</text>
          <text class="footer-content__price-num">900</text>
        </view>
      </view>
      <button class="footer-btn" @click="submit">立即支付</button>
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
      this.linkPage('/pages/book/field');
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
      this.linkPage('/pages/book/success');

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
.wrap {
  padding-bottom: 120rpx;
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

.content {
  margin: 20rpx 0;
  padding: 0 30rpx;

  background: #fff;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 90rpx;
    &__title {
      font-size: 34rpx;
      font-weight: 600;

      color: #202020;
    }
    &__opt {
      font-size: 30rpx;
      line-height: 1;

      display: flex;
      align-items: center;

      color: #999;
    }
  }
  &-info {
    font-size: 30rpx;

    padding: 30rpx;

    color: #666;
    border-top: 2rpx solid #efefef;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 90rpx;

  transform: translate(-50%);

  background: #fff;
  &-content {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;

    padding: 0 30rpx;
    &__text {
      font-size: 30rpx;

      color: #202020;
    }
    &__price {
      display: flex;
      align-items: baseline;

      color: #f92828;
      &-tag {
        font-size: 26rpx;
        line-height: 1;
      }
      &-num {
        font-size: 36rpx;
        line-height: 1;
      }
    }
  }
  &-btn {
    font-size: 36rpx;
    line-height: 90rpx;

    flex-basis: 240rpx;

    height: 90rpx;

    color: #fff;
    border-radius: 0;
    background: #fe7115;
    &::after {
      border: none;
    }
  }
}
.placeholder {
  font-size: 30rpx;

  color: #ccc;
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