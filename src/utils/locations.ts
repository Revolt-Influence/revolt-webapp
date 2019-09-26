const allCountries: string[] = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czech Republic',
  'Czechia',
  'Democratic Republic of the Congo',
  'Denmark',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guinea',
  'Guinea Bissau',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao S.A.R',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'North Korea',
  'Northern Cyprus',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Republic of Congo',
  'Republic of Serbia',
  'Republic of the Congo',
  'Romania',
  'Russia',
  'Rwanda',
  'Réunion',
  'Saint Barthelemy',
  'Saint Barthélemy',
  'Saint Helena',
  'Saint Helena, Ascension and Tristan da Cunha',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'Somaliland',
  'South Africa',
  'South Georgia',
  'South Georgia and South Sandwich Islands',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Sweden',
  'Switzerland',
  'Syria',
  'São Tomé and Príncipe',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'The Bahamas',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United Republic of Tanzania',
  'United States',
  'United States Minor Outlying Islands',
  'United States Virgin Islands',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]

const allLanguages: string[] = [
  'Français',
  'Anglais',
  'Espagnol',
  'Allemand',
  'Mandarin',
  'Italien',
  'Finlandais',
  'Suédois',
  'Portugais',
]

const allCities: string[] = [
  'Abakan',
  'Abu Dhabi, United Arab Emirates',
  'Abuja, Nigeria',
  'Adelaide, South Australia',
  'Agadir, Morocco',
  'Ahmedabad, India',
  'Ahvaz',
  'Aix-en-Provence, France',
  'Aizawl',
  'Aktau, Mangghystaū, Kazakhstan',
  'Aktobe',
  'Al Ain',
  'Al Maballa',
  'Al-Sib',
  'Aldea Asunción, Entre Rios, Argentina',
  'Aligarh',
  'Alma-Ata, Almaty, Kazakhstan',
  'Almaty, Kazakhstan',
  'Amanpur',
  'Ambajogai',
  'Ambala',
  'Amiens',
  'Amritsar',
  'Amsterdam',
  'Amsterdam, Netherlands',
  'Angers',
  'Ankara, Turkey',
  'Antalya, Turkey',
  'Antwerp',
  'Anápolis, Brazil',
  'Aptekarskiy',
  'Aracaju, Brazil',
  'Aravan',
  'Aschaffenburg, Germany',
  'Astana',
  'Athens',
  'Atlanta, Georgia',
  'Auckland, New Zealand',
  'Augsburg',
  'Austin',
  'Austis',
  'Baghdad, Iraq',
  'Baku, Azerbaijan',
  'Balaghat',
  'Baleyssagues',
  'Balkhausen',
  'Ban Ko',
  'Ban Talat Yai',
  'Bangalore',
  'Bangi',
  'Bangkok',
  'Bangkok, Thailand',
  'Baoji',
  'Barcelona',
  'Barcelona, Spain',
  'Baripada',
  'Barnaul',
  'Baronia',
  'Barra Velha',
  'Beirut, Lebanon',
  'Belgaum',
  'Belgrade, Serbia',
  'Belo Horizonte',
  'Benalmádena, Spain',
  'Benfica',
  'Berestovitsa',
  'Bergen',
  'Berlin',
  'Berlin, Germany',
  'Beverly Hills, California',
  'Bharuch',
  'Bhubaneswar, India',
  'Birmingham',
  'Birmingham, United Kingdom',
  'Blankenbach',
  'Bodocó, Pernambuco, Brazil',
  'Bogotá',
  'Bolton',
  'Boqueron, Puerto Rico',
  'Boracay',
  'Bordeaux, France',
  'Boston',
  'Brampton, Ontario',
  'Bremen, Germany',
  'Brest, Bretagne',
  'Brisbane, Queensland, Australia',
  'Brussels, Belgium',
  'Bucharest',
  'Budapest, Hungary',
  'Buenos Aires',
  'Buenos Aires, Argentina',
  'Buriticupu',
  'Burneh Chah',
  'Bury',
  'Busan, South Korea',
  'Bösingfeld, Nordrhein-Westfalen, Germany',
  'Cairo',
  'Cairo, Egypt',
  'Calgary, Alberta',
  'Cape Town',
  'Carson, California',
  'Casalecchio di Reno',
  'Castel Volturno',
  'Casteljaloux, Aquitaine, France',
  'Catania',
  'Cayucos, California',
  'Century Village',
  'Chanchamayo',
  'Charlotte',
  'Chennai',
  'Chennai, India',
  'Chicago',
  'Chomedey',
  'Cidade Baixa',
  'Cikarang, Indonesia',
  'Cisano Bergamasco',
  'Cité-des-Pins',
  'Clearwater',
  'Clearwater, Florida',
  'Colatina',
  'Collblanch y la Torassa',
  'Cologne',
  'Compton',
  'Concordia',
  'Copenhagen',
  'Corpus Christi, Texas',
  'Coulouvrenière',
  'Coventry',
  'Da Khure',
  'Dallas',
  'Damascus, Syria',
  'Dearborn Heights, Michigan',
  'Deer Park',
  'Delhi',
  'Denver, Colorado',
  'Desenzano del Garda, Italy',
  'Detroit, Michigan',
  'Devizes',
  'Dhaka, Bangladesh',
  'Dnipro',
  'Doha',
  'Douglass',
  'Downtown Vancouver',
  'Dubai, United Arab Emirates',
  'Dublin',
  'Dushanbe',
  'Düsseldorf',
  'Eaux-Vives',
  'El Carmen',
  'El Iskandariya',
  'El Morro',
  'El Paso',
  'El Paso, Texas',
  'Elgin',
  'Endako',
  'Enugu',
  'Esfahan',
  'Eugene',
  'Feira de Santana',
  'Ferrara, Italy',
  'Formosa, Goias',
  'Fortaleza, Brazil',
  'Frankfurt, Germany',
  'Freienseen',
  'Fujairah',
  'Fullerton',
  'Gagrana',
  'Gamu',
  'Garson, Ontario',
  'Geneva, Switzerland',
  'Ghaziabad',
  'Ghukra',
  'Giffoni Valle Piana',
  'Glasgow, United Kingdom',
  'Gogaon',
  'Goiânia',
  'Gold Coast, Queensland',
  'Golden, Colorado',
  'Gorakhpur',
  'Grange Park',
  'Graz',
  'Greater Noida',
  'Grenelle',
  'Guarapari',
  'Gulbarga',
  'Gökçeviran',
  'H.L.M. Çinq',
  'Hacınınoglu',
  'Haines City',
  'Hamburg, Germany',
  'Hanley West and Shelton',
  'Hanoi, Vietnam',
  'Hanover, Germany',
  'Harxbüttel',
  "Hawalli, Al 'Āşimah, Kuwait",
  'Helsinki',
  'Henderson',
  'Hidden Manor',
  'Hollywood',
  'Hollywood, Florida',
  'Holon, Israel',
  'Hong Kong',
  'Houston',
  'Houston, Texas',
  'Huaral',
  'Huntington Beach',
  'Hyderabad',
  'Hythe, Kent',
  'Ibagué, Tolima',
  'Ibi',
  'Ibiza',
  'Imerovíglion',
  'Independencia',
  'Indianapolis, Indiana',
  'Irbil',
  'Irhzissane',
  'Irkutsk',
  'Ismailia',
  'Istanbul, Turkey',
  'Itapecerica de Serra',
  'Itapetininga',
  'Ivano-Frankivsk',
  'Jaipur, Rajasthan',
  'Jakarta',
  'Jakarta, Indonesia',
  'Jeddah, Saudi Arabia',
  'Jhabua',
  'Jijel',
  'Joyuda',
  'João Pessoa, Brazil',
  'Juazeiro do Norte',
  'Jumairah, Dubayy, United Arab Emirates',
  'Jundiaí',
  'Kadoma, Osaka',
  'Kagoyama',
  'Kalyan',
  'Karachi',
  'Karaj',
  'Karimnagar',
  'Kathmandu, Nepal',
  'Kazan, Tatarstan',
  'Kebon Kelapa',
  'Kelowna',
  'Kelowna, British Columbia',
  'Kerman, Iran',
  'Kermelberg',
  'Kharkov',
  'Kingston, Jamaica',
  'Kissimmee, Florida',
  'Knightsbridge and Belgravia',
  'Kobe-shi, Hyogo, Japan',
  'Koimbatore',
  'Kolind',
  'Kolkata',
  'Kota',
  'Kraków',
  'Krasnaya Presnya',
  'Krasnodar',
  'Kuusamo',
  'Kyiv, Ukraine',
  'Kårarp',
  'La Plata',
  'Lagos, Nigeria',
  'Lahore, Pakistan',
  'Lake Valley',
  'Langenfeld, Nordrhein-Westfalen, Germany',
  'Langley, British Columbia',
  'Lankaran',
  'Lansab',
  'Las Vegas',
  'Las Vegas, Nevada',
  'Le Camp',
  'Le Plateau',
  'Le Polo',
  'Leeds',
  'Leicester, United Kingdom',
  'Leslieville',
  'Leszno, Leszno, Poland',
  'Liberec',
  'Libertad',
  'Lichtenstein',
  'Lille',
  'Lima',
  'Lindenthal',
  'Lisbon',
  'Liverpool',
  'London, United Kingdom',
  'Londrina',
  'Long Beach, California',
  'Loni Kalbhor',
  'Los Angeles',
  'Los Angeles, California',
  'Louisville, Kentucky',
  'Lower East Side',
  'Lusaka',
  'Lyon',
  'Lytton',
  'Ma al Mishash',
  'Maceió, Brazil',
  'Madrid, Spain',
  'Magadan, Russia',
  'Magnitogorsk',
  'Makhachkala',
  'Male, Maldives',
  'Manavgat, Antalya',
  'Manchester, United Kingdom',
  'Manhumirim',
  'Marbella, Spain',
  'Markham, Ontario',
  'Marmande',
  'Marrakech',
  'Marseille, France',
  'Marylebone',
  'Matino',
  'Mawalih',
  'Mecca',
  'Medan',
  'Medellín, Antioquia',
  'Medicine Hat, Alberta',
  'Melbourne',
  'Metro West',
  'Metz, France',
  'Mexico City',
  'Mexico City, Mexico',
  'Miami Beach, Florida',
  'Miami, Florida',
  'Michel',
  'Michelstadt, Germany',
  'Michigan State University',
  'Milan',
  'Milan, Italy',
  'Minato-ku, Tokyo, Japan',
  'Minsk, Belarus',
  'Miramar',
  'Mississauga',
  'Moctezuma, Yucatan, Mexico',
  'Molenstedebroek',
  'Monaco',
  'Moneghetti',
  'Monte-Carlo, Monaco',
  'Monteiasi',
  'Montpellier',
  'Montreal',
  'Montreal, Quebec',
  'Morelia, Mexico',
  'Moscow, Russia',
  'Mt. Pleasant',
  'Muhammadabad Gohna',
  'Mumbai',
  'Mumbai, Maharashtra',
  'Munich',
  'Muscat, Oman',
  'Mykolayiv',
  'Mykoni',
  'Málaga',
  'Médina Gounas',
  'Mössingen',
  'Mýkonos, Kikladhes, Greece',
  'Nagpur',
  'Nanaimo, British Columbia',
  'Nancy',
  'Nanuque',
  'Naoned',
  'Naples',
  'Nashville',
  'Natal, Rio Grande do Norte',
  'Ndola',
  'Neumarkt am Mieresch',
  'New Delhi',
  'New York, New York',
  'Newport Beach, California',
  'Niagara Central Business District',
  'Niavaran, Tehran, Iran',
  'Nishiki',
  'Nizhnekamsk',
  'Nizhni Novgorod',
  'Nordstaden',
  'North Beach',
  'Norwich',
  'Norwich, Norfolk',
  'Nottingham',
  'Nova Odessa',
  'Novosibirsk, Russia',
  'Nuremberg',
  'Náxos',
  'Nîmes',
  'Ocean Beach',
  'Odessa, Ukraine',
  'Oguz',
  'Oke',
  'Old Capitol Site',
  'Ontario',
  'Oral, Kazakhstan',
  'Orlando, Florida',
  'Osaka',
  'Osasco',
  'Osijek',
  'Oslo, Norway',
  'Owerri',
  'Oxnard',
  'Pakenham',
  'Palm Beach',
  'Palm Springs, California',
  'Palmira',
  'Panama City, Panama',
  'Paramus, New Jersey',
  'Parangaba',
  'Parauapebas',
  'Paris, France',
  'Paulo Afonso',
  'Perm',
  'Perth, Western Australia',
  'Petrolina',
  'Philadelphia, Pennsylvania',
  'Philippopolis',
  'Phoenix',
  'Pishpek',
  'Pittsburgh',
  'Plainfield, Illinois',
  'Platinum Triangle',
  'Plymouth, Michigan',
  'Polatsk',
  'Poltava',
  'Port Elizabeth, Eastern Cape',
  'Port Harcourt',
  'Porto Alegre, Rio Grande do Sul',
  'Porto, Portugal',
  'Prague',
  'Pucalpa',
  'Pétange',
  'Quebec, Quebec',
  'Quimper',
  'Raleigh, North Carolina',
  'Ramallah',
  'Rancho Mirage',
  'Ranelagh',
  'Ravenna',
  'Rawatbhata',
  'Reading, England',
  'Recife, Brazil',
  'Redondo Beach',
  'Rennes',
  'Rhodes',
  'Ribeirão Preto',
  'Richmond, British Columbia',
  'Rincón del Valle',
  'Rio de Janeiro, Rio de Janeiro',
  'Riyadh',
  'Rochester Hills, Michigan',
  'Rochester, New York',
  'Rome, Italy',
  'Rosario, Santa Fe',
  'Rostow',
  'Rotterdam',
  'Ryazan',
  'Saint George',
  'Saint Paul',
  'Saint Petersburg, Russia',
  'Saint-Malo, Bretagne, France',
  'Salalah, Oman',
  'Salcombe',
  'Salihorsk',
  'Salvador',
  'Salvador, Bahia, Brazil',
  'San Diego',
  'San Diego, California',
  'San Francisco, California',
  'San Lorenzo, Santa Fe',
  'Sandefjord',
  'Sanlıurfa',
  'SantAgata Bolognese',
  'SantOmero',
  'Santa Marta',
  'Santa Mesa, Manila',
  'Santa Monica, California',
  'Santiago de Cali',
  'Santiago, Chile',
  'Sarasota, Florida',
  'Sarny',
  'Saruz',
  'Sault-au-Récollet',
  'Scottsdale, Arizona',
  'Seattle, Washington',
  'Selma, North Carolina',
  'Sembiyam',
  'Seoul, Korea',
  'Seville, Spain',
  'Shahjahanpur',
  'Sheffield',
  'Shenzhen, Guangdong',
  'Sherwood Forest',
  'Shimodoyama',
  'Shymkent',
  'Sidhwan Khurd',
  'Sidi Bel Abbès',
  'Singapore',
  'Sita Nagar',
  'Smolensk',
  'Sofia, Bulgaria',
  'Sohar, Oman',
  'South El Monte, California',
  'South Lake Tahoe, California',
  'Southampton',
  'St. Louis',
  'Steccato, Calabria, Italy',
  'Stockholm',
  'Strasbourg, France',
  'Strogino',
  'Stuttgart',
  'Sunny Isles Beach',
  'Surat',
  'Surat, Surat Thani, Thailand',
  'Surrey',
  'Swinemünde',
  'Sydney',
  'Sydney, Australia',
  'Szczecin, Poland',
  'São Francisco do Guaporé',
  'São João Batista Do Glória, Minas Gerais, Brazil',
  'São Luís, Brazil',
  'São Paulo',
  'São Paulo da Assunção de Luanda',
  'São Paulo, Brazil',
  'Sé',
  'Taghazout',
  'Tampa',
  'Tarragona',
  'Tashkent, Uzbekistan',
  'Tasikmalaya',
  'Taubaté',
  'Tehran, Iran',
  'Tel Aviv, Israel',
  'Tempe, Arizona',
  'Teresina',
  'Termiz, Uzbekistan',
  'Thane',
  'The Anaheim Resort',
  'The Woodlands, Texas',
  'Thrissur',
  'Thólos',
  'Tinsukia',
  'Tirana',
  'Tofino, British Columbia',
  'Toronto, Ontario',
  'Toulouse, France',
  'Tours, France',
  'Trier, Germany',
  'Troina',
  'Turin, Italy',
  'Turku, Finland',
  'Tuulos, Etelä-Suomen Lääni, Finland',
  'Tuxtla Gutiérrez, Chiapas',
  'Tyumen',
  'Ubud',
  'Ucluelet',
  'Ulsan',
  'Urga',
  'Urmia',
  'Ussuriysk',
  'Utica',
  'Vadodara, Gujarat, India',
  'Valencia',
  'Vancouver, British Columbia',
  'Vannes, France',
  'Varginha',
  'Vassivière',
  'Vaulx',
  'Velden',
  'Venice, Italy',
  'Vero Beach, Florida',
  'Victoria',
  'Victoria, British Columbia',
  'Vienna',
  'Vienna, Austria',
  'Vila Nogueira',
  'Vila Nova de Gaia, Portugal',
  'Ville Saint Laurent',
  'Vinhedo',
  'Vitacura, Chile',
  'Vitória',
  'Vitória da Conquista',
  'Vladivostok',
  'Voronezh',
  'Vorsino',
  'Waltham',
  'Wandoor',
  'Wankaner',
  'Weil am Rhein',
  'West Hollywood',
  'West Point Grey',
  'Westhampnett',
  'Whistler',
  'Wiedergeltingen',
  'Winkler Safe Neighborhood',
  'Wynwood',
  'Yaesu',
  'Yogyakarta City',
  'Yosemite Village, California',
  'Zanzibar, Tanzania',
  'Zeewolde',
  'Zinkiv',
  'Zürich, Switzerland',
]

export { allCountries, allLanguages, allCities }
