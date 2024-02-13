import { Box, Chip, ToggleButtonGroup } from "@mui/material";
import AppLink from "components/Common/AppLink";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { VENDOR } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppPageSections from "sections/AppPageSections";
import ProductsPageTable from "sections/ProductsPageSection/ProductsPageTable";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function VendorPageSection() {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.merchant_id;
  const [vendorList, setVendorList] = useState([]);

  const handleFetchVendorsList = () => {
    const URL = VENDOR.FETCH_VENDOR;
    const data = {
      user_id: USER_ID,
    };
    appFetch(URL, data).then((json) => {
      console.log(json);
      setVendorList(json.result);
    });
  };
  useEffect(() => {
    handleFetchVendorsList();
  }, []);

  const vendorTableData =
    Array.isArray(vendorList) &&
    vendorList.map((vendor) => {
      const { vendor_id } = vendor;
      return {
        ...vendor,
        id: vendor_id,
      };
    });

  const headerData = [
    {
      field: "vendor_id",
      headerName: "Vendor Id",
      width: 180,
      renderCell: (params) => (
        <AppLink href={`/app/vendors/${params.value}?tab=overview`}>{params.value}</AppLink>
      ),
    },
    {
      field: "company_name",
      headerName: "Company Name",
      // width: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email Id",
      // width: 150,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "website_link",
      headerName: "Website Link",
      width: 150,
    },
    {
      field: "online_order_portal",
      headerName: "Online Order Portal",
      width: 150,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      width: 150,
    },
    {
      field: "payment_terms",
      headerName: "Payment Terms",
      width: 150,
    },
    {
      field: "vendor_lead_time",
      headerName: "Vendor Leadtime",
      width: 150,
    },
  ];

  /**
	 * {
    "address1": "Random building",
    "address2": "",
    "city": "Random City",
    "company_name": "Adidas",
    "contact_name": "",
    "contact_phone_number": "",
    "country": "USA",
    "email_id": "admin@adidas.com",
    "online_order_portal": "https://store.adidas.com",
    "payment_method": "Credit card",
    "payment_terms": "CIA: Cash in advance",
    "phone_number": "1234567890",
    "state": "Random City",
    "user_id": "138944605333795140",
    "username": "adidas-admin",
    "vendor_id": "1675591749374",
    "vendor_leadtime": 9,
    "vendor_restock_time": 9,
    "website_link": "https://adidas.com",
    "zipcode": "111111"
}
	 */
  return (
    <div>
      <AppPageSections
        hasStepOnboarding={true}
        title={"Vendors"}
        tableData={vendorTableData}
        pageView
        views={["list"]}
        rowIdkey={"vendor_id"}
        columnData={headerData}
      />
    </div>
  );
}

const table2Data = [
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
  {
    "Vendor Id": "321",
    "Master Item ID": "A0B1C024",
    "Master Product ID": "4339",
    "Item Title": "Day Glove ReKnit",

    "Unit Cost": "$95.00",
    "Minimum Order Quantity": "12",
    "Lead Time in days": "5",
  },
];
