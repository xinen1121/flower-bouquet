// =====================================================
// 🌷 花束合成查詢系統
// =====================================================


// =====================================================
// 🌸 花種與顏色資料
// =====================================================

const flowerData = {

    "雛菊": [
        "白",
        "黃",
        "粉紅",
        "香檳",
        "橙黃",
        "深紅",
        "澄藍",
        "雙色",
        "墨黑蕾絲",
        "曜黑金邊"
    ],

    "滿天星": [
        "白",
        "淡粉",
        "淺藍",
        "鵝黃",
        "薰衣紫",
        "胭脂紅",
        "薄荷綠",
        "夜空極光",
        "雙色星斑",
        "煥采星河"
    ],

    "薰衣草": [
        "原生淺紫",
        "白雪",
        "甜蜜藍",
        "英倫深紫",
        "雙色斑紋",
        "微光粉",
        "曜夜極黑",
        "杏桃黃",
        "翡翠金絲"
    ],

    "梅花": [
        "宮粉",
        "硃砂",
        "綠萼",
        "玉蝶",
        "照水",
        "琥珀冰晶",
        "龍游",
        "白",
        "灑金",
        "紫葉紅"
    ],

    "玫瑰": [
        "白",
        "香檳",
        "粉紅",
        "橙黃",
        "黑魔術",
        "彩虹幻境",
        "紫",
        "綠色碧玉"
    ],

    "鬱金香": [
        "黃",
        "皇家金絲墨"
    ],

    "桔梗": [
        "藍紫"
    ],

    "百合": [
        "白",
        "虎斑雙色",
        "璀璨極光",
        "幽藍幻影",
        "@黃綠",
        "粉百合"
    ],

    "蘭花": []
};


// =====================================================
// 💐 花束組合資料
// =====================================================

