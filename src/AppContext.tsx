import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSettings, Plan } from './types';
import { storage } from './lib/storage';

interface AppContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  t: (key: string) => string;
  playSound: (type: 'click' | 'success' | 'error' | 'pop' | 'game') => void;
  useCredits: (amount: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  en: {
    appName: "Bill Crown 3",
    start: "START",
    upgrade: "Upgrade",
    settings: "Settings",
    createBill: "Create Bill",
    history: "Bill History",
    game: "Mini Game",
    calculator: "Calculator",
    shopName: "Shop Name",
    customerName: "Customer Name",
    productName: "Product Name",
    quantity: "Quantity",
    price: "Price",
    unit: "Unit",
    addProduct: "Add Product",
    total: "Total",
    paid: "Paid",
    remaining: "Remaining",
    generate: "Generate Bill",
    downloadPDF: "Download PDF",
    downloadJPG: "Download JPG",
    downloadPNG: "Download PNG",
    back: "Back",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    noBills: "No bills found",
    locked: "Locked",
    unlockPro: "Unlock Pro",
    unlockPremium: "Unlock Premium",
    activationKey: "Activation Key",
    enterKey: "Enter Key",
    activate: "Activate",
    theme: "Theme Color",
    language: "Language",
    privacy: "Privacy Policy",
    contact: "Contact",
    donate: "Donate",
    createdBy: "Created By Muzamil",
    watermark: "Created By Bill Crown 3 + Muzamil",
    customWatermark: "Custom Watermark",
    address: "Address",
    phone: "Phone",
    payVia: "Pay via EasyPaisa",
    sendSMS: "Send SMS 'Bill 3' to 03349825814",
    adminKey: "Admin sends activation key",
    modes: "Modes",
    fruits: "Fruits",
    fastFood: "Fast Food",
    money: "Money",
    score: "Score",
    gameOver: "Game Over",
    playAgain: "Play Again",
    credits: "Credits",
    unlimited: "Unlimited",
    insufficientCredits: "Insufficient Credits! Please Upgrade.",
    premiumOnly: "Premium Feature Only",
  },
  ur: {
    appName: "بل کراؤن 3",
    start: "شروع کریں",
    upgrade: "اپ گریڈ",
    settings: "سیٹنگز",
    createBill: "بل بنائیں",
    history: "بلوں کی تاریخ",
    game: "منی گیم",
    calculator: "کیلکولیٹر",
    shopName: "دکان کا نام",
    customerName: "گاہک کا نام",
    productName: "پروڈکٹ کا نام",
    quantity: "مقدار",
    price: "قیمت",
    unit: "یونٹ",
    addProduct: "پروڈکٹ شامل کریں",
    total: "کل رقم",
    paid: "ادا شدہ",
    remaining: "باقی",
    generate: "بل تیار کریں",
    downloadPDF: "پی ڈی ایف ڈاؤن لوڈ کریں",
    downloadJPG: "جے پی جی ڈاؤن لوڈ کریں",
    downloadPNG: "پی این جی ڈاؤن لوڈ کریں",
    back: "واپس",
    save: "محفوظ کریں",
    delete: "حذف کریں",
    edit: "ترمیم کریں",
    view: "دیکھیں",
    noBills: "کوئی بل نہیں ملا",
    locked: "مقفل",
    unlockPro: "پرو انلاک کریں",
    unlockPremium: "پریمیم انلاک کریں",
    activationKey: "ایکٹیویشن کی",
    enterKey: "کی درج کریں",
    activate: "ایکٹیویٹ کریں",
    theme: "تھیم کا رنگ",
    language: "زبان",
    privacy: "پرائیویسی پالیسی",
    contact: "رابطہ",
    donate: "عطیہ کریں",
    createdBy: "تیار کردہ: مزمل",
    watermark: "تیار کردہ: بل کراؤن 3 + مزمل",
    customWatermark: "کسٹم واٹر مارک",
    address: "پتہ",
    phone: "فون",
    payVia: "ایزی پیسہ کے ذریعے ادائیگی کریں",
    sendSMS: "ایس ایم ایس بھیجیں 'Bill 3' نمبر 03349825814 پر",
    adminKey: "ایڈمن ایکٹیویشن کی بھیجے گا",
    modes: "موڈز",
    fruits: "پھل",
    fastFood: "فاسٹ فوڈ",
    money: "پیسہ",
    score: "اسکور",
    gameOver: "گیم ختم",
    playAgain: "دوبارہ کھیلیں",
    credits: "کریڈٹ",
    unlimited: "لامحدود",
    insufficientCredits: "کریڈٹ ختم ہو گئے ہیں! براہ کرم اپ گریڈ کریں۔",
    premiumOnly: "صرف پریمیم فیچر",
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(storage.getSettings());

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', settings.themeColor);
    if (settings.themeMode === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [settings.themeColor, settings.themeMode]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    storage.saveSettings(updated);
  };

  const playSound = (type: 'click' | 'success' | 'error' | 'pop' | 'game') => {
    const sounds: Record<string, string> = {
      click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
      success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
      error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
      pop: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
      game: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'
    };
    const audio = new Audio(sounds[type]);
    audio.volume = 0.5;
    audio.play().catch(() => {}); // Ignore errors if browser blocks autoplay
  };

  const useCredits = (amount: number): boolean => {
    if (settings.plan === 'premium') return true;
    if (settings.credits >= amount) {
      updateSettings({ credits: settings.credits - amount });
      return true;
    }
    playSound('error');
    return false;
  };

  const t = (key: string) => {
    return translations[settings.language][key as keyof typeof translations['en']] || key;
  };

  return (
    <AppContext.Provider value={{ settings, updateSettings, t, playSound, useCredits }}>
      <div className={settings.language === 'ur' ? 'urdu-text' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
