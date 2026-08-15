export const programmaticBanks = [
  { id: 'sbi', name: 'SBI', fullName: 'State Bank of India', bankIndex: 0 },
  { id: 'hdfc', name: 'HDFC', fullName: 'HDFC Bank', bankIndex: 1 },
  { id: 'icici', name: 'ICICI', fullName: 'ICICI Bank', bankIndex: 2 },
  { id: 'axis', name: 'Axis Bank', fullName: 'Axis Bank', bankIndex: 3 },
  { id: 'kotak', name: 'Kotak', fullName: 'Kotak Mahindra Bank', bankIndex: 4 },
  { id: 'bob', name: 'Bank of Baroda', fullName: 'Bank of Baroda', bankIndex: 5 },
  { id: 'pnb', name: 'PNB', fullName: 'Punjab National Bank', bankIndex: 6 },
  { id: 'canara', name: 'Canara Bank', fullName: 'Canara Bank', bankIndex: 7 }
];

export const programmaticLoanTypes = [
  { id: 'home-loan', name: 'Home Loan', presetIndex: 0 },
  { id: 'car-loan', name: 'Car Loan', presetIndex: 1 },
  { id: 'personal-loan', name: 'Personal Loan', presetIndex: 2 },
  { id: 'education-loan', name: 'Education Loan', presetIndex: 3 }
];

export const programmaticCities = [
  { id: 'bangalore', name: 'Bangalore' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'delhi', name: 'Delhi' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'pune', name: 'Pune' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'ahmedabad', name: 'Ahmedabad' },
  { id: 'jaipur', name: 'Jaipur' },
  { id: 'surat', name: 'Surat' }
];

// Helper to find match from slug (e.g., "sbi-home-loan-emi-calculator" or "personal-loan-emi-calculator-in-bangalore")
export const matchProgrammaticEmiRoute = (slug: string) => {
  // Check Bank + Loan match first
  const bankMatch = slug.match(/^([a-z]+)-([a-z]+-loan)-emi-calculator$/);
  if (bankMatch) {
    const bankId = bankMatch[1];
    const loanTypeId = bankMatch[2];

    const bank = programmaticBanks.find(b => b.id === bankId);
    const loanType = programmaticLoanTypes.find(l => l.id === loanTypeId);

    if (bank && loanType) {
      return { type: 'bank', bank, loanType };
    }
  }

  // Check Loan + City match
  const cityMatch = slug.match(/^([a-z]+-loan)-emi-calculator-in-([a-z]+)$/);
  if (cityMatch) {
    const loanTypeId = cityMatch[1];
    const cityId = cityMatch[2];

    const loanType = programmaticLoanTypes.find(l => l.id === loanTypeId);
    const city = programmaticCities.find(c => c.id === cityId);

    if (loanType && city) {
      return { type: 'city', city, loanType };
    }
  }

  return null;
};
