// const AUTH_SERVICES_BASE_URL = `${process.env.REACT_APP_HIVEPATH_AUTH_API_URL}`;
// const LANDING_PAGE_SERVICES_BASE_URL = `${process.env.REACT_APP_HIVEPATH_LANDING_PAGE_API_URL}`;
// const KNOWLEDGE_SESSIONS_SERVICES_BASE_URL = `${process.env.REACT_APP_HIVEPATH_KNOWLEDGE_SESSION_API_URL}`;
// const USER_PROFILE_SERVICES_BASE_URL = `${process.env.REACT_APP_HIVEPATH_USER_PROFILE_API_URL}`;
// const CALENDAR_SERVICES_BASE_URL = `${process.env.REACT_APP_HIVEPATH_CALENDAR_API_URL}`;
// const SCHEDULE_SERVICES_BASE_URL = `${process.env.REACT_APP_HIVEPATH_SCHEDULE_API_URL}`;
// const UTILS_SERVICES_BASE_URL = `${process.env.REACT_APP_HIVEPATH_UTIL_API_URL}`;

const HIVEPATH_API_URLS = {
  ADMIN_SERVICES: {
    CREATE_CATEGORY: `https://app-schedule.hivepath.io/api/createCategory`,
    UPDATE_CATEGORY: `https://app-schedule.hivepath.io/api/updateCategory`,
    DELETE_CATEGORY: `https://app-schedule.hivepath.io/api/deleteCategory`,
    CREATE_SERVICE: `https://app-schedule.hivepath.io/api/createService`,
    UPDATE_SERVICE: `https://app-schedule.hivepath.io/api/updateService`,
    DELETE_SERVICE: `https://app-schedule.hivepath.io/api/deleteService`,
    FETCH_CATEGORY: `https://app-schedule.hivepath.io/api/fetchCategory`,
    FETCH_AGGREGATED_CATEGORY: `https://app-schedule.hivepath.io/api/aggregatedServiceList`,
    CREATE_BRANCH: `https://app-schedule.hivepath.io/api/createCompany`,
    FETCH_DASHBOARD: `https://app-schedule.hivepath.io/api/statsDashboard`,
    FETCH_MASTER_COMPANY: `https://app-schedule.hivepath.io/api/fetchCompanyMaster`,
    UPDATE_MASTER_COMPANY: `https://app-schedule.hivepath.io/api/updateCompanyMaster`,
    UPLOAD_FILE_SERVICE: `https://app-schedule.hivepath.io/api/mediaUpload`,
    UPDATE_BOOKING: `https://app-schedule.hivepath.io/api/updateBookingStatus`,
    UPDATE_COMPANY: `https://app-schedule.hivepath.io/api/updateCompany`,
    DELETE_COMPANY: `https://app-schedule.hivepath.io/api/deleteCompany`,
    FETCH_CALENDAR: `https://app-schedule.hivepath.io/api/fetchCalendar`,
    FETCH_CALENDAR_SLOTS: `https://app-schedule.hivepath.io/api/fetchCalendarSlot`,
  },
  CUSTOMER_SERVICES: {
    CREATE_BOOKING: `https://app-schedule.hivepath.io/api/appointmentBooking`,
    FETCH_SLOTS: `https://app-schedule.hivepath.io/api/fetchSlots`,
  },
  GENERAL_SERVICES: {
    FETCH_COMPANY: "https://app-schedule.hivepath.io/api/fetchCompany",
  },
  AUTH_SERVICES: {
    LOGIN: `https://app-schedule.hivepath.io/api/login`,
  },
};

export const {
  ADMIN_SERVICES,
  CUSTOMER_SERVICES,
  GENERAL_SERVICES,
  AUTH_SERVICES,
} = HIVEPATH_API_URLS;
export default HIVEPATH_API_URLS;
