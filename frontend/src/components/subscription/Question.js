import React from "react";
import styled from "styled-components";

import { useLocalUser } from "hooks/useUser";
import Option from "./question/Option";

const Label = styled.h1`
  display: block;
  min-height: 2.75rem;
  margin-bottom: 1.625rem;
  font-weight: 300;
  text-align: left;
  font-size: inherit;

  ${(props) => props.theme.mq.smallish} {
    margin-bottom: 1.5rem;
  }
`;
const Options = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) =>
    props.options.length === 4 ? "space-between" : "space-around"};
  margin-top: 0;
  margin-bottom: 3.5rem;

  ${(props) => props.theme.mq.smallish} {
    justify-content: center;
    align-items: center;
    min-height: 22rem;
    margin-bottom: 1.5rem;
  }
  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin-bottom: 4rem;
  }
`;
export default function Question({ step, mutateUser, setModal }) {
  const { user } = useLocalUser();

  return (
    <div className="relative z-[2] flex-1 pt-6">
      <Label
        dangerouslySetInnerHTML={{
          __html: step.label,
        }}
      />
      <Options options={step.options}>
        {step.options.map((option, index) => (
          <Option
            key={option.value}
            option={option}
            isLast={index === step.options.length - 1}
            active={user[step.name] && user[step.name].includes(option.value)}
            checkbox={!step.exclusive}
            onClick={() => {
              mutateUser({
                [step.name]: step.exclusive
                  ? [option.value]
                  : user[step.name] && user[step.name].includes(option.value)
                  ? user[step.name].filter(
                      (userOption) => userOption !== option.value
                    )
                  : [...(user[step.name] || []), option.value],
              });
            }}
            setModal={setModal}
          />
        ))}
      </Options>
    </div>
  );
}
