import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';

export interface CategoryTagProps {
  id: string;
  title: string;
}

export default class CategoryTag extends Component<CategoryTagProps> {
  constructor(props: CategoryTagProps) {
    super(props);

    this.setDom();
  }
  render() {
    return jsx`
      <div class='category-tag ${this.props.id}'>
        ${this.props.title}
      </div>
    `;
  }
}
