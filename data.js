const TOPICS = [
  {
    title: '자기소개',
    level: '기초',
    desc: '이름, 직업, 취미 등 기본 자기소개 표현',
    phrases: [
      { ko: '저는 ~입니다.', en: 'I am ~.', zh: '我是~。', py: 'Wǒ shì ~.' },
      { ko: '만나서 반갑습니다.', en: 'Nice to meet you.', zh: '很高兴认识你。', py: 'Hěn gāoxìng rènshi nǐ.' },
      { ko: '저는 한국에서 왔습니다.', en: 'I am from Korea.', zh: '我来自韩国。', py: 'Wǒ láizì Hánguó.' },
      { ko: '저는 ~로 일하고 있습니다.', en: 'I work as a ~.', zh: '我是做~的。', py: 'Wǒ shì zuò ~ de.' },
      { ko: '제 취미는 ~입니다.', en: 'My hobby is ~.', zh: '我的爱好是~。', py: 'Wǒ de àihào shì ~.' },
      { ko: '잘 부탁드립니다.', en: 'I look forward to working with you.', zh: '请多关照。', py: 'Qǐng duō guānzhào.' },
    ],
    quiz: [
      { ko: '저는 서울 출신입니다.', en: 'I am from Seoul.', zh: '我来自首尔。', py: 'Wǒ láizì Shǒuěr.' },
      { ko: '저는 마케터로 일하고 있어요.', en: 'I work as a marketer.', zh: '我是做市场营销的。', py: 'Wǒ shì zuò shìchǎng yíngxiāo de.' },
      { ko: '제 취미는 독서입니다.', en: 'My hobby is reading.', zh: '我的爱好是读书。', py: 'Wǒ de àihào shì dúshū.' },
    ]
  },
  {
    title: '카페에서',
    level: '기초',
    desc: '음료 주문, 추천 요청 등 카페 상황 표현',
    phrases: [
      { ko: '아메리카노 한 잔 주세요.', en: 'One Americano, please.', zh: '请给我一杯美式咖啡。', py: 'Qǐng gěi wǒ yī bēi Měishì kāfēi.' },
      { ko: '따뜻한 걸로 주세요.', en: "I'd like it hot, please.", zh: '请给我热的。', py: 'Qǐng gěi wǒ rè de.' },
      { ko: '여기서 드실 건가요, 가져가실 건가요?', en: 'For here or to go?', zh: '在这里喝还是带走？', py: 'Zài zhèlǐ hē háishi dài zǒu?' },
      { ko: '얼마예요?', en: 'How much is it?', zh: '多少钱？', py: 'Duōshao qián?' },
      { ko: '추천해 주실 수 있나요?', en: 'Can you recommend something?', zh: '你能推荐一下吗？', py: 'Nǐ néng tuījiàn yīxià ma?' },
      { ko: '영수증 주세요.', en: 'Can I have a receipt?', zh: '请给我收据。', py: 'Qǐng gěi wǒ shōujù.' },
    ],
    quiz: [
      { ko: '아이스로 주세요.', en: "I'd like it iced, please.", zh: '请给我冰的。', py: 'Qǐng gěi wǒ bīng de.' },
      { ko: '카드로 계산할게요.', en: "I'll pay by card.", zh: '我用银行卡付款。', py: 'Wǒ yòng yínhángkǎ fùkuǎn.' },
      { ko: '가장 인기 있는 음료가 뭐예요?', en: "What's the most popular drink?", zh: '最受欢迎的饮料是什么？', py: 'Zuì shòu huānyíng de yǐnliào shì shénme?' },
    ]
  },
  {
    title: '쇼핑',
    level: '기초',
    desc: '물건 구매, 가격 흥정, 교환/환불 표현',
    phrases: [
      { ko: '이거 얼마예요?', en: 'How much is this?', zh: '这个多少钱？', py: 'Zhège duōshao qián?' },
      { ko: '다른 색상 있나요?', en: 'Do you have this in another color?', zh: '有其他颜色吗？', py: 'Yǒu qítā yánsè ma?' },
      { ko: '입어봐도 될까요?', en: 'Can I try this on?', zh: '我可以试穿吗？', py: 'Wǒ kěyǐ shì chuān ma?' },
      { ko: '좀 더 싸게 해주실 수 있나요?', en: 'Can you give me a discount?', zh: '能便宜一点吗？', py: 'Néng piányí yīdiǎn ma?' },
      { ko: '환불이 가능한가요?', en: 'Is a refund possible?', zh: '可以退款吗？', py: 'Kěyǐ tuìkuǎn ma?' },
      { ko: '영수증을 보여주세요.', en: 'Please show me your receipt.', zh: '请出示收据。', py: 'Qǐng chūshì shōujù.' },
    ],
    quiz: [
      { ko: '사이즈 교환이 가능한가요?', en: 'Can I exchange the size?', zh: '可以换尺码吗？', py: 'Kěyǐ huàn chǐmǎ ma?' },
      { ko: '이게 가장 저렴한 건가요?', en: 'Is this the cheapest one?', zh: '这是最便宜的吗？', py: 'Zhè shì zuì piányí de ma?' },
      { ko: '카드 결제 되나요?', en: 'Do you accept card payment?', zh: '可以刷卡吗？', py: 'Kěyǐ shuā kǎ ma?' },
    ]
  },
  {
    title: '식당에서',
    level: '기초',
    desc: '음식 주문, 메뉴 추천, 계산 등 표현',
    phrases: [
      { ko: '2명 자리 있나요?', en: 'Do you have a table for two?', zh: '有两人桌吗？', py: 'Yǒu liǎng rén zhuō ma?' },
      { ko: '메뉴 주세요.', en: 'Can I see the menu?', zh: '请给我菜单。', py: 'Qǐng gěi wǒ càidān.' },
      { ko: '이 음식에 견과류가 들어있나요?', en: 'Does this dish contain nuts?', zh: '这道菜含有坚果吗？', py: 'Zhè dào cài hányǒu jiānguǒ ma?' },
      { ko: '이걸로 주세요.', en: "I'll have this, please.", zh: '我要这个。', py: 'Wǒ yào zhège.' },
      { ko: '계산서 주세요.', en: 'Check, please.', zh: '请结账。', py: 'Qǐng jiézhàng.' },
      { ko: '음식이 정말 맛있었어요.', en: 'The food was delicious.', zh: '菜非常好吃。', py: 'Cài fēicháng hǎochī.' },
    ],
    quiz: [
      { ko: '이 근처 맛집 추천해 주실 수 있나요?', en: 'Can you recommend a good restaurant nearby?', zh: '能推荐附近的好餐厅吗？', py: 'Néng tuījiàn fùjìn de hǎo cāntīng ma?' },
      { ko: '물 좀 더 주실 수 있나요?', en: 'Could I have some more water?', zh: '能再给我一些水吗？', py: 'Néng zài gěi wǒ yīxiē shuǐ ma?' },
      { ko: '포장해 주세요.', en: "Can I get this to go?", zh: '请帮我打包。', py: 'Qǐng bāng wǒ dǎbāo.' },
    ]
  },
  {
    title: '날씨와 일상',
    level: '기초',
    desc: '날씨 이야기, 주말 계획 등 가벼운 대화',
    phrases: [
      { ko: '오늘 날씨가 정말 좋네요.', en: 'The weather is really nice today.', zh: '今天天气真好。', py: 'Jīntiān tiānqì zhēn hǎo.' },
      { ko: '이번 주말에 뭐 할 거예요?', en: 'What are you doing this weekend?', zh: '这个周末你打算做什么？', py: 'Zhège zhōumò nǐ dǎsuàn zuò shénme?' },
      { ko: '요즘 어떻게 지내세요?', en: 'How have you been lately?', zh: '最近怎么样？', py: 'Zuìjìn zěnmeyàng?' },
      { ko: '비가 올 것 같아요.', en: "It looks like it's going to rain.", zh: '好像要下雨了。', py: 'Hǎoxiàng yào xià yǔ le.' },
      { ko: '정말 더운 날씨네요.', en: "It's really hot today.", zh: '天气真热。', py: 'Tiānqì zhēn rè.' },
      { ko: '주말 잘 보내세요!', en: 'Have a great weekend!', zh: '周末愉快！', py: 'Zhōumò yúkuài!' },
    ],
    quiz: [
      { ko: '오늘 정말 춥네요.', en: "It's really cold today.", zh: '今天真的很冷。', py: 'Jīntiān zhēn de hěn lěng.' },
      { ko: '요즘 많이 바빠요.', en: "I've been really busy lately.", zh: '最近很忙。', py: 'Zuìjìn hěn máng.' },
      { ko: '좋은 하루 되세요!', en: 'Have a good day!', zh: '祝你今天愉快！', py: 'Zhù nǐ jīntiān yúkuài!' },
    ]
  },
  {
    title: '길 찾기',
    level: '중급',
    desc: '길을 묻고 답하는 표현',
    phrases: [
      { ko: '~에 어떻게 가나요?', en: 'How do I get to ~?', zh: '怎么去~？', py: 'Zěnme qù ~?' },
      { ko: '여기서 얼마나 걸려요?', en: 'How long does it take from here?', zh: '从这里需要多长时间？', py: 'Cóng zhèlǐ xūyào duō cháng shíjiān?' },
      { ko: '지하철역이 어디 있나요?', en: 'Where is the subway station?', zh: '地铁站在哪里？', py: 'Dìtiě zhàn zài nǎlǐ?' },
      { ko: '직진하세요.', en: 'Go straight ahead.', zh: '直走。', py: 'Zhí zǒu.' },
      { ko: '다음 신호등에서 왼쪽으로 도세요.', en: 'Turn left at the next traffic light.', zh: '在下一个红绿灯左转。', py: 'Zài xià yī gè hónglǜdēng zuǒ zhuǎn.' },
      { ko: '길을 잃었어요.', en: "I'm lost.", zh: '我迷路了。', py: 'Wǒ mí lù le.' },
    ],
    quiz: [
      { ko: '가장 가까운 버스 정류장이 어디예요?', en: 'Where is the nearest bus stop?', zh: '最近的公交站在哪里？', py: 'Zuìjìn de gōngjiāo zhàn zài nǎlǐ?' },
      { ko: '걸어서 갈 수 있나요?', en: 'Can I walk there?', zh: '可以走路去吗？', py: 'Kěyǐ zǒulù qù ma?' },
      { ko: '지도 좀 보여주실 수 있나요?', en: 'Could you show me on the map?', zh: '能在地图上指给我看吗？', py: 'Néng zài dìtú shàng zhǐ gěi wǒ kàn ma?' },
    ]
  },
  {
    title: '취미와 관심사',
    level: '중급',
    desc: '좋아하는 것들에 대해 이야기하는 표현',
    phrases: [
      { ko: '취미가 뭐예요?', en: 'What are your hobbies?', zh: '你的爱好是什么？', py: 'Nǐ de àihào shì shénme?' },
      { ko: '저는 요리하는 걸 좋아해요.', en: 'I enjoy cooking.', zh: '我喜欢做饭。', py: 'Wǒ xǐhuān zuòfàn.' },
      { ko: '어떤 장르의 음악을 좋아하세요?', en: 'What genre of music do you like?', zh: '你喜欢什么类型的音乐？', py: 'Nǐ xǐhuān shénme lèixíng de yīnyuè?' },
      { ko: '요즘 어떤 드라마 보고 있어요?', en: 'What drama are you watching these days?', zh: '最近在看什么剧？', py: 'Zuìjìn zài kàn shénme jù?' },
      { ko: '주말에 주로 뭐 해요?', en: 'What do you usually do on weekends?', zh: '周末一般做什么？', py: 'Zhōumò yībān zuò shénme?' },
      { ko: '저도 그거 좋아해요!', en: 'I like that too!', zh: '我也喜欢！', py: 'Wǒ yě xǐhuān!' },
    ],
    quiz: [
      { ko: '운동을 자주 하세요?', en: 'Do you exercise often?', zh: '你经常运动吗？', py: 'Nǐ jīngcháng yùndòng ma?' },
      { ko: '저는 여행을 정말 좋아해요.', en: 'I really enjoy traveling.', zh: '我非常喜欢旅行。', py: 'Wǒ fēicháng xǐhuān lǚxíng.' },
      { ko: '독서를 즐기세요?', en: 'Do you enjoy reading?', zh: '你喜欢阅读吗？', py: 'Nǐ xǐhuān yuèdú ma?' },
    ]
  },
  {
    title: '약속 잡기',
    level: '중급',
    desc: '만남 약속을 잡고 조율하는 표현',
    phrases: [
      { ko: '다음 주에 시간 있으세요?', en: 'Are you free next week?', zh: '你下周有空吗？', py: 'Nǐ xià zhōu yǒu kòng ma?' },
      { ko: '몇 시가 편하세요?', en: 'What time works for you?', zh: '你几点方便？', py: 'Nǐ jǐ diǎn fāngbiàn?' },
      { ko: '~에서 만날까요?', en: 'Shall we meet at ~?', zh: '我们在~见面好吗？', py: 'Wǒmen zài ~ jiànmiàn hǎo ma?' },
      { ko: '약속을 미뤄도 될까요?', en: 'Can we postpone our meeting?', zh: '我们可以推迟一下吗？', py: 'Wǒmen kěyǐ tuīchí yīxià ma?' },
      { ko: '그날은 좀 어려울 것 같아요.', en: "That day doesn't work for me.", zh: '那天可能不太方便。', py: 'Nà tiān kěnéng bú tài fāngbiàn.' },
      { ko: '그럼 화요일 3시 어때요?', en: 'How about Tuesday at 3pm?', zh: '那周二下午三点怎么样？', py: 'Nà Zhōuèr xiàwǔ sān diǎn zěnmeyàng?' },
    ],
    quiz: [
      { ko: '내일 오후에 만날 수 있어요?', en: 'Can we meet tomorrow afternoon?', zh: '明天下午能见面吗？', py: 'Míngtiān xiàwǔ néng jiànmiàn ma?' },
      { ko: '장소는 어디가 좋을까요?', en: 'Where would be a good place to meet?', zh: '在哪里见面比较好？', py: 'Zài nǎlǐ jiànmiàn bǐjiào hǎo?' },
      { ko: '갑자기 일이 생겨서 못 갈 것 같아요.', en: "Something came up, so I don't think I can make it.", zh: '突然有事，我可能去不了了。', py: 'Tūrán yǒu shì, wǒ kěnéng qù bù liǎo le.' },
    ]
  },
  {
    title: '교통과 여행',
    level: '중급',
    desc: '대중교통 이용, 여행 계획 등 표현',
    phrases: [
      { ko: '~행 기차표 한 장 주세요.', en: 'One ticket to ~, please.', zh: '请给我一张去~的票。', py: 'Qǐng gěi wǒ yī zhāng qù ~ de piào.' },
      { ko: '다음 버스는 언제 오나요?', en: 'When does the next bus come?', zh: '下一班公交车什么时候来？', py: 'Xià yī bān gōngjiāo chē shénme shíhou lái?' },
      { ko: '짐을 맡길 수 있나요?', en: 'Can I check my luggage?', zh: '我可以寄存行李吗？', py: 'Wǒ kěyǐ jìcún xíngli ma?' },
      { ko: '환승은 어디서 하나요?', en: 'Where do I transfer?', zh: '在哪里换乘？', py: 'Zài nǎlǐ huànchéng?' },
      { ko: '이 도시에서 꼭 가봐야 할 곳이 있나요?', en: 'Are there any must-see places in this city?', zh: '这个城市有什么必去的地方吗？', py: 'Zhège chéngshì yǒu shénme bì qù de dìfāng ma?' },
      { ko: '체크인은 몇 시예요?', en: 'What time is check-in?', zh: '几点可以入住？', py: 'Jǐ diǎn kěyǐ rùzhù?' },
    ],
    quiz: [
      { ko: '공항까지 얼마나 걸려요?', en: 'How long does it take to get to the airport?', zh: '去机场需要多长时间？', py: 'Qù jīchǎng xūyào duō cháng shíjiān?' },
      { ko: '이 버스가 시내로 가나요?', en: 'Does this bus go to the city center?', zh: '这辆公交车去市中心吗？', py: 'Zhè liàng gōngjiāo chē qù shì zhōngxīn ma?' },
      { ko: '창가 자리로 주세요.', en: 'I would like a window seat, please.', zh: '请给我靠窗的座位。', py: 'Qǐng gěi wǒ kào chuāng de zuòwèi.' },
    ]
  },
  {
    title: '건강과 병원',
    level: '중급',
    desc: '증상 설명, 병원 예약 등 표현',
    phrases: [
      { ko: '배가 아파요.', en: 'I have a stomachache.', zh: '我肚子痛。', py: 'Wǒ dùzi tòng.' },
      { ko: '머리가 아파요.', en: 'I have a headache.', zh: '我头痛。', py: 'Wǒ tóutòng.' },
      { ko: '열이 있어요.', en: 'I have a fever.', zh: '我发烧了。', py: 'Wǒ fāshāo le.' },
      { ko: '진찰을 받고 싶어요.', en: "I'd like to see a doctor.", zh: '我想看医生。', py: 'Wǒ xiǎng kàn yīshēng.' },
      { ko: '이 약은 어떻게 먹나요?', en: 'How should I take this medicine?', zh: '这药怎么吃？', py: 'Zhè yào zěnme chī?' },
      { ko: '알레르기가 있어요.', en: 'I have an allergy.', zh: '我有过敏。', py: 'Wǒ yǒu guòmǐn.' },
    ],
    quiz: [
      { ko: '예약을 하고 싶어요.', en: "I'd like to make an appointment.", zh: '我想预约。', py: 'Wǒ xiǎng yùyuē.' },
      { ko: '언제부터 아팠어요?', en: 'Since when have you been feeling sick?', zh: '你从什么时候开始不舒服的？', py: 'Nǐ cóng shénme shíhou kāishǐ bù shūfu de?' },
      { ko: '처방전을 주실 수 있나요?', en: 'Can you give me a prescription?', zh: '能给我开处方吗？', py: 'Néng gěi wǒ kāi chǔfāng ma?' },
    ]
  },
  {
    title: '회사 소개',
    level: '비즈니스',
    desc: '내 회사와 업무를 소개하는 표현',
    phrases: [
      { ko: '저희 회사는 ~를 전문으로 합니다.', en: 'Our company specializes in ~.', zh: '我们公司专注于~。', py: 'Wǒmen gōngsī zhuānzhù yú ~.' },
      { ko: '저는 마케팅 부서에서 일합니다.', en: 'I work in the marketing department.', zh: '我在市场部工作。', py: 'Wǒ zài shìchǎng bù gōngzuò.' },
      { ko: '저희는 글로벌 팀을 보유하고 있습니다.', en: 'We have a global team.', zh: '我们有一个全球化的团队。', py: 'Wǒmen yǒu yī gè quánqiúhuà de tuánduì.' },
      { ko: '저희 회사는 10년의 업력을 가지고 있습니다.', en: 'Our company has 10 years of experience.', zh: '我们公司有10年的经验。', py: 'Wǒmen gōngsī yǒu shí nián de jīngyàn.' },
      { ko: '저희의 주요 고객은 ~입니다.', en: 'Our main clients are ~.', zh: '我们的主要客户是~。', py: 'Wǒmen de zhǔyào kèhù shì ~.' },
      { ko: '함께 협력할 수 있기를 기대합니다.', en: 'We look forward to collaborating with you.', zh: '期待与您合作。', py: 'Qīdài yǔ nín hézuò.' },
    ],
    quiz: [
      { ko: '저희 회사는 서울에 본사를 두고 있습니다.', en: 'Our company is headquartered in Seoul.', zh: '我们公司总部在首尔。', py: 'Wǒmen gōngsī zǒngbù zài Shǒuěr.' },
      { ko: '저는 3년째 이 회사에 재직 중입니다.', en: "I've been with this company for 3 years.", zh: '我在这家公司工作了3年。', py: 'Wǒ zài zhè jiā gōngsī gōngzuò le sān nián.' },
      { ko: '저희 팀은 총 15명으로 구성되어 있습니다.', en: 'Our team consists of 15 people in total.', zh: '我们团队共有15人。', py: 'Wǒmen tuánduì gòng yǒu shíwǔ rén.' },
    ]
  },
  {
    title: '비즈니스 미팅',
    level: '비즈니스',
    desc: '회의에서 의견 제시, 동의/반대 표현',
    phrases: [
      { ko: '오늘 미팅에 감사드립니다.', en: 'Thank you for meeting with us today.', zh: '感谢今天的会面。', py: 'Gǎnxiè jīntiān de huìmiàn.' },
      { ko: '의견을 말씀해 주시겠어요?', en: 'Could you share your thoughts?', zh: '您能分享一下您的想法吗？', py: 'Nín néng fēnxiǎng yīxià nín de xiǎngfǎ ma?' },
      { ko: '그 부분에 동의합니다.', en: 'I agree with that point.', zh: '我同意这一点。', py: 'Wǒ tóngyì zhè yī diǎn.' },
      { ko: '다른 관점에서 보면 어떨까요?', en: 'How about looking at it from a different angle?', zh: '从另一个角度来看怎么样？', py: 'Cóng lìng yī gè jiǎodù lái kàn zěnmeyàng?' },
      { ko: '다음 단계는 무엇인가요?', en: 'What are the next steps?', zh: '下一步是什么？', py: 'Xià yī bù shì shénme?' },
      { ko: '오늘 회의 내용을 정리해서 공유하겠습니다.', en: "I'll summarize and share the meeting notes.", zh: '我会整理并分享今天的会议记录。', py: 'Wǒ huì zhěnglǐ bìng fēnxiǎng jīntiān de huìyì jìlù.' },
    ],
    quiz: [
      { ko: '죄송하지만 그 부분은 재고가 필요할 것 같습니다.', en: "I'm sorry, but I think we need to reconsider that part.", zh: '抱歉，我认为那部分需要重新考虑。', py: 'Bàoqiàn, wǒ rènwéi nà bùfen xūyào chóngxīn kǎolǜ.' },
      { ko: '조금 더 자세히 설명해 주시겠어요?', en: 'Could you elaborate a little more?', zh: '您能详细说明一下吗？', py: 'Nín néng xiángxì shuōmíng yīxià ma?' },
      { ko: '다음 주까지 검토하고 연락드리겠습니다.', en: "I'll review it and get back to you by next week.", zh: '我会在下周之前审查并与您联系。', py: 'Wǒ huì zài xià zhōu zhīqián shěnchá bìng yǔ nín liánxì.' },
    ]
  },
  {
    title: '이메일 표현',
    level: '비즈니스',
    desc: '비즈니스 이메일 핵심 표현',
    phrases: [
      { ko: '안녕하세요, ~씨.', en: 'Dear ~,', zh: '尊敬的~，', py: 'Zūnjìng de ~,' },
      { ko: '이 이메일을 드리게 된 것은 ~때문입니다.', en: 'I am writing to you regarding ~.', zh: '我写这封邮件是关于~的。', py: 'Wǒ xiě zhè fēng yóujiàn shì guānyú ~ de.' },
      { ko: '빠른 회신 부탁드립니다.', en: 'I look forward to your prompt reply.', zh: '期待您的及时回复。', py: 'Qīdài nín de jíshí huífù.' },
      { ko: '첨부 파일을 확인해 주세요.', en: 'Please find the attached file.', zh: '请查看附件。', py: 'Qǐng chákàn fùjiàn.' },
      { ko: '불편을 드려 죄송합니다.', en: 'I apologize for any inconvenience.', zh: '对于给您带来的不便，我深表歉意。', py: 'Duìyú gěi nín dài lái de bùbiàn, wǒ shēn biǎo qiànyì.' },
      { ko: '감사합니다. (맺음말)', en: 'Best regards,', zh: '此致敬礼，', py: 'Cǐ zhì jìnglǐ,' },
    ],
    quiz: [
      { ko: '이전 메일의 후속으로 연락드립니다.', en: 'I am following up on my previous email.', zh: '我是就上封邮件进行跟进。', py: 'Wǒ shì jiù shàng fēng yóujiàn jìnxíng gēnjìn.' },
      { ko: '검토 후 의견 주시면 감사하겠습니다.', en: 'I would appreciate your feedback after reviewing.', zh: '审阅后如有意见，烦请告知。', py: 'Shěnyuè hòu rú yǒu yìjiàn, fán qǐng gàozhī.' },
      { ko: '궁금한 점이 있으시면 언제든지 연락 주세요.', en: "Please don't hesitate to contact me if you have any questions.", zh: '如有任何问题，请随时联系我。', py: 'Rú yǒu rènhé wèntí, qǐng suíshí liánxì wǒ.' },
    ]
  },
  {
    title: '프레젠테이션',
    level: '비즈니스',
    desc: '발표 시작, 전환, 마무리 표현',
    phrases: [
      { ko: '오늘 발표를 시작하겠습니다.', en: "I'd like to begin my presentation.", zh: '我想开始我的演示。', py: 'Wǒ xiǎng kāishǐ wǒ de yǎnshì.' },
      { ko: '먼저 ~에 대해 말씀드리겠습니다.', en: "First, I'd like to talk about ~.", zh: '首先，我想谈谈~。', py: 'Shǒuxiān, wǒ xiǎng tántan ~.' },
      { ko: '다음 슬라이드로 넘어가겠습니다.', en: "Let's move on to the next slide.", zh: '让我们进入下一张幻灯片。', py: 'Ràng wǒmen jìnrù xià yī zhāng huàndēngpiàn.' },
      { ko: '보시다시피 ~입니다.', en: 'As you can see, ~.', zh: '如您所见，~。', py: 'Rú nín suǒ jiàn, ~.' },
      { ko: '마지막으로 정리하겠습니다.', en: 'To summarize,', zh: '最后，总结一下，', py: 'Zuìhòu, zǒngjié yīxià,' },
      { ko: '질문 있으시면 말씀해 주세요.', en: 'Please feel free to ask any questions.', zh: '如有任何问题，欢迎提问。', py: 'Rú yǒu rènhé wèntí, huānyíng tí wèn.' },
    ],
    quiz: [
      { ko: '오늘 발표 들어주셔서 감사합니다.', en: 'Thank you for listening to my presentation.', zh: '感谢您聆听我的演示。', py: 'Gǎnxiè nín língtīng wǒ de yǎnshì.' },
      { ko: '이 데이터에서 알 수 있듯이 ~입니다.', en: 'As this data shows, ~.', zh: '从这些数据可以看出，~。', py: 'Cóng zhèxiē shùjù kěyǐ kàn chū, ~.' },
      { ko: '이 주제에 대해 15분간 발표하겠습니다.', en: 'I will present on this topic for 15 minutes.', zh: '我将就这个主题发表15分钟的演讲。', py: 'Wǒ jiāng jiù zhège zhǔtí fābiǎo shíwǔ fēnzhōng de yǎnjiǎng.' },
    ]
  },
  {
    title: '협상과 제안',
    level: '비즈니스',
    desc: '제안하고 협상하는 비즈니스 표현',
    phrases: [
      { ko: '~을 제안드리고 싶습니다.', en: "I'd like to propose ~.", zh: '我想提议~。', py: 'Wǒ xiǎng tíyì ~.' },
      { ko: '가격을 조정할 수 있나요?', en: 'Is there room to adjust the price?', zh: '价格有调整的余地吗？', py: 'Jiàgé yǒu tiáozhěng de yúdì ma?' },
      { ko: '이 조건은 수용하기 어렵습니다.', en: 'These terms are difficult to accept.', zh: '这些条款很难接受。', py: 'Zhèxiē tiáokuǎn hěn nán jiēshòu.' },
      { ko: '중간 지점을 찾아봅시다.', en: "Let's find a middle ground.", zh: '让我们找一个折中方案。', py: 'Ràng wǒmen zhǎo yī gè zhézhōng fāng\'àn.' },
      { ko: '추가 할인이 가능한가요?', en: 'Is an additional discount possible?', zh: '可以再打折吗？', py: 'Kěyǐ zài dǎzhé ma?' },
      { ko: '합의에 이르게 되어 기쁩니다.', en: "I'm pleased that we've reached an agreement.", zh: '很高兴我们达成了协议。', py: 'Hěn gāoxìng wǒmen dáchéngle xiéyì.' },
    ],
    quiz: [
      { ko: '이 제안을 긍정적으로 검토해 주시겠어요?', en: 'Would you consider this proposal favorably?', zh: '您能积极考虑这个提案吗？', py: 'Nín néng jījí kǎolǜ zhège tí\'àn ma?' },
      { ko: '계약서에 서명하기 전에 법무팀과 검토하겠습니다.', en: "I'll review it with our legal team before signing.", zh: '在签合同之前，我会和法务团队审查。', py: 'Zài qiān hétong zhīqián, wǒ huì hé fǎwù tuánduì shěnchá.' },
      { ko: '이 거래가 양측 모두에게 이익이 될 것입니다.', en: 'This deal will be beneficial for both parties.', zh: '这笔交易对双方都有利。', py: 'Zhè bǐ jiāoyì duì shuāngfāng dōu yǒulì.' },
    ]
  },
];
