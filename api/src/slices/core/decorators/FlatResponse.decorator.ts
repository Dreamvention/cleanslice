import { SetMetadata } from '@nestjs/common';

export const IS_FLAT_RESPONSE = 'isFlat';
export const FlatResponse = () => SetMetadata(IS_FLAT_RESPONSE, true);
