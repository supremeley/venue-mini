
<template>
  <view class="wrap">
    <image :src="icon.registerBg" class="bg" />
    <view class="content">
      <view class="content-header">大班外教篮球课</view>
      <view class="content-form">
        <view class="content-form-item">
          <view class="content-form-item__title">姓名</view>
          <view class="content-form-item__content">
            <input
              v-model="form.customerName"
              type="text"
              placeholder="请输入姓名"
              placeholderClass="placeholder"
              class="content-form-item__content-inp"
            />
          </view>
        </view>
        <view class="content-form-item">
          <view class="content-form-item__title">年龄</view>
          <view class="content-form-item__content">
            <input
              v-model="form.customerAge"
              type="number"
              placeholder="请输入年龄"
              placeholderClass="placeholder"
              class="content-form-item__content-inp"
            />
          </view>
        </view>
        <view class="content-form-item">
          <view class="content-form-item__title">有无基础</view>
          <view class="content-form-item__content">
            <view
              v-for="item in selectOption"
              :key="item.name"
              class="content-form-item__content-radio"
              @click="select('select', item.name)"
            >
              <view
                :class="{'in-circle': item.name === form.basis}"
                class="content-form-item__content-radio-circle"
              ></view>
              <text class="content-form-item__content-radio-text">{{item.name}}</text>
            </view>
          </view>
        </view>
        <view class="content-form-item">
          <view class="content-form-item__title">您觉得孩子的体质如何</view>
          <view class="content-form-item__content">
            <view
              v-for="item in baiseOption"
              :key="item.name"
              class="content-form-item__content-radio"
              @click="select('baise', item.name)"
            >
              <view
                :class="{'in-circle': item.name === form.physique}"
                class="content-form-item__content-radio-circle"
              ></view>
              <text class="content-form-item__content-radio-text">{{item.name}}</text>
            </view>
          </view>
        </view>
        <view class="content-form-item">
          <view class="content-form-item__title">手机号</view>
          <view class="content-form-item__content">
            <input
              v-model="form.phone"
              type="number"
              placeholder="请输入您的手机号"
              placeholderClass="placeholder"
              class="content-form-item__content-inp"
            />
            <view class="content-form-item__content-code">
              <text v-if="!showTimer" @click="getSms">获取验证码</text>
              <text v-else>{{timeNum}}s</text>
            </view>
          </view>
        </view>
        <view class="content-form-item">
          <view class="content-form-item__title">验证码</view>
          <view class="content-form-item__content">
            <input
              v-model="form.smsCode"
              type="text"
              placeholder="请输入验证码"
              placeholderClass="placeholder"
              class="content-form-item__content-inp"
            />
          </view>
        </view>
        <view class="content-form-item">
          <view class="content-form-item__title">推广码</view>
          <view class="content-form-item__content">
            <input
              v-model="form.spreadCode"
              type="text"
              placeholder="请输入推广码"
              placeholderClass="placeholder"
              class="content-form-item__content-inp"
            />
          </view>
        </view>
      </view>
      <button class="btn" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';

wepy.page({
  hooks: {},
  data: {
    showTimer: false,
    timer: null,
    timeNum: 60,
    form: {
      basis: '无基础',
      customerName: '',
      customerAge: '',
      phone: '',
      physique: '良好',
      spreadCode: '',
      smsCode: '',
    },
    icon: {
      registerBg: '/static/images/register_bg.png',
    },
    selectOption: [
      {
        name: '无基础',
        type: 'n',
      },
      {
        name: '有基础',
        type: 'y',
      },
    ],
    baiseOption: [
      {
        name: '良好',
        type: 'a',
      },
      {
        name: '一般',
        type: 'b',
      },
      {
        name: '较差',
        type: 'c',
      },
    ],
  },
  methods: {
    countDown() {
      this.showTimer = true;

      this.timer = setInterval(() => {
        if (this.timeNum == 0) {
          clearInterval(this.timer);
          this.showTimer = false;
          this.timeNum = 60;
        }
        this.timeNum--;
      }, 1000);
    },
    select(type, status) {
      if (type == 'select') {
        this.form.basis = status;
      }

      if (type == 'baise') {
        this.form.physique = status;
      }
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
    async getSms() {
      let msg;
      if (!this.form.phone) msg = '请填写手机号';

      if (msg) {
        this.toast(msg);
        return true;
      }

      const data = {
        mobile: this.form.phone,
      };

      const res = await api.GET_SMS(data);

      if (res.data.code === 200) {
        this.countDown();
        // this.toast(res.data.msg, 'success', 5000);
        this.toast(res.data.msg, 'none', 5000);
      } else {
        this.toast(res.data.msg, 'fail');
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
.wrap {
  padding-bottom: 36rpx;
}
.bg {
  width: 100%;
  height: 520rpx;
}
.content {
  margin: 0 30rpx;
  padding: 55rpx 30rpx;

  transform: translate(0, -30rpx);

  border-radius: 10rpx;
  background: #fff;
  box-shadow: 0 5rpx 10rpx rgba(0, 0, 0, .1);
  &-header {
    font-size: 36rpx;
    font-weight: 600;

    margin-bottom: 20rpx;
  }
}
.content-form {
  margin-bottom: 50rpx;
  &-item {
    border-bottom: 2rpx solid #ededed;
    &__title {
      font-size: 34rpx;
      line-height: 86rpx;
    }
    &__content {
      display: flex;
      align-items: center;

      height: 86rpx;
      &-inp {
        flex: 1;
      }
      &-code {
        font-size: 30rpx;

        flex-basis: 200rpx;

        text-align: center;

        color: #fe7115;
        border-left: 2rpx solid #ededed;
      }
      &-radio {
        display: flex;
        align-items: center;
        flex: 1;
        &-circle {
          box-sizing: border-box;
          width: 32rpx;
          height: 32rpx;
          margin-right: 12rpx;

          border: 2rpx solid #bebebf;
          border-radius: 50%;
        }
        &-text {
          font-size: 30rpx;

          color: #666;
        }
      }
    }
  }
}
.in-circle {
  position: relative;

  border: 2rpx solid #fe7115;
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 12rpx;
    height: 12rpx;

    content: "";
    transform: translate(-50%, -50%);

    border-radius: 50%;
    background: #fe7115;
  }
}
.btn {
  font-size: 36rpx;
  line-height: 90rpx;

  width: 630rpx;
  height: 90rpx;

  color: #fff;
  border-radius: 45rpx;
  background: #fe7115;

  &::after {
    border: none;
  }
}
.placeholder {
  font-size: 30rpx;

  color: #ccc;
}

</style>


