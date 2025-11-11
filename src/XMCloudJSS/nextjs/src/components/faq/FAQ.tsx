import React from 'react';
import { Text, RichText, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type FieldValue = { jsonValue?: any; value?: string } | undefined;

type FAQData = {
  id?: string;
  name?: string;
  question?: FieldValue;
  answer?: FieldValue;
};

type SimpleFAQProps = ComponentProps & {
  // note: fields shape may vary between disconnected and connected modes
  fields?: any;
};

const FAQ = (props: SimpleFAQProps): JSX.Element => {
  // Two possible shapes:
  // 1) Integrated GraphQL: props.fields.data.datasource  (preferred in connected mode)
  // 2) Disconnected YAML: props.fields (fields directly on rendering)
  const fieldsRoot = (props.fields && (props.fields.data?.datasource ? props.fields.data : props.fields)) || props.fields || {};
  // If fieldsRoot contains a datasource, use it; otherwise treat fieldsRoot as the datasource
  const datasource: FAQData = fieldsRoot.datasource || fieldsRoot;

  // normalize to something Text/RichText components accept:
  const questionField = datasource?.question?.jsonValue ? datasource.question.jsonValue : { value: datasource?.question?.value };
  const answerField = datasource?.answer?.jsonValue ? datasource.answer.jsonValue : { value: datasource?.answer?.value };
   console.log("This is questionField", questionField);
   console.log("This is answerField", answerField);
  const hasQuestion = !!(datasource?.question && (datasource.question.jsonValue || datasource.question.value));
  const hasAnswer = !!(datasource?.answer && (datasource.answer.jsonValue || datasource.answer.value));
  console.log("This is hasQuestion", hasQuestion)
  console.log("This is hasAnswer", hasAnswer)
  return (
    <div className="faq-component" data-e2e-id="faq-component">
      <div className="faq-inner">
        {hasQuestion ? (
          <h2 className="faq-question">
            <Text field={questionField} />
          </h2>
        ) : null}

        {hasAnswer ? (
          <div className="faq-answer">
            <RichText field={answerField} />
          </div>
        ) : null}

        {!hasQuestion && !hasAnswer && <p>No FAQ content found.</p>}
      </div>

      <style jsx>{`
        .faq-component { max-width: 700px; margin: 2rem auto; padding: 1rem; }
        .faq-question { font-size: 1.5rem; margin-bottom: 0.75rem; }
        .faq-answer { color: #444; line-height: 1.6; }
      `}</style>
    </div>
  );
};

export default withDatasourceCheck()<SimpleFAQProps>(FAQ);
