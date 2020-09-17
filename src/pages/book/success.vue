
<template>
  <view class="content">
    <image :src="icon.book" mode="aspectFit" class="content__icon" />
    <div class="content__status">预订成功</div>
    <div class="content__explain">订单号：2022222222</div>
    <button class="btn">查看订单</button>
    <button class="btn back">返回列表</button>
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
      book: '/static/images/book_success.png',
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
page {
  background: #fff;
}
.content {
  padding: 130rpx 0;

  text-align: center;
  &__icon {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 75rpx;
  }
  &__status {
    font-size: 34rpx;
    font-weight: 600;

    margin-bottom: 40rpx;

    color: #202020;
  }
  &__explain {
    font-size: 28rpx;

    margin-bottom: 75rpx;

    color: #666;
  }
}
.btn {
  font-size: 36rpx;
  line-height: 90rpx;

  box-sizing: border-box;
  width: 630rpx;
  height: 90rpx;
  margin-bottom: 40rpx;

  color: #fff;
  border-radius: 45rpx;
  background: #fe7115;

  &::after {
    border: none;
  }
}
.back {
  line-height: 86rpx;

  color: #fe7115;
  border: 2rpx solid #fe7115;
  background: #fff;
}

</style>

<config>
{
  navigationBarTitleText: '支付完成'
}
</config>