/**
 * Http
 * @author Mortal-Li
 * @created 2021年9月2日
 */

/**
 * Http请求相关设置
 */
interface HttpOptionInterface {
    /**
     * 超时时间 毫秒 8000(default) 
     */
    timeout?: number;
    /**
     * 响应类型: json(default), text, arraybuffer, blob, document
     */
    responseType?: 'json' | 'text' | 'arraybuffer' | 'blob' | 'document';
    /**
     * 显示loading函数
     */
     show?: Function;
    /**
     * 隐藏loading函数
     */
     hide?: Function;
}

export default class HttpManager {

    request(url: string, data: {} = null, option: HttpOptionInterface = {}) {
        if (option.show) option.show();
        
        return new Promise<any>((resolve, reject) => {
            this._request({
                url : url,
                timeout: option.timeout || 8000,
                responseType: option.responseType || 'json',
                method: data ? 'POST' : 'GET',
                data: data,
                success: (recv) => {
                    cc.log({url, data, recv});
                    if (option.hide) option.hide();
                    resolve(recv);
                },
                error: (err) => {
                    cc.error(err);
                    if (option.hide) option.hide();
                    reject(err);
                }
            });
        });
    }

    private _request(params) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = params.timeout;
        xhr.responseType = params.responseType;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    params.success(xhr.response);
                } else {
                    params.error('Please Check Network!', xhr.status);
                }
            }
        }
        xhr.ontimeout = () => {
            params.error('Time Out');
        };
        xhr.onabort = () => {
            params.error('Network Abort');
        };
        xhr.onerror = () => {
            params.error('Network Error');
        };
        xhr.open(params.method, params.url, true);

        if (params.method === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        if (params.data) {
            let formData = [];
            for (let key in params.data) {
                formData.push(''.concat(key, '=', params.data[key]));
            }
            params.data = formData.join('&');
        }

        xhr.send(params.data);
    }
}
