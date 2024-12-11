import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Users, Infinity, Brain, MessageSquare, Sparkles } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import TestCard from '../components/TestCard';
import type { Test } from '../types/test';

const fetchTests = async ({
  pageParam = 1,
}): Promise<{ tests: Test[]; nextPage: number | null }> => {
  const host = import.meta.env.VITE_API_HOST;
  const pageSize = 12;
  const start = (pageParam - 1) * pageSize;

  try {
    const response = await fetch(
      `${host}/ielts/all?skip=${start}&limit=${pageSize}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'anyvalue',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch tests');
    }

    const tests = await response.json();

    return {
      tests: tests.filter((test: Test) => test.test_type == 'GENERAL'),
      nextPage: tests.length === pageSize ? pageParam + 1 : null,
    };
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};

const features = [
  {
    icon: <Infinity className="w-6 h-6" />,
    title: "Endless Practice",
    description: "Access thousands of unique IELTS tests to perfect your skills",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Always Fresh",
    description: "Never see the same test twice with our dynamic test generation",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Comprehensive Evaluation",
    description: "Get detailed feedback for listening, reading, writing, and speaking",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Authentic Experience",
    description: "Practice with tests that closely mirror the real IELTS exam",
  }
];

function Home() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      initialPageParam: 1,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to Load Tests
          </h2>
          <p className="text-red-500 mb-4">
            There was an error loading the test list. Please try again.
          </p>
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

  const allTests = data?.pages.flatMap((page) => page.tests) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="relative overflow-hidden bg-indigo-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90" />
          <img
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1920&auto=format&fit=crop&q=80"
            alt="Students studying"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-8">
              Master IELTS with AI
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto text-indigo-100">
              Practice with our comprehensive test platform designed to help you achieve your target score.
            </p>
            <div className="mt-10">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors">
                Start Free Practice
              </button>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all"
              >
                <div className="p-3 bg-white bg-opacity-20 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-indigo-100">{feature.description}</p>
              </div>
            ))}
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
                <h2 className="text-2xl font-bold text-gray-900">
                  General Training
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Practice tests designed for those seeking to demonstrate English
                language proficiency for work, training programs, or migration
                purposes.
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
                Comprehensive practice tests for students planning to study at
                undergraduate or postgraduate levels.
              </p>
              <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-center">Coming Soon</p>
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