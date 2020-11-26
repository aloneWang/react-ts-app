import * as React from 'react'

export type UploadMethods = 'POST'| 'PATCH' | 'PUT' |'post' | 'patch' | 'put' 
export interface UploadProps {
    name?: string;
    style?: React.CSSProperties;
    className?: string;
    disable?: boolean;
    component?: HTMLElementTagNameMap; //不确定
    action?: string;
    method?: UploadMethods;
    // headers: 
    accept?: string;
    data?: object;
    onError?():void;
    onStart?():void;
    onSuccess?():void;
    onProgress?():void;
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
    headers: RequestHeaders,
    accept?: boolean;
    filename?: string;
    action: string;
    withCredentials?: boolean;
    file: File;
    method: UploadMethods;
    onSuccess?(xhr: XMLHttpRequest, body: T): void;
    onProgress?(e:UploadProgress): void;
    onError?(e: RequestError | ProgressEvent, body?: T): void;
}