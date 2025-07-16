# User Utilities for MCP Tools

Утилиты для работы с данными пользователя в MCP tools.

## Использование

```typescript
import { Tool } from '#mcp/decorators';
import { getUserFromRequest, getUserTeamId, userHasRole } from '#mcp/utils/user.utils';

@Tool({
  name: 'GetMyAgents',
  description: 'Returns agents for the current user',
  parameters: z.object({}),
})
async getMyAgents(params: any, context: Context, httpRequest: RequestWithUser) {
  const user = getUserFromRequest(httpRequest);
  
  if (!user) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: 'Not authenticated' }) }],
    };
  }
  
  const teamId = getUserTeamId(httpRequest);
  
  if (!teamId) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: 'No team found' }) }],
    };
  }
  
  const response = await this.agentsService.getAgents({ teamId });
  return {
    content: [{ type: 'text', text: JSON.stringify(response) }],
  };
}
```

## Доступные утилиты

### `getUserFromRequest(httpRequest: RequestWithUser): IUserData | null`
Извлекает полные данные пользователя из httpRequest.

### `getUserTeamId(httpRequest: RequestWithUser): string | null`
Получает ID основной команды пользователя.

### `userHasRole(httpRequest: RequestWithUser, role: string): boolean`
Проверяет, есть ли у пользователя определенная роль.

## Как это работает

Утилиты автоматически извлекают данные пользователя из контекста MCP tools:

1. **Аутентификация**: MCP auth guard проверяет токен или API ключ
2. **Загрузка данных**: Загружаются полные данные пользователя из базы данных
3. **Установка в контекст**: Данные сохраняются в `httpRequest.user`
4. **Извлечение**: Утилиты извлекают данные из httpRequest

## Структура IUserData

```typescript
interface IUserData {
  id: string;
  name: string;
  email: string;
  emailError?: boolean;
  emailErrorDescription?: string;
  emailNotifications?: boolean;
  teams: ITeamData[];
  teamUsers: ITeamUserData[];
  verified: boolean;
  roles: RoleTypes[];
  banned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  paymentProfileId?: string;
  balance?: number;
}
```

## Примеры использования

### 1. Получение команды пользователя

```typescript
@Tool({
  name: 'GetMyTeam',
  description: 'Returns the current user\'s team',
  parameters: z.object({}),
})
async getMyTeam(params: any, context: Context, httpRequest: RequestWithUser, @User() user: IUserData) {
  const team = user.teams[0];

  if (!team) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: 'No team found' }) }],
    };
  }

  return {
    content: [{ type: 'text', text: JSON.stringify(team) }],
  };
}
```

### 2. Проверка ролей пользователя

```typescript
@Tool({
  name: 'AdminOnly',
  description: 'Admin only operation',
  parameters: z.object({}),
})
async adminOnly(params: any, context: Context, httpRequest: RequestWithUser, @User() user: IUserData) {
  if (!user.roles.includes(RoleTypes.Admin)) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: 'Admin access required' }) }],
    };
  }

  // Выполнить админскую операцию
  return {
    content: [{ type: 'text', text: JSON.stringify({ success: true }) }],
  };
}
```

### 3. Использование баланса пользователя

```typescript
@Tool({
  name: 'GetBalance',
  description: 'Returns user balance',
  parameters: z.object({}),
})
async getBalance(params: any, context: Context, httpRequest: RequestWithUser, @User() user: IUserData) {
  return {
    content: [{ type: 'text', text: JSON.stringify({ balance: user.balance }) }],
  };
}
```

## Примечания

- Декоратор `@User()` должен быть последним параметром в методе MCP tool
- Если пользователь не аутентифицирован, декоратор вернет `null`
- Данные пользователя автоматически извлекаются из контекста запроса
- Поддерживается fallback на `cognito_user` если основной `user` недоступен
