/* =========================================================
   GALAXY COIN — app.js
   ========================================================= */

"use strict";

/* =========================================================
   TELEGRAM
   ========================================================= */

const tg =
  window.Telegram &&
  window.Telegram.WebApp
    ? window.Telegram.WebApp
    : null;

if (tg) {
  try {
    tg.ready();
    tg.expand();

    if (tg.setHeaderColor) {
      tg.setHeaderColor("#080817");
    }

    if (tg.setBackgroundColor) {
      tg.setBackgroundColor("#080817");
    }
  } catch (e) {
    console.warn("Telegram WebApp init:", e);
  }
}


/* =========================================================
   FIREBASE CONFIG
   MUHIM:
   O'ZINGNING FIREBASE CONFIGINGNI SHU YERGA QO'YASAN
   ========================================================= */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};


/* =========================================================
   FIREBASE INIT
   ========================================================= */

let db = null;
let firebaseReady = false;

try {
  if (
    typeof firebase !== "undefined" &&
    firebaseConfig.apiKey !== "YOUR_API_KEY"
  ) {
    firebase.initializeApp(firebaseConfig);

    db = firebase.firestore();

    firebaseReady = true;
  }
} catch (error) {
  console.error("Firebase error:", error);
}


/* =========================================================
   CONSTANTS
   ========================================================= */

const STORAGE_KEY = "galaxy_coin_account";
const LANG_KEY = "galaxy_coin_language";

const MAX_ENERGY = 500;
const ENERGY_REGEN_MS = 3000;

const TAP_REWARD = 1;

const ADMIN_USERNAMES = [
  "admin",
  "ff_coder"
];


/* =========================================================
   STATE
   ========================================================= */

const state = {

  language:
    localStorage.getItem(LANG_KEY) || null,

  screen: "lang",

  authTab: "login",

  user: null,

  coins: 0,

  crystals: 0,

  energy: MAX_ENERGY,

  maxEnergy: MAX_ENERGY,

  energyTimer: null,

  taps: 0,

  referralCount: 0,

  tasks: [],

  completedTasks: [],

  devices: [],

  shop: [],

  isAdmin: false,

  loading: false
};


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

  uz: {

    login: "Kirish",
    register: "Ro‘yxatdan o‘tish",

    username: "Username",
    code8: "8 xonali kod",

    yourName: "Ismingiz",

    createCode: "8 xonali kod yarating",

    confirmCode: "Kodni tasdiqlang",

    loginBtn: "Kirish",
    registerBtn: "Ro‘yxatdan o‘tish",

    energy: "Energiya",

    tap: "Bosish",
    shop: "Do‘kon",
    tasks: "Vazifalar",
    settings: "Sozlamalar",

    referral: "Takliflar",
    referralDesc:
      "Do‘stlaringizni taklif qiling va Crystal oling",

    copyLink: "Havolani nusxalash",

    invited: "Taklif qilingan",

    language: "Til",
    connectedDevices: "Ulangan qurilmalar",

    sendCrystals: "Crystal yuborish",

    adminPanel: "Admin panel",

    logout: "Chiqish",

    connected: "Ulangan",

    recipientUsername: "Qabul qiluvchi username",
    amountMin: "Miqdor (min 10)",

    confirm: "Tasdiqlash",

    close: "Yopish",

    loading: "Galaxy yuklanmoqda...",

    chooseLanguage:
      "Tilni tanlang / Выберите язык / Choose your language",

    minUsername:
      "Kamida 5 ta belgi, harf bilan boshlanishi kerak",

    wrongLogin:
      "Username yoki kod noto‘g‘ri.",

    usernameExists:
      "Bu username allaqachon mavjud.",

    codeMismatch:
      "Kodlar bir xil emas.",

    invalidUsername:
      "Username noto‘g‘ri.",

    invalidCode:
      "Kod aynan 8 xonali bo‘lishi kerak.",

    registered:
      "Ro‘yxatdan o‘tish muvaffaqiyatli.",

    copied:
      "Havola nusxalandi.",

    notEnoughCoins:
      "Coin yetarli emas.",

    notEnoughCrystals:
      "Crystal yetarli emas.",

    sent:
      "Crystal yuborildi.",

    minCrystal:
      "Minimum 10 Crystal.",

    userNotFound:
      "Foydalanuvchi topilmadi.",

    taskCompleted:
      "Vazifa bajarildi.",

    taskAlready:
      "Vazifa allaqachon bajarilgan.",

    added:
      "Qo‘shildi.",

    deleted:
      "O‘chirildi."
  },


  en: {

    login: "Login",
    register: "Register",

    username: "Username",
    code8: "8-digit code",

    yourName: "Your name",

    createCode: "Create 8-digit code",

    confirmCode: "Confirm code",

    loginBtn: "Login",
    registerBtn: "Register",

    energy: "Energy",

    tap: "Tap",
    shop: "Shop",
    tasks: "Tasks",
    settings: "Settings",

    referral: "Referral",
    referralDesc:
      "Invite friends and earn crystals",

    copyLink: "Copy link",

    invited: "Invited",

    language: "Language",
    connectedDevices: "Connected devices",

    sendCrystals: "Send crystals",

    adminPanel: "Admin panel",

    logout: "Log out",

    connected: "Connected",

    recipientUsername: "Recipient username",
    amountMin: "Amount (min 10)",

    confirm: "Confirm",

    close: "Close",

    loading: "Loading galaxy...",

    chooseLanguage:
      "Choose your language / Выберите язык / Tilni tanlang",

    minUsername:
      "Min 5 chars, must start with a letter",

    wrongLogin:
      "Username or code is incorrect.",

    usernameExists:
      "This username already exists.",

    codeMismatch:
      "Codes do not match.",

    invalidUsername:
      "Invalid username.",

    invalidCode:
      "Code must contain exactly 8 digits.",

    registered:
      "Registration successful.",

    copied:
      "Link copied.",

    notEnoughCoins:
      "Not enough coins.",

    notEnoughCrystals:
      "Not enough crystals.",

    sent:
      "Crystals sent.",

    minCrystal:
      "Minimum 10 crystals.",

    userNotFound:
      "User not found.",

    taskCompleted:
      "Task completed.",

    taskAlready:
      "Task already completed.",

    added:
      "Added.",

    deleted:
      "Deleted."
  },


  ru: {

    login: "Войти",
    register: "Регистрация",

    username: "Имя пользователя",
    code8: "8-значный код",

    yourName: "Ваше имя",

    createCode: "Создайте 8-значный код",

    confirmCode: "Подтвердите код",

    loginBtn: "Войти",
    registerBtn: "Регистрация",

    energy: "Энергия",

    tap: "Тап",
    shop: "Магазин",
    tasks: "Задания",
    settings: "Настройки",

    referral: "Рефералы",
    referralDesc:
      "Приглашайте друзей и получайте Crystal",

    copyLink: "Копировать ссылку",

    invited: "Приглашено",

    language: "Язык",
    connectedDevices: "Подключённые устройства",

    sendCrystals: "Отправить Crystal",

    adminPanel: "Админ-панель",

    logout: "Выйти",

    connected: "Подключено",

    recipientUsername: "Username получателя",
    amountMin: "Количество (мин. 10)",

    confirm: "Подтвердить",

    close: "Закрыть",

    loading: "Загрузка Galaxy...",

    chooseLanguage:
      "Выберите язык / Choose your language / Tilni tanlang",

    minUsername:
      "Минимум 5 символов, должно начинаться с буквы",

    wrongLogin:
      "Username или код неверный.",

    usernameExists:
      "Этот username уже занят.",

    codeMismatch:
      "Коды не совпадают.",

    invalidUsername:
      "Неверный username.",

    invalidCode:
      "Код должен содержать 8 цифр.",

    registered:
      "Регистрация успешна.",

    copied:
      "Ссылка скопирована.",

    notEnoughCoins:
      "Недостаточно Coin.",

    notEnoughCrystals:
      "Недостаточно Crystal.",

    sent:
      "Crystal отправлен.",

    minCrystal:
      "Минимум 10 Crystal.",

    userNotFound:
      "Пользователь не найден.",

    taskCompleted:
      "Задание выполнено.",

    taskAlready:
      "Задание уже выполнено.",

    added:
      "Добавлено.",

    deleted:
      "Удалено."
  }

};


