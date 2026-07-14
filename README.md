<div dir="rtl">

# 📋 TypeScript/TSX Code Mapper - نقشه‌بردار کد

### 🎯 این ابزار چیست؟

</div>

An **automated code analyzer** for **TypeScript** and **React** projects that scans all `.ts` and `.tsx` files and generates a comprehensive report of your codebase structure — without changing a single line of your code.

**یک تحلیل‌گر خودکار کد** برای پروژه‌های **TypeScript** و **React** که تمام فایل‌های `.ts` و `.tsx` را اسکن می‌کند و یک گزارش کامل از ساختار کد شما تولید می‌کند — **بدون تغییر حتی یک خط از کد شما!**

---

<div dir="rtl">

## 🚀 نحوه استفاده (فقط ۳ مرحله)

### پیش‌نیاز
قبل از شروع، مطمئن شو [Node.js](https://nodejs.org) نسخه ۱۴ یا بالاتر روی سیستم نصب شده. اگه نداری، از سایت [nodejs.org](https://nodejs.org) دانلود و نصب کن.

### مرحله ۱: فایل‌ها را کپی کن 📁
دو فایل زیر را بردار و در پوشه `src` پروژه خود کپی کن:
- `analyze_ts.bat`
- `analyze_ts.js`

ساختار پوشه باید این شکلی بشه:
your-project/
├── src/
│ ├── analyze_ts.bat ← این فایل را اینجا بذار
│ ├── analyze_ts.js ← این فایل را اینجا بذار
│ └── ... (بقیه فایل‌های پروژه تو)

> 💡 **چرا داخل `src`؟**
> - فقط فایل‌های اصلی پروژه تحلیل می‌شوند
> - پوشه‌های `node_modules`، `dist`، `build` و `.git` خودکار نادیده گرفته می‌شوند
> - گزارش دقیق‌تر، حجم کمتر، سرعت بیشتر

### مرحله ۲: فایل bat را اجرا کن 🖱️
برو توی پوشه `src` پروژت، فایل `analyze_ts.bat` را پیدا کن و **روش دابل کلیک کن** (یعنی دو بار پشت سر هم کلیک کن).

یک پنجره سیاه (CMD) باز میشه و شروع به اسکن فایل‌ها می‌کنه. چند ثانیه صبر کن تا کارش تموم بشه.

> ⚠️ **اگه پنجره سیاه سریع بسته شد و چیزی نشد:**
> - CMD رو باز کن (توی استارت منو بنویس `cmd`)
> - فایل `analyze_ts.bat` رو با موس بکش و توی پنجره CMD رها کن
> - دکمه Enter رو بزن
> - حالا می‌تونی خطا رو ببینی و بهم بگی

### مرحله ۳: گزارش را ببین 📄
وقتی اسکن تموم شد، فایل `code_map_report.txt` توی همون پوشه `src` ساخته میشه و **خودکار توی Notepad باز میشه!**

🎉 **تمام!** حالا می‌تونی این فایل رو به ChatGPT، Claude، Copilot یا هر AI دیگه‌ای بدی تا دقیق‌تر و بهتر کمکت کنه.

---

## 🚀 How to Use (Just 3 Steps)

### Prerequisite
Make sure [Node.js](https://nodejs.org) version 14 or higher is installed. If not, download and install it from [nodejs.org](https://nodejs.org).

### Step 1: Copy the files 📁
Copy these two files into your project's `src` folder:
- `analyze_ts.bat`
- `analyze_ts.js`

Your folder structure should look like this:
your-project/
├── src/
│ ├── analyze_ts.bat ← Put this file here
│ ├── analyze_ts.js ← Put this file here
│ └── ... (your source files)


> 💡 **Why inside `src`?**
> - Only your actual source code is analyzed
> - `node_modules`, `dist`, `build`, `.git` are automatically excluded
> - More precise report, smaller file size, faster execution

### Step 2: Run the bat file 🖱️
Go to your project's `src` folder, find `analyze_ts.bat`, and **double-click on it** (click twice quickly).

A black window (CMD) will open and start scanning your files. Wait a few seconds until it finishes.

> ⚠️ **If the black window closes instantly and nothing happens:**
> - Open CMD (type `cmd` in the Start menu)
> - Drag and drop `analyze_ts.bat` into the CMD window
> - Press Enter
> - Now you can see the error and report it

### Step 3: View the report 📄
When scanning is complete, `code_map_report.txt` is created in the same `src` folder and **automatically opens in Notepad!**

🎉 **Done!** Now you can give this file to ChatGPT, Claude, Copilot, or any AI for more accurate and better help.

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
> *هوش مصنوعی نمی‌دونه این کامپوننت چه Props ای داره، چه ورودی و خروجی داره، با چه دیتایی کار می‌کنه... نتیجه: کد ناسازگار و پر از خطا!*

✅ **با Code Map:**
> فایل `code_map_report.txt` را به AI می‌دهید. هوش مصنوعی دقیقاً ساختار پروژه، Props ها، اینترفیس‌ها و ورودی/خروجی هر تابع را می‌شناسد و کدی ۱۰۰٪ سازگار با پروژه شما تولید می‌کند!

### ۳. 👥 آنبوردینگ سریع اعضای جدید تیم
اعضای جدید به جای خوندن تک‌تک فایل‌ها، این گزارش رو می‌خونن و در ۵ دقیقه دید کامل به پروژه پیدا می‌کنند.

### ۴. 🔍 بررسی سلامت کد (Code Review)
می‌تونید ببینید کدوم کامپوننت‌ها Props زیادی دارن، کدوم توابع مستندسازی ندارن، ساختار پروژه رو بهینه کنید و مستندسازی رو بهبود بدید.

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
> *AI has no clue about Props, inputs, outputs, or project structure... Result: incompatible, buggy code!*

✅ **With Code Map:**
> Share `code_map_report.txt` with AI. It now understands your exact architecture, Props, interfaces, and function signatures — generating 100% compatible code!

### 3. 👥 Quick Team Onboarding
New team members read this report first and get a complete project overview in 5 minutes.

### 4. 🔍 Code Review & Health Check
Spot components with too many Props, undocumented functions, and optimize your structure.

---

## 📊 نمونه خروجی | Sample Output

</div>

╔══════════════════════════════════════════════════╗
║ TYPESCRIPT/TSX CODE MAP REPORT ║
║ Generated Automatically ║
╚══════════════════════════════════════════════════╝

📂 Project Root: C:\my-react-app\src
📅 Generated: 7/14/2026, 10:30:00 AM
──────────────────────────────────────────────────────────
📊 STATISTICS | آمار
──────────────────────────────────────────────────────────
Files analyzed: 24
React Components: 12
Functions: 18
Interfaces: 15
Types: 7
Total entities: 52

======================================================================
📋 DETAILED ANALYSIS | تحلیل جزئیات
======================================================================

======================================================================
📁 FILE: components\organisms\grids\SelectedServicesTable.tsx
======================================================================

🧩 COMPONENT: SelectedServicesTable
📍 Location: Line 500
📋 Type: React Functional Component (React.FC)
📥 INPUTS (Props: SelectedServicesTableProps):
• onRemove: (idx: number) => void
• onAdd: () => void
📤 OUTPUT: JSX.Element
🎨 DISPLAYS: Renders React UI component

🔧 FUNCTION: groupServices
📍 Location: Line 45
📥 INPUTS: services: any[]
📤 OUTPUT: GroupedService[]
🎨 DISPLAYS: Returns GroupedService[]

──────────────────────────────────────────────────────────
📋 Interfaces & Types in this file:
──────────────────────────────────────────────────────────
📌 INTERFACE: SelectedServicesTableProps
• onRemove: (idx: number) => void
• onAdd: () => void
📌 INTERFACE: ServiceAmountCellProps
• svc: any
• rowIndex: number
• allServices: ServiceItemType[]
• policyId: number | null | undefined
• medicalCenterNationalID: string | null | undefined
• onAmountChange: (idx: number, field: string, value: any) => void
• actualMedicalCenterKind: string | null | undefined
• disabled? (optional): boolean


---

<div dir="rtl">

## 🤖 نحوه استفاده با هوش مصنوعی

وقتی از ChatGPT، Claude یا Copilot کمک می‌گیری، این پیام رو کپی کن و **کل محتوای فایل `code_map_report.txt`** رو جایگزین قسمت مشخص شده کن:

</div>

### Ready-to-Use AI Prompt Template:
