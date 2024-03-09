import { api } from '../instance';
import { IProduct } from 'shared/types/productsTypes';
import { removeDuplicates } from 'shared/utils/productsUtils';

interface Result<T> {
  result: T
}

export const productsService = {
  getIds() {
    return api.post<Result<string[]>>('', {
      action: "get_ids",
    }).then((res) => {
      return removeDuplicates(res.data.result)
    })
  },
  getItems(ids: string[]): Promise<IProduct[]> {
    return api.post<Result<IProduct[]>>('', {
      action: "get_items",
      params: {ids}
    }).then((res) => {
      return res.data.result
    })
  },
  getFields(field?: string) {
    const data: Record<string, unknown> = {
      action: "get_fields"
    }

    if (field) {
      data.params = { field }
    }
    return api.post<Result<any>>('', data).then((res) => {
      return res.data.result
    })
  },
  filter(filterParams: Record<string, unknown>) {
    return api.post<Result<string[]>>('', {
      action: "filter",
      params: filterParams
    }).then((res) => {
      return res.data.result;
    })
  },
}