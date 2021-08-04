import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { setState, subscribe } from '@/core/observer';
import { historyInputState } from '@/Model';
import { HistoryInputType } from '@/shared/type';
import './style';

interface InputBarInputProps {
  type: string;
}

export class InputBarInput extends Component<InputBarInputProps, StateType> {
  constructor(props: InputBarInputProps) {
    super(props);

    this.setDom();
  }
  render() {
    const { type } = this.props;
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
    <input onInput=${({ target }: { target: HTMLInputElement }) =>
      handleInput(target.value)} class='input' placeholder='입력하세요' />
  `;
  }
}
