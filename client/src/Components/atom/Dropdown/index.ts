import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import { delete as delbtn } from '../../../../assets';
import './style';

export interface DropDownProps {
  items: string[];
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
            jsx`<div class='dropdown__item'>${item}<img src=${delbtn} /></div>`
        )}
      </div>
    `;
  }
}
