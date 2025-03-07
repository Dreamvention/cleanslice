import { Injectable } from '@nestjs/common';
import { IApiKeyData, IApiKeysGateway, ICreateApiKeyData, IFilterApiKey } from '../domain';
import { ApiKeyMapper } from './apiKey.mapper';
import { PrismaService } from '#prisma';

@Injectable()
export class ApiKeysGateway implements IApiKeysGateway {
  constructor(
    private prisma: PrismaService,
    private map: ApiKeyMapper,
  ) {}
  async getApiKeys(filter?: IFilterApiKey): Promise<IApiKeyData[]> {
    const where = {
      teamId: filter.teamId,
    };

    const results = await this.prisma.apiKey.findMany({
      where,
      include: {
        team: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return results.map((result) => this.map.toData(result));
  }
  async getApiKey(id: string): Promise<IApiKeyData> {
    const result = await this.prisma.apiKey.findUnique({
      where: {
        id,
      },
      include: {
        team: true,
      },
    });
    return this.map.toData(result);
  }
  async createApiKey(data: ICreateApiKeyData): Promise<IApiKeyData> {
    const result = await this.prisma.apiKey.create({
      data: this.map.toCreate(data),
      include: {
        team: true,
      },
    });
    return this.map.toData(result);
  }
  async updateApiKey(id: string, data: ICreateApiKeyData): Promise<IApiKeyData> {
    const result = await this.prisma.apiKey.update({
      where: {
        id,
      },
      include: {
        team: true,
      },
      data: this.map.toUpdate(data),
    });
    return this.map.toData(result);
  }
  async deleteApiKey(id: string): Promise<boolean> {
    await this.prisma.apiKey.delete({ where: { id } });
    return true;
  }

  //TODO: no need to domain. refactor it out.
  async useApiKey(secret: string, domain: string): Promise<IApiKeyData> {
    // domain = this.getDomainFromUrl(domain);

    const apiKey = await this.prisma.apiKey.findFirst({
      where: { secret },
      include: {
        team: {
          include: {
            user: true,
          },
        },
      },
    });

    //Add validation through Entities.
    if (apiKey.team.user.banned) return;
    if (!apiKey.team.user.verified) return;

    // if (
    //   !this.isWhitelist(domain, [
    //     ...(apiKey ? apiKey.whitelist.split(',') : []),
    //     ...(process.env.WHITELIST ? process.env.WHITELIST.split(',') : []),
    //   ])
    // ) {
    //   throw Error(`Domain ${domain} is not whitelised`);
    // }
    await this.prisma.apiKey.update({
      where: {
        id: apiKey.id,
      },
      data: { lastUsedAt: new Date() },
    });
    return this.map.toData(apiKey);
  }

  private getDomainFromUrl(url) {
    url = url.trim();
    // Add a default protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }

    try {
      const urlObject = new URL(url);
      return urlObject.hostname;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  }

  private isWhitelist(domain, whitelist) {
    return whitelist.some((allowedDomain) => domain === allowedDomain || domain.endsWith(`.${allowedDomain}`));
  }
}
