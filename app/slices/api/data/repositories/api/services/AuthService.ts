/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthDto } from '../models/AuthDto';
import type { LoginUserDto } from '../models/LoginUserDto';
import type { RegisterUserDto } from '../models/RegisterUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Login with email and password
     * @param requestBody
     * @returns AuthDto
     * @throws ApiError
     */
    public login(
        requestBody: LoginUserDto,
    ): CancelablePromise<AuthDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Register a new user
     * @param requestBody
     * @returns AuthDto
     * @throws ApiError
     */
    public register(
        requestBody: RegisterUserDto,
    ): CancelablePromise<AuthDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Refresh access token
     * @param requestBody
     * @returns AuthDto
     * @throws ApiError
     */
    public refresh(
        requestBody: RegisterUserDto,
    ): CancelablePromise<AuthDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
