
<template>
  <view>
    <swiper :interval="3000" autoplay circular class="swiper">
      <swiper-item v-for="item in 10" :key="item" class="swiper-item" @click="link">
        <image :src="item.url" mode="aspectFill" class="swiper-item__img" />
      </swiper-item>
    </swiper>

    <view class="title">
      <view>
        <view>
          <view>第一球场</view>
          <view>第一球场</view>
        </view>
        <view>
          <image :src="item.url" mode="aspectFill" class="swiper-item__img" />
          <text>123</text>
        </view>
      </view>
      <view>
        <view>
          <view>第一球场</view>
          <view>第一球场</view>
        </view>
        <image :src="item.url" mode="aspectFill" class="swiper-item__img" />
      </view>
      <view>
        <text>021-22222</text>
        <image :src="item.url" mode="aspectFill" class="swiper-item__img" />
      </view>
    </view>

    <!-- <default ></default> -->
  </view>
</template>

<script>
import wepy from '@wepy/core';
import api from '@/api/index';
import { mapState, mapMutations } from '@wepy/x';
import store from '@/store';

wepy.page({
  store,
  data: {
    icon: {
      avatar: '/static/images/avatar.png',
    },
  },
  computed: {
    ...mapState(['students', 'activeId']),
  },
  methods: {
    ...mapMutations(['setActiveId']),
    link() {
      this.linkPage();
    },
    async changeStudent(info) {
      const res = await api.SWITCH_STUDENT(info.id);
      if (res.data.code === 200) {
        this.toast(res.data.msg, 'success');
        wx.setStorageSync('memberInfo', info);
        this.setActiveId(info.id);
      }
    },
  },
  onShow() {},
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.swiper {
  box-sizing: border-box;
  width: 100%;
  margin: 20rpx 0;
  padding: 0 30rpx;
  &-item {
    width: 100%;
    height: 340rpx;
    &__img {
      width: 100%;
      height: 100%;

      border-radius: 10rpx;
    }
  }
}

</style>

<config>
{
  navigationBarTitleText: '场馆详情',
  usingComponents: {
    default: '~@/components/default',
  }
}
</config>
