/* eslint-disable @typescript-eslint/no-explicit-any */
interface DataModel<T> {
  id: number;
  [key: string]: T | number | undefined | any[] | string | boolean | any;
}