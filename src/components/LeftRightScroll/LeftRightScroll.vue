<template>
    <view class="scroll-wrapper">
        <scroll-view class="left-wrapper" :scroll-y="true" :scroll-into-view="leftActiveId">
            <view :key="index" @click="handleLeftClick(index)" :id="'left-item-' + index"
                :class="[activeIndex === index ? 'active' : '', 'left-item']" v-for="(item, index) in categoryList">{{ item
                }}
            </view>
        </scroll-view>
        <view class="right-wrapper">
            <view :class="{
                ellipsis: true,
                fixed: true,
                'static-pos':  isFixed && !isShowTitle
            }" v-if="isFixed">{{ activeText }}</view>
            <scroll-view class="right__inner" :scroll-y="true" :scroll-top="rightScrollTop" @scroll="handleRightScroll"
            scroll-with-animation :show-scrollbar="false">
            <view v-for="(item, index) in goodsList" :key="index" class="right-item-wrapper">
                <view class="right-list-title ellipsis" v-if="isShowTitle">{{ item.title }}</view>
                <view class="goods-wrapper">
                    <view class="goods-item" v-for="cItem in item.children" :key="cItem.id">
                        <image :src="cItem.img" class="right-item-img" />
                        <view class="right-item-info">
                            <view class="title ellipsis">
                                {{ cItem.title }}
                            </view>
                            <view class="labels-wrapper">
                                <view class="label" v-for="label in cItem.labels" :key="label">
                                    {{ label }}
                                </view>
                            </view>
                            <view class="info__bottom">
                                <view class="price">
                                    <text class="unit">￥</text>{{ cItem.price }}
                                </view>
                                <view class="nums-btn">
                                    <image src="@/static/images/reduce.png" class="btn" />
                                    <view class="nums">1</view>
                                    <image src="@/static/images/add.png" class="btn" />
                                </view>
                            </view>

                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        </view>
        
    </view>
</template>

<script>
/**
 * goodsList ->
 * Array<{
 *  title: string,
 *  children: Array<{
 *      img: string
 *      title: string,
 *      labels: Array<string>
 *      price: number
 *  }>
 * }>
 */
