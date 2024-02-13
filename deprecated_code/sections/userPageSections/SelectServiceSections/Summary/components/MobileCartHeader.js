import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import { Button } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MobileCartHeader = ({ styles, navigate, toggleDrawer, open }) => {
  const { items } = useSelector((state) => state.cart);
  let grandTotal = 0;
  let servicesCount = items.length;
  grandTotal = items.reduce(function (sum, item) {
    const { service_price } = item.service_meta;
    return sum + item.count * service_price;
  }, grandTotal);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "10px",
        paddingRight: "10px",
        position: "fixed",
        bottom: "0",
        left: "0",
        background: "white",
        width: "100%",
        boxShadow: "0px -1px 15px rgba(0, 0, 0, 0.08)",
        ...styles,
      }}
    >
      <div>
        <Typography sx={{ p: 2, pb: 0, color: "#26334D", fontSize: "14px" }}>
          {servicesCount} services added
        </Typography>
        <Typography
          sx={{
            pl: 2,
            color: "#26334D",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Total - ₹ {grandTotal}
        </Typography>
      </div>
      <div style={{ paddingRight: "10px" }}>
        <Button
          onClick={toggleDrawer()}
          sx={{ color: "#3361FF", fontSize: "12px" }}
        >
          View {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </Button>
        <SecondaryButton title="Continue" onClick={navigate} />
      </div>
    </Box>
  );
};

export default MobileCartHeader;
