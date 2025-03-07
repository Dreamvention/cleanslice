import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { Interceptors } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { ApiKeysService } from './services.gen';
import { AuthService } from './services.gen';
import { FilesService } from './services.gen';
import { HealthService } from './services.gen';
import { MailsService } from './services.gen';
import { TeamsService } from './services.gen';
import { UsersService } from './services.gen';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ApiClient {

	public readonly apiKeys: ApiKeysService;
	public readonly auth: AuthService;
	public readonly files: FilesService;
	public readonly health: HealthService;
	public readonly mails: MailsService;
	public readonly teams: TeamsService;
	public readonly users: UsersService;

	public readonly request: BaseHttpRequest;

	constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
		this.request = new HttpRequest({
			BASE: config?.BASE ?? '',
			VERSION: config?.VERSION ?? '1.0',
			WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
			CREDENTIALS: config?.CREDENTIALS ?? 'include',
			TOKEN: config?.TOKEN,
			USERNAME: config?.USERNAME,
			PASSWORD: config?.PASSWORD,
			HEADERS: config?.HEADERS,
			ENCODE_PATH: config?.ENCODE_PATH,
			interceptors: {
				request: config?.interceptors?.request ?? new Interceptors(),
				response: config?.interceptors?.response ?? new Interceptors(),
      },
		});

		this.apiKeys = new ApiKeysService(this.request);
		this.auth = new AuthService(this.request);
		this.files = new FilesService(this.request);
		this.health = new HealthService(this.request);
		this.mails = new MailsService(this.request);
		this.teams = new TeamsService(this.request);
		this.users = new UsersService(this.request);
	}
}
