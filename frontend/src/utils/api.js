import { useQuery, useMutation } from 'react-query'
import axios from 'axios'
import { useQueryParam } from 'use-query-params'

import apiUrl from 'utils/apiUrl'

export function useStatistiques() {
  return useQuery(['statistiques'], () =>
    axios.get(`${apiUrl}/stats/`).then((res) => res.data)
  )
}
export function useAvis(location) {
  const [short_id] = useQueryParam('short_id')
  const [appliquee] = useQueryParam('avis')
  return useQuery(
    ['profile', short_id, appliquee],
    () =>
      axios
        .post(
          `${apiUrl}/newsletter/${short_id}/avis?appliquee=${appliquee}`,
          null,
          {
            headers: { Accept: ' application/json' },
          }
        )
        .then((res) => res.data),
    {
      enabled: short_id && appliquee ? true : false,
      refetchOnWindowFocus: false,
    }
  )
}
export function useAvisMutation() {
  const [short_id] = useQueryParam('short_id')
  const [appliquee] = useQueryParam('avis')
  return useMutation((avis) =>
    axios.post(
      `${apiUrl}/newsletter/${short_id}/avis?appliquee=${appliquee}`,
      avis,
      {
        headers: {
          Accept: ' application/json',
          'Content-Type': 'application/json',
        },
      }
    )
  )
}
export function useInscriptionPatients() {
  return useMutation((nom_medecin, mails) =>
    axios.post(
      `${apiUrl}/inscription-patients`,
      { nom_medecin, mails },
      {
        headers: {
          Accept: ' application/json',
          'Content-Type': 'application/json',
        },
      }
    )
  )
}
