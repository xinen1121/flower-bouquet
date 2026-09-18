/* =========================================================
   🌷 花束合成查詢系統
   ========================================================= */


/* =========================================================
   1. 花材資料
   ========================================================= */

const flowerData = [
    {
        type: "雛菊",
        colors: [
            "白",
            "黃",
            "粉紅",
            "香檳",
            "橙紅",
            "深紅",
            "澄藍",
            "雙色",
            "墨黑蕾絲",
            "曜黑金邊"
        ]
    },

    {
        type: "滿天星",
        colors: [
            "白",
            "淡粉",
            "淺藍",
            "鵝黃",
            "薰衣紫",
            "胭脂紅",
            "薄荷綠",
            "雙色星斑",
            "夜空極光",
            "煥采星河"
        ]
    },

    {
        type: "薰衣草",
        colors: [
            "原生淺紫",
            "白雪",
            "甜蜜藍",
            "英倫深紫",
            "雙色斑紋",
            "杏桃黃",
            "微光粉",
            "曜夜極黑",
            "翡翠金絲",
            "絲絨靛藍"
        ]
    },

    {
        type: "梅花",
        colors: [
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
        ]
    },

    {
        type: "玫瑰",
        colors: [
            "白",
            "香檳",
            "粉紅",
            "紅",
            "橙黃",
            "黃",
            "黑魔術",
            "彩虹幻境",
            "紫",
            "綠色碧玉"
        ]
    },

    {
        type: "百合",
        colors: [
            "白",
            "黃",
            "橙色火",
            "虎斑雙色",
            "璀璨極光",
            "幽藍幻影",
            "粉",
            "香水姬",
            "香檳金",
            "黑珍珠"
        ]
    },

    {
        type: "鬱金香",
        colors: [
            "紫",
            "黃",
            "紅",
            "粉",
            "白",
            "雙色羽毛",
            "橙色皇后",
            "皇家金絲墨",
            "夜皇后黑鬱金香",
            "冰藍幻彩鬱金香"
        ]
    },

    {
        type: "桔梗",
        colors: [
            "藍紫",
            "白",
            "粉",
            "雙色洋",
            "雙層紫",
            "淡綠",
            "胭脂紅桔梗",
            "琥珀黃",
            "星空幽藍",
            "黯夜金斑"
        ]
    },

    {
        type: "蘭花",
        colors: [
            "白花蝴蝶蘭",
            "大花蕙蘭",
            "紫羅蘭蕙蘭",
            "翡翠素心蘭",
            "春劍翠綠",
            "粉紅蝴蝶蘭",
            "達摩線藝蘭",
            "鬼魅黑蘭",
            "黃金小春藍",
            "健素心蘭"
        ]
    }
];


/* =========================================================
   2. 我的花材
   ========================================================= */

let myFlowers = {};


/*
   初始化花材

   ★ 重要：
   不再每次刷新都全部變成 0。
   會先從 localStorage 讀取之前的數量。
*/

function initializeFlowers() {

    const saved =
        JSON.parse(
            localStorage.getItem("myFlowers") || "{}"
        );

    myFlowers = {};

    flowerData.forEach(flower => {

        flower.colors.forEach(color => {

            const key =
                makeKey(
                    flower.type,
                    color
                );

            myFlowers[key] =
                Number.isFinite(
                    Number(saved[key])
                )
                    ? Number(saved[key])
                    : 0;

        });

    });

}


/*
   儲存目前花材數量
*/

function saveFlowers() {

    // 本機先保存，離線時也不會遺失
    localStorage.setItem(
        "myFlowers",
        JSON.stringify(myFlowers)
    );

    // 已登入 Google 時，同步到 Firebase Firestore
    saveFlowersToCloud();

}


/* =========================================================
   2-1. Firebase 雲端同步
   ========================================================= */

let firebaseAuth = null;
let firestoreDB = null;
let firebaseCurrentUser = null;
let firebaseFlowersRef = null;
let firebaseUnsubscribe = null;
let firebaseReady = false;
let firebaseCloudLoading = false;
let cloudSaveQueue = Promise.resolve();

const firebaseConfig = {
    apiKey: "AIzaSyBIDQhP828b8ZPd0FmEjYncduvUd09XY2o",
    authDomain: "flowers-b0290.firebaseapp.com",
    projectId: "flowers-b0290",
    storageBucket: "flowers-b0290.firebasestorage.app",
    messagingSenderId: "247994618953",
    appId: "1:247994618953:web:ccc16064810ae7fe259b98",
    measurementId: "G-MPFVHDRDZS"
};

function createFirebaseLoginUI() {

    if (document.getElementById("firebaseLoginArea")) {
        return;
    }

    const area = document.createElement("div");
    area.id = "firebaseLoginArea";
    area.style.cssText = `
        margin: 10px 0;
        padding: 8px 10px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        font-size: 14px;
    `;

    const container = document.getElementById("myFlowers");

    if (container && container.parentNode) {
        container.parentNode.insertBefore(area, container);
    } else {
        document.body.insertBefore(area, document.body.firstChild);
    }

    updateFirebaseLoginUI();
}

