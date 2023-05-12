export const getSystemInfo = function () {
	// 设备系统信息
	let systemInfomations = uni.getSystemInfoSync()
	// 机型适配比例系数
	let scaleFactor = 750 / systemInfomations.windowWidth
	// 当前机型-屏幕高度
	let windowHeight = systemInfomations.windowHeight * scaleFactor //rpx
	// 当前机型-屏幕宽度
	let windowWidth = systemInfomations.windowWidth * scaleFactor //rpx
	// 状态栏高度
	let statusBarHeight = (systemInfomations.statusBarHeight) * scaleFactor //rpx
	let navHeight = 0 //rpx
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	// 胶囊高度
	let menuButtonHeight = menuButtonInfo.height * scaleFactor //rpx
	// 胶囊宽度
	let menuButtonWidth = menuButtonInfo.width * scaleFactor //rpx
	// 胶囊上边界的坐标
	let menuButtonTop = menuButtonInfo.top * scaleFactor //rpx
	// 胶囊右边界的坐标
	let menuButtonRight = menuButtonInfo.right * scaleFactor //rpx
	// 胶囊下边界的坐标
	let menuButtonBottom = menuButtonInfo.bottom * scaleFactor //rpx
	// 胶囊左边界的坐标
	let menuButtonLeft = menuButtonInfo.left * scaleFactor //rpx
	navHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2
	return {
		scaleFactor,
		windowHeight,
		windowWidth,
		statusBarHeight,
		menuButtonHeight,
		menuButtonWidth,
		menuButtonTop,
		menuButtonRight,
		menuButtonBottom,
		menuButtonLeft,
		navHeight
	}
}
export const getScreenData = (() => {
	let data = null;
	return () => {
		if(data) return data;
		const _data = getSystemInfo();
		data = _data;
		return data;
	}
})();