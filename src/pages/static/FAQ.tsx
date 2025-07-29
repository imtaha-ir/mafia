import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function FAQPage() {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            در چه زمانی از بازی می‌تونم صحبت کنم یا رأی بدم؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            در بازی مافیا، شما تا زمانی که هویت خودتان را مشخص نکرده باشید،
            نمی‌توانید صحبت کنید یا رای بده اما هنگامی که هویت خودتان را مشخص
            کنید (و یا در صورت آنکه هویت خودتان را مشخص نکرده باشید اما با این
            که متوجه شده باشید که یک مافیا هستید)، می‌توانید صحبت کنید و رای
            بدهید
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>اگر از بازی حذف بشم، هنوز می‌تونم صحبت کنم؟</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            خیر اگر حذف بشوید اجازه ی هیچگونه صحبت ندارید و فقط تماشاچی ادامهٔ
            بازی هستید
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>آیا مافیاها همدیگه رو می‌شناسن؟</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            بعد از پخش شدن کارت ها و مشخص شدن نقش های بازیکن ها،در شب اول که
            خدای بازی اجازه ی بیدار شدن مافیا را میدهد،همه ی مافیاها بیدار
            میشنود و یکدیگر را میشناسند
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>چه کسی برنده می‌شه؟</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            شهروندان تنها در صورتی برنده میشوند که تمام اعضای مافیا را بکشند و
            تیم مافیا در صورتی برنده میشوند که تعدادشان برابر با شهروندان شوند
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>آیا می‌تونم نقش خودم رو به دیگران بگم؟</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            خیر در صورت افشای نقش خود توسط خدای بازی از بازی حذف میشوید
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>چه اتفاقی میوفته اگر ارتباطم قطع بشه؟</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            اگر تا حداکثر یک دقیقه نتوانید دوباره ارتباط خود را با سرور
            برگردانید از بازی حذف میشوید
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
