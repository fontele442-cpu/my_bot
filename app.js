/* =========================================================
   GALAXY COIN — Telegram Mini App
   AUTO ENTRY VERSION
   Login / Register / 8-digit code removed
   ========================================================= */

/* ---------- 1. FIREBASE CONFIG ---------- */

const firebaseConfig = {
  apiKey: "AIzaSyAJwKitDkBKyLwomYAeoceQIYaSquefxSc",
  authDomain: "galaxy-coin-4cde5.firebaseapp.com",
  projectId: "galaxy-coin-4cde5",
  storageBucket: "galaxy-coin-4cde5.firebasestorage.app",
  messagingSenderId: "677981465978",
  appId: "1:677981465978:web:738b96c89f85047672bac3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* Bot server */
const BOT_SERVER_URL = "";

/* Telegram Bot */
const BOT_USERNAME = "Tap_galaxycoinbot";
const APP_SHORT_NAME = "Galaxy";

/* ---------- 2. TRANSLATIONS ---------- */

const LANG = {

en:{
  chooseLang:"Choose your language",

  loading:"Loading galaxy...",
  energy:"Energy",

  navTap:"Tap",
  navShop:"Shop",
  navTasks:"Tasks",
  navSettings:"Settings",

  shopTitle:"Shop",
  tapPower:"Tap power",
  maxEnergy:"Max energy",
  energyRegen:"Energy regen",

  tapPowerDesc:"Coins earned per tap",
  maxEnergyDesc:"Maximum energy capacity",
  energyRegenDesc:"Energy restored per second",

  level:"Level",
  current:"current",

  buyCoin:"Coins",
  buyCrystal:"Crystals",

  refillEnergy:"Refill energy",
  refillDesc:"Instantly restore full energy",

  tasksTitle:"Tasks",

  refTitle:"👥 Referral",
  refDesc:"Invite friends: you get 100💎, your friend gets 50💎",

  copyLink:"Copy link",
  linkCopied:"Link copied!",

  invited:"Invited",

  join:"Join",
  check:"Check",
  done:"Done ✓",

  settingsTitle:"Settings",
  language:"Language",
  devices:"Connected devices",
  sendGift:"Send crystals",
  adminPanel:"Admin panel",
  logout:"Log out",

  giftUser:"Recipient username",
  giftAmount:"Amount (min 10)",

  giftMin:"Minimum amount is 10",
  giftNotFound:"User not found",
  giftInsufficient:"Not enough crystals",
  giftSelf:"You can't send to yourself",

  giftConfirm:"Confirm",
  giftSuccessTitle:"Sent successfully",

  receiptFrom:"From",
  receiptTo:"To",
  receiptAmount:"Amount",
  receiptTime:"Time",

  noDevices:"No other devices connected",
  removeDevice:"Remove",

  toastLoggedOut:"Logged out",
  toastSaved:"Saved",
  toastNotEnough:"Not enough balance",
  toastBought:"Purchased!",
  toastTaskDone:"Reward received!",
  toastNotSubscribed:"You haven't joined the channel yet",

  adminAddTask:"Add task",
  adminGive:"Give currency to user",
  adminLookup:"Look up user",

  taskTitle:"Task title",
  channelUser:"Channel username (without @)",
  reward:"Reward (crystals)",

  taskType:"Type",
  typeChannel:"Mandatory channel subscription",
  typeAd:"Advertisement / other task",

  send:"Send",
  lookup:"Look up",

  userNotFound:"User not found"
},

ru:{
  chooseLang:"Выберите язык",

  loading:"Загрузка галактики...",
  energy:"Энергия",

  navTap:"Тап",
  navShop:"Магазин",
  navTasks:"Задания",
  navSettings:"Настройки",

  shopTitle:"Магазин",
  tapPower:"Сила тапа",
  maxEnergy:"Макс. энергия",
  energyRegen:"Восст. энергии",

  tapPowerDesc:"Монет за один тап",
  maxEnergyDesc:"Максимальный запас энергии",
  energyRegenDesc:"Энергии в секунду",

  level:"Уровень",
  current:"текущий",

  buyCoin:"Монеты",
  buyCrystal:"Кристаллы",

  refillEnergy:"Восполнить энергию",
  refillDesc:"Мгновенно восстановить всю энергию",

  tasksTitle:"Задания",

  refTitle:"👥 Реферал",
  refDesc:"Приглашай друзей: тебе 100💎, другу 50💎",

  copyLink:"Копировать ссылку",
  linkCopied:"Ссылка скопирована!",

  invited:"Приглашено",

  join:"Подписаться",
  check:"Проверить",
  done:"Готово ✓",

  settingsTitle:"Настройки",
  language:"Язык",
  devices:"Подключённые устройства",
  sendGift:"Отправить кристаллы",
  adminPanel:"Админ-панель",
  logout:"Выйти",

  giftUser:"Юзернейм получателя",
  giftAmount:"Сумма (мин. 10)",

  giftMin:"Минимальная сумма — 10",
  giftNotFound:"Пользователь не найден",
  giftInsufficient:"Недостаточно кристаллов",
  giftSelf:"Нельзя отправить самому себе",

  giftConfirm:"Подтвердить",
  giftSuccessTitle:"Успешно отправлено",

  receiptFrom:"От",
  receiptTo:"Кому",
  receiptAmount:"Сумма",
  receiptTime:"Время",

  noDevices:"Другие устройства не подключены",
  removeDevice:"Удалить",

  toastLoggedOut:"Вы вышли",
  toastSaved:"Сохранено",
  toastNotEnough:"Недостаточно баланса",
  toastBought:"Куплено!",
  toastTaskDone:"Награда получена!",
  toastNotSubscribed:"Вы ещё не подписались на канал",

  adminAddTask:"Добавить задание",
  adminGive:"Начислить пользователю",
  adminLookup:"Найти пользователя",

  taskTitle:"Название задания",
  channelUser:"Юзернейм канала (без @)",
  reward:"Награда (кристаллы)",

  taskType:"Тип",
  typeChannel:"Обязательная подписка на канал",
  typeAd:"Реклама / другое задание",

  send:"Отправить",
  lookup:"Найти",

  userNotFound:"Пользователь не найден"
},

uz:{
  chooseLang:"Tilni tanlang",

  loading:"Galaktika yuklanmoqda...",
  energy:"Energiya",

  navTap:"Bosish",
  navShop:"Do'kon",
  navTasks:"Vazifalar",
  navSettings:"Parametr",

  shopTitle:"Do'kon",
  tapPower:"Bosish kuchi",
  maxEnergy:"Maks. energiya",
  energyRegen:"Energiya tiklash",

  tapPowerDesc:"Har bosishda olinadigan coin",
  maxEnergyDesc:"Maksimal energiya sig'imi",
  energyRegenDesc:"Sekundiga tiklanadigan energiya",

  level:"Daraja",
  current:"joriy",

  buyCoin:"Coin",
  buyCrystal:"Kristal",

  refillEnergy:"Energiyani to'ldirish",
  refillDesc:"Energiyani zumda to'liq tiklaydi",

  tasksTitle:"Vazifalar",

  refTitle:"👥 Referral",
  refDesc:"Do'stlaringizni taklif qiling: sizga 100💎, do'stingizga 50💎",

  copyLink:"Havolani nusxalash",
  linkCopied:"Havola nusxalandi!",

  invited:"Taklif qilingan",

  join:"Obuna bo'lish",
  check:"Tekshirish",
  done:"Bajarildi ✓",

  settingsTitle:"Parametr",
  language:"Til",
  devices:"Ulangan qurilmalar",
  sendGift:"Kristal yuborish",
  adminPanel:"Admin panel",
  logout:"Chiqish",

  giftUser:"Qabul qiluvchi foydalanuvchi nomi",
  giftAmount:"Miqdor (min 10)",

  giftMin:"Minimal miqdor 10",
  giftNotFound:"Foydalanuvchi topilmadi",
  giftInsufficient:"Kristal yetarli emas",
  giftSelf:"O'zingizga yubora olmaysiz",

  giftConfirm:"Tasdiqlash",
  giftSuccessTitle:"Muvaffaqiyatli yuborildi",

  receiptFrom:"Kimdan",
  receiptTo:"Kimga",
  receiptAmount:"Miqdor",
  receiptTime:"Vaqt",

  noDevices:"Boshqa qurilmalar ulanmagan",
  removeDevice:"O'chirish",

  toastLoggedOut:"Chiqdingiz",
  toastSaved:"Saqlandi",
  toastNotEnough:"Balans yetarli emas",
  toastBought:"Xarid qilindi!",
  toastTaskDone:"Mukofot olindi!",
  toastNotSubscribed:"Siz hali kanalga obuna bo'lmadingiz",

  adminAddTask:"Vazifa qo'shish",
  adminGive:"Userga hisoblash",
  adminLookup:"Userni qidirish",

  taskTitle:"Vazifa nomi",
  channelUser:"Kanal username (@ siz)",
  reward:"Mukofot (kristal)",

  taskType:"Turi",
  typeChannel:"Majburiy kanal obunasi",
  typeAd:"Reklama / boshqa vazifa",

  send:"Yuborish",
  lookup:"Qidirish",

  userNotFound:"Foydalanuvchi topilmadi"
}

};

let currentLang = localStorage.getItem('gc_lang') || null;

function t(key){
  return (LANG[currentLang || 'en'][key]) || key;
}


/* ---------- 3. TELEGRAM ---------- */

const tg = window.Telegram ? window.Telegram.WebApp : null;

if(tg){
  tg.ready();
  tg.expand();
}

const telegramUser =
  tg &&
  tg.initDataUnsafe &&
  tg.initDataUnsafe.user
    ? tg.initDataUnsafe.user
    : null;

const telegramId =
  telegramUser
    ? String(telegramUser.id)
    : null;

const startParam =
  tg &&
  tg.initDataUnsafe
    ? (tg.initDataUnsafe.start_param || null)
    : null;


/* ---------- 4. GAME CONFIG ---------- */

const PRICING = {
  tap:   { base: 1, step: 1 },
  energy:{ base: 1, step: 500 },
  regen: { base: 1, step: 1 }
};

const CRYSTAL_RATIO = 500;


/* ---------- 5. STATE ---------- */

let user = null;
let userRef = null;

let energyTimer = null;
let syncTimer = null;

let pendingTaps = 0;
let tasksCache = [];


/* ---------- 6. UTIL ---------- */

function $(id){
  return document.getElementById(id);
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>{
    s.classList.remove('active');
  });

  const el = $(id);

  if(el){
    el.classList.add('active');
  }
}

