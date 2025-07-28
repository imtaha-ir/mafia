import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ModeratorGuidePage() {
  return (
    <Paper>
      <Box>
        <Typography variant="h4">راهنمای گرداننده بازی</Typography>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">گرداننده بازی کیه ؟</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1">
            گاد بازی یا همون گرداننده بازی کسیه که روند بازی مافیا را مدیریت
            میکنه، مطمئن میشه تمام مراحل درست اجرا میشن و قوانین منصفانه رعایت
            میشن، گاد خودش بازیکن نیست ولی از اول تا آخر بازی جریان بازی رو
            هدایت میکنه.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">وظایف اصلی گرداننده بازی</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1">
            <ul>
              <li>تعیین نقش ها و توضیح قوانین قبل از شروع بازی</li>
              <li>اجرای فازهای شب و روز به ترتیب</li>
              <li>ثبت عملکردها و تصمیمات (مثل قتل یا بررسی‌ها)</li>
              <li>حفظ نظم و عدالت در بازی</li>
              <li>جلوگیری از لو رفتن اطلاعات تصادفی</li>
              <li>مدیریت نقش‌های خاص و حل تعارض‌ها</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
   
          <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">راهنمای اجرای فاز شب</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="subtitle1"
          >
            در فاز شب، همه‌ی بازیکنان چشم‌های خود را می‌بندند و مجری به صورت
            مخفیانه نقش‌های ویژه را یکی‌یکی بیدار می‌کند تا عمل خود را انجام
            دهند. این بخش بر راز و تدبیر استوار است.
          </Typography>
        </AccordionDetails>
      </Accordion>
          
          <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">مراحل گام به گام فاز شب</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">
            <ol >
              <li>اعلام شروع شب </li>
              <ul>
                <li> مجری می‌گوید: «شب شد، همه چشم‌ها را ببندید.</li>
              </ul>
              <li>بیدار کردن مافیا</li>
              <ul>
                <li> پرسش: «چه کسی را می‌خواهید حذف کنید؟»</li>
                <li>
                  
                  اعضای مافیا بدون صحبت، با اشاره فرد مورد نظر را انتخاب
                  می‌کنند.
                </li>
                <li>مجری یادداشت می‌کند و هیچ اطلاعاتی افشا نمی‌شود.</li>
              </ul>
              <li>بیدار کردن دکتر (در صورت وجود)</li>
              <ul>
                <li> پرسش: «چه کسی را می‌خواهید نجات دهید؟»</li>
                <li> دکتر یک نفر را انتخاب می‌کند (حتی ممکن است خودش باشد).</li>
                <li>مجری یادداشت میکند </li>
              </ul>
              <li>بیدار کردن کارآگاه </li>
              <ul>
                <li> پرسش: «می‌خواهی چه کسی را بررسی کنی؟»</li>
                <li> کارآگاه یک نفر را انتخاب می‌کند.</li>
                <li>
                  
                  مجری به صورت بی‌صدا اطلاع می‌دهد که آیا آن فرد عضو مافیاست یا
                  نه.
                </li>
              </ul>
              <li>بررسی نتایج و حل تعارض ها </li>
              <ul>
                <li>
                  
                  اگر مافیا کسی را هدف قرار دهد و دکتر همان فرد را نجات دهد →
                  فرد زنده می‌ماند.
                </li>
                <li> اگر دکتر کس دیگری را نجات دهد → فرد هدف کشته می‌شود. </li>
                <li>
                  
                  اگر کارآگاه فردی را بررسی کند که در همان شب کشته شود → اطلاعات
                  همچنان باید ارائه شود.
                </li>
              </ul>
              <li>اعلام طلوع روز </li>
              <ul>
                <li> مجری می‌گوید: «صبح شد...» </li>
                <li> اعلام می‌کند چه کسی (اگر کسی) حذف شده است.</li>
                <li> نقش فرد افشا نمی‌شود، مگر طبق قوانین خاص بازی.</li>
              </ul>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">  راهنمای اجرای فاز روز</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
          <Typography
            variant="subtitle1"
          >
            در فاز روز، بازیکنان بیدار می‌شوند، اتفاقات شب گذشته را بررسی
            می‌کنند و وارد بحث و تصمیم‌گیری برای شناسایی مافیاها می‌شوند. این
            مرحله پر از استدلال، استنتاج و رأی‌گیری است.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"> مراحل گام به گام فاز روز</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="subtitle2">
            <ol >
              <li>اعلام اتفاقات شب </li>
              <ul>
                <li>
                  
                  گرداننده‌ی بازی گزارش می‌دهد که چه کسی در شب حذف شده است.
                </li>
                <li>
                 
                  نقش بازیکن حذف‌شده می‌تواند افشا شود یا نشود (بسته به قوانین
                  بازی).
                </li>
              </ul>
              <li> مدیریت بحث و گفتگو</li>
              <ul>
                <li>
               
                  بازیکنان نظرات، شک‌ها و تحلیل‌های خود را به اشتراک می‌گذارند.
                </li>
                <li> بحث‌ها باید منطقی و با احترام انجام شود.</li>
                <li>می‌توان زمان مشخصی برای گفتگو تعیین کرد.</li>
              </ul>
              <li>رای گیری</li>
              <ul>
                <li> همه‌ی بازیکنان به یکی از نامزدها رأی می‌دهند.</li>
                <li> بیشترین رأی منجر به حذف بازیکن می‌شود.</li>
                <li>
                  
                  در صورت تساوی، بسته به قوانین: حذف نمی‌شود یا رأی‌گیری مجدد
                  انجام می‌گیرد.
                </li>
              </ul>
              <li>اعلام حذف بازیکن </li>
              <ul>
                <li> گرداننده‌ی بازی اعلام می‌کند که چه کسی حذف شده است.</li>
                <li>
                
                  نقش او می‌تواند افشا شود یا مخفی بماند (بسته به سبک بازی).
                </li>
              </ul>
              <li>آغاز فاز شب </li>
              <ul>
                <li>
                  
                  با پایان روز، گرداننده اعلام می‌کند که شب شروع شده است.
                </li>
                <li> همه بازیکنان چشم‌های خود را می‌بندند. </li>
              </ul>
            </ol>
          </Typography>
      
        </AccordionDetails>
      </Accordion> 
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"> 
            تعامل نقش های ویژه در بازی</Typography>
        </AccordionSummary>
        <AccordionDetails>
   <Typography
            variant="subtitle1"
           
          >
            این نقش‌ها باعث پیچیدگی و جذابیت بیشتر بازی می‌شن. قدرت‌هاشون گاهی
            با هم تداخل دارن و موقعیت‌های غیرقابل‌پیش‌بینی ایجاد می‌کنن.
          </Typography>
          <Typography
            variant="inherit"
            
          >
            نقش ها
          </Typography>
          <Typography variant="subtitle2">
            <ol >
              <li>پدرخوانده</li>
              <ul>
                <li>
                  در برابر نقش‌هایی مثل کارآگاه یا کلانتر بی‌گناه به نظر می‌رسه.
                  شناسایی‌ش سخت‌تره.
                </li>
              </ul>
              <li> کارآگاه</li>
              <ul>
                <li>
                  هر شب یک نفر رو بررسی می‌کنه. ممکنه در برابر پدرخوانده اشتباه
                  کنه.
                </li>
              </ul>
              <li>دکتر</li>
              <ul>
                <li>
                  از یک بازیکن محافظت می‌کنه. ممکنه ناخواسته مافیا رو نجات بده
                  یا جلوی آدمکش رو بگیره
                </li>
              </ul>
              <li>آدمکش (Vigilante)</li>
              <ul>
                <li>
                  شب‌ها می‌تونه بکشه. خطرناکه اگه اشتباهی یکی از مردم عادی رو
                  بزنه.
                </li>
              </ul>
              <li>دلقک (Jester)</li>
              <ul>
                <li>
                  اگه در روز اعدام بشه، برنده می‌شه. با ایجاد هرج‌ومرج گروه شهر
                  رو گمراه می‌کنه
                </li>
              </ul>
              <li>مأمور حذف (Executioner)</li>
              <ul>
                <li>
                  باید یک هدف مشخص رو حذف کنه. اگه هدفش با روش دیگه‌ای بمیره،
                  ممکنه به دلقک تبدیل بشه
                </li>
              </ul>
              <li>قاتل سریالی</li>
              <ul>
                <li>
                  هر شب یک نفر رو حذف می‌کنه. هدفش برد انفرادیه. ممکنه نسبت به
                  مافیا یا دکتر مقاوم باشه
                </li>
              </ul>
              <li>محافظ (Bodyguard)</li>
              <ul>
                <li>
                  اگه موفق بشه کسی رو نجات بده، خودش کشته می‌شه. ممکنه با مافیا
                  یا آدمکش درگیر بشه
                </li>
              </ul>
              <li>شهردار</li>
              <ul>
                <li>
                  قدرت رأی اضافی داره. می‌تونه روند رأی‌گیری رو تغییر بده یا
                  نقشش رو آشکار کنه.
                </li>
              </ul>
              <li>جادوگر (Witch)</li>
              <ul>
                <li>
                  می‌تونه کنترل عملکرد یک نفر رو در شب به دست بگیره. ممکنه باعث
                  اشتباه در عملکرد مافیا یا مردم بشه
                </li>
              </ul>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
          
         
          <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">  تداخل های مهم بین نقش ها</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="subtitle2">
            <ul >
              <li>
                کارآگاه و پدرخوانده: ممکنه کارآگاه، پدرخوانده رو بی‌گناه نشون
                بده و شهر رو فریب بده.
              </li>
              <li>
              
                دکتر و آدمکش: دکتر ممکنه هدف مافیا رو نجات بده، درحالی‌که آدمکش
                اشتباهی فرد عادی رو بکشه.
              </li>
              <li>
           
                دلقک و شهر: دلقک از مشکوک بودن سود می‌بره. شهر نباید فریب خورد و
                اشتباهی حذفش کنه.
              </li>
              <li>
               
                مأمور حذف و شهر: هدف مأمور حذف ممکنه با منطق شهر تضاد داشته باشه
                و باعث سردرگمی بشه.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6"> 
            نکات کلیدی برای حل تعارض ها در بازی</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
          <Typography
            variant="subtitle1"
          >
            چه مجری بازی باشی، چه بازیکن، حل تعارض‌ها باعث می‌شه بازی منصفانه و
            لذت‌بخش باقی بمونه.
          </Typography>
          <Typography
            variant="inherit"
            
          >
            در طول بازی
          </Typography>
          <Typography variant="subtitle2">
            <ul >
              <li>
           
                قوانین رو قبل از شروع مشخص کن: مخصوصاً با نقش‌های سفارشی، مطمئن
                شو همه قدرت‌ها و شرایط برد رو می‌دونن.
              </li>
              <li>
           
                از مجری بی‌طرف استفاده کن: مجری باید بازی رو هدایت کنه، نه اینکه
                روی تصمیم‌ها تأثیر بذاره.
              </li>
              <li>
     
                بحث محترمانه تشویق کن: تأکید کن که منطق مهمه، نه حمله شخصی.
              </li>
              <li>
       
                زمان‌بندی تعیین کن: جلوی سلطه‌ی بازیکن‌های پرحرف رو بگیر و بازی
                رو منظم نگه دار.
              </li>
            </ul>
          </Typography>
          <Typography
            variant="inherit"
        
          >
            خارج از بازی
          </Typography>
          <Typography variant="subtitle2">
            <ul >
              <li>
              
                بعد از بازی گفت‌وگو داشته باش: بازیکن‌ها می‌تونن تجربیاتشون رو
                بگن و سوءتفاهم‌ها رو برطرف کنن.
              </li>
              <li>
                
                از روش «تو گفتی، من شنیدم» استفاده کن: کمک می‌کنه بازیکن‌ها
                برداشت خودشون رو با هدف اصلی مقایسه کنن.
              </li>
              <li>
               
                نقش‌ها رو بچرخون: جلوی تکرار تعارض‌ها رو می‌گیره و دیدگاه‌های
                جدیدی می‌ده.
              </li>
              <li>
               
                فضای امن ایجاد کن: اگه کسی احساس ناراحتی یا هدف‌گیری داره، بازی
                رو متوقف کن و بررسی کن.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
          
     
    </Paper>
  );
}
