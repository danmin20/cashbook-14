import Component from '../../../core/Component';
import jsx from '../../../core/jsx';
import './style';

export interface CategoryTagProps {
  id: string;
  title: string;
  color: string;
}

export default class CategoryTag extends Component<CategoryTagProps> {
  constructor(props: CategoryTagProps) {
    super(props);

    this.setDom();
  }
  render() {
    const { title, color } = this.props;

    return jsx`
      <div class='category-tag' style='background-color: ${color}'>
        ${title}
      </div>
    `;
  }
}
