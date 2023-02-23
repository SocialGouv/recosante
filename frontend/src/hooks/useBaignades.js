import { useQuery } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export default function useBaignades(code) {
  return useQuery(
    ['baignades', code],
    () =>
      axios
        .get(`${apiUrl}/v1/baignades?insee=${code}`)
        .then((res) => res.data),
    {
      enabled: code ? true : false,
      keepPreviousData: code ? false : true,
      refetchOnWindowFocus: false,
    }
  )
}
