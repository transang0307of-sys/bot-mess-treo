const fs   = require('fs-extra');
const path = require('path');

const DATA_PATH = path.join(process.cwd(), 'modules', 'commands', 'data', 'tutien.json');

// Đọc / ghi file JSON
function readData() {
    try { return fs.readJsonSync(DATA_PATH); } catch { return {}; }
}
function saveData(d) {
    fs.writeJsonSync(DATA_PATH, d, { spaces: 2 });
}

module.exports.config = {
    name: "tutien",
    version: "6.9.0",
    hasPermssion: 0,
    credits: "dk ✨",
    description: "⚔️ Hệ thống Tu Tiên siêu đỉnh – PK, đột phá, luyện đan, bảo vật, thiên kiếp, kỹ năng, tháp thử thách, thế giới boss!",
    commandCategory: "Trò Chơi",
    cooldowns: 3,
    guide: "Dùng: tutien help"
};

// ============================================================
//  KHỞI TẠO – đọc dữ liệu từ file vào RAM khi bot load
// ============================================================
module.exports.onLoad = () => {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DATA_PATH)) fs.writeJsonSync(DATA_PATH, {}, { spaces: 2 });
    // Nạp vào global để dùng chung
    global.data.tutien = readData();
    console.log('✅ [tutien] Đã tải dữ liệu từ file.');
};

// ============================================================
//  CẢNH GIỚI
// ============================================================
const REALMS = [
    { name: "Phàm Nhân",     stage: 0,  exp:       0,  power:   1,  color: "⚪", title: "Tên Phàm Phu Tục Tử" },
    { name: "Luyện Khí",     stage: 1,  exp:     100,  power:   3,  color: "🟢", title: "Tiểu Tu Sĩ Chân Ướt" },
    { name: "Trúc Cơ",       stage: 2,  exp:     350,  power:   6,  color: "🔵", title: "Người Xây Nền Móng" },
    { name: "Kim Đan",        stage: 3,  exp:     900,  power:  11,  color: "🟡", title: "Đan Sư Sơ Cấp" },
    { name: "Nguyên Anh",    stage: 4,  exp:    2500,  power:  20,  color: "🟠", title: "Linh Hồn Thức Tỉnh" },
    { name: "Hóa Thần",      stage: 5,  exp:    6000,  power:  35,  color: "🔴", title: "Thần Thuật Giả" },
    { name: "Luyện Hư",      stage: 6,  exp:   14000,  power:  55,  color: "🟣", title: "Đại Năng Giả" },
    { name: "Hợp Thể",       stage: 7,  exp:   30000,  power:  85,  color: "💜", title: "Cường Giả Nhất Phương" },
    { name: "Đại Thừa",      stage: 8,  exp:   65000,  power: 130,  color: "🔶", title: "Thiên Kiêu Đại Năng" },
    { name: "Độ Kiếp",       stage: 9,  exp:  140000,  power: 200,  color: "💎", title: "Vượt Kiếp Giả Huyền Thoại" },
    { name: "Tiên Nhân",     stage: 10, exp:  300000,  power: 350,  color: "✨", title: "Thiên Địa Bất Diệt Tiên Tôn" }
];

// ============================================================
//  VŨ KHÍ
// ============================================================
const WEAPONS = [
    { id: "w1", name: "Gậy Tre",            power:  1,  price:     0,  desc: "Dùng để... chăn vịt?",                   rarity: "⬜ Thường" },
    { id: "w2", name: "Linh Kiếm",          power:  5,  price:   200,  desc: "Phảng phất linh khí, đẹp hơn gậy tre",   rarity: "🟩 Hiếm" },
    { id: "w3", name: "Thần Hỏa Đao",       power: 15,  price:   600,  desc: "Đao rực lửa, nướng thịt siêu ngon",      rarity: "🟦 Quý" },
    { id: "w4", name: "Lôi Điện Thương",    power: 30,  price:  1500,  desc: "Thương sét, cắm vào đất để câu cá",      rarity: "🟨 Sử Thi" },
    { id: "w5", name: "Tru Tiên Kiếm",      power: 60,  price:  4000,  desc: "Kiếm huyền thoại, nhìn đã sợ mất hồn",  rarity: "🟧 Huyền Thoại" },
    { id: "w6", name: "Hỗn Độn Khai Thiên Phủ", power: 120, price: 12000, desc: "Vũ khí khai thiên lập địa, bá đạo vô song", rarity: "🟥 Thần Khí" }
];

// ============================================================
//  GIÁP
// ============================================================
const ARMORS = [
    { id: "a1", name: "Vải Thô",            defense:  1,  price:     0,  desc: "Mặc vào như không mặc",                 rarity: "⬜ Thường" },
    { id: "a2", name: "Linh Giáp",          defense:  4,  price:   200,  desc: "Chí ít không bị gió thổi bay",          rarity: "🟩 Hiếm" },
    { id: "a3", name: "Hỏa Liên Giáp",      defense: 12,  price:   600,  desc: "Giáp chống lửa, không chống nước",      rarity: "🟦 Quý" },
    { id: "a4", name: "Lôi Vân Giáp",       defense: 25,  price:  1500,  desc: "Mặc vào người phóng điện đi lại",       rarity: "🟨 Sử Thi" },
    { id: "a5", name: "Tiên Vũ Khải",       defense: 50,  price:  4000,  desc: "Giáp Tiên, nhẹ như lông hồng",          rarity: "🟧 Huyền Thoại" },
    { id: "a6", name: "Hỗn Nguyên Thánh Giáp", defense: 100, price: 12000, desc: "Giáp thánh, cả trời đánh cũng không thủng", rarity: "🟥 Thần Khí" }
];

// ============================================================
//  LINH ĐAN
// ============================================================
const PILLS = [
    { id: "p1", name: "Tụ Khí Đan",         exp:   80, coin:    0, hp:   0, price:   80,  desc: "+80 tu vi | Mùi hơi kỳ nhưng uống thử đi" },
    { id: "p2", name: "Linh Khí Đan",        exp:  250, coin:    0, hp:   0, price:  220,  desc: "+250 tu vi | Đắng như mật nhưng hiệu quả" },
    { id: "p3", name: "Hồi Linh Thảo",       exp:    0, coin:  200, hp:   0, price:  120,  desc: "+200 linh thạch | Thuốc nhưng ngon hơn rau" },
    { id: "p4", name: "Kim Đan Thuần Dương",  exp:  700, coin:    0, hp:   0, price:  550,  desc: "+700 tu vi | Cảm giác như ngộ đạo bừng sáng" },
    { id: "p5", name: "Thần Đan Vô Thượng",  exp: 2000, coin:  500, hp:   0, price: 1800,  desc: "+2000 tu vi +500 đồng | Thần đan cấp cao hiếm có" },
    { id: "p6", name: "Đan Trường Sinh",      exp: 5000, coin: 1000, hp:   0, price: 4500,  desc: "+5000 tu vi +1000 đồng | Tiên đan khó kiếm nhất thế gian" }
];

