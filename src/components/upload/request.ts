/**
 * 封装原生请求
 */
import { RequestOptions, RequestError, UploadProgress} from './interface'


const getError = (options: RequestOptions, xhr: XMLHttpRequest) => {
    let {action, method} = options
    const msg = `can not ${method} ${action}${xhr.status}`
    const err = new Error(msg) as RequestError
    err.method = method
    err.status = xhr.status
    err.url = action
    return err
}

const getBody = (xhr: XMLHttpRequest) => {
    let {responseText, response} = xhr
    let text = responseText || response
    if(!text) {
        return text
    }
    try {
        return JSON.parse(text)
    }catch(err) {
        return text
    }
}

function request(options: RequestOptions) {
    let xhr = new XMLHttpRequest()

    // 处理数据
    let formData = new FormData()
    let { data, file, filename, method, action, headers = {}, onProgress } = options
    if(onProgress && xhr.upload) {
        xhr.upload.onprogress = function(e: UploadProgress) {
            if(e.total) {
                e.percent = (e.loaded / e.total) * 100
                onProgress(e)
            }
            
        }
    }

    if(data) {
        Object.keys(data).forEach( key => {
            let value = data[key]
            if(Array.isArray(value)) {
                value.forEach( v => {
                    formData.append(`${key}[]`, v)
                })
                return
            }
            formData.append(key, value)
        })
    }

    if(file) {
        if(file instanceof Blob) {
            formData.append(filename, file, file.name)
        }else {
            formData.append(filename, file)
        }
    }

    xhr.onerror = function(e) {
        return options.onError(e)
    }
    // 加载完
    xhr.onload = function(e) {
        if(xhr.status > 200 || xhr.status < 300) {
            options.onError(getError(options, xhr), getBody(xhr))
            return
        }
        return options.onSuccess(xhr, getBody(xhr))
    }

    xhr.open(method, action, true)


    // 跨站点访问控制
    if(options.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true
    }
    
    // 为 XMLHttpRequest 时时 ajax , 为 null 时普通请求
    if(headers['x-requested-with'] !== null) {
        headers['x-requested-with'] = 'XMLHttpRequest'
    }

    Object.keys(headers).forEach( h => {
        if(headers[h] === null) return
        xhr.setRequestHeader(h, headers[h])
    })
    xhr.send(formData)

    return {
        abort() {
            xhr.abort()
        }
    }
}

export default request