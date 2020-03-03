const envConfig = 'http://localhost:3300'
const request = ({url: url, method: method, data: data, header: header}) => {
	return uni.request({
		url: envConfig + url, //仅为示例，并非真实接口地址。
		data: data,
		method: method,
		header: header,
		// success: (res) => {
		//     console.log(res.data);
		//     return new Promise((resolve, reject) => {
		// 		resolve(res.data);
		// 	})
		// },
		// fail: (err) => {
		// 	console.log(err);
		// 	throw err
		// }
	})
	.then(res=> {
		if(res[1].statusCode === 200){
			console.log(res)
			return res[1]
		} else {
			return {data: {status: 'fail'}}
		}
	}).catch(err => {
		return err
	})
}

export default request