function toast(msg){
  const el = $('toast');

  if(!el) return;

  el.textContent = msg;
  el.classList.add('show');

  setTimeout(()=>{
    el.classList.remove('show');
  },2200);
}

function fmt(n){
  n = Math.floor(Number(n) || 0);
  return n.toLocaleString('en-US');
}

function genStars(){
  const c = $('stars');

  if(!c) return;

  let html='';

  for(let i=0;i<60;i++){
    const x=Math.random()*100;
    const y=Math.random()*100;
    const d=Math.random()*3;

    html += `
      <span
        style="
          left:${x}%;
          top:${y}%;
          animation-delay:${d}s;
        "
      ></span>`;
  }

  c.innerHTML = html;
}

genStars();


/* ---------- 7. PRICES ---------- */

function coinCostForLevel(kind, level){

  level = Math.max(1, Number(level) || 1);

  const config = PRICING[kind];

  if(!config){
    return 1;
  }

  return config.base + (level - 1) * config.step;
}


function crystalCostForLevel(kind, level){

  level = Math.max(1, Number(level) || 1);

  const crystalPrices = {
    1: 1,
    2: 5,
    3: 10,
    4: 20,
    5: 30,
    6: 40
  };

  if(crystalPrices[level] !== undefined){
    return crystalPrices[level];
  }

  return 40 + (level - 6) * 10;
}
/* ---------- 8. LANGUAGE ---------- */