function updateFirebaseLoginUI() {

    const area = document.getElementById("firebaseLoginArea");

    if (!area) {
        return;
    }

    area.innerHTML = "";

    if (firebaseCurrentUser) {

        const text = document.createElement("span");
        text.textContent =
            `☁️ 已同步：${firebaseCurrentUser.email || firebaseCurrentUser.displayName || "Google 帳號"}`;
        text.style.fontSize = "14px";

        const logoutButton = document.createElement("button");
        logoutButton.type = "button";
        logoutButton.textContent = "登出";
        logoutButton.style.cssText = `
            padding: 5px 9px;
            border: 1px solid #aaa;
            border-radius: 6px;
            background: transparent;
            cursor: pointer;
            font-size: 13px;
        `;

        logoutButton.onclick = async () => {
            if (!firebaseAuth) return;

            try {
                const { signOut } = await import(
                    "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"
                );
                await signOut(firebaseAuth);
            } catch (error) {
                console.error("Firebase 登出失敗：", error);
                alert(
                    "登出失敗，請稍後再試。\n\n" +
                    (error.message || error)
                );
            }
        };

        area.appendChild(text);
        area.appendChild(logoutButton);
        return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "🔐 使用 Google 登入並同步";
    button.style.cssText = `
        padding: 7px 12px;
        border: 1px solid #aaa;
        border-radius: 7px;
        background: transparent;
        cursor: pointer;
        font-size: 14px;
    `;
    button.onclick = loginWithGoogle;

    area.appendChild(button);
}

async function loginWithGoogle() {

    if (!firebaseAuth || !firebaseReady) {
        alert(
            "Firebase 尚未準備完成，請稍等幾秒後再按一次。\n\n" +
            "如果一直出現這個訊息，請把瀏覽器主控台錯誤截圖給我。"
        );
        return;
    }

    try {
        const {
            GoogleAuthProvider,
            signInWithPopup
        } = await import(
            "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"
        );

        const provider = new GoogleAuthProvider();
        await signInWithPopup(firebaseAuth, provider);

    } catch (error) {
        console.error("Google 登入失敗：", error);

        if (error && error.code === "auth/popup-blocked") {
            alert(
                "瀏覽器阻擋了 Google 登入視窗。請允許此網站開啟彈出式視窗後，再按一次登入。"
            );
            return;
        }

        if (error && error.code === "auth/popup-closed-by-user") {
            return;
        }

        alert(
            "Google 登入失敗。\n\n" +
            (error.message || error)
        );
    }
}

async function initializeFirebase() {

    try {

        const { initializeApp } = await import(
            "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js"
        );

        const {
            getAuth,
            onAuthStateChanged
        } = await import(
            "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js"
        );

        const {
            getFirestore,
            doc,
            getDoc,
            setDoc,
            onSnapshot,
            serverTimestamp
        } = await import(
            "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js"
        );

        const app = initializeApp(firebaseConfig);
        firebaseAuth = getAuth(app);
        firestoreDB = getFirestore(app);
        firebaseReady = true;

        createFirebaseLoginUI();

        onAuthStateChanged(firebaseAuth, async user => {

            if (firebaseUnsubscribe) {
                firebaseUnsubscribe();
                firebaseUnsubscribe = null;
            }

            firebaseCurrentUser = user;
            firebaseFlowersRef = null;
            firebaseCloudLoading = false;
            updateFirebaseLoginUI();

            if (!user) {
                return;
            }

            firebaseFlowersRef = doc(
                firestoreDB,
                "users",
                user.uid
            );

            firebaseCloudLoading = true;

            try {

                const cloudSnapshot = await getDoc(firebaseFlowersRef);

                if (cloudSnapshot.exists()) {

                    const data = cloudSnapshot.data();

                    if (data.flowers && typeof data.flowers === "object") {
                        myFlowers = normalizeFlowers(data.flowers);
                        localStorage.setItem(
                            "myFlowers",
                            JSON.stringify(myFlowers)
                        );
                        updateMyFlowers();
                    }

                } else {

                    // 這個 Google 帳號第一次登入：
                    // 把目前瀏覽器已有的材料上傳到雲端。
                    await setDoc(
                        firebaseFlowersRef,
                        {
                            flowers: { ...myFlowers },
                            updatedAt: serverTimestamp()
                        },
                        { merge: true }
                    );
                }

                firebaseCloudLoading = false;

                firebaseUnsubscribe = onSnapshot(
                    firebaseFlowersRef,
                    snapshot => {

                        if (!snapshot.exists()) {
                            return;
                        }

                        const data = snapshot.data();

                        if (data.flowers && typeof data.flowers === "object") {
                            myFlowers = normalizeFlowers(data.flowers);
                            localStorage.setItem(
                                "myFlowers",
                                JSON.stringify(myFlowers)
                            );
                            updateMyFlowers();

                            const result = document.getElementById("result");
                            if (result && result.innerHTML.trim() !== "") {
                                const resultTitle = result.querySelector(".result-title");
                                if (
                                    resultTitle &&
                                    resultTitle.textContent.includes("查詢結果")
                                ) {
                                    searchBouquets();
                                }
                            }
                        }
                    },
                    error => {
                        console.error("Firestore 即時同步失敗：", error);
                        firebaseCloudLoading = false;
                    }
                );

            } catch (error) {

                firebaseCloudLoading = false;
                console.error("Firebase 雲端資料載入失敗：", error);

                alert(
                    "Google 已登入，但雲端資料讀取失敗。\n\n" +
                    "請確認 Firebase Firestore 規則已設定好。\n\n" +
                    (error.message || error)
                );
            }
        });

    } catch (error) {

        firebaseReady = false;
        console.error("Firebase 初始化失敗：", error);

        createFirebaseLoginUI();
    }
}

function normalizeFlowers(source) {

    const normalized = {};

    flowerData.forEach(flower => {

        flower.colors.forEach(color => {

            const key = makeKey(flower.type, color);
            const value = Number(source[key]);

            normalized[key] =
                Number.isFinite(value) && value >= 0
                    ? value
                    : 0;
        });
    });

    return normalized;
}

function saveFlowersToCloud() {

    if (
        !firebaseReady ||
        !firebaseCurrentUser ||
        !firebaseFlowersRef ||
        firebaseCloudLoading
    ) {
        return;
    }

    const flowersToSave = { ...myFlowers };

    cloudSaveQueue = cloudSaveQueue
        .then(async () => {

            if (!firebaseFlowersRef || !firebaseCurrentUser) {
                return;
            }

            const { setDoc, serverTimestamp } = await import(
                "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js"
            );

            await setDoc(
                firebaseFlowersRef,
                {
                    flowers: flowersToSave,
                    updatedAt: serverTimestamp()
                },
                { merge: true }
            );
        })
        .catch(error => {
            console.error("Firebase 保存失敗：", error);
        });
}


function makeKey(type, color) {

    return `${type}|${color}`;

}


function getQuantity(type, color) {

    const key =
        makeKey(
            type,
            color
        );

    return myFlowers[key] || 0;

}


/* =========================================================
   3. 顯示花材
   ========================================================= */

function updateMyFlowers() {

    const container =
        document.getElementById(
            "myFlowers"
        );

    container.innerHTML = "";


    flowerData.forEach(flower => {

        const group =
            document.createElement(
                "div"
            );

        group.className =
            "flower-group";


        const title =
            document.createElement(
                "div"
            );

        title.className =
            "flower-title";

        title.textContent =
            `🌸 ${flower.type}`;

        group.appendChild(title);


        const colorsContainer =
            document.createElement(
                "div"
            );

        colorsContainer.className =
            "flower-colors";


        flower.colors.forEach(color => {

            const key =
                makeKey(
                    flower.type,
                    color
                );

            const quantity =
                myFlowers[key] || 0;


            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "material-item";


            const name =
                document.createElement(
                    "div"
                );

            name.className =
                "material-name";

            name.textContent =
                color;


            const counter =
                document.createElement(
                    "div"
                );

            counter.className =
                "counter";


            const minusButton =
                document.createElement(
                    "button"
                );

            minusButton.textContent =
                "−";

            minusButton.title =
                "減少";

            minusButton.onclick =
                () => {

                    changeQuantity(
                        flower.type,
                        color,
                        -1
                    );

                };


            const number =
                document.createElement(
                    "span"
                );

            number.className =
                "quantity";

            number.textContent =
                quantity;


            const plusButton =
                document.createElement(
                    "button"
                );

            plusButton.textContent =
                "+";

            plusButton.title =
                "增加";

            plusButton.onclick =
                () => {

                    changeQuantity(
                        flower.type,
                        color,
                        1
                    );

                };


            counter.appendChild(
                minusButton
            );

            counter.appendChild(
                number
            );

            counter.appendChild(
                plusButton
            );


            item.appendChild(
                name
            );

            item.appendChild(
                counter
            );


            colorsContainer.appendChild(
                item
            );

        });


        group.appendChild(
            colorsContainer
        );

        container.appendChild(
            group
        );

    });

}


/* =========================================================
   4. 加減花材
   ========================================================= */

function changeQuantity(
    type,
    color,
    amount
) {

    const key =
        makeKey(
            type,
            color
        );

    const current =
        myFlowers[key] || 0;

    let newValue =
        current + amount;


    if (newValue < 0) {

        newValue = 0;

    }


    myFlowers[key] =
        newValue;


    /*
       ★ 每次按 + / − 都立即儲存
       所以重新整理網頁後不會歸零
    */

    saveFlowers();


    updateMyFlowers();

}


/* =========================================================
   5. 花束資料
   ========================================================= */

const bouquets = [

    {
        price: 100,
        name: "清晨踏青",
        ingredients: [
            "白雛菊*3"
        ]
    },

    {
        price: 100,
        name: "微微一笑",
        ingredients: [
            "黃雛菊*3"
        ]
    },

    {
        price: 100,
        name: "純真歲月",
        ingredients: [
            "深紅雛菊",
            "雪白薰衣草",
            "鵝黃滿天星"
        ]
    },

    {
        price: 100,
        name: "微微一笑",
        ingredients: [
            "原生淺紫薰衣草*2",
            "黃鬱金香"
        ]
    },

    {
        price: 130,
        special: true,
        name: "晨曦花語",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "白滿天星"
        ]
    },

    {
        price: 130,
        name: "月下私語",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "綠萼梅花"
        ]
    },

    {
        price: 130,
        special: true,
        name: "微風輕拂",
        ingredients: [
            "黃雛菊",
            "白滿天星",
            "玉蝶梅花"
        ]
    },

    {
        price: 130,
        special: true,
        name: "春日暖陽",
        ingredients: [
            "黃雛菊",
            "鵝黃滿天星",
            "硃砂梅花"
        ]
    },

    {
        price: 130,
        special: true,
        name: "月下私語",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "綠萼梅花"
        ]
    },

    {
        price: 140,
        special: true,
        name: "祝福鈴聲",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "甜蜜藍薰衣草",
            "橙黃玫瑰"
        ]
    },

    {
        price: 182,
        special: true,
        name: "雨後彩虹",
        ingredients: [
            "黃雛菊",
            "淡粉滿天星",
            "原生淺紫薰衣草",
            "宮粉梅花"
        ]
    },

    {
        price: 182,
        name: "午後小憩",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "白雪薰衣草",
            "綠萼梅花"
        ]
    },

    {
        price: 182,
        special: true,
        name: "雪國情書",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "白雪薰衣草",
            "香檳玫瑰"
        ]
    },

    {
        price: 182,
        special: true,
        name: "晚霞絮語",
        ingredients: [
            "黃雛菊",
            "淡粉滿天星",
            "杏桃黃薰衣草",
            "宮粉梅花"
        ]
    },

    {
        price: 182,
        special: true,
        name: "金色年華",
        ingredients: [
            "黃雛菊",
            "淡粉滿天星",
            "微光粉薰衣草",
            "朱砂梅花"
        ]
    },

    {
        price: 182,
        special: true,
        name: "紫醉花香",
        ingredients: [
            "白雛菊",
            "淺藍滿天星",
            "原生淺紫薰衣草",
            "玉蝶梅花"
        ]
    },

    {
        price: 182,
        special: true,
        name: "蜜糖派對",
        ingredients: [
            "黃雛菊",
            "淡粉滿天星",
            "雙色斑紋薰衣草",
            "香檳玫瑰"
        ]
    },

    {
        price: 182,
        special: true,
        name: "午後小憩",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "雪白薰衣草",
            "綠萼梅花"
        ]
    },

    {
        price: 200,
        name: "幸福提案",
        ingredients: [
            "胭脂紅滿天星*2",
            "深紅雛菊"
        ]
    },

    {
        price: 200,
        name: "悄悄愛慕",
        ingredients: [
            "胭脂紅滿天星*3"
        ]
    },

    {
        price: 200,
        name: "溫柔擁抱",
        ingredients: [
            "粉雛菊",
            "深紅雛菊",
            "薰衣紫滿天星"
        ]
    },

    {
        price: 200,
        name: "溫柔擁抱/綿綿細雨",
        ingredients: [
            "深紅雛菊",
            "橙紅雛菊",
            "香檳雛菊"
        ]
    },

    {
        price: 200,
        name: "溫柔擁抱",
        ingredients: [
            "深紅雛菊",
            "薰衣紫滿天星",
            "白雪薰衣草"
        ]
    },

    {
        price: 260,
        name: "童話花園",
        ingredients: [
            "黃雛菊",
            "淡粉滿天星",
            "龍游梅花"
        ]
    },

    {
        price: 260,
        special: true,
        name: "星夜物語",
        ingredients: [
            "白雛菊",
            "淺藍滿天星",
            "灑金梅花"
        ]
    },

    {
        price: 260,
        special: true,
        name: "銀河漫步",
        ingredients: [
            "白雛菊",
            "淺藍滿天星",
            "照水梅花"
        ]
    },

    {
        price: 260,
        special: true,
        name: "甜蜜時光",
        ingredients: [
            "白雛菊",
            "胭脂紅滿天星",
            "灑金梅花"
        ]
    },

    {
        price: 260,
        name: "海風之戀",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "白雪薰衣草",
            "白梅花",
            "白玫瑰"
        ]
    },

    {
        price: 260,
        special: true,
        name: "琥珀之夢",
        ingredients: [
            "黃雛菊",
            "淡粉滿天星",
            "原生淺紫薰衣草",
            "朱砂梅花",
            "紅玫瑰"
        ]
    },

    {
        price: 260,
        name: "緋色圓舞",
        ingredients: [
            "白雛菊",
            "淡粉滿天星",
            "原生淺紫薰衣草",
            "宮粉梅花",
            "香水姬百合"
        ]
    },

    {
        price: 260,
        special: true,
        name: "奶貓搖鈴",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "白雪薰衣草",
            "白梅花",
            "橙黃玫瑰"
        ]
    },

    {
        price: 260,
        special: true,
        name: "青空之詩",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "甜蜜藍薰衣草",
            "白梅花",
            "粉紅玫瑰"
        ]
    },

    {
        price: 260,
        special: true,
        name: "玫瑰騎士",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "原生淺紫薰衣草",
            "灑金梅花",
            "粉紅玫瑰"
        ]
    },

    {
        price: 260,
        name: "鬍鬚微風",
        ingredients: [
            "黃雛菊",
            "白滿天星",
            "原生淺紫薰衣草",
            "綠萼梅花",
            "虎斑雙色百合"
        ]
    },

    {
        price: 260,
        name: "寶石盒子",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "原生淺紫薰衣草",
            "灑金梅花",
            "香檳金百合"
        ]
    },

    {
        price: 260,
        name: "窗台日光浴",
        ingredients: [
            "黃雛菊",
            "白滿天星",
            "英倫深紫薰衣草",
            "白梅花",
            "橙黃玫瑰"
        ]
    },

    {
        price: 260,
        special: true,
        name: "海風之戀",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "白雪薰衣草",
            "白梅花",
            "白玫瑰"
        ]
    },

    {
        price: 260,
        special: true,
        name: "童話花園/幸運草原",
        ingredients: [
            "黃雛菊",
            "淡粉滿天星",
            "龍游梅花"
        ]
    },

    {
        price: 320,
        name: "溫柔擁抱",
        ingredients: [
            "雙色斑紋薰衣草*2",
            "雙色星斑滿天星"
        ]
    },

    {
        price: 380,
        name: "心動物語",
        ingredients: [
            "鵝黃滿天星*2",
            "夜空極光滿天星"
        ]
    },

    {
        price: 380,
        name: "繽紛嘉年華",
        ingredients: [
            "灑金梅花*2",
            "橙黃雛菊"
        ]
    },

    {
        price: 380,
        name: "華麗心樂",
        ingredients: [
            "香檳雛菊",
            "白滿天星",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 380,
        name: "閃耀心願",
        ingredients: [
            "雙色星斑滿天星*3"
        ]
    },

    {
        price: 380,
        name: "閃耀心願",
        ingredients: [
            "橙紅雛菊",
            "灑金梅花",
            "玉蝶梅花"
        ]
    },

    {
        price: 416,
        name: "糖霜蛋糕",
        ingredients: [
            "白雛菊",
            "淡粉滿天星",
            "白雪薰衣草",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 416,
        name: "天使羽翼",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "曜夜極黑薰衣草",
            "綠萼梅花"
        ]
    },

    {
        price: 416,
        name: "奶油雲朵",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "杏桃黃薰衣草",
            "玉蝶梅花"
        ]
    },

    {
        price: 416,
        special: true,
        name: "天使羽翼",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "曜夜極黑薰衣草",
            "綠萼梅花"
        ]
    },

    {
        price: 416,
        special: true,
        name: "糖霜蛋糕",
        ingredients: [
            "白雛菊",
            "淡粉滿天星",
            "雪白薰衣草",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 494,
        special: true,
        name: "楓紅信箋",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 494,
        name: "珍珠雨露",
        ingredients: [
            "白雛菊",
            "淺藍滿天星",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 494,
        name: "幸運草原",
        ingredients: [
            "白雛菊",
            "薄荷綠滿天星",
            "龍游梅花"
        ]
    },

    {
        price: 494,
        name: "霧中精靈",
        ingredients: [
            "白雛菊",
            "薰衣紫滿天星",
            "照水梅花"
        ]
    },

    {
        price: 494,
        special: true,
        name: "霧中精靈",
        ingredients: [
            "白雛菊",
            "薰衣紫滿天星",
            "照水梅花"
        ]
    },

    {
        price: 598,
        special: true,
        name: "虎斑搖籃",
        ingredients: [
            "黃雛菊",
            "淡粉滿天星",
            "原生淺紫薰衣草",
            "紫葉紅梅花",
            "紅玫瑰"
        ]
    },

    {
        price: 598,
        name: "蝴蝶結禮讚",
        ingredients: [
            "白雛菊",
            "淡粉滿天星",
            "原生淺紫薰衣草",
            "宮粉梅花",
            "皇家金絲墨鬱金香"
        ]
    },

    {
        price: 598,
        name: "毛球慶典",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "微光粉薰衣草",
            "白梅花",
            "幽藍幻影百合"
        ]
    },

    {
        price: 598,
        name: "尾巴圓舞曲",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "原生淺紫薰衣草",
            "紫葉紅梅花",
            "紫玫瑰"
        ]
    },

    {
        price: 598,
        name: "毛球慶典",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "微光粉薰衣草",
            "白梅花",
            "幽藍幻影百合"
        ]
    },    {
        price: 680,
        name: "永恆誓約",
        ingredients: [
            "墨黑蕾絲雛菊*2",
            "黃雛菊"
        ]
    },

    {
        price: 680,
        name: "永恆誓約",
        ingredients: [
            "夜空極光滿天星",
            "雙色星斑滿天星*2"
        ]
    },

    {
        price: 680,
        name: "典藏臻品",
        ingredients: [
            "墨黑蕾絲雛菊",
            "雙色雛菊",
            "橙紅雛菊"
        ]
    },

    {
        price: 680,
        name: "時光禮盒",
        ingredients: [
            "煥采星河滿天星",
            "薄荷綠滿天星*2"
        ]
    },

    {
        price: 680,
        name: "璀璨物語",
        ingredients: [
            "夜空極光滿天星*2",
            "白雪薰衣草"
        ]
    },

    {
        price: 680,
        name: "璀璨佳作",
        ingredients: [
            "夜空極光滿天星",
            "綠色碧玉玫瑰*2"
        ]
    },

    {
        price: 680,
        name: "夢幻旅程",
        ingredients: [
            "橙黃玫瑰",
            "照水梅花",
            "薄荷綠滿天星"
        ]
    },

    {
        price: 680,
        name: "璀璨佳作",
        ingredients: [
            "虎斑雙色",
            "橙黃玫瑰*2"
        ]
    },

    {
        price: 780,
        name: "瞳孔星空",
        ingredients: [
            "白雛",
            "白滿天星",
            "原生淺紫薰衣草",
            "璀璨極光百合"
        ]
    },

    {
        price: 780,
        name: "逗貓棒狂想",
        ingredients: [
            "黃雛菊",
            "淺藍滿天星",
            "原生淺紫薰衣草",
            "彩虹幻境玫瑰"
        ]
    },

    {
        price: 780,
        special: true,
        name: "肉墊印記",
        ingredients: [
            "白雛菊",
            "胭脂紅滿天星",
            "原生淺紫薰衣草",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 780,
        special: true,
        name: "慵懶午後",
        ingredients: [
            "黃雛菊",
            "白滿天星",
            "英倫深紫薰衣草",
            "璀璨極光百合"
        ]
    },

    {
        price: 880,
        name: "夢幻舞台",
        ingredients: [
            "墨黑蕾絲雛菊*4",
            "英倫深紫薰衣草"
        ]
    },

    {
        price: 880,
        name: "奇幻狂想",
        ingredients: [
            "紫羅蘭蕙蘭",
            "達摩線藝蘭",
            "大花蕙蘭",
            "淡粉滿天星",
            "原生淺紫薰衣草"
        ]
    },

    {
        price: 884,
        name: "紙箱秘境",
        ingredients: [
            "白雛菊",
            "胭脂紅滿天星",
            "彩虹幻境玫瑰"
        ]
    },

    {
        price: 884,
        name: "深夜獵貓",
        ingredients: [
            "白雛菊",
            "淺藍滿天星",
            "彩虹幻境玫瑰"
        ]
    },

    {
        price: 884,
        name: "貓語呢喃",
        ingredients: [
            "白雛菊",
            "薄荷綠滿天星",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 884,
        name: "呼嚕小調",
        ingredients: [
            "白雛菊",
            "曜夜極黑薰衣草",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 884,
        name: "貓神的祝福",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "彩虹幻境玫瑰"
        ]
    },

    {
        price: 884,
        special: true,
        name: "貓神的祝福",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "彩虹幻境玫瑰"
        ]
    },

    {
        price: 1040,
        name: "榮耀情牽",
        ingredients: [
            "薄荷綠滿天星*2",
            "煥采星河滿天星*2"
        ]
    },

    {
        price: 1144,
        name: "踏踏節奏",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "原生淺紫薰衣草",
            "琥珀冰晶梅花",
            "粉紅玫瑰"
        ]
    },

    {
        price: 1144,
        name: "糖霜蛋糕",
        ingredients: [
            "白雛菊",
            "淡粉滿天星",
            "白雪薰衣草",
            "黑魔術玫瑰"
        ]
    },

    {
        price: 1144,
        name: "貓草花田",
        ingredients: [
            "黃雛菊",
            "白滿天星",
            "原生淺紫薰衣草",
            "玉蝶梅花",
            "皇家金絲鬱金香"
        ]
    },

    {
        price: 1144,
        name: "踏踏節奏",
        ingredients: [
            "白雛菊",
            "白滿天星",
            "微光粉薰衣草",
            "白梅",
            "幽藍幻影百合"
        ]
    },

    {
        price: 1144,
        name: "貓草花田",
        ingredients: [
            "黃雛菊",
            "白滿天星",
            "原生淺紫薰衣草",
            "玉蝶梅",
            "皇家金絲墨鬱金香"
        ]
    },

    {
        price: 1300,
        name: "至尊甜心",
        ingredients: [
            "薄荷綠滿天星",
            "煥采星河滿天星*2"
        ]
    },

    {
        price: 1300,
        name: "心動頂峰",
        ingredients: [
            "煥采星河滿天星*3"
        ]
    },

    {
        price: 1300,
        name: "心動頂峰/璀璨殿堂",
        ingredients: [
            "墨黑蕾絲雛菊*3"
        ]
    },

    {
        price: 1500,
        name: "綻放光年",
        ingredients: [
            "照水梅花*5"
        ]
    },

    {
        price: 1500,
        name: "真愛奇蹟",
        ingredients: [
            "曜夜極黑薰衣草*5"
        ]
    },

    {
        price: 1690,
        name: "罐罐盛宴",
        ingredients: [
            "黃雛菊",
            "雙色星斑滿天星",
            "彩虹幻境玫瑰"
        ]
    },

    {
        price: 1690,
        name: "飛簷散步",
        ingredients: [
            "白雛菊",
            "曜夜極黑薰衣草",
            "彩虹幻境玫瑰"
        ]
    },

    {
        price: 1800,
        name: "頂級心意",
        ingredients: [
            "曜黑金邊雛菊*2",
            "雙色星斑滿天星",
            "翡翠金絲薰衣草"
        ]
    },

    {
        price: 2560,
        name: "極致傾心",
        ingredients: [
            "曜黑金邊雛菊*5"
        ]
    },

    {
        price: 2560,
        name: "夢幻臻藏",
        ingredients: [
            "紫葉紅梅花*5"
        ]
    },

    {
        price: 3240,
        name: "終極約會/至尊甜心",
        ingredients: [
            "琥珀冰晶梅花*3"
        ]
    },

    {
        price: 5640,
        name: "",
        ingredients: [
            "琥珀冰晶梅花*5"
        ]
    },

    {
        name: "奇蹟相遇",
        ingredients: [
            "皇家金絲墨鬱金香*3"
        ]
    }
];


