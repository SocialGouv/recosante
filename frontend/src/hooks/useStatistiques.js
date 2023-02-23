import { useQuery } from 'react-query'
import axios from 'axios'

import apiUrl from 'utils/apiUrl'

export default function useStatistiques() {
  const web = useQuery(
    ['web'],
    () =>
      axios
        .get(`${apiUrl}/stats/web`, {
          headers: {
            Accept: ' application/json',
          },
        })
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  )
  const email = useQuery(
    ['email'],
    () =>
      axios
        .get(`${apiUrl}/stats/email`, {
          headers: {
            Accept: ' application/json',
          },
        })
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  )
  const openings = useQuery(
    ['openings'],
    () =>
      axios
        .get(`${apiUrl}/stats/email/openings`, {
          headers: {
            Accept: ' application/json',
          },
        })
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  )
  return { web: web.data, email: email.data, openings: openings.data }
}
