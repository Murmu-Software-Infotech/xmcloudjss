import { Text,  withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import NextLink from 'next/link';

type DataSource = {
  sample1?: {
    jsonValue?: { value: string };
    value?: string;
  };
  sample2?: {
    definition?: { type: string; shared: boolean };
    jsonValue?: {
      value: {
        href: string;
        linktype: string;
        target: string;
        text: string;
        url: string;
      };
    };
    target?: string;
    text?: string;
    url?: string;
  };
  name?: string;
  id?: string;
};

type Item = {
  id: string;
  url: { path: string };
  pageTitle: {
    value: string;
    jsonValue: { value: string };
  };
};

type ItemSearchResults = {
  results: Item[];
};

type GraphQlIntegratedDemoProps = ComponentProps & {
  fields?: {
    heading?: { value: string };
    content?: { value: string };
    data?: {
      datasource?: DataSource;
      contextItem?: {
        id?: string;
        children?: ItemSearchResults;
        pageTitle?: { value: string };
      };
    };
  };
};

const DemoGraphQl = (props: GraphQlIntegratedDemoProps): JSX.Element => {
  // Pull normal disconnected fields
  const heading = props.fields?.heading?.value || '';
  const content = props.fields?.content?.value || '';

  // Pull GraphQL-integrated data if present
  const data = props.fields?.data || {};
  const datasource = data.datasource;
  const contextItem = data.contextItem;

  console.log('Datasource =>', datasource);
  console.log('ContextItem =>', contextItem);

  return (
    <div data-e2e-id="graphql-integrated" className="p-3 border rounded-3 shadow-sm bg-light">
      {/* Render disconnected fields */}
      {heading && <h2 className="mb-3">{heading}</h2>}
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}

      {/* Render GraphQL Datasource (only if data present) */}
      {datasource ? (
        <div className="mt-4">
          <h4>Datasource Item (via Integrated GraphQL)</h4>
          <p><strong>ID:</strong> {datasource.id}</p>
          <p><strong>Name:</strong> {datasource.name}</p>
          <p><strong>Sample1:</strong> {datasource.sample1?.value || 'No value found'}</p>

          {datasource.sample2 && (
            <ul>
              <li>Text: {datasource.sample2.text}</li>
              <li>URL: {datasource.sample2.url}</li>
              <li>Target: {datasource.sample2.target}</li>
              <li>Type: {datasource.sample2.definition?.type}</li>
              <li>Shared?: {datasource.sample2.definition?.shared?.toString()}</li>
              {/* <li>
                Editable Link: <Link field={datasource.sample2.jsonValue} />
              </li> */}
            </ul>
          )}
        </div>
      ) : (
        <p className="text-muted mt-4">
          ................
        </p>
      )}

      {/* Render GraphQL Context Item */}
      {contextItem && (
        <div className="mt-4">
          <h4>Route Item (via Integrated GraphQL)</h4>
          <p>ID: {contextItem.id}</p>
          <p>Page Title: {contextItem.pageTitle?.value}</p>

          {contextItem.children?.results?.length ? (
            <ul>
              {contextItem.children.results.map((child: Item) => (
                <li key={child.id}>
                  <NextLink href={child.url.path}>{child.pageTitle.value}</NextLink> (
                  <Text field={child.pageTitle.jsonValue} />)
                </li>
              ))}
            </ul>
          ) : (
            <p>No child items found.</p>
          )}
        </div>
      )}
    </div>
  );
};


export default withDatasourceCheck()<GraphQlIntegratedDemoProps>(DemoGraphQl);
