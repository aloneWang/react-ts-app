import * as React from 'react'
import { UploadProps, RequestOptions, Rcfile, RequestError } from './interface'
import classNames from 'classnames'
import defaultRequest from './request'
import getUid from './uid'

// 拿 fileList foreach poost, 放在微任务里， 调用 defaultRequest
const Upload: React.FC<UploadProps> = props => {

	const reqs = React.useRef(new Map<React.Key, {abort(): void}>())
	const isinit = React.useRef(false)
	const [, forceUpdate] = React.useState({})

	React.useEffect(() => {
		isinit.current = true
		return () => {
			isinit.current = false
			abort()
		}
	})

	//取消组件中的所有上传
	const abort = (file?: any) => {
		if(file) {
			let uid = file.uid ? file.uid : file
			reqs.current.get(uid).abort()
			reqs.current.delete(uid)
		}else {
			reqs.current.forEach( (req, uid)=> {
				req.abort()
				reqs.current.delete(uid)
			})
		}
	}
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let fileList = Array.prototype.slice.call(e.target.files)
		fileList.forEach(file => {
			// post(file)
			uploadFile(file, fileList)
		})
		// 更新
		forceUpdate({})
	}

	const uploadFile = function(file: Rcfile, fileList: Rcfile[]) {
		let {beforeUpload} = props

		if(!beforeUpload) {
			post(file)
			return
		}

		const before = beforeUpload(file,fileList)
		if(before && typeof before !== 'boolean' && before.then) {
			before.then( proccessFile => {
				const proccessFileType = Object.prototype.toString.call(proccessFile)
				if(proccessFileType === '[object File]' || proccessFileType === '[object Blob]') {
					post(proccessFile)
					return
				}
				post(file)
			})
			.catch( err => {
				console.log(err)
			})
		} else if(before !== false){
			this.post(file)
		}

	}
	const post = (file: Rcfile) => {
		if(!isinit.current) return
		file.uid = getUid()
		let {
			transformFile = originfile => originfile,
			data,
			onStart,
			action,
			name,
			method,
			headers,
			withCredentials,
		} = props

		new Promise(resolve => {
			if (typeof action === 'function') {
				action = action(file)
			}
			resolve(transformFile(file))

		}).then(newfile => {
			data = typeof data === 'function'
				? data(newfile)
				: data

			const transform = Promise.all([data, newfile])
			const request = props.customRequest || defaultRequest
			transform.then(([data, newfile]: [object, Rcfile]) => {
				const requestOptions: RequestOptions = {
					filename: name,
					method: method || 'post',
					headers,
					action: action as string,
					withCredentials,
					data,
					file: newfile,
					onError: (e: RequestError, body) => {
						props.onError?.(e, body, file)
					},
					onSuccess: (xhr, body) => {
						props.onSuccess?.(body, file, xhr)
					},
					onProgress: (e) => {
						props.onProgress?.(e)
					}
				}
				onStart?.(file)
				reqs.current.set(file.uid,request(requestOptions))
			})

		})
	}

	const {
		component: Tag = 'div',
		prefixCls = 'rc-upload',
		className
	} = props
	return (
		<Tag
			className={classNames(`${prefixCls}`, className)}
		>
			<input
				type="file"
				accept={props.accept}
				multiple={props.multiple}
				onChange={onChange}
			/>
			{props.children}
		</Tag>
	)
}

Upload.displayName = 'rc-component-upload'
export default Upload