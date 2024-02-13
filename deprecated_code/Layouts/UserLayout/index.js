import Seo from "../../components/Seo";
import { Box } from "@mui/system";
import NoAuthAppHeader from "components/NoAuthAppHeader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ServiceHeader from "sections/userPageSections/components/ServiceHeader";

const UserLayout = ({ title, children }) => {
  return (
    <div>
      {/* <NoAuthAppHeader isAdmin /> */}
      <ServiceHeader />
      <Seo title={title} />
      <Box
        sx={{
          display: "flex",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <Box sx={{ flexGrow: "1", p: "3", width: "100%" }}>{children}</Box>
      </Box>
    </div>
  );
};

export default UserLayout;
