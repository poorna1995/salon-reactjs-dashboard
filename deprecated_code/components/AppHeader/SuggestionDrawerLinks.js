// import { ReaactComponent as DashboardIcon } from "assets/svg/dashboard/dashboard.svg";
import { ReactComponent as SettingsIcon } from "assets/svg/dashboard/settings.svg";
import { ReactComponent as ServicesIcon } from "assets/svg/dashboard/services.svg";
import { ReactComponent as CalendarIcon } from "assets/svg/dashboard/calendar.svg";
import { Dashboard } from "@mui/icons-material";
import DropDownMenuItemLink from "./DropDownMenu/DropDownMenuItemLink";
import { useParams } from "react-router-dom";

const SuggestionDrawerLinks = () => {
  const { company_domain } = useParams();
  const links = [
    {
      title: "Dashboard",
      url: `/${company_domain}/dashboard`,
      icon: Dashboard,
      exact: true,
      show: true,
    },
    {
      title: "Services",
      url: `/${company_domain}/services`,
      icon: ServicesIcon,
      show: true,
    },
    {
      title: "Calendar",
      url: `/${company_domain}/calendar`,
      icon: CalendarIcon,
      show: true,
    },
    {
      title: "Settings",
      url: `/${company_domain}/settings`,
      icon: SettingsIcon,
      show: true,
    },
  ];
  const filteredLinks = links;

  return (
    <div>
      {filteredLinks.map((item) => {
        const { url, icon, title, hasDivider, description } = item;

        return (
          <DropDownMenuItemLink
            key={title + url}
            url={url}
            icon={icon}
            title={title}
            hasDivider={hasDivider}
            description={description}
          />
        );
      })}
    </div>
  );
};

export default SuggestionDrawerLinks;
