import { type } from 'os'
import * as React from 'react'

export type UploadMethods = 'POST'| 'PATCH' | 'PUT' |'post' | 'patch' | 'put' 

// input props
export interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,  'onError' | 'onProgress'> {
    name?: string;
    style?: React.CSSProperties;
    className?: string;
    disable?: boolean;
    // component?: keyof HTMLElementTagNameMap; //不确定
    component?: React.JSXElementConstructor<any>;
    action?: string | ((file?:Rcfile) => string);
    method?: UploadMethods;
    headers?: RequestHeaders;
    accept?: string;
    withCredentials?: boolean;
    data?: object | ((file: any) => object);
    transformFile?: (file: Rcfile)=> string | Blob | Rcfile |  PromiseLike<string | Blob | Rcfile>
    onError?(e: Error, ret: object, file: Rcfile):void;
    onStart?(file: Rcfile):void;
    onSuccess?(ret: object, file: Rcfile, xhr: object):void;
    onProgress?(e: UploadProgress):void;

}
export interface Rcfile extends File {
    uid: string
}
export interface RequestHeaders {
    [key: string]: string
}

export interface RequestError extends Error{
    status?: number;
    url?: string;
    method?: UploadMethods
}

export interface UploadProgress extends ProgressEvent {
    percent: number
}
export interface RequestOptions<T = any> {
    data?: object;
    headers?: RequestHeaders,
    accept?: string;
    filename?: string;
    action: string;
    withCredentials?: boolean;
    file?: Rcfile;
    method?: UploadMethods;
    onSuccess?(xhr: XMLHttpRequest, body: T): void;
    onProgress?(e:UploadProgress): void;
    onError?(e: RequestError | ProgressEvent, body?: T): void;
}