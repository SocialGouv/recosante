export default function useProgressionPercent(props) {
  return props.currentStep === 'identity'
    ? 1
    : (props.currentStep === props.steps.length
        ? props.currentStep
        : props.currentStep + 1) /
        (props.steps.length + (!props.small ? 1 : 0))
}
