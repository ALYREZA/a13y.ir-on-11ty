---
layout: layouts/post.njk
title: ایده‌ای برای اپلیکیشن های بانکی
draft: false
date: 2023-02-08
tags:
 - idea
 - application
---

## این ایده ای که می خوام در موردش بنویسم از کجا شکل گرفت ؟
وقتی تو ماشین خطی نشسته بودم که برسم به خونه هر کدوم از سرنشین ها شماره کارت راننده رو میپرسیدم که براش کارت به کارت کنن

اگه می شد شماره کارت راننده به صورت QR کد در میومد و وقتی سرنشین ها اسکن‌ش میکردن هدایت‌ش میکرد به اپ بانکی خودشون که در موبایل‌شون هست.  
من این موضوع رو برای اپ همراه کارت چک کردم که بتونم شماره کارت رو به صورت scheme بفرستم  
برای اینکه بدونیم همراه کارت از چه اسکیمی استفاده می کنه کافیه وقتی گوشی اندرویدمون به کامپیوترمون وصله و بیلدتولز اندروید هم روی سیستممون داریم کامند زیر رو اجرا کنیم :  
```
adb shell dumpsys package com.adpdigital.mbs.ayande
```

برای اینکه بفهمیم اپلیکیشن آی دی ش چیه می تونیم از سایت کافه بازار استفاده کنیم :
```
https://cafebazaar.ir/app/com.adpdigital.mbs.ayande
```

در ضمن بعضی اپ های اپلیکیشن آی دیشون در کافه بازار و گوگل پلی فرق میکنه، بعد از اینکه اپلیکیشن آی دیش رو پیدا کردید و کامند بالا رو اجرا کردید، یه تعداد زیادی خروجی میبینید در ترمینالتون کافیه به بالاترین بخش مراجعه کنید که نوشته `Activity Resolver Table:`  که زیرمجموعه ای داره به نام `Schemes`  

