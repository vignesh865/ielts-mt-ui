export const parts = [
  {
    part: 1,
    title: 'Academic Reading Passage 1',
    description: 'A complex text on an academic topic.',
    text: `The human brain is perhaps the most complex structure known to mankind. Its intricate network of neurons, synapses, and neural pathways continues to fascinate scientists and researchers worldwide. Recent studies have shown that the brain's plasticity—its ability to form and reorganize synaptic connections—remains active throughout life, contrary to earlier beliefs that brain development stopped in childhood.

    Research has demonstrated that learning new skills, engaging in physical exercise, and maintaining social connections can all contribute to enhanced brain plasticity. This understanding has led to revolutionary approaches in rehabilitation for patients with brain injuries and new strategies for maintaining cognitive health as we age.

    Moreover, advances in neuroimaging technologies have allowed scientists to observe the brain in action, revealing how different regions work together in complex cognitive tasks. This has provided unprecedented insights into memory formation, decision-making processes, and emotional responses.`,
    questions: [
      {
        id: 'r1q1',
        type: 'T_F_NG',
        question: 'The human brain stops developing after childhood.',
        correctAnswer: 'F'
      },
      {
        id: 'r1q2',
        type: 'MULTIPLE_CHOICE',
        question: 'What is the main topic of the passage?',
        choices: [
          { id: 'a', text: 'Brain surgery techniques' },
          { id: 'b', text: 'Neural plasticity' },
          { id: 'c', text: 'Childhood development' },
          { id: 'd', text: 'Scientific research methods' }
        ],
        correctAnswers: ['b']
      },
      {
        id: 'r1q3',
        type: 'MATCHING_FEATURES',
        question: 'Match the scientific terms with their descriptions.',
        features: [],
        statements: ['Neurons', 'Synapses', 'Neural pathways'],
        matches: ['Communication points', 'Brain cells', 'Connection routes']
      }
    ]
  },
  {
    part: 2,
    title: 'Academic Reading Passage 2',
    description: 'An academic article or research paper excerpt.',
    text: `Climate change represents one of the most significant challenges facing our planet today. The increasing concentration of greenhouse gases in the atmosphere has led to rising global temperatures, affecting ecosystems worldwide. Scientists have observed dramatic changes in weather patterns, sea levels, and biodiversity.

    The impact of climate change extends beyond environmental concerns. Economic systems, agriculture, and human health are all vulnerable to these changes. Coastal communities face increased risks from rising sea levels, while agricultural regions must adapt to shifting weather patterns and growing seasons.

    International cooperation and immediate action are essential to address this global crisis. While renewable energy technologies and sustainable practices offer promising solutions, implementation requires significant political will and public support.`,
    questions: [
      {
        id: 'r2q1',
        type: 'SENTENCE_COMPLETION',
        question: 'Complete the summary using words from the passage.',
        text: 'Climate change is caused by _ gases in the atmosphere, leading to _ temperatures and affecting _.',
        blanks: 3,
        choices: [
          { id: '1', text: 'greenhouse' },
          { id: '2', text: 'rising' },
          { id: '3', text: 'ecosystems' }
        ]
      },
      {
        id: 'r2q2',
        type: 'SHORT_ANSWER',
        question: 'List two effects of climate change mentioned in the passage.',
        maxWords: 20
      }
    ]
  },
  {
    part: 3,
    title: 'Academic Reading Passage 3',
    description: 'A detailed academic text with complex arguments.',
    text: `Artificial Intelligence has revolutionized numerous industries, from healthcare to transportation. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions with unprecedented accuracy. However, ethical concerns about AI decision-making and privacy remain significant challenges.

    The healthcare sector has seen particularly dramatic improvements through AI implementation. From diagnostic assistance to drug discovery, AI systems are accelerating medical research and improving patient care. Yet, questions about data privacy and the reliability of AI-driven decisions persist.

    As AI technology continues to evolve, the need for robust regulatory frameworks and ethical guidelines becomes increasingly apparent. Balancing innovation with responsible development remains a key challenge for the field.`,
    questions: [
      {
        id: 'r3q1',
        type: 'TABLE_COMPLETION',
        question: 'Complete the table about AI applications.',
        text: 'Industry: _\nApplication: _\nBenefit: _\nChallenge: _',
        blanks: 4
      },
      {
        id: 'r3q2',
        type: 'SINGLE_CHOICE',
        question: 'What is the main concern about AI mentioned in the passage?',
        choices: [
          { id: 'a', text: 'Processing speed' },
          { id: 'b', text: 'Cost of implementation' },
          { id: 'c', text: 'Ethical implications' },
          { id: 'd', text: 'Technical limitations' }
        ],
        correctAnswer: 'c'
      }
    ]
  }
];
