import { Accordion, AccordionDetails, AccordionSummary, Card, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function HowToPlayPage() {
  return (
    <>
      <Card>
        <Typography variant="h4" textAlign="center">
          راهنمای بازی
        </Typography>
      </Card>

      <Card>
        <Typography variant="h5">مافیا چیه؟</Typography>
        <Typography variant="subtitle1">
          مافیا یک بازی گروهیه که بین دو تیم اصلی انجام می‌شه:
          <br />- <strong>شهروندها</strong>
          <br />- <strong>مافیا</strong>
          <br />
          هدف هر تیم اینه که تیم مقابل رو کامل حذف کنه. بازی توی شب و روز به‌صورت نوبتی انجام می‌شه.
        </Typography>
      </Card>

      <Card>
        <Typography variant="h5">هدف بازی</Typography>
        <Typography variant="subtitle1">
          - شهروندها وقتی برنده می‌شن که تمام مافیاها حذف بشن.
          <br />- مافیا زمانی برنده می‌شه که تعدادشون با شهروندهای زنده برابر بشه.
        </Typography>
      </Card>

      <Card>
        <Typography variant="h5">روند بازی (چرخه روز و شب)</Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <strong>شب</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1">
              - همه بازیکن‌ها چشم‌هاشونو می‌بندن.
              <br />
              - نقش‌های خاص (مثل مافیا، دکتر، کارآگاه...) بیدار می‌شن و نقش خودشونو اجرا می‌کنن.
              <br />- یکی ممکنه کشته بشه، یکی نجات پیدا کنه، و اطلاعاتی جابه‌جا شه.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <strong>روز</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1">
              - همه چشم‌ها باز می‌شه و درباره اتفاقات شب بحث می‌کنن.
              <br />
              - هدف: پیدا کردن مافیا بین بازیکن‌ها با تحلیل رفتار و حرف‌ها.
              <br />- در پایان، رأی‌گیری انجام می‌شه و ممکنه کسی به دفاعیه بره.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card>
        <Typography variant="h5">رأی‌گیری و حذف بازیکن</Typography>
        <Typography variant="subtitle1">
          - بازیکنی که بیشترین رأی رو بیاره، به دفاعیه می‌ره.
          <br />
          - دفاعیه اجرا می‌شه، سپس رأی‌گیری مجدد:
          <br />
          - اگه یک نفر توی دفاع باشه، رأی‌گیری با چشم باز انجام می‌شه.
          <br />
          - اگه چند نفر باشن، رأی‌گیری با چشم بسته انجام می‌شه.
          <br />- بازنده حذف می‌شه و ممکنه بسته به نقشش، «حرکت آخر» داشته باشه.
        </Typography>
      </Card>

      <Card>
        <Typography variant="h6">شرایط برد</Typography>
        <Typography variant="subtitle1">
          - شهروندها می‌برن: وقتی تمام مافیاها حذف بشن.
          <br />
          - مافیاها می‌برن: وقتی تعدادشون با شهروندها برابر بشه.
          <br />- (نقش‌های خاص ممکنه شرایط برد متفاوتی داشته باشن)
        </Typography>
      </Card>

      <Card>
        <Typography variant="h5">نکته‌های کمکی</Typography>
        <Typography variant="subtitle1">
          - به بحث‌ها خوب گوش بده، سعی کن استدلال بیاری نه احساس.
          <br />
          - فقط به پرحرف یا ساکت بودن توجه نکن، رفتار کلی رو بسنج.
          <br />
          - از رأی دادن نترس، ولی مسئولانه رأی بده.
          <br />- اگه نقش خاص داری، با احتیاط بازی کن که لو نری!
        </Typography>
      </Card>
    </>
  );
}
