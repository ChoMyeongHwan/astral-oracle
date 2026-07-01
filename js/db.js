// ==========================================================================
// 1. 아스트랄 오라클 데이터베이스 (Celestial Tarot Database)
// ==========================================================================
window.TAROT_DB = [
  {
    id: 0,
    name: "바보 (The Fool)",
    englishName: "The Fool",
    number: "0",
    uprightKeywords: ["새로운 시작", "자유", "모험", "순수함", "무한한 가능성"],
    reversedKeywords: ["경솔함", "위험한 모험", "무책임", "불안정", "경거망동"],
    uprightMeaning: "새로운 여행의 시작을 나타냅니다. 아직 다듬어지지 않은 순수한 마음으로 미지의 세계에 발을 내딛는 역동적인 시기입니다. 긍정적이고 모험적인 태도가 행운을 부릅니다.",
    reversedMeaning: "섣부른 판단이나 지나친 낙관으로 위험에 처할 수 있습니다. 계획 없이 시작한 일로 방황하거나 무책임한 태도로 인해 주변의 신뢰를 잃지 않도록 주의해야 합니다.",
    advice: "과거의 짐을 내려놓고 가벼운 마음으로 시작하세요. 단, 발밑의 절벽을 보지 못하는 무모함은 경계해야 합니다.",
    color: "#facc15", // 노란색
    imageUrl: "images/tarot-fool.webp"
  },
  {
    id: 1,
    name: "마법사 (The Magician)",
    englishName: "The Magician",
    number: "I",
    uprightKeywords: ["창조력", "의지", "재능", "소통", "새로운 프로젝트"],
    reversedKeywords: ["기만", "지연", "재능 낭비", "사기성", "서툰 계획"],
    uprightMeaning: "당신의 재능 and 도구가 모두 준비되어 창조력을 발휘할 최고의 타이밍입니다. 의지와 집중력만 있다면 원하는 바를 현실로 만들 수 있는 강력한 능력을 의미합니다.",
    reversedMeaning: "말만 앞서고 실행력이 부족하거나 남을 속이려는 얄팍한 꾀에 빠질 수 있습니다. 자신의 능력을 과신하거나 나쁜 방향으로 활용하려는 유혹을 물리쳐야 합니다.",
    advice: "당신에게는 이미 우주가 주신 모든 재능이 있습니다. 두려워하지 말고 아이디어를 현실화하는 첫 걸음을 떼세요.",
    color: "#3b82f6", // 파란색
    imageUrl: "images/tarot-magician.webp"
  },
  {
    id: 2,
    name: "여사제 (The High Priestess)",
    englishName: "The High Priestess",
    number: "II",
    uprightKeywords: ["직관", "비밀", "지혜", "내면의 목소리", "무의식"],
    reversedKeywords: ["피상적임", "숨겨진 적", "신경질적", "직관 무시", "비밀 유출"],
    uprightMeaning: "겉으로 드러나지 않는 신비롭고 깊은 내면의 지혜와 직관을 상징합니다. 외부의 소음에 휩쓸리기보다는 조용히 마음의 소리에 귀를 기울여야 할 시기입니다.",
    reversedMeaning: "직관을 무시하고 타인의 말에 선동되거나 감정적으로 예민해질 수 있습니다. 차가운 이기심이나 이중성에 상처를 받지 않도록 마음의 중심을 잡으세요.",
    advice: "지금은 행동할 때가 아닌 관망하고 성찰할 때입니다. 당신의 첫 느낌과 직관을 전적으로 믿으십시오.",
    color: "#c084fc", // 연보라색
    imageUrl: "images/tarot-priestess.webp"
  },
  {
    id: 3,
    name: "여황제 (The Empress)",
    englishName: "The Empress",
    number: "III",
    uprightKeywords: ["풍요", "모성애", "자연", "결실", "아름다움"],
    reversedKeywords: ["낭비", "게으름", "집착", "불임/정체", "창조성 결여"],
    uprightMeaning: "자연의 어머니처럼 풍요롭고 비옥하며 아름다운 상태를 의미합니다. 물질적, 정신적인 성과가 드러나고 대인관계나 가정에서 큰 안정과 사랑을 느끼게 됩니다.",
    reversedMeaning: "지나친 소유욕이나 집착으로 상대를 숨막히게 하거나, 나태함에 빠져 해야 할 일을 미룰 수 있습니다. 물질적인 허영심이나 사치스러운 생활을 경계해야 합니다.",
    advice: "주변을 사랑으로 포용하고 자연스러운 풍요를 즐기세요. 창조적인 취미나 예술 활동이 큰 치유를 줍니다.",
    color: "#ec4899", // 핑크
    imageUrl: "images/tarot-empress.webp"
  },
  {
    id: 4,
    name: "황제 (The Emperor)",
    englishName: "The Emperor",
    number: "IV",
    uprightKeywords: ["권위", "지배력", "안정", "질서", "강한 추진력"],
    reversedKeywords: ["독단적", "권력 남용", "유약함", "통제 불능", "완고함"],
    uprightMeaning: "사회적 지위, 통제력, 질서 정연한 리더십을 상징합니다. 현재 겪고 있는 상황을 냉철하게 주도하고 단단한 체계를 세워 목표를 달성할 수 있는 강한 힘이 있습니다.",
    reversedMeaning: "지나치게 고집스럽거나 권위적인 태도로 주변 사람과 마찰을 빚을 수 있습니다. 질서가 무너져 혼란스럽거나 책임을 피하려는 나약한 태도로 나타나기도 합니다.",
    advice: "감정에 치우치지 말고 굳건한 논리와 질서로 대처하세요. 다만 타인을 향한 지나친 억압은 피해야 합니다.",
    color: "#ef4444", // 빨간색
    imageUrl: "images/tarot-emperor.webp"
  },
  {
    id: 5,
    name: "교황 (The Hierophant)",
    englishName: "The Hierophant",
    number: "V",
    uprightKeywords: ["전통", "귀인", "가르침", "계약", "정신적 조언"],
    reversedKeywords: ["독선", "낡은 사상", "반항", "계약 위반", "잘못된 조언"],
    uprightMeaning: "도덕적인 기준, 정신적인 가치, 지혜로운 조력자나 스승의 등장을 의미합니다. 약속이나 동맹, 결혼, 계약 등의 공식적인 결속이 유리하게 성사되는 흐름입니다.",
    reversedMeaning: "답답하고 융통성 없는 꼰대 같은 사상에 얽매이거나, 믿었던 사람에게 뒤통수를 맞을 수 있습니다. 기성 질서에 반항하고 탈피하고 싶은 욕구를 상징합니다.",
    advice: "경험이 많은 귀인이나 멘토의 도움을 청해 보세요. 법과 규칙을 준수하는 것이 안전한 지름길입니다.",
    color: "#10b981", // 에메랄드 그린
    imageUrl: "images/tarot-hierophant.webp"
  },
  {
    id: 6,
    name: "연인 (The Lovers)",
    englishName: "The Lovers",
    number: "VI",
    uprightKeywords: ["사랑", "조화", "파인더십", "올바른 선택", "결합"],
    reversedKeywords: ["불화", "잘못된 선택", "갈등", "유혹", "관계 단절"],
    uprightMeaning: "매우 매력적이고 조화로운 대인관계나 연인 관계를 나타냅니다. 중요한 결정을 내릴 때 마음속 깊이 우러나오는 기쁨과 사랑을 기준으로 선택하면 대성공을 거둡니다.",
    reversedMeaning: "관계 내의 신뢰가 깨지거나 불협화음이 일어납니다. 혹은 달콤하지만 해로운 유혹에 빠져 잘못된 판단을 내리기 쉬운 시기이므로 매사에 냉정해야 합니다.",
    advice: "서로 조화를 이루고 존중하는 마음에 집중하세요. 중요한 선택의 순간에 이성보다 가슴의 진심을 따르세요.",
    color: "#f43f5e", // 로즈 레드
    imageUrl: "images/tarot-lovers.webp"
  },
  {
    id: 7,
    name: "전차 (The Chariot)",
    englishName: "The Chariot",
    number: "VII",
    uprightKeywords: ["승리", "돌파력", "통제력", "장애 극복", "강한 의지"],
    reversedKeywords: ["방향 상실", "폭주", "실패", "사고 주의", "추진력 상실"],
    uprightMeaning: "어려운 환경에서도 의지와 목표 의식으로 마차를 몰아 승리를 쟁취해 내는 강인함을 뜻합니다. 직진하는 기세로 밀어붙이면 장벽을 부수고 나아갈 수 있습니다.",
    reversedMeaning: "에너지는 넘치나 제어가 안 되어 파국을 맞거나, 반대로 의지력이 완전히 꺾여 정체될 수 있습니다. 분노를 절제하지 못해 실수를 저지르지 않게 주의하세요.",
    advice: "흔들리지 않는 목표를 설정하고 앞만 보고 달리세요. 상반된 마음을 통제하는 자제력이 승리의 핵심입니다.",
    color: "#06b6d4", // 시안 블루
    imageUrl: "images/tarot-chariot.webp"
  },
  {
    id: 8,
    name: "힘 (Strength)",
    englishName: "Strength",
    number: "VIII",
    uprightKeywords: ["용기", "인내심", "부드러운 통제", "내면의 힘", "극복"],
    reversedKeywords: ["자기 의심", "나약함", "폭력성", "인내 한계", "자신감 하락"],
    uprightMeaning: "맹수 사자를 부드러운 사랑과 인내심으로 길들이는 격조 높은 힘을 의미합니다. 물리적인 폭력이나 화를 내는 대신 내공과 부드러움으로 상황을 완전히 제압합니다.",
    reversedMeaning: "스스로를 믿지 못해 불안에 떨거나 무력감에 주저앉을 수 있습니다. 순간적으로 인내을 잃고 분노를 터트려 일을 그르치지 않도록 이성을 지켜야 합니다.",
    advice: "억누르고 싸우는 것만이 해결책은 아닙니다. 고통을 부드럽게 감싸 안는 인내와 연민의 마음을 가져보세요.",
    color: "#fb923c", // 오렌지
    imageUrl: "images/tarot-strength.webp"
  },
  {
    id: 9,
    name: "은둔자 (The Hermit)",
    englishName: "The Hermit",
    number: "IX",
    uprightKeywords: ["고독", "성찰", "탐구", "자아 발견", "등불"],
    reversedKeywords: ["소외감", "폐쇄적", "외로움에 침잠", "망상", "은둔형 외톨이"],
    uprightMeaning: "복잡한 세상에서 한 걸음 물러나 홀로 자신을 비춰보는 시기입니다. 겉으로 드러나는 성공보다 내적인 성숙과 진리를 찾는 것이 가장 가치 있는 일입니다.",
    reversedMeaning: "지나치게 고립되어 고독감에 시달리거나 타인과의 소통을 완전히 거부하여 고집불통이 될 수 있습니다. 우물 안 개구리처럼 세상의 빛을 꺼리는 것을 경계하십시오.",
    advice: "침묵 속에서 마음을 청소하고 혼자만의 시간을 가지세요. 해답은 당신의 마음속 등불 아래에 이미 있습니다.",
    color: "#6b7280", // 그레이
    imageUrl: "images/tarot-hermit.webp"
  },
  {
    id: 10,
    name: "운명의 수레바퀴 (Wheel of Fortune)",
    englishName: "Wheel of Fortune",
    number: "X",
    uprightKeywords: ["운명적 변화", "터닝 포인트", "행운", "피할 수 없는 흐름", "기회"],
    reversedKeywords: ["악재", "통제 불가능한 운명", "과거에 집착", "타이밍 미스", "정체"],
    uprightMeaning: "인생의 큰 전환점이 다가와 흐름이 반전되고 행운이 굴러 들어오는 강력한 신호입니다. 우연한 기회가 운명을 송두리째 바꾸는 등 우주의 순리를 실감하게 됩니다.",
    reversedMeaning: "원치 않는 갑작스러운 변화로 혼란을 겪거나 나쁜 흐름이 지속될 수 있습니다. 억지로 바퀴의 회전을 막으려 하기보다 폭풍이 지나가길 기다리는 것이 현명합니다.",
    advice: "피할 수 없는 변화의 흐름이 시작되었습니다. 흐름을 타며 기회를 잡으세요. 우주는 당신 편입니다.",
    color: "#f59e0b", // 골드 옐로우
    imageUrl: "images/tarot-wheel.webp"
  },
  {
    id: 11,
    name: "정의 (Justice)",
    englishName: "Justice",
    number: "XI",
    uprightKeywords: ["공정성", "인과응보", "냉철한 판단", "진실 규명", "법적 승리"],
    reversedKeywords: ["불평등", "편견", "가혹한 비난", "판단 착오", "패소"],
    uprightMeaning: "감정을 배제하고 냉철한 저울질로 공정하고 정직한 판결을 내리는 모습입니다. 과거에 뿌려놓은 씨앗이 인과응보의 결과로 공평하게 수확되는 엄정한 시기입니다.",
    reversedMeaning: "불공정한 처사를 당하거나 편견 섞인 시선에 갇힐 수 있습니다. 자신에 대한 비난에 너무 가혹하게 반응하거나 거짓된 주장에 휘둘릴 우려가 있습니다.",
    advice: "감정에 치우치지 말고 객관적인 사실에 입각하여 판단하세요. 정직과 도덕을 지키는 것이 가장 중요합니다.",
    color: "#22c55e", // 그린
    imageUrl: "images/tarot-justice.webp"
  },
  {
    id: 12,
    name: "매달린 사람 (The Hanged Man)",
    englishName: "The Hanged Man",
    number: "XII",
    uprightKeywords: ["희생", "새로운 시각", "관점 전환", "자발적 인내", "일시 정지"],
    reversedKeywords: ["희생 강요", "무의미한 고통", "정체기", "고집", "시간 낭비"],
    uprightMeaning: "거꾸로 매달려 세상을 뒤집어 보며 자발적으로 인내하고 있는 기묘한 시기입니다. 겉보기엔 힘겨운 고난 같으나 새로운 깨달음과 시각을 여는 귀중한 준비 기간입니다.",
    reversedMeaning: "아무 보람 없는 헛된 고통을 겪고 있거나 상황의 변화 없이 무력하게 질질 끌려다닐 수 있습니다. 쓸데없는 고집을 피우며 불필요한 에너지를 낭비하지 마세요.",
    advice: "움직이지 말고 생각을 뒤집어 보세요. 거꾸로 매달렸을 때 비로소 남들이 보지 못한 참신한 해답이 보입니다.",
    color: "#6366f1", // 인디고
    imageUrl: "images/tarot-hanged.webp"
  },
  {
    id: 13,
    name: "죽음 (Death)",
    englishName: "Death",
    number: "XIII",
    uprightKeywords: ["끝맺음", "새로운 탄생", "구조조정", "필연적 종결", "대전환"],
    reversedKeywords: ["정체", "종결 거부", "더딘 변화", "지저분한 뒤끝", "두려움"],
    uprightMeaning: "기존의 낡은 구조, 관계, 상황이 마침내 완전히 끝나고 새 살이 돋아나는 필연적인 대전환입니다. 끝은 곧 완전히 차별화된 새로운 시작을 강력하게 암시합니다.",
    reversedMeaning: "이미 끝나버린 과거의 끈을 놓지 못해 구질구질하게 집착하며 변화를 거부하고 고통을 연장하고 있습니다. 과감하게 버려야 새 출발이 가능합니다.",
    advice: "끝날 것은 마땅히 끝나야 합니다. 낡은 상자를 닫아야 우주가 준비한 더 새롭고 빛나는 상자를 열 수 있습니다.",
    color: "#111827", // 블랙/차콜
    imageUrl: "images/tarot-death.webp"
  },
  {
    id: 14,
    name: "절제 (Temperance)",
    englishName: "Temperance",
    number: "XIV",
    uprightKeywords: ["조화", "균형", "연금술", "치유", "적절한 절제"],
    reversedKeywords: ["불균형", "소통 부재", "지나친 극단", "중독성 행동", "갈등"],
    uprightMeaning: "두 개의 잔에 물을 번갈아 담으며 정교한 균형을 유지하고 상처를 치유하는 천사의 모습입니다. 상충되는 가치를 조율하여 극적이고 아름다운 타협점을 만들어 냅니다.",
    reversedMeaning: "어느 한쪽으로 균형이 무너져 과도함 and 탐닉에 빠집니다. 과음, 과식, 혹은 한쪽의 생각만을 지나치게 고집하여 소통이 완전히 단절되는 상황을 초래할 수 있습니다.",
    advice: "중도를 지키며 천천히 에너지를 정화하세요. 서두르지 않고 적절한 타협점을 찾는 것이 조화로운 해결책입니다.",
    color: "#06b6d4", // 에메랄드 시안
    imageUrl: "images/tarot-temperance.webp"
  },
  {
    id: 15,
    name: "악마 (The Devil)",
    englishName: "The Devil",
    number: "XV",
    uprightKeywords: ["유혹", "중독", "물질적 집착", "속박", "피할 수 없는 어둠"],
    reversedKeywords: ["해방", "각성", "나쁜 습관 극복", "집착을 내려놓음", "구속 탈출"],
    uprightMeaning: "물질적 욕망이나 나쁜 중독적 행위(질투, 집착, 쾌락 등)에 스스로 족쇄를 채운 속박의 카드입니다. 스스로 만들어 낸 유혹의 덫에 갇혀 있음을 강하게 자각해야 합니다.",
    reversedMeaning: "긴 어둠과 집착의 굴레에서 깨어나 과감히 족쇄를 풀어 던집니다. 유해했던 관계를 드디어 끊어내고 나쁜 버릇이나 소유욕으로부터 건강하게 영혼이 해방되는 시기입니다.",
    advice: "당신을 묶고 있는 사슬은 사실 언제든 마음만 먹으면 벗겨낼 수 있을 만큼 느슨합니다. 욕망을 직시하고 털어내세요.",
    color: "#7c2d12", // 갈색/러스트
    imageUrl: "images/tarot-devil.webp"
  },
  {
    id: 16,
    name: "탑 (The Tower)",
    englishName: "The Tower",
    number: "XVI",
    uprightKeywords: ["갑작스러운 붕괴", "충격적인 사건", "예측불허 재앙", "해체와 정화", "각성"],
    reversedKeywords: ["간신히 재난 모면", "지연되는 붕괴", "위기의 전조", "숨 막히는 긴장", "현실 안주"],
    uprightMeaning: "인위적으로 쌓아 올린 견고했던 거짓 탑이 신의 번개를 맞아 한순간에 산산조각 나는 대파국입니다. 충격적이지만, 썩은 부위를 도려내고 기초부터 재건하게 만드는 해방의 순간이기도 합니다.",
    reversedMeaning: "붕괴의 위기가 찾아왔음에도 애써 진실을 외면하며 위태롭게 버티고 있습니다. 혹은 불어닥친 위기 속에서 간신히 최악의 상황만 모면했음을 뜻합니다.",
    advice: "무너질 것은 결국 무너집니다. 붕괴를 한탄하기보다는, 거짓에 둘러싸인 껍데기가 벗겨지고 진실된 바닥이 드러났음에 감사하고 새로 설계하십시오.",
    color: "#b91c1c", // 짙은 빨강
    imageUrl: "images/tarot-tower.webp"
  },
  {
    id: 17,
    name: "별 (The Star)",
    englishName: "The Star",
    number: "XVII",
    uprightKeywords: ["희망", "영감", "치유", "우주의 은총", "낙천주의"],
    reversedKeywords: ["절망", "영감 상실", "비관적 태도", "기대 이하의 결실", "낙담"],
    uprightMeaning: "절망의 밤하늘 너머로 영롱하게 빛나는 별의 은총 and 희망을 상징합니다. 마음의 상처가 눈부시게 치유되고 영감이 샘솟으며 앞길을 비추는 긍정적인 평화가 도래합니다.",
    reversedMeaning: "막연한 불안감과 부정적인 태도로 스스로의 앞길을 어둡게 막고 있습니다. 희망을 잃고 낙담하거나, 현실의 장벽에 부딪쳐 영감이 바닥난 우울한 상태입니다.",
    advice: "어둠이 깊을수록 별은 가장 밝게 빛납니다. 우주는 반드시 당신의 앞길에 치유의 단비를 내려줄 것입니다. 희망을 품으세요.",
    color: "#38bdf8", // 라이트 블루
    imageUrl: "images/tarot-star.webp"
  },
  {
    id: 18,
    name: "달 (The Moon)",
    englishName: "The Moon",
    number: "XVIII",
    uprightKeywords: ["불안감", "환상", "비밀", "속임수", "모호성"],
    reversedKeywords: ["진실 노출", "불안 해소", "안개 걷힘", "오해 해소", "현실 직시"],
    uprightMeaning: "보름달 아래 개와 늑대가 짖으며 랍스터가 기어 나오는 기괴하고 몽환적인 밤입니다. 눈앞이 자욱한 안개 속처럼 뿌옇고 모호하여 불안감과 비밀이 감돌며 방황하기 쉽습니다.",
    reversedMeaning: "마침내 무겁게 드리웠던 안개가 걷히고 달빛 뒤의 명확한 진실이 낮의 태양처럼 빛나기 시작합니다. 실체 없던 공포와 두려움이 소멸하고 마음이 안정을 찾아갑니다.",
    advice: "불안은 실체가 없는 환영에 불과합니다. 한 걸음씩 안개 속을 걷다 보면 곧 아침 해가 뜰 것입니다. 두려워 마세요.",
    color: "#a5f3fc", // 시안 아이스
    imageUrl: "images/tarot-moon.webp"
  },
  {
    id: 19,
    name: "태양 (The Sun)",
    englishName: "The Sun",
    number: "XIX",
    uprightKeywords: ["성공", "기쁨", "활력", "긍정", "순수한 축하"],
    reversedKeywords: ["일시적 침체", "과장된 성공", "의욕 과다", "기력 방전", "과시욕"],
    uprightMeaning: "타로 카드 78장 중 가장 긍정적이고 찬란한 태양 빛의 대성공입니다. 어린아이와 같은 순수한 기쁨, 건강한 활력, 성공과 축복이 당신의 모든 영역을 밝게 지배합니다.",
    reversedMeaning: "성공과 기쁨의 기조는 유지되나 지나친 자만이나 오버페이스로 일시적으로 피로감을 느끼거나 기운이 빠집니다. 무리한 약속이나 자기과시를 삼가십시오.",
    advice: "세상의 눈부신 환대와 성공을 만끽하세요! 긍정적인 생각과 열정이 가장 강력한 마스터 키가 됩니다.",
    color: "#f97316", // 브라이트 오렌지
    imageUrl: "images/tarot-sun.webp"
  },
  {
    id: 20,
    name: "심판 (Judgement)",
    englishName: "Judgement",
    number: "XX",
    uprightKeywords: ["부활", "각성", "보상", "결단의 순간", "중요한 공표"],
    reversedKeywords: ["후회", "결정 장애", "비난 회피", "기회 상실", "나쁜 습관 반복"],
    uprightMeaning: "천사의 나팔 소리를 듣고 과거의 무덤에서 깨어나 부활하듯 새로운 차원으로 눈을 둡니다. 그동안 흘린 땀방울에 대한 합당한 구원과 영광스러운 보상이 약속되는 엄숙한 행운의 시기입니다.",
    reversedMeaning: "중요한 전환점에서 주저하다가 하늘의 기회를 놓칩니다. 과거의 실수를 반복하며 똑같은 악순환에 머물거나 후회에 사로잡혀 전진하지 못하는 상황입니다.",
    advice: "이제 부활의 나팔이 울렸습니다. 과거의 후회와 먼지를 털어내고 당당하게 스스로를 선언하십시오.",
    color: "#e879f9", // 라이트 핑크/마젠타
    imageUrl: "images/tarot-judgement.webp"
  },
  {
    id: 21,
    name: "세계 (The World)",
    englishName: "The World",
    number: "XXI",
    uprightKeywords: ["완성", "통합", "조화", "성공적 마무리", "여행의 마침표"],
    reversedKeywords: ["미완성", "더딘 결실", "정체", "지름길 찾기", "마무리 부족"],
    uprightMeaning: "바보의 모험이 드디어 끝을 맺고 온 우주와 완벽한 조화를 이루며 완성을 선언하는 해피엔딩의 종결판입니다. 정신적, 육체적으로 극상의 충만감과 완전한 통합을 이룹니다.",
    reversedMeaning: "거의 다 성공해 놓고 마지막 한 매듭을 짓지 못해 겉돌고 있습니다. 조급해하지 말고 부족한 2%를 꼼꼼하게 마감해야 진짜 완성에 도달할 수 있습니다.",
    advice: "완벽하게 완결된 상태에 도달했습니다. 이 성공과 성취를 겸손히 받아들이고 축하하십시오. 당신은 여정을 훌륭히 마쳤습니다.",
    color: "#3b82f6", // 로열 블루
    imageUrl: "images/tarot-world.webp"
  }
];

window.INTERPRET_TEMPLATES = {
  past: "그동안 당신이 걸어온 과거의 기반입니다. 당시 겪은 상황이나 마음에 품었던 내면의 에너지가 현재까지 긴밀하게 연결되어 영향을 주고 있습니다.",
  present: "현재 직면한 상황의 실체와 핵심 키입니다. 겉보기와 다를 수 있는 본질적인 기류를 분석해 주며, 가장 주의 깊게 들여다봐야 할 당면 과제입니다.",
  future: "앞으로 전개될 다가올 흐름의 결과이자 이정표입니다. 현재 행동 기조를 유지하거나 카드 조언대로 방향을 보강했을 때 우주가 준비해 준 도달 지점입니다."
};