```
Activity Resolver Table:
  Full MIME Types:
      vnd.android.cursor.item/com.adpdigital.mbs.ayande:
        20f2ab1 com.adpdigital.mbs.ayande/.ui.startup.StartupActivity filter 7845304
          Action: "android.intent.action.VIEW"
          Category: "android.intent.category.DEFAULT"
          StaticType: "vnd.android.cursor.item/com.adpdigital.mbs.ayande"

  Base MIME Types:
      vnd.android.cursor.item:
        20f2ab1 com.adpdigital.mbs.ayande/.ui.startup.StartupActivity filter 7845304
          Action: "android.intent.action.VIEW"
          Category: "android.intent.category.DEFAULT"
          StaticType: "vnd.android.cursor.item/com.adpdigital.mbs.ayande"

  Schemes:
      hamrahcard:
        20f2ab1 com.adpdigital.mbs.ayande/.ui.startup.StartupActivity filter 1c51317
          Action: "android.intent.action.VIEW"
          Category: "android.intent.category.DEFAULT"
          Category: "android.intent.category.BROWSABLE"
          Scheme: "hamrahcard"
      http:
        20f2ab1 com.adpdigital.mbs.ayande/.ui.startup.StartupActivity filter dbac0ed
          Action: "android.intent.action.VIEW"
          Category: "android.intent.category.DEFAULT"
          Category: "android.intent.category.BROWSABLE"
          Scheme: "https"
          Scheme: "http"
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Path: "PatternMatcher{LITERAL: /tup}"
          Path: "PatternMatcher{LITERAL: /tkh}"
          Path: "PatternMatcher{LITERAL: /pck}"
          Path: "PatternMatcher{LITERAL: /c2c}"
          Path: "PatternMatcher{LITERAL: /bil}"
          Path: "PatternMatcher{LITERAL: /bal}"
          Path: "PatternMatcher{LITERAL: /chr}"
          Path: "PatternMatcher{LITERAL: /qr}"
          Path: "PatternMatcher{LITERAL: /add}"
          Path: "PatternMatcher{LITERAL: /wac}"
          Path: "PatternMatcher{LITERAL: /tup}"
          Path: "PatternMatcher{LITERAL: /pck}"
          Path: "PatternMatcher{LITERAL: /c2c}"
          Path: "PatternMatcher{LITERAL: /bil}"
          Path: "PatternMatcher{LITERAL: /bal}"
          Path: "PatternMatcher{LITERAL: /chr}"
          Path: "PatternMatcher{LITERAL: /qr}"
          Path: "PatternMatcher{LITERAL: /add}"
          Path: "PatternMatcher{LITERAL: /giftPage}"
          Path: "PatternMatcher{LITERAL: /giftPage}"
          Path: "PatternMatcher{LITERAL: /contacts}"
          Path: "PatternMatcher{LITERAL: /contacts}"
          Path: "PatternMatcher{LITERAL: /chargeWallet}"
          Path: "PatternMatcher{LITERAL: /mrch}"
      https:
        20f2ab1 com.adpdigital.mbs.ayande/.ui.startup.StartupActivity filter dbac0ed
          Action: "android.intent.action.VIEW"
          Category: "android.intent.category.DEFAULT"
          Category: "android.intent.category.BROWSABLE"
          Scheme: "https"
          Scheme: "http"
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Authority: "i.hamrahcard.ir": -1
          Path: "PatternMatcher{LITERAL: /tup}"
          Path: "PatternMatcher{LITERAL: /tkh}"
          Path: "PatternMatcher{LITERAL: /pck}"
          Path: "PatternMatcher{LITERAL: /c2c}"
          Path: "PatternMatcher{LITERAL: /bil}"
          Path: "PatternMatcher{LITERAL: /bal}"
          Path: "PatternMatcher{LITERAL: /chr}"
          Path: "PatternMatcher{LITERAL: /qr}"
          Path: "PatternMatcher{LITERAL: /add}"
          Path: "PatternMatcher{LITERAL: /wac}"
          Path: "PatternMatcher{LITERAL: /tup}"
          Path: "PatternMatcher{LITERAL: /pck}"
          Path: "PatternMatcher{LITERAL: /c2c}"
          Path: "PatternMatcher{LITERAL: /bil}"
          Path: "PatternMatcher{LITERAL: /bal}"
          Path: "PatternMatcher{LITERAL: /chr}"
          Path: "PatternMatcher{LITERAL: /qr}"
          Path: "PatternMatcher{LITERAL: /add}"
          Path: "PatternMatcher{LITERAL: /giftPage}"
          Path: "PatternMatcher{LITERAL: /giftPage}"
          Path: "PatternMatcher{LITERAL: /contacts}"
          Path: "PatternMatcher{LITERAL: /contacts}"
          Path: "PatternMatcher{LITERAL: /chargeWallet}"
          Path: "PatternMatcher{LITERAL: /mrch}"

```
خب وقتی دقیق تر بررسی کنیم می بینیم که سه تا اسکیم داره  
```
hamrahcard
http
https
```
اون اولی که کار خاصی نمیکنه فقط اپ رو باز میکنه ولی اون دوتای بعدی که شبیه به هم هستن می تونن دستوراتی رو اجرا کنن   
فقط یه نکته ای داره این که در اندروید 12 شما باید به اپ همراه کارت اجازه باز کردن اسکیم های `https` رو بدید ولی در اندرویدهای پایین تر یه پاپ آپ باز میشه که به شما میگه دست داری با کدوم اپ باز کنم این آدرس رو.  
برای مثل ما میخوام قسمت کارت به کارت رو باز کنیم برای اینکار کافیه کامند زیر رو اجرا کنیم:  
```
adb shell am start -W -a android.intent.action.VIEW -d "https://i.hamrahcard.ir/c2c" 
```

# خب حالا که چی ؟
من دوست داشتم می تونستم شماره کارت هم بهش پاس میدادم مثلا اینطوری : 
```
adb shell am start -W -a android.intent.action.VIEW -d "https://i.hamrahcard.ir/c2c?to=2222222222222222" 
```

که دیگه زحمت شماره زدن رو نکشیم و اینکه از اسکیم `hamrahcard` استفاده بشه که با اسکیم دیفالت مرورگرها قاطی نشه  

همین...




















