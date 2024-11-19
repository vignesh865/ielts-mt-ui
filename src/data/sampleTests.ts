export const sampleTests = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  title: `IELTS ${i % 2 === 0 ? 'Academic' : 'General'} Test ${i + 1}`,
  type: i % 2 === 0 ? 'Academic' : 'General' as const,
  description: `Complete ${i % 2 === 0 ? 'academic' : 'general'} IELTS test`,
  duration: 170,
  sections: {
    listening: true,
    reading: true,
    writing: true,
    speaking: true
  },
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  difficulty: (['Easy', 'Medium', 'Hard'] as const)[i % 3]
}));