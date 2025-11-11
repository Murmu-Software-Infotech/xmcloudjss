import React from 'react';
import { Text, RichText, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type FAQDatasource = {
  id?: string;
  name?: string;
  question?: {
    jsonValue?: any;
    value?: string;
  };
  answer?: {
    jsonValue?: any;
    value?: string;
  };
};

type SimpleFAQProps = ComponentProps & {
  fields: {
    data: {
      datasource?: FAQDatasource;
      contextItem?: {
        id?: string;
        pageTitle?: { value?: string };
      };
    };
  };
};

const SimpleFAQQ = (props: SimpleFAQProps): JSX.Element => {
  const { datasource, contextItem } = props.fields?.data || {};

  const questionValue =
    datasource?.question?.jsonValue || { value: datasource?.question?.value };

  const answerValue =
    datasource?.answer?.jsonValue || { value: datasource?.answer?.value };

  return (
    <div className="simple-faq">
      {datasource?.question && (
        <h2 className="faq-question">
          <Text field={questionValue} />
        </h2>
      )}

      {datasource?.answer && (
        <div className="faq-answer">
          <RichText field={answerValue} />
        </div>
      )}

      {!datasource?.question && !datasource?.answer && (
        <p>No FAQ content found.</p>
      )}

      {contextItem?.pageTitle?.value && (
        <div className="faq-context">Page: {contextItem.pageTitle.value}</div>
      )}

      <style jsx>{`
        .simple-faq {
          max-width: 700px;
          margin: 2rem auto;
        }
        .faq-question {
          font-size: 1.7rem;
          margin-bottom: 1rem;
          font-weight: bold;
          color: #333;
        }
        .faq-answer {
          line-height: 1.6;
          font-size: 1.1rem;
          color: #444;
        }
      `}</style>
    </div>
  );
};

export default withDatasourceCheck()<SimpleFAQProps>(SimpleFAQQ);