/* =========================================================
   6. 小道消息
   ========================================================= */

const rumors = [

    "白雛菊、曜夜極黑薰衣草、彩虹幻境玫瑰"

];


/* =========================================================
   7. 材料別名
   ========================================================= */

const ingredientAliases = {

    "白雛": [
        "雛菊",
        "白"
    ],

    "雙色雛菊": [
        "雛菊",
        "雙色"
    ],

    "朱砂梅花": [
        "梅花",
        "硃砂"
    ],

    "白梅": [
        "梅花",
        "白"
    ],

    "黃鬱金香": [
        "鬱金香",
        "黃"
    ],

    "皇家金絲鬱金香": [
        "鬱金香",
        "皇家金絲墨"
    ],

    "紫玫瑰": [
        "玫瑰",
        "紫"
    ],

    "香檳玫瑰": [
        "玫瑰",
        "香檳"
    ],

    "粉紅玫瑰": [
        "玫瑰",
        "粉紅"
    ],

    "紅玫瑰": [
        "玫瑰",
        "紅"
    ],

    "橙黃玫瑰": [
        "玫瑰",
        "橙黃"
    ],

    "黑魔法玫瑰": [
        "玫瑰",
        "黑魔術"
    ],

    "彩虹幻境玫瑰": [
        "玫瑰",
        "彩虹幻境"
    ],

    "綠色碧玉玫瑰": [
        "玫瑰",
        "綠色碧玉"
    ],

    "撒金梅花": [
        "梅花",
        "灑金"
    ],

    "香檳金百合": [
        "百合",
        "香檳金"
    ],

    "璀璨極光百合": [
        "百合",
        "璀璨極光"
    ],

    "幽藍幻影百合": [
        "百合",
        "幽藍幻影"
    ],

    "紫羅蘭蕙蘭": [
        "蘭花",
        "紫羅蘭蕙蘭"
    ],

    "達摩線藝蘭": [
        "蘭花",
        "達摩線藝蘭"
    ],

    "大花蕙蘭": [
        "蘭花",
        "大花蕙蘭"
    ],

    "翡翠素心蘭": [
        "蘭花",
        "翡翠素心蘭"
    ],

    "白花蝴蝶蘭": [
        "蘭花",
        "白花蝴蝶蘭"
    ],

    "粉紅蝴蝶蘭": [
        "蘭花",
        "粉紅蝴蝶蘭"
    ],

    "鬼魅黑蘭": [
        "蘭花",
        "鬼魅黑蘭"
    ],

    "春劍翠綠": [
        "蘭花",
        "春劍翠綠"
    ]

};


