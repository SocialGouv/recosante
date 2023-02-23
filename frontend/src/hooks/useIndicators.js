import { useQuery } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export default function useIndicators(code, date) {
  return useQuery(
    ['indicators', code, date],
    () => {
      let url = `${apiUrl}/v1/?insee=${code}`
      if (date)
        url += `&date=${date}&time=12:00`
      url += '&show_raep=true&show_indice_uv=true'
      return axios
        .get(url)
        .then((res) => res.data)
    },
    {
      enabled: code ? true : false,
      keepPreviousData: code ? false : true,
      refetchOnWindowFocus: false,
    }
  )
}
