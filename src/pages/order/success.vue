
<template>
  <view class="content">
    <image :src="icon.avatar" mode="aspectFit" class="content__icon" />
    <div class="content__status">预订成功</div>
    <div class="content__explain">Misss Han</div>
    <div class="content__company">扫码通过</div>
    <!-- <button class="btn">查看订单</button>
    <button class="btn back">返回列表</button>-->
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';

wepy.page({
  hooks: {},
  data: {
    icon: {
      avatar: '/static/images/avatar.png',
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
  padding: 160rpx 0;

  text-align: center;
  &__icon {
    width: 150rpx;
    height: 150rpx;
    margin-bottom: 60rpx;
  }
  &__status {
    font-size: 32rpx;
    font-weight: 600;

    margin-bottom: 115rpx;

    color: #202020;
  }
  &__explain {
    font-size: 50rpx;
    font-weight: 600;

    color: #fe7115;
  }
  &__company {
    font-size: 28rpx;

    position: fixed;
    bottom: 150rpx;
    left: 50%;

    transform: translate(-50%);

    color: #999;
  }
}

</style>

<config>
{
  navigationBarTitleText: '扫码成功'
}
</config>