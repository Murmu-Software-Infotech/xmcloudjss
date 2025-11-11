import { Field, Text, LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';

interface MenuItem {
  fields: {
    linkText: Field<string>;
    linkUrl: LinkField;
  };
}

interface FooterFields {
  title: Field<string>;
  menuItems: MenuItem[];
}

type FooterProps = { fields: FooterFields };

const Footer11 = ({ fields }: FooterProps) => {
 console.log("Footer fields:", JSON.stringify(fields, null, 2));

  // data empty safe check 
  if (!fields || Object.keys(fields).length === 0) {
    return (
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>⚠️ Footer data not found (check your YAML fields structure)</p>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 text-center">
      <h4 className=" bg-dark text-xl font-semibold mb-4">
       <Text field={fields.title} />
      </h4>

      <ul className="flex justify-center space-x-6">
        {fields.menuItems?.map((item, index) => (
          <li key={index}>
            <Link field={item.fields.linkUrl}>
              <Text field={item.fields.linkText} />
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-primary">
        © 2025 Crowdrob. All rights reserved.
      </p>
    </footer>
  );
};

 export default Footer11;
// export default withDatasourceCheck()<FooterProps>(Footer);
