import React, { useState } from "react";
import styled from "styled-components";

import SearchInput from "components/search/SearchInput";
import { useUser, useUserMutation } from "hooks/useUser";

const Wrapper = styled.div`
  height: 5.5rem;
  margin-bottom: 3rem;
`;
const Title = styled.h3``;

const Email = styled.p`
  position: relative;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  word-break: break-all;

  &:after {
    content: "(Éditer)";
    margin-left: 0.5rem;
    font-size: 0.875rem;
    font-weight: 300;
    color: ${(props) => props.theme.colors.main};
    text-decoration: underline;
  }
`;
const SearchBarWrapper = styled.div`
  position: relative;
  width: 22.25rem;
  height: 3rem;
  margin-bottom: 3rem;

  ${(props) => props.theme.mq.small} {
    width: 100%;
  }
`;

export default function Address() {
  const { data } = useUser();
  const mutation = useUserMutation();

  const [active, setActive] = useState(false);

  return data ? (
    <Wrapper>
      <Title>Ville</Title>
      {active ? (
        <SearchBarWrapper>
          <SearchInput
            className="left-0 right-0 top-0 w-full !transform-none text-[1.125rem]"
            initialValue={data.commune && data.commune.nom}
            handlePlaceSelection={(place) => {
              mutation.mutate({ commune: place });
              setActive(false);
            }}
          />
        </SearchBarWrapper>
      ) : (
        <Email
          tabIndex={0}
          onClick={() => setActive(true)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.click();
            }
          }}
        >
          {data.commune && data.commune.nom} (
          {data.commune && data.commune.departement.nom})
        </Email>
      )}
    </Wrapper>
  ) : null;
}
