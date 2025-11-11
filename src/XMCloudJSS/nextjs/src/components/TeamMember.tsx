import { Field, Text, RichText, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

interface TeamMemberFields {
  name: Field<string>;
  role: Field<string>;
  bio: Field<string>;
}

interface TeamMemberProps {
  fields: TeamMemberFields;
  rendering: { componentName: string };
}

const TeamMember = (props: TeamMemberProps): JSX.Element => {
  const { fields } = props;

  return (
    <div className='container'>
    <div className="row">
         <div className="col-md-4">
    <div className="card   shadow-lg border-0 rounded-4 mb-4">
      <div className="card-body text-center p-4">
        <div className="mb-3">
          <img
            src="https://picsum.photos/120"
            alt="team"
            className="rounded-circle border border-3 border-primary mb-3"
          />
        </div>
        <h2 className="card-title h4 fw-bold text-dark mb-1">
          <Text field={fields.name} />
        </h2>
        <h5 className="text-muted mb-3">
          <Text field={fields.role} />
        </h5>
        <div className="card-text text-secondary">
          <RichText field={fields.bio} />
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default withDatasourceCheck()<TeamMemberProps>(TeamMember);