/* =========================================================
   8. 解析單一材料
   ========================================================= */

function parseIngredient(text) {

    let quantity = 1;


    const match =
        text.match(
            /\*(\d+)$/
        );


    if (match) {

        quantity =
            Number(
                match[1]
            );

        text =
            text.replace(
                /\*(\d+)$/,
                ""
            );

    }


    if (ingredientAliases[text]) {

        return {

            original: text,

            type:
                ingredientAliases[text][0],

            color:
                ingredientAliases[text][1],

            quantity:
                quantity,

            valid: true

        };

    }


    const sortedFlowers =
        [...flowerData].sort(
            (a, b) =>
                b.type.length -
                a.type.length
        );


    for (
        const flower of sortedFlowers
    ) {

        if (
            text.endsWith(
                flower.type
            )
        ) {

            const color =
                text.slice(
                    0,
                    text.length -
                        flower.type.length
                );


            if (
                flower.colors.includes(
                    color
                )
            ) {

                return {

                    original: text,

                    type:
                        flower.type,

                    color:
                        color,

                    quantity:
                        quantity,

                    valid: true

                };

            }

        }

    }


    for (
        const flower of flowerData
    ) {

        if (
            flower.colors.includes(
                text
            )
        ) {

            return {

                original: text,

                type:
                    flower.type,

                color:
                    text,

                quantity:
                    quantity,

                valid: true

            };

        }

    }


    return {

        original: text,

        type: null,

        color: null,

        quantity: quantity,

        valid: false

    };

}


