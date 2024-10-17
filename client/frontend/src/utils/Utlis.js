export const getUrlParams = (url) => {
	const searchParams = new URLSearchParams(url.search)
	const params = {}
	for (let [key, value] of searchParams) {
		params[key] = value
	}
	return params
}

export const replaceUrlParam = (url, paramName, paramValue) => {
	let urlObj = new URL(url)
	urlObj.searchParams.set(paramName, paramValue)
	return urlObj.toString()
}

export const getRandomInt = (size) => {
	return Math.floor(Math.random() * size)
}
export const getRandomType = (rate = 0.5) => {
	return Math.random() < rate ? 'Android' : 'iPhone'
}
export const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}