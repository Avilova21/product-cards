import { useLayoutEffect } from 'react';
import { format } from 'date-fns/format';
import { api } from '../../api/instance';
import md5 from 'md5';

export const useInitToken = () => {
  useLayoutEffect(() => {
    const formattedDate = format(new Date(), 'yyyyMMdd');

    api.defaults.headers['X-Auth'] = md5(`Valantis_${formattedDate}`)
  }, [])
}