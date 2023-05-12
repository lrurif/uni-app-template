<template>
    <view :class="['nav-wrapper', fixed?'fixed':null]">
        <view :style="'height: '+statusBarHeight+'rpx;'"></view>
        <view :style="'height: '+navHeight+'rpx;'" class="nav-bar">
            <slot></slot>
        </view>
    </view>
</template>

<script>
import { getScreenData } from "@/utils/screen.js"

export default {
    data() {
        return {
            statusBarHeight: 20,
            navHeight: 40,
        };
    },
    props: {
        fixed: {
            type: Boolean,
            default: false,
        }
    },
    methods: {},
    mounted() {
        const { statusBarHeight, navHeight} = getScreenData();
        this.statusBarHeight = statusBarHeight;
        this.navHeight = navHeight;
    },
    }
</script>
<style lang='scss' scoped>
.nav-wrapper {
    width: 100%;
    background: #fff;
    &.fixed {
		position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
    }
    .nav-bar {
        display: flex;
        align-items: center;
    }
}
</style>