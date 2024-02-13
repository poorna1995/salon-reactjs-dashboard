import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
// import ServiceListItem from "./components/ServiceListItem";
import ServiceItem from "./components/ServiceItem";
import { useTheme } from "@mui/styles";

export default function MobileServiceSection({ data, onAdd, onRemove }) {
  //   const { data } = useSelector((state) => state.services);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      style={{
        fontWeight: "800",
        marginBottom: "80px",
        marginTop: "210px",
        padding: "10px",
      }}
    >
      <Typography fontSize={"12px"} mb={1}>
        Select a category
      </Typography>
      {data.map((item, index) => {
        const { category_id, category_name, service_list } = item;
        return (
          <Accordion
            expanded={expanded === category_id}
            onChange={handleChange(category_id)}
            key={`${index}accord`}
            sx={{
              border: "1px solid rgba(38, 51, 77, 0.08)",
              boxShadow: "none !important",
              marginBottom: "10px",
              borderRadius: "5px",
              "&::before": {
                backgroundColor: "transparent",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${category_id}bh-content`}
              id={`${category_id}bh-header`}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  width: "70%",
                  flexShrink: 0,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "16px",
                  },
                }}
              >
                {category_name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {service_list.map((item, index) => {
                return (
                  <ServiceItem
                    data={item}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    key={`si${index}`}
                  />
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
