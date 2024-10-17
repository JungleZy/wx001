const modules = import.meta.glob('./*.vue')
const map = {}
Object.keys(modules).forEach(file => {
	const modulesName = file.replace('./', '').replace('.vue', '')
	map[modulesName] = modules[file].name
})
const globalComponents = {
	...map,
}
export default globalComponents
