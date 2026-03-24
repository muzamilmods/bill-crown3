import { Bill, UserSettings } from '../types';

const BILLS_KEY = 'bill_crown_3_bills';
const SETTINGS_KEY = 'bill_crown_3_settings';

export const storage = {
  getBills: (): Bill[] => {
    const data = localStorage.getItem(BILLS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveBill: (bill: Bill) => {
    const bills = storage.getBills();
    const index = bills.findIndex(b => b.id === bill.id);
    if (index > -1) {
      bills[index] = bill;
    } else {
      bills.push(bill);
    }
    localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
  },
  deleteBill: (id: string) => {
    const bills = storage.getBills().filter(b => b.id !== id);
    localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
  },
  getSettings: (): UserSettings => {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : {
      plan: 'free',
      activationKey: '',
      themeColor: '#00f2ff', // Default neon cyan
      themeMode: 'dark',
      language: 'en',
      credits: 100,
      firstTime: true
    };
  },
  saveSettings: (settings: UserSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
};
