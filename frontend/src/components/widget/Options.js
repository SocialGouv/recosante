import React from "react";
import styled from "styled-components";

import SearchInput from "components/search/SearchInput";

const Wrapper = styled.div`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.tile};
  box-shadow: inset 0.25rem 0 0 0 ${(props) => props.theme.colors.main};

  font-size: 1.125rem;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`;
const Title = styled.h3`
  ${(props) => props.theme.mq.small} {
    font-size: 1.25rem;
  }
`;
const SearchBarWrapper = styled.div`
  position: relative;
  height: 2.6rem;
  margin: 2rem 0;
`;

export default function Options(props) {
  return (
    <Wrapper>
      <Title>Afficher une ville par défaut</Title>
      <SearchBarWrapper>
        <SearchInput
          className="w-full text-[1.125rem]"
          handlePlaceSelection={(place) => props.setDefaultPlace(place)}
        />
      </SearchBarWrapper>
    </Wrapper>
  );
}
