import Component, { PropsType, StateType } from '@/core/Component';
import jsx from '@/core/jsx';
import { getState, setState, subscribe } from '@/core/observer';
import { historyDetailState } from '@/Model';
import { HistoryDetailType } from '@/Model/historyDetail';
import DetailModal from '../DetailInfo';

export class DetailSlide extends Component<PropsType, StateType> {
  $detailModal: Element = jsx``;

  constructor(props: PropsType) {
    super(props);

    subscribe(historyDetailState, 'modal-component', this.update.bind(this));

    this.setDom();
  }

  willUpdate() {
    const setHistoryDetail = setState(historyDetailState);
    this.$detailModal = new DetailModal({
      histories: (getState(historyDetailState) as HistoryDetailType).histories,
      handleClose: () =>
        setHistoryDetail((old: HistoryDetailType) => {
          return {
            ...old,
            isModalOpened: false,
          };
        }),
    }).$dom;
  }

  render() {
    const { isModalOpened } = getState(historyDetailState) as HistoryDetailType;

    return isModalOpened ? this.$detailModal : jsx``;
  }
}