const bouquets = [

    {
        name: "清晨踏青",
        price: 100,
        special: false,
        recipe: [
            ["雛菊", "白", 3]
        ]
    },

    {
        name: "微微一笑",
        price: 100,
        special: false,
        recipe: [
            ["雛菊", "黃", 3]
        ]
    },

    {
        name: "純真歲月",
        price: 100,
        special: false,
        recipe: [
            ["雛菊", "深紅", 1],
            ["薰衣草", "雪白", 1],
            ["滿天星", "鵝黃", 1]
        ]
    },

    {
        name: "小小幸運",
        price: 100,
        special: false,
        recipe: [
            ["雛菊", "深紅", 1],
            ["薰衣草", "雪白", 1],
            ["滿天星", "鵝黃", 1]
        ]
    },

    {
        name: "微微一笑",
        price: 100,
        special: false,
        recipe: [
            ["薰衣草", "原生淺紫", 2],
            ["鬱金香", "黃", 1]
        ]
    },

    {
        name: "春日暖陽",
        price: 130,
        special: true,
        recipe: [
            ["雛菊", "黃", 1],
            ["滿天星", "鵝黃", 1],
            ["梅花", "硃砂", 1]
        ]
    },

    {
        name: "月下私語",
        price: 130,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 1],
            ["梅花", "綠萼", 1]
        ]
    },

    {
        name: "午後小憩",
        price: 182,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 1],
            ["薰衣草", "雪白", 1],
            ["梅花", "綠萼", 1]
        ]
    },

    {
        name: "幸福提案",
        price: 200,
        special: false,
        recipe: [
            ["滿天星", "胭脂紅", 2],
            ["雛菊", "深紅", 1]
        ]
    },

    {
        name: "悄悄愛慕",
        price: 200,
        special: false,
        recipe: [
            ["滿天星", "胭脂紅", 3]
        ]
    },

    {
        name: "溫柔擁抱",
        price: 200,
        special: false,
        recipe: [
            ["雛菊", "粉紅", 1],
            ["雛菊", "深紅", 1],
            ["滿天星", "薰衣紫", 1]
        ]
    },

    {
        name: "溫柔擁抱",
        price: 200,
        special: false,
        recipe: [
            ["雛菊", "深紅", 1],
            ["雛菊", "橙紅", 1],
            ["雛菊", "香檳", 1]
        ]
    },

    {
        name: "綿綿細雨",
        price: 200,
        special: false,
        recipe: [
            ["雛菊", "深紅", 1],
            ["雛菊", "橙紅", 1],
            ["雛菊", "香檳", 1]
        ]
    },

    {
        name: "溫柔擁抱",
        price: 200,
        special: false,
        recipe: [
            ["雛菊", "深紅", 1],
            ["滿天星", "薰衣紫", 1],
            ["薰衣草", "白雪", 1]
        ]
    },

    {
        name: "海風之戀",
        price: 260,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 1],
            ["薰衣草", "白雪", 1],
            ["梅花", "白", 1],
            ["玫瑰", "白", 1]
        ]
    },

    {
        name: "童話花園",
        price: 260,
        special: true,
        recipe: [
            ["雛菊", "黃", 1],
            ["滿天星", "淡粉", 1],
            ["梅花", "龍游", 1]
        ]
    },

    {
        name: "溫柔擁抱",
        price: 320,
        special: false,
        recipe: [
            ["薰衣草", "雙色斑紋", 2],
            ["滿天星", "雙色星斑", 1]
        ]
    },

    {
        name: "心動物語",
        price: 380,
        special: false,
        recipe: [
            ["滿天星", "鵝黃", 2],
            ["滿天星", "夜空極光", 1]
        ]
    },

    {
        name: "閃耀心願",
        price: 380,
        special: false,
        recipe: [
            ["滿天星", "雙色星斑", 3]
        ]
    },

    {
        name: "天使羽翼",
        price: 416,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 1],
            ["薰衣草", "曜夜極黑", 1],
            ["梅花", "綠萼", 1]
        ]
    },

    {
        name: "霧中精靈",
        price: 494,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "薰衣紫", 1],
            ["梅花", "照水", 1]
        ]
    },

    {
        name: "毛球慶典",
        price: 598,
        special: false,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 1],
            ["薰衣草", "微光粉", 1],
            ["梅花", "白", 1],
            ["百合", "幽藍幻影", 1]
        ]
    },

    {
        name: "永恆誓約",
        price: 680,
        special: false,
        recipe: [
            ["雛菊", "紫", 2],
            ["雛菊", "黃", 1]
        ]
    },

    {
        name: "典藏臻品",
        price: 680,
        special: false,
        recipe: [
            ["雛菊", "墨黑蕾絲", 1],
            ["雛菊", "雙色", 1],
            ["雛菊", "橙紅", 1]
        ]
    },

    {
        name: "時光禮盒",
        price: 680,
        special: false,
        recipe: [
            ["滿天星", "煥采星河", 1],
            ["滿天星", "薄荷綠", 2]
        ]
    },

    {
        name: "璀璨佳作",
        price: 680,
        special: false,
        recipe: [
            ["滿天星", "夜空極光", 1],
            ["玫瑰", "綠色碧玉", 2]
        ]
    },

    {
        name: "慵懶午後",
        price: 780,
        special: true,
        recipe: [
            ["雛菊", "黃", 1],
            ["滿天星", "白", 1],
            ["薰衣草", "英倫深紫", 1],
            ["百合", "璀璨極光", 1]
        ]
    },

    {
        name: "夢幻舞台",
        price: 880,
        special: false,
        recipe: [
            ["雛菊", "墨黑蕾絲", 4],
            ["薰衣草", "英倫深紫", 1]
        ]
    },

    {
        name: "紙箱秘境",
        price: 884,
        special: false,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "胭脂紅", 1],
            ["玫瑰", "彩虹幻境", 1]
        ]
    },

    {
        name: "貓神的祝福",
        price: 884,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 1],
            ["玫瑰", "彩虹幻境", 1]
        ]
    },

    {
        name: "榮耀情牽",
        price: 1040,
        special: false,
        recipe: [
            ["滿天星", "薄荷綠", 2],
            ["滿天星", "煥采星河", 2]
        ]
    },

    {
        name: "至尊甜心",
        price: 1300,
        special: false,
        recipe: [
            ["滿天星", "薄荷綠", 1],
            ["滿天星", "煥采星河", 2]
        ]
    },

    {
        name: "心動頂峰",
        price: 1300,
        special: false,
        recipe: [
            ["滿天星", "煥采星河", 3]
        ]
    },

    {
        name: "心動頂峰／璀璨殿堂",
        price: 1300,
        special: false,
        recipe: [
            ["雛菊", "墨黑蕾絲", 3]
        ]
    },

    {
        name: "綻放光年",
        price: 1500,
        special: false,
        recipe: [
            ["梅花", "照水", 5]
        ]
    },

    {
        name: "真愛奇蹟",
        price: 1500,
        special: false,
        recipe: [
            ["薰衣草", "曜夜極黑", 5]
        ]
    },

    {
        name: "頂級心意",
        price: 1800,
        special: false,
        recipe: [
            ["雛菊", "曜黑金邊", 2],
            ["滿天星", "雙色星斑", 1],
            ["薰衣草", "翡翠金絲", 1]
        ]
    },

    {
        name: "極致傾心",
        price: 2560,
        special: false,
        recipe: [
            ["雛菊", "曜黑金邊", 5]
        ]
    },

    {
        name: "夢幻臻藏",
        price: 2560,
        special: false,
        recipe: [
            ["梅花", "紫葉紅", 5]
        ]
    },

    {
        name: "終極約會／至尊甜心",
        price: 3240,
        special: false,
        recipe: [
            ["梅花", "琥珀冰晶", 3]
        ]
    },

    {
        name: "春日暖陽",
        price: null,
        special: true,
        recipe: [
            ["雛菊", "黃", 1],
            ["滿天星", "鵝黃", 1],
            ["梅花", "硃砂", 1]
        ]
    },

    {
        name: "甜蜜時光",
        price: null,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "胭脂紅", 1],
            ["梅花", "灑金", 1]
        ]
    },

    {
        name: "晨曦花語",
        price: null,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 2]
        ]
    },

    {
        name: "祝福鈴聲",
        price: null,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 1],
            ["薰衣草", "甜蜜藍", 1],
            ["玫瑰", "橙黃", 1]
        ]
    },

    {
        name: "奇蹟相遇",
        price: null,
        special: false,
        recipe: [
            ["鬱金香", "皇家金絲墨", 3]
        ]
    },

    {
        name: "金色年華",
        price: null,
        special: true,
        recipe: [
            ["雛菊", "黃", 1],
            ["滿天星", "淡粉", 1],
            ["薰衣草", "微光粉", 1],
            ["梅花", "硃砂", 1]
        ]
    },

    {
        name: "童話花園",
        price: null,
        special: true,
        recipe: [
            ["雛菊", "黃", 1],
            ["滿天星", "淡粉", 1],
            ["梅花", "龍游", 1]
        ]
    },

    {
        name: "尾巴圓舞曲",
        price: null,
        special: false,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "白", 1],
            ["薰衣草", "原生淺紫", 1],
            ["梅花", "紫葉紅", 1],
            ["玫瑰", "紫", 1]
        ]
    },

    {
        name: "琥珀之夢",
        price: null,
        special: false,
        recipe: [
            ["雛菊", "黃", 1],
            ["滿天星", "淡粉", 1],
            ["薰衣草", "原生淺紫", 1],
            ["梅花", "硃砂", 1],
            ["玫瑰", "紅", 1]
        ]
    },

    {
        name: "華麗心樂",
        price: null,
        special: false,
        recipe: [
            ["雛菊", "香檳", 1],
            ["滿天星", "白", 1],
            ["玫瑰", "黑魔術", 1]
        ]
    },

    {
        name: "幸運草原",
        price: null,
        special: true,
        recipe: [
            ["雛菊", "白", 1],
            ["滿天星", "薄荷綠", 1],
            ["梅花", "龍游", 1]
        ]
    }
];


