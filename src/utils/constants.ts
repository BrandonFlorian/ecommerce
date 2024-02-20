export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

export const HEADER_HEIGHT: number = 60;
export const SWR_RETRY_COUNT: number = 1;
export const GALLERY_PAGE_SIZE: number = 12;

//Endpoints
export const LOCALHOST_API = process.env.NEXT_PUBLIC_LOCALHOST_API || "";
export const PRODUCTS_ENDPOINT: string =
  process.env.NEXT_PUBLIC_PRODUCTS_ENDPOINT || "";
export const PRODUCTS_CLIENT_ENDPOINT: string =
  process.env.NEXT_PUBLIC_PRODUCTS_CLIENT_ENDPOINT || "";
export const PROFILES_ENDPOINT: string =
  process.env.NEXT_PUBLIC_PROFILE_ENDPOINT || "";
export const PROFILES_CLIENT_ENDPOINT: string =
  process.env.NEXT_PUBLIC_PROFILE_CLIENT_ENDPOINT || "";
export const USERNAME_ENDPOINT: string =
  process.env.NEXT_PUBLIC_USERNAME_ENDPOINT || "";
export const USERNAME_CLIENT_ENDPOINT: string =
  process.env.NEXT_PUBLIC_USERNAME_CLIENT_ENDPOINT || "";
export const ORDERS_ENDPOINT: string =
  process.env.NEXT_PUBLIC_ORDER_ENDPOINT || "";
export const IMAGE_HOSTNAME: string =
  process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || "";

export const IMAGE_BUCKET: string = process.env.NEXT_PUBLIC_IMAGE_BUCKET || "";

export const appPaths = {
  home: "/",
  products: "/products",
  profile: "/profile",
  cart: "/cart",
  checkout: "/checkout",
  signIn: "/auth",
  order: "/orders",
  support: "/support",
};

export const FOOTER_LINKS = [
  {
    title: "About",
    links: [
      {
        label: "Features",
        link: "#",
      },
      {
        label: "Pricing",
        link: "#",
      },
      {
        label: "Support",
        link: "#",
      },
      {
        label: "Forums",
        link: "#",
      },
    ],
  },
  {
    title: "Second Column",
    links: [
      {
        label: "Project 1",
        link: "#",
      },
      {
        label: "Project 2",
        link: "#",
      },
      {
        label: "Project 3",
        link: "#",
      },
      {
        label: "Upcoming",
        link: "#",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Join Discord",
        link: "#",
      },
      {
        label: "Follow on Twitter",
        link: "#",
      },
      {
        label: "Email newsletter",
        link: "#",
      },
      {
        label: "GitHub discussions",
        link: "#",
      },
    ],
  },
];

export const FILTER_TERMS = [
  { value: "low", label: "Price Low to High" },
  { value: "high", label: "Price High to Low" },
  { value: "new", label: "Newest" },
  { value: "old", label: "Oldest" },
];

export const countryWithPhoneCodes = [
  { name: "United States", code: "US", phoneCode: "+1" },
  { name: "Canada", code: "CA", phoneCode: "+1" },
  { name: "United Kingdom", code: "GB", phoneCode: "+44" },
  { name: "Australia", code: "AU", phoneCode: "+61" },
  { name: "India", code: "IN", phoneCode: "+91" },
  { name: "China", code: "CN", phoneCode: "+86" },
  { name: "Japan", code: "JP", phoneCode: "+81" },
  { name: "Germany", code: "DE", phoneCode: "+49" },
  { name: "France", code: "FR", phoneCode: "+33" },
  { name: "Brazil", code: "BR", phoneCode: "+55" },
  { name: "Mexico", code: "MX", phoneCode: "+52" },
  { name: "Russia", code: "RU", phoneCode: "+7" },
  { name: "South Africa", code: "ZA", phoneCode: "+27" },
  { name: "Nigeria", code: "NG", phoneCode: "+234" },
  { name: "Italy", code: "IT", phoneCode: "+39" },
  { name: "Spain", code: "ES", phoneCode: "+34" },
  { name: "Netherlands", code: "NL", phoneCode: "+31" },
  { name: "Belgium", code: "BE", phoneCode: "+32" },
  { name: "New Zealand", code: "NZ", phoneCode: "+64" },
  { name: "Sweden", code: "SE", phoneCode: "+46" },
];

export const countries = [
  { name: "Argentina", code: "AR" },
  { name: "land Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];
