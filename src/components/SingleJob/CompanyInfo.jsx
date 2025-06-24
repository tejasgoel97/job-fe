const CompanyInfo = ({companyDetails}) => {
  console.log(companyDetails)
//   {
//     "companyName": "UNICRON APPS AND WEBSITES",
//     "aboutCompany": "This is a Good Company To Work WIth",
//     "gstNo": "06AHLPG((^^H@ZS",
//     "contactPerson": "Tejas",
//     "contactNumber": "8448804426",
//     "email": "unicronapps@gmail.com",
//     "otherDetails": "This is other Details section",
//     "factoryLicenseNo": "NA",
//     "typeOfCasting": [],
//     "manufacturingCapacity": "200",
//     "yearOfEstablishment": "1995",
//     "isoCertifications": "We don't have",
//     "keyProducts": "Nothing till now",
//     "website": "hungerloop.com"
// }
if(!companyDetails && !companyDetails?.infoData) return <></>;
const { companyName,
    aboutCompany,
    gstNo,
    contactPerson,
    contactNumber,
    email,
    otherDetails,
    factoryLicenseNo,
    typeOfCasting,
    manufacturingCapacity,
    yearOfEstablishment,
    isoCertifications,
    keyProducts,
    website} = companyDetails.infoData
  return (
    <ul className="company-info">

      {gstNo && (
        <li>
          GST No: <span>{gstNo}</span>
        </li>
      )}
      {factoryLicenseNo && (
        <li>
          Factory License No: <span>{factoryLicenseNo}</span>
        </li>
      )}
      {yearOfEstablishment && (
        <li>
          Year of Establishment: <span>{yearOfEstablishment}</span>
        </li>
      )}
      {manufacturingCapacity && (
        <li>
          Manufacturing Capacity: <span>{manufacturingCapacity}</span>
        </li>
      )}
      {isoCertifications && (
        <li>
          ISO Certifications: <span>{isoCertifications}</span>
        </li>
      )}
      {keyProducts && (
        <li>
          Key Products: <span>{keyProducts}</span>
        </li>
      )}
      {typeOfCasting && typeOfCasting.length > 0 && (
        <li>
          Type of Casting: <span>{typeOfCasting.join(", ")}</span>
        </li>
      )}
      {contactPerson && (
        <li>
          Contact Person: <span>{contactPerson}</span>
        </li>
      )}
      {contactNumber && (
        <li>
          Phone: <span>{contactNumber}</span>
        </li>
      )}

    </ul>
  );
};

export default CompanyInfo;