document
  .querySelectorAll('#screen-lang .lang-btn')
  .forEach(btn=>{

    btn.addEventListener('click', async ()=>{

      currentLang = btn.dataset.lang;

      localStorage.setItem(
        'gc_lang',
        currentLang
      );

      applyTranslations();

      /*
       * MUHIM:
       * Login/Register yo'q.
       * Til tanlangandan keyin avtomatik kiradi.
       */

      await enterWithoutLogin();

    });

});


document
  .querySelectorAll('[data-lang-switch]')
  .forEach(btn=>{

    btn.addEventListener('click', ()=>{

      currentLang =
        btn.dataset.langSwitch;

      localStorage.setItem(
        'gc_lang',
        currentLang
      );

      applyTranslations();

      closeModal('modal-lang');

      if(user){
        renderMain();
        renderShop();
        renderTasks();
      }

      toast(t('toastSaved'));

    });

});


function applyTranslations(){

  const setText = (id,key)=>{
    const el=$(id);
    if(el) el.textContent=t(key);
  };

  /*
   * Login elementlari HTMLda qolgan bo'lsa ham
   * xatolik bermasligi uchun tekshirilyapti.
   */

  setText('lbl-login-username','username');
  setText('lbl-login-code','code');
  setText('btn-login','btnLogin');
  setText('tab-login','login');
  setText('tab-register','register');

  setText('lbl-reg-name','yourName');
  setText('lbl-reg-username','username');
  setText('hint-username','usernameHint');
  setText('lbl-reg-code','code');
  setText('lbl-reg-code2','confirmCode');
  setText('btn-register','btnRegister');

  setText('loading-text','loading');

  setText('energy-label-text','energy');

  setText('nav-tap-label','navTap');
  setText('nav-shop-label','navShop');
  setText('nav-tasks-label','navTasks');
  setText('nav-settings-label','navSettings');

  setText('shop-title','shopTitle');
  setText('tasks-title','tasksTitle');

  setText('ref-title','refTitle');
  setText('ref-desc','refDesc');
  setText('ref-copy','copyLink');

  setText('settings-title','settingsTitle');

  setText('lbl-set-lang','language');
  setText('lbl-set-devices','devices');
  setText('lbl-set-gift','sendGift');

  const adminLabel=$('lbl-set-admin');

  if(adminLabel){
    adminLabel.innerHTML =
      t('adminPanel') +
      ' <span class="admin-badge">ADMIN</span>';
  }

  setText('lbl-set-logout','logout');

  setText('modal-devices-title','devices');
  setText('modal-gift-title','sendGift');

  setText('gift-lbl-user','giftUser');
  setText('gift-lbl-amount','giftAmount');

  setText('gift-confirm-btn','giftConfirm');
  setText('modal-lang-title','language');

  document.documentElement.lang =
    currentLang || 'en';
}


/* =========================================================
   9. AUTO USER SYSTEM
   ========================================================= */

/*
 * Telegram username bo'lmasa:
 * tg_123456789 kabi username yaratiladi.
 */

function getTelegramUsername(){

  if(
    telegramUser &&
    telegramUser.username
  ){
    return telegramUser.username
      .toLowerCase()
      .replace(/[^a-z0-9_]/g,'');
  }

  if(telegramId){
    return 'tg_' + telegramId;
  }

  return null;
}


function getTelegramName(){

  if(!telegramUser){
    return 'Galaxy User';
  }

  const first =
    telegramUser.first_name || '';

  const last =
    telegramUser.last_name || '';

  const full =
    `${first} ${last}`.trim();

  return full || 'Galaxy User';
}


function userRefFor(username){
  return db.collection('users').doc(username);
}


/*
 * Telegram user mavjud bo'lsa:
 *
 * 1. Firebase'dan user qidiradi
 * 2. Bor bo'lsa yuklaydi
 * 3. Yo'q bo'lsa avtomatik yaratadi
 * 4. Login/Register talab qilmaydi
 */

