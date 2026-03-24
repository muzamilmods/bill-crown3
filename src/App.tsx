import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Trash2, Download, History, Gamepad2, Settings, 
  Crown, ArrowLeft, Mail, Heart, Globe, CheckCircle2,
  Smartphone, CreditCard, QrCode, X
} from 'lucide-react';
import { useApp } from './AppContext';
import { storage } from './lib/storage';
import { Bill, Product, Plan } from './types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

// --- Components ---

const Button = ({ children, onClick, className, variant = 'primary', disabled = false }: any) => {
  const { settings, playSound } = useApp();
  const base = "px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group";
  const variants: any = {
    primary: `bg-[var(--theme-color)] text-black shadow-[0_0_20px_var(--theme-color)] hover:shadow-[0_0_35px_var(--theme-color)]`,
    secondary: "glass text-white hover:bg-white/10",
    outline: "border-2 border-[var(--theme-color)] text-[var(--theme-color)] hover:bg-[var(--theme-color)]/10",
    danger: "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30"
  };

  const handleClick = (e: any) => {
    playSound('click');
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]" />
      {children}
    </button>
  );
};

const Card = ({ children, className, onClick }: any) => (
  <div onClick={onClick} className={`glass rounded-3xl p-6 ${className}`}>
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = "text", placeholder, className }: any) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {label && <label className="text-sm opacity-60 ml-2">{label}</label>}
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="glass px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--theme-color)] transition-all"
    />
  </div>
);

// --- Sub-Pages ---

const SplashScreen = ({ onStart }: any) => {
  const { settings, t, playSound } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => playSound('pop'), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: [0, 1.2, 0],
              x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
              y: [Math.random() * 600 - 300, Math.random() * 600 - 300]
            }}
            transition={{ 
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-[var(--theme-color)] rounded-full blur-[1px]"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-[var(--theme-color)]/5 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[var(--theme-color)]/5 blur-[150px] rounded-full"
        />
      </div>

      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <div className="relative mb-12 group">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotateY: [0, 180, 360]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <Crown size={140} className="text-[var(--theme-color)] neon-glow rounded-full p-6 bg-black/40 backdrop-blur-3xl border-4 border-[var(--theme-color)]/30 shadow-[0_0_50px_var(--theme-color)]/20" />
          </motion.div>
          <div className="absolute -inset-10 bg-[var(--theme-color)]/20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute -inset-16 bg-[var(--theme-color)]/10 blur-2xl rounded-full animate-ping opacity-30" />
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <h1 className="text-7xl font-black tracking-tighter italic uppercase leading-none select-none">
            BILL <span className="text-[var(--theme-color)] neon-text">CROWN</span>
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[var(--theme-color)]/40" />
            <p className="text-[10px] font-black tracking-[0.6em] opacity-40 uppercase">Version 3.0 GOLD</p>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[var(--theme-color)]/40" />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 relative"
        >
          <div className="absolute -inset-4 bg-[var(--theme-color)]/30 blur-xl rounded-full animate-pulse" />
          <button
            onClick={onStart}
            className="relative px-16 py-5 bg-white text-black font-black rounded-full text-2xl shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:shadow-[0_0_80px_var(--theme-color)] transition-all uppercase tracking-widest italic group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--theme-color)] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">{t('start')}</span>
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 text-[10px] font-black opacity-20 uppercase tracking-[0.4em] flex flex-col items-center gap-2">
        <div className="w-1 h-12 bg-gradient-to-b from-transparent to-[var(--theme-color)]/40" />
        Designed by Muzamil • 2026
      </div>
    </div>
  );
};

