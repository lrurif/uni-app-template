const state = {
	token: '',
}

// 同步使用mutations
const mutations = {
	set(state, {key, value}) {
		state[key] = value
	},
}

// 异步使用actions
const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
