
<template>
    <div>
        <waterfall :line-gap="200" :watch="items">
  <!-- each component is wrapped by a waterfall slot -->
        <waterfall-slot
            v-for="(item, index) in items"
            :width="item.width"
            :height="item.height"
            :order="index"
            :key="item.id"
        >
            <!--
            your component
            -->
            <img src="{{item.src}}" class="solt_img" alt="">
        </waterfall-slot>
        </waterfall>
    </div>
</template>
<style lang="less">
.solt_img {
    width: 100%;
    height: 100%;
}
</style>

<script>
import Waterfall from "vue-waterfall/lib/waterfall";
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";

export default {
  data() {
    return {
      items: [
        {
          name: "1.jpg",
          width: 275,
          height: 220,
          id: 1,
          src: "../statics/img/1.jpg"
        },
        {
          name: "2.jpg",
          width: 275,
          height: 220,
          id: 2,
          src: "../statics/img/2.jpg"
        },
        {
          name: "3.jpg",
          width: 275,
          height: 250,
          id: 3,
          src: "../statics/img/3.jpg"
        },
        {
          name: "4.jpg",
          width: 275,
          height: 320,
          id: 4,
          src: "../statics/img/4.jpg"
        },
        {
          name: "5.jpg",
          width: 275,
          height: 220,
          id: 5,
          src: "../statics/img/5.jpg"
        }
      ]
    };
  },
  components() {
    Waterfall, 
    WaterfallSlot
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>