<template>
	<view class="page">
		<view class="swiper-area">

		</view>
		<view class="goods-wrapper">
			<LeftRightScroll :isFixed="false" :isShowTitle="true" :goodsList="goodsList"></LeftRightScroll>
		</view>
	</view>
</template>

<script>
import LeftRightScroll from '../../components/LeftRightScroll/LeftRightScroll.vue';
export default {
	components: {
		LeftRightScroll
	},
	data() {
		return {
			goodsList: [],
		}
	},
	onLoad() {

	},
	methods: {

	},
	mounted() {
		setTimeout(() => {
			this.goodsList = [{
				title: "第一个",
				children: [{
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "门店销量第一名"],
					price: "5.8"
				}, {
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "牛奶"],
					price: "5.8"
				}]
			},
			{
				title: "第二个",
				children: [{
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "门店销量第一名"],
					price: "5.8"
				}, {
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "牛奶"],
					price: "5.8"
				}]
			},
			{
				title: "第san个",
				children: [{
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "门店销量第一名"],
					price: "5.8"
				}, {
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "牛奶"],
					price: "5.8"
				}]
			},
			{
				title: "第si个",
				children: [{
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "门店销量第一名"],
					price: "5.8"
				}, {
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "牛奶"],
					price: "5.8"
				}]
			},
			{
				title: "第五个",
				children: new Array(10).fill({
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "门店销量第一名"],
					price: "5.8"
				})
			},
			{
				title: "第六个",
				children: new Array(1).fill({
					img: "https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					title: "1的子孩子",
					labels: ["库存 99", "门店销量第一名"],
					price: "5.8"
				})
			},

			]
		}, 1000)

	}
}
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	flex-direction: column;
	height: 100vh;

	.swiper-area {
		height: 20vh;
		box-sizing: border-box;
		border: 1rpx solid red;
	}

	.goods-wrapper {
		flex: 1;
		min-height: 0;
	}

}
</style>
