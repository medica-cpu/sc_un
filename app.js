(() => {
"use strict";
const $ = id => document.getElementById(id);
const imageAsset = name => (window.EH_SR90_MEDIA && window.EH_SR90_MEDIA[name]) || new URL(`./assets/${name}`, document.baseURI).href;
const DAY_NAMES=["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"];
const LONG_DAYS=["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
const DEVICES={
  panasonic:{label:"Panasonic VITALIFT EH-SR90",chip:"PANASONIC · EH-SR90"},
  nanoskin:{label:"ReadySkin nanoSkin",chip:"READYSKIN · NANOSKIN"}
};
const MODE={
  lift:{label:"RF × EMS LIFT",tag:"RF",minutes:6,symbol:"RF",subtitle:"Лифтинг и мышечная стимуляция",kind:"rf"},
  pump:{label:"RF PUMP",tag:"RF",minutes:6,symbol:"RF",subtitle:"Радиочастотный уход",kind:"rf"},
  eye:{label:"EYE CARE",tag:"EYE",minutes:2,symbol:"EYE",subtitle:"Уход за областью вокруг глаз",kind:"eye"},
  nano_clean:{label:"Cleansing",tag:"CLEAN",minutes:3,symbol:"C",subtitle:"Гальваническое очищение",kind:"nano-clean"},
  nano_nourish:{label:"Nourishing",tag:"УХОД",minutes:3,symbol:"N",subtitle:"Питание и увлажнение с электропорацией",kind:"nano-nourish"},
  nano_rf:{label:"RF",tag:"RF",minutes:3,symbol:"RF",subtitle:"Активация коллагена",kind:"rf"},
  nano_massaging:{label:"Massaging · RF + EMS",tag:"RF + EMS",minutes:3,symbol:"EMS",subtitle:"Радиочастотный уход и электростимуляция мышц",kind:"nano-massage"},
  rest:{label:"Восстановление",tag:"УХОД",minutes:0,symbol:"✧",subtitle:"Ежедневный уход без специального режима",kind:"rest"}
};
const DAILY_COMPLIMENTS=['Твоя улыбка умеет делать день светлее.', 'В тебе удивительно красиво сочетаются нежность и сила.', 'Твоя доброта — настоящее украшение.', 'Ты заслуживаешь самого бережного отношения к себе.', 'В твоём присутствии становится теплее.', 'Твоя естественность — твоя особенная прелесть.', 'Ты умеешь находить красоту в простых моментах.', 'Твоя внутренняя гармония заметна даже в мелочах.', 'Ты прекрасна не только в особенные дни, но и в обычные.', 'Твоя искренность делает тебя особенной.', 'В тебе есть тихое очарование, которое запоминается.', 'Ты достойна заботы не за достижения, а просто потому, что ты есть.', 'Твоя улыбка — маленькое чудо этого дня.', 'Ты умеешь вдохновлять своим примером.', 'Твоя мягкость совсем не отменяет твою силу.', 'У тебя замечательный вкус к жизни.', 'Ты заслуживаешь времени, которое посвящаешь себе.', 'Твоё спокойствие — очень красивое качество.', 'Ты умеешь делать мир вокруг чуть добрее.', 'В тебе есть особая элегантность — в словах и поступках.', 'Твоя любознательность делает тебя ещё интереснее.', 'Ты прекрасна своей неповторимостью.', 'Твоя забота о себе — достойный повод для гордости.', 'Ты умеешь замечать детали, которые другие пропускают.', 'В тебе много света, даже когда день непростой.', 'Твоя уверенность растёт с каждым добрым выбором в свою пользу.', 'Ты заслуживаешь комплиментов и без всякого повода.', 'Твоя нежность к миру начинается с нежности к себе.', 'Ты умеешь сочетать рассудительность и лёгкость.', 'Твоё чувство юмора — отдельное очарование.', 'Ты гораздо сильнее, чем иногда думаешь.', 'Твоя индивидуальность — твоя настоящая изюминка.', 'Ты умеешь превращать заботу в красивый ритуал.', 'В тебе есть редкое качество — быть собой без лишнего шума.', 'Твоя энергия способна вдохновлять.', 'Ты достойна красивых слов, тёплых встреч и спокойных вечеров.', 'Твоя внимательность к близким очень ценна.', 'Ты умеешь быть опорой и при этом оставаться нежной.', 'Твоя улыбка — прекрасный аксессуар на каждый день.', 'Ты достойна того, чтобы выбирать себя без чувства вины.', 'В тебе есть благородство, которое не нуждается в доказательствах.', 'Ты умеешь создавать вокруг себя уют.', 'Твоя смелость проявляется даже в маленьких шагах.', 'Ты интересная, глубокая и по-своему волшебная.', 'Твоя доброжелательность делает встречи приятнее.', 'Ты заслуживаешь отдыха так же, как и успеха.', 'В тебе красиво сочетаются ум, чувство меры и обаяние.', 'Ты умеешь начинать заново — и это большая сила.', 'Твоя открытость миру делает жизнь ярче.', 'Ты достойна любви, уважения и бережного отношения.', 'У тебя есть свой неповторимый стиль — и в нём твоя прелесть.', 'Твоя деликатность — настоящее искусство.', 'Ты умеешь вдохновлять не словами, а самим отношением к жизни.', 'Твои маленькие победы тоже заслуживают праздника.', 'В тебе есть особенная женственность без всяких правил.', 'Ты прекрасна, когда смеёшься, мечтаешь и остаёшься собой.', 'Твоя внимательность к себе — проявление мудрости.', 'Ты умеешь привносить тепло даже в обычный разговор.', 'Твоя сила может быть спокойной — и от этого не становится меньше.', 'Ты заслуживаешь дня, в котором будет место только приятному.', 'В тебе есть лёгкость, которая располагает к себе.', 'Ты умеешь видеть возможности там, где другие видят препятствия.', 'Твоё мнение важно, а твой голос достоин быть услышанным.', 'Ты достойна гордиться тем, какой путь уже прошла.', 'Твоя чуткость — красивое и редкое качество.', 'Ты умеешь быть сильной и просить о поддержке — это тоже сила.', 'В тебе есть очарование, которое не зависит от настроения.', 'Ты заслуживаешь нежности в каждом дне.', 'Твоя способность радоваться мелочам делает жизнь богаче.', 'Ты умеешь выбирать то, что приносит тебе спокойствие.', 'Твоя искра чувствуется даже через экран.', 'Ты красива своей историей, характером и мечтами.', 'Твой интерес к новому делает тебя ещё ярче.', 'Ты достойна пространства для своих желаний.', 'Твоя улыбка умеет поддержать лучше многих слов.', 'В тебе есть удивительное сочетание практичности и мечтательности.', 'Ты умеешь создавать красоту вокруг себя.', 'Твои старания имеют значение, даже если их никто не заметил.', 'Ты заслуживаешь говорить с собой так же ласково, как с подругой.', 'Твоя самостоятельность вызывает уважение.', 'Ты прекрасна не по чьим-то меркам, а по праву быть собой.', 'В тебе есть спокойная уверенность, которая притягивает.', 'Ты умеешь делать выбор в пользу своего благополучия.', 'Твоя душевная щедрость делает мир добрее.', 'Ты можешь гордиться своей стойкостью.', 'Твоя способность учиться и меняться восхищает.', 'Ты заслуживаешь приятных сюрпризов и добрых новостей.', 'В тебе есть лёгкость, которая делает даже будни особенными.', 'Ты умеешь быть внимательной, не забывая о себе.', 'Твоё присутствие может стать чьим-то счастливым моментом.', 'Ты достойна любви без условий и заботы без напоминаний.', 'Твоя внутренняя красота проявляется в каждом добром поступке.', 'Ты умеешь сохранять достоинство и тепло одновременно.', 'Твоя способность мечтать — прекрасный источник энергии.', 'Ты заслуживаешь самого красивого отношения — в том числе от себя.', 'В тебе есть талант превращать обычное в особенное.', 'Ты умеешь находить свой темп — и это мудро.', 'Твоя честность с собой заслуживает уважения.', 'Ты прекрасна в своём собственном ритме.', 'Ты уже достаточно хороша — сегодня не нужно ничего доказывать.', 'Пусть сегодня ты увидишь в себе столько же хорошего, сколько видят близкие.', 'Ты — прекрасная причина сделать этот вечер чуть нежнее.'];
const DEFAULT_PLAN=["lift","rest","eye","rest","pump","rest","eye"];
// Стартовая двухнедельная программа nanoSkin: каждый основной режим 1 раз в неделю.
const DEFAULT_NANOSKIN_PLAN=["nano_clean","rest","nano_nourish","rest","nano_rf","rest","nano_massaging"];
const PANASONIC_PRODUCTS={clean:"Sesderma SENSYSES Classic",moist:"Sesderma C-VIT5",lift:"Panasonic EH-4R06",pump:"Сыворотка или эмульсия по инструкции Panasonic",eye:"MT Metatron B5 Contour"};
const NANOSKIN_PRODUCTS={clean:"Мицеллярная вода или очищающий лосьон на водной основе",nourish:"Сыворотка или эссенция, подходящая для электропорации",contactGel:"Контактный гель для аппаратных процедур (например, RS Care Lifting Gel)"};
const DEFAULT={version:28,device:"panasonic",profiles:{panasonic:{plan:DEFAULT_PLAN,products:PANASONIC_PRODUCTS},nanoskin:{plan:DEFAULT_NANOSKIN_PLAN,products:NANOSKIN_PRODUCTS}},plan:DEFAULT_PLAN,completed:{},stepChecks:{},notes:{},time:"21:00",eveningReminder:true,specialReminder:true,soundEnabled:true,products:PANASONIC_PRODUCTS,goal:{name:"",date:""},lastNotification:"",complimentDate:"",complimentIndex:-1};
const STORAGE="ehsr90-readyskin-dual-v1";
function migrateNotes(raw,fromDevice="panasonic"){
  const notes={...(raw||{})};
  for(const [key,value] of Object.entries(notes))if(/^\d{4}-\d{2}-\d{2}$/.test(key)){
    notes[`${fromDevice}|${key}`]=notes[`${fromDevice}|${key}`]||value;
    delete notes[key];
  }
  return notes;
} // отдельное хранилище копии с двумя аппаратами; старый Panasonic-ключ читается только для однократного переноса
let data=loadData();
let currentScreen="today";
let selectedDay=(new Date().getDay()+6)%7;
let todayDetailsOpen=true;
let selectedHistoryDate=localDateKey(new Date());
let monthCursor=new Date(new Date().getFullYear(),new Date().getMonth(),1,12);
let guideSteps=[],guideIndex=0,guideRemaining=0,guideInterval=null,guideRunning=false,guideEndsAt=null;
let reminderInterval=null,toastTimer=null,audioContext=null;
let videoIndex=0,photoIndex=0,photoItems=[],cleanIndex=0,gestureStart=null;

function clone(obj){return JSON.parse(JSON.stringify(obj));}
function loadData(){
  try{
    const raw=localStorage.getItem(STORAGE);
    if(raw){
      const parsed=JSON.parse(raw);
      const device=parsed.device==="nanoskin"?"nanoskin":"panasonic";
      const defaultPlan=device==="nanoskin"?DEFAULT_NANOSKIN_PLAN:DEFAULT_PLAN;
      const valid=(plan,d)=>Array.isArray(plan)&&plan.length===7&&plan.every(x=>d==="nanoskin"?["rest","nano_clean","nano_nourish","nano_rf","nano_massaging"].includes(x):["rest","lift","pump","eye"].includes(x));
      const oldPanasonicPlan=valid(parsed.plan,"panasonic")?parsed.plan:DEFAULT_PLAN;
      const profiles={
        panasonic:{plan:valid(parsed.profiles?.panasonic?.plan,"panasonic")?parsed.profiles.panasonic.plan:oldPanasonicPlan,products:{...PANASONIC_PRODUCTS,...(parsed.profiles?.panasonic?.products||((device==="panasonic")?parsed.products:null)||{})}},
        nanoskin:{plan:valid(parsed.profiles?.nanoskin?.plan,"nanoskin")?parsed.profiles.nanoskin.plan:DEFAULT_NANOSKIN_PLAN,products:{...NANOSKIN_PRODUCTS,...(parsed.profiles?.nanoskin?.products||((device==="nanoskin")?parsed.products:null)||{})}}
      };
      // При миграции старой версии все прежние отметки относятся к Panasonic.
      const completed={...(parsed.completed||{})},stepChecks={...(parsed.stepChecks||{})};
      Object.keys(completed).forEach(k=>{if(!k.includes("|"))completed[`panasonic|${k}`]=completed[k];});
      Object.keys(stepChecks).forEach(k=>{if(!k.startsWith("panasonic|")&&!k.startsWith("nanoskin|")){const parts=k.split("|");if(parts.length>=2)stepChecks[`panasonic|${parts[0]}|${parts.slice(1).join("|")}`]=stepChecks[k];}});
      const active=profiles[device];
      return {...clone(DEFAULT),...parsed,version:28,device,profiles,plan:valid(active.plan,device)?active.plan:clone(defaultPlan),products:active.products,completed,stepChecks,notes:migrateNotes(parsed.notes,device),goal:parsed.goal||{name:"",date:""},eveningReminder:parsed.eveningReminder!==false,specialReminder:parsed.specialReminder!==false,soundEnabled:parsed.soundEnabled!==false,time:/^\d{2}:\d{2}$/.test(parsed.time||"")?parsed.time:"21:00"};
    }
    // Новая копия приложения хранит данные отдельно. Если пользователь открыл прежний экспорт, поддерживаем старый формат только для Panasonic.
    const old=localStorage.getItem("ehsr90-planner-v2");
    if(old){
      const parsed=JSON.parse(old),panasonicPlan=Array.isArray(parsed.plan)&&parsed.plan.length===7?parsed.plan:DEFAULT_PLAN;
      return {...clone(DEFAULT),device:"panasonic",profiles:{...clone(DEFAULT.profiles),panasonic:{plan:panasonicPlan,products:{...PANASONIC_PRODUCTS,...(parsed.products||{})}}},plan:panasonicPlan,products:{...PANASONIC_PRODUCTS,...(parsed.products||{})},completed:Object.fromEntries(Object.entries(parsed.completed||{}).map(([k,v])=>[`panasonic|${k}`,v])),stepChecks:Object.fromEntries(Object.entries(parsed.stepChecks||{}).map(([k,v])=>[`panasonic|${k}`,v])),notes:migrateNotes(parsed.notes,"panasonic"),goal:parsed.goal||{name:"",date:""},time:parsed.time||"21:00",eveningReminder:parsed.eveningReminder!==false,specialReminder:parsed.specialReminder!==false,soundEnabled:parsed.soundEnabled!==false,complimentDate:parsed.complimentDate||"",complimentIndex:Number.isInteger(parsed.complimentIndex)?parsed.complimentIndex:-1};
    }
  }catch(error){console.warn("Не удалось прочитать локальные данные",error);}
  return clone(DEFAULT);
}
function persist(){
  try{
    data.profiles=data.profiles||{};
    data.profiles[data.device]={plan:clone(data.plan),products:clone(data.products)};
    localStorage.setItem(STORAGE,JSON.stringify(data));
  }catch(error){showToast("Не удалось сохранить данные браузера");}
}
// При первом запуске копии сохраняем перенесённые данные в отдельный ключ, не изменяя старое Panasonic-приложение.
try { if (!localStorage.getItem(STORAGE)) persist(); } catch (error) { console.warn("Не удалось создать локальную копию данных", error); }

function switchDevice(device){
  if(!DEVICES[device]||device===data.device)return;
  stopGuideTimer();closeOverlayDialogs();
  data.profiles=data.profiles||{};data.profiles[data.device]={plan:clone(data.plan),products:clone(data.products)};
  const target=data.profiles[device]||(device==="nanoskin"?{plan:clone(DEFAULT_NANOSKIN_PLAN),products:clone(NANOSKIN_PRODUCTS)}:{plan:clone(DEFAULT_PLAN),products:clone(PANASONIC_PRODUCTS)});
  data.device=device;data.plan=clone(target.plan);data.products={...(device==="nanoskin"?NANOSKIN_PRODUCTS:PANASONIC_PRODUCTS),...(target.products||{})};data.lastNotification="";videoIndex=0;photoIndex=0;cleanIndex=0;
  persist();renderAll();showToast(`Программа переключена: ${DEVICES[device].label}`);
}
function progressKey(dateKey){return `${data.device}|${dateKey}`;}
function storedStepKey(dateKey,id){return `${data.device}|${dateKey}|${id}`;}
function isNanoskin(){return data.device==="nanoskin";}
function deviceLabel(){return DEVICES[data.device]?.label||DEVICES.panasonic.label;}
function currentDefaultPlan(){return isNanoskin()?DEFAULT_NANOSKIN_PLAN:DEFAULT_PLAN;}
function localDateKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function parseLocalDate(key){const [y,m,d]=key.split("-").map(Number);return new Date(y,m-1,d,12);}
function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x;}
function mondayOf(d){const x=new Date(d);x.setHours(12,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x;}
function weekDateKeys(){const mon=mondayOf(new Date());return DAY_NAMES.map((_,i)=>localDateKey(addDays(mon,i)));}
function selectedDateKey(){return weekDateKeys()[selectedDay];}
function modeForDay(i){return MODE[data.plan[i]]||MODE.rest;}
function codeForSelectedDay(){return data.plan[selectedDay];}
function isSpecial(code){return code!=="rest";}
function isProgressDone(dateKey){return !!data.completed[progressKey(dateKey)] || (!isNanoskin() && !!data.completed[dateKey]);}
function dateFmt(d,opts={weekday:"long",day:"numeric",month:"long"}){return new Intl.DateTimeFormat("ru-RU",opts).format(d);}
function showToast(message){const node=$("toast");if(!node)return;node.textContent=message;node.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove("show"),2800);}
function closeOverlayDialogs(exceptId=null){
  // Все модальные окна закрываются при смене вкладки.
  // Закрытые <dialog> скрыты CSS; очистка открывается только кнопкой во вкладке «Техника»,
  // а пошаговые кнопки «Назад / Далее» — только из вкладки «Сегодня».
  ["guideDialog","photoDialog","cleanDialog"].forEach(id=>{
    if(id===exceptId)return;
    const dialog=$(id);
    if(dialog && dialog.open){
      if(id==="guideDialog")stopGuideTimer();
      dialog.close();
    }
  });
}
function switchScreen(screen){
  closeOverlayDialogs();
  currentScreen=screen;
  document.querySelectorAll(".screen").forEach(el=>el.classList.toggle("active",el.id===`screen-${screen}`));
  document.querySelectorAll(".nav-item").forEach(el=>el.classList.toggle("active",el.dataset.screen===screen));
  if(screen==="today")renderToday();if(screen==="plan")renderPlan();if(screen==="history")renderHistory();if(screen==="settings")renderSettings();if(screen==="technique")renderTechnique();
  window.scrollTo({top:0,behavior:"smooth"});
}
function stepsForDay(i){
  const code=data.plan[i];
  if(isNanoskin()){
    const prep={id:"nano-prep",title:"Очистить кожу",detail:"Сними макияж и внешние загрязнения привычным средством. После умывания не вытирай лицо насухо.",minutes:0,short:"Подготовка"};
    const contact={id:"nano-contact",title:"Нанести контактное средство",detail:`${data.products.contactGel||NANOSKIN_PRODUCTS.contactGel}. Наноси только на участок обработки.`,minutes:0,short:"Контактный гель"};
    if(code==="nano_clean")return [
      prep,
      {id:"nano-pad",title:"Подготовить салфетку",detail:"Сними фиксирующее кольцо, закрепи нетканую салфетку и пропитай её очищающим средством на водной основе (мицеллярная вода или лосьон).",minutes:0,short:"Подготовка салфетки"},
      {id:"nano-special",title:"Cleansing · очищение",detail:`${data.products.clean||NANOSKIN_PRODUCTS.clean}. Начни с уровня мощности 1. Веди прибор круговыми движениями по массажным линиям.`,minutes:3,short:"Cleansing"},
      {id:"nano-finish",title:"Завершить очищение",detail:"Смой с кожи остатки средства и очисти головку и электроды прибора.",minutes:0,short:"Завершение"}
    ];
    if(code==="nano_nourish")return [
      prep,
      {id:"nano-cosmetic",title:"Нанести уходовое средство",detail:`Равномерно нанеси ${data.products.nourish||NANOSKIN_PRODUCTS.nourish}, затем поверх нанеси контактный гель.`,minutes:0,short:"Сыворотка и гель"},
      {id:"nano-special",title:"Nourishing · питание и увлажнение",detail:"Выбери режим Nourishing, начни с уровня 1. Прижимай рабочую поверхность к коже и веди круговыми движениями по массажным линиям.",minutes:3,short:"Nourishing"},
      {id:"nano-finish",title:"Очистить прибор",detail:"После процедуры удали с рабочей поверхности и электродов остатки контактного геля и косметического средства.",minutes:0,short:"Завершение"}
    ];
    if(code==="nano_rf")return [
      prep,
      contact,
      {id:"nano-special",title:"RF · активация коллагена",detail:"Выбери режим RF и начни с уровня мощности 1. Прижимай рабочую поверхность к коже и веди по массажным линиям. Кожа будет нагреваться.",minutes:3,short:"RF"},
      {id:"nano-finish",title:"Завершить процедуру",detail:"После процедуры очисти рабочую поверхность и электроды от остатков контактного геля.",minutes:0,short:"Завершение"}
    ];
    if(code==="nano_massaging")return [
      prep,
      contact,
      {id:"nano-special",title:"Massaging · RF + электростимуляция",detail:"Выбери режим Massaging и начни с уровня 1. Двигай прибор по шести массажным линиям из инструкции. Не задерживай его на одном участке; не направляй прибор непосредственно на глаза или на центр горла/область щитовидной железы. Около глаз используй минимальную мощность.",minutes:3,short:"Massaging",movementPace:"Шесть направлений: 1) вверх по линии челюсти к ушам; 2) от уголков рта к ушам; 3) от носа вверх к точкам над ушами; 4) медленные круги от переносицы по лбу к линии роста волос; 5) по обеим сторонам носа; 6) снизу вверх по боковым поверхностям шеи, обходя щитовидную железу.",movementNote:"Руководство просит вести прибор по массажным линиям, не оставлять его неподвижным на одном месте и не сжимать кожу. Не направляй прибор непосредственно на глаза или на центр горла/область щитовидной железы; около глаз используй минимальную мощность."},
      {id:"nano-clear-before-cool",title:"Подготовить кожу к охлаждению",detail:"Перед режимом Cool очисти кожу, рабочую поверхность и электроды от остатков геля.",minutes:0,short:"Подготовка к Cool"},
      {id:"nano-cool",title:"Cool · охлаждение",detail:"Дополнительные косметические средства не нужны. Используй Cool в конце комплекса, плавно веди рабочую поверхность по массажным линиям.",minutes:3,short:"Cool"}
    ];
    return [
      {id:"nano-rest",title:"Обычный уход",detail:"Сними макияж, очисти кожу и нанеси привычные средства ухода. Сегодня без процедур nanoSkin.",minutes:0,short:"Восстановление"}
    ];
  }
  const steps=[
    {id:"prep",title:"Снять макияж и умыться",detail:"Подготовить чистую кожу",minutes:0,short:"Подготовка"},
    {id:"clean",title:"CLEAN",detail:`${data.products.clean} · ватный диск`,minutes:3,short:"Очищение",movementPace:"На одну стрелку: ①–③ — около 7 секунд; ④ — около 5 секунд; ⑤–⑧ — около 3 секунд.",movementNote:"03:00 — общая длительность режима CLEAN. Время 7/5/3 секунды относится к темпу одного движения по стрелке, а не ко всему режиму."},
    {id:"moist",title:"MOIST",detail:data.products.moist,minutes:3,short:"Увлажняющий уход",movementPace:"На одну стрелку: ①–③ — около 7 секунд; ④–⑦ — около 3 секунд.",movementNote:"03:00 — общая длительность режима MOIST. Время 7/3 секунды — ориентир для одного движения по стрелке, а не длительность всего режима."}
  ];
  if(code==="lift")steps.push({id:"special",title:"RF × EMS LIFT",detail:`${data.products.lift} · начать с уровня EMS 1`,minutes:6,short:"Специальный режим",movementPace:"На одну стрелку: ①–⑦ — около 7 секунд; ⑧–⑩ — около 3 секунд.",movementNote:"06:00 — общая длительность RF × EMS LIFT, а не 6 секунд. Темп 7/3 секунды относится к отдельным движениям по стрелкам. В середине процедуры перейди на другую половину лица по сигналу прибора."});
  if(code==="pump")steps.push({id:"special",title:"RF PUMP",detail:`${data.products.pump}`,minutes:6,short:"Специальный режим",movementPace:"На одну стрелку: ①–⑦ — около 7 секунд; ⑧–⑩ — около 3 секунд.",movementNote:"06:00 — общая длительность RF PUMP. Темп 7/3 секунды относится к отдельным движениям по стрелкам, а не ко всему режиму."});
  if(code==="eye")steps.push({id:"special",title:"EYE CARE",detail:`${data.products.eye} · только если производитель разрешает применение вокруг глаз; не обрабатывать веки`,minutes:2,short:"Специальный режим",movementPace:"Движение выполняй по стрелке на схеме Panasonic, около 5 секунд на проход.",movementNote:"02:00 — общая длительность EYE CARE. Не обрабатывай веки; следуй направлению движения на официальной схеме."});
  steps.push({id:"finish",title:"Завершающий уход",detail:code==="eye"?"При необходимости нанести разрешённое средство для области вокруг глаз тонким слоем.":"Нанести MT Metatron B5 Contour как завершающий крем.",minutes:0,short:"Финальный уход"});
  return steps;
}
function checkKey(dateKey,id){return storedStepKey(dateKey,id);}
function stepDone(dateKey,id){return !!data.stepChecks[checkKey(dateKey,id)] || (!isNanoskin() && !!data.stepChecks[`${dateKey}|${id}`]);}
function setStepDone(dateKey,id,value){
  const key=checkKey(dateKey,id),doneKey=progressKey(dateKey);
  if(value)data.stepChecks[key]=true;else{delete data.stepChecks[key];delete data.completed[doneKey];if(!isNanoskin())delete data.completed[dateKey];}
  const all=stepsForDay(selectedDay).every(step=>stepDone(dateKey,step.id));
  if(all)data.completed[doneKey]=true;else delete data.completed[doneKey];persist();
}
function completed(dateKey){return isProgressDone(dateKey);}
function getDailyCompliment(){
  const today=localDateKey(new Date());
  if(data.complimentDate!==today||!Number.isInteger(data.complimentIndex)||data.complimentIndex<0||data.complimentIndex>=DAILY_COMPLIMENTS.length){
    const previous=data.complimentIndex;let next=Math.floor(Math.random()*DAILY_COMPLIMENTS.length);
    if(DAILY_COMPLIMENTS.length>1&&next===previous)next=(next+1+Math.floor(Math.random()*(DAILY_COMPLIMENTS.length-1)))%DAILY_COMPLIMENTS.length;
    data.complimentDate=today;data.complimentIndex=next;persist();
  }
  return DAILY_COMPLIMENTS[data.complimentIndex];
}
function renderHeader(){$("dailyCompliment").textContent=getDailyCompliment();}
function renderWeekStrip(){
  const grid=$("weekStrip");grid.innerHTML="";const keys=weekDateKeys(),todayKey=localDateKey(new Date());
  keys.forEach((key,i)=>{const d=parseLocalDate(key),m=modeForDay(i),b=document.createElement("button");b.type="button";b.className="week-day"+(selectedDay===i?" selected":"")+(key===todayKey?" today":"")+(completed(key)?" done":"");
    const day=document.createElement("span");day.className="dow";day.textContent=DAY_NAMES[i];const num=document.createElement("span");num.className="num";num.textContent=d.getDate();const tag=document.createElement("span");tag.className="tag";tag.textContent=m.tag;b.append(day,num,tag);
    b.addEventListener("click",()=>{stopGuideTimer();if(selectedDay===i){todayDetailsOpen=!todayDetailsOpen;}else{selectedDay=i;todayDetailsOpen=true;}renderToday();});grid.appendChild(b);
  });
}
function renderToday(){
  const key=selectedDateKey(),mode=modeForDay(selectedDay),steps=stepsForDay(selectedDay),done=completed(key),checks=steps.filter(s=>stepDone(key,s.id)).length;
  $("todayDetails").hidden=!todayDetailsOpen;$("collapseHint").hidden=!todayDetailsOpen;
  if($("deviceChip"))$("deviceChip").textContent=DEVICES[data.device].chip;
  $("todayMode").textContent=mode.label;$("todaySubtitle").textContent=mode.subtitle;$("modeSymbol").textContent=mode.symbol;$("modeSymbol").className="mode-symbol"+(mode.kind==="eye"?" eye":mode.kind==="rest"?" rest":"");
  $("todayTime").textContent=data.time||"21:00";
  $("todayDuration").textContent=mode.minutes?(isNanoskin()&&codeForSelectedDay()==="nano_massaging"?"3 мин + Cool 3 мин":`${mode.minutes} мин`):"ежедневный уход";
  $("todayStatus").textContent=done?"Выполнено":"Запланировано";$("todayStatus").className="status-pill"+(done?" done":"");
  $("todayProgress").style.width=`${Math.round(checks/steps.length*100)}%`;$("stepProgressText").textContent=`${checks} из ${steps.length} этапов`;$("progressPercent").textContent=`${Math.round(checks/steps.length*100)}%`;
  const list=$("todaySteps");list.innerHTML="";
  steps.forEach(s=>{const row=document.createElement("div");const isDone=stepDone(key,s.id);row.className="step-item"+(isDone?" is-complete":"");const btn=document.createElement("button");btn.type="button";btn.className="step-check"+(isDone?" checked":"");btn.textContent=isDone?"✓":"";btn.setAttribute("aria-label",isDone?"Снять отметку":"Отметить выполненным");btn.setAttribute("aria-pressed",String(isDone));btn.addEventListener("click",()=>{setStepDone(key,s.id,!isDone);renderToday();renderHistory();});
    const copy=document.createElement("div");copy.className="step-copy";const strong=document.createElement("strong");strong.textContent=s.title;const small=document.createElement("small");small.textContent=s.detail;copy.append(strong,small);const duration=document.createElement("span");duration.className="step-duration";duration.textContent=s.minutes?`${s.minutes} мин`:"";row.append(btn,copy,duration);list.appendChild(row);});
  $("todaySafetyNote").textContent=isNanoskin()?"nanoSkin: начинай с уровня 1. Для RF и Massaging используй контактный гель; Cleansing выполняй с влажной нетканой салфеткой и водным очищающим средством. Не направляй прибор непосредственно на глаза, область сердца, центр горла/щитовидную железу и гениталии; около глаз используй минимальную мощность. Перед применением проверь все противопоказания в руководстве.":mode.kind==="rf"?"Для RF × EMS LIFT используй Panasonic EH-4R06. Для RF PUMP — средство, предусмотренное Panasonic для этого режима.":mode.kind==="eye"?"EYE CARE выполняй без обработки век. Крем для области вокруг глаз используй только при разрешении на упаковке.":"В день восстановления специальных режимов нет. CLEAN и MOIST можно выполнять ежедневно.";
  $("markAllBtn").textContent=done?"Снять отметку о завершении":"Завершить уход";
  $("markAllBtn").onclick=()=>{const k=selectedDateKey(),pk=progressKey(k);if(completed(k)){delete data.completed[pk];steps.forEach(s=>delete data.stepChecks[checkKey(k,s.id)]);}else{data.completed[pk]=true;steps.forEach(s=>data.stepChecks[checkKey(k,s.id)]=true);}persist();renderToday();renderHistory();showToast(completed(k)?"Уход отмечен выполненным":"Отметка снята");};
  renderWeekStrip();renderGoalCard();
}
function renderGoalCard(){const goal=data.goal||{},card=$("goalCard");if(!goal.name||!goal.date){card.hidden=true;return;}const target=parseLocalDate(goal.date);target.setHours(0,0,0,0);const today=new Date();today.setHours(0,0,0,0);const n=Math.round((target-today)/86400000);card.hidden=false;$("goalTitle").textContent=goal.name;$("goalCountdown").textContent=n>0?`До события ${n} ${plural(n,["день","дня","дней"])}`:n===0?"Это сегодня":`Событие было ${Math.abs(n)} ${plural(Math.abs(n),["день","дня","дней"])} назад`;}
function plural(n,forms){const n10=n%10,n100=n%100;return n10===1&&n100!==11?forms[0]:n10>=2&&n10<=4&&(n100<12||n100>14)?forms[1]:forms[2];}
function validatePlan(plan){
  if(isNanoskin()){
    const limits={nano_clean:1,nano_nourish:1,nano_rf:1,nano_massaging:1};
    for(const [key,limit] of Object.entries(limits))if(plan.filter(x=>x===key).length>limit){
      const label=MODE[key].label;
      return `На первых двух неделях курса nanoSkin режим ${label} рекомендуется 1 раз в неделю согласно стартовой схеме руководства.`;
    }
    return "";
  }
  const rfDays=plan.map((x,i)=>(x==="lift"||x==="pump")?i:-1).filter(i=>i>=0),eyeDays=plan.map((x,i)=>x==="eye"?i:-1).filter(i=>i>=0);
  if(rfDays.length>3)return "RF × EMS LIFT и RF PUMP вместе можно планировать не чаще 3 раз в неделю.";
  if(eyeDays.length>3)return "EYE CARE можно планировать не чаще 3 раз в неделю.";
  const hasInsufficientGap=days=>days.some((day,index)=>days.length>1&&((days[(index+1)%days.length]-day+7)%7)<2);
  if(hasInsufficientGap(rfDays))return "Между RF-процедурами оставляй минимум один полный день перерыва.";
  if(hasInsufficientGap(eyeDays))return "Между процедурами EYE CARE оставляй минимум один полный день перерыва.";
  return "";
}
function renderPlan(){
  const list=$("planList");list.innerHTML="";const keys=weekDateKeys();
  if(isNanoskin()){
    const count=key=>data.plan.filter(x=>x===key).length;
    $("planSummary").innerHTML=`<span class="summary-chip"><b>${count("nano_clean")}/1</b> Cleansing</span><span class="summary-chip"><b>${count("nano_nourish")}/1</b> Nourishing</span><span class="summary-chip"><b>${count("nano_rf")}/1</b> RF</span><span class="summary-chip"><b>${count("nano_massaging")}/1</b> Massaging</span>`;
    $("planRulesTitle").textContent="Правила курса ReadySkin nanoSkin";
    $("planRulesList").innerHTML="<li>В первые 2 недели: RF, Cleansing, Nourishing и Massaging — по 1 разу в неделю.</li><li>Каждый режим — около 3 минут; начни с уровня мощности 1.</li><li>Cool — 1–3 раза в неделю, только в конце комплекса. В стартовом плане — после воскресного Massaging.</li><li>Для RF и Massaging нужен контактный гель; для Nourishing — косметическое средство и гель поверх; для Cleansing — влажная нетканая салфетка и водное очищающее средство.</li><li>Не направляй прибор непосредственно на глаза, область сердца, центр горла/щитовидную железу и гениталии. Около глаз используй минимальную мощность.</li>";
    $("planSourceLink").href="https://readyskin.su/wp-content/uploads/2026/07/nanoskin_manual-2.pdf";$("planSourceLink").textContent="Руководство ReadySkin nanoSkin ↗";
  }else{
    const rf=data.plan.filter(x=>x==="lift"||x==="pump").length,eye=data.plan.filter(x=>x==="eye").length;
    $("planSummary").innerHTML=`<span class="summary-chip"><b>${rf}/3</b> RF-сессии</span><span class="summary-chip"><b>${eye}/3</b> EYE CARE</span><span class="summary-chip"><b>${data.plan.filter(isSpecial).length}</b> специальных дня</span>`;
    $("planRulesTitle").textContent="Правила частоты EH-SR90";
    $("planRulesList").innerHTML="<li>RF × EMS LIFT и RF PUMP — суммарно не более 3 раз в неделю.</li><li>Между RF-процедурами — минимум один день перерыва.</li><li>EYE CARE — не более 3 раз в неделю, с минимум одним днём между сеансами.</li><li>Не выполняй два специальных режима в один день. CLEAN и MOIST можно выполнять ежедневно.</li>";
    $("planSourceLink").href="https://panasonic.jp/face/products/EH-SR90/feature/instruction.html";$("planSourceLink").textContent="Инструкция Panasonic ↗";
  }
  data.plan.forEach((code,i)=>{
    const row=document.createElement("article");row.className="plan-row";const day=document.createElement("div");day.className="plan-day";const name=document.createElement("span");name.textContent=LONG_DAYS[i];const date=document.createElement("b");date.textContent=parseLocalDate(keys[i]).getDate();day.append(name,date);
    const wrap=document.createElement("div");wrap.className="plan-select-wrap";const select=document.createElement("select");select.setAttribute("aria-label",`Режим на ${LONG_DAYS[i]}`);
    const options=isNanoskin()?
      [{v:"rest",t:"Восстановление"},{v:"nano_clean",t:"Cleansing · очищение"},{v:"nano_nourish",t:"Nourishing · питание"},{v:"nano_rf",t:"RF · активация коллагена"},{v:"nano_massaging",t:"Massaging · RF + электростимуляция"}]:
      [{v:"rest",t:"Восстановление"},{v:"lift",t:"RF × EMS LIFT"},{v:"pump",t:"RF PUMP"},{v:"eye",t:"EYE CARE"}];
    options.forEach(o=>{const op=document.createElement("option");op.value=o.v;op.textContent=o.t;select.appendChild(op);});select.value=code;
    const small=document.createElement("small");small.textContent=code==="rest"?(isNanoskin()?"Без процедуры nanoSkin":"CLEAN + MOIST · ежедневный уход"):(isNanoskin()?(code==="nano_massaging"?"3 мин + Cool 3 мин в конце недели":"3 мин · уровень 1 на старте"):`${MODE[code].minutes} мин · ${data.time}`);
    select.addEventListener("change",()=>{const trial=[...data.plan];trial[i]=select.value;const error=validatePlan(trial);if(error){select.value=code;showToast(error);return;}data.plan=trial;persist();renderPlan();renderToday();renderHistory();showToast("План обновлён");});wrap.append(select,small);row.append(day,wrap);list.appendChild(row);
  });
}
function renderHistory(){
  const keys=weekDateKeys(),doneCount=keys.filter(k=>completed(k)).length;
  $("calendarLegend").innerHTML=isNanoskin()?'<span><i class="legend-bar clean"></i> Cleansing</span><span><i class="legend-bar nourish"></i> Nourishing</span><span><i class="legend-bar rf"></i> RF</span><span><i class="legend-bar massage"></i> Massaging</span><span><i class="legend-bar done"></i> выполнено</span>':'<span><i class="legend-bar rf"></i> RF</span><span><i class="legend-bar eye"></i> EYE CARE</span><span><i class="legend-bar done"></i> выполнено</span>';
  if(isNanoskin()){
    const counts=[{key:"nano_clean",label:"Cleansing"},{key:"nano_nourish",label:"Nourishing"},{key:"nano_rf",label:"RF"},{key:"nano_massaging",label:"Massaging · RF + EMS"}];
    $("historyStats").innerHTML=`<div class="stat-card"><b>${doneCount}/7</b><span>выполнено на этой неделе</span></div>`+counts.map(item=>`<div class="stat-card"><b>${data.plan.filter(x=>x===item.key).length}</b><span>${item.label} в плане</span></div>`).join("");
  }else{
    const rf=data.plan.filter(x=>x==="lift"||x==="pump").length,eye=data.plan.filter(x=>x==="eye").length;
    $("historyStats").innerHTML=`<div class="stat-card"><b>${doneCount}/7</b><span>выполнено на этой неделе</span></div><div class="stat-card"><b>${rf}</b><span>RF-сессии в плане</span></div><div class="stat-card"><b>${eye}</b><span>EYE CARE в плане</span></div>`;
  }
  renderMonth();renderNote();renderBars();
}
function renderMonth(){
  const y=monthCursor.getFullYear(),m=monthCursor.getMonth();$("monthLabel").textContent=new Intl.DateTimeFormat("ru-RU",{month:"long",year:"numeric"}).format(monthCursor);
  const first=new Date(y,m,1,12),offset=(first.getDay()+6)%7,start=addDays(first,-offset),grid=$("monthGrid");grid.innerHTML="";
  for(let i=0;i<42;i++){
    const d=addDays(start,i),key=localDateKey(d),b=document.createElement("button");b.type="button";b.className="calendar-day"+(d.getMonth()!==m?" outside":"")+(key===selectedHistoryDate?" selected":"")+(completed(key)?" done":"");
    const number=document.createElement("span");number.className="calendar-num";number.textContent=d.getDate();b.appendChild(number);
    const markers=document.createElement("span");markers.className="calendar-bars";const dayIdx=(d.getDay()+6)%7,mode=data.plan[dayIdx];
    const cls=isNanoskin()?({nano_clean:"clean",nano_nourish:"nourish",nano_rf:"rf",nano_massaging:"massage"}[mode]):({lift:"rf",pump:"rf",eye:"eye"}[mode]);
    if(cls){const bar=document.createElement("i");bar.className=`calendar-bar ${cls}`;markers.appendChild(bar);}if(completed(key)){const bar=document.createElement("i");bar.className="calendar-bar done";markers.appendChild(bar);}b.appendChild(markers);
    b.addEventListener("click",()=>{selectedHistoryDate=key;renderMonth();renderNote();});grid.appendChild(b);
  }
}
function noteKey(date){return `${data.device}|${date}`;}
function renderNote(){const note=data.notes[noteKey(selectedHistoryDate)]||{};$("noteDateTitle").textContent=dateFmt(parseLocalDate(selectedHistoryDate),{day:"numeric",month:"long",year:"numeric"});$("noteDatePill").textContent=completed(selectedHistoryDate)?"Уход выполнен":"Без отметки";$("skinNote").value=note.text||"";document.querySelectorAll("#feelingOptions button").forEach(b=>b.classList.toggle("active",b.dataset.feeling===(note.feeling||"")));$("noteStatus").textContent="";}
function dayCompletion(dateKey,dayIndex){
  const steps=stepsForDay(dayIndex);
  let doneCount=steps.filter(step=>stepDone(dateKey,step.id)).length;
  // Поддержка ранее сохранённых полностью выполненных дней, где ещё не было поэтапных отметок.
  if(completed(dateKey)&&doneCount===0)doneCount=steps.length;
  return {done:doneCount,total:steps.length,percent:steps.length?Math.round(doneCount/steps.length*100):0};
}
function renderBars(){
  const bars=$("weekBars");bars.innerHTML="";const today=new Date();let totalDone=0,totalSteps=0;
  for(let i=6;i>=0;i--){
    const d=addDays(today,-i),key=localDateKey(d),dayIndex=(d.getDay()+6)%7,progress=dayCompletion(key,dayIndex),col=document.createElement("div");
    totalDone+=progress.done;totalSteps+=progress.total;col.className="bar-column";col.setAttribute("aria-label",`${DAY_NAMES[dayIndex]}: ${progress.percent}% выполнено`);
    const pct=document.createElement("span");pct.className="bar-percent";pct.textContent=`${progress.percent}%`;
    const track=document.createElement("div");track.className="bar-track";const bar=document.createElement("div");bar.className="bar"+(progress.percent>0?" active":"");bar.style.height=`${progress.percent}%`;track.appendChild(bar);
    const small=document.createElement("small");small.textContent=DAY_NAMES[dayIndex];col.append(pct,track,small);bars.appendChild(col);
  }
  const avg=totalSteps?Math.round(totalDone/totalSteps*100):0;
  $("weekCompletionSummary").textContent=`За 7 дней выполнено ${totalDone} из ${totalSteps} этапов · общий показатель ${avg}%. Частичное выполнение также учитывается.`;
}
function renderSettings(){
  $("deviceSelect").value=data.device;
  if(isNanoskin()){
    $("deviceDescription").textContent="Выбран ReadySkin nanoSkin. При переключении меняются недельный план, пошаговые процедуры, средства, видео и инструкция по очистке. История выполнения для каждого аппарата хранится отдельно.";
    $("deviceCourseNote").innerHTML="<strong>Текущий шаблон — первые 2 недели курса:</strong> RF, Cleansing, Nourishing и Massaging — по 1 разу в неделю; каждый режим около 3 минут. Начинай с уровня мощности 1. После начального этапа в руководстве указана основная фаза на 4 недели (RF — 3 раза в неделю, Cleansing — 2, Nourishing — 2, Massaging — 3), затем поддерживающий этап (Cleansing и Nourishing — 1 раз в неделю, RF и Massaging — 1 раз в 2 недели). Эта версия приложения настроена на стартовый этап; частоту не увеличивай автоматически. Cool рекомендуется 1–3 раза в неделю и используется только для завершения комплекса. В текущем шаблоне он стоит после воскресного Massaging; если несколько режимов объединены в один сеанс, Cool используют один раз после последнего режима. Эта программа предназначена для лица; руководство отдельно описывает применение для тела.<details class=\"contra-details\"><summary>Противопоказания и зоны, которые нельзя обрабатывать</summary><p>В руководстве указаны запреты при беременности и лактации, острых инфекционных и вирусных заболеваниях, онкологических и психических заболеваниях, наличии кардиостимулятора, заболеваниях кожи и соединительной ткани, острых воспалительных и гнойных процессах, обострении дерматита/дерматоза или акне, куперозе в зоне воздействия, склонности к келоидам, некоторых имплантатах, тяжёлой форме сахарного диабета, тяжёлой гипертонии и нарушениях сердечного ритма, приёме дерматотропных препаратов, гриппе/ОРВИ/повышенной температуре, активном загаре.</p><p>Во время процедуры не направляй прибор непосредственно на глаза, область сердца, центр горла/щитовидную железу и половые органы. При работе около глаз используй минимальную мощность. Полный список ограничений и пояснения по имплантатам смотри в официальном руководстве.</p></details>";
  }else{
    $("deviceDescription").textContent="Выбран Panasonic VITALIFT EH-SR90. При переключении возвращаются отдельные расписание, косметика, инструкции, видео и очистка Panasonic.";
    $("deviceCourseNote").textContent="Для Panasonic сохранена твоя прежняя недельная программа: RF × EMS LIFT, RF PUMP, EYE CARE, CLEAN и MOIST.";
  }
  $("reminderTime").value=data.time||"21:00";$("eveningReminder").checked=data.eveningReminder!==false;$("specialReminder").checked=data.specialReminder!==false;$("soundEnabled").checked=data.soundEnabled!==false;
  $("specialReminderHelp").textContent=isNanoskin()?"Отдельное напоминание о выбранных режимах nanoSkin.":"Отдельное напоминание о RF, RF PUMP и EYE CARE.";
  $("goalName").value=data.goal?.name||"";$("goalDate").value=data.goal?.date||"";updatePermissionStatus();
  const list=$("productEditList");list.innerHTML="";
  const items=isNanoskin()?
    [{key:"clean",name:"Очищающее средство",note:"Мицеллярная вода или лосьон на водной основе"},{key:"nourish",name:"Средство для Nourishing",note:"Сыворотка, эссенция или крем"},{key:"contactGel",name:"Контактный гель",note:"Для RF и Massaging; наноси поверх ухода в режиме Nourishing"}]:
    [{key:"clean",name:"CLEAN",note:"Лосьон для очищения"},{key:"moist",name:"MOIST",note:"Сыворотка для режима MOIST"},{key:"lift",name:"RF × EMS LIFT",note:"Контактный гель для RF × EMS"},{key:"pump",name:"RF PUMP",note:"Средство по инструкции Panasonic"},{key:"eye",name:"EYE CARE",note:"Средство для области вокруг глаз"}];
  items.forEach(item=>{const wrap=document.createElement("label");wrap.className="product-edit-item";const head=document.createElement("span");head.className="product-edit-head";head.textContent=item.name;const hint=document.createElement("small");hint.textContent=item.note;const input=document.createElement("input");input.type="text";input.maxLength=90;input.value=data.products[item.key]||"";input.setAttribute("aria-label",`Название средства: ${item.name}`);input.addEventListener("change",()=>{data.products[item.key]=input.value.trim()||(isNanoskin()?NANOSKIN_PRODUCTS[item.key]:PANASONIC_PRODUCTS[item.key]);persist();renderToday();showToast("Название средства сохранено");});wrap.append(head,hint,input);list.appendChild(wrap);});
  const links=$("deviceSourceLinks");
  links.innerHTML=isNanoskin()?
    '<a class="source-link" href="https://readyskin.su/product/readyskin-nanoskin-bez-adaptera/" target="_blank" rel="noopener">Официальная страница nanoSkin ↗</a><a class="source-link" href="https://readyskin.su/wp-content/uploads/2026/07/nanoskin_manual-2.pdf" target="_blank" rel="noopener">Руководство nanoSkin (актуальная версия) ↗</a><a class="source-link" href="https://readyskin.su/wp-content/uploads/2021/10/148h210_442_manual_readyskin_nanoskin.pdf" target="_blank" rel="noopener">Руководство nanoSkin (версия по ссылке) ↗</a>':
    '<a class="source-link" href="https://panasonic.jp/face/products/EH-SR90/feature/instruction.html" target="_blank" rel="noopener">Инструкция EH-SR90 ↗</a><a class="source-link" href="https://panasonic.jp/face/app/with-pb.html" target="_blank" rel="noopener">with Panasonic Beauty ↗</a>';
}
function guideForSelectedDay(){return stepsForDay(selectedDay).map(s=>({...s,description:s.detail||s.short}));}
function openGuide(){if(currentScreen!=="today")return;closeOverlayDialogs("guideDialog");guideSteps=guideForSelectedDay();guideIndex=0;stopGuideTimer();showGuideStep();$("guideDialog").showModal();}
function showGuideStep(){
  const s=guideSteps[guideIndex];if(!s)return;guideRemaining=s.minutes?Math.round(s.minutes*60):0;
  $("guideCount").textContent=`ЭТАП ${guideIndex+1} ИЗ ${guideSteps.length}`;$("guideTitle").textContent=s.title;$("guideDescription").textContent=s.description;$("guideTimer").textContent=s.minutes?formatTime(guideRemaining):"—";
  $("guideTimerCaption").hidden=!s.minutes;$("guideTimerCaption").textContent=s.id==="special"?"ОБЩАЯ ДЛИТЕЛЬНОСТЬ РЕЖИМА":"ВРЕМЯ ЭТАПА";
  $("guideStart").disabled=!s.minutes;$("guideStart").textContent=s.minutes?"Старт таймера":"Без таймера";$("guidePrev").disabled=guideIndex===0;$("guideNext").textContent=guideIndex===guideSteps.length-1?"Завершить":"Далее";
  const pace=$("guideMovementPace"),paceText=$("guideMovementPaceText"),note=$("guideHint");if(s.movementPace){pace.hidden=false;paceText.textContent=s.movementPace;note.textContent=s.movementNote||"Время на стрелку — ориентир для одного движения, а не общая длительность режима.";}else{pace.hidden=true;paceText.textContent="";note.textContent=isNanoskin()?"Следуй руководству ReadySkin nanoSkin. Не направляй прибор непосредственно на глаза или центр горла; около глаз используй минимальную мощность. При дискомфорте прекрати процедуру.":"Следуй инструкции Panasonic. Не продолжай при раздражении, боли или выраженном дискомфорте.";}
}
function formatTime(s){return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;}
function stopGuideTimer(){if(guideRunning&&guideEndsAt)guideRemaining=Math.max(0,Math.ceil((guideEndsAt-Date.now())/1000));if(guideInterval)clearInterval(guideInterval);guideInterval=null;guideRunning=false;guideEndsAt=null;if($("guideStart"))$("guideStart").textContent=guideRemaining>0&&guideRemaining<(guideSteps[guideIndex]?.minutes||0)*60?"Продолжить":"Старт таймера";}
function ensureAudio(){try{const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)return null;if(!audioContext)audioContext=new AudioCtx();if(audioContext.state==="suspended")audioContext.resume();return audioContext;}catch(e){return null;}}
function timerChime(){if(!data.soundEnabled)return;const ctx=ensureAudio();if(!ctx)return;const now=ctx.currentTime;[880,1174].forEach((freq,i)=>{const osc=ctx.createOscillator(),gain=ctx.createGain(),start=now+i*.22;osc.type="sine";osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.16,start+.025);gain.gain.exponentialRampToValueAtTime(.0001,start+.19);osc.connect(gain);gain.connect(ctx.destination);osc.start(start);osc.stop(start+.2);});}
function tickGuideTimer(){if(!guideRunning||!guideEndsAt)return;guideRemaining=Math.max(0,Math.ceil((guideEndsAt-Date.now())/1000));$("guideTimer").textContent=formatTime(guideRemaining);if(guideRemaining===0){clearInterval(guideInterval);guideInterval=null;guideRunning=false;guideEndsAt=null;$("guideStart").textContent="Повторить таймер";if(navigator.vibrate)navigator.vibrate([160,90,180]);timerChime();}}
function startGuideTimer(){const s=guideSteps[guideIndex];if(!s?.minutes)return;if(guideRunning){stopGuideTimer();$("guideStart").textContent="Продолжить";return;}if(guideRemaining<=0)guideRemaining=Math.round(s.minutes*60);ensureAudio();guideRunning=true;guideEndsAt=Date.now()+guideRemaining*1000;$("guideStart").textContent="Пауза";guideInterval=setInterval(tickGuideTimer,250);tickGuideTimer();}
function icsEscape(s){return String(s).replace(/\\/g,"\\\\").replace(/,/g,"\\,").replace(/;/g,"\\;").replace(/\r?\n/g,"\\n");}
function foldIcsLine(line){let result="",part="",bytes=0;for(const ch of line){const size=new TextEncoder().encode(ch).length;if(bytes+size>75){result+=part+"\r\n ";part=ch;bytes=1+size;}else{part+=ch;bytes+=size;}}return result+part;}
function downloadBlob(content,name,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportCalendar(){
  if(!data.eveningReminder&&!data.specialReminder){showToast("Включи хотя бы один тип напоминания");return;}
  const [hh,mm]=(data.time||"21:00").split(":").map(Number),now=new Date(),todayIdx=(now.getDay()+6)%7,nowMins=now.getHours()*60+now.getMinutes(),events=[];
  data.plan.forEach((code,i)=>{
    const special=isSpecial(code)&&code!=="rest";if(!data.eveningReminder&&!(data.specialReminder&&special))return;
    let ahead=(i-todayIdx+7)%7;if(ahead===0&&nowMins>=hh*60+mm)ahead=7;
    const start=addDays(new Date(now.getFullYear(),now.getMonth(),now.getDate(),12),ahead),stamp=start.getFullYear()+String(start.getMonth()+1).padStart(2,"0")+String(start.getDate()).padStart(2,"0"),byday=["MO","TU","WE","TH","FR","SA","SU"][i],mode=MODE[code];
    const summary=special&&data.specialReminder?`Уход · ${mode.label}`:"Ежедневный уход";
    const detail=`Время напоминания: ${data.time}. План на день: ${mode.label}. ${data.eveningReminder?"Ежедневное напоминание включено. ":""}${data.specialReminder&&special?"Напоминание о специальной процедуре включено.":""}`;
    const dtstamp=new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
    events.push(["BEGIN:VEVENT",`UID:${data.device}-${byday}-weekly@mybeautyroutine`,`DTSTAMP:${dtstamp}`,`DTSTART:${stamp}T${String(hh).padStart(2,"0")}${String(mm).padStart(2,"0")}00`,`DURATION:PT10M`,`RRULE:FREQ=WEEKLY;BYDAY=${byday}`,`SUMMARY:${icsEscape(summary)}`,`DESCRIPTION:${icsEscape(detail)}`,"BEGIN:VALARM","TRIGGER:PT0M","ACTION:DISPLAY",`DESCRIPTION:${icsEscape(summary)}`,"END:VALARM","END:VEVENT"].join("\r\n"));
  });
  if(!events.length){showToast("По настройкам нет дней для напоминаний");return;}
  const raw=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Personal Beauty Routine//Multi Device//RU","CALSCALE:GREGORIAN","METHOD:PUBLISH",...events,"END:VCALENDAR"].join("\r\n");downloadBlob(raw.split("\r\n").map(foldIcsLine).join("\r\n"),`${isNanoskin()?"ReadySkin-NanoSkin":"EH-SR90"}-reminders.ics`,"text/calendar;charset=utf-8");showToast("Файл напоминаний подготовлен");
}
function updatePermissionStatus(){
  if(!("Notification" in window)){$("permissionStatus").textContent="Этот браузер не поддерживает веб-уведомления. Используй импорт в календарь iPhone.";$("permissionBtn").disabled=true;return;}
  const p=Notification.permission;$("permissionStatus").textContent=p==="granted"?"Разрешение выдано. Приложение проверяет время, пока открыто.":p==="denied"?"Уведомления заблокированы в настройках браузера.":"Разрешение ещё не запрашивалось.";$("permissionBtn").textContent=p==="granted"?"Разрешение включено":"Разрешить уведомления";
}
async function sendNotification(title,body){try{if(navigator.serviceWorker){const reg=await navigator.serviceWorker.ready;if(reg.showNotification){await reg.showNotification(title,{body,icon:"./icon-192.png",badge:"./icon-192.png",tag:"ehsr90-daily-care",data:{url:"./"}});return;}}if("Notification"in window)new Notification(title,{body});}catch(e){console.warn("Не удалось показать уведомление",e);}}
async function requestNotifications(){if(!("Notification"in window)){showToast("Веб-уведомления не поддерживаются");return;}try{const p=await Notification.requestPermission();updatePermissionStatus();if(p==="granted"){await sendNotification("Напоминания включены",`${deviceLabel()} · время: ${data.time}.`);showToast("Разрешение получено");}else showToast("Разрешение не выдано");}catch(e){showToast("Не удалось включить уведомления");}}
function checkReminder(){
  if(!data.time||!("Notification"in window)||Notification.permission!=="granted")return;
  const now=new Date(),key=localDateKey(now),clock=`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`,token=`${key}|${data.time}`;if(clock!==data.time||data.lastNotification===token)return;
  const idx=(now.getDay()+6)%7,code=data.plan[idx],special=isSpecial(code);
  if(!data.eveningReminder&&!(data.specialReminder&&special))return;
  const mode=MODE[code],title=special&&data.specialReminder&&!data.eveningReminder?`Пора: ${mode.label}`:"Пора начать ежедневный уход";
  const body=data.eveningReminder?(special?`Сегодня по плану ${deviceLabel()}: ${mode.label}. Открой приложение, чтобы пройти этапы.`:"Сегодня день восстановления. Открой приложение для обычного ухода."):`Сегодня запланирована процедура ${mode.label} (${deviceLabel()}).`;
  data.lastNotification=token;persist();sendNotification(title,body);
}
function scheduleReminderCheck(){if(reminderInterval)clearInterval(reminderInterval);checkReminder();reminderInterval=setInterval(checkReminder,15000);}
function saveHistoryNote(){const feeling=document.querySelector("#feelingOptions button.active")?.dataset.feeling||"";data.notes[noteKey(selectedHistoryDate)]={text:$("skinNote").value.trim(),feeling};persist();$("noteStatus").textContent="Заметка сохранена на этом устройстве.";}
function backupData(){persist();downloadBlob(JSON.stringify(data,null,2),"Beauty-Routine-backup.json","application/json");}
function importData(file){const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result),device=parsed.device==="nanoskin"?"nanoskin":"panasonic",allowed=device==="nanoskin"?["rest","nano_clean","nano_nourish","nano_rf","nano_massaging"]:["rest","lift","pump","eye"];if(!parsed||!Array.isArray(parsed.plan)||parsed.plan.length!==7||!parsed.plan.every(x=>allowed.includes(x)))throw new Error("Файл не содержит корректный план для выбранного аппарата.");const previousDevice=data.device;data.device=device;const issue=validatePlan(parsed.plan);if(issue){data.device=previousDevice;throw new Error(issue);}data={...clone(DEFAULT),...parsed,version:28,device,notes:migrateNotes(parsed.notes,device),profiles:parsed.profiles||clone(DEFAULT.profiles),products:{...(device==="nanoskin"?NANOSKIN_PRODUCTS:PANASONIC_PRODUCTS),...(parsed.products||{})}};data.profiles[device]={plan:clone(data.plan),products:clone(data.products)};persist();renderAll();showToast("Данные восстановлены");}catch(e){showToast(e.message||"Не удалось прочитать файл");}};reader.readAsText(file);}

