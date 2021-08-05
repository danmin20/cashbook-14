import Component, { StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { setState } from '@/core/observer';
import { historyInputState } from '@/Model';
import { HistoryInputType } from '@/shared/type';
import './style';

interface InputBarInputProps {
  type: string;
  placeholder: string;
}

export class InputBarInput extends Component<InputBarInputProps, StateType> {
  constructor(props: InputBarInputProps) {
    super(props);

    this.setDom();
  }
  render() {
    const { type, placeholder } = this.props;
    const handleHistoryInputState = setState(historyInputState);
    const handleInput = (value: string) => {
      handleHistoryInputState((oldState: HistoryInputType) => {
        return (
          (type === 'year' && { ...oldState, year: value }) ||
          (type === 'month' && { ...oldState, month: value }) ||
          (type === 'date' && { ...oldState, date: value }) ||
          (type === 'content' && { ...oldState, content: value }) ||
          (type === 'amount' && { ...oldState, amount: value }) || {
            ...oldState,
          }
        );
      });
    };

    return jsx`
    <input id=${type} autocomplete="off" onInput=${({
      target,
    }: {
      target: HTMLInputElement;
    }) => handleInput(target.value)} class='input' placeholder=${placeholder} />
  `;
  }
}
