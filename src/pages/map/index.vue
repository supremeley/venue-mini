<template>
  <view>
    <map
      :longitude="iocation.longitude"
      :latitude="iocation.latitude"
      :markers="marker"
      :scale="20"
      show-location
      show-scale
      class="map"
    />
  </view>
</template>

<script>
import wepy from '@wepy/core';
// import api from '@/api/index';

wepy.page({
  data: {
    iocation: {
      longitude: 121.499758,
      latitude: 31.076106,
    },
    icon: {
      location: '/static/images/location.png',
    },
    marker: [
      {
        longitude: 121.499758,
        latitude: 31.076106,
        iconPath: '/static/images/location.png',
      },
    ],
  },
  onLoad(opt) {
    if (opt.longitude && opt.latitude) {
      this.location = { longitude: opt.longitude, latitude: opt.latitude };
    }
  },
});
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.map {
  width: 100vw;
  height: 100vh;
}

</style>
