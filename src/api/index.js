// 自动导入模块 - start
const modules = {}
const modulesFiles = require.context('./modules', true, /\.js$/);
modulesFiles.keys().forEach(key => {
	const name = key.replace(/^\.\/(.*)\.\w+$/, '$1');
	const source = modulesFiles(key);
	modules[name] = source
});
// 自动导入模块 - end

export default modules