// =====================================================
// 🧙 小道消息 46 筆
// =====================================================

const rumors = [

    [
        ["雛菊", "白", 1],
        ["薰衣草", "曜夜極黑", 1],
        ["玫瑰", "彩虹幻境", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淺藍", 1],
        ["薰衣草", "英倫深紫", 1],
        ["梅花", "玉蝶", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "淺藍", 1],
        ["薰衣草", "原生淺紫", 1],
        ["玫瑰", "彩虹幻境", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淺藍", 1],
        ["玫瑰", "彩虹幻境", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["玫瑰", "彩虹幻境", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "琥珀冰晶", 1],
        ["玫瑰", "粉紅", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["梅花", "綠萼", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淺藍", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "玉蝶", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "微光粉", 1],
        ["梅花", "白", 1],
        ["百合", "幽藍幻影", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "白雪", 1],
        ["梅花", "白", 1],
        ["玫瑰", "白", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "曜夜極黑", 1],
        ["梅花", "綠萼", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "甜蜜藍", 1],
        ["梅花", "白", 1],
        ["玫瑰", "粉紅", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["玫瑰", "黑魔術", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淺藍", 1],
        ["梅花", "灑金", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "原生淺紫", 1],
        ["百合", "璀璨極光", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "胭脂紅", 1],
        ["薰衣草", "原生淺紫", 1],
        ["玫瑰", "黑魔術", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "灑金", 1],
        ["百合", "@黃綠", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "胭脂紅", 1],
        ["梅花", "灑金", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "淡粉", 1],
        ["薰衣草", "雙色斑紋", 1],
        ["玫瑰", "香檳", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "淡粉", 1],
        ["薰衣草", "微光粉", 1],
        ["梅花", "硃砂", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淡粉", 1],
        ["薰衣草", "白雪", 1],
        ["玫瑰", "黑魔術", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "玉蝶", 1],
        ["鬱金香", "皇家金絲墨", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "白雪", 1],
        ["梅花", "綠萼", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淺藍", 1],
        ["玫瑰", "彩虹幻境", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["玫瑰", "彩虹幻境", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "灑金", 1],
        ["百合", "@黃綠", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "薰衣紫", 1],
        ["梅花", "照水", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "甜蜜藍", 1],
        ["玫瑰", "橙黃", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "白雪", 1],
        ["梅花", "白", 1],
        ["玫瑰", "橙黃", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "英倫深紫", 1],
        ["百合", "璀璨極光", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "鵝黃", 1],
        ["梅花", "硃砂", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淡粉", 1],
        ["薰衣草", "白雪", 1],
        ["玫瑰", "黑魔術", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "淡粉", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "宮粉", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "英倫深紫", 1],
        ["百合", "璀璨極光", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "微光粉", 1],
        ["梅花", "白", 1],
        ["百合", "幽藍幻影", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "淡粉", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "宮粉", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淺藍", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "玉蝶", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "原生淺紫", 1],
        ["百合", "璀璨極光", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "淡粉", 1],
        ["薰衣草", "雙色斑紋", 1],
        ["玫瑰", "香檳", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "淺藍", 1],
        ["梅花", "灑金", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "原生淺紫", 1],
        ["百合", "璀璨極光", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "胭脂", 1],
        ["薰衣草", "原生淺紫", 1],
        ["玫瑰", "黑魔術", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "淡粉", 1],
        ["薰衣草", "微光粉", 1],
        ["梅花", "硃砂", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "曜夜極黑", 1],
        ["梅花", "綠萼", 1]
    ],

    [
        ["雛菊", "黃", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "原生淺紫", 1],
        ["梅花", "玉蝶", 1],
        ["鬱金香", "皇家金絲墨", 1]
    ],

    [
        ["雛菊", "白", 1],
        ["滿天星", "白", 1],
        ["薰衣草", "甜蜜藍", 1],
        ["梅花", "白", 1],
        ["玫瑰", "粉紅", 1]
    ]

];


// =====================================================
// 🧺 我的材料
// =====================================================

let myFlowers = [];


// =====================================================
// 🚀 網頁載入
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    loadFlowerTypes();

    showColors();

    updateMyFlowers();

});


// =====================================================
// 第一個選單：花種
// =====================================================

function loadFlowerTypes() {

    const select =
        document.getElementById("flowerType");

    if (!select) return;

    select.innerHTML = "";

    const first =
        document.createElement("option");

    first.value = "";

    first.textContent = "請選擇花種";

    select.appendChild(first);


    Object.keys(flowerData).forEach(function (flower) {

        const option =
            document.createElement("option");

        option.value = flower;

        option.textContent = flower;

        select.appendChild(option);

    });

}


// =====================================================
// 第二個選單：顏色
// =====================================================

function showColors() {

    const flowerType =
        document.getElementById("flowerType");

    const flowerColor =
        document.getElementById("flowerColor");

    if (!flowerType || !flowerColor) return;


    const type = flowerType.value;

    flowerColor.innerHTML = "";


    if (!type) {

        const option =
            document.createElement("option");

        option.value = "";

        option.textContent = "請先選擇花種";

        flowerColor.appendChild(option);

        return;
    }


    const colors = flowerData[type];


    if (!colors || colors.length === 0) {

        const option =
            document.createElement("option");

        option.value = "";

        option.textContent = "目前尚未提供顏色";

        flowerColor.appendChild(option);

        return;
    }


    const first =
        document.createElement("option");

    first.value = "";

    first.textContent = "請選擇顏色";

    flowerColor.appendChild(first);


    colors.forEach(function (color) {

        const option =
            document.createElement("option");

        option.value = color;

        option.textContent = color;

        flowerColor.appendChild(option);

    });

}


// =====================================================
// ➕ 加入材料
// =====================================================

function addFlower() {

    const type =
        document.getElementById("flowerType").value;

    const color =
        document.getElementById("flowerColor").value;


    if (!type) {

        alert("請先選擇花種！");

        return;
    }


    if (!color) {

        alert("請選擇顏色！");

        return;
    }


    const existing =
        myFlowers.find(function (item) {

            return (
                item.type === type &&
                item.color === color
            );

        });


    if (existing) {

        existing.quantity++;

    } else {

        myFlowers.push({

            type: type,

            color: color,

            quantity: 1

        });

    }


    updateMyFlowers();

    document.getElementById("flowerColor").value = "";

}


// =====================================================
// 顯示我的材料
// =====================================================

function updateMyFlowers() {

    const container =
        document.getElementById("myFlowers");

    if (!container) return;


    container.innerHTML = "";


    if (myFlowers.length === 0) {

        container.innerHTML =
            '<div class="empty">目前沒有材料</div>';

        return;
    }


    myFlowers.forEach(function (flower, index) {

        const div =
            document.createElement("div");

        div.className = "material";


        div.innerHTML = `

            <span>
                ${flower.type}・${flower.color}
                × ${flower.quantity}
            </span>

            <button
                class="remove-btn"
                onclick="removeFlower(${index})">
                −
            </button>

            <button
                class="remove-btn"
                onclick="addQuantity(${index})">
                ＋
            </button>

            <button
                class="remove-btn"
                onclick="deleteFlower(${index})">
                刪除
            </button>

        `;


        container.appendChild(div);

    });

}


// =====================================================
// ➕ 增加數量
// =====================================================

function addQuantity(index) {

    myFlowers[index].quantity++;

    updateMyFlowers();

}


// =====================================================
// ➖ 減少數量
// =====================================================

function removeFlower(index) {

    myFlowers[index].quantity--;


    if (myFlowers[index].quantity <= 0) {

        myFlowers.splice(index, 1);

    }


    updateMyFlowers();

}


// =====================================================
// 🗑 刪除材料
// =====================================================

function deleteFlower(index) {

    myFlowers.splice(index, 1);

    updateMyFlowers();

}


// =====================================================
// 🗑 清空材料
// =====================================================

function clearFlowers() {

    myFlowers = [];

    updateMyFlowers();


    document.getElementById("result").innerHTML = `

        <div class="empty">
            材料已清空。
        </div>

    `;

}


// =====================================================
// 🔎 取得目前材料數量
// =====================================================

function getMaterialCount() {

    const count = {};


    myFlowers.forEach(function (flower) {

        const key =
            flower.type + "・" + flower.color;


        count[key] =
            (count[key] || 0) +
            flower.quantity;

    });


    return count;

}


// =====================================================
// 🔎 檢查配方缺少哪些材料
// =====================================================

function checkRecipe(recipe) {

    const materials =
        getMaterialCount();

    const missing = [];


    recipe.forEach(function (item) {

        const type = item[0];

        const color = item[1];

        const need = item[2];


        const key =
            type + "・" + color;


        const have =
            materials[key] || 0;


        if (have < need) {

            missing.push({

                type: type,

                color: color,

                need: need,

                have: have

            });

        }

    });


    return missing;

}


// =====================================================
// 🌸 顯示材料
// =====================================================

function formatRecipe(recipe) {

    return recipe.map(function (item) {

        const type = item[0];

        const color = item[1];

        const quantity = item[2];


        let text =
            color + type;


        if (quantity > 1) {

            text += "*" + quantity;

        }


        return text;

    }).join("、");

}


// =====================================================
// 💰 顯示價格
// =====================================================

function formatPrice(price) {

    if (
        price === null ||
        price === undefined
    ) {

        return "價格：未提供";

    }


    return "價格：$" + price;

}


// =====================================================
// ⚠️ 顯示缺少材料
// =====================================================

function formatMissing(missing) {

    return missing.map(function (item) {

        const shortage =
            item.need - item.have;


        return (
            item.color +
            item.type +
            " × " +
            shortage
        );

    }).join("、");

}
// =====================================================
// 💐 建立花束卡片
// =====================================================

function createBouquetCard(
    bouquet,
    missing
) {

    const card =
        document.createElement("div");

    card.className = "recipe";


    const specialText =
        bouquet.special
            ? " ⭐ 特殊花束"
            : "";


    // 完整材料配方
    const allMaterials =
        formatRecipe(bouquet.recipe);


    // 價格
    const priceText =
        formatPrice(bouquet.price);


    // =============================================
    // 可以製作
    // =============================================

    if (missing.length === 0) {

        card.innerHTML = `

            <div class="recipe-name">

                💐 ${bouquet.name}${specialText}

            </div>

            <div class="recipe-material">

                材料：
                ${allMaterials}

            </div>

            <div class="recipe-material">

                ${priceText}

            </div>

            <div style="
                color:#4b8b57;
                font-weight:bold;
                margin-top:8px;
            ">

                ✅ 可以製作

            </div>

        `;

    }

    // =============================================
    // 缺少材料
    // =============================================

    else {

        card.innerHTML = `

            <div class="recipe-name">

                💐 ${bouquet.name}${specialText}

            </div>

            <div class="recipe-material">

                材料：
                ${allMaterials}

            </div>

            <div class="recipe-material">

                ${priceText}

            </div>

            <div class="missing"
                 style="
                    margin-top:8px;
                    color:#c94b5c;
                    font-weight:bold;
                 ">

                ❌ 共缺少：
                ${formatMissing(missing)}

            </div>

        `;

    }


    return card;

}

// =====================================================
// 💐 查詢花束組合
// =====================================================

function checkBouquets() {

    const result =
        document.getElementById("result");


    result.innerHTML = `

        <h2 class="result-title">
            💐 花束組合查詢結果
        </h2>

    `;


    if (myFlowers.length === 0) {

        result.innerHTML += `

            <div class="empty">
                請先加入你的花朵材料。
            </div>

        `;

        return;
    }


    const canMake = [];

    const cannotMake = [];


    bouquets.forEach(function (bouquet) {

        const missing =
            checkRecipe(bouquet.recipe);


        if (missing.length === 0) {

            canMake.push(bouquet);

        } else {

            cannotMake.push({

                bouquet: bouquet,

                missing: missing

            });

        }

    });


    // =============================================
    // 可以製作
    // =============================================

    result.innerHTML += `

        <h3 class="result-title">
            ✅ 目前可以製作
        </h3>

    `;


    if (canMake.length === 0) {

        result.innerHTML += `

            <div class="empty">
                目前沒有完全符合材料的花束。
            </div>

        `;

    } else {

        canMake.forEach(function (bouquet) {

            result.appendChild(
                createBouquetCard(
                    bouquet,
                    []
                )
            );

        });

    }


    // =============================================
    // 缺少材料
    // =============================================

    result.innerHTML += `

        <h3 class="result-title">
            ⚠️ 缺少材料的花束
        </h3>

    `;


    cannotMake.forEach(function (item) {

        result.appendChild(

            createBouquetCard(
                item.bouquet,
                item.missing
            )

        );

    });

}


// =====================================================
// 🧙 建立小道消息卡片
// =====================================================

function createRumorCard(
    number,
    recipe,
    missing
) {

    const card =
        document.createElement("div");

    card.className = "recipe";


    if (missing.length === 0) {

        card.innerHTML = `

            <div class="recipe-name">

                🧙 小道消息 #${number}

            </div>

            <div class="recipe-material">

                材料：
                ${formatRecipe(recipe)}

            </div>

            <div style="
                color:#4b8b57;
                font-weight:bold;
                margin-top:8px;
            ">

                ✅ 材料全部都有

            </div>

        `;

    } else {

        card.innerHTML = `

            <div class="recipe-name">

                🧙 小道消息 #${number}

            </div>

            <div class="recipe-material">

                材料：
                ${formatRecipe(recipe)}

            </div>

            <div class="missing"
                 style="margin-top:8px;">

                ❌ 缺少：
                ${formatMissing(missing)}

            </div>

        `;

    }


    return card;

}


// =====================================================
// 🧙 查詢小道消息
// =====================================================

function checkRumors() {

    const result =
        document.getElementById("result");


    result.innerHTML = `

        <h2 class="result-title">
            🧙 小道消息查詢結果
        </h2>

    `;


    if (myFlowers.length === 0) {

        result.innerHTML += `

            <div class="empty">
                請先加入你的花朵材料。
            </div>

        `;

        return;
    }


    const canMake = [];

    const cannotMake = [];


    rumors.forEach(function (recipe, index) {

        const missing =
            checkRecipe(recipe);


        if (missing.length === 0) {

            canMake.push({

                number: index + 1,

                recipe: recipe

            });

        } else {

            cannotMake.push({

                number: index + 1,

                recipe: recipe,

                missing: missing

            });

        }

    });


    // =============================================
    // 可以製作的小道消息
    // =============================================

    result.innerHTML += `

        <h3 class="result-title">

            ✅ 材料符合的小道消息

        </h3>

    `;


    if (canMake.length === 0) {

        result.innerHTML += `

            <div class="empty">

                目前沒有材料完全符合的小道消息。

            </div>

        `;

    } else {

        canMake.forEach(function (item) {

            result.appendChild(

                createRumorCard(
                    item.number,
                    item.recipe,
                    []
                )

            );

        });

    }


    // =============================================
    // 缺少材料的小道消息
    // =============================================

    result.innerHTML += `

        <h3 class="result-title">

            ⚠️ 缺少材料的小道消息

        </h3>

    `;


    cannotMake.forEach(function (item) {

        result.appendChild(

            createRumorCard(
                item.number,
                item.recipe,
                item.missing
            )

        );

    });

}