/* =========================================================
   9. 解析花束
   ========================================================= */

function parseBouquet(bouquet) {

    const items = [];

    const unknown = [];


    bouquet.ingredients.forEach(
        ingredientText => {

            const parsed =
                parseIngredient(
                    ingredientText
                );


            if (
                !parsed.valid
            ) {

                unknown.push(
                    parsed
                );

                return;

            }


            items.push(
                parsed
            );

        }
    );


    const combined = {};


    items.forEach(item => {

        const key =
            makeKey(
                item.type,
                item.color
            );


        if (
            !combined[key]
        ) {

            combined[key] = {

                type:
                    item.type,

                color:
                    item.color,

                quantity: 0

            };

        }


        combined[key].quantity +=
            item.quantity;

    });


    return {

        items:
            Object.values(
                combined
            ),

        unknown:
            unknown

    };

}


/* =========================================================
   10. 檢查是否能合成
   ========================================================= */

function checkBouquet(
    bouquet
) {

    const parsed =
        parseBouquet(
            bouquet
        );

    const missing = [];


    parsed.items.forEach(item => {

        const have =
            getQuantity(
                item.type,
                item.color
            );


        if (
            have <
            item.quantity
        ) {

            missing.push({

                type:
                    item.type,

                color:
                    item.color,

                need:
                    item.quantity,

                have:
                    have,

                missing:
                    item.quantity -
                    have

            });

        }

    });


    return {

        parsed:
            parsed,

        canMake:
            parsed.unknown.length === 0 &&
            missing.length === 0,

        missing:
            missing

    };

}


