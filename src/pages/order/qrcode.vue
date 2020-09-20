
<template>
  <view class="content">
    <view class="content__header">小鹿人预定码</view>
    <image :src="icon.title" mode="aspectFit" class="content__icon" />
    <view class="content__explain">请向店员出事您的预定码</view>
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
  onShow() {
    setTimeout(() => {
      this.linkPage('/pages/order/success');
    }, 3000);
  },
});
</script>

<style lang="scss" scoped>
page {
  background: #fe7115;
}
.content {
  overflow: hidden;

  margin: 180rpx 30rpx;

  text-align: center;

// padding: 30rpx;

  border-radius: 20rpx;
  background: #fff;

  &__header {
    font-size: 36rpx;
    font-weight: 600;
    line-height: 126rpx;

    color: #fe7115;
    background: #f8f8f8;
  }
  &__icon {
    width: 260rpx;
    height: 260rpx;
    margin: 115rpx 0;
  }

  &__explain {
    font-size: 32rpx;

    margin-bottom: 140rpx;

    color: #999;
  }
}

</style>

<config>
{
  navigationBarTitleText: '扫码'
}
</config>