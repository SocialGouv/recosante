import { useQueryParam } from "hooks/useQueryParam";

export default function useStepPosition(name) {
  const [current, setCurrent] = useQueryParam("step");

  return {
    current,
    setCurrent,
    isCurrent: current === name,
    isEnd: current === "end",
  };
}
