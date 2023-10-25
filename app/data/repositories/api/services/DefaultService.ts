/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns any
     * @throws ApiError
     */
    public usersControllerGetUsers(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public usersControllerCreateUsers(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
        });
    }

}
