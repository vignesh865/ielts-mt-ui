import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import LoadingState from '../components/LoadingState';
import TestCard from '../components/TestCard';
import { sampleTests } from '../data/sampleTests';
import type { Test } from '../types/test';

const fetchTests = async ({ pageParam = 1 }): Promise<{ tests: Test[]; nextPage: number | null }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const pageSize = 12;
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;
  const tests = sampleTests.slice(start, end);
  
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">IELTS Practice Tests</h1>

          {allTests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tests available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allTests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  onClick={handleTestClick}
                />
              ))}
            </div>
          )}

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