export default {
    props: {
        goodsList: {
            required: true
        },
        isFixed: {
            type: Boolean,
            default: false,
        },
        isShowTitle: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            categoryList: [],
            activeIndex: 0, // 当前激活索引
            rightNodePos: [], // 右侧滚动距离列表
            rightScrollTop: null,
            leftActiveId: "", // 左侧激活id
            leftPending: false, // 防止点击左侧，触发滚动事件标志
            timer: null,
            activeText: "", // 固定位置展示内容
            curRightScrollTop: 0, // 当前滚动距离
        }
    },
    methods: {
        getPosition() {
            if (this.goodsList.length == 0) return;
            const query = uni.createSelectorQuery().in(this);
            query.selectAll('.right-item-wrapper').boundingClientRect(data => {
                let last = data[0].top
                let temp = data.map(item => {
                    let res = item.top - last;
                    last = item.top;
                    return res;
                })
                for (let i = 1; i < temp.length; i++) {
                    temp[i] = Math.round(temp[i] + temp[i - 1]);
                }
                this.rightNodePos = temp;
                this.getActiveText();
            }).exec();
        },
        handleLeftClick(index) {
            this.timer && clearTimeout(this.timer)
            // 处理点击左侧栏，右侧在滚动时会触发滚动事件的bug - start
            this.leftPending = true;
            this.timer = setTimeout(() => {
                this.leftPending = false;
            }, 500)
            // 处理点击左侧栏，右侧在滚动时会触发滚动事件的bug - end
            this.rightScrollTop = this.rightNodePos[index];
            // 处理点击左侧栏后，右侧移动一部分，然后再次点击同一个不触发更新 - start
            this.$nextTick(() => {
                this.rightScrollTop += 0.0001;
            })
            // 处理点击左侧栏后，右侧移动一部分，然后再次点击同一个不触发更新 - end
            this.activeIndex = index;
        },
        handleRightScroll(e) {
            this.curRightScrollTop = e.detail.scrollTop;
            this.getActiveText();
            if (this.leftPending) return;
            this.handleLeftActive(e.detail.scrollTop);
        },
        handleLeftActive(top) {
            this.activeIndex = this.getActiveIndex(top)
        },
        getActiveIndex(top) {
            let scrollTop = Math.round(top);
            for (let i = 0; i < this.rightNodePos.length - 1; i++) {
                let pre = this.rightNodePos[i];
                let cur = this.rightNodePos[i + 1];
                if (scrollTop >= pre && scrollTop < cur) {
                    return i;
                }
            }
            return (this.rightNodePos.length &&  this.rightNodePos.length - 1) || 0;
        },
        getActiveText() {
            if(!this.isFixed) return;
            let index = this.getActiveIndex(this.curRightScrollTop)
            this.activeText = this.goodsList[index].title;
        },
    },
    watch: {
        activeIndex(newVal) {
            this.leftActiveId = 'left-item-' + newVal;
        },
        goodsList() {
            this.getPosition();
            this.categoryList = this.goodsList.map(item => item.title);
        }
    },
    created() {
        setInterval(() => {
            console.log(this.rightNodePos);
        }, 5000)
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
.scroll-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    background: #fff;

    .left-wrapper {
        width: 160rpx;
        height: 100%;
        background: #F7F8FA;

        .left-item {
            padding: 40rpx 10rpx;
            text-align: center;
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #646566;

            &.active {
                background-color: #fff;
                font-weight: 500;
                color: #323233;
            }
        }
    }

    .right-wrapper {
        flex: 1;
        min-width: 0;
        height: 100%;
        padding: 20rpx 0 20rpx 20rpx;
        position: relative;
        .right__inner {
            height: 100%;
        }
        .fixed {
            position: absolute;
            left: 20rpx;
            top: 20rpx;
            padding: 10rpx 0;
            font-weight: bold;
            width: 100%;
            background: #fff;
            z-index: 10;
            &.static-pos {
                position: static;
            }
        }
        .right-list-title {
            padding: 10rpx 0;
            font-weight: bold;
            width: 100%;
        }

        .goods-wrapper {
            padding-right: 20rpx;

            .goods-item {
                display: flex;
                align-items: flex-start;
                padding: 10rpx 0;

                .right-item-img {
                    width: 190rpx;
                    height: 190rpx;
                    border-radius: 8rpx;
                }

                .right-item-info {
                    flex: 1;
                    min-width: 0;
                    margin-left: 16rpx;

                    .title {
                        font-size: 28rpx;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: bold;
                        color: #323233;
                        line-height: 38rpx;
                    }

                    .labels-wrapper {
                        margin-top: 10rpx;
                        display: flex;
                        flex-wrap: wrap;
                        border-radius: 4rpx;

                        .label {
                            background: #F2F3F5;
                            padding: 8rpx 2rpx;
                            font-size: 20rpx;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: #323233;
                            line-height: 28rpx;

                            &:not(:first-child) {
                                margin-left: 20rpx;
                            }
                        }
                    }

                    .info__bottom {
                        margin-top: 40rpx;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .price {
                            font-size: 28rpx;
                            font-family: Avenir-Heavy, Avenir;
                            font-weight: 800;
                            color: #EE0A24;
                            line-height: 32rpx;

                            .unit {
                                font-size: 24rpx;
                            }
                        }

                        .nums-btn {
                            display: flex;
                            align-items: center;

                            .btn {
                                width: 48rpx;
                                height: 48rpx;
                            }

                            .nums {
                                margin: 0 20rpx;
                            }
                        }
                    }


                }
            }
        }
    }
}
</style>
