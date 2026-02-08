/**
 * Client-only lib loaders - dynamic imports to avoid bundling in server (Cloudflare 25 MiB limit).
 * Call only in browser: useEffect, event handlers, or after typeof window !== 'undefined'.
 */
export async function getXlsx() {
  const mod = await import('xlsx');
  return mod;
}

export async function getFirebase() {
  const [app, auth, firestore] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
    import('firebase/firestore'),
  ]);
  return {
    initializeApp: app.initializeApp,
    getAuth: auth.getAuth,
    signInAnonymously: auth.signInAnonymously,
    signInWithCustomToken: auth.signInWithCustomToken,
    onAuthStateChanged: auth.onAuthStateChanged,
    getFirestore: firestore.getFirestore,
    collection: firestore.collection,
    addDoc: firestore.addDoc,
    getDocs: firestore.getDocs,
    updateDoc: firestore.updateDoc,
    deleteDoc: firestore.deleteDoc,
    doc: firestore.doc,
    query: firestore.query,
    orderBy: firestore.orderBy,
    onSnapshot: firestore.onSnapshot,
    serverTimestamp: firestore.serverTimestamp,
  };
}

export async function getD3() {
  const mod = await import('d3');
  return mod;
}

export async function getRecharts() {
  const mod = await import('recharts');
  return mod;
}

export async function getChartJs() {
  const [chartJs, reactChartJs] = await Promise.all([
    import('chart.js'),
    import('react-chartjs-2'),
  ]);
  return {
    ChartJS: chartJs.Chart,
    ArcElement: chartJs.ArcElement,
    Tooltip: chartJs.Tooltip,
    Legend: chartJs.Legend,
    CategoryScale: chartJs.CategoryScale,
    LinearScale: chartJs.LinearScale,
    PointElement: chartJs.PointElement,
    LineElement: chartJs.LineElement,
    Title: chartJs.Title,
    BarElement: chartJs.BarElement,
    Filler: chartJs.Filler,
    ...reactChartJs,
  };
}