const PANASONIC_VIDEO_MODES=[
  {key:"lift",title:"RF × EMS LIFT",id:"lu-eWTsOrSM",description:"Подтягивающий уход с RF и EMS. Общее видео для RF-режимов.",duration:"6 мин"},
  {key:"pump",title:"RF PUMP",id:"lu-eWTsOrSM",description:"Радиочастотный уход. В ролике показана общая техника RF-режимов.",duration:"6 мин"},
  {key:"eye",title:"EYE CARE",id:"LYwSrkOKfEo",description:"Деликатный уход за областью вокруг глаз. Не обрабатывай веки.",duration:"2 мин"},
  {key:"clean",title:"CLEAN",id:"t9wMeb0W9OE",description:"Очищение кожи с ватным диском и лосьоном.",duration:"3 мин"},
  {key:"moist",title:"MOIST",id:"LFQz4_ZYW4g",description:"Увлажняющий уход с сывороткой или эмульсией.",duration:"3 мин"}
];
// Проверенные фотографии именно nanoSkin со страницы производителя.
const NANOSKIN_OFFICIAL_IMAGES={
  frontAngle:"https://readyskin.su/wp-content/uploads/2021/10/1-2.jpg",
  front:"https://readyskin.su/wp-content/uploads/2021/10/2-3.jpg",
  handset:"https://readyskin.su/wp-content/uploads/2021/10/4-2.jpg",
  kit:"https://readyskin.su/wp-content/uploads/2021/10/nanoskin-w1778-scaled.jpg"
};
const NANOSKIN_OFFICIAL_PRODUCT_IMAGE=NANOSKIN_OFFICIAL_IMAGES.frontAngle;
const NANOSKIN_ORIGINAL_DIAGRAMS="https://readyskin.su/wp-content/uploads/2026/07/nanoskin_manual-2.pdf#page=26";
const NANOSKIN_VIDEO_ID="_PnslhTwDdQ"; // официальный ролик ReadySkin; start указывает на главу соответствующего режима
const NANOSKIN_VIDEO_MODES=[
  {key:"nano_rf",title:"RF · активация коллагена",id:NANOSKIN_VIDEO_ID,start:75,description:"Официальная видеоинструкция ReadySkin · глава RF. Около 3 минут, контактный гель, начальный уровень 1.",duration:"3 мин"},
  {key:"nano_clean",title:"Cleansing · очищение",id:NANOSKIN_VIDEO_ID,start:121,description:"Официальная видеоинструкция ReadySkin · глава Cleansing. Используй нетканую салфетку и водное очищающее средство.",duration:"3 мин"},
  {key:"nano_nourish",title:"Nourishing · питание и увлажнение",id:NANOSKIN_VIDEO_ID,start:181,description:"Официальная видеоинструкция ReadySkin · глава Nourishing. Уходовое средство наносится под контактный гель.",duration:"3 мин"},
  {key:"nano_massaging",title:"Massaging · RF + электростимуляция",id:NANOSKIN_VIDEO_ID,start:242,description:"Официальная видеоинструкция ReadySkin · глава Massaging. Для лица используй минимальную мощность на старте и обходи глаза и щитовидную железу.",duration:"3 мин"},
  {key:"nano_cool",title:"Cool · охлаждение",id:NANOSKIN_VIDEO_ID,start:313,description:"Официальная видеоинструкция ReadySkin · глава Cool. Завершающий режим после комплекса процедур.",duration:"3 мин"}
];
function videoModes(){return isNanoskin()?NANOSKIN_VIDEO_MODES:PANASONIC_VIDEO_MODES;}
const PANASONIC_IMAGES={clean:imageAsset("clean-cotton-1.jpg"),moist:imageAsset("moist-flow.png")};
const RF_PHOTOS=[
  {src:imageAsset("rf-1.png"),alt:"Движения 1–2: нижняя часть лица",caption:"Движения ①–②. Веди прибор плавно по направлению стрелок, сохраняя полный контакт головки с кожей."},
  {src:imageAsset("rf-2.png"),alt:"Движения 3–4: область щеки",caption:"Движения ③–④. Следуй направлению стрелок на схеме и не задерживай прибор на одном участке."},
  {src:imageAsset("rf-3.png"),alt:"Движения 5–7: щека и скуловая зона",caption:"Движения ⑤–⑦. Перемещай головку плавно, без сильного надавливания."},
  {src:imageAsset("rf-4.png"),alt:"Движения 8–10: лоб",caption:"Движения ⑧–⑩. Заверши последовательность по направлению стрелок, продолжая двигать головку."}
];
const PANASONIC_PHOTO_GROUPS={
  lift:{title:"RF × EMS LIFT",items:RF_PHOTOS},
  pump:{title:"RF PUMP",items:RF_PHOTOS},
  eye:{title:"EYE CARE",items:[{src:imageAsset("eye-care.jpg"),alt:"Схема Panasonic: движение в области под глазом к внешнему уголку",caption:"Проводи головку по направлению стрелки под областью глаза. Не обрабатывай веки и избегай попадания на глазное яблоко."}]},
  clean:{title:"CLEAN",items:[{src:imageAsset("clean-cotton-1.jpg"),alt:"Схема Panasonic: установка ватного диска и фиксирующего кольца",caption:"Шаг 1. Установи ватный диск на головку прибора широкой стороной вверх. Закрепи его кольцом, слегка вдавив кольцо на место. Не нажимай слишком сильно."},{src:imageAsset("clean-cotton-2.jpg"),alt:"Схема Panasonic: пропитывание ватного диска лосьоном",caption:"Шаг 2. Хорошо пропитай ватный диск лосьоном. Средство должно пройти насквозь, до обратной стороны диска."}]},
  moist:{title:"MOIST",items:[{src:PANASONIC_IMAGES.moist,alt:"Схема последовательности режима MOIST, подготовленная по инструкции Panasonic",caption:"Нанеси сыворотку или эмульсию → выбери режим MOIST → выбери уровень ионизации → проводи прибором по коже около 3 минут → при желании нанеси дополнительное средство."}]}
};
const NANO_FACE_PHOTOS=Array.from({length:6},(_,i)=>({
  src:imageAsset(`nano-face-${i+1}.svg`),alt:`Шаг ${i+1}: векторная перерисовка направления со страницы 26 руководства ReadySkin nanoSkin`,
  caption:[
    "Шаг 1. Веди прибор вверх вдоль линии челюсти к ушам.",
    "Шаг 2. Веди прибор вверх от уголков рта к ушам.",
    "Шаг 3. Веди прибор вверх от носа к точкам над ушами.",
    "Шаг 4. Медленными круговыми движениями веди прибор от переносицы по лбу к линии роста волос.",
    "Шаг 5. Медленно проводи прибором по обеим сторонам носа.",
    "Шаг 6. Медленно веди прибор снизу вверх по обеим сторонам шеи, обходя область щитовидной железы."
  ][i]
})) ;
const NANOSKIN_PHOTO_GROUPS={
  nano_rf:{title:"RF · направления движения по лицу",items:NANO_FACE_PHOTOS},
  nano_massaging:{title:"Massaging · RF + электростимуляция · направления движения по лицу",items:NANO_FACE_PHOTOS},
  nano_clean:{title:"Cleansing · подготовка",items:[{src:imageAsset("nano-clean-1.svg"),alt:"Подготовка рабочей поверхности к очищению",caption:"Сними фиксирующее кольцо и закрепи нетканую салфетку. Пропитай её мицеллярной водой или очищающим лосьоном на водной основе."}]},
  nano_nourish:{title:"Nourishing · подготовка",items:[{src:NANOSKIN_OFFICIAL_IMAGES.front,alt:"ReadySkin nanoSkin — вид спереди, официальное фото 2",caption:"Фото прибора с официального сайта. Для Nourishing нанеси совместимое с электропорацией уходовое средство, затем поверх контактный гель."}]},
  nano_cool:{title:"Cool · завершение комплекса",items:[{src:NANOSKIN_OFFICIAL_IMAGES.handset,alt:"ReadySkin nanoSkin — официальный вид аппарата без базы, фото 3",caption:"Фото прибора с официального сайта. Cool используй один раз в конце комплекса, после очистки кожи и рабочей поверхности от излишков геля; дополнительных средств не требуется."}]}
};
function photoGroups(){return isNanoskin()?NANOSKIN_PHOTO_GROUPS:PANASONIC_PHOTO_GROUPS;}
const PANASONIC_CLEAN_SLIDES=[
  {title:"Промой головку",src:imageAsset("cleaning-01-head.jpg"),alt:"Промывание головки прибора под проточной водой в чёрно-бежевой инструкции.",caption:"Перед промыванием закрой крышку разъёма. Промой головку от остатков геля и косметики. Не погружай корпус прибора в воду."},
  {title:"Промой кольцо",src:imageAsset("cleaning-02-ring.jpg"),alt:"Промывание съёмного кольца под проточной водой.",caption:"Тщательно промой съёмное кольцо под проточной водой."},
  {title:"Протри головку",src:imageAsset("cleaning-03-wipe.jpg"),alt:"Удаление влаги с головки мягкой тканью.",caption:"Аккуратно удали остатки влаги с головки мягкой тканью."},
  {title:"Просуши все детали",src:imageAsset("cleaning-04-dry.jpg"),alt:"Прибор оставлен на мягкой ткани для полного высыхания.",caption:"Оставь все детали до полного высыхания на мягкой ткани."},
  {title:"Готово!",src:imageAsset("cleaning-05-ready.jpg"),alt:"Чистый прибор, готовый к следующему использованию.",caption:"Прибор чист и готов к следующему использованию."}
];
const NANOSKIN_CLEAN_SLIDES=[
  {title:"Очисти головку и электроды",src:imageAsset("nano-clean-1.svg"),alt:"Иллюстрация ухода за рабочей поверхностью и электродами ReadySkin nanoSkin.",caption:"Перед процедурой очисти головку и электроды. После работы удали остатки контактного геля и косметического средства мягкой тканью."},
  {title:"Протри магнитное кольцо и терморегулятор",src:imageAsset("nano-clean-2.svg"),alt:"Иллюстрация очистки магнитного кольца и терморегулятора.",caption:"Магнитное кольцо и терморегулятор протирай хлопчатобумажной или мягкой тканью. Не три детали сильно и не нажимай на них."},
  {title:"Не мой прибор в воде",src:imageAsset("nano-clean-3.svg"),alt:"Иллюстрация запрета мыть ReadySkin nanoSkin в воде.",caption:"Руководство запрещает мыть прибор в воде. Не промывай корпус под краном и не погружай устройство в жидкость."}
];
function cleanSlides(){return isNanoskin()?NANOSKIN_CLEAN_SLIDES:PANASONIC_CLEAN_SLIDES;}
function renderTechnique(){
  $("nanoManualQuickLink").hidden=!isNanoskin();
  $("techniqueFootnote").textContent=isNanoskin()?"Фото nanoSkin — ссылки на оригинальные фотографии производителя. Для RF и Massaging доступна оригинальная страница 26 руководства с шестью рисунками; шесть отдельных карточек — локальные перерисовки для офлайн-подсказок. Видео и оригинальные материалы требуют интернета.":"Видео загружается после нажатия. Для просмотра нужен интернет; если встроенный плеер недоступен, открой ролик на YouTube.";
  renderVideoSlide();
}
function renderVideoSlide(){
  const modes=videoModes(),item=modes[videoIndex];if(!item)return;
  $("videoCount").textContent=`ВИДЕО ${videoIndex+1} ИЗ ${modes.length}`;$("videoTitle").textContent=item.title;$("videoDescription").textContent=item.description;$("videoDuration").textContent=item.duration;
  const stage=$("videoStage");stage.replaceChildren();stage.className="video-stage";
  const preview=document.createElement("div");preview.className="video-preview";const img=document.createElement("img");img.alt=isNanoskin()?"Официальное изображение ReadySkin nanoSkin":"Превью видео Panasonic";img.loading="lazy";if(isNanoskin()){img.style.objectFit="contain";img.style.background="#f4f0e9";img.referrerPolicy="no-referrer";img.src=NANOSKIN_OFFICIAL_PRODUCT_IMAGE;img.onerror=()=>{img.style.display="none";preview.classList.add("nanoskin-preview-offline");};}else{img.src=`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`;img.onerror=()=>{img.style.display="none";};}const overlay=document.createElement("button");overlay.className="video-play";overlay.type="button";overlay.innerHTML="<span>▶</span><small>Смотреть видео</small>";overlay.addEventListener("click",()=>{const frame=document.createElement("iframe");frame.className="video-player";const start=item.start?`&start=${item.start}`:"";frame.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.id)}?rel=0&playsinline=1${start}`;frame.title=`Видео: ${item.title}`;frame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";frame.allowFullscreen=true;frame.referrerPolicy="strict-origin-when-cross-origin";stage.replaceChildren(frame);});preview.append(img,overlay);stage.appendChild(preview);
  const dots=$("videoDots");dots.innerHTML="";modes.forEach((v,i)=>{const b=document.createElement("button");b.type="button";b.className="dot"+(i===videoIndex?" active":"");b.setAttribute("aria-label",`Видео ${i+1}: ${v.title}`);b.addEventListener("click",()=>{videoIndex=i;renderVideoSlide();});dots.appendChild(b);});
}
function moveVideo(delta){const count=videoModes().length;videoIndex=(videoIndex+delta+count)%count;renderVideoSlide();}
function openPhotos(){if(currentScreen!=="technique")return;closeOverlayDialogs("photoDialog");const mode=videoModes()[videoIndex],group=photoGroups()[mode.key]||photoGroups()[isNanoskin()?"nano_rf":"lift"];photoItems=group.items;photoIndex=0;$("photoTitle").textContent=group.title;$("photoEyebrow").textContent=isNanoskin()?"READY SKIN · ФОТО И ТЕХНИКА":"СХЕМЫ PANASONIC";
  const original=$("nanoOriginalPanel");const showOriginal=isNanoskin()&&["nano_rf","nano_massaging"].includes(mode.key);
  original.hidden=!showOriginal;
  if(showOriginal){$("nanoOriginalLink").href=NANOSKIN_ORIGINAL_DIAGRAMS;}
  renderPhotoSlide();$("photoDialog").showModal();}
function renderPhotoSlide(){
  const item=photoItems[photoIndex];if(!item)return;$("photoCount").textContent=`СЛАЙД ${photoIndex+1} ИЗ ${photoItems.length}`;
  const img=$("photoImage");img.alt=item.alt;img.dataset.fallback="";img.onerror=()=>{if(item.fallback&&!img.dataset.fallback){img.dataset.fallback="1";img.src=item.fallback;}else{img.removeAttribute("src");img.alt="Не удалось загрузить фотографию — открой ссылку на производителя";$("photoCaption").textContent=item.caption+"\n\nФотография доступна онлайн на официальном сайте. Проверь интернет-соединение.";}};img.src=item.src;$("photoCaption").textContent=item.caption;
  const dots=$("photoDots");dots.innerHTML="";photoItems.forEach((_,i)=>{const b=document.createElement("button");b.type="button";b.className="dot"+(i===photoIndex?" active":"");b.setAttribute("aria-label",`Слайд ${i+1}`);b.addEventListener("click",()=>{photoIndex=i;renderPhotoSlide();});dots.appendChild(b);});
}
function movePhoto(delta){if(!photoItems.length)return;photoIndex=(photoIndex+delta+photoItems.length)%photoItems.length;renderPhotoSlide();}
function openClean(){if(currentScreen!=="technique")return;closeOverlayDialogs("cleanDialog");cleanIndex=0;renderCleanSlide();$("cleanDialog").showModal();}
function renderCleanSlide(){const slides=cleanSlides(),item=slides[cleanIndex];$("cleanCount").textContent=`СЛАЙД ${cleanIndex+1} ИЗ ${slides.length}`;$("cleanTitle").textContent=item.title;$("cleanImage").onerror=()=>{$("cleanCaption").textContent=item.caption+"\n\nИзображение не загрузилось. Проверь папку assets в GitHub-репозитории.";};$("cleanImage").src=item.src;$("cleanImage").alt=item.alt;$("cleanCaption").textContent=item.caption;const dots=$("cleanDots");dots.innerHTML="";slides.forEach((_,i)=>{const b=document.createElement("button");b.type="button";b.className="dot"+(i===cleanIndex?" active":"");b.setAttribute("aria-label",`Слайд ${i+1}`);b.addEventListener("click",()=>{cleanIndex=i;renderCleanSlide();});dots.appendChild(b);});}
function moveClean(delta){const slides=cleanSlides();cleanIndex=(cleanIndex+delta+slides.length)%slides.length;renderCleanSlide();}
function bindSwipe(el,onPrev,onNext){if(!el)return;let x=0,y=0;el.addEventListener("touchstart",e=>{const t=e.changedTouches[0];x=t.clientX;y=t.clientY;},{passive:true});el.addEventListener("touchend",e=>{const t=e.changedTouches[0],dx=t.clientX-x,dy=t.clientY-y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.2){dx<0?onNext():onPrev();}},{passive:true});}
function renderAll(){renderHeader();renderToday();renderPlan();renderHistory();renderSettings();renderTechnique();}

// Main navigation
 document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>switchScreen(b.dataset.screen)));
$("openGuideBtn").addEventListener("click",openGuide);
$("closeGuide").addEventListener("click",()=>{stopGuideTimer();$("guideDialog").close();});
$("guideDialog").addEventListener("click",e=>{if(e.target===$("guideDialog")){stopGuideTimer();$("guideDialog").close();}});
$("guideStart").addEventListener("click",startGuideTimer);
$("guidePrev").addEventListener("click",()=>{stopGuideTimer();guideIndex=Math.max(0,guideIndex-1);showGuideStep();});
$("guideNext").addEventListener("click",()=>{stopGuideTimer();if(guideIndex<guideSteps.length-1){guideIndex++;showGuideStep();}else{$("guideDialog").close();showToast("Этапы пройдены. Отметь уход выполненным.");}});
$("guideDialog").addEventListener("close",stopGuideTimer);

$("prevMonth").addEventListener("click",()=>{monthCursor=new Date(monthCursor.getFullYear(),monthCursor.getMonth()-1,1,12);renderMonth();});
$("nextMonth").addEventListener("click",()=>{monthCursor=new Date(monthCursor.getFullYear(),monthCursor.getMonth()+1,1,12);renderMonth();});
document.querySelectorAll("#feelingOptions button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("#feelingOptions button").forEach(x=>x.classList.remove("active"));b.classList.add("active");}));
$("saveNoteBtn").addEventListener("click",saveHistoryNote);
$("restorePlanBtn").addEventListener("click",()=>{if(confirm("Вернуть исходный недельный план для выбранного аппарата?")){data.plan=clone(currentDefaultPlan());persist();renderPlan();renderToday();renderHistory();showToast("Исходный план восстановлен");}});

$("deviceSelect").addEventListener("change",e=>switchDevice(e.target.value));
$("reminderTime").addEventListener("change",e=>{data.time=e.target.value||"21:00";data.lastNotification="";persist();renderToday();renderPlan();scheduleReminderCheck();showToast(`Время напоминания: ${data.time}`);});
$("eveningReminder").addEventListener("change",e=>{data.eveningReminder=e.target.checked;data.lastNotification="";persist();scheduleReminderCheck();});
$("specialReminder").addEventListener("change",e=>{data.specialReminder=e.target.checked;data.lastNotification="";persist();scheduleReminderCheck();});
$("soundEnabled").addEventListener("change",e=>{data.soundEnabled=e.target.checked;persist();showToast(data.soundEnabled?"Звуковой сигнал включён":"Звуковой сигнал выключен");});
$("calendarExportBtn").addEventListener("click",exportCalendar);$("permissionBtn").addEventListener("click",requestNotifications);

$("saveGoalBtn").addEventListener("click",()=>{data.goal={name:$("goalName").value.trim(),date:$("goalDate").value};persist();renderGoalCard();showToast("Цель сохранена");});
$("backupBtn").addEventListener("click",backupData);$("importBtn").addEventListener("click",()=>$("importFile").click());$("importFile").addEventListener("change",e=>{const f=e.target.files?.[0];if(f)importData(f);e.target.value="";});

$("videoPrev").addEventListener("click",()=>moveVideo(-1));$("videoNext").addEventListener("click",()=>moveVideo(1));$("openPhotosBtn").addEventListener("click",openPhotos);
document.querySelector(".nano-pdf-details").addEventListener("toggle",e=>{if(e.target.open)$("nanoOriginalIframe").src=NANOSKIN_ORIGINAL_DIAGRAMS;});$("openCleanBtn").addEventListener("click",openClean);
$("closePhotos").addEventListener("click",()=>$ ("photoDialog").close());
$("photoPrev").addEventListener("click",()=>movePhoto(-1));$("photoNext").addEventListener("click",()=>movePhoto(1));
$("closeClean").addEventListener("click",()=>$ ("cleanDialog").close());$("cleanPrev").addEventListener("click",()=>moveClean(-1));$("cleanNext").addEventListener("click",()=>moveClean(1));
$("photoDialog").addEventListener("click",e=>{if(e.target===$("photoDialog"))$("photoDialog").close();});$("cleanDialog").addEventListener("click",e=>{if(e.target===$("cleanDialog"))$("cleanDialog").close();});
bindSwipe($("videoStage"),()=>moveVideo(-1),()=>moveVideo(1));bindSwipe($("photoDialog"),()=>movePhoto(-1),()=>movePhoto(1));bindSwipe($("cleanDialog"),()=>moveClean(-1),()=>moveClean(1));

let lastDailyHeaderDate=localDateKey(new Date());document.addEventListener("visibilitychange",()=>{if(guideRunning)tickGuideTimer();if(document.visibilityState==="visible"){renderHeader();scheduleReminderCheck();}});setInterval(()=>{const today=localDateKey(new Date());if(today!==lastDailyHeaderDate){lastDailyHeaderDate=today;renderHeader();}},60000);
if("serviceWorker"in navigator&&location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js",{updateViaCache:"none"}).then(reg=>{reg.update().catch(()=>{});scheduleReminderCheck();}).catch(err=>{console.warn("Service worker registration failed",err);scheduleReminderCheck();}));}else scheduleReminderCheck();
renderAll();
})();
