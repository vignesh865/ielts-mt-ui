import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Users } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import TestCard from '../components/TestCard';
import { sampleTests } from '../data/sampleTests';
import type { Test } from '../types/test';

const fetchTests = async ({ pageParam = 1 }): Promise<{ tests: Test[]; nextPage: number | null }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const pageSize = 12;
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;
  const tests = sampleTests.slice(start, end).filter(test => test.type === 'General');
  
  return {
    tests,
    nextPage: end < sampleTests.length ? pageParam + 1 : null
  };
};

function Home() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['tests'],
    queryFn: fetchTests,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleTestClick = (testId: string) => {
    navigate(`/test/${testId}/sections`);
  };

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <LoadingState message="Loading available tests..." />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Tests</h2>
          <p className="text-red-500 mb-4">There was an error loading the test list. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const allTests = data?.pages.flatMap(page => page.tests) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="relative overflow-hidden bg-indigo-600 text-white">
        <img
          src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1920&auto=format&fit=crop&q=80"
          alt="Students studying"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              IELTS Practice Tests
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Prepare for your IELTS exam with our comprehensive practice tests covering all four sections: Listening, Reading, Writing, and Speaking.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">General Training</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Practice tests designed for those seeking to demonstrate English language proficiency for work, training programs, or migration purposes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allTests.map((test) => (
                  <TestCard
                    key={test.id}
                    test={test}
                    onClick={handleTestClick}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Academic</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Comprehensive practice tests for students planning to study at undergraduate or postgraduate levels.
              </p>
              <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-center">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>

          {hasNextPage && (
            <div ref={ref} className="py-8">
              <LoadingState message="Loading more tests..." />
            </div>
          )}

          {!hasNextPage && allTests.length > 0 && (
            <p className="text-center text-gray-500 mt-8">
              You've reached the end of the list
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;