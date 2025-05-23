type Country = {
  name: string;
  code: string;
  phonePrefix: number;
  continent?: string; // optional field for additional categorization
};

// List of all world countries with essential information for an online store
export const countries: Country[] = [
  { name: 'Afghanistan', code: 'AF', phonePrefix: 93, continent: 'Asia' },
  { name: 'Albania', code: 'AL', phonePrefix: 355, continent: 'Europe' },
  { name: 'Algeria', code: 'DZ', phonePrefix: 213, continent: 'Africa' },
  { name: 'Andorra', code: 'AD', phonePrefix: 376, continent: 'Europe' },
  { name: 'Angola', code: 'AO', phonePrefix: 244, continent: 'Africa' },
  { name: 'Argentina', code: 'AR', phonePrefix: 54, continent: 'South America' },
  { name: 'Armenia', code: 'AM', phonePrefix: 374, continent: 'Asia' },
  { name: 'Australia', code: 'AU', phonePrefix: 61, continent: 'Oceania' },
  { name: 'Austria', code: 'AT', phonePrefix: 43, continent: 'Europe' },
  { name: 'Azerbaijan', code: 'AZ', phonePrefix: 994, continent: 'Asia' },
  { name: 'Bahamas', code: 'BS', phonePrefix: 1, continent: 'North America' },
  { name: 'Bahrain', code: 'BH', phonePrefix: 973, continent: 'Asia' },
  { name: 'Bangladesh', code: 'BD', phonePrefix: 880, continent: 'Asia' },
  { name: 'Barbados', code: 'BB', phonePrefix: 1, continent: 'North America' },
  { name: 'Belarus', code: 'BY', phonePrefix: 375, continent: 'Europe' },
  { name: 'Belgium', code: 'BE', phonePrefix: 32, continent: 'Europe' },
  { name: 'Belize', code: 'BZ', phonePrefix: 501, continent: 'North America' },
  { name: 'Benin', code: 'BJ', phonePrefix: 229, continent: 'Africa' },
  { name: 'Bhutan', code: 'BT', phonePrefix: 975, continent: 'Asia' },
  { name: 'Bolivia', code: 'BO', phonePrefix: 591, continent: 'South America' },
  { name: 'Bosnia and Herzegovina', code: 'BA', phonePrefix: 387, continent: 'Europe' },
  { name: 'Botswana', code: 'BW', phonePrefix: 267, continent: 'Africa' },
  { name: 'Brazil', code: 'BR', phonePrefix: 55, continent: 'South America' },
  { name: 'Brunei', code: 'BN', phonePrefix: 673, continent: 'Asia' },
  { name: 'Bulgaria', code: 'BG', phonePrefix: 359, continent: 'Europe' },
  { name: 'Burkina Faso', code: 'BF', phonePrefix: 226, continent: 'Africa' },
  { name: 'Burundi', code: 'BI', phonePrefix: 257, continent: 'Africa' },
  { name: 'Cambodia', code: 'KH', phonePrefix: 855, continent: 'Asia' },
  { name: 'Cameroon', code: 'CM', phonePrefix: 237, continent: 'Africa' },
  { name: 'Canada', code: 'CA', phonePrefix: 1, continent: 'North America' },
  { name: 'Cape Verde', code: 'CV', phonePrefix: 238, continent: 'Africa' },
  { name: 'Central African Republic', code: 'CF', phonePrefix: 236, continent: 'Africa' },
  { name: 'Chad', code: 'TD', phonePrefix: 235, continent: 'Africa' },
  { name: 'Chile', code: 'CL', phonePrefix: 56, continent: 'South America' },
  { name: 'China', code: 'CN', phonePrefix: 86, continent: 'Asia' },
  { name: 'Colombia', code: 'CO', phonePrefix: 57, continent: 'South America' },
  { name: 'Comoros', code: 'KM', phonePrefix: 269, continent: 'Africa' },
  { name: 'Congo (Brazzaville)', code: 'CG', phonePrefix: 242, continent: 'Africa' },
  { name: 'Congo (Kinshasa)', code: 'CD', phonePrefix: 243, continent: 'Africa' },
  { name: 'Costa Rica', code: 'CR', phonePrefix: 506, continent: 'North America' },
  { name: 'Croatia', code: 'HR', phonePrefix: 385, continent: 'Europe' },
  { name: 'Cuba', code: 'CU', phonePrefix: 53, continent: 'North America' },
  { name: 'Cyprus', code: 'CY', phonePrefix: 357, continent: 'Europe' },
  { name: 'Czechia', code: 'CZ', phonePrefix: 420, continent: 'Europe' },
  { name: 'Denmark', code: 'DK', phonePrefix: 45, continent: 'Europe' },
  { name: 'Djibouti', code: 'DJ', phonePrefix: 253, continent: 'Africa' },
  { name: 'Dominica', code: 'DM', phonePrefix: 1, continent: 'North America' },
  { name: 'Dominican Republic', code: 'DO', phonePrefix: 1, continent: 'North America' },
  { name: 'Ecuador', code: 'EC', phonePrefix: 593, continent: 'South America' },
  { name: 'Egypt', code: 'EG', phonePrefix: 20, continent: 'Africa' },
  { name: 'El Salvador', code: 'SV', phonePrefix: 503, continent: 'North America' },
  { name: 'Equatorial Guinea', code: 'GQ', phonePrefix: 240, continent: 'Africa' },
  { name: 'Eritrea', code: 'ER', phonePrefix: 291, continent: 'Africa' },
  { name: 'Estonia', code: 'EE', phonePrefix: 372, continent: 'Europe' },
  { name: 'Eswatini', code: 'SZ', phonePrefix: 268, continent: 'Africa' },
  { name: 'Ethiopia', code: 'ET', phonePrefix: 251, continent: 'Africa' },
  { name: 'Fiji', code: 'FJ', phonePrefix: 679, continent: 'Oceania' },
  { name: 'Finland', code: 'FI', phonePrefix: 358, continent: 'Europe' },
  { name: 'France', code: 'FR', phonePrefix: 33, continent: 'Europe' },
  { name: 'Gabon', code: 'GA', phonePrefix: 241, continent: 'Africa' },
  { name: 'Gambia', code: 'GM', phonePrefix: 220, continent: 'Africa' },
  { name: 'Georgia', code: 'GE', phonePrefix: 995, continent: 'Asia' },
  { name: 'Germany', code: 'DE', phonePrefix: 49, continent: 'Europe' },
  { name: 'Ghana', code: 'GH', phonePrefix: 233, continent: 'Africa' },
  { name: 'Greece', code: 'GR', phonePrefix: 30, continent: 'Europe' },
  { name: 'Grenada', code: 'GD', phonePrefix: 1, continent: 'North America' },
  { name: 'Guatemala', code: 'GT', phonePrefix: 502, continent: 'North America' },
  { name: 'Guinea', code: 'GN', phonePrefix: 224, continent: 'Africa' },
  { name: 'Guinea-Bissau', code: 'GW', phonePrefix: 245, continent: 'Africa' },
  { name: 'Guyana', code: 'GY', phonePrefix: 592, continent: 'South America' },
  { name: 'Haiti', code: 'HT', phonePrefix: 509, continent: 'North America' },
  { name: 'Honduras', code: 'HN', phonePrefix: 504, continent: 'North America' },
  { name: 'Hungary', code: 'HU', phonePrefix: 36, continent: 'Europe' },
  { name: 'Iceland', code: 'IS', phonePrefix: 354, continent: 'Europe' },
  { name: 'India', code: 'IN', phonePrefix: 91, continent: 'Asia' },
  { name: 'Indonesia', code: 'ID', phonePrefix: 62, continent: 'Asia' },
  { name: 'Iran', code: 'IR', phonePrefix: 98, continent: 'Asia' },
  { name: 'Iraq', code: 'IQ', phonePrefix: 964, continent: 'Asia' },
  { name: 'Ireland', code: 'IE', phonePrefix: 353, continent: 'Europe' },
  { name: 'Israel', code: 'IL', phonePrefix: 972, continent: 'Asia' },
  { name: 'Italy', code: 'IT', phonePrefix: 39, continent: 'Europe' },
  { name: 'Jamaica', code: 'JM', phonePrefix: 1, continent: 'North America' },
  { name: 'Japan', code: 'JP', phonePrefix: 81, continent: 'Asia' },
  { name: 'Jordan', code: 'JO', phonePrefix: 962, continent: 'Asia' },
  { name: 'Kazakhstan', code: 'KZ', phonePrefix: 7, continent: 'Asia' },
  { name: 'Kenya', code: 'KE', phonePrefix: 254, continent: 'Africa' },
  { name: 'Kiribati', code: 'KI', phonePrefix: 686, continent: 'Oceania' },
  { name: 'Kuwait', code: 'KW', phonePrefix: 965, continent: 'Asia' },
  { name: 'Kyrgyzstan', code: 'KG', phonePrefix: 996, continent: 'Asia' },
  { name: 'Laos', code: 'LA', phonePrefix: 856, continent: 'Asia' },
  { name: 'Latvia', code: 'LV', phonePrefix: 371, continent: 'Europe' },
  { name: 'Lebanon', code: 'LB', phonePrefix: 961, continent: 'Asia' },
  { name: 'Lesotho', code: 'LS', phonePrefix: 266, continent: 'Africa' },
  { name: 'Liberia', code: 'LR', phonePrefix: 231, continent: 'Africa' },
  { name: 'Libya', code: 'LY', phonePrefix: 218, continent: 'Africa' },
  { name: 'Liechtenstein', code: 'LI', phonePrefix: 423, continent: 'Europe' },
  { name: 'Lithuania', code: 'LT', phonePrefix: 370, continent: 'Europe' },
  { name: 'Luxembourg', code: 'LU', phonePrefix: 352, continent: 'Europe' },
  { name: 'Madagascar', code: 'MG', phonePrefix: 261, continent: 'Africa' },
  { name: 'Malawi', code: 'MW', phonePrefix: 265, continent: 'Africa' },
  { name: 'Malaysia', code: 'MY', phonePrefix: 60, continent: 'Asia' },
  { name: 'Maldives', code: 'MV', phonePrefix: 960, continent: 'Asia' },
  { name: 'Mali', code: 'ML', phonePrefix: 223, continent: 'Africa' },
  { name: 'Malta', code: 'MT', phonePrefix: 356, continent: 'Europe' },
  { name: 'Marshall Islands', code: 'MH', phonePrefix: 692, continent: 'Oceania' },
  { name: 'Mauritania', code: 'MR', phonePrefix: 222, continent: 'Africa' },
  { name: 'Mauritius', code: 'MU', phonePrefix: 230, continent: 'Africa' },
  { name: 'Mexico', code: 'MX', phonePrefix: 52, continent: 'North America' },
  { name: 'Micronesia', code: 'FM', phonePrefix: 691, continent: 'Oceania' },
  { name: 'Moldova', code: 'MD', phonePrefix: 373, continent: 'Europe' },
  { name: 'Monaco', code: 'MC', phonePrefix: 377, continent: 'Europe' },
  { name: 'Mongolia', code: 'MN', phonePrefix: 976, continent: 'Asia' },
  { name: 'Montenegro', code: 'ME', phonePrefix: 382, continent: 'Europe' },
  { name: 'Morocco', code: 'MA', phonePrefix: 212, continent: 'Africa' },
  { name: 'Mozambique', code: 'MZ', phonePrefix: 258, continent: 'Africa' },
  { name: 'Myanmar', code: 'MM', phonePrefix: 95, continent: 'Asia' },
  { name: 'Namibia', code: 'NA', phonePrefix: 264, continent: 'Africa' },
  { name: 'Nauru', code: 'NR', phonePrefix: 674, continent: 'Oceania' },
  { name: 'Nepal', code: 'NP', phonePrefix: 977, continent: 'Asia' },
  { name: 'Netherlands', code: 'NL', phonePrefix: 31, continent: 'Europe' },
  { name: 'New Zealand', code: 'NZ', phonePrefix: 64, continent: 'Oceania' },
  { name: 'Nicaragua', code: 'NI', phonePrefix: 505, continent: 'North America' },
  { name: 'Niger', code: 'NE', phonePrefix: 227, continent: 'Africa' },
  { name: 'Nigeria', code: 'NG', phonePrefix: 234, continent: 'Africa' },
  { name: 'North Korea', code: 'KP', phonePrefix: 850, continent: 'Asia' },
  { name: 'North Macedonia', code: 'MK', phonePrefix: 389, continent: 'Europe' },
  { name: 'Norway', code: 'NO', phonePrefix: 47, continent: 'Europe' },
  { name: 'Oman', code: 'OM', phonePrefix: 968, continent: 'Asia' },
  { name: 'Pakistan', code: 'PK', phonePrefix: 92, continent: 'Asia' },
  { name: 'Palau', code: 'PW', phonePrefix: 680, continent: 'Oceania' },
  { name: 'Palestine', code: 'PS', phonePrefix: 970, continent: 'Asia' },
  { name: 'Panama', code: 'PA', phonePrefix: 507, continent: 'North America' },
  { name: 'Papua New Guinea', code: 'PG', phonePrefix: 675, continent: 'Oceania' },
  { name: 'Paraguay', code: 'PY', phonePrefix: 595, continent: 'South America' },
  { name: 'Peru', code: 'PE', phonePrefix: 51, continent: 'South America' },
  { name: 'Philippines', code: 'PH', phonePrefix: 63, continent: 'Asia' },
  { name: 'Poland', code: 'PL', phonePrefix: 48, continent: 'Europe' },
  { name: 'Portugal', code: 'PT', phonePrefix: 351, continent: 'Europe' },
  { name: 'Qatar', code: 'QA', phonePrefix: 974, continent: 'Asia' },
  { name: 'Romania', code: 'RO', phonePrefix: 40, continent: 'Europe' },
  { name: 'Russia', code: 'RU', phonePrefix: 7, continent: 'Europe' },
  { name: 'Rwanda', code: 'RW', phonePrefix: 250, continent: 'Africa' },
  { name: 'Saint Kitts and Nevis', code: 'KN', phonePrefix: 1, continent: 'North America' },
  { name: 'Saint Lucia', code: 'LC', phonePrefix: 1, continent: 'North America' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC', phonePrefix: 1, continent: 'North America' },
  { name: 'Samoa', code: 'WS', phonePrefix: 685, continent: 'Oceania' },
  { name: 'San Marino', code: 'SM', phonePrefix: 378, continent: 'Europe' },
  { name: 'Sao Tome and Principe', code: 'ST', phonePrefix: 239, continent: 'Africa' },
  { name: 'Saudi Arabia', code: 'SA', phonePrefix: 966, continent: 'Asia' },
  { name: 'Senegal', code: 'SN', phonePrefix: 221, continent: 'Africa' },
  { name: 'Serbia', code: 'RS', phonePrefix: 381, continent: 'Europe' },
  { name: 'Seychelles', code: 'SC', phonePrefix: 248, continent: 'Africa' },
  { name: 'Sierra Leone', code: 'SL', phonePrefix: 232, continent: 'Africa' },
  { name: 'Singapore', code: 'SG', phonePrefix: 65, continent: 'Asia' },
  { name: 'Slovakia', code: 'SK', phonePrefix: 421, continent: 'Europe' },
  { name: 'Slovenia', code: 'SI', phonePrefix: 386, continent: 'Europe' },
  { name: 'Solomon Islands', code: 'SB', phonePrefix: 677, continent: 'Oceania' },
  { name: 'Somalia', code: 'SO', phonePrefix: 252, continent: 'Africa' },
  { name: 'South Africa', code: 'ZA', phonePrefix: 27, continent: 'Africa' },
  { name: 'South Korea', code: 'KR', phonePrefix: 82, continent: 'Asia' },
  { name: 'South Sudan', code: 'SS', phonePrefix: 211, continent: 'Africa' },
  { name: 'Spain', code: 'ES', phonePrefix: 34, continent: 'Europe' },
  { name: 'Sri Lanka', code: 'LK', phonePrefix: 94, continent: 'Asia' },
  { name: 'Sudan', code: 'SD', phonePrefix: 249, continent: 'Africa' },
  { name: 'Suriname', code: 'SR', phonePrefix: 597, continent: 'South America' },
  { name: 'Sweden', code: 'SE', phonePrefix: 46, continent: 'Europe' },
  { name: 'Switzerland', code: 'CH', phonePrefix: 41, continent: 'Europe' },
  { name: 'Syria', code: 'SY', phonePrefix: 963, continent: 'Asia' },
  { name: 'Taiwan', code: 'TW', phonePrefix: 886, continent: 'Asia' },
  { name: 'Tajikistan', code: 'TJ', phonePrefix: 992, continent: 'Asia' },
  { name: 'Tanzania', code: 'TZ', phonePrefix: 255, continent: 'Africa' },
  { name: 'Thailand', code: 'TH', phonePrefix: 66, continent: 'Asia' },
  { name: 'Timor-Leste', code: 'TL', phonePrefix: 670, continent: 'Asia' },
  { name: 'Togo', code: 'TG', phonePrefix: 228, continent: 'Africa' },
  { name: 'Tonga', code: 'TO', phonePrefix: 676, continent: 'Oceania' },
  { name: 'Trinidad and Tobago', code: 'TT', phonePrefix: 1, continent: 'North America' },
  { name: 'Tunisia', code: 'TN', phonePrefix: 216, continent: 'Africa' },
  { name: 'Turkey', code: 'TR', phonePrefix: 90, continent: 'Asia' },
  { name: 'Turkmenistan', code: 'TM', phonePrefix: 993, continent: 'Asia' },
  { name: 'Tuvalu', code: 'TV', phonePrefix: 688, continent: 'Oceania' },
  { name: 'Uganda', code: 'UG', phonePrefix: 256, continent: 'Africa' },
  { name: 'Ukraine', code: 'UA', phonePrefix: 380, continent: 'Europe' },
  { name: 'United Arab Emirates', code: 'AE', phonePrefix: 971, continent: 'Asia' },
  { name: 'United Kingdom', code: 'GB', phonePrefix: 44, continent: 'Europe' },
  { name: 'United States', code: 'US', phonePrefix: 1, continent: 'North America' },
  { name: 'Uruguay', code: 'UY', phonePrefix: 598, continent: 'South America' },
  { name: 'Uzbekistan', code: 'UZ', phonePrefix: 998, continent: 'Asia' },
  { name: 'Vanuatu', code: 'VU', phonePrefix: 678, continent: 'Oceania' },
  { name: 'Vatican City', code: 'VA', phonePrefix: 39, continent: 'Europe' },
  { name: 'Venezuela', code: 'VE', phonePrefix: 58, continent: 'South America' },
  { name: 'Vietnam', code: 'VN', phonePrefix: 84, continent: 'Asia' },
  { name: 'Yemen', code: 'YE', phonePrefix: 967, continent: 'Asia' },
  { name: 'Zambia', code: 'ZM', phonePrefix: 260, continent: 'Africa' },
  { name: 'Zimbabwe', code: 'ZW', phonePrefix: 263, continent: 'Africa' },
  { name: 'Antigua and Barbuda', code: 'AG', phonePrefix: 1, continent: 'North America' },
  { name: 'Botswana', code: 'BW', phonePrefix: 267, continent: 'Africa' },
  { name: 'Brunei', code: 'BN', phonePrefix: 673, continent: 'Asia' },
  { name: 'Burundi', code: 'BI', phonePrefix: 257, continent: 'Africa' },
  { name: 'Cabo Verde', code: 'CV', phonePrefix: 238, continent: 'Africa' },
  { name: 'Comoros', code: 'KM', phonePrefix: 269, continent: 'Africa' },
  { name: "Côte d'Ivoire", code: 'CI', phonePrefix: 225, continent: 'Africa' },
  { name: 'Eswatini', code: 'SZ', phonePrefix: 268, continent: 'Africa' },
  { name: 'Fiji', code: 'FJ', phonePrefix: 679, continent: 'Oceania' },
  { name: 'Gabon', code: 'GA', phonePrefix: 241, continent: 'Africa' },
  { name: 'Gambia', code: 'GM', phonePrefix: 220, continent: 'Africa' },
  { name: 'Grenada', code: 'GD', phonePrefix: 1, continent: 'North America' },
  { name: 'Guinea', code: 'GN', phonePrefix: 224, continent: 'Africa' },
  { name: 'Guinea-Bissau', code: 'GW', phonePrefix: 245, continent: 'Africa' },
  { name: 'Kiribati', code: 'KI', phonePrefix: 686, continent: 'Oceania' },
  { name: 'Lesotho', code: 'LS', phonePrefix: 266, continent: 'Africa' },
  { name: 'Liberia', code: 'LR', phonePrefix: 231, continent: 'Africa' },
  { name: 'Malawi', code: 'MW', phonePrefix: 265, continent: 'Africa' },
  { name: 'Maldives', code: 'MV', phonePrefix: 960, continent: 'Asia' },
  { name: 'Marshall Islands', code: 'MH', phonePrefix: 692, continent: 'Oceania' },
  { name: 'Micronesia', code: 'FM', phonePrefix: 691, continent: 'Oceania' },
  { name: 'Nauru', code: 'NR', phonePrefix: 674, continent: 'Oceania' },
  { name: 'Palau', code: 'PW', phonePrefix: 680, continent: 'Oceania' },
  { name: 'Saint Kitts and Nevis', code: 'KN', phonePrefix: 1, continent: 'North America' },
  { name: 'Saint Lucia', code: 'LC', phonePrefix: 1, continent: 'North America' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC', phonePrefix: 1, continent: 'North America' },
  { name: 'Samoa', code: 'WS', phonePrefix: 685, continent: 'Oceania' },
  { name: 'Sao Tome and Principe', code: 'ST', phonePrefix: 239, continent: 'Africa' },
  { name: 'Seychelles', code: 'SC', phonePrefix: 248, continent: 'Africa' },
  { name: 'Solomon Islands', code: 'SB', phonePrefix: 677, continent: 'Oceania' },
  { name: 'Suriname', code: 'SR', phonePrefix: 597, continent: 'South America' },
  { name: 'Timor-Leste', code: 'TL', phonePrefix: 670, continent: 'Asia' },
  { name: 'Tonga', code: 'TO', phonePrefix: 676, continent: 'Oceania' },
  { name: 'Tuvalu', code: 'TV', phonePrefix: 688, continent: 'Oceania' },
  { name: 'Vanuatu', code: 'VU', phonePrefix: 678, continent: 'Oceania' },
].sort((a: Country, b: Country) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
});
