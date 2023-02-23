import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useQueryParam } from 'use-query-params'

import UserContext from 'utils/UserContext'
import apiUrl from 'utils/apiUrl'

export function useUser() {
  const [uid] = useQueryParam('user')
  const [token] = useQueryParam('token')
  return useQuery(
    ['user', uid, token],
    () => axios.get(`${apiUrl}/users/${uid}?token=${token}`).then((res) => res.data),
    {
      enabled: uid ? true : false,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => !error.response && failureCount <= 3 ? true : false,
    }
  )
}

export function useUserMutation() {
  let [uid] = useQueryParam('user')
  let [token] = useQueryParam('token')
  const queryClient = useQueryClient()
  return useMutation(
    (user) => {
      let url = `${apiUrl}/users/`
      const {uid: newUid, authentication_token: newToken, ...newUser} = { ...user, commune: user.commune && { code: user.commune.code } }
      uid ??= newUid
      token ??= newToken
      if (uid && token) {
        url += `${uid}?token=${token}`
      }
      return axios.post(
        url,
        newUser,
        {
          headers: { Accept: ' application/json' },
        }
      )
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['user', uid, token])
      },
    }
  )
}

export function useUserDeletion() {
  const [uid] = useQueryParam('user')
  const [token] = useQueryParam('token')
  const queryClient = useQueryClient()
  return useMutation(() => axios.post(`${apiUrl}/users/${uid}/_deactivate?token=${token}`), {
    onSettled: () => {
      queryClient.invalidateQueries(['user', uid, token])
    },
  })
}

export function useUserReactivation() {
  const [uid] = useQueryParam('user')
  const [token] = useQueryParam('token')
  const queryClient = useQueryClient()
  return useMutation(() => axios.post(`${apiUrl}/users/${uid}/_reactivate?token=${token}`), {
    onSettled: () => {
      queryClient.invalidateQueries(['user', uid, token])
    },
  })
}

export function useSendProfileLink() {
  return useMutation((mail) =>
    axios.post(
      `${apiUrl}/users/_send_update_profile`,
      { mail },
      {
        headers: { Accept: ' application/json' },
      }
    )
  )
}

export function useLocalUser() {
  const { user, mutateUser } = useContext(UserContext)

  return { user, mutateUser }
}
