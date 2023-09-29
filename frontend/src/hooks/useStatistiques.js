import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import apiUrl from "utils/apiUrl";

export default function useStatistiques() {
  const web = useQuery(
    ["web"],
    () =>
      axios
        .get(`${apiUrl}/stats/web`, {
          headers: {
            Accept: " application/json",
          },
        })
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  );
  const email = useQuery(
    ["email"],
    () =>
      axios
        .get(`${apiUrl}/stats/email`, {
          headers: {
            Accept: " application/json",
          },
        })
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  );
  const openings = useQuery(
    ["openings"],
    () =>
      axios
        .get(`${apiUrl}/stats/email/openings`, {
          headers: {
            Accept: " application/json",
          },
        })
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  );
  return {
    web: {
      total_visits: 3817685,
      monthly_visits: JSON.stringify({
        "Février 2021": 685,
        "Mars 2021": 1470,
        "Avril 2021": 9534,
        "Mai 2021": 6716,
        "Juin 2021": 3039,
        "Juillet 2021": 8577,
        "Août 2021": 7301,
        "Septembre 2021": 45411,
        "Octobre 2021": 11169,
        "Novembre 2021": 14783,
        "Décembre 2021": 21427,
        "Janvier 2022": 34589,
        "Février 2022": 31633,
        "Mars 2022": 37459,
        "Avril 2022": 49364,
        "Mai 2022": 200862,
        "Juin 2022": 196214,
        "Juillet 2022": 193831,
        "Août 2022": 182601,
        "Septembre 2022": 190701,
        "Octobre 2022": 221887,
        "Novembre 2022": 216614,
        "Décembre 2022": 202800,
        "Janvier 2023": 232712,
        "Février 2023": 208519,
        "Mars 2023": 228445,
        "Avril 2023": 220984,
        "Mai 2023": 229542,
        "Juin 2023": 214384,
        "Juillet 2023": 202494,
        "Août 2023": 198263,
        "Septembre 2023": 193675,
      }),
      place_monthly_visits: JSON.stringify({
        "Février 2021": 0,
        "Mars 2021": 0,
        "Avril 2021": 0,
        "Mai 2021": 0,
        "Juin 2021": 0,
        "Juillet 2021": 0,
        "Août 2021": 0,
        "Septembre 2021": 0,
        "Octobre 2021": 1144,
        "Novembre 2021": 2161,
        "Décembre 2021": 2970,
        "Janvier 2022": 3750,
        "Février 2022": 4099,
        "Mars 2022": 5762,
        "Avril 2022": 5232,
        "Mai 2022": 5484,
        "Juin 2022": 4608,
        "Juillet 2022": 6793,
        "Août 2022": 5124,
        "Septembre 2022": 3704,
        "Octobre 2022": 4615,
        "Novembre 2022": 4937,
        "Décembre 2022": 4481,
        "Janvier 2023": 3756,
        "Février 2023": 7277,
        "Mars 2023": 4790,
        "Avril 2023": 10228,
        "Mai 2023": 8384,
        "Juin 2023": 8216,
        "Juillet 2023": 5736,
        "Août 2023": 4683,
        "Septembre 2023": 4205,
      }),
      integration_widget: 1641445,
      integration_website: 117774,
      channel_search: 29005,
      channel_direct: 36819,
      channel_website: 39146,
      channel_social: 1729,
      channel_campaign: 11075,
    },
    email: email.data,
    openings: openings.data,
  };
}
