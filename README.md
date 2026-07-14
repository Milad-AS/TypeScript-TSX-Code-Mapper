<div dir="rtl">

# 📋 TypeScript/TSX Code Mapper - نقشه‌بردار کد

### 🎯 این ابزار چیست؟ | What is this tool?

</div>

An **automated code analyzer** for **TypeScript** and **React** projects that scans all `.ts` and `.tsx` files and generates a comprehensive report of your codebase structure — without changing a single line of your code.

**یک تحلیل‌گر خودکار کد** برای پروژه‌های **TypeScript** و **React** که تمام فایل‌های `.ts` و `.tsx` را اسکن می‌کند و یک گزارش کامل از ساختار کد شما تولید می‌کند — **بدون تغییر حتی یک خط از کد شما!**

---

<div dir="rtl">

## ✨ چرا به این ابزار نیاز دارم؟

### ۱. 📝 مستندسازی خودکار پروژه
به جای ساعت‌ها وقت صرف مستندسازی دستی، این ابزار در چند ثانیه:
- ✅ تمام کامپوننت‌های React را پیدا می‌کند
- ✅ Props ورودی هر کامپوننت را با جزئیات کامل استخراج می‌کند
- ✅ توابع معمولی و arrow functions را شناسایی می‌کند
- ✅ پارامترهای ورودی و نوع خروجی (Return Type) هر تابع را نشان می‌دهد
- ✅ Interface ها و Type ها را با تمام فیلدها نمایش می‌دهد

### ۲. 🤖 دستیار قدرتمند برای هوش مصنوعی (مهم‌ترین کاربرد!)
وقتی از ChatGPT، Claude، Copilot یا هر AI دیگری کمک می‌گیرید:

❌ **بدون Code Map:**
> "من یه کامپوننت دارم به نام SelectedServicesTable، می‌تونی help کنی؟"
> 
> *هوش مصنوعی نمی‌دونه این کامپوننت چه Props ای داره، چه ورودی و خروجی داره...*

✅ **با Code Map:**
> فایل `code_map_report.txt` را به AI می‌دهید. هوش مصنوعی دقیقاً ساختار پروژه، Props ها، اینترفیس‌ها و ورودی/خروجی هر تابع را می‌شناسد و کدی ۱۰۰٪ سازگار با پروژه شما تولید می‌کند!

### ۳. 👥 آنبوردینگ سریع اعضای جدید تیم
اعضای جدید به جای خوندن تک‌تک فایل‌ها، این گزارش رو می‌خونن و در ۵ دقیقه دید کامل به پروژه پیدا می‌کنند.

### ۴. 🔍 بررسی سلامت کد (Code Review)
می‌تونید ببینید کدوم کامپوننت‌ها Props زیادی دارن، ساختار پروژه رو بهینه کنید و مستندسازی رو بهبود بدید.

---

## ✨ Why do I need this?

### 1. 📝 Automatic Project Documentation
Instead of hours of manual documentation, this tool extracts in seconds:
- ✅ All React components
- ✅ Complete Props interfaces with full details
- ✅ Regular functions and arrow functions
- ✅ Input parameters and return types
- ✅ Full interface and type definitions

### 2. 🤖 Supercharge Your AI Assistant (Most Important!)
When using ChatGPT, Claude, Copilot, or any AI for development:

❌ **Without Code Map:**
> "I have a component called SelectedServicesTable, can you help?"
> 
> *AI has no clue about Props, inputs, outputs, or project structure...*

✅ **With Code Map:**
> Share `code_map_report.txt` with AI. It now understands your exact architecture, Props, interfaces, and function signatures — generating 100% compatible code!

### 3. 👥 Quick Team Onboarding
New team members read this report first and get a complete project overview in 5 minutes.

### 4. 🔍 Code Review & Health Check
Spot components with too many Props, undocumented functions, and optimize your structure.

---

## 📦 نصب و استفاده | Installation & Usage

### پیش‌نیاز | Prerequisites
- [Node.js](https://nodejs.org) version 14 or higher | نسخه ۱۴ یا بالاتر

### راه‌اندازی (۳۰ ثانیه) | Setup (30 seconds)

</div>

1. **Copy both files to your `src` folder | هر دو فایل را در پوشه `src` پروژه کپی کنید:**
