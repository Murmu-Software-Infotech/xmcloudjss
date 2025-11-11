import { Text, Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useTheme } from 'src/context/ThemeContext';


type DemoComponentProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    description: Field<string>;
  };
};

const DemoComponent = (props: DemoComponentProps): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  return(
  <div>
    <p>DemoComponent Component</p>
    <Text field={props.fields.heading} />
    <RichText field={props.fields.description} />
    <p>Current Theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>
        Toggle Theme Here
      </button>
  </div>
  );
};

export default withDatasourceCheck()<DemoComponentProps>(DemoComponent);
