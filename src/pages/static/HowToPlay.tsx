import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Divider, Paper, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RoleDetails from "../../data/static/roles.data";

export default function HowToPlayPage() {
  return (
    <Paper style={{ margin: 5, padding: 15 }}>
      <Stack>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h5">مافیا چیه؟</Typography>
        </Divider>
        <Typography variant="subtitle1">
          مافیا یک بازی گروهیه که بین دو تیم اصلی انجام می‌شه:
          <br />- <strong>مافیا</strong>
          <br />- <strong>شهروندها</strong>
          <br />
          هدف هر تیم اینه که تیم مقابل رو کامل حذف کنه. بازی توی شب و روز به‌صورت نوبتی انجام می‌شه.
        </Typography>
      </Stack>

      <Stack>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h5">هدف بازی</Typography>
        </Divider>
        <Typography variant="subtitle1">
          - شهروندها وقتی برنده می‌شن که تمام مافیاها حذف بشن.
          <br />- مافیا زمانی برنده می‌شه که تعدادشون با شهروندهای زنده برابر بشه.
        </Typography>
      </Stack>

      <Stack gap={1}>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h5">روند بازی (چرخه روز و شب)</Typography>
        </Divider>
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
      </Stack>

      <Stack>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h5">رأی‌گیری و حذف بازیکن</Typography>
        </Divider>
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
      </Stack>

      <Stack>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h5">شرایط برد</Typography>
        </Divider>
        <Typography variant="subtitle1">
          - شهروندها : وقتی تمام مافیاها حذف بشن.
          <br />- مافیاها : وقتی تعدادشون با شهروندها برابر بشه.
        </Typography>
      </Stack>

      <Stack>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h5">نکته‌های کمکی</Typography>
        </Divider>
        <Typography variant="subtitle1">
          - به بحث‌ها خوب گوش بده، سعی کن استدلال بیاری نه احساس.
          <br />
          - فقط به پرحرف یا ساکت بودن توجه نکن، رفتار کلی رو بسنج.
          <br />
          - از رأی دادن نترس، ولی مسئولانه رأی بده.
          <br />- اگه نقش خاص داری، با احتیاط بازی کن که لو نری!
        </Typography>
      </Stack>

      <Stack gap={1}>
        <Divider sx={{ my: 2 }}>
          <Typography variant="h5">نقش‌های بازی</Typography>
        </Divider>
        <Typography variant="h6">تیم مافیا :</Typography>
        {RoleDetails.map(
          (role) =>
            role.side === "MAFIA" && (
              <Accordion key={role.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    <strong>{role.name}</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle1">{role.longDescription}</Typography>
                </AccordionDetails>
              </Accordion>
            )
        )}
        <Typography variant="h6" mt={1}>
          تیم شهروند :
        </Typography>
        {RoleDetails.map(
          (role) =>
            role.side === "TOWN" && (
              <Accordion key={role.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    <strong>{role.name}</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle1">{role.longDescription}</Typography>
                </AccordionDetails>
              </Accordion>
            )
        )}
      </Stack>
    </Paper>
  );
}