/* =========================================================
   11. 顯示材料
   ========================================================= */

function ingredientText(
    bouquet
) {

    return bouquet.ingredients.join(
        "、"
    );

}


/* =========================================================
   12. 花束名稱
   ========================================================= */

function getBouquetName(
    bouquet
) {

    if (
        bouquet.special
    ) {

        return `#${bouquet.name}`;

    }


    return bouquet.name;

}


/* =========================================================
   13. 查詢花束
   ========================================================= */

function searchBouquets() {

    const result =
        document.getElementById(
            "result"
        );

    result.innerHTML = "";


    const title =
        document.createElement(
            "div"
        );

    title.className =
        "result-title";


    /*
       這裡只增加你要求的小字：

       ($價錢 #特殊花束)
    */

    title.innerHTML =
        `💐 查詢結果 <small style="font-size: 0.75em; font-weight: normal; opacity: 0.75;">($價錢 #特殊花束)</small>`;


    result.appendChild(
        title
    );


    /*
       排序：

       ① 所有可以合成的花束
          → 價格高 → 低

       ② 無法合成的花束
          → 缺少材料數量少 → 多
          → 數量相同時價格高 → 低
          → 只顯示前 10 個
    */


    const checkedBouquets =
        bouquets.map(
            (
                bouquet,
                index
            ) => {

                return {

                    bouquet:
                        bouquet,

                    index:
                        index,

                    check:
                        checkBouquet(
                            bouquet
                        )

                };

            }
        );


    /* =====================================================
       可以合成的全部花束
       ===================================================== */

    const canMakeBouquets =
        checkedBouquets

            .filter(
                item =>
                    item.check.canMake
            )

            .sort(
                (a, b) => {

                    return (
                        (
                            b.bouquet.price ||
                            0
                        ) -
                        (
                            a.bouquet.price ||
                            0
                        )
                    );

                }
            );


    /* =====================================================
       無法合成
       找缺少材料最少的 10 種
       ===================================================== */

    const cannotMakeBouquets =
        checkedBouquets

            .filter(
                item => {

                    return (
                        !item.check.canMake &&
                        item.check.parsed
                            .unknown
                            .length === 0
                    );

                }
            )

            .map(
                item => {

                    const missingCount =
                        item.check.missing.reduce(
                            (
                                sum,
                                material
                            ) => {

                                return (
                                    sum +
                                    material.missing
                                );

                            },
                            0
                        );


                    return {

                        ...item,

                        missingCount:
                            missingCount

                    };

                }
            )

            .sort(
                (a, b) => {

                    if (
                        a.missingCount !==
                        b.missingCount
                    ) {

                        return (
                            a.missingCount -
                            b.missingCount
                        );

                    }


                    return (
                        (
                            b.bouquet.price ||
                            0
                        ) -
                        (
                            a.bouquet.price ||
                            0
                        )
                    );

                }
            )

            .slice(
                0,
                10
            );


    const displayList = [

        ...canMakeBouquets,

        ...cannotMakeBouquets

    ];


    /* =====================================================
       顯示結果
       ===================================================== */

    displayList.forEach(
        item => {

            const bouquet =
                item.bouquet;

            const index =
                item.index;

            const check =
                item.check;


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "result-card " +
                (
                    check.canMake
                        ? "can-make"
                        : "cannot-make"
                );


            const name =
                document.createElement(
                    "div"
                );

            name.className =
                "bouquet-name";

            name.textContent =
                getBouquetName(
                    bouquet
                ) ||
                "未命名花束";

            card.appendChild(
                name
            );


            if (
                bouquet.price !==
                undefined
            ) {

                const price =
                    document.createElement(
                        "div"
                    );

                price.className =
                    "price";

                price.textContent =
                    `$${bouquet.price}`;

                card.appendChild(
                    price
                );

            }


            const recipe =
                document.createElement(
                    "div"
                );

            recipe.className =
                "recipe";

            recipe.innerHTML =
                `<strong>材料：</strong>${escapeHTML(
                    ingredientText(
                        bouquet
                    )
                )}`;

            card.appendChild(
                recipe
            );


            /* =================================================
               可以合成
               ================================================= */

            if (
                check.canMake
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "craft-button";


                button.textContent =
                    "💐 合成";


                button.onclick =
                    () => {

                        craftBouquet(
                            index
                        );

                    };


                card.appendChild(
                    button
                );

            }


            /* =================================================
               無法合成
               ================================================= */

            else {

                if (
                    check.missing.length >
                    0
                ) {

                    const missing =
                        document.createElement(
                            "div"
                        );


                    missing.className =
                        "missing";


                    const missingText =
                        check.missing

                            .map(
                                material => {

                                    return (
                                        `${material.color}${material.type} × ${material.missing}`
                                    );

                                }
                            )

                            .join(
                                "、"
                            );


                    missing.innerHTML =
                        `<strong>缺少：</strong>${escapeHTML(
                            missingText
                        )}`;


                    card.appendChild(
                        missing
                    );

                }

            }


            result.appendChild(
                card
            );

        }
    );


    /* =====================================================
       如果完全沒有可以合成
       ===================================================== */

    if (
        canMakeBouquets.length ===
        0
    ) {

        const message =
            document.createElement(
                "div"
            );


        message.className =
            "empty-message";


        message.textContent =
            "目前沒有可以直接合成的花束 🌱";


        result.insertBefore(
            message,
            result.children[1]
        );

    }

}


