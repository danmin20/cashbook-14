import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, setState, subscribe } from '@/core/observer';
import { historyInputState } from '@/Model';
import { HistoryInputType } from '@/shared/type';

export class PaymentTypeBtn extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    subscribe(historyInputState, 'payment-type-btn', this.update.bind(this));

    this.setDom();
  }
  render() {
    const setPaymentType = setState(historyInputState);
    const historyInput = getState(historyInputState) as HistoryInputType;

    return jsx`
    <div class='input-bar__buttons'>
          <div onClick=${() => {
            setPaymentType((oldState: HistoryInputType) => {
              return {
                ...oldState,
                paymentType: 'outcome',
                category: { id: 0, name: '' },
              };
            });
          }} class='${
      historyInput.paymentType === 'outcome' ? 'active' : ''
    }'>지출</div>

          <div onClick=${() => {
            setPaymentType((oldState: HistoryInputType) => {
              return {
                ...oldState,
                paymentType: 'income',
                category: { id: 0, name: '' },
              };
            });
          }} class='${
      historyInput.paymentType === 'income' ? 'active' : ''
    }'>수입</div>
        </div>
  `;
  }
}
