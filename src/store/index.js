import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
const modulesFiles = require.context('./modules', true, /\.js$/)
modulesFiles.keys().forEach((key) => {
	const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
	modules[name] = modulesFiles(key).default
})

const store = new Vuex.Store({
	modules
})

export default store