async function enterWithoutLogin(){

  showScreen('screen-loading');

  if(!telegramId){

    console.warn(
      'Telegram user ID topilmadi.'
    );

    /*
     * Telegram Web App tashqarisida test qilinsa,
     * vaqtinchalik guest user.
     */

    createGuestUser();

    return;
  }

  try{

    const username =
      getTelegramUsername();

    const ref =
      userRefFor(username);

    const snap =
      await ref.get();


    /* ---------- EXISTING USER ---------- */

    if(snap.exists){

      user = snap.data();
      userRef = ref;

      /*
       * Eski userda kerakli maydonlar bo'lmasa
       * default qiymat beramiz.
       */

      user.name =
        user.name || getTelegramName();

      user.username =
        user.username || username;

      user.coins =
        Number(user.coins || 0);

      user.crystals =
        Number(user.crystals || 0);

      user.tapLevel =
        Number(user.tapLevel || 1);

      user.energyLevel =
        Number(user.energyLevel || 1);

      user.regenLevel =
        Number(user.regenLevel || 1);

      user.maxEnergy =
        Number(user.maxEnergy || 500);

      user.energy =
        Number(user.energy ?? user.maxEnergy);

      user.regen =
        Number(user.regen || 1);

      user.refCount =
        Number(user.refCount || 10000);

      user.completedTasks =
        user.completedTasks || [];

      /*
       * Telegram device ma'lumotini yangilash
       */

      let devices =
        user.devices || [];

      const deviceIndex =
        devices.findIndex(
          d => String(d.telegramId) === String(telegramId)
        );

      if(deviceIndex === -1){

        devices.push({
          telegramId,
          tgName:getTelegramName(),
          lastSeen:Date.now()
        });

      }else{

        devices[deviceIndex].lastSeen =
          Date.now();

      }

      user.devices = devices;

      await ref.update({

        name:user.name,
        telegramId:telegramId,
        devices:devices,
        lastSeen:Date.now(),
        lang:currentLang

      });

      setTimeout(
        ()=>enterGame(),
        500
      );

      return;
    }


    /* ---------- NEW USER ---------- */

    const newUser = {

      name:getTelegramName(),

      username:username,

      telegramId:telegramId,

      coins:9999999999,

      crystals:9999999999,

      tapLevel:9999999999,

      energyLevel:9999999999,

      regenLevel:9999999999,

      maxEnergy:99999999999,

      energy:99999999999,

      regen:1,

      refCount:0,

      referredBy:null,

      isAdmin:false,

      devices:[{

        telegramId:telegramId,

        tgName:getTelegramName(),

        lastSeen:Date.now()

      }],

      completedTasks:[],

      createdAt:Date.now(),

      lastSeen:Date.now(),

      lang:currentLang

    };


    /* ---------- REFERRAL ---------- */

    if(startParam){

      const refUsername =
        startParam
          .toLowerCase()
          .replace(/[^a-z0-9_]/g,'');

      if(
        refUsername &&
        refUsername !== username
      ){

        try{

          const refSnap =
            await userRefFor(
              refUsername
            ).get();

          if(refSnap.exists){

            newUser.referredBy =
              refUsername;

            /*
             * Yangi userga 50 crystal
             */

            newUser.crystals += 50;

            /*
             * Refererga 100 crystal
             */

            await userRefFor(
              refUsername
            ).update({

              crystals:
                firebase.firestore.FieldValue.increment(100),

              refCount:
                firebase.firestore.FieldValue.increment(1)

            });

          }

        }catch(refErr){

          console.error(
            'Referral error:',
            refErr
          );

        }

      }

    }


    /* ---------- SAVE USER ---------- */

    await ref.set(newUser);

    user = newUser;
    userRef = ref;


    /* ---------- ADMIN NOTIFICATION ---------- */

    notifyBotRegistration(
      newUser
    );


    /* ---------- ENTER GAME ---------- */

    setTimeout(
      ()=>enterGame(),
      500
    );


  }catch(err){

    console.error(
      'Auto entry error:',
      err
    );

    /*
     * Firebase xatolik qilsa ham
     * userni guest sifatida ochamiz.
     */

    createGuestUser();

  }

}


/* ---------- GUEST USER ---------- */

function createGuestUser(){

  user = {

    name:
      getTelegramName(),

    username:
      getTelegramUsername() ||
      'guest',

    telegramId:
      telegramId || null,

    coins:0,

    crystals:0,

    tapLevel:1,

    energyLevel:1,

    regenLevel:1,

    maxEnergy:500,

    energy:500,

    regen:1,

    refCount:0,

    referredBy:null,

    isAdmin:false,

    devices:[],

    completedTasks:[]

  };

  userRef = null;

  setTimeout(
    ()=>enterGame(),
    400
  );

}


/* ---------- ON LOAD ---------- */

window.addEventListener(
  'load',
  ()=>{

    /*
     * Til oldin tanlangan bo'lsa:
     * to'g'ridan-to'g'ri userni ochamiz.
     */

    if(currentLang){

      applyTranslations();

      enterWithoutLogin();

    }else{

      /*
       * Birinchi marta kirsa til tanlaydi.
       */

      showScreen(
        'screen-lang'
      );

    }

  }
);


/* =========================================================
   10. ENTER GAME
   ========================================================= */

function enterGame(){

  applyTranslations();

  showScreen(
    'screen-main'
  );

  startEnergyLoop();

  loadTasks();

  renderMain();

  renderShop();

  renderTasks();


  /*
   * Admin:
   * Firestore'dagi mavjud user.isAdmin true bo'lsa
   * admin panel ko'rinadi.
   */

  const adminRow =
    $('row-admin');

  if(adminRow){

    adminRow.style.display =
      user.isAdmin
        ? 'flex'
        : 'none';

  }


  if(syncTimer){
    clearInterval(syncTimer);
  }

  syncTimer =
    setInterval(
      flushSync,
      2500
    );

}


/* =========================================================
   11. MAIN
   ========================================================= */

function renderMain(){

  if(!user) return;

  const nameEl =
    $('main-name');

  const handleEl =
    $('main-handle');

  const coinsEl =
    $('main-coins');

  const crystalsEl =
    $('main-crystals');

  const energyCount =
    $('energy-count');

  const energyFill =
    $('energy-fill');


  if(nameEl){
    nameEl.textContent =
      user.name || 'Galaxy User';
  }

  if(handleEl){

    handleEl.textContent =
      '@' +
      (
        user.username ||
        getTelegramUsername() ||
        'user'
      );

  }

  if(coinsEl){
    coinsEl.textContent =
      fmt(user.coins);
  }

  if(crystalsEl){
    crystalsEl.textContent =
      fmt(user.crystals);
  }

  if(energyCount){

    energyCount.textContent =
      `${Math.floor(user.energy)}/${user.maxEnergy}`;

  }

  if(energyFill){

    energyFill.style.width =
      Math.max(
        0,
        Math.min(
          100,
          user.energy /
          user.maxEnergy *
          100
        )
      ) + '%';

  }

}


/* =========================================================
   12. TAP
   ========================================================= */

const planetBtn =
  $('planet-btn');

if(planetBtn){

  planetBtn.addEventListener(
    'click',
    (e)=>{

      if(!user){
        return;
      }

      if(user.energy < 1){

        toast(
          t('toastNotEnough')
        );

        return;
      }

      const tapPower =
        user.tapLevel;

      user.coins +=
        tapPower;

      user.energy =
        Math.max(
          0,
          user.energy - 1
        );

      pendingTaps++;

      renderMain();

      spawnFloatText(
        '+' + tapPower,
        e
      );

      if(
        tg &&
        tg.HapticFeedback
      ){

        tg.HapticFeedback
          .impactOccurred('light');

      }

    }
  );

}


