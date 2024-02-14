interface Menu {
		code: string
		desc: string
		submenu: {
			code: string
			desc: string
		}[]
}

const menu : Menu[] = [
	{
		code: "AEL",
		desc: "Airport Express",
		submenu: [
			{ code: "HOK", desc: "Hong Kong" },
			{ code: "KOW", desc: "Kowloon" },
			{ code: "TSY", desc: "Tsing Yi" },
			{ code: "AIR", desc: "Airport" },
			{ code: "AWE", desc: "AsiaWorld Expo" },
		],
	},
	{
		code: "TCL",
		desc: "Tung Chung Line",
		submenu: [
			{ code: "HOK", desc: "Hong Kong" },
			{ code: "KOW", desc: "Kowloon" },
			{ code: "OLY", desc: "Olympic" },
			{ code: "NAC", desc: "Nam Cheong" },
			{ code: "LAK", desc: "Lai King" },
			{ code: "TSY", desc: "Tsing Yi" },
			{ code: "SUN", desc: "Sunny Bay" },
			{ code: "TUC", desc: "Tung Chung" },
		],
	},
	{
		code: "TML",
		desc: "Tuen Ma Line",
		submenu: [
			{ code: "WKS", desc: "Wu Kai Sha" },
			{ code: "MOS", desc: "Ma On Shan" },
			{ code: "HEO", desc: "Heng On" },
			{ code: "TSH", desc: "Tai Shui Hang" },
			{ code: "SHM", desc: "Shek Mun" },
			{ code: "CIO", desc: "City One" },
			{ code: "STW", desc: "Sha Tin Wai" },
			{ code: "CKT", desc: "Che Kung Temple" },
			{ code: "TAW", desc: "Tai Wai" },
			{ code: "HIK", desc: "Hin Keng" },
			{ code: "DIH", desc: "Diamond Hill" },
			{ code: "KAT", desc: "Kai Tak" },
			{ code: "SUW", desc: "Sung Wong Toi" },
			{ code: "TKW", desc: "To Kwa Wan" },
			{ code: "HOM", desc: "Ho Man Tin" },
			{ code: "HUH", desc: "Hung Hom" },
			{ code: "ETS", desc: "East Tsim Sha Tsui" },
			{ code: "AUS", desc: "Austin" },
			{ code: "NAC", desc: "Nam Cheong" },
			{ code: "MEF", desc: "Mei Foo" },
			{ code: "TWW", desc: "Tsuen Wan West" },
			{ code: "KSR", desc: "Kam Sheung Road" },
			{ code: "YUL", desc: "Yuen Long" },
			{ code: "LOP", desc: "Long Ping" },
			{ code: "TIS", desc: "Tin Shui Wai" },
			{ code: "SIH", desc: "Siu Hong" },
			{ code: "TUM", desc: "Tuen Mun" },
		],
	},
	{
		code: "TKL",
		desc: "Tseung Kwan O Line",
		submenu: [
			{ code: "NOP", desc: "North Point" },
			{ code: "QUB", desc: "Quarry Bay" },
			{ code: "YAT", desc: "Yau Tong" },
			{ code: "TIK", desc: "Tiu Keng Leng" },
			{ code: "TKO", desc: "Tseung Kwan O" },
			{ code: "LHP", desc: "LOHAS Park" },
			{ code: "HAH", desc: "Hang Hau" },
			{ code: "POA", desc: "Po Lam" },
		],
	},
	{
		code: "EAL",
		desc: "East Rail Line",
		submenu: [
			{
				code: "ADM",
				desc: "Admiralty",
			},
			{
				code: "EXC",
				desc: "Exhibition Centre",
			},
			{
				code: "HUH",
				desc: "Hung Hom",
			},
			{
				code: "MKK",
				desc: "Mong Kok East",
			},
			{
				code: "KOT",
				desc: "Kowloon Tong",
			},
			{
				code: "TAW",
				desc: "Tai Wai",
			},
			{
				code: "SHT",
				desc: "Sha Tin",
			},
			{
				code: "FOT",
				desc: "Fo Tan",
			},
			{
				code: "RAC",
				desc: "Racecourse",
			},
			{
				code: "UNI",
				desc: "University",
			},
			{
				code: "TAP",
				desc: "Tai Po Market",
			},
			{
				code: "TWO",
				desc: "Tai Wo",
			},
			{
				code: "FAN",
				desc: "Fanling",
			},
			{
				code: "SHS",
				desc: "Sheung Shui",
			},
			{
				code: "LOW",
				desc: "Lo Wu",
			},
			{
				code: "LMC",
				desc: "Lok Ma Chau",
			},
		],
	},
	{
		code: "SIL",
		desc: "South Island Line",
		submenu: [
			{
				code: "ADM",
				desc: "Admiralty",
			},
			{
				code: "OCP",
				desc: "Ocean Park",
			},
			{
				code: "WCH",
				desc: "Wong Chuk Hang",
			},
			{
				code: "LET",
				desc: "Lei Tung",
			},
			{
				code: "SOH",
				desc: "South Horizons",
			},
		],
	},
	{
		code: "TWL",
		desc: "Tsuen Wan Line",
		submenu: [
			{
				code: "CEN",
				desc: "Central",
			},
			{
				code: "ADM",
				desc: "Admiralty",
			},
			{
				code: "TST",
				desc: "Tsim Sha Tsui",
			},
			{
				code: "JOR",
				desc: "Jordan",
			},
			{
				code: "YMT",
				desc: "Yau Ma Tei",
			},
			{
				code: "MOK",
				desc: "Mong Kok",
			},
			{
				code: "PRE",
				desc: "Price Edward",
			},
			{
				code: "SSP",
				desc: "Sham Shui Po",
			},
			{
				code: "CSW",
				desc: "Cheung Sha Wan",
			},
			{
				code: "LCK",
				desc: "Lai Chi Kok",
			},
			{
				code: "MEF",
				desc: "Mei Foo",
			},
			{
				code: "LAK",
				desc: "Lai King",
			},
			{
				code: "KWF",
				desc: "Kwai Fong",
			},
			{
				code: "KWH",
				desc: "Kwai Hing",
			},
			{
				code: "TWH",
				desc: "Tai Wo Hau",
			},
			{
				code: "TSW",
				desc: "Tsuen Wan",
			},
		],
	},
	{
		code: "ISL",
		desc: "Island Line",
		submenu: [
			{
				code: "KET",
				desc: "Kennedy Town",
			},
			{
				code: "HKU",
				desc: "HKU",
			},
			{
				code: "SYP",
				desc: "Sai Ying Pun",
			},
			{
				code: "SHW",
				desc: "Sheung Wan",
			},
			{
				code: "CEN",
				desc: "Central",
			},
			{
				code: "ADM",
				desc: "Admiralty",
			},
			{
				code: "WAC",
				desc: "Wan Chai",
			},
			{
				code: "CAB",
				desc: "Causeway Bay",
			},
			{
				code: "TIH",
				desc: "Tin Hau",
			},
			{
				code: "FOH",
				desc: "Fortress Hill",
			},
			{
				code: "NOP",
				desc: "North Point",
			},
			{
				code: "QUB",
				desc: "Quarry Bay",
			},
			{
				code: "TAK",
				desc: "Tai Koo",
			},
			{
				code: "SWH",
				desc: "Sai Wan Ho",
			},
			{
				code: "SKW",
				desc: "Shau Kei Wan",
			},
			{
				code: "HFC",
				desc: "Heng Fa Chuen",
			},
			{
				code: "CHW",
				desc: "Chai Wan",
			},
		],
	},
	{
		code: "KTL",
		desc: "Kwun Tong Line",
		submenu: [
			{
				code: "WHA",
				desc: "Whampoa"
			},
			{
				code: "HOM",
				desc: "Ho Man Tin"
			},
			{
				code: "YMT",
				desc: "Yau Ma Tei"
			},
			{
				code: "MOK",
				desc: "Mong Kok"
			},
			{
				code: "PRE",
				desc: "Prince Edward"
			},
			{
				code: "SKM",
				desc: "Shek Kip Mei"
			},
			{
				code: "KOT",
				desc: "Kowloon Tong"
			},
			{
				code: "LOF",
				desc: "Lok Fu"
			},
			{
				code: "WTS",
				desc: "Wong Tai Sin"
			},
			{
				code: "DIH",
				desc: "Diamond Hill"
			},
			{
				code: "CHH",
				desc: "Choi Hung"
			},
			{
				code: "KOB",
				desc: "Kowloon Bay"
			},
			{
				code: "NTK",
				desc: "Ngau Tau Kok"
			},
			{
				code: "KWT",
				desc: "Kwun Tong"
			},
			{
				code: "LAT",
				desc: "Lam Tin"
			},
			{
				code: "YAT",
				desc: "Yau Tong"
			},
			{
				code: "TIK",
				desc: "Tiu Keng Leng"
			}
		]
	}
];

export default menu;

