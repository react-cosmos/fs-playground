import Italics from '../components/Italics';
import Bold from '../components/Bold';

const InlineComponent = () => <span />;

export default [
  {
    component: Bold,
    props: {
      name: 'Sarah'
    }
  },
  {
    component: InlineComponent,
    props: {
      name: 'Alina'
    }
  },
  {
    component: Italics,
    props: {
      name: 'John'
    }
  }
];