function spawnFloatText(text,e){

  const stage =
    $('tap-stage');

  if(!stage) return;

  const rect =
    stage.getBoundingClientRect();

  const x =
    (
      e.clientX ||
      (
        rect.left +
        rect.width / 2
      )
    ) -
    rect.left +
    (
      Math.random()*40-20
    );

  const y =
    (
      e.clientY ||
      (
        rect.top +
        rect.height / 2
      )
    ) -
    rect.top;

  const el =
    document.createElement(
      'div'
    );

  el.className =
    'float-plus';

  el.style.left =
    x + 'px';

  el.style.top =
    y + 'px';

  el.textContent =
    text;

  stage.appendChild(el);

  setTimeout(
    ()=>el.remove(),
    800
  );

}


/* =========================================================
   13. ENERGY
   ========================================================= */

function startEnergyLoop(){

  if(energyTimer){
    clearInterval(
      energyTimer
    );
  }

  energyTimer =
    setInterval(
      ()=>{

        if(
          !user ||
          user.energy >= user.maxEnergy
        ){
          return;
        }

        user.energy =
          Math.min(
            user.maxEnergy,
            user.energy +
            user.regen
          );

        renderMain();

      },
      1000
    );

}


/* =========================================================
   14. FIRESTORE SYNC
   ========================================================= */

async function flushSync(){

  if(
    !userRef ||
    !user
  ){
    return;
  }

  try{

    await userRef.update({

      coins:user.coins,

      energy:user.energy,

      crystals:user.crystals,

      lastSeen:Date.now()

    });

    pendingTaps=0;

  }catch(err){

    console.error(
      'sync error',
      err
    );

  }

}


window.addEventListener(
  'beforeunload',
  flushSync
);

document.addEventListener(
  'visibilitychange',
  ()=>{

    if(document.hidden){
      flushSync();
    }

  }
);


/* =========================================================
   15. NAVIGATION
   ========================================================= */

document
  .querySelectorAll('.nav-btn')
  .forEach(btn=>{

    btn.addEventListener(
      'click',
      ()=>{

        document
          .querySelectorAll('.nav-btn')
          .forEach(
            b=>b.classList.remove(
              'active'
            )
          );

        btn.classList.add(
          'active'
        );

        const nav =
          btn.dataset.nav;

        if(nav==='tap'){

          showScreen(
            'screen-main'
          );

        }

        if(nav==='shop'){

          showScreen(
            'screen-shop'
          );

          renderShop();

        }

        if(nav==='tasks'){

          showScreen(
            'screen-tasks'
          );

          renderTasks();

        }

        if(nav==='settings'){

          showScreen(
            'screen-settings'
          );

        }

      }
    );

});


document
  .querySelectorAll('[data-back]')
  .forEach(btn=>{

    btn.addEventListener(
      'click',
      ()=>{

        const target =
          btn.dataset.back;

        document
          .querySelectorAll('.nav-btn')
          .forEach(
            b=>b.classList.remove(
              'active'
            )
          );

        if(target==='tap'){

          showScreen(
            'screen-main'
          );

          const tapNav =
            document.querySelector(
              '[data-nav="tap"]'
            );

          if(tapNav){
            tapNav.classList.add(
              'active'
            );
          }

        }

        if(target==='settings'){

          showScreen(
            'screen-settings'
          );

        }

      }
    );

});


/* =========================================================
   16. SHOP
   ========================================================= */

function renderShop(){

  if(!user) return;

  const items = [

    {
      key:'tap',
      label:t('tapPower'),
      desc:t('tapPowerDesc'),
      level:user.tapLevel,
      valueNow:user.tapLevel,
      valueNext:
        user.tapLevel +
        PRICING.tap.step,
      icon:'🪙'
    },

    {
      key:'energy',
      label:t('maxEnergy'),
      desc:t('maxEnergyDesc'),
      level:user.energyLevel,
      valueNow:user.maxEnergy,
      valueNext:
        user.maxEnergy +
        PRICING.energy.step,
      icon:'⚡'
    },

    {
      key:'regen',
      label:t('energyRegen'),
      desc:t('energyRegenDesc'),
      level:user.regenLevel,
      valueNow:user.regen,
      valueNext:
        user.regen +
        PRICING.regen.step,
      icon:'🔋'
    }

  ];


  let html='';


  items.forEach(it=>{

    const coinCost =
      coinCostForLevel(
        it.key,
        it.level
      );

    const crystalCost =
      crystalCostForLevel(
        it.key,
        it.level
      );


    html += `

      <div class="card shop-item">

        <div class="shop-item-top">

          <div class="shop-item-name">
            ${it.icon}
            ${it.label}
          </div>

          <div class="shop-item-level">
            ${t('level')}
            ${it.level}
            (${it.valueNow}
            ${t('current')})
          </div>

        </div>

        <div class="shop-item-desc">
          ${it.desc}
          → ${it.valueNext}
        </div>

        <div class="buy-row">

          <button
            class="buy-btn coin"
            data-buy="${it.key}"
            data-cur="coin"
          >
            🪙 ${fmt(coinCost)}
          </button>

          <button
            class="buy-btn crystal"
            data-buy="${it.key}"
            data-cur="crystal"
          >
            💎 ${fmt(crystalCost)}
          </button>

        </div>

      </div>

    `;

  });


  html += `

    <div class="card shop-item">

      <div class="shop-item-top">

        <div class="shop-item-name">
          ⚡ ${t('refillEnergy')}
        </div>

      </div>

      <div class="shop-item-desc">
        ${t('refillDesc')}
      </div>

      <div class="buy-row">

        <button
          class="buy-btn crystal"
          id="buy-refill"
        >
          💎 10
        </button>

      </div>

    </div>

  `;


  const shopItems =
    $('shop-items');

  if(shopItems){
    shopItems.innerHTML =
      html;
  }


  document
    .querySelectorAll('[data-buy]')
    .forEach(btn=>{

      btn.addEventListener(
        'click',
        ()=>buyUpgrade(
          btn.dataset.buy,
          btn.dataset.cur
        )
      );

    });


  const refillBtn =
    $('buy-refill');

  if(refillBtn){

    refillBtn.addEventListener(
      'click',
      buyRefill
    );

  }

}