const Calculator = ({ onBack }: any) => {
  const { t, playSound } = useApp();
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNum = (num: string) => {
    playSound('pop');
    if (display === '0') setDisplay(num);
    else setDisplay(display + num);
  };

  const handleOp = (op: string) => {
    playSound('pop');
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    playSound('success');
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    playSound('click');
    setDisplay('0');
    setEquation('');
  };

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="glass p-2 rounded-full"><ArrowLeft /></button>
        <h2 className="text-2xl font-bold">{t('calculator')}</h2>
      </div>

      <div className="flex-1 flex flex-col gap-4 max-w-md mx-auto w-full">
        <Card className="text-right py-8 px-6 bg-black/40 border-[var(--theme-color)]/20">
          <p className="text-sm opacity-40 h-6">{equation}</p>
          <p className="text-5xl font-black tracking-tighter truncate">{display}</p>
        </Card>

        <div className="grid grid-cols-4 gap-3 flex-1">
          {['7', '8', '9', '/'].map(v => (
            <Button key={v} variant={isNaN(Number(v)) ? 'outline' : 'secondary'} onClick={() => isNaN(Number(v)) ? handleOp(v) : handleNum(v)} className="text-2xl h-full">{v}</Button>
          ))}
          {['4', '5', '6', '*'].map(v => (
            <Button key={v} variant={isNaN(Number(v)) ? 'outline' : 'secondary'} onClick={() => isNaN(Number(v)) ? handleOp(v) : handleNum(v)} className="text-2xl h-full">{v}</Button>
          ))}
          {['1', '2', '3', '-'].map(v => (
            <Button key={v} variant={isNaN(Number(v)) ? 'outline' : 'secondary'} onClick={() => isNaN(Number(v)) ? handleOp(v) : handleNum(v)} className="text-2xl h-full">{v}</Button>
          ))}
          {['C', '0', '=', '+'].map(v => (
            <Button 
              key={v} 
              variant={v === '=' ? 'primary' : v === 'C' ? 'danger' : isNaN(Number(v)) ? 'outline' : 'secondary'} 
              onClick={() => v === '=' ? calculate() : v === 'C' ? clear() : isNaN(Number(v)) ? handleOp(v) : handleNum(v)} 
              className="text-2xl h-full"
            >
              {v}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CreateBillPage = ({ onBack, onSave, editingBill }: any) => {
  const { t, settings, useCredits, playSound } = useApp();
  const [shopName, setShopName] = useState(editingBill?.shopName || '');
  const [customerName, setCustomerName] = useState(editingBill?.customerName || '');
  const [products, setProducts] = useState<Product[]>(editingBill?.products || []);
  const [paidAmount, setPaidAmount] = useState(editingBill?.paidAmount || 0);

  const [currentProduct, setCurrentProduct] = useState({ name: '', quantity: 1, price: 0, unit: 'piece' });

  const addProduct = () => {
    if (!currentProduct.name || currentProduct.price <= 0) {
      playSound('error');
      return;
    }
    playSound('pop');
    setProducts([...products, { ...currentProduct, id: Math.random().toString(36).substr(2, 9) }]);
    setCurrentProduct({ name: '', quantity: 1, price: 0, unit: 'piece' });
  };

  const removeProduct = (id: string) => {
    playSound('click');
    setProducts(products.filter(p => p.id !== id));
  };

  const totalAmount = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const remainingAmount = totalAmount - paidAmount;

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!shopName || !customerName || products.length === 0) {
      playSound('error');
      return;
    }

    // Only deduct credits for NEW bills
    if (!editingBill) {
      const creditCost = settings.plan === 'free' ? 5 : 0;
      if (!useCredits(creditCost)) {
        alert(t('insufficientCredits'));
        return;
      }
    }

    setIsGenerating(true);
    playSound('pop');

    const bill: Bill = {
      id: editingBill?.id || Math.random().toString(36).substr(2, 9),
      shopName,
      customerName,
      products,
      totalAmount,
      paidAmount,
      remainingAmount,
      date: editingBill?.date || new Date().toLocaleDateString(),
      customWatermark: settings.plan === 'premium' ? settings.customWatermark : undefined
    };

    setTimeout(() => {
      storage.saveBill(bill);
      playSound('success');
      confetti();
      onSave(bill);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-40 bg-[#050505] overflow-y-auto p-6 pb-24">
      {isGenerating && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Crown size={64} className="text-[var(--theme-color)] neon-glow" />
          </motion.div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic animate-pulse">Generating <span className="text-[var(--theme-color)]">Bill...</span></h2>
          <p className="opacity-40 text-xs font-bold uppercase tracking-widest mt-2">Crafting your professional invoice</p>
        </div>
      )}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="glass p-2 rounded-full"><ArrowLeft /></button>
        <h2 className="text-2xl font-bold">{editingBill ? t('edit') : t('createBill')}</h2>
      </div>

      <Card className="mb-6 space-y-4 border-[var(--theme-color)]/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <Input label={t('shopName')} value={shopName} onChange={setShopName} placeholder="e.g. Muzamil Store" />
        <Input label={t('customerName')} value={customerName} onChange={setCustomerName} placeholder="e.g. John Doe" />
      </Card>

      <Card className="mb-6 border-[var(--theme-color)]/10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus size={18} className="text-[var(--theme-color)]" /> {t('addProduct')}</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input className="col-span-2" label={t('productName')} value={currentProduct.name} onChange={(v: any) => setCurrentProduct({...currentProduct, name: v})} />
          <Input label={t('quantity')} type="number" value={currentProduct.quantity} onChange={(v: any) => setCurrentProduct({...currentProduct, quantity: parseFloat(v)})} />
          <Input label={t('price')} type="number" value={currentProduct.price} onChange={(v: any) => setCurrentProduct({...currentProduct, price: parseFloat(v)})} />
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-sm opacity-60 ml-2">{t('unit')}</label>
            <select 
              value={currentProduct.unit} 
              onChange={(e) => setCurrentProduct({...currentProduct, unit: e.target.value})}
              className="glass px-4 py-3 rounded-xl focus:outline-none border-none"
            >
              <option value="piece">Piece</option>
              <option value="kg">KG</option>
              <option value="liter">Liter</option>
              <option value="meter">Meter</option>
              <option value="dozen">Dozen</option>
            </select>
          </div>
        </div>
        <Button onClick={addProduct} className="w-full" variant="outline">{t('addProduct')}</Button>
      </Card>

      {products.length > 0 && (
        <Card className="mb-6 border-[var(--theme-color)]/10">
          <div className="space-y-4">
            {products.map(p => (
              <div key={p.id} className="flex justify-between items-center border-b border-white/10 pb-2">
                <div>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-xs opacity-60">{p.quantity} {p.unit} x {p.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-[var(--theme-color)]">Rs. {p.quantity * p.price}</p>
                  <button onClick={() => removeProduct(p.id)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="mb-6 space-y-4 border-[var(--theme-color)]/30 shadow-[0_0_20px_var(--theme-color)]/10">
        <div className="flex justify-between text-xl font-black">
          <span>{t('total')}</span>
          <span className="text-[var(--theme-color)]">Rs. {totalAmount}</span>
        </div>
        <Input label={t('paid')} type="number" value={paidAmount} onChange={(v: any) => setPaidAmount(parseFloat(v) || 0)} />
        <div className="flex justify-between text-lg opacity-80">
          <span>{t('remaining')}</span>
          <span className={remainingAmount > 0 ? 'text-red-400' : 'text-green-400'}>Rs. {remainingAmount}</span>
        </div>
      </Card>

      <Button onClick={handleGenerate} className="w-full py-5 text-xl rounded-3xl shadow-[0_0_30px_var(--theme-color)]/30">
        {editingBill ? t('save') : t('generate')}
      </Button>
    </motion.div>
  );
};

const BillView = ({ bill, onBack }: any) => {
  const { t, settings, playSound } = useApp();
  const billRef = useRef<HTMLDivElement>(null);

  const download = async (format: 'pdf' | 'jpg' | 'png') => {
    playSound('success');
    if (!billRef.current) return;
    try {
      const canvas = await html2canvas(billRef.current, { 
        scale: 3, 
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: true
      });
      
      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`bill-${bill.id}.pdf`);
      } else {
        const imgData = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 1.0);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = imgData;
        link.download = `bill-${bill.id}.${format}`;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 100);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again or take a screenshot.');
    }
  };

  const share = async () => {
    playSound('click');
    if (!billRef.current) return;
    const canvas = await html2canvas(billRef.current, { scale: 2, backgroundColor: '#ffffff' });
    canvas.toBlob(async (blob) => {
      if (blob && navigator.share) {
        const file = new File([blob], `bill-${bill.id}.png`, { type: 'image/png' });
        try {
          await navigator.share({
            files: [file],
            title: 'Bill Crown 3 Invoice',
            text: `Invoice from ${bill.shopName}`
          });
        } catch (err) {
          console.error('Share failed:', err);
        }
      } else {
        alert('Sharing not supported on this browser. Please download instead.');
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl overflow-y-auto p-4 flex flex-col items-center"
    >
      <div className="w-full max-w-lg flex items-center justify-between mb-6">
        <button onClick={onBack} className="glass p-3 rounded-2xl hover:scale-110 transition-transform"><ArrowLeft /></button>
        <h2 className="text-xl font-black uppercase tracking-widest italic">{t('view')} <span className="text-[var(--theme-color)]">INVOICE</span></h2>
        <button onClick={share} className="glass p-3 rounded-2xl hover:scale-110 transition-transform text-[var(--theme-color)]"><Plus size={20} /></button>
      </div>

      <div className="w-full max-w-lg mb-8 relative group">
        <div className="absolute -inset-2 bg-[var(--theme-color)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div ref={billRef} className="bg-white text-black p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-8 border-b-2 border-black pb-4">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1">{bill.shopName}</h1>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Invoice ID: {bill.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Date</p>
              <p className="font-bold text-sm">{bill.date}</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] uppercase opacity-40 font-black tracking-widest mb-1">Customer</p>
            <p className="text-xl font-black tracking-tight">{bill.customerName}</p>
          </div>

          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10 text-left text-[10px] uppercase opacity-40 font-black tracking-widest">
                  <th className="py-2">Item</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {bill.products.map((p: any) => (
                  <tr key={p.id} className="border-b border-black/5">
                    <td className="py-3 font-bold text-sm">{p.name}</td>
                    <td className="py-3 text-center text-xs">{p.quantity} {p.unit}</td>
                    <td className="py-3 text-right text-xs">{p.price}</td>
                    <td className="py-3 text-right font-black text-sm">Rs. {p.quantity * p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-12">
            <div className="w-full max-w-[200px] space-y-2">
              <div className="flex justify-between text-xs font-bold opacity-60">
                <span>Total</span>
                <span>Rs. {bill.totalAmount}</span>
              </div>
              <div className="flex justify-between text-xs font-bold opacity-60">
                <span>Paid</span>
                <span>Rs. {bill.paidAmount}</span>
              </div>
              <div className="flex justify-between border-t-2 border-black pt-2 text-xl font-black tracking-tighter">
                <span>Remaining</span>
                <span className="text-red-600">Rs. {bill.remainingAmount}</span>
              </div>
            </div>
          </div>

          <div className="text-center border-t-2 border-black pt-6 mt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">{t('createdBy')}</p>
            <p className="text-[8px] font-bold opacity-20 uppercase tracking-widest">Powered by Bill Crown 3 • Digital Invoice</p>
            {settings.plan === 'premium' && bill.customWatermark && (
              <div className="mt-4 p-4 bg-black/5 rounded-2xl text-[10px] border border-black/10 text-left">
                <p className="font-black uppercase tracking-widest mb-1">{bill.customWatermark.name}</p>
                <p className="opacity-60">{bill.customWatermark.address}</p>
                <p className="opacity-60">{bill.customWatermark.phone}</p>
              </div>
            )}
          </div>

          {settings.plan === 'free' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] overflow-hidden">
              <p className="text-7xl font-black whitespace-nowrap uppercase tracking-tighter">
                {t('watermark')} • {t('watermark')} • {t('watermark')}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-lg grid grid-cols-1 gap-4">
        <Button onClick={() => download('pdf')} variant="primary" className="py-4 rounded-2xl"><Download size={20} /> {t('downloadPDF')}</Button>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => download('jpg')} variant="secondary" className="py-4 rounded-2xl">{t('downloadJPG')}</Button>
          <Button onClick={() => download('png')} variant="secondary" className="py-4 rounded-2xl">{t('downloadPNG')}</Button>
        </div>
      </div>
    </motion.div>
  );
};

const HistoryPage = ({ onBack, onView, onEdit }: any) => {
  const { t, playSound } = useApp();
  const [bills, setBills] = useState<Bill[]>(storage.getBills());

  const handleDelete = (id: string) => {
    playSound('click');
    storage.deleteBill(id);
    setBills(storage.getBills());
  };

  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-0 z-40 bg-[#050505] overflow-y-auto p-6 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="glass p-2 rounded-full"><ArrowLeft /></button>
        <h2 className="text-2xl font-bold">{t('history')}</h2>
      </div>

      {bills.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 opacity-40">
          <History size={64} className="mb-4" />
          <p>{t('noBills')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bills.map(bill => (
            <Card key={bill.id} className="flex justify-between items-center border-[var(--theme-color)]/10 hover:border-[var(--theme-color)]/40 transition-colors">
              <div onClick={() => onView(bill)} className="cursor-pointer flex-1">
                <p className="font-bold text-lg">{bill.shopName}</p>
                <p className="text-sm opacity-60">{bill.customerName} • {bill.date}</p>
                <p className="text-[var(--theme-color)] font-black">Rs. {bill.totalAmount}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(bill)} className="glass p-3 rounded-xl text-[var(--theme-color)]"><Plus size={20} className="rotate-45" /></button>
                <button onClick={() => handleDelete(bill.id)} className="glass p-3 rounded-xl text-red-500"><Trash2 size={20} /></button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const Onboarding = ({ onComplete }: any) => {
  const { t, settings, updateSettings, playSound } = useApp();

  const handleSelect = (mode: 'light' | 'dark') => {
    playSound('success');
    updateSettings({ themeMode: mode, firstTime: false });
    onComplete();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-sm w-full space-y-8"
      >
        <div className="space-y-2">
          <Crown size={64} className="mx-auto text-[var(--theme-color)] neon-glow rounded-full p-2" />
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Welcome to <span className="text-[var(--theme-color)]">V3</span></h2>
          <p className="opacity-60 text-sm font-medium">Choose your preferred visual experience to get started.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleSelect('light')}
            className="group flex flex-col items-center gap-4 p-6 rounded-3xl bg-white text-black border-4 border-transparent hover:border-[var(--theme-color)] transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-6 h-6 rounded-full bg-white shadow-lg" />
            </div>
            <span className="font-black uppercase tracking-widest text-xs">Light Mode</span>
          </button>
          <button 
            onClick={() => handleSelect('dark')}
            className="group flex flex-col items-center gap-4 p-6 rounded-3xl bg-black text-white border-4 border-white/10 hover:border-[var(--theme-color)] transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-6 h-6 rounded-full bg-black shadow-lg" />
            </div>
            <span className="font-black uppercase tracking-widest text-xs">Dark Mode</span>
          </button>
        </div>

        <div className="pt-4">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">You can change this anytime in settings</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const UpgradePage = ({ onBack }: any) => {
  const { t, settings, updateSettings, playSound } = useApp();
  const [key, setKey] = useState('');

  const activate = () => {
    if (key === 'muzamil29') {
      updateSettings({ plan: 'pro', activationKey: key, credits: 1000 });
      playSound('success');
      confetti();
      onBack();
    } else if (key === 'limazum92') {
      updateSettings({ plan: 'premium', activationKey: key, credits: 999999 });
      playSound('success');
      confetti();
      onBack();
    } else {
      playSound('error');
      alert('Invalid Key');
    }
  };

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto p-6 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="glass p-2 rounded-full"><X /></button>
        <h2 className="text-2xl font-bold uppercase tracking-tighter italic">{t('upgrade')} <span className="text-[var(--theme-color)]">PRO</span></h2>
      </div>

      <div className="space-y-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-25" />
          <Card className="border-2 border-cyan-500/30 relative overflow-hidden bg-black/60 backdrop-blur-2xl">
            <div className="absolute top-0 right-0 bg-cyan-500 text-black px-6 py-1 font-black text-xs rounded-bl-xl tracking-widest">PRO</div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-4xl font-black tracking-tighter">1000 <span className="text-sm opacity-60">PKR</span></h3>
                <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest mt-1">Advanced Business</p>
              </div>
              <Crown size={40} className="text-cyan-500 opacity-20" />
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="text-cyan-500" /> 1000 Bill Credits</li>
              <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="text-cyan-500" /> No Watermark</li>
              <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="text-cyan-500" /> 2 Game Modes Unlocked</li>
            </ul>
          </Card>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur opacity-40 animate-pulse" />
          <Card className="border-2 border-yellow-500/30 relative overflow-hidden bg-black/60 backdrop-blur-2xl">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black px-6 py-1 font-black text-xs rounded-bl-xl tracking-widest">PREMIUM</div>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-4xl font-black tracking-tighter">1799 <span className="text-sm opacity-60">PKR</span></h3>
                <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest mt-1">Ultimate Empire</p>
              </div>
              <Crown size={40} className="text-yellow-500 opacity-40 animate-bounce" />
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="text-yellow-500" /> Unlimited Credits</li>
              <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="text-yellow-500" /> Custom Watermark</li>
              <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="text-yellow-500" /> All Game Modes</li>
              <li className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="text-yellow-500" /> Premium Calculator</li>
            </ul>
          </Card>
        </motion.div>

        <Card className="space-y-6 bg-black/40 border-white/5">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/20 p-4 rounded-2xl border border-green-500/30"><Smartphone className="text-green-500" /></div>
            <div>
              <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Payment Method</p>
              <p className="text-xl font-black tracking-tighter">EasyPaisa: <span className="text-green-500">03349825814</span></p>
            </div>
          </div>
          <p className="text-[10px] opacity-40 font-bold uppercase tracking-[0.2em] text-center">{t('sendSMS')}</p>
          <div className="flex justify-center p-6 glass rounded-3xl bg-white/5 border-white/10">
            <QrCode size={140} className="text-[var(--theme-color)] neon-glow p-2 bg-white rounded-xl" />
          </div>
        </Card>

        <Card className="space-y-4 border-[var(--theme-color)]/20">
          <Input label={t('activationKey')} value={key} onChange={setKey} placeholder={t('enterKey')} className="text-center" />
          <Button onClick={activate} className="w-full py-4 text-lg rounded-2xl shadow-[0_0_30px_var(--theme-color)]/20">{t('activate')}</Button>
        </Card>
      </div>
    </motion.div>
  );
};

const SettingsPage = ({ onBack }: any) => {
  const { t, settings, updateSettings } = useApp();
  const [customWatermark, setCustomWatermark] = useState(settings.customWatermark || { name: '', address: '', phone: '' });

  const colors = ['#00f2ff', '#ff00ff', '#00ff00', '#ffff00', '#ff4d00', '#ffffff'];

  const saveCustom = () => {
    updateSettings({ customWatermark });
  };

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-40 bg-[#050505] overflow-y-auto p-6 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="glass p-2 rounded-full"><ArrowLeft /></button>
        <h2 className="text-2xl font-bold">{t('settings')}</h2>
      </div>

      <div className="space-y-6">
        <Card>
          <h3 className="font-bold mb-4">{t('theme')}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant={settings.themeMode === 'light' ? 'primary' : 'secondary'} 
                onClick={() => updateSettings({ themeMode: 'light' })}
                className="text-xs"
              >
                Light Mode
              </Button>
              <Button 
                variant={settings.themeMode === 'dark' ? 'primary' : 'secondary'} 
                onClick={() => updateSettings({ themeMode: 'dark' })}
                className="text-xs"
              >
                Dark Mode
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              {colors.map(c => (
                <button 
                  key={c} 
                  onClick={() => updateSettings({ themeColor: c })}
                  className={`w-10 h-10 rounded-full border-2 ${settings.themeColor === c ? 'border-white' : 'border-transparent'} shadow-lg`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold mb-4">{t('language')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant={settings.language === 'en' ? 'primary' : 'secondary'} onClick={() => updateSettings({ language: 'en' })}>English</Button>
            <Button variant={settings.language === 'ur' ? 'primary' : 'secondary'} onClick={() => updateSettings({ language: 'ur' })}>اردو</Button>
          </div>
        </Card>

        {settings.plan === 'premium' && (
          <Card className="space-y-4">
            <h3 className="font-bold">{t('customWatermark')}</h3>
            <Input label={t('shopName')} value={customWatermark.name} onChange={(v: any) => setCustomWatermark({...customWatermark, name: v})} />
            <Input label={t('address')} value={customWatermark.address} onChange={(v: any) => setCustomWatermark({...customWatermark, address: v})} />
            <Input label={t('phone')} value={customWatermark.phone} onChange={(v: any) => setCustomWatermark({...customWatermark, phone: v})} />
            <Button onClick={saveCustom} className="w-full">{t('save')}</Button>
          </Card>
        )}

        <Card>
          <h3 className="font-bold mb-4">Previous Versions</h3>
          <div className="space-y-4">
            <a 
              href="https://billcrown.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-[var(--theme-color)]" />
                <span className="font-bold">Bill Crown 1</span>
              </div>
              <ArrowLeft className="rotate-180 opacity-40 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="https://billcrown2.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-[var(--theme-color)]" />
                <span className="font-bold">Bill Crown 2</span>
              </div>
              <ArrowLeft className="rotate-180 opacity-40 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold mb-4">{t('privacy')}</h3>
          <div className="text-sm opacity-60 space-y-4 max-h-48 overflow-y-auto pr-2">
            <p><strong>Privacy Policy for Bill Crown 3</strong></p>
            <p>1. Data Storage: All your data, including bills, customer information, and settings, is stored locally on your device using LocalStorage/IndexedDB. We do not use any servers to store your data.</p>
            <p>2. Data Safety: Since data is local, it is as safe as your device. We recommend not clearing your browser cache if you want to keep your data.</p>
            <p>3. No Data Sharing: We do not collect or share any of your personal or business data with third parties.</p>
            <p>4. User Control: You have full control over your data. You can delete individual bills or clear all data from the settings or browser options.</p>
            <p>5. Security: The app works offline and does not require an internet connection for core functionality, ensuring your business data stays private.</p>
          </div>
        </Card>

        <div className="flex flex-col items-center gap-4 py-8">
          <p className="opacity-40">{t('createdBy')}</p>
          <div className="flex gap-4">
            <a href="mailto:muzamilanki@gmail.com" className="glass p-3 rounded-full"><Mail /></a>
            <button onClick={() => alert('EasyPaisa: 03349825814')} className="glass p-3 rounded-full"><Heart className="text-red-500" /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PreviousVersions = ({ onBack }: any) => {
  const { t } = useApp();
  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto p-6 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="glass p-2 rounded-full"><ArrowLeft /></button>
        <h2 className="text-2xl font-bold uppercase tracking-tighter italic">Previous <span className="text-[var(--theme-color)]">Versions</span></h2>
      </div>

      <div className="space-y-6">
        <motion.div whileHover={{ scale: 1.02 }} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
          <a 
            href="https://billcrown.netlify.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-8 glass border border-white/10 rounded-3xl relative overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-1">Bill Crown 1</h3>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">The Original Classic</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/20 border border-blue-500/30">
                <Globe size={32} className="text-blue-500" />
              </div>
            </div>
          </a>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
          <a 
            href="https://billcrown2.netlify.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-8 glass border border-white/10 rounded-3xl relative overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-1">Bill Crown 2</h3>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">The Evolution</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-500/20 border border-purple-500/30">
                <Globe size={32} className="text-purple-500" />
              </div>
            </div>
          </a>
        </motion.div>

        <Card className="bg-[var(--theme-color)]/5 border-dashed border-[var(--theme-color)]/30">
          <p className="text-center text-sm opacity-60 italic">"Explore where it all started. Bill Crown 3 is the ultimate version with all features combined!"</p>
        </Card>
      </div>
    </motion.div>
  );
};

// --- Match-3 Game ---

const GamePage = ({ onBack, onUpgrade }: any) => {
  const { t, settings, playSound } = useApp();
  const [mode, setMode] = useState<'fruits' | 'food' | 'money' | null>(null);
  const [grid, setGrid] = useState<string[][]>([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const items = {
    fruits: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍍'],
    food: ['🍔', '🍕', '🍟', '🌭', '🌮', '🍩'],
    money: ['💵', '💰', '💎', '💳', '🪙', '🏦']
  };

  const initGrid = (m: 'fruits' | 'food' | 'money') => {
    playSound('game');
    const newGrid = Array(7).fill(null).map(() => 
      Array(7).fill(null).map(() => items[m][Math.floor(Math.random() * items[m].length)])
    );
    setGrid(newGrid);
    setScore(0);
    setMode(m);
  };

  const handleCellClick = (r: number, c: number) => {
    playSound('pop');
    if (!selected) {
      setSelected([r, c]);
    } else {
      const [r1, c1] = selected;
      if (Math.abs(r1 - r) + Math.abs(c1 - c) === 1) {
        // Swap
        const newGrid = [...grid.map(row => [...row])];
        const temp = newGrid[r1][c1];
        newGrid[r1][c1] = newGrid[r][c];
        newGrid[r][c] = temp;
        
        // Basic match check (horizontal or vertical)
        const checkMatch = (g: string[][], row: number, col: number) => {
          const item = g[row][col];
          // Horizontal
          let hCount = 1;
          for (let i = col - 1; i >= 0 && g[row][i] === item; i--) hCount++;
          for (let i = col + 1; i < 7 && g[row][i] === item; i++) hCount++;
          if (hCount >= 3) return true;
          // Vertical
          let vCount = 1;
          for (let i = row - 1; i >= 0 && g[i][col] === item; i--) vCount++;
          for (let i = row + 1; i < 7 && g[i][col] === item; i++) vCount++;
          if (vCount >= 3) return true;
          return false;
        };

        if (checkMatch(newGrid, r, c) || checkMatch(newGrid, r1, c1)) {
          setGrid(newGrid);
          setScore(s => s + 50);
          playSound('success');
          // Simplified: just replace matched items with random ones
          setTimeout(() => {
            const finalGrid = newGrid.map(row => row.map(cell => 
              Math.random() > 0.8 ? items[mode!][Math.floor(Math.random() * items[mode!].length)] : cell
            ));
            setGrid(finalGrid);
          }, 300);
        } else {
          // No match, swap back
          playSound('error');
        }
      }
      setSelected(null);
    }
  };

  if (!mode) {
    return (
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="fixed inset-0 z-50 bg-[#050505] p-6 overflow-y-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="glass p-2 rounded-full"><ArrowLeft /></button>
          <h2 className="text-2xl font-bold">{t('game')}</h2>
        </div>
        <div className="space-y-6">
          <Card className="border-[var(--theme-color)]/20">
            <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-[var(--theme-color)]">{t('modes')}</h3>
            <div className="space-y-4">
              <Button className="w-full py-8 text-xl" onClick={() => initGrid('fruits')}>🍎 {t('fruits')}</Button>
              
              <div className="relative">
                <Button 
                  className="w-full py-8 text-xl" 
                  variant={settings.plan === 'free' ? 'secondary' : 'primary'}
                  onClick={() => settings.plan !== 'free' ? initGrid('food') : onUpgrade()}
                >
                  🍔 {t('fastFood')}
                </Button>
                {settings.plan === 'free' && <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm"><Crown className="text-yellow-500 mb-1" /> <span className="text-xs font-bold">{t('unlockPro')}</span></div>}
              </div>

              <div className="relative">
                <Button 
                  className="w-full py-8 text-xl" 
                  variant={settings.plan !== 'premium' ? 'secondary' : 'primary'}
                  onClick={() => settings.plan === 'premium' ? initGrid('money') : onUpgrade()}
                >
                  💵 {t('money')}
                </Button>
                {settings.plan !== 'premium' && <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm"><Crown className="text-yellow-500 mb-1" /> <span className="text-xs font-bold">{t('unlockPremium')}</span></div>}
              </div>
            </div>
          </Card>

          <Card className="bg-[var(--theme-color)]/5 border-dashed border-[var(--theme-color)]/30">
            <p className="text-center text-sm opacity-60 italic">"Match 3 items to blast and score points! Unlock more modes for more fun."</p>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] p-6 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => setMode(null)} className="glass p-2 rounded-full"><ArrowLeft /></button>
        <div className="glass px-6 py-2 rounded-full font-black text-[var(--theme-color)]">{t('score')}: {score}</div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-7 gap-1 glass p-2 rounded-2xl">
          {grid.map((row, r) => row.map((item, c) => (
            <button 
              key={`${r}-${c}`} 
              onClick={() => handleCellClick(r, c)}
              className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg transition-all ${selected?.[0] === r && selected?.[1] === c ? 'bg-[var(--theme-color)]/30 scale-110' : 'hover:bg-white/5'}`}
            >
              {item}
            </button>
          )))}
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard ---

export default function App() {
  const { t, settings, playSound } = useApp();
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [page, setPage] = useState<'dashboard' | 'create' | 'history' | 'settings' | 'upgrade' | 'game' | 'calculator' | 'versions'>('dashboard');
  const [viewingBill, setViewingBill] = useState<Bill | null>(null);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  const startApp = () => {
    playSound('success');
    setShowSplash(false);
    if (settings.firstTime) {
      setShowOnboarding(true);
    }
  };

  if (showSplash) return <SplashScreen onStart={startApp} />;
  if (showOnboarding) return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  if (page === 'versions') return <PreviousVersions onBack={() => setPage('dashboard')} />;

  return (
    <div className="min-h-screen pb-24 bg-[#050505] text-white selection:bg-[var(--theme-color)]/30">
      {/* Top Bar */}
      <header className="p-6 flex justify-between items-center sticky top-0 z-30 glass rounded-b-3xl border-b border-[var(--theme-color)]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="p-2 rounded-xl bg-[var(--theme-color)]/10 border border-[var(--theme-color)]/20 shadow-[0_0_15px_var(--theme-color)]/20"
          >
            <Crown size={24} color={settings.themeColor} />
          </motion.div>
          <div>
            <h1 className="text-xl font-black tracking-tighter neon-text italic uppercase">{t('appName')}</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Online • V3.0 GOLD</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPage('upgrade')} className="glass p-3 rounded-2xl relative border-[var(--theme-color)]/20 hover:scale-110 transition-transform">
            <Crown size={20} className={settings.plan !== 'free' ? 'text-yellow-500' : 'text-white'} />
            {settings.plan === 'free' && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce flex items-center justify-center text-[8px] font-bold">!</span>}
          </button>
          <button onClick={() => setPage('settings')} className="glass p-3 rounded-2xl border-[var(--theme-color)]/20 hover:scale-110 transition-transform"><Settings size={20} /></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Credits Display */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="bg-gradient-to-r from-[var(--theme-color)]/20 to-transparent border-[var(--theme-color)]/30 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-black/40"><CreditCard size={18} className="text-[var(--theme-color)]" /></div>
              <p className="text-sm font-bold opacity-60">{t('credits')}</p>
            </div>
            <p className="text-xl font-black neon-text">
              {settings.plan === 'premium' ? t('unlimited') : settings.credits}
            </p>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <Card 
            onClick={() => { setEditingBill(null); setPage('create'); }}
            className="h-56 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-[1.02] transition-all group border-[var(--theme-color)]/20 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 rounded-3xl bg-[var(--theme-color)]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_20px_var(--theme-color)]/20">
              <Plus size={40} color={settings.themeColor} />
            </div>
            <p className="text-2xl font-black uppercase tracking-tighter">{t('createBill')}</p>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card 
              onClick={() => setPage('history')}
              className="flex flex-col items-center justify-center gap-3 py-10 cursor-pointer hover:scale-[1.02] transition-all border-[var(--theme-color)]/10 hover:border-[var(--theme-color)]/40 group"
            >
              <History size={32} className="text-[var(--theme-color)] group-hover:rotate-[-20deg] transition-transform" />
              <p className="font-bold uppercase tracking-widest text-xs">{t('history')}</p>
            </Card>
            <Card 
              onClick={() => setPage('game')}
              className="flex flex-col items-center justify-center gap-3 py-10 cursor-pointer hover:scale-[1.02] transition-all border-[var(--theme-color)]/10 hover:border-[var(--theme-color)]/40 group"
            >
              <Gamepad2 size={32} className="text-[var(--theme-color)] group-hover:rotate-[20deg] transition-transform" />
              <p className="font-bold uppercase tracking-widest text-xs">{t('game')}</p>
            </Card>
          </div>

          {/* Premium Features Row */}
          <div className="grid grid-cols-1 gap-6">
            <Card 
              onClick={() => settings.plan === 'premium' ? setPage('calculator') : setPage('upgrade')}
              className={`flex items-center justify-between p-6 cursor-pointer hover:scale-[1.02] transition-all border-[var(--theme-color)]/20 relative overflow-hidden group ${settings.plan !== 'premium' ? 'opacity-80' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 group-hover:border-[var(--theme-color)]/50 transition-colors"><Globe size={24} className="text-[var(--theme-color)]" /></div>
                <div>
                  <p className="font-black uppercase tracking-tighter">{t('calculator')}</p>
                  <p className="text-[10px] opacity-40 font-bold uppercase">{t('premiumOnly')}</p>
                </div>
              </div>
              {settings.plan !== 'premium' ? <Crown size={20} className="text-yellow-500 animate-pulse" /> : <ArrowLeft className="rotate-180 text-[var(--theme-color)]" />}
            </Card>

            <Card 
              onClick={() => setPage('versions' as any)}
              className="flex items-center justify-between p-6 cursor-pointer hover:scale-[1.02] transition-all border-[var(--theme-color)]/20 relative overflow-hidden group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 group-hover:border-[var(--theme-color)]/50 transition-colors"><Globe size={24} className="text-[var(--theme-color)]" /></div>
                <div>
                  <p className="font-black uppercase tracking-tighter">Previous Versions</p>
                  <p className="text-[10px] opacity-40 font-bold uppercase">Visit V1 & V2</p>
                </div>
              </div>
              <ArrowLeft className="rotate-180 text-[var(--theme-color)]" />
            </Card>
          </div>
        </div>

        {/* Plan Info */}
        <Card className="bg-black/40 border-[var(--theme-color)]/10 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center"><Crown size={20} className="text-[var(--theme-color)]" /></div>
              <div>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Active Plan</p>
                <p className="text-lg font-black uppercase text-[var(--theme-color)]">{settings.plan}</p>
              </div>
            </div>
            {settings.plan === 'free' && (
              <Button onClick={() => setPage('upgrade')} variant="outline" className="text-[10px] py-2 px-4 rounded-xl">
                {t('upgrade')}
              </Button>
            )}
          </div>
        </Card>
      </main>

      {/* Navigation Overlays */}
      <AnimatePresence>
        {page === 'create' && (
          <CreateBillPage 
            editingBill={editingBill}
            onBack={() => setPage('dashboard')} 
            onSave={(bill: Bill) => {
              setViewingBill(bill);
              setPage('dashboard');
            }} 
          />
        )}
        {page === 'history' && (
          <HistoryPage 
            onBack={() => setPage('dashboard')} 
            onView={(bill: Bill) => setViewingBill(bill)} 
            onEdit={(bill: Bill) => {
              setEditingBill(bill);
              setPage('create');
            }}
          />
        )}
        {page === 'settings' && <SettingsPage onBack={() => setPage('dashboard')} />}
        {page === 'upgrade' && <UpgradePage onBack={() => setPage('dashboard')} />}
        {page === 'game' && <GamePage onBack={() => setPage('dashboard')} onUpgrade={() => setPage('upgrade')} />}
        {page === 'calculator' && <Calculator onBack={() => setPage('dashboard')} />}
        {viewingBill && <BillView bill={viewingBill} onBack={() => setViewingBill(null)} />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="p-12 text-center">
        <div className="w-12 h-1 bg-[var(--theme-color)]/20 mx-auto mb-6 rounded-full" />
        <p className="text-xs font-bold opacity-20 uppercase tracking-[0.3em]">{t('createdBy')}</p>
        <p className="text-[10px] opacity-10 mt-2">BILL CROWN 3 • FUTURISTIC BILLING SYSTEM • 2026</p>
      </footer>
    </div>
  );
}
