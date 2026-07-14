<div align="center">

# 📋 TypeScript/TSX Code Mapper

### نقشه‌بردار خودکار کد TypeScript و React

**An automated analyzer that scans your `.ts`/`.tsx` files and generates a full structural report of your codebase — without touching a single line of your code.**

**یک تحلیل‌گر خودکار که تمام فایل‌های `.ts` و `.tsx` را اسکن می‌کند و یک گزارش کامل از ساختار کد شما تولید می‌کند — بدون تغییر حتی یک خط از کد شما.**

</div>

---

## 📑 Table of Contents | فهرست مطالب

- [Why You Need This](#-why-you-need-this--چرا-به-این-ابزار-نیاز-دارم)
- [Quick Start](#-quick-start--شروع-سریع)
- [Sample Output](#-sample-output--نمونه-خروجی)
- [Using the Report with AI](#-using-the-report-with-ai--استفاده-از-گزارش-با-هوش-مصنوعی)
- [Troubleshooting](#-troubleshooting--رفع-اشکال)

---

## ✨ Why You Need This | چرا به این ابزار نیاز دارم؟

<table>
<tr>
<td width="50%" valign="top">

### 🇬🇧 English

**1. 📝 Automatic Documentation**
Instead of hours of manual work, get in seconds:
- All React components
- Full Props interfaces
- Functions & arrow functions with parameters and return types
- Complete interface and type definitions

**2. 🤖 Supercharges Your AI Assistant** *(most important use case)*

Without a code map, an AI has no idea what props or types your components use — leading to incompatible, buggy code.

With `code_map_report.txt`, you hand the AI your exact architecture, props, interfaces, and function signatures, so it generates code that fits your project perfectly.

**3. 👥 Fast Team Onboarding**
New teammates get a complete project overview in 5 minutes instead of reading every file.

**4. 🔍 Code Health Review**
Spot components with too many props, undocumented functions, and structural issues at a glance.

</td>
<td width="50%" valign="top">

### 🇮🇷 فارسی

**۱. 📝 مستندسازی خودکار**
به‌جای ساعت‌ها کار دستی، در چند ثانیه به‌دست می‌آورید:
- تمام کامپوننت‌های React
- Props کامل هر کامپوننت
- توابع معمولی و arrow function به همراه پارامترها و نوع خروجی
- تعریف کامل Interface ها و Type ها

**۲. 🤖 تقویت دستیار هوش مصنوعی شما** *(مهم‌ترین کاربرد)*

بدون Code Map، هوش مصنوعی نمی‌داند کامپوننت‌های شما چه Props و Type ای دارند — نتیجه: کد ناسازگار و پر از خطا.

با `code_map_report.txt`، ساختار دقیق پروژه، Props ها، اینترفیس‌ها و امضای توابع را در اختیار AI می‌گذارید تا کدی کاملاً سازگار با پروژه‌تان بنویسد.

**۳. 👥 آنبوردینگ سریع تیم**
اعضای جدید به‌جای خواندن تک‌تک فایل‌ها، در ۵ دقیقه دید کامل به پروژه پیدا می‌کنند.

**۴. 🔍 بررسی سلامت کد**
کامپوننت‌هایی با Props زیاد، توابع بدون مستندسازی و مشکلات ساختاری را سریع پیدا کنید.

</td>
</tr>
</table>

---

## 🚀 Quick Start | شروع سریع

> **Prerequisite | پیش‌نیاز:** [Node.js](https://nodejs.org) v14+ installed | نصب Node.js نسخه ۱۴ یا بالاتر

### 1️⃣ Copy the files | فایل‌ها را کپی کن

Place `analyze_ts.bat` and `analyze_ts.js` inside your project's `src` folder:

فایل‌های `analyze_ts.bat` و `analyze_ts.js` را داخل پوشه `src` پروژه‌تان کپی کنید:

```
your-project/
└── src/
    ├── analyze_ts.bat   ← put here | این‌جا قرار بده
    ├── analyze_ts.js    ← put here | این‌جا قرار بده
    └── ...               (your existing source files)
```

<details>
<summary>💡 Why inside <code>src</code>? | چرا داخل <code>src</code>؟</summary>
<br>

- Only your actual source code gets analyzed | فقط فایل‌های اصلی پروژه تحلیل می‌شوند
- `node_modules`, `dist`, `build`, `.git` are automatically excluded | این پوشه‌ها به‌طور خودکار نادیده گرفته می‌شوند
- Smaller, faster, more precise reports | گزارش دقیق‌تر، سریع‌تر و سبک‌تر

</details>

### 2️⃣ Run the script | اسکریپت را اجرا کن

Double-click `analyze_ts.bat` inside the `src` folder. A terminal window opens and scans your files — this takes just a few seconds.

روی `analyze_ts.bat` داخل پوشه `src` دو بار کلیک کنید. یک پنجره ترمینال باز شده و فایل‌ها را اسکن می‌کند — چند ثانیه بیشتر طول نمی‌کشد.

### 3️⃣ View the report | گزارش را ببین

`code_map_report.txt` is created in the same `src` folder and opens automatically in Notepad.

فایل `code_map_report.txt` در همان پوشه `src` ساخته می‌شود و به‌طور خودکار در Notepad باز می‌شود.

🎉 **Done!** Share this file with ChatGPT, Claude, Copilot, or any AI for far more accurate help.

🎉 **تمام!** این فایل را با ChatGPT، Claude، Copilot یا هر AI دیگری به اشتراک بگذارید تا دقیق‌تر کمکتان کند.

---

## 📊 Sample Output | نمونه خروجی

```
╔══════════════════════════════════════════════════╗
║        TYPESCRIPT/TSX CODE MAP REPORT             ║
║              Generated Automatically               ║
╚══════════════════════════════════════════════════╝

📂 Project Root: C:\my-react-app\src
📅 Generated: 7/14/2026, 10:30:00 AM
──────────────────────────────────────────────────────────
📊 STATISTICS | آمار
──────────────────────────────────────────────────────────
Files analyzed:     24
React Components:   12
Functions:          18
Interfaces:         15
Types:              7
Total entities:     52

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

🔧 FUNCTION: groupServices
📍 Location: Line 45
📥 INPUTS: services: any[]
📤 OUTPUT: GroupedService[]

──────────────────────────────────────────────────────────
📋 Interfaces & Types in this file
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
   • disabled?: boolean
```

---

## 🤖 Using the Report with AI | استفاده از گزارش با هوش مصنوعی

When asking ChatGPT, Claude, or Copilot for help, paste the contents of `code_map_report.txt` along with a prompt like:

هنگام درخواست کمک از ChatGPT، Claude یا Copilot، محتوای فایل `code_map_report.txt` را همراه با یک پرامپت مانند زیر کپی کنید:

```
Here is the code map of my project. Use it as context to understand
my components, props, and function signatures before answering.

[ paste code_map_report.txt content here ]

My question: ...
```

---

## 🛠️ Troubleshooting | رفع اشکال

**If the terminal window closes instantly with no output:**

1. Open a terminal (type `cmd` in the Start menu)
2. Drag and drop `analyze_ts.bat` into the terminal window
3. Press <kbd>Enter</kbd>
4. You'll now see the error message — copy it for support

**اگر پنجره ترمینال سریع بسته شد و نتیجه‌ای نداد:**

۱. یک پنجره CMD باز کنید (در Start منو بنویسید `cmd`)
۲. فایل `analyze_ts.bat` را با موس بکشید و داخل پنجره CMD رها کنید
۳. کلید <kbd>Enter</kbd> را بزنید
۴. اکنون پیام خطا نمایش داده می‌شود — آن را برای پشتیبانی کپی کنید

---

<div align="center">

Made for developers who want AI tools to actually understand their codebase.

</div>