async function buyUpgrade(
  kind,
  currency
){

  if(!user) return;

  const levelField =
    kind + 'Level';

  const level =
    user[levelField];

  const coinCost =
    coinCostForLevel(
      kind,
      level
    );

  const crystalCost =
    crystalCostForLevel(
      kind,
      level
    );


  if(currency==='coin'){

    if(
      user.coins <
      coinCost
    ){

      toast(
        t('toastNotEnough')
      );

      return;
    }

    user.coins -=
      coinCost;

  }else{

    if(
      user.crystals <
      crystalCost
    ){

      toast(
        t('toastNotEnough')
      );

      return;
    }

    user.crystals -=
      crystalCost;

  }


  user[levelField] += 1;


  if(kind==='tap'){

    user.tapLevel =
      user[levelField];

  }

  if(kind==='energy'){

    user.maxEnergy +=
      PRICING.energy.step;

  }

  if(kind==='regen'){

    user.regen +=
      PRICING.regen.step;

  }


  if(userRef){

    await userRef.update({

      coins:user.coins,

      crystals:user.crystals,

      tapLevel:user.tapLevel,

      energyLevel:user.energyLevel,

      regenLevel:user.regenLevel,

      maxEnergy:user.maxEnergy,

      regen:user.regen

    });

  }


  toast(
    t('toastBought')
  );

  renderMain();
  renderShop();

}


async function buyRefill(){

  if(!user) return;

  if(user.crystals < 10){

    toast(
      t('toastNotEnough')
    );

    return;
  }

  user.crystals -= 10;

  user.energy =
    user.maxEnergy;


  if(userRef){

    await userRef.update({

      crystals:user.crystals,

      energy:user.energy

    });

  }


  toast(
    t('toastBought')
  );

  renderMain();
  renderShop();

}


/* =========================================================
   17. TASKS + REFERRAL
   ========================================================= */

function buildRefLink(){

  return `https://t.me/${BOT_USERNAME}/${APP_SHORT_NAME}?startapp=${user.username}`;

}


function renderTasks(){

  if(!user) return;

  const refLink =
    $('ref-link');

  if(refLink){

    refLink.textContent =
      buildRefLink();

  }


  const refCount =
    $('ref-count');

  if(refCount){

    refCount.textContent =
      `${t('invited')}: ${user.refCount || 0}`;

  }


  renderTaskList();

}


const refCopy =
  $('ref-copy');

if(refCopy){

  refCopy.addEventListener(
    'click',
    ()=>{

      navigator
        .clipboard
        .writeText(
          buildRefLink()
        )
        .then(
          ()=>toast(
            t('linkCopied')
          )
        );

    }
  );

}


async function loadTasks(){

  try{

    const snap =
      await db
        .collection('tasks')
        .where(
          'active',
          '==',
          true
        )
        .get();

    tasksCache =
      snap.docs.map(
        d=>({
          id:d.id,
          ...d.data()
        })
      );

    renderTaskList();

  }catch(err){

    console.error(
      'Task loading error:',
      err
    );

  }

}


function renderTaskList(){

  if(!user) return;

  const taskList =
    $('task-list');

  if(!taskList) return;

  const completed =
    user.completedTasks || [];

  let html='';


  tasksCache.forEach(
    task=>{

      const isDone =
        completed.includes(
          task.id
        );


      html += `

        <div class="card task-item">

          <div class="task-info">

            <div class="task-name">
              ${task.title}
            </div>

            <div class="task-reward">
              +${task.reward}💎
            </div>

          </div>

          ${
            isDone

            ?

            `<div class="task-btn done">
              ${t('done')}
            </div>`

            :

            `<button
              class="task-btn"
              data-task="${task.id}"
            >
              ${
                task.type === 'channel'
                ? t('join')
                : t('check')
              }
            </button>`
          }

        </div>

      `;

    }
  );


  taskList.innerHTML =
    html;


  document
    .querySelectorAll('[data-task]')
    .forEach(btn=>{

      btn.addEventListener(
        'click',
        ()=>completeTask(
          btn.dataset.task
        )
      );

    });

}


