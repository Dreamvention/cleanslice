export interface IMetaResponse extends IMetaLastKeyResponse, IMetaPaginationResponse {}

export interface IMetaLastKeyResponse {
  lastKey?: string;
  isLastPage?: boolean;
}

export interface IMetaPaginationResponse {
  total?: number;
  lastPage?: number;
  currentPage?: number;
  perPage?: number;
  prev?: number | null;
  next?: number | null;
}
