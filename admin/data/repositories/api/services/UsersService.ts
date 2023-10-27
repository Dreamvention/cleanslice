/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List all users
     * @returns any
     * @throws ApiError
     */
    public getUsers(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
        });
    }

    /**
     * Create a new user
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public createUser(
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
     * Get a user
     * @param id
     * @returns any
     * @throws ApiError
     */
    public getUser(
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
     * Update a user
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public updateUser(
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
     * Delete a user
     * @param id
     * @returns any
     * @throws ApiError
     */
    public deleteUser(
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

}