/* =========================================================
   14. 合成花束
   ========================================================= */

function craftBouquet(
    index
) {

    const bouquet =
        bouquets[index];


    /*
       再檢查一次

       防止查詢畫面顯示可以合成，
       但按下按鈕之前材料已經被其他操作扣掉。
    */

    const check =
        checkBouquet(
            bouquet
        );


    /* =====================================================
       材料不足
       不扣材料
       ===================================================== */

    if (
        !check.canMake
    ) {

        alert(
            "這個花束目前已經無法合成，材料沒有扣除。"
        );


        searchBouquets();


        return;

    }


    /* =====================================================
       扣除材料
       ===================================================== */

    check.parsed.items.forEach(
        item => {

            const key =
                makeKey(
                    item.type,
                    item.color
                );


            myFlowers[key] -=
                item.quantity;

        }
    );


    /*
       ★ 合成後立刻儲存
       刷新後也會保留扣除後的數量
    */

    saveFlowers();


    /* =====================================================
       更新花材畫面
       ===================================================== */

    updateMyFlowers();


    /* =====================================================
       更新查詢結果
       ===================================================== */

    searchBouquets();


    alert(
        `💐「${
            getBouquetName(
                bouquet
            ) ||
            "未命名花束"
        }」合成成功！`
    );

}/* =========================================================
   15. 小道消息
   ========================================================= */

