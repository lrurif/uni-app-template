<template>
    <view class="scroll-wrapper">
        <scroll-view class="left-wrapper" :scroll-y="true" :scroll-into-view="leftActiveId">
            <view :key="index" @click="handleLeftClick(index)" :id="'left-item-' + index"
                :class="[activeIndex === index ? 'active' : '', 'left-item']" v-for="(item, index) in categoryList">{{ item
                }}
            </view>
        </scroll-view>
        <scroll-view class="right-wrapper" :scroll-y="true" :scroll-top="rightScrollTop" @scroll="handleRightScroll"
            scroll-with-animation :show-scrollbar="false">
            <view v-for="(item, index) in goodsList" :key="index" class="right-item-wrapper">
                <view class="right-list-title ellipsis">{{ item.title }}</view>
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
        }
    },
    data() {
        return {
            categoryList: [],
            activeIndex: 0, // 当前激活内容
            rightNodePos: [],
            rightScrollTop: null,
            leftActiveId: "", // 左侧激活id
            leftPending: false,
            timer: null, // 点击左侧，设置滚动高度，防止触发scroll事件的标志
        }
    },
    methods: {
        getPosition() {
            if (this.goodsList.length == 0) return;
            const query = uni.createSelectorQuery().in(this);
            query.selectAll('.right-list-title').boundingClientRect(data => {
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
            }).exec();
        },
        handleLeftClick(index) {
            this.timer && clearTimeout(this.timer)
            // 处理点击左侧栏，右侧触发滚动事件 - start
            this.leftPending = true;
            this.timer = setTimeout(() => {
                this.leftPending = false;
            }, 500)
            // 处理点击左侧栏，右侧触发滚动事件 - end
            this.rightScrollTop = this.rightNodePos[index];
            // 处理点击左侧栏后，右侧移动一部分，然后再次点击同一个不触发更新 - start
            this.$nextTick(() => {
                this.rightScrollTop += 0.0001;
            })
            // 处理点击左侧栏后，右侧移动一部分，然后再次点击同一个不触发更新 - end
            this.activeIndex = index;
        },
        handleRightScroll(e) {
            if (this.leftPending) return;
            this.handleLeftActive(e.detail.scrollTop);
        },
        handleLeftActive(top) {
            let scrollTop = Math.round(top);
            for (let i = 0; i < this.rightNodePos.length - 1; i++) {
                let pre = this.rightNodePos[i];
                let cur = this.rightNodePos[i + 1];
                if (scrollTop >= pre && scrollTop < cur) {
                    return this.activeIndex = i;
                }
            }
            this.activeIndex = this.rightNodePos.length - 1;
        }
    },
    watch: {
        activeIndex(newVal) {
            this.leftActiveId = 'left-item-' + newVal;
        },
        goodsList() {
            this.getPosition();
            this.categoryList = this.goodsList.map(item => item.title)
        }
    },
    created() {
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

        .right-list-title {
            padding: 10rpx 0;
            font-weight: bold;
            width: 90%;
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
