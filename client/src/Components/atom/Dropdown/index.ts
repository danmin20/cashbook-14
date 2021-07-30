import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import { delete as delbtn } from '../../../../assets';
import './style';
import { CategoryType, PaymentType } from '../../../shared/type';

export interface DropDownProps {
  items: CategoryType[] | PaymentType[];
}

export default class DropDown extends Component<DropDownProps> {
  constructor(props: DropDownProps) {
    super(props);

    this.setDom();
  }
  render() {
    const { items } = this.props;

    return jsx`
      <div class='dropdown'>
        ${items.map(
          (item) =>
            jsx`<div class='dropdown__item'>${item.name}<img src=${delbtn} /></div>`
        )}
      </div>
    `;
  }
}
