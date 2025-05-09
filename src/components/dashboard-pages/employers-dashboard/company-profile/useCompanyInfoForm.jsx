import { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/api/axiosInstance"; // Adjusted path

const useCompanyInfoForm = () => {
  const [infoData, setInfoData] = useState({
    companyName: "aa",
    aboutCompany: "aa",
    gstNo: "aa",
    contactPerson: "aa",
    contactNumber: "8448804428",
    email: "aa",
    otherDetails: "aa",
    factoryLicenseNo: "aa",
    typeOfCasting: [],
    manufacturingCapacity: "aa",
    yearOfEstablishment: "aa",
    isoCertifications: "aa",
    keyProducts: "aa",
    website: "aa",
  });

  const [contactData, setContactData] = useState({
    country: "India",
    state: "aa",
    city: "aa",
    pinCode: "121102",
    addressLine1: "aa",
    addressLine2: "aa",
    googleMapLink: "aa",
  });

  const [socialData, setSocialData] = useState({
    facebook: "https://www.facebook.com/",
    twitter: "https://www.facebook.com/",
    linkedin: "https://www.facebook.com/",
    instagram: "https://www.facebook.com/",
  });

  const [errors, setErrors] = useState({});
  const [isExistingCompany, setIsExistingCompany] = useState(false);
  console.log(errors);
  // ✅ Fetch my company info on mount
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await axiosInstance.get("/company/get-my-company-info");

        const { infoData, contactData, socialData } = res.data.company; // Assuming structure remains the same
        setInfoData(infoData);
        setContactData(contactData);
        setSocialData(socialData);
        setIsExistingCompany(true);
      } catch (error) {
        console.log("No existing company found or failed to fetch.");
        setIsExistingCompany(false);
      }
    };
    fetchCompanyInfo();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!infoData.companyName.trim())
      newErrors.companyName = "Company Name is required";
    if (!infoData.contactNumber.trim())
      newErrors.contactNumber = "Contact Number is required";
    else if (!/^[6-9]\d{9}$/.test(infoData.contactNumber))
      newErrors.contactNumber = "Invalid Indian phone number";

    if (!contactData.state.trim()) newErrors.state = "State is required";
    if (!contactData.city.trim()) newErrors.city = "City is required";
    if (!contactData.pinCode.trim()) newErrors.pinCode = "Pin Code is required";
    else if (!/^[1-9][0-9]{5}$/.test(contactData.pinCode))
      newErrors.pinCode = "Invalid Indian Pin Code";

    if (!contactData.addressLine1.trim())
      newErrors.addressLine1 = "Address Line 1 is required";

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    Object.keys(socialData).forEach((field) => {
      if (socialData[field] && !urlPattern.test(socialData[field])) {
        newErrors[field] = `${field} must be a valid URL`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please correct the form errors.");
      return false;
    }

    const payload = {
      infoData,
      contactData,
      socialData,
    };

    try {
      if (isExistingCompany) {
        await axiosInstance.put("/company/update-company-info", payload);
        alert("Company Information Updated Successfully!");
      } else {
        await axiosInstance.post("/company/create-company-info", payload);
        alert("Company Information Created Successfully!");
        setIsExistingCompany(true); // For future updates
      }

      return true;
    } catch (error) {
      console.error("Error submitting company info:", error);
      alert("Something went wrong. Try again.");
      return false;
    }
  };

  return {
    infoData,
    setInfoData,
    contactData,
    setContactData,
    socialData,
    setSocialData,
    errors,
    handleSubmit,
    isExistingCompany,
  };
};

export default useCompanyInfoForm;
