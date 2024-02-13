

const companyName = `${process.env.REACT_APP_CLIENT_COMPANY_NAME}`;
// const companyLogoURL = `${process.env.REACT_APP_CLIENT_COMPANY_LOGO_URL}`;
const companyLandingPage = `${process.env.REACT_APP_CLIENT_COMPANY_WEBSITE}`;


const companyLogoURL ='https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png'


const COMPANY_DATA = {
  COMPANY_NAME: `${companyName}`,
  COMPANY_LOGO: `${companyLogoURL}` ,
  COMPANY_LANDING_PAGE: `${companyLandingPage}`,
};

export const { COMPANY_NAME, COMPANY_LOGO, COMPANY_LANDING_PAGE } =
  COMPANY_DATA;

export default COMPANY_DATA;