// ============================================================
//  KỸ NĂNG THỤ ĐỘNG
// ============================================================
const SKILLS = [
    { id: "s1", name: "Thiết Bì Công",  type: "def",  value: 5,   price:  300,  desc: "+5% giảm sát thương khi bị tấn công",  req: 0 },
    { id: "s2", name: "Cuồng Phong Đao",type: "atk",  value: 8,   price:  500,  desc: "+8% sát thương trong PK",               req: 1 },
    { id: "s3", name: "Huyết Ma Ngục",  type: "steal",value: 15,  price:  800,  desc: "+15% cướp thêm linh thạch khi thắng PK", req: 2 },
    { id: "s4", name: "Thiên Lôi Pháp", type: "crit", value: 20,  price: 1500,  desc: "20% chí mạng x2 sát thương trong PK",   req: 3 },
    { id: "s5", name: "Bất Diệt Kim Thân", type: "revive", value: 1, price: 5000, desc: "50% không mất tu vi khi đột phá thất bại", req: 5 }
];

// ============================================================
//  BOSS THẾ GIỚI (reset mỗi ngày)
// ============================================================
const WORLD_BOSSES = [
    { id: "b1", name: "Yêu Ma Hắc Phong",   hp: 500,  expR: 300,  coinR: 200, minPower: 5  },
    { id: "b2", name: "Hỏa Long Cổ Thần",   hp: 1500, expR: 800,  coinR: 500, minPower: 20 },
    { id: "b3", name: "Lôi Đế Kiếm Linh",   hp: 5000, expR: 2500, coinR: 1500,minPower: 60 },
    { id: "b4", name: "Thái Cổ Tiên Ma",     hp:15000, expR: 8000, coinR: 5000,minPower:150 }
];

// ============================================================
//  NHIỆM VỤ HẰNG NGÀY
// ============================================================
const DAILY_QUESTS = [
    { id: "q1", name: "Tu luyện 3 lần",        type: "train",  need: 3,  expR: 100,  coinR:  50 },
    { id: "q2", name: "Tu luyện 10 lần",        type: "train",  need: 10, expR: 400,  coinR: 200 },
    { id: "q3", name: "Thắng PK 1 trận",        type: "pkwin",  need: 1,  expR: 150,  coinR:  80 },
    { id: "q4", name: "Thắng PK 5 trận",        type: "pkwin",  need: 5,  expR: 600,  coinR: 300 },
    { id: "q5", name: "Đột phá thành công",      type: "break",  need: 1,  expR: 200,  coinR: 100 },
    { id: "q6", name: "Tấn công Boss thế giới",  type: "boss",   need: 1,  expR: 300,  coinR: 150 },
    { id: "q7", name: "Mua 3 linh đan",          type: "buypill",need: 3,  expR: 180,  coinR:  90 }
];

// ============================================================
//  THIÊN KIẾP NGẪU NHIÊN (event đặc biệt khi tu luyện)
// ============================================================
const HEAVENLY_TRIBULATIONS = [
    { name: "Lôi Kiếp",     chance: 0.05, expMult: 2.0,  msg: "⚡ THIÊN LÔI HỘI TỤ! Sức mạnh tăng vọt!" },
    { name: "Hỏa Kiếp",     chance: 0.04, expMult: -0.5, msg: "🔥 HỎA KIẾP GIÁNG XUỐNG! Tẩu hỏa nhập ma nhẹ!" },
    { name: "Linh Trào Dâng",chance: 0.06, expMult: 1.5,  msg: "💫 LINH KHÍ TRIỀU DÂU! Cơ hội nghìn năm!" },
    { name: "Tâm Ma Xâm Nhập",chance:0.03, expMult: 0,   msg: "😈 TÂM MA NỔI LÊN! Tu vi không tăng lần này..." }
];