/* =========================================================
   HELPERS
   ========================================================= */

function $(id) {
  return document.getElementById(id);
}


function t(key) {

  const lang =
    translations[state.language] ||
    translations.uz;

  return lang[key] || key;
}


function normalizeUsername(username) {

  return String(username || "")
    .trim()
    .replace(/^@/, "")
    .toLowerCase();
}


function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function randomId() {

  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substring(2, 8)
  );
}


function showToast(message) {

  const toast = $("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


/* =========================================================
   SCREEN MANAGEMENT
   ========================================================= */

function showScreen(name) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

  const target =
    $("screen-" + name);

  if (!target) return;

  target.classList.add("active");

  state.screen = name;

  window.scrollTo(0, 0);
}


/* =========================================================
   STARS
   ========================================================= */

function createStars() {

  const container = $("stars");

  if (!container) return;

  container.innerHTML = "";

  const count = 90;

  for (let i = 0; i < count; i++) {

    const star =
      document.createElement("span");

    star.style.left =
      Math.random() * 100 + "%";

    star.style.top =
      Math.random() * 100 + "%";

    const size =
      Math.random() > .85 ? 3 : 2;

    star.style.width =
      size + "px";

    star.style.height =
      size + "px";

    star.style.animationDelay =
      Math.random() * 3 + "s";

    star.style.animationDuration =
      2 + Math.random() * 4 + "s";

    container.appendChild(star);
  }
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function selectLanguage(lang) {

  if (!translations[lang]) {
    lang = "uz";
  }

  state.language = lang;

  localStorage.setItem(
    LANG_KEY,
    lang
  );

  updateLanguageUI();

  if (state.user) {

    closeModal("modal-lang");

    showScreen("main");

    updateMainUI();

    return;
  }

  showScreen("auth");
}


function updateLanguageUI() {

  const lang = state.language || "uz";

  document.documentElement.lang = lang;

  const ids = {

    "tab-login": "login",
    "tab-register": "register",

    "lbl-login-username": "username",
    "lbl-login-code": "code8",

    "lbl-reg-name": "yourName",
    "lbl-reg-username": "username",
    "lbl-reg-code": "createCode",
    "lbl-reg-code2": "confirmCode",

    "btn-login": "loginBtn",
    "btn-register": "registerBtn",

    "energy-label-text": "energy",

    "nav-tap-label": "tap",
    "nav-shop-label": "shop",
    "nav-tasks-label": "tasks",
    "nav-settings-label": "settings",

    "shop-title": "shop",
    "tasks-title": "tasks",
    "settings-title": "settings",

    "ref-title": "referral",
    "ref-desc": "referralDesc",

    "ref-copy": "copyLink",

    "lbl-set-lang": "language",
    "lbl-set-devices": "connectedDevices",
    "lbl-set-gift": "sendCrystals",
    "lbl-set-admin": "adminPanel",
    "lbl-set-logout": "logout",

    "modal-devices-title": "connectedDevices",
    "modal-gift-title": "sendCrystals",
    "modal-lang-title": "language",

    "gift-lbl-user": "recipientUsername",
    "gift-lbl-amount": "amountMin",

    "gift-confirm-btn": "confirm",

    "loading-text": "loading"
  };


  Object.entries(ids).forEach(
    ([id, key]) => {

      const el = $(id);

      if (el) {
        el.textContent = t(key);
      }

    }
  );


  const hint =
    $("hint-username");

  if (hint) {
    hint.textContent =
      t("minUsername");
  }


  const langSub =
    $("lang-sub");

  if (langSub) {
    langSub.textContent =
      t("chooseLanguage");
  }


  const current =
    $("cur-lang-val");

  if (current) {

    const names = {
      uz: "O'zbek",
      en: "English",
      ru: "Русский"
    };

    current.innerHTML =
      `${names[lang]} <span class="chevron">›</span>`;
  }


  updateReferralText();
}


/* =========================================================
   AUTH TABS
   ========================================================= */

function setAuthTab(tab) {

  state.authTab = tab;

  document
    .querySelectorAll(".tab")
    .forEach(el => {

      el.classList.toggle(
        "active",
        el.dataset.tab === tab
      );

    });


  document
    .querySelectorAll(".auth-form")
    .forEach(form => {

      form.classList.toggle(
        "active",
        form.id === "form-" + tab
      );

    });


  clearAuthErrors();
}


function clearAuthErrors() {

  const loginError =
    $("err-login");

  const registerError =
    $("err-register");

  if (loginError) {
    loginError.textContent = "";
  }

  if (registerError) {
    registerError.textContent = "";
  }
}


/* =========================================================
   LOCAL STORAGE ACCOUNT
   ========================================================= */

function saveLocalAccount() {

  if (!state.user) return;

  const data = {

    user: state.user,

    coins: state.coins,

    crystals: state.crystals,

    energy: state.energy,

    maxEnergy: state.maxEnergy,

    taps: state.taps,

    referralCount: state.referralCount,

    completedTasks:
      state.completedTasks,

    devices:
      state.devices,

    savedAt: Date.now()
  };


  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}


function loadLocalAccount() {

  try {

    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (!raw) return false;

    const data =
      JSON.parse(raw);

    if (!data || !data.user) {
      return false;
    }

    state.user =
      data.user;

    state.coins =
      Number(data.coins || 0);

    state.crystals =
      Number(data.crystals || 0);

    state.energy =
      Number(
        data.energy ??
        MAX_ENERGY
      );

    state.maxEnergy =
      Number(
        data.maxEnergy ||
        MAX_ENERGY
      );

    state.taps =
      Number(data.taps || 0);

    state.referralCount =
      Number(
        data.referralCount || 0
      );

    state.completedTasks =
      Array.isArray(data.completedTasks)
        ? data.completedTasks
        : [];

    state.devices =
      Array.isArray(data.devices)
        ? data.devices
        : [];

    state.isAdmin =
      isAdminUser();

    return true;

  } catch (error) {

    console.error(
      "Local account error:",
      error
    );

    return false;
  }
}


/* =========================================================
   FIREBASE USER
   ========================================================= */

async function findFirebaseUser(username) {

  if (!firebaseReady || !db) {
    return null;
  }

  try {

    const snapshot =
      await db
        .collection("users")
        .where(
          "username",
          "==",
          normalizeUsername(username)
        )
        .limit(1)
        .get();

    if (snapshot.empty) {
      return null;
    }

    const doc =
      snapshot.docs[0];

    return {
      id: doc.id,
      ...doc.data()
    };

  } catch (error) {

    console.error(
      "Find user:",
      error
    );

    return null;
  }
}


async function saveFirebaseUser() {

  if (!firebaseReady || !db || !state.user) {
    return;
  }

  try {

    const id =
      state.user.firebaseId ||
      state.user.id;

    if (!id) return;

    await db
      .collection("users")
      .doc(id)
      .set(
        {
          ...state.user,

          coins: state.coins,

          crystals: state.crystals,

          energy: state.energy,

          maxEnergy: state.maxEnergy,

          taps: state.taps,

          referralCount:
            state.referralCount,

          completedTasks:
            state.completedTasks,

          updatedAt:
            firebase.firestore.FieldValue.serverTimestamp()
        },
        {
          merge: true
        }
      );

  } catch (error) {

    console.error(
      "Save Firebase:",
      error
    );
  }
}


/* =========================================================
   REGISTER
   ========================================================= */

async function registerUser(event) {

  event.preventDefault();

  const name =
    $("reg-name").value.trim();

  const username =
    normalizeUsername(
      $("reg-username").value
    );

  const code =
    $("reg-code").value.trim();

  const code2 =
    $("reg-code2").value.trim();

  const error =
    $("err-register");

  error.textContent = "";


  if (name.length < 2) {

    error.textContent =
      "Ism kamida 2 ta belgidan iborat bo‘lsin.";

    return;
  }


  if (!/^[a-zA-Z][a-zA-Z0-9_]{4,29}$/.test(username)) {

    error.textContent =
      t("invalidUsername");

    return;
  }


  if (!/^\d{8}$/.test(code)) {

    error.textContent =
      t("invalidCode");

    return;
  }


  if (code !== code2) {

    error.textContent =
      t("codeMismatch");

    return;
  }


  const button =
    $("btn-register");

  button.disabled = true;


  try {

    /* Firebase ishlayotgan bo‘lsa */

    if (firebaseReady) {

      const existing =
        await findFirebaseUser(username);

      if (existing) {

        error.textContent =
          t("usernameExists");

        return;
      }
    }


    /* Telegram ma'lumotlari */

    let telegramUser = null;

    if (
      tg &&
      tg.initDataUnsafe &&
      tg.initDataUnsafe.user
    ) {
      telegramUser =
        tg.initDataUnsafe.user;
    }


    const user = {

      id: randomId(),

      firebaseId: randomId(),

      name: name,

      username: username,

      code: code,

      telegramId:
        telegramUser?.id || null,

      telegramUsername:
        telegramUser?.username || null,

      photoUrl:
        telegramUser?.photo_url || null,

      createdAt:
        Date.now()
    };


    state.user = user;

    state.coins = 0;

    state.crystals = 0;

    state.energy = MAX_ENERGY;

    state.maxEnergy = MAX_ENERGY;

    state.taps = 0;

    state.referralCount = 0;

    state.completedTasks = [];

    state.devices = [

      {
        id: randomId(),
        name: "Current device",
        connectedAt: Date.now()
      }

    ];

    state.isAdmin =
      isAdminUser();


    saveLocalAccount();

    await saveFirebaseUser();


    showToast(t("registered"));

    startLoading();

  } finally {

    button.disabled = false;
  }
}


/* =========================================================
   LOGIN
   ========================================================= */

async function loginUser(event) {

  event.preventDefault();

  const username =
    normalizeUsername(
      $("login-username").value
    );

  const code =
    $("login-code").value.trim();

  const error =
    $("err-login");

  error.textContent = "";


  if (
    !/^[a-zA-Z][a-zA-Z0-9_]{4,29}$/.test(username)
  ) {

    error.textContent =
      t("invalidUsername");

    return;
  }


  if (!/^\d{8}$/.test(code)) {

    error.textContent =
      t("invalidCode");

    return;
  }


  const button =
    $("btn-login");

  button.disabled = true;


  try {

    let account = null;


    /* Firebase */

    if (firebaseReady) {

      account =
        await findFirebaseUser(username);

      if (account) {

        if (
          String(account.code) !==
          String(code)
        ) {

          error.textContent =
            t("wrongLogin");

          return;
        }

      }
    }


    /* Local account */

    if (!account) {

      const localRaw =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (localRaw) {

        try {

          const local =
            JSON.parse(localRaw);

          if (
            normalizeUsername(
              local.user?.username
            ) === username &&
            String(local.user?.code) ===
            String(code)
          ) {

            account = {

              ...local,

              ...local.user,

              user: local.user
            };
          }

        } catch (e) {}
      }
    }


    if (!account) {

      error.textContent =
        t("wrongLogin");

      return;
    }


    /* Restore */

    if (account.user) {

      state.user =
        account.user;

      state.coins =
        Number(account.coins || 0);

      state.crystals =
        Number(account.crystals || 0);

      state.energy =
        Number(
          account.energy ??
          MAX_ENERGY
        );

      state.maxEnergy =
        Number(
          account.maxEnergy ||
          MAX_ENERGY
        );

      state.taps =
        Number(account.taps || 0);

      state.referralCount =
        Number(
          account.referralCount || 0
        );

      state.completedTasks =
        Array.isArray(
          account.completedTasks
        )
          ? account.completedTasks
          : [];

      state.devices =
        Array.isArray(account.devices)
          ? account.devices
          : [];
    }


    state.isAdmin =
      isAdminUser();


    saveLocalAccount();

    startLoading();

  } finally {

    button.disabled = false;
  }
}


/* =========================================================
   LOADING
   ========================================================= */

function startLoading() {

  state.loading = true;

  showScreen("loading");

  const loadingText =
    $("loading-text");

  if (loadingText) {
    loadingText.textContent =
      t("loading");
  }


  setTimeout(async () => {

    await loadTasks();

    await loadShop();

    updateMainUI();

    updateReferralUI();

    updateDevicesUI();

    updateAdminUI();

    startEnergyRegeneration();

    state.loading = false;

    showScreen("main");

  }, 700);
}


/* =========================================================
   ADMIN
   ========================================================= */

function isAdminUser() {

  if (!state.user) {
    return false;
  }

  const username =
    normalizeUsername(
      state.user.username
    );

  return ADMIN_USERNAMES.includes(
    username
  );
}


function updateAdminUI() {

  const row =
    $("row-admin");

  if (!row) return;

  row.style.display =
    state.isAdmin
      ? "flex"
      : "none";
}


/* =========================================================
   MAIN UI
   ========================================================= */

function updateMainUI() {

  if (!state.user) return;


  const name =
    $("main-name");

  const handle =
    $("main-handle");

  const coins =
    $("main-coins");

  const crystals =
    $("main-crystals");


  if (name) {
    name.textContent =
      state.user.name ||
      state.user.username;
  }


  if (handle) {

    handle.textContent =
      "@" +
      (
        state.user.username ||
        "user"
      );
  }


  if (coins) {
    coins.textContent =
      formatNumber(state.coins);
  }


  if (crystals) {
    crystals.textContent =
      formatNumber(state.crystals);
  }


  updateEnergyUI();

  updateLanguageUI();

  updateAdminUI();
}


function formatNumber(number) {

  return Number(number || 0)
    .toLocaleString(
      state.language === "ru"
        ? "ru-RU"
        : "en-US"
    );
}


/* =========================================================
   ENERGY
   ========================================================= */

function updateEnergyUI() {

  const count =
    $("energy-count");

  const fill =
    $("energy-fill");


  const max =
    state.maxEnergy || MAX_ENERGY;

  const current =
    Math.max(
      0,
      Math.min(
        state.energy,
        max
      )
    );


  if (count) {

    count.textContent =
      `${current}/${max}`;
  }


  if (fill) {

    fill.style.width =
      `${(current / max) * 100}%`;
  }
}


function startEnergyRegeneration() {

  clearInterval(
    state.energyTimer
  );


  state.energyTimer =
    setInterval(() => {

      if (
        state.energy <
        state.maxEnergy
      ) {

        state.energy++;

        updateEnergyUI();

        saveLocalAccount();

      }

    }, ENERGY_REGEN_MS);
}


/* =========================================================
   TAP
   ========================================================= */

function tapPlanet(event) {

  if (!state.user) return;


  if (state.energy <= 0) {

    showToast(
      state.language === "uz"
        ? "Energiya tugadi."
        : state.language === "ru"
          ? "Энергия закончилась."
          : "No energy."
    );

    return;
  }


  state.energy -= 1;

  state.coins += TAP_REWARD;

  state.taps += 1;


  updateMainUI();

  saveLocalAccount();

  saveFirebaseUser();


  createFloatPlus(
    event,
    TAP_REWARD
  );


  hapticTap();
}


function createFloatPlus(event, amount) {

  const stage =
    $("tap-stage");

  if (!stage) return;


  const element =
    document.createElement("div");

  element.className =
    "float-plus";

  element.textContent =
    "+" + amount;


  const rect =
    stage.getBoundingClientRect();


  let x =
    event?.clientX ??
    rect.left +
    rect.width / 2;

  let y =
    event?.clientY ??
    rect.top +
    rect.height / 2;


  x -= rect.left;

  y -= rect.top;


  element.style.left =
    `${x}px`;

  element.style.top =
    `${y}px`;


  stage.appendChild(element);


  setTimeout(() => {

    element.remove();

  }, 850);
}


function hapticTap() {

  try {

    if (
      tg &&
      tg.HapticFeedback
    ) {

      tg.HapticFeedback
        .impactOccurred("light");
    }

  } catch (e) {}
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function openNav(name) {

  if (!state.user) {
    showScreen("auth");
    return;
  }


  if (name === "tap") {

    showScreen("main");

  } else if (name === "shop") {

    renderShop();

    showScreen("shop");

  } else if (name === "tasks") {

    renderTasks();

    updateReferralUI();

    showScreen("tasks");

  } else if (name === "settings") {

    showScreen("settings");
  }


  updateNav(name);
}


function updateNav(active) {

  document
    .querySelectorAll(".nav-btn")
    .forEach(btn => {

      btn.classList.toggle(
        "active",
        btn.dataset.nav === active
      );

    });
}


/* =========================================================
   SHOP
   ========================================================= */

const defaultShop = [

  {
    id: "energy",
    name: "⚡ Energy",
    desc: "Increase maximum energy.",
    level: 1,
    coinPrice: 500,
    crystalPrice: 5
  },

  {
    id: "multiplier",
    name: "🔥 Tap Power",
    desc: "Increase reward per tap.",
    level: 1,
    coinPrice: 1000,
    crystalPrice: 10
  },

  {
    id: "storage",
    name: "📦 Energy Storage",
    desc: "Increase maximum energy capacity.",
    level: 1,
    coinPrice: 2500,
    crystalPrice: 20
  }

];


async function loadShop() {

  state.shop = [
    ...defaultShop
  ];


  if (!firebaseReady || !db) {
    return;
  }


  try {

    const snapshot =
      await db
        .collection("shop")
        .get();


    if (!snapshot.empty) {

      state.shop =
        snapshot.docs.map(
          doc => ({
            id: doc.id,
            ...doc.data()
          })
        );
    }

  } catch (error) {

    console.warn(
      "Shop loading:",
      error
    );
  }
}


function renderShop() {

  const container =
    $("shop-items");

  if (!container) return;

  container.innerHTML = "";


  state.shop.forEach(item => {

    const card =
      document.createElement("div");

    card.className = "card";


    card.innerHTML = `

      <div class="shop-item">

        <div class="shop-item-top">

          <div class="shop-item-name">
            ${escapeHTML(item.name)}
          </div>

          <div class="shop-item-level">
            Lv.${Number(item.level || 1)}
          </div>

        </div>

        <div class="shop-item-desc">
          ${escapeHTML(item.desc || "")}
        </div>

        <div class="buy-row">

          <button
            type="button"
            class="buy-btn coin"
            data-buy-type="coin"
            data-shop-id="${escapeHTML(item.id)}"
          >
            🪙 ${formatNumber(item.coinPrice || 0)}
          </button>

          <button
            type="button"
            class="buy-btn crystal"
            data-buy-type="crystal"
            data-shop-id="${escapeHTML(item.id)}"
          >
            💎 ${formatNumber(item.crystalPrice || 0)}
          </button>

        </div>

      </div>

    `;


    container.appendChild(card);
  });
}


function buyShopItem(id, type) {

  const item =
    state.shop.find(
      x => x.id === id
    );

  if (!item) return;


  const price =
    type === "coin"
      ? Number(item.coinPrice || 0)
      : Number(item.crystalPrice || 0);


  if (type === "coin") {

    if (state.coins < price) {

      showToast(
        t("notEnoughCoins")
      );

      return;
    }

    state.coins -= price;

  } else {

    if (state.crystals < price) {

      showToast(
        t("notEnoughCrystals")
      );

      return;
    }

    state.crystals -= price;
  }


  applyShopUpgrade(item);


  updateMainUI();

  saveLocalAccount();

  saveFirebaseUser();


  showToast(
    state.language === "uz"
      ? "Xarid qilindi."
      : state.language === "ru"
        ? "Покупка выполнена."
        : "Purchase successful."
  );
}


function applyShopUpgrade(item) {

  if (item.id === "energy") {

    state.maxEnergy += 100;

    state.energy =
      Math.min(
        state.energy + 100,
        state.maxEnergy
      );
  }


  if (item.id === "storage") {

    state.maxEnergy += 250;
  }


  if (item.id === "multiplier") {

    state.user.tapPower =
      Number(
        state.user.tapPower || 1
      ) + 1;
  }
}


/* =========================================================
   TASKS
   ========================================================= */

async function loadTasks() {

  state.tasks = [];


  if (!firebaseReady || !db) {

    renderTasks();

    return;
  }


  try {

    const snapshot =
      await db
        .collection("tasks")
        .where(
          "active",
          "==",
          true
        )
        .get();


    state.tasks =
      snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      );

  } catch (error) {

    console.warn(
      "Tasks loading:",
      error
    );
  }


  renderTasks();
}


function renderTasks() {

  const container =
    $("task-list");

  if (!container) return;

  container.innerHTML = "";


  if (!state.tasks.length) {

    const empty =
      document.createElement("div");

    empty.className = "card";

    empty.innerHTML = `
      <div class="settings-value">
        ${state.language === "uz"
          ? "Hozircha vazifalar yo‘q."
          : state.language === "ru"
            ? "Пока заданий нет."
            : "No tasks yet."}
      </div>
    `;

    container.appendChild(empty);

    return;
  }


  state.tasks.forEach(task => {

    const completed =
      state.completedTasks.includes(
        task.id
      );


    const card =
      document.createElement("div");

    card.className = "card";


    card.innerHTML = `

      <div class="task-item">

        <div class="task-info">

          <div class="task-name">
            ${escapeHTML(
              task.title ||
              task.name ||
              "Task"
            )}
          </div>

          <div class="task-reward">
            💎 +${formatNumber(
              task.reward || 0
            )}
          </div>

        </div>

        <button
          type="button"
          class="task-btn ${completed ? "done" : ""}"
          data-task-id="${escapeHTML(task.id)}"
          ${completed ? "disabled" : ""}
        >
          ${
            completed
              ? "✓"
              : state.language === "uz"
                ? "Bajarish"
                : state.language === "ru"
                  ? "Выполнить"
                  : "Complete"
          }
        </button>

      </div>

    `;


    container.appendChild(card);
  });
}


async function completeTask(id) {

  if (
    state.completedTasks.includes(id)
  ) {

    showToast(
      t("taskAlready")
    );

    return;
  }


  const task =
    state.tasks.find(
      x => x.id === id
    );

  if (!task) return;


  /*
    Bu frontend demo tekshiruvi.

    Haqiqiy Telegram kanal obunasini
    xavfsiz tekshirish uchun backend/bot kerak.
  */

  state.crystals +=
    Number(task.reward || 0);


  state.completedTasks.push(id);


  updateMainUI();

  renderTasks();

  saveLocalAccount();

  await saveFirebaseUser();


  showToast(
    t("taskCompleted")
  );
}


/* =========================================================
   REFERRAL
   ========================================================= */

function getTelegramStartParam() {

  if (
    tg &&
    tg.initDataUnsafe
  ) {

    return (
      tg.initDataUnsafe
        .start_param ||
      ""
    );
  }

  return "";
}


function getReferralLink() {

  const botUsername =
    "GalaxyCoinBot";

  const userId =
    state.user?.id ||
    "user";


  return (
    `https://t.me/${botUsername}?start=${userId}`
  );
}


function updateReferralText() {

  const title =
    $("ref-title");

  const desc =
    $("ref-desc");


  if (title) {
    title.textContent =
      "👥 " + t("referral");
  }

  if (desc) {
    desc.textContent =
      t("referralDesc");
  }
}


function updateReferralUI() {

  const link =
    $("ref-link");

  const count =
    $("ref-count");


  if (link) {

    link.textContent =
      getReferralLink();
  }


  if (count) {

    count.textContent =
      `${t("invited")}: ${state.referralCount}`;
  }


  updateReferralText();
}


async function copyReferralLink() {

  const link =
    getReferralLink();


  try {

    await navigator.clipboard.writeText(
      link
    );

  } catch (error) {

    const textarea =
      document.createElement("textarea");

    textarea.value = link;

    document.body.appendChild(
      textarea
    );

    textarea.select();

    document.execCommand(
      "copy"
    );

    textarea.remove();
  }


  showToast(
    t("copied")
  );
}


/* =========================================================
   SETTINGS
   ========================================================= */

function openSettingsLanguage() {

  openModal("modal-lang");
}


function openDevices() {

  updateDevicesUI();

  openModal("modal-devices");
}


function updateDevicesUI() {

  const container =
    $("devices-list");

  if (!container) return;

  container.innerHTML = "";


  if (!state.devices.length) {

    container.innerHTML = `
      <div class="settings-value">
        ${t("connected")}
      </div>
    `;

    return;
  }


  state.devices.forEach(device => {

    const item =
      document.createElement("div");

    item.className =
      "device-item";


    const date =
      device.connectedAt
        ? new Date(
            device.connectedAt
          ).toLocaleDateString()
        : "";


    item.innerHTML = `

      <div>

        <div>
          ${escapeHTML(
            device.name ||
            "Device"
          )}
        </div>

        <div
          style="
            color:var(--muted);
            margin-top:3px;
            font-size:10px;
          "
        >
          ${escapeHTML(date)}
        </div>

      </div>

      <div
        class="remove-device"
        data-device-id="${escapeHTML(device.id)}"
      >
        ${state.language === "uz"
          ? "O‘chirish"
          : state.language === "ru"
            ? "Удалить"
            : "Remove"}
      </div>

    `;


    container.appendChild(item);
  });
}


function removeDevice(id) {

  if (state.devices.length <= 1) {

    showToast(
      state.language === "uz"
        ? "Oxirgi qurilmani o‘chirib bo‘lmaydi."
        : state.language === "ru"
          ? "Нельзя удалить последнее устройство."
          : "You cannot remove the last device."
    );

    return;
  }


  state.devices =
    state.devices.filter(
      device =>
        device.id !== id
    );


  saveLocalAccount();

  saveFirebaseUser();

  updateDevicesUI();
}


/* =========================================================
   GIFT
   ========================================================= */

async function sendCrystals() {

  const username =
    normalizeUsername(
      $("gift-username").value
    );

  const amount =
    Number(
      $("gift-amount").value
    );


  const error =
    $("gift-err");

  error.textContent = "";


  if (!username) {

    error.textContent =
      t("invalidUsername");

    return;
  }


  if (
    !Number.isFinite(amount) ||
    amount < 10
  ) {

    error.textContent =
      t("minCrystal");

    return;
  }


  if (state.crystals < amount) {

    error.textContent =
      t("notEnoughCrystals");

    return;
  }


  let recipient = null;


  if (firebaseReady) {

    recipient =
      await findFirebaseUser(
        username
      );
  }


  /*
    Firebase bo'lmasa,
    lokal foydalanuvchini ham qidiramiz.
  */

  if (
    !recipient &&
    state.user &&
    normalizeUsername(
      state.user.username
    ) === username
  ) {

    recipient = {
      id: state.user.id,
      ...state.user
    };
  }


  if (!recipient) {

    error.textContent =
      t("userNotFound");

    return;
  }


  if (
    normalizeUsername(
      state.user.username
    ) === username
  ) {

    error.textContent =
      state.language === "uz"
        ? "O‘zingizga yubora olmaysiz."
        : state.language === "ru"
          ? "Нельзя отправить себе."
          : "You cannot send crystals to yourself.";

    return;
  }


  state.crystals -= amount;


  /*
    Agar Firebase bo'lsa,
    qabul qiluvchining Crystal balansini
    oshiramiz.
  */

  if (
    firebaseReady &&
    db &&
    recipient.id
  ) {

    try {

      await db
        .collection("users")
        .doc(recipient.id)
        .set(
          {
            crystals:
              firebase.firestore.FieldValue
                .increment(amount)
          },
          {
            merge: true
          }
        );

    } catch (error) {

      console.error(
        "Gift error:",
        error
      );

      state.crystals += amount;

      error.textContent =
        "Transfer error.";

      return;
    }
  }


  saveLocalAccount();

  await saveFirebaseUser();

  updateMainUI();


  const receipt =
    $("gift-receipt-wrap");

  if (receipt) {

    receipt.innerHTML = `

      <div class="receipt">

        <div class="receipt-row">
          <span>User</span>
          <b>@${escapeHTML(username)}</b>
        </div>

        <div class="receipt-row">
          <span>Crystal</span>
          <b>💎 ${formatNumber(amount)}</b>
        </div>

        <div class="receipt-row">
          <span>Status</span>
          <b style="color:var(--green)">
            ✓
          </b>
        </div>

      </div>

    `;
  }


  showToast(
    t("sent")
  );
}


/* =========================================================
   ADMIN TASKS
   ========================================================= */

async function adminAddTask() {

  if (!state.isAdmin) return;


  const title =
    $("ad-task-title").value.trim();

  const channel =
    normalizeUsername(
      $("ad-task-channel").value
    );

  const reward =
    Number(
      $("ad-task-reward").value
    );

  const type =
    $("ad-task-type").value;


  if (!title) {

    showToast(
      "Task title required."
    );

    return;
  }


  if (!channel) {

    showToast(
      "Channel required."
    );

    return;
  }


  if (
    !Number.isFinite(reward) ||
    reward <= 0
  ) {

    showToast(
      "Invalid reward."
    );

    return;
  }


  const task = {

    title,

    channel,

    reward,

    type,

    active: true,

    createdAt: Date.now()
  };


  if (
    firebaseReady &&
    db
  ) {

    try {

      const ref =
        await db
          .collection("tasks")
          .add(task);

      task.id =
        ref.id;

    } catch (error) {

      console.error(
        "Add task:",
        error
      );

      showToast(
        "Firebase error."
      );

      return;
    }
  } else {

    task.id =
      randomId();
  }


  state.tasks.push(task);


  $("ad-task-title").value = "";
  $("ad-task-channel").value = "";
  $("ad-task-reward").value = "";


  renderTasks();

  renderAdminTasks();

  showToast(
    t("added")
  );
}


function renderAdminTasks() {

  const container =
    $("ad-task-list");

  if (!container) return;

  container.innerHTML = "";


  if (!state.tasks.length) {

    container.innerHTML = `
      <div class="small-note">
        No tasks.
      </div>
    `;

    return;
  }


  state.tasks.forEach(task => {

    const row =
      document.createElement("div");

    row.style.cssText = `
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      padding:10px 0;
      border-bottom:1px solid var(--border);
    `;


    row.innerHTML = `

      <div style="min-width:0;">

        <div
          style="
            font-size:13px;
            font-weight:700;
          "
        >
          ${escapeHTML(
            task.title || "Task"
          )}
        </div>

        <div
          style="
            color:var(--cyan);
            font-size:11px;
            margin-top:3px;
          "
        >
          💎 ${formatNumber(
            task.reward || 0
          )}
        </div>

      </div>

      <button
        type="button"
        data-delete-task="${escapeHTML(task.id)}"
        style="
          flex-shrink:0;
          color:var(--red);
          background:transparent;
          font-weight:700;
          font-size:11px;
          cursor:pointer;
        "
      >
        Delete
      </button>

    `;


    container.appendChild(row);
  });
}


async function deleteTask(id) {

  if (!state.isAdmin) return;


  if (
    firebaseReady &&
    db
  ) {

    try {

      await db
        .collection("tasks")
        .doc(id)
        .set(
          {
            active: false
          },
          {
            merge: true
          }
        );

    } catch (error) {

      console.error(
        "Delete task:",
        error
      );

      return;
    }
  }


  state.tasks =
    state.tasks.filter(
      task =>
        task.id !== id
    );


  renderTasks();

  renderAdminTasks();

  showToast(
    t("deleted")
  );
}


/* =========================================================
   ADMIN GIVE CURRENCY
   ========================================================= */

async function adminGiveCurrency() {

  if (!state.isAdmin) return;


  const username =
    normalizeUsername(
      $("ad-give-username").value
    );

  const coins =
    Number(
      $("ad-give-coins").value || 0
    );

  const crystals =
    Number(
      $("ad-give-crystals").value || 0
    );


  const error =
    $("ad-give-err");

  error.textContent = "";


  if (!username) {

    error.textContent =
      t("invalidUsername");

    return;
  }


  if (
    coins < 0 ||
    crystals < 0
  ) {

    error.textContent =
      "Invalid amount.";

    return;
  }


  if (
    coins === 0 &&
    crystals === 0
  ) {

    error.textContent =
      "Enter amount.";

    return;
  }


  if (!firebaseReady || !db) {

    error.textContent =
      "Firebase required.";

    return;
  }


  const user =
    await findFirebaseUser(
      username
    );


  if (!user) {

    error.textContent =
      t("userNotFound");

    return;
  }


  try {

    await db
      .collection("users")
      .doc(user.id)
      .set(
        {
          coins:
            firebase.firestore.FieldValue
              .increment(coins),

          crystals:
            firebase.firestore.FieldValue
              .increment(crystals)
        },
        {
          merge: true
        }
      );


    $("ad-give-username").value = "";
    $("ad-give-coins").value = "";
    $("ad-give-crystals").value = "";


    showToast(
      t("sent")
    );

  } catch (err) {

    console.error(
      err
    );

    error.textContent =
      "Firebase error.";
  }
}


/* =========================================================
   ADMIN LOOKUP
   ========================================================= */

async function adminLookupUser() {

  if (!state.isAdmin) return;


  const username =
    normalizeUsername(
      $("ad-lookup-username").value
    );


  const result =
    $("ad-lookup-result");


  if (!username) {

    result.innerHTML = `
      <div class="err">
        ${t("invalidUsername")}
      </div>
    `;

    return;
  }


  const user =
    await findFirebaseUser(
      username
    );


  if (!user) {

    result.innerHTML = `
      <div class="err">
        ${t("userNotFound")}
      </div>
    `;

    return;
  }


  result.innerHTML = `

    <div class="receipt">

      <div class="receipt-row">
        <span>Name</span>
        <b>
          ${escapeHTML(
            user.name || "—"
          )}
        </b>
      </div>

      <div class="receipt-row">
        <span>Username</span>
        <b>
          @${escapeHTML(
            user.username || "—"
          )}
        </b>
      </div>

      <div class="receipt-row">
        <span>Coins</span>
        <b>
          🪙 ${formatNumber(
            user.coins || 0
          )}
        </b>
      </div>

      <div class="receipt-row">
        <span>Crystal</span>
        <b>
          💎 ${formatNumber(
            user.crystals || 0
          )}
        </b>
      </div>

    </div>

  `;
}


/* =========================================================
   MODALS
   ========================================================= */

function openModal(id) {

  const modal =
    $(id);

  if (!modal) return;

  modal.classList.add(
    "active"
  );
}


function closeModal(id) {

  const modal =
    $(id);

  if (!modal) return;

  modal.classList.remove(
    "active"
  );
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

  clearInterval(
    state.energyTimer
  );


  localStorage.removeItem(
    STORAGE_KEY
  );


  state.user = null;

  state.coins = 0;

  state.crystals = 0;

  state.energy = MAX_ENERGY;

  state.taps = 0;

  state.referralCount = 0;

  state.completedTasks = [];

  state.devices = [];

  state.isAdmin = false;


  updateMainUI();

  showScreen("auth");

  setAuthTab("login");
}


/* =========================================================
   TELEGRAM USER AUTO LOGIN
   ========================================================= */

async function tryTelegramUser() {

  if (
    !tg ||
    !tg.initDataUnsafe ||
    !tg.initDataUnsafe.user
  ) {
    return false;
  }


  const telegramUser =
    tg.initDataUnsafe.user;


  /*
    Telegram username mavjud bo‘lsa,
    mavjud Firebase userni topishga uriniladi.
  */

  if (
    firebaseReady &&
    telegramUser.username
  ) {

    const existing =
      await findFirebaseUser(
        telegramUser.username
      );


    if (existing) {

      state.user = {

        ...existing,

        firebaseId:
          existing.id
      };


      state.coins =
        Number(existing.coins || 0);

      state.crystals =
        Number(
          existing.crystals || 0
        );

      state.energy =
        Number(
          existing.energy ??
          MAX_ENERGY
        );

      state.maxEnergy =
        Number(
          existing.maxEnergy ||
          MAX_ENERGY
        );

      state.taps =
        Number(
          existing.taps || 0
        );

      state.referralCount =
        Number(
          existing.referralCount || 0
        );

      state.completedTasks =
        Array.isArray(
          existing.completedTasks
        )
          ? existing.completedTasks
          : [];

      state.devices =
        Array.isArray(
          existing.devices
        )
          ? existing.devices
          : [];


      state.isAdmin =
        isAdminUser();


      saveLocalAccount();

      return true;
    }
  }


  return false;
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  createStars();

  /* Til tanlash */
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      selectLanguage(lang);
    });
  });

  /* Sozlamalardagi til */
  document.querySelectorAll("[data-lang-switch]").forEach(button => {
    button.addEventListener("click", () => {
      const lang = button.dataset.langSwitch;
      selectLanguage(lang);
    });
  });

  /* Login / Register tab */
  document.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => {
      setAuthTab(button.dataset.tab);
    });
  });

  /* Login */
  const loginForm = $("form-login");

  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  }

  /* Register */
  const registerForm = $("form-register");

  if (registerForm) {
    registerForm.addEventListener("submit", registerUser);
  }

  /* Main tap */
  const planet = $("planet-btn");

  if (planet) {
    planet.addEventListener("click", tapPlanet);
  }

  /* Bottom navigation */
  document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", () => {
      openNav(button.dataset.nav);
    });
  });

  /* Back buttons */
  document.querySelectorAll("[data-back]").forEach(button => {
    button.addEventListener("click", () => {
      openNav(button.dataset.back);
    });
  });

  /* Shop */
  document.addEventListener("click", event => {

    const buyButton =
      event.target.closest("[data-buy-type]");

    if (buyButton) {
      buyShopItem(
        buyButton.dataset.shopId,
        buyButton.dataset.buyType
      );
    }

  });

  /* Tasks */
  document.addEventListener("click", event => {

    const taskButton =
      event.target.closest("[data-task-id]");

    if (taskButton) {
      completeTask(
        taskButton.dataset.taskId
      );
    }

  });

  /* Referral copy */
  const refCopy = $("ref-copy");

  if (refCopy) {
    refCopy.addEventListener(
      "click",
      copyReferralLink
    );
  }

  /* Settings */
  const languageRow = $("row-language");

  if (languageRow) {
    languageRow.addEventListener(
      "click",
      openSettingsLanguage
    );
  }

  const devicesRow = $("row-devices");

  if (devicesRow) {
    devicesRow.addEventListener(
      "click",
      openDevices
    );
  }

  const giftRow = $("row-gift");

  if (giftRow) {
    giftRow.addEventListener("click", () => {
      openModal("modal-gift");
    });
  }

  const adminRow = $("row-admin");

  if (adminRow) {
    adminRow.addEventListener("click", () => {
      renderAdminTasks();
      showScreen("admin");
    });
  }

  const logoutRow = $("row-logout");

  if (logoutRow) {
    logoutRow.addEventListener(
      "click",
      logout
    );
  }

  /* Gift */
  const giftButton = $("gift-confirm-btn");

  if (giftButton) {
    giftButton.addEventListener(
      "click",
      sendCrystals
    );
  }

  /* Admin */
  const addTaskButton =
    $("ad-add-task-btn");

  if (addTaskButton) {
    addTaskButton.addEventListener(
      "click",
      adminAddTask
    );
  }

  const giveButton =
    $("ad-give-btn");

  if (giveButton) {
    giveButton.addEventListener(
      "click",
      adminGiveCurrency
    );
  }

  const lookupButton =
    $("ad-lookup-btn");

  if (lookupButton) {
    lookupButton.addEventListener(
      "click",
      adminLookupUser
    );
  }

  /* Delete task */
  document.addEventListener("click", event => {

    const button =
      event.target.closest("[data-delete-task]");

    if (button) {
      deleteTask(
        button.dataset.deleteTask
      );
    }

  });

  /* Device remove */
  document.addEventListener("click", event => {

    const button =
      event.target.closest("[data-device-id]");

    if (button) {
      removeDevice(
        button.dataset.deviceId
      );
    }

  });

  /* Modal close */
  document.querySelectorAll("[data-close]").forEach(button => {

    button.addEventListener("click", () => {
      closeModal(button.dataset.close);
    });

  });

  /* Modal tashqarisini bosish */
  document.querySelectorAll(".modal-overlay").forEach(modal => {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        modal.classList.remove("active");
      }

    });

  });


  /* Boshlang'ich holat */

  if (state.language) {

    updateLanguageUI();

    if (loadLocalAccount()) {

      updateMainUI();
      updateReferralUI();
      updateDevicesUI();
      updateAdminUI();

      startLoading();

    } else {

      showScreen("auth");

    }

  } else {

    showScreen("lang");

  }

});
