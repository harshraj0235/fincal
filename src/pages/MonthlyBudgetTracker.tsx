import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Edit, Trash2, Download, XCircle, CheckCircle, BarChart2 } from 'lucide-react';

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const initialIncome = { source: '', amount: '' };
const initialExpense = { category: '', type: 'Fixed', amount: '' };
const initialGoal = { goal: '', target: '' };

const MonthlyBudgetTracker = () => {
  // Firebase/auth state
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  // Data state
  const [income, setIncome] = useState([ { ...initialIncome } ]);
  const [expenses, setExpenses] = useState([ { ...initialExpense } ]);
  const [goals, setGoals] = useState([ { ...initialGoal } ]);
  const [editingIncomeIdx, setEditingIncomeIdx] = useState(null);
  const [editingExpenseIdx, setEditingExpenseIdx] = useState(null);
  const [editingGoalIdx, setEditingGoalIdx] = useState(null);
  const [formIncome, setFormIncome] = useState({ ...initialIncome });
  const [formExpense, setFormExpense] = useState({ ...initialExpense });
  const [formGoal, setFormGoal] = useState({ ...initialGoal });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Firebase init
  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);
      setDb(firestore);
      setAuth(firebaseAuth);
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) setUserId(user.uid);
        else {
          if (initialAuthToken) await signInWithCustomToken(firebaseAuth, initialAuthToken);
          else await signInAnonymously(firebaseAuth);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      setError('Failed to initialize Firebase.');
      setLoading(false);
    }
  }, []);

  // Chart.js dynamic import
  const [ChartComponent, setChartComponent] = useState(null);
  useEffect(() => {
    import('react-chartjs-2').then(mod => setChartComponent(() => mod.Bar));
  }, []);

  // Render
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-6 mb-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2"><BarChart2 /> Monthly Budget Tracker</h1>
      {/* Income, Expenses, Goals forms and tables here */}
      {/* Chart here if ChartComponent is loaded */}
      {ChartComponent && <ChartComponent data={{ labels: ['Income', 'Expenses', 'Savings'], datasets: [{ label: 'Amount', data: [1000, 800, 200], backgroundColor: ['#38bdf8', '#f87171', '#34d399'] }] }} />}
    </div>
  );
};

export default MonthlyBudgetTracker; 