// ============================================================
//  TIỆN ÍCH
// ============================================================
function getRealm(exp) {
    let cur = REALMS[0];
    for (const r of REALMS) if (exp >= r.exp) cur = r;
    return cur;
}
function getNextRealm(exp) {
    const cur = getRealm(exp);
    return REALMS[cur.stage + 1] || null;
}
function bar(current, max, len = 12) {
    if (max <= 0) return "▓".repeat(len);
    const fill  = Math.min(len, Math.round((current / max) * len));
    const empty = len - fill;
    return "▓".repeat(fill) + "░".repeat(empty);
}
function initUser() {
    return {
        exp: 0, coin: 500,
        lastTrain: 0, lastPK: 0, lastDaily: 0, lastBoss: {},
        weapon: "w1", armor: "a1",
        inventory: { weapons: ["w1"], armors: ["a1"], pills: {} },
        skills: [],
        questProgress: {},
        pkWins: 0, pkLoss: 0,
        trainCount: 0, breakCount: 0, totalBreakSuccess: 0,
        bossKills: 0,
        streakTrain: 0, lastTrainDay: "",
        title: "Tên Phàm Phu Tục Tử",
        gifted: false
    };
}
function getWeapon(id) { return WEAPONS.find(w => w.id === id) || WEAPONS[0]; }
function getArmor(id)  { return ARMORS.find(a => a.id === id) || ARMORS[0]; }
function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function initQuestProgress(user) {
    const key = todayKey();
    if (!user.questProgress) user.questProgress = {};
    if (user.questProgress._day !== key) user.questProgress = { _day: key };
}
function addQuestProgress(user, type, amount = 1) {
    initQuestProgress(user);
    for (const q of DAILY_QUESTS) {
        if (q.type === type) {
            const cur = user.questProgress[q.id] || 0;
            user.questProgress[q.id] = cur + amount;
        }
    }
}
function hasSkill(user, id) { return (user.skills || []).includes(id); }
function getSkillVal(user, type) {
    let val = 0;
    for (const sid of (user.skills || [])) {
        const sk = SKILLS.find(s => s.id === sid);
        if (sk && sk.type === type) val += sk.value;
    }
    return val;
}
function randomComment(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const TRAIN_COMMENTS = [
    "Ngồi tu luyện cả buổi, mông đau nhức!", "Khí tức cuộn trào, tiến bộ rõ rệt!",
    "Linh khí vào thân, cảm giác ngon lành!", "Thiền định xong rất tỉnh táo luôn!",
    "Tu luyện vất vả nhưng không thể bỏ!", "Đột nhiên ngộ được bí kíp mới!"
];
const PK_WIN_COMMENTS = [
    "Đối thủ ngã lăn quay ra đất!", "Một chiêu kết liễu, không kịp trở tay!",
    "Địch không phải đối thủ của ta!", "Bại dưới tay ta là vinh dự cho ngươi!"
];
const PK_LOSE_COMMENTS = [
    "Ta... ta chưa hết sức!", "Ngươi chỉ thắng may mắn thôi!",
    "Hôm nay thua, ngày mai ta quay lại!", "Đất dưới chân sao mà trơn vậy..."
];

// ============================================================
//  MODULE CHÍNH
// ============================================================
module.exports.run = async function({ api, event, args, Users }) {
    const { threadID, messageID, senderID, mentions, messageReply } = event;
    if (!global.data.tutien) global.data.tutien = readData();
    const data = global.data.tutien;
    const now  = Date.now();

    if (!data[senderID]) data[senderID] = initUser();
    const user = data[senderID];

    // Migrate / bổ sung field
    if (!user.weapon)       user.weapon = "w1";
    if (!user.armor)        user.armor  = "a1";
    if (!user.inventory)    user.inventory = { weapons: ["w1"], armors: ["a1"], pills: {} };
    if (!user.inventory.weapons) user.inventory.weapons = ["w1"];
    if (!user.inventory.armors)  user.inventory.armors  = ["a1"];
    if (!user.inventory.pills)   user.inventory.pills   = {};
    if (!user.skills)            user.skills = [];
    if (!user.questProgress)     user.questProgress = {};
    if (!user.lastBoss)          user.lastBoss = {};
    if (user.pkWins   == null)   user.pkWins   = 0;
    if (user.pkLoss   == null)   user.pkLoss   = 0;
    if (user.trainCount  == null) user.trainCount  = 0;
    if (user.totalBreakSuccess == null) user.totalBreakSuccess = 0;
    if (user.bossKills == null)  user.bossKills = 0;
    if (user.streakTrain == null) user.streakTrain = 0;

    const cmd = (args[0] || "").toLowerCase();

    // ─────────────────────────────────────────────────────────
    //  HELP
    // ─────────────────────────────────────────────────────────
    if (!cmd || cmd === "help" || cmd === "menu") {
        return api.sendMessage(
`╔════════════════════════════════╗
║   ⚔️  TU TIÊN  v6.9  ⚔️        ║
║   "Con đường tiên là vô tận!"  ║
╚════════════════════════════════╝

📖 THÔNG TIN CÁ NHÂN
  tutien check          → Thông tin bản thân
  tutien info @tag      → Soi thông tin kẻ khác
  tutien top            → Bảng xếp hạng tu vi
  tutien title          → Đổi danh hiệu

⚙️ HOẠT ĐỘNG CHÍNH
  tutien train          → Tu luyện (CD: 60s)
  tutien dotpha         → Đột phá cảnh giới
  tutien pk @tag/reply  → Thách đấu PK (CD: 90s)
  tutien boss <id>      → Đánh boss thế giới

🏪 CỬA HÀNG & TỦ ĐỒ
  tutien shop           → Xem toàn bộ shop
  tutien buy <loai> <id>→ Mua đồ
  tutien equip <loai> <id>→ Trang bị
  tutien bag            → Xem tủ đồ của ngươi
  tutien use dan <id>   → Dùng linh đan trong túi

⚡ KỸ NĂNG
  tutien skillshop      → Shop kỹ năng thụ động
  tutien skills         → Kỹ năng đang sở hữu

📋 NHIỆM VỤ
  tutien quest          → Nhiệm vụ hằng ngày
  tutien claim <id>     → Nhận thưởng

🎁 KHÁC
  tutien gift @tag <số> → Tặng linh thạch cho bạn
  tutien profile @tag   → Xem hồ sơ đầy đủ

📌 Ví dụ:
  tutien buy vukhi w3
  tutien equip giapcap a2
  tutien buy dan p2
  tutien use dan p2
  tutien boss b1`,
        threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  CHECK BẢN THÂN
    // ─────────────────────────────────────────────────────────
    if (cmd === "check") {
        const name   = await Users.getNameUser(senderID);
        const realm  = getRealm(user.exp);
        const next   = getNextRealm(user.exp);
        const weapon = getWeapon(user.weapon);
        const armor  = getArmor(user.armor);
        const totalPower = realm.power + weapon.power + armor.defense;

        let expBar = next
            ? `${bar(user.exp - realm.exp, next.exp - realm.exp)} ${Math.floor((user.exp - realm.exp) / (next.exp - realm.exp) * 100)}%`
            : "MAX ✨";

        const winRate = (user.pkWins + user.pkLoss) > 0
            ? Math.round(user.pkWins / (user.pkWins + user.pkLoss) * 100) : 0;

        const skillNames = (user.skills || []).map(sid => {
            const sk = SKILLS.find(s => s.id === sid);
            return sk ? sk.name : sid;
        }).join(", ") || "Chưa có kỹ năng";

        return api.sendMessage(
`╔══════════════════════════════╗
║    🌟 HỒ SƠ TU SĨ 🌟          ║
╚══════════════════════════════╝

👤 ${name}
🏷️  Danh hiệu: ${user.title || realm.title}
${realm.color} Cảnh giới: ${realm.name} (Stage ${realm.stage})
⚡ Tu vi: ${user.exp.toLocaleString()} EXP
   ${expBar}
   ${next ? `└─ Cần thêm ${(next.exp - user.exp).toLocaleString()} → ${next.name}` : "└─ ✨ ĐỈNH CAO VÔ THƯỢNG!"}

💎 Linh thạch: ${user.coin.toLocaleString()}
💪 Tổng chiến lực: ${totalPower}

⚔️  Vũ khí: ${weapon.name} (${weapon.rarity})
🛡️  Giáp: ${armor.name} (${armor.rarity})
⚡ Kỹ năng: ${skillNames}

🏆 PK: ${user.pkWins}W / ${user.pkLoss}L (Tỉ lệ thắng: ${winRate}%)
🧘 Tu luyện: ${user.trainCount || 0} lần | 🔥 Đột phá: ${user.totalBreakSuccess || 0} lần
👹 Boss đã hạ: ${user.bossKills || 0} con
🔥 Streak tu luyện: ${user.streakTrain || 0} ngày liên tiếp`,
        threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  PROFILE ĐẦY ĐỦ
    // ─────────────────────────────────────────────────────────
    if (cmd === "profile") {
        let targetID = Object.keys(mentions)[0];
        if (!targetID && messageReply) targetID = messageReply.senderID;
        if (!targetID) targetID = senderID;

        if (!data[targetID]) data[targetID] = initUser();
        const t = data[targetID];
        const tName  = await Users.getNameUser(targetID);
        const realm  = getRealm(t.exp);
        const next   = getNextRealm(t.exp);
        const w      = getWeapon(t.weapon);
        const a      = getArmor(t.armor);
        const wr     = (t.pkWins + t.pkLoss) > 0 ? Math.round(t.pkWins / (t.pkWins + t.pkLoss) * 100) : 0;
        const skills = (t.skills || []).map(sid => {
            const sk = SKILLS.find(s => s.id === sid);
            return sk ? `${sk.name}` : sid;
        }).join(", ") || "—";

        return api.sendMessage(
`╔══════════════════════════════╗
║  📋 HỒ SƠ TU SĨ TOÀN DIỆN   ║
╚══════════════════════════════╝

👤 ${tName}
🏷️  ${t.title || realm.title}
${realm.color} ${realm.name} (Stage ${realm.stage})
⚡ Tu vi: ${t.exp.toLocaleString()} EXP
${next ? `└→ Cần ${(next.exp - t.exp).toLocaleString()} → ${next.name}` : "└→ ✨ Đỉnh Tiên Nhân"}

💎 ${t.coin.toLocaleString()} linh thạch
⚔️  ${w.name} | 🛡️ ${a.name}
⚡ Kỹ năng: ${skills}

📊 Thống kê:
   🏆 PK ${t.pkWins}W/${t.pkLoss}L (${wr}%)
   🧘 Tu ${t.trainCount||0} lần | 💥 ĐP ${t.totalBreakSuccess||0} lần
   👹 Boss: ${t.bossKills||0} con`,
        threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  INFO NGƯỜI KHÁC (ngắn gọn)
    // ─────────────────────────────────────────────────────────
    if (cmd === "info") {
        let targetID = Object.keys(mentions)[0];
        if (!targetID && messageReply) targetID = messageReply.senderID;
        if (!targetID) return api.sendMessage("⚠️ Hãy tag hoặc reply người muốn xem thông tin!", threadID, messageID);

        if (!data[targetID]) data[targetID] = initUser();
        const t = data[targetID];
        const tName = await Users.getNameUser(targetID);
        const realm  = getRealm(t.exp);
        const w = getWeapon(t.weapon);
        const a = getArmor(t.armor);
        const wr = (t.pkWins + t.pkLoss) > 0 ? Math.round(t.pkWins / (t.pkWins + t.pkLoss) * 100) : 0;

        return api.sendMessage(
`📋 ${tName}
${realm.color} ${realm.name} | ⚡ ${t.exp.toLocaleString()} EXP
⚔️ ${w.name} | 🛡️ ${a.name}
💎 ${t.coin.toLocaleString()} linh thạch
🏆 PK ${t.pkWins}W/${t.pkLoss}L (${wr}%)
👹 Boss hạ: ${t.bossKills||0} con`,
        threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  TU LUYỆN
    // ─────────────────────────────────────────────────────────
    if (cmd === "train") {
        const CD = 60_000;
        const remain = CD - (now - (user.lastTrain || 0));
        if (remain > 0) {
            const s = Math.ceil(remain / 1000);
            const quip = s > 30
                ? `Bình tĩnh ngồi uống trà đợi ${s}s đi nào!`
                : `Sắp rồi! Còn ${s}s nữa thôi, nhịn được!`;
            return api.sendMessage(`⏱️ ${quip}`, threadID, messageID);
        }

        const realm  = getRealm(user.exp);
        const mult   = 1 + realm.stage * 0.12;
        let   gain   = Math.floor((Math.random() * 55 + 30) * mult);
        const coin   = Math.floor(Math.random() * 30 + 10);

        // Streak bonus
        const today = todayKey();
        if (user.lastTrainDay !== today) {
            if (user.lastTrainDay) {
                const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
                const yKey = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
                user.streakTrain = (user.lastTrainDay === yKey) ? (user.streakTrain || 0) + 1 : 1;
            } else {
                user.streakTrain = 1;
            }
            user.lastTrainDay = today;
        }

        // Thiên kiếp ngẫu nhiên
        let kiepMsg = "";
        for (const kiep of HEAVENLY_TRIBULATIONS) {
            if (Math.random() < kiep.chance) {
                gain = Math.floor(gain * (1 + kiep.expMult));
                if (gain < 0) gain = 0;
                kiepMsg = `\n\n🌀 ${kiep.name}: ${kiep.msg}`;
                break;
            }
        }

        user.exp  += gain;
        user.coin += coin;
        user.lastTrain  = now;
        user.trainCount = (user.trainCount || 0) + 1;
        addQuestProgress(user, "train");
        saveData(data);

        const newRealm = getRealm(user.exp);
        let levelUpMsg = "";
        if (newRealm.stage > realm.stage) {
            levelUpMsg = `\n\n🎊 ĐỘT NHIÊN THĂNG CẤP!\n${realm.color} ${realm.name} ➜ ${newRealm.color} ${newRealm.name}\nDanh hiệu mới: ${newRealm.title}`;
            user.title = newRealm.title;
        }

        const streakBonus = user.streakTrain > 3 ? `\n🔥 Streak ${user.streakTrain} ngày (+10% thưởng)` : "";

        return api.sendMessage(
`🧘 ${randomComment(TRAIN_COMMENTS)}

⚡ +${gain.toLocaleString()} tu vi
💎 +${coin} linh thạch${kiepMsg}${streakBonus}${levelUpMsg}

📊 Tổng tu vi: ${user.exp.toLocaleString()} | 💎 ${user.coin.toLocaleString()}
🧘 Lần tu luyện thứ: ${user.trainCount}`,
        threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  ĐỘT PHÁ
    // ─────────────────────────────────────────────────────────
    if (cmd === "dotpha") {
        const current = getRealm(user.exp);
        const next    = getNextRealm(user.exp);

        if (!next) return api.sendMessage(
`✨ NGƯƠI ĐÃ LÀ TIÊN NHÂN VÔ THƯỢNG!
Không còn gì để đột phá nữa, chỉ còn hưởng thụ thôi 😌`,
        threadID, messageID);

        if (user.exp < next.exp) {
            const pct = Math.floor((user.exp - current.exp) / (next.exp - current.exp) * 100);
            return api.sendMessage(
`❌ Chưa đủ tu vi để đột phá!

${current.color} ${current.name}  →  ${next.color} ${next.name}
${bar(user.exp - current.exp, next.exp - current.exp)} ${pct}%
⚡ Cần thêm: ${(next.exp - user.exp).toLocaleString()} EXP nữa
💡 Về mà ngồi tu luyện thêm đi!`,
            threadID, messageID);
        }

        const successRate = Math.max(0.25, 0.78 - current.stage * 0.05);
        const success     = Math.random() < successRate;
        user.breakCount   = (user.breakCount || 0) + 1;

        // Kỹ năng Bất Diệt Kim Thân giảm mất tu vi
        const hasRevive = hasSkill(user, "s5");

        if (success) {
            user.totalBreakSuccess = (user.totalBreakSuccess || 0) + 1;
            user.title = next.title;
            addQuestProgress(user, "break");
            saveData(data);
            return api.sendMessage(
`🔥🔥🔥 ĐỘT PHÁ THÀNH CÔNG! 🔥🔥🔥

${current.color} ${current.name}
         ⬇️  LONG NGÂM HỔ TIẾU
${next.color} ${next.name}

✨ Danh hiệu mới: ${next.title}
💪 Sức mạnh tăng từ ${current.power} → ${next.power}
📊 Tu vi: ${user.exp.toLocaleString()} EXP
🎊 Thiên địa chứng kiến, cảnh giới mới thức tỉnh!`,
            threadID, messageID);
        } else {
            let loss = Math.floor(user.exp * 0.08);
            let reviveMsg = "";
            if (hasRevive && Math.random() < 0.5) {
                loss = 0;
                reviveMsg = "\n⚡ Bất Diệt Kim Thân kích hoạt! Không mất tu vi!";
            }
            user.exp = Math.max(current.exp, user.exp - loss);
            saveData(data);
            return api.sendMessage(
`💥 THIÊN KIẾP GIÁNG XUỐNG! ĐỘT PHÁ THẤT BẠI!

😭 Tẩu hỏa nhập ma rồi các ơi!
${loss > 0 ? `❌ Mất ${loss.toLocaleString()} tu vi` : ""}${reviveMsg}
📊 Tu vi còn lại: ${user.exp.toLocaleString()} EXP
💡 Xác suất thành công: ${Math.round(successRate * 100)}%
🔁 Thử lại sau khi tu luyện thêm!`,
            threadID, messageID);
        }
    }

    // ─────────────────────────────────────────────────────────
    //  PK
    // ─────────────────────────────────────────────────────────
    if (cmd === "pk") {
        let targetID = Object.keys(mentions)[0];
        if (!targetID && messageReply) targetID = messageReply.senderID;
        if (!targetID) return api.sendMessage("⚠️ Tag hoặc reply đối thủ để PK!", threadID, messageID);
        if (targetID == senderID) return api.sendMessage("🤡 Tự PK mình à? Đúng là thiên tài lệch lạc!", threadID, messageID);

        const CD = 90_000;
        const remain = CD - (now - (user.lastPK || 0));
        if (remain > 0) {
            return api.sendMessage(`⏱️ Còn ${Math.ceil(remain / 1000)}s mới PK lại được! Bình tĩnh đã nào!`, threadID, messageID);
        }

        if (!data[targetID]) data[targetID] = initUser();
        const enemy  = data[targetID];
        const uRealm = getRealm(user.exp);
        const eRealm = getRealm(enemy.exp);
        const uW     = getWeapon(user.weapon);
        const eW     = getWeapon(enemy.weapon);
        const uA     = getArmor(user.armor);
        const eA     = getArmor(enemy.armor);

        // Kỹ năng tấn công / phòng thủ
        const uAtkBonus  = getSkillVal(user, "atk") / 100;
        const eAtkBonus  = getSkillVal(enemy, "atk") / 100;
        const uDefBonus  = getSkillVal(user, "def") / 100;
        const eDefBonus  = getSkillVal(enemy, "def") / 100;

        let uPow = (uRealm.power + uW.power) * (1 + uAtkBonus) + (Math.random() * 12);
        let ePow = (eRealm.power + eW.power) * (1 + eAtkBonus) + (Math.random() * 12);

        // Chí mạng
        const uCrit = getSkillVal(user, "crit");
        const eCrit = getSkillVal(enemy, "crit");
        let uCritMsg = "", eCritMsg = "";
        if (uCrit > 0 && Math.random() * 100 < uCrit) { uPow *= 2; uCritMsg = " ⚡ CHÍ MẠNG!"; }
        if (eCrit > 0 && Math.random() * 100 < eCrit) { ePow *= 2; eCritMsg = " ⚡ CHÍ MẠNG!"; }

        const uDef = uA.defense * (1 + uDefBonus);
        const eDef = eA.defense * (1 + eDefBonus);
        const uScore = uPow - eDef * 0.3;
        const eScore = ePow - uDef * 0.3;

        const uName = await Users.getNameUser(senderID);
        const eName = await Users.getNameUser(targetID);
        user.lastPK = now;

        // Sinh động hóa trận đấu
        const rounds = [];
        for (let r = 0; r < 3; r++) {
            const actions = ["đánh thẳng vào mặt", "tung chiêu bí truyền", "né tránh rồi phản công",
                             "dùng linh lực ép đối phương", "tung chiêu tuyệt học"];
            rounds.push(`Hiệp ${r+1}: ${r % 2 === 0 ? uName : eName} ${randomComment(actions)}!`);
        }

        let msg = `╔════════════════════════╗\n║  ⚔️  GIAO PHONG PK  ⚔️  ║\n╚════════════════════════╝\n\n`;
        msg += `${uRealm.color} ${uName}\n  └ ${uRealm.name} | ATK ${uPow.toFixed(1)}${uCritMsg} | DEF ${uDef.toFixed(1)}\n\n`;
        msg += `⚔️  VS  ⚔️\n\n`;
        msg += `${eRealm.color} ${eName}\n  └ ${eRealm.name} | ATK ${ePow.toFixed(1)}${eCritMsg} | DEF ${eDef.toFixed(1)}\n\n`;
        msg += `─── DIỄN BIẾN ───\n${rounds.join("\n")}\n\n`;
        msg += `────────────────────────\n`;

        if (uScore >= eScore) {
            const base  = Math.floor(Math.random() * 30 + 20);
            let   steal = Math.min(Math.floor(Math.random() * 20 + 10), enemy.coin);
            const stealBonus = getSkillVal(user, "steal");
            steal = Math.floor(steal * (1 + stealBonus / 100));
            steal = Math.min(steal, enemy.coin);
            user.coin  += base + steal;
            enemy.coin -= steal;
            user.pkWins  = (user.pkWins || 0) + 1;
            enemy.pkLoss = (enemy.pkLoss || 0) + 1;
            addQuestProgress(user, "pkwin");
            saveData(data);
            msg += `🏆 ${uName} ĐẠI THẮNG!\n\n`;
            msg += `+${base} 💎 thưởng chiến đấu\n+${steal} 💎 cướp từ ${eName}\n\n`;
            msg += `💬 "${randomComment(PK_WIN_COMMENTS)}"`;
        } else {
            const base  = Math.floor(Math.random() * 30 + 20);
            let   steal = Math.min(Math.floor(Math.random() * 20 + 10), user.coin);
            const stealBonus = getSkillVal(enemy, "steal");
            steal = Math.floor(steal * (1 + stealBonus / 100));
            steal = Math.min(steal, user.coin);
            enemy.coin += base + steal;
            user.coin  -= steal;
            user.pkLoss  = (user.pkLoss || 0) + 1;
            enemy.pkWins = (enemy.pkWins || 0) + 1;
            addQuestProgress(enemy, "pkwin");
            saveData(data);
            msg += `💀 ${eName} CHIẾN THẮNG!\n\n`;
            msg += `-${steal} 💎 bị ${eName} cướp mất\n\n`;
            msg += `💬 "${randomComment(PK_LOSE_COMMENTS)}"`;
        }

        return api.sendMessage(msg, threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  BOSS THẾ GIỚI
    // ─────────────────────────────────────────────────────────
    if (cmd === "boss") {
        const bid  = (args[1] || "").toLowerCase();
        const boss = WORLD_BOSSES.find(b => b.id === bid);

        if (!bid) {
            let msg = `╔══════════════════════════╗\n║  👹 BOSS THẾ GIỚI 👹     ║\n╚══════════════════════════╝\n\n`;
            for (const b of WORLD_BOSSES) {
                const lastAttack = user.lastBoss[b.id] || 0;
                const cdLeft = Math.max(0, Math.ceil((3600000 - (now - lastAttack)) / 1000));
                const status = cdLeft > 0 ? `⏱️ CD: ${cdLeft}s` : "✅ Sẵn sàng";
                msg += `[${b.id}] 👹 ${b.name}\n   ❤️ ${b.hp} HP | Yêu cầu: ${b.minPower} chiến lực\n   🏆 ${b.expR} EXP + ${b.coinR} 💎 khi hạ\n   ${status}\n\n`;
            }
            msg += `Đánh: tutien boss <id>`;
            return api.sendMessage(msg, threadID, messageID);
        }

        if (!boss) return api.sendMessage("❌ Boss không tồn tại! Dùng tutien boss để xem danh sách.", threadID, messageID);

        const realm  = getRealm(user.exp);
        const weapon = getWeapon(user.weapon);
        const totalPow = realm.power + weapon.power;

        if (totalPow < boss.minPower) {
            return api.sendMessage(
`❌ Chiến lực không đủ để đánh boss này!
💪 Của ngươi: ${totalPow} | Yêu cầu: ${boss.minPower}
💡 Hãy nâng cấp cảnh giới và vũ khí trước!`,
            threadID, messageID);
        }

        const CD = 3600000; // 1 giờ
        const lastAttack = user.lastBoss[boss.id] || 0;
        const remain = CD - (now - lastAttack);
        if (remain > 0) {
            return api.sendMessage(`⏱️ Boss ${boss.name} đang hồi phục! Còn ${Math.ceil(remain/60000)} phút nữa.`, threadID, messageID);
        }

        const successChance = Math.min(0.9, 0.4 + (totalPow / boss.minPower) * 0.3);
        const success = Math.random() < successChance;
        user.lastBoss[boss.id] = now;
        addQuestProgress(user, "boss");

        if (success) {
            user.exp  += boss.expR;
            user.coin += boss.coinR;
            user.bossKills = (user.bossKills || 0) + 1;
            saveData(data);
            return api.sendMessage(
`⚔️ BOSS THẢM BẠI! ⚔️

👹 ${boss.name} đã bị ngươi hạ gục!

⚡ +${boss.expR.toLocaleString()} tu vi
💎 +${boss.coinR.toLocaleString()} linh thạch
👹 Tổng boss đã hạ: ${user.bossKills}

📊 Tu vi: ${user.exp.toLocaleString()} | 💎 ${user.coin.toLocaleString()}`,
            threadID, messageID);
        } else {
            const expLoss = Math.floor(user.exp * 0.03);
            user.exp = Math.max(0, user.exp - expLoss);
            saveData(data);
            return api.sendMessage(
`💀 THẢM BẠI TRƯỚC BOSS!

👹 ${boss.name} quá mạnh, ngươi bị đánh lui!
❌ Mất ${expLoss.toLocaleString()} tu vi
💡 Nâng cấp thêm rồi quay lại!
📊 Tu vi còn: ${user.exp.toLocaleString()}`,
            threadID, messageID);
        }
    }

    // ─────────────────────────────────────────────────────────
    //  SHOP
    // ─────────────────────────────────────────────────────────
    if (cmd === "shop") {
        const sub = (args[1] || "").toLowerCase();

        if (!sub) {
            return api.sendMessage(
`╔══════════════════════════╗
║    🏪 CỬA HÀNG TU TIÊN   ║
╚══════════════════════════╝

  tutien shop vukhi    → ⚔️  Vũ khí
  tutien shop giapcap  → 🛡️  Giáp cáp
  tutien shop dan      → 💊 Linh đan
  tutien skillshop     → ⚡ Kỹ năng

💡 Sau khi mua vũ khí/giáp cần equip mới dùng được!`,
            threadID, messageID);
        }

        if (sub === "vukhi") {
            let msg = `╔══════════════════════════╗\n║   ⚔️  CỬA HÀNG VŨ KHÍ   ║\n╚══════════════════════════╝\n\n`;
            for (const w of WEAPONS) {
                const owned = (user.inventory.weapons || []).includes(w.id) ? " ✅ Đã có" : "";
                msg += `[${w.id}] ${w.name} ${w.rarity}${owned}\n   💪 +${w.power} sức mạnh | 💎 ${w.price.toLocaleString()}\n   📝 ${w.desc}\n\n`;
            }
            msg += `🛒 Mua: tutien buy vukhi <id>`;
            return api.sendMessage(msg, threadID, messageID);
        }

        if (sub === "giapcap") {
            let msg = `╔══════════════════════════╗\n║  🛡️  CỬA HÀNG GIÁP CÁP  ║\n╚══════════════════════════╝\n\n`;
            for (const a of ARMORS) {
                const owned = (user.inventory.armors || []).includes(a.id) ? " ✅ Đã có" : "";
                msg += `[${a.id}] ${a.name} ${a.rarity}${owned}\n   🛡️ +${a.defense} phòng thủ | 💎 ${a.price.toLocaleString()}\n   📝 ${a.desc}\n\n`;
            }
            msg += `🛒 Mua: tutien buy giapcap <id>`;
            return api.sendMessage(msg, threadID, messageID);
        }

        if (sub === "dan") {
            let msg = `╔══════════════════════════╗\n║   💊  CỬA HÀNG LINH ĐAN  ║\n╚══════════════════════════╝\n\n`;
            for (const p of PILLS) {
                const inBag = (user.inventory.pills || {})[p.id] || 0;
                msg += `[${p.id}] ${p.name}${inBag > 0 ? ` (Túi: ${inBag})` : ""}\n   📝 ${p.desc}\n   💎 ${p.price.toLocaleString()}\n\n`;
            }
            msg += `🛒 Mua: tutien buy dan <id>\n💡 Dùng: tutien use dan <id>`;
            return api.sendMessage(msg, threadID, messageID);
        }

        return api.sendMessage("⚠️ Loại shop không hợp lệ! Thử: vukhi / giapcap / dan", threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  SHOP KỸ NĂNG
    // ─────────────────────────────────────────────────────────
    if (cmd === "skillshop") {
        let msg = `╔══════════════════════════╗\n║   ⚡  SHOP KỸ NĂNG THỤ ĐỘNG  ⚡  ║\n╚══════════════════════════╝\n\n`;
        for (const sk of SKILLS) {
            const owned = hasSkill(user, sk.id);
            const realm = getRealm(user.exp);
            const canLearn = realm.stage >= sk.req;
            msg += `[${sk.id}] ${sk.name}${owned ? " ✅ Đã học" : ""}\n   📝 ${sk.desc}\n   💎 ${sk.price.toLocaleString()} | Yêu cầu: ${sk.req > 0 ? REALMS[sk.req].name : "Không"} ${canLearn ? "" : "❌"}\n\n`;
        }
        msg += `🛒 Mua: tutien buy skill <id>`;
        return api.sendMessage(msg, threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  XEM KỸ NĂNG
    // ─────────────────────────────────────────────────────────
    if (cmd === "skills") {
        if (!user.skills || user.skills.length === 0) {
            return api.sendMessage("⚡ Ngươi chưa học kỹ năng nào!\nDùng tutien skillshop để xem và mua.", threadID, messageID);
        }
        let msg = `⚡ KỸ NĂNG CỦA NGƯƠI:\n\n`;
        for (const sid of user.skills) {
            const sk = SKILLS.find(s => s.id === sid);
            if (sk) msg += `✅ ${sk.name}\n   ${sk.desc}\n\n`;
        }
        return api.sendMessage(msg, threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  MUA ĐỒ
    // ─────────────────────────────────────────────────────────
    if (cmd === "buy") {
        const type = (args[1] || "").toLowerCase();
        const id   = (args[2] || "").toLowerCase();

        if (type === "vukhi") {
            const item = WEAPONS.find(w => w.id === id);
            if (!item) return api.sendMessage("❌ Vũ khí không tồn tại! Dùng tutien shop vukhi.", threadID, messageID);
            if (user.coin < item.price) return api.sendMessage(`❌ Thiếu linh thạch! Cần ${item.price.toLocaleString()} 💎, có ${user.coin.toLocaleString()} 💎`, threadID, messageID);
            if ((user.inventory.weapons || []).includes(id)) return api.sendMessage(`💡 Ngươi đã sở hữu ${item.name} rồi!`, threadID, messageID);
            user.coin -= item.price;
            user.inventory.weapons = user.inventory.weapons || [];
            user.inventory.weapons.push(id);
            saveData(data);
            return api.sendMessage(
`✅ Mua thành công ${item.name}!
⚔️ Sức mạnh: +${item.power} | ${item.rarity}
💎 Còn lại: ${user.coin.toLocaleString()}
💡 Trang bị: tutien equip vukhi ${id}`,
            threadID, messageID);
        }

        if (type === "giapcap") {
            const item = ARMORS.find(a => a.id === id);
            if (!item) return api.sendMessage("❌ Giáp không tồn tại! Dùng tutien shop giapcap.", threadID, messageID);
            if (user.coin < item.price) return api.sendMessage(`❌ Thiếu linh thạch! Cần ${item.price.toLocaleString()} 💎`, threadID, messageID);
            if ((user.inventory.armors || []).includes(id)) return api.sendMessage(`💡 Ngươi đã có ${item.name} rồi!`, threadID, messageID);
            user.coin -= item.price;
            user.inventory.armors = user.inventory.armors || [];
            user.inventory.armors.push(id);
            saveData(data);
            return api.sendMessage(
`✅ Mua thành công ${item.name}!
🛡️ Phòng thủ: +${item.defense} | ${item.rarity}
💎 Còn lại: ${user.coin.toLocaleString()}
💡 Trang bị: tutien equip giapcap ${id}`,
            threadID, messageID);
        }

        if (type === "dan") {
            const item = PILLS.find(p => p.id === id);
            if (!item) return api.sendMessage("❌ Linh đan không tồn tại! Dùng tutien shop dan.", threadID, messageID);
            if (user.coin < item.price) return api.sendMessage(`❌ Thiếu linh thạch! Cần ${item.price.toLocaleString()} 💎`, threadID, messageID);
            user.coin -= item.price;
            if (!user.inventory.pills) user.inventory.pills = {};
            user.inventory.pills[id] = (user.inventory.pills[id] || 0) + 1;
            addQuestProgress(user, "buypill");
            saveData(data);
            return api.sendMessage(
`✅ Mua ${item.name} thành công!
💊 Trong túi: x${user.inventory.pills[id]}
💎 Còn lại: ${user.coin.toLocaleString()}
💡 Dùng: tutien use dan ${id}`,
            threadID, messageID);
        }

        if (type === "skill") {
            const sk = SKILLS.find(s => s.id === id);
            if (!sk) return api.sendMessage("❌ Kỹ năng không tồn tại! Dùng tutien skillshop.", threadID, messageID);
            if (hasSkill(user, id)) return api.sendMessage("💡 Ngươi đã học kỹ năng này rồi!", threadID, messageID);
            const realm = getRealm(user.exp);
            if (realm.stage < sk.req) return api.sendMessage(`❌ Cần đạt ${REALMS[sk.req].name} mới học được kỹ năng này!`, threadID, messageID);
            if (user.coin < sk.price) return api.sendMessage(`❌ Thiếu linh thạch! Cần ${sk.price.toLocaleString()} 💎`, threadID, messageID);
            user.coin -= sk.price;
            user.skills.push(id);
            saveData(data);
            return api.sendMessage(
`⚡ Học thành công kỹ năng ${sk.name}!
📝 ${sk.desc}
💎 Còn lại: ${user.coin.toLocaleString()}`,
            threadID, messageID);
        }

        return api.sendMessage("⚠️ Loại không hợp lệ! Dùng: vukhi / giapcap / dan / skill", threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  DÙNG VẬT PHẨM
    // ─────────────────────────────────────────────────────────
    if (cmd === "use") {
        const type = (args[1] || "").toLowerCase();
        const id   = (args[2] || "").toLowerCase();

        if (type === "dan") {
            const item = PILLS.find(p => p.id === id);
            if (!item) return api.sendMessage("❌ Linh đan không tồn tại!", threadID, messageID);
            if (!user.inventory.pills) user.inventory.pills = {};
            if (!user.inventory.pills[id] || user.inventory.pills[id] <= 0) {
                return api.sendMessage(`❌ Không có ${item.name} trong túi! Mua: tutien buy dan ${id}`, threadID, messageID);
            }
            user.inventory.pills[id]--;
            if (user.inventory.pills[id] <= 0) delete user.inventory.pills[id];
            user.exp  += item.exp;
            user.coin += item.coin;
            saveData(data);
            return api.sendMessage(
`💊 Uống ${item.name} thành công!
${item.exp  > 0 ? `⚡ +${item.exp.toLocaleString()} tu vi\n` : ""}${item.coin > 0 ? `💎 +${item.coin.toLocaleString()} linh thạch\n` : ""}
📊 Tu vi: ${user.exp.toLocaleString()} | 💎 ${user.coin.toLocaleString()}
💊 Còn trong túi: ${user.inventory.pills[id] || 0}`,
            threadID, messageID);
        }

        return api.sendMessage("⚠️ Loại không hợp lệ! Dùng: tutien use dan <id>", threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  TÚI ĐỒ
    // ─────────────────────────────────────────────────────────
    if (cmd === "bag") {
        const wNames = (user.inventory.weapons || []).map(id => {
            const w = getWeapon(id); return `${w.name}${user.weapon === id ? " ⭐" : ""}`;
        });
        const aNames = (user.inventory.armors || []).map(id => {
            const a = getArmor(id); return `${a.name}${user.armor === id ? " ⭐" : ""}`;
        });
        const pillList = Object.entries(user.inventory.pills || {}).map(([pid, cnt]) => {
            const p = PILLS.find(x => x.id === pid);
            return p ? `${p.name} x${cnt}` : `${pid} x${cnt}`;
        });

        return api.sendMessage(
`╔══════════════════════════╗
║   🎒 TÚI ĐỒ CỦA NGƯƠI   ║
╚══════════════════════════╝

⚔️ Vũ khí:
  ${wNames.length ? wNames.join("\n  ") : "— Trống không —"}

🛡️ Giáp cáp:
  ${aNames.length ? aNames.join("\n  ") : "— Trống không —"}

💊 Linh đan:
  ${pillList.length ? pillList.join("\n  ") : "— Trống không —"}

⭐ = Đang trang bị
💡 Equip: tutien equip vukhi/giapcap <id>`,
        threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  TRANG BỊ
    // ─────────────────────────────────────────────────────────
    if (cmd === "equip") {
        const type = (args[1] || "").toLowerCase();
        const id   = (args[2] || "").toLowerCase();

        if (type === "vukhi") {
            const item = WEAPONS.find(w => w.id === id);
            if (!item) return api.sendMessage("❌ Vũ khí không tồn tại!", threadID, messageID);
            if (!(user.inventory.weapons || []).includes(id)) return api.sendMessage(`❌ Chưa sở hữu ${item.name}! Mua trước đã.`, threadID, messageID);
            user.weapon = id;
            saveData(data);
            return api.sendMessage(`⚔️ Đã trang bị ${item.name}!\n💪 +${item.power} sức mạnh | ${item.rarity}\n💬 "Trông ngầu hơn hẳn rồi!"`, threadID, messageID);
        }

        if (type === "giapcap") {
            const item = ARMORS.find(a => a.id === id);
            if (!item) return api.sendMessage("❌ Giáp không tồn tại!", threadID, messageID);
            if (!(user.inventory.armors || []).includes(id)) return api.sendMessage(`❌ Chưa sở hữu ${item.name}! Mua trước đã.`, threadID, messageID);
            user.armor = id;
            saveData(data);
            return api.sendMessage(`🛡️ Đã trang bị ${item.name}!\n🛡️ +${item.defense} phòng thủ | ${item.rarity}\n💬 "Kiên cố như thành đồng!"`, threadID, messageID);
        }

        return api.sendMessage("⚠️ Loại không hợp lệ! Dùng: vukhi / giapcap", threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  TẶNG LINH THẠCH
    // ─────────────────────────────────────────────────────────
    if (cmd === "gift") {
        let targetID = Object.keys(mentions)[0];
        if (!targetID && messageReply) targetID = messageReply.senderID;
        if (!targetID) return api.sendMessage("⚠️ Tag hoặc reply người muốn tặng linh thạch!", threadID, messageID);
        if (targetID == senderID) return api.sendMessage("🤡 Tặng cho chính mình à? Sáng tạo đấy!", threadID, messageID);

        const amount = parseInt(args[Object.keys(mentions).length > 0 ? 2 : 2] || args[1] || "0");
        if (isNaN(amount) || amount <= 0) return api.sendMessage("⚠️ Số lượng không hợp lệ! Ví dụ: tutien gift @tag 100", threadID, messageID);
        if (user.coin < amount) return api.sendMessage(`❌ Không đủ linh thạch! Có ${user.coin.toLocaleString()}, muốn tặng ${amount.toLocaleString()}`, threadID, messageID);

        if (!data[targetID]) data[targetID] = initUser();
        const receiver = data[targetID];
        const rName    = await Users.getNameUser(targetID);
        const sName    = await Users.getNameUser(senderID);

        user.coin     -= amount;
        receiver.coin += amount;
        saveData(data);

        return api.sendMessage(
`🎁 ${sName} đã tặng ${amount.toLocaleString()} 💎 cho ${rName}!

💬 "Hào phóng như vậy, chắc có mưu đồ gì đây?"

💎 ${sName} còn lại: ${user.coin.toLocaleString()}
💎 ${rName} hiện có: ${receiver.coin.toLocaleString()}`,
        threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  ĐỔI DANH HIỆU
    // ─────────────────────────────────────────────────────────
    if (cmd === "title") {
        const realm = getRealm(user.exp);
        let msg = `🏷️ DANH HIỆU KHẢ DỤNG (đã mở khóa theo cảnh giới):\n\n`;
        for (let i = 0; i <= realm.stage; i++) {
            const r = REALMS[i];
            msg += `${r.color} ${r.title}${user.title === r.title ? " ← đang dùng" : ""}\n`;
        }
        msg += `\n💡 Ngươi hiện ở ${realm.name} – có thể dùng bất kỳ danh hiệu từ ${REALMS[0].name} đến ${realm.name}.`;
        msg += `\n✍️ Gõ: tutien settitle <tên> để đặt danh hiệu tùy chỉnh (tối đa 20 ký tự).`;
        return api.sendMessage(msg, threadID, messageID);
    }

    if (cmd === "settitle") {
        const newTitle = args.slice(1).join(" ").trim();
        if (!newTitle) return api.sendMessage("⚠️ Hãy nhập tên danh hiệu! Ví dụ: tutien settitle Kiếm Thần Vô Song", threadID, messageID);
        if (newTitle.length > 25) return api.sendMessage("❌ Danh hiệu quá dài! Tối đa 25 ký tự thôi.", threadID, messageID);
        user.title = newTitle;
        saveData(data);
        return api.sendMessage(`✅ Đặt danh hiệu thành công!\n🏷️ Danh hiệu mới: ${newTitle}`, threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  NHIỆM VỤ HẰNG NGÀY
    // ─────────────────────────────────────────────────────────
    if (cmd === "quest") {
        initQuestProgress(user);
        let msg = `╔══════════════════════════╗\n║   📋 NHIỆM VỤ HẰNG NGÀY  ║\n╚══════════════════════════╝\n\n`;
        let doneCount = 0;

        for (const q of DAILY_QUESTS) {
            const prog    = user.questProgress[q.id] || 0;
            const claimed = user.questProgress[`claimed_${q.id}`];
            const done    = prog >= q.need;
            if (done) doneCount++;

            const status = claimed ? "✅ Đã nhận"
                         : done    ? `🎁 Hoàn thành! → tutien claim ${q.id}`
                         :           `${prog}/${q.need}`;

            msg += `[${q.id}] ${q.name}\n   ${bar(Math.min(prog, q.need), q.need, 8)}  ${status}\n   🏆 +${q.expR} EXP, +${q.coinR} 💎\n\n`;
        }

        msg += `📊 Đã hoàn thành: ${doneCount}/${DAILY_QUESTS.length} nhiệm vụ hôm nay`;
        return api.sendMessage(msg, threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  CLAIM NHIỆM VỤ
    // ─────────────────────────────────────────────────────────
    if (cmd === "claim") {
        const qid = (args[1] || "").toLowerCase();
        const q   = DAILY_QUESTS.find(x => x.id === qid);
        if (!q) return api.sendMessage("❌ Mã nhiệm vụ sai rồi! Dùng tutien quest để xem.", threadID, messageID);

        initQuestProgress(user);
        if (user.questProgress[`claimed_${qid}`]) return api.sendMessage("✅ Đã nhận thưởng nhiệm vụ này hôm nay rồi!", threadID, messageID);

        const prog = user.questProgress[qid] || 0;
        if (prog < q.need) return api.sendMessage(`❌ Chưa xong nhiệm vụ này! Tiến độ: ${prog}/${q.need}`, threadID, messageID);

        user.exp  += q.expR;
        user.coin += q.coinR;
        user.questProgress[`claimed_${qid}`] = true;
        saveData(data);

        return api.sendMessage(
`🎊 NHẬN THƯỞNG THÀNH CÔNG!
📋 ${q.name}

⚡ +${q.expR.toLocaleString()} tu vi
💎 +${q.coinR} linh thạch

📊 Tu vi: ${user.exp.toLocaleString()} | 💎 ${user.coin.toLocaleString()}
💬 "Cố gắng mà được thưởng, ngon lành chưa!"`,
        threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  BẢNG XẾP HẠNG
    // ─────────────────────────────────────────────────────────
    if (cmd === "top") {
        const arr = Object.keys(data)
            .map(id => ({ id, exp: data[id].exp || 0 }))
            .sort((a, b) => b.exp - a.exp)
            .slice(0, 10);

        const medals = ["🥇", "🥈", "🥉"];
        let msg = `╔══════════════════════════╗\n║  🏆  BẢNG XẾP HẠNG  🏆   ║\n╚══════════════════════════╝\n\n`;

        for (let i = 0; i < arr.length; i++) {
            const name  = await Users.getNameUser(arr[i].id);
            const realm = getRealm(arr[i].exp);
            const icon  = medals[i] || `${i + 1}.`;
            const isSelf = arr[i].id === senderID ? " ← ngươi" : "";
            msg += `${icon} ${name}${isSelf}\n   ${realm.color} ${realm.name} | ⚡ ${arr[i].exp.toLocaleString()} EXP\n\n`;
        }

        msg += `💡 Tiếp tục tu luyện để leo bảng xếp hạng!`;
        return api.sendMessage(msg, threadID, messageID);
    }

    // ─────────────────────────────────────────────────────────
    //  LỆNH KHÔNG HỢP LỆ
    // ─────────────────────────────────────────────────────────
    return api.sendMessage(
`❓ Lệnh "${cmd}" không tồn tại!
💡 Dùng: tutien help để xem danh sách lệnh.`,
    threadID, messageID);
};
