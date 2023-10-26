/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';

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
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public usersControllerCreateUser(
        requestBody: CreateUserDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public usersControllerGetUser(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public usersControllerUpdateUser(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public usersControllerDeleteUser(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public productsControllerGetProducts(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public categoriesControllerGetCategories(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/categories',
        });
    }

}
