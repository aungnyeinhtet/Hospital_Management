export interface BaseFindManyArgs<TFilter = unknown> {
  take?: number;
  skip?: number;
  filter?: TFilter;
}