function showRumors() {

    const result =
        document.getElementById(
            "result"
        );

    result.innerHTML = "";


    const title =
        document.createElement(
            "div"
        );

    title.className =
        "result-title";

    title.textContent =
        "📰 小道消息";

    result.appendChild(
        title
    );


    rumors.forEach(
        (rumor, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "rumor-card";


            /* =================================================
               小道消息文字
               ================================================= */

            const textElement =
                document.createElement(
                    "div"
                );


            textElement.innerHTML =
                `<strong>${index + 1}.</strong> ` +
                escapeHTML(
                    rumor
                );


            card.appendChild(
                textElement
            );


            /* =================================================
               把小道消息當成一個花束配方檢查
               ================================================= */

            const rumorBouquet = {

                name:
                    `小道消息 ${index + 1}`,

                ingredients:
                    rumor.split("、")

            };


            const check =
                checkBouquet(
                    rumorBouquet
                );


            /* =================================================
               材料足夠
               → 顯示合成按鈕
               ================================================= */

            if (
                check.canMake
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "craft-button";


                button.textContent =
                    "💐 合成";


                button.onclick =
                    () => {

                        craftRumor(
                            index
                        );

                    };


                card.appendChild(
                    button
                );

            }


            /* =================================================
               材料不足
               → 顯示缺少材料
               ================================================= */

            else if (
                check.missing.length >
                0
            ) {

                const missing =
                    document.createElement(
                        "div"
                    );


                missing.className =
                    "missing";


                const missingText =
                    check.missing

                        .map(
                            material => {

                                return (
                                    `${material.color}${material.type} × ${material.missing}`
                                );

                            }
                        )

                        .join(
                            "、"
                        );


                missing.innerHTML =
                    `<strong>缺少：</strong>${escapeHTML(
                        missingText
                    )}`;


                card.appendChild(
                    missing
                );

            }


            result.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   15-1. 合成小道消息
   ========================================================= */

function craftRumor(
    index
) {

    const rumor =
        rumors[index];


    const rumorBouquet = {

        name:
            `小道消息 ${index + 1}`,

        ingredients:
            rumor.split("、")

    };


    /*
       再檢查一次
       防止材料不足時誤扣
    */

    const check =
        checkBouquet(
            rumorBouquet
        );


    if (
        !check.canMake
    ) {

        alert(
            "這個小道消息目前已經無法合成，材料沒有扣除。"
        );


        showRumors();


        return;

    }


    /* =====================================================
       扣除材料
       ===================================================== */

    check.parsed.items.forEach(
        item => {

            const key =
                makeKey(
                    item.type,
                    item.color
                );


            myFlowers[key] -=
                item.quantity;

        }
    );


    /*
       ★ 合成小道消息後也要儲存
    */

    saveFlowers();


    /* =====================================================
       更新花材數量
       ===================================================== */

    updateMyFlowers();


    /* =====================================================
       更新小道消息
       ===================================================== */

    showRumors();


    alert(
        `💐「小道消息 ${
            index + 1
        }」合成成功！`
    );

}


/* =========================================================
   16. HTML 防護
   ========================================================= */

function escapeHTML(
    text
) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   17. Firebase 啟動
   ========================================================= */

/*
   先載入本機資料
*/

initializeFlowers();


/*
   先顯示目前材料
*/

updateMyFlowers();


/*
   再連接 Firebase

   Firebase 登入後會自動：
   ① 判斷目前 Google 帳號
   ② 讀取雲端材料
   ③ 沒有雲端資料時建立資料
   ④ 有資料時載入
   ⑤ 持續同步
*/

initializeFirebase();


/* =========================================================
   18. 確保網頁載入後 UI 存在
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            updateMyFlowers();

            createFirebaseLoginUI();

        }
    );

} else {

    createFirebaseLoginUI();

}/* =========================================================
   19. Firebase 狀態檢查
   ========================================================= */

window.firebaseFlowers = {
    getCurrentUser: function () {
        return firebaseCurrentUser;
    },

    isReady: function () {
        return firebaseReady;
    },

    isLoggedIn: function () {
        return !!firebaseCurrentUser;
    }
};


/* =========================================================
   20. 頁面離開前再保存一次
   ========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        try {

            localStorage.setItem(
                "myFlowers",
                JSON.stringify(myFlowers)
            );

        } catch (error) {

            console.error(
                "離開頁面前保存失敗：",
                error
            );

        }

    }
);


/* =========================================================
   21. 防止數量出現負數
   ========================================================= */

function repairFlowerQuantities() {

    let changed = false;


    Object.keys(myFlowers).forEach(
        key => {

            let value =
                Number(
                    myFlowers[key]
                );


            if (
                !Number.isFinite(value) ||
                value < 0
            ) {

                value = 0;
                changed = true;

            }


            if (
                !Number.isInteger(value)
            ) {

                value =
                    Math.floor(value);

                changed = true;

            }


            myFlowers[key] =
                value;

        }
    );


    if (changed) {

        localStorage.setItem(
            "myFlowers",
            JSON.stringify(myFlowers)
        );

    }

}


/* =========================================================
   22. 最後初始化整理
   ========================================================= */

repairFlowerQuantities();


/* =========================================================
   23. 提供外部按鈕使用的函式
   ========================================================= */

window.searchBouquets =
    searchBouquets;

window.showRumors =
    showRumors;

window.changeQuantity =
    changeQuantity;

window.craftBouquet =
    craftBouquet;

window.craftRumor =
    craftRumor;


/* =========================================================
   24. 完成
   ========================================================= */

/*
   到這裡 script.js 就全部完成。

   功能：

   🌸 花材固定順序
   🌸 每種花 10 種顏色
   ➖➕ 直接修改數量
   💾 localStorage 保存
   ☁️ Firebase Firestore 保存
   🔐 Google 登入
   📱 電腦 / 手機同步
   💐 花束合成自動扣材料
   📰 小道消息合成自動扣材料
   🔄 Firebase 即時同步
*/