async function completeTask(taskId){

  if(!user) return;

  const task =
    tasksCache.find(
      t2=>t2.id===taskId
    );

  if(!task) return;


  if(task.type==='channel'){

    if(task.channel){

      if(
        tg &&
        tg.openTelegramLink
      ){

        tg.openTelegramLink(
          `https://t.me/${task.channel}`
        );

      }

    }


    if(
      BOT_SERVER_URL &&
      telegramId
    ){

      try{

        const res =
          await fetch(
            BOT_SERVER_URL +
            '/check-subscription',
            {

              method:'POST',

              headers:{
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify({

                  telegramId,
                  channel:
                    task.channel

                })

            }
          );


        const data =
          await res.json();


        if(!data.subscribed){

          toast(
            t('toastNotSubscribed')
          );

          return;

        }

      }catch(err){

        console.error(err);

        toast(
          t('toastNotSubscribed')
        );

        return;

      }

    }

  }


  const completed =
    user.completedTasks || [];


  if(
    completed.includes(
      taskId
    )
  ){

    return;

  }


  completed.push(
    taskId
  );


  user.completedTasks =
    completed;

  user.crystals +=
    Number(task.reward || 0);


  if(userRef){

    await userRef.update({

      completedTasks:
        completed,

      crystals:
        user.crystals

    });

  }


  toast(
    t('toastTaskDone')
  );

  renderMain();
  renderTaskList();

}


/* =========================================================
   18. SETTINGS
   ========================================================= */

const rowLanguage =
  $('row-language');

if(rowLanguage){

  rowLanguage.addEventListener(
    'click',
    ()=>openModal(
      'modal-lang'
    )
  );

}


const rowDevices =
  $('row-devices');

if(rowDevices){

  rowDevices.addEventListener(
    'click',
    ()=>{

      renderDevices();

      openModal(
        'modal-devices'
      );

    }
  );

}


const rowGift =
  $('row-gift');

if(rowGift){

  rowGift.addEventListener(
    'click',
    ()=>{

      const receipt =
        $('gift-receipt-wrap');

      if(receipt){
        receipt.innerHTML='';
      }

      $('gift-username').value='';
      $('gift-amount').value='';
      $('gift-err').textContent='';

      openModal(
        'modal-gift'
      );

    }
  );

}


const rowAdmin =
  $('row-admin');

if(rowAdmin){

  rowAdmin.addEventListener(
    'click',
    ()=>{

      showScreen(
        'screen-admin'
      );

      loadAdminTasks();

    }
  );

}


/*
 * Logout endi Login'ga olib bormaydi.
 * Til tanlash oynasiga qaytadi.
 */

const rowLogout =
  $('row-logout');

if(rowLogout){

  rowLogout.addEventListener(
    'click',
    async ()=>{

      await flushSync();

      clearInterval(
        energyTimer
      );

      clearInterval(
        syncTimer
      );

      user=null;
      userRef=null;

      localStorage.removeItem(
        'gc_lang'
      );

      toast(
        t('toastLoggedOut')
      );

      showScreen(
        'screen-lang'
      );

    }
  );

}


/* =========================================================
   19. MODALS
   ========================================================= */

function openModal(id){

  const el=$(id);

  if(el){
    el.classList.add(
      'active'
    );
  }

}


function closeModal(id){

  const el=$(id);

  if(el){
    el.classList.remove(
      'active'
    );
  }

}


document
  .querySelectorAll('[data-close]')
  .forEach(btn=>{

    btn.addEventListener(
      'click',
      ()=>closeModal(
        btn.dataset.close
      )
    );

});


document
  .querySelectorAll('.modal-overlay')
  .forEach(ov=>{

    ov.addEventListener(
      'click',
      e=>{

        if(e.target===ov){

          ov.classList.remove(
            'active'
          );

        }

      }
    );

});


/* =========================================================
   20. DEVICES
   ========================================================= */

function renderDevices(){

  if(!user) return;

  const devices =
    user.devices || [];

  const list =
    $('devices-list');

  if(!list) return;


  if(devices.length===0){

    list.innerHTML =
      `<div class="small-note">
        ${t('noDevices')}
      </div>`;

    return;

  }


  let html='';


  devices.forEach(
    (d,i)=>{

      const isCurrent =
        String(d.telegramId) ===
        String(telegramId);


      html += `

        <div class="device-item">

          <span>
            ${d.tgName || 'Device'}
            ${isCurrent ? '(current)' : ''}
          </span>

          ${
            isCurrent
            ? ''
            :
            `<span
              class="remove-device"
              data-rmdevice="${i}"
            >
              ${t('removeDevice')}
            </span>`
          }

        </div>

      `;

    }
  );


  list.innerHTML =
    html;


  document
    .querySelectorAll('[data-rmdevice]')
    .forEach(btn=>{

      btn.addEventListener(
        'click',
        async ()=>{

          const idx =
            parseInt(
              btn.dataset.rmdevice
            );

          const devices =
            user.devices || [];

          devices.splice(
            idx,
            1
          );

          user.devices =
            devices;


          if(userRef){

            await userRef.update({
              devices
            });

          }


          renderDevices();

          toast(
            t('toastSaved')
          );

        }
      );

    });

}


/* =========================================================
   21. SEND CRYSTALS
   ========================================================= */

const giftConfirm =
  $('gift-confirm-btn');

if(giftConfirm){

  giftConfirm.addEventListener(
    'click',
    async ()=>{

      if(!user) return;

      const errEl =
        $('gift-err');

      errEl.textContent='';


      let recipient =
        $('gift-username')
          .value
          .trim()
          .toLowerCase()
          .replace('@','');


      const amount =
        parseInt(
          $('gift-amount').value
        );


      if(
        !recipient ||
        !amount
      ){

        errEl.textContent =
          'Barcha maydonlarni to‘ldiring';

        return;

      }


      if(amount < 10){

        errEl.textContent =
          t('giftMin');

        return;

      }


      if(
        recipient ===
        user.username
      ){

        errEl.textContent =
          t('giftSelf');

        return;

      }


      if(
        user.crystals <
        amount
      ){

        errEl.textContent =
          t('giftInsufficient');

        return;

      }


      try{

        const snap =
          await userRefFor(
            recipient
          ).get();


        if(!snap.exists){

          errEl.textContent =
            t('giftNotFound');

          return;

        }


        user.crystals -=
          amount;


        if(userRef){

          await userRef.update({
            crystals:user.crystals
          });

        }


        await userRefFor(
          recipient
        ).update({

          crystals:
            firebase.firestore
              .FieldValue
              .increment(amount)

        });


        renderMain();


        const now =
          new Date();


        const receipt =
          $('gift-receipt-wrap');


        if(receipt){

          receipt.innerHTML = `

            <div
              class="receipt"
              style="margin-top:14px;"
            >

              <div
                style="
                  font-weight:700;
                  margin-bottom:2px;
                "
              >
                ${t('giftSuccessTitle')} ✅
              </div>

              <div class="receipt-row">
                <span>${t('receiptFrom')}</span>
                <b>@${user.username}</b>
              </div>

              <div class="receipt-row">
                <span>${t('receiptTo')}</span>
                <b>@${recipient}</b>
              </div>

              <div class="receipt-row">
                <span>${t('receiptAmount')}</span>
                <b>${amount} 💎</b>
              </div>

              <div class="receipt-row">
                <span>${t('receiptTime')}</span>
                <b>${now.toLocaleString()}</b>
              </div>

            </div>

          `;

        }


      }catch(err){

        console.error(err);

        errEl.textContent =
          'Error: ' + err.message;

      }

    }
  );

}


/* =========================================================
   22. ADMIN TASKS
   ========================================================= */

const addTaskBtn =
  $('ad-add-task-btn');

if(addTaskBtn){

  addTaskBtn.addEventListener(
    'click',
    async ()=>{

      const title =
        $('ad-task-title')
          .value
          .trim();

      const channel =
        $('ad-task-channel')
          .value
          .trim()
          .replace('@','');

      const reward =
        parseInt(
          $('ad-task-reward').value
        );

      const type =
        $('ad-task-type').value;


      if(
        !title ||
        !reward
      ){

        return;

      }


      try{

        await db
          .collection('tasks')
          .add({

            title,
            channel,
            reward,
            type,
            active:true,
            createdAt:Date.now()

          });


        $('ad-task-title').value='';
        $('ad-task-channel').value='';
        $('ad-task-reward').value='';


        toast(
          t('toastSaved')
        );


        loadAdminTasks();
        loadTasks();


      }catch(err){

        console.error(err);

      }

    }
  );

}


async function loadAdminTasks(){

  try{

    const snap =
      await db
        .collection('tasks')
        .orderBy(
          'createdAt',
          'desc'
        )
        .get();


    let html='';


    snap.docs.forEach(
      d=>{

        const t2 =
          d.data();


        html += `

          <div
            class="task-item"
            style="
              padding:10px 0;
              border-bottom:
                1px solid
                var(--border);
            "
          >

            <div class="task-info">

              <div class="task-name">
                ${t2.title}
              </div>

              <div class="task-reward">
                +${t2.reward}💎 · ${t2.type}
              </div>

            </div>

            <span
              class="remove-device"
              data-rmtask="${d.id}"
            >
              ✕
            </span>

          </div>

        `;

      }
    );


    const list =
      $('ad-task-list');

    if(!list) return;


    list.innerHTML =
      html ||
      `<div class="small-note">
        No tasks yet
      </div>`;


    document
      .querySelectorAll('[data-rmtask]')
      .forEach(btn=>{

        btn.addEventListener(
          'click',
          async ()=>{

            await db
              .collection('tasks')
              .doc(
                btn.dataset.rmtask
              )
              .delete();

            loadAdminTasks();
            loadTasks();

          }
        );

      });


  }catch(err){

    console.error(
      'Admin tasks error:',
      err
    );

  }

}


/* =========================================================
   23. ADMIN GIVE CURRENCY
   ========================================================= */

const adminGiveBtn =
  $('ad-give-btn');

if(adminGiveBtn){

  adminGiveBtn.addEventListener(
    'click',
    async ()=>{

      const errEl =
        $('ad-give-err');

      errEl.textContent='';


      const uname =
        $('ad-give-username')
          .value
          .trim()
          .toLowerCase();


      const coins =
        parseInt(
          $('ad-give-coins').value
        ) || 0;


      const crystals =
        parseInt(
          $('ad-give-crystals').value
        ) || 0;


      if(!uname){

        errEl.textContent =
          'Barcha maydonlarni to‘ldiring';

        return;

      }


      try{

        const snap =
          await userRefFor(
            uname
          ).get();


        if(!snap.exists){

          errEl.textContent =
            t('userNotFound');

          return;

        }


        await userRefFor(
          uname
        ).update({

          coins:
            firebase.firestore
              .FieldValue
              .increment(coins),

          crystals:
            firebase.firestore
              .FieldValue
              .increment(crystals)

        });


        $('ad-give-username').value='';
        $('ad-give-coins').value='';
        $('ad-give-crystals').value='';


        toast(
          t('toastSaved')
        );


      }catch(err){

        console.error(err);

        errEl.textContent =
          'Error: ' + err.message;

      }

    }
  );

}


/* =========================================================
   24. ADMIN USER LOOKUP
   ========================================================= */

const lookupBtn =
  $('ad-lookup-btn');

if(lookupBtn){

  lookupBtn.addEventListener(
    'click',
    async ()=>{

      const uname =
        $('ad-lookup-username')
          .value
          .trim()
          .toLowerCase();


      if(!uname) return;


      const result =
        $('ad-lookup-result');


      try{

        const snap =
          await userRefFor(
            uname
          ).get();


        if(!snap.exists){

          result.innerHTML = `
            <div class="small-note">
              ${t('userNotFound')}
            </div>
          `;

          return;

        }


        const d =
          snap.data();


        result.innerHTML = `

          <div class="receipt">

            <div class="receipt-row">
              <span>Name</span>
              <b>${d.name || '-'}</b>
            </div>

            <div class="receipt-row">
              <span>Username</span>
              <b>@${d.username || uname}</b>
            </div>

            <div class="receipt-row">
              <span>Telegram ID</span>
              <b>${d.telegramId || '-'}</b>
            </div>

            <div class="receipt-row">
              <span>Coins</span>
              <b>${fmt(d.coins)}</b>
            </div>

            <div class="receipt-row">
              <span>Crystals</span>
              <b>${fmt(d.crystals)}</b>
            </div>

            <div class="receipt-row">
              <span>Referrals</span>
              <b>${d.refCount || 0}</b>
            </div>

            <div class="receipt-row">
              <span>Devices</span>
              <b>${(d.devices || []).length}</b>
            </div>

          </div>

        `;


      }catch(err){

        console.error(err);

        result.innerHTML =
          `<div class="small-note">
            Error: ${err.message}
          </div>`;

      }

    }
  );

}


/* =========================================================
   25. BOT NOTIFICATION
   ========================================================= */

async function notifyBotRegistration(newUser){

  if(!BOT_SERVER_URL){
    return;
  }


  try{

    await fetch(
      BOT_SERVER_URL +
      '/notify-registration',
      {

        method:'POST',

        headers:{
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify({

            name:newUser.name,

            username:
              newUser.username,

            telegramId:
              telegramId,

            tgName:
              getTelegramName()

          })

      }
    );

  }catch(err){

    console.error(
      'notify error',
      err
    );

  }

}
