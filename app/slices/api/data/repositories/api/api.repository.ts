/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { injectable, inject } from 'tsyringe';
import type { OpenAPIConfig } from './core/OpenAPI';
import { ApiAxios } from '../../../apiAxios';
import { ApiClient } from './ApiClient';
import Cookies from 'js-cookie';

@injectable()
export class ApiRepository extends ApiClient {
  constructor(@inject('apiConfig') config: Partial<OpenAPIConfig>) {
    //Authenticate API by providing a cookie with API_TOKEN
    config.TOKEN = Cookies.get('API_TOKEN');
    super(config, ApiAxios);
  }
}
