import { useQuery } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export default function useRecommandations() {
  return useQuery(
    ['recommandations'],
    () =>
      axios
        .get(`${apiUrl}/v1/recommandations`)
        .then((res) => res.data),
    {
      enabled: true,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
}
