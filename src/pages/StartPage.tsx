import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Pages } from "../Routes";
import imgHowToPlay from "../assets/mafia-how-to-play.png";
import imgModeratorGuid from "../assets/mafia-moderator-guid.png";
import imgRolesGuid from "../assets/mafia-roles-guid.png";
import imgFAQ from "../assets/mafia-faq.png";
import { Loop, SmartToy } from "@mui/icons-material";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <Grid container p={2} direction="column">
      <Typography variant="h3" p={3} textAlign="center">
        مافیا
      </Typography>
      <Grid container gap={2} mt={2} flexDirection={"column"}>
        <Grid>
          <MenuCard
            description="اجرای آخرین بازی انجام شده"
            icon={() => <Loop style={{ width: 100, height: 50 }} />}
            title="بازی دوباره"
            onClick={() => {}}
          />
        </Grid>
        <Grid>
          <MenuCard
            description="بازی‌های ذخیره شده یا طراحی بازی جدید از ابتدا"
            icon={() => <SmartToy style={{ width: 100, height: 50 }} />}
            title="بازی جدید"
            onClick={() => {}}
          />
        </Grid>
      </Grid>
      <Grid container gap={2} mt={2}>
        <MenuCard
          title="چگونه بازی کنیم"
          description="یک راهنمای ساده برای شروع"
          image={imgHowToPlay}
          onClick={() => {
            navigate(Pages.HowToPlayPage());
          }}
        />
        <MenuCard
          title="چگونه بازی گردانی کنیم"
          description="راز و رمز یک بازی‌گردان حرفه‌ای"
          image={imgModeratorGuid}
          onClick={() => {
            navigate(Pages.ModeratorGuidePage());
          }}
        />
        <MenuCard
          title="نقش‌های بازی"
          description="با نقش‌های بازی بیشتر آشنا شوید"
          image={imgRolesGuid}
          onClick={() => {
            navigate(Pages.RolesPage());
          }}
        />
        <MenuCard
          title="پرسش‌های پر تکرار"
          description="همه همین پرسش‌ها می‌پرسند!"
          image={imgFAQ}
          onClick={() => {
            navigate(Pages.FAQPage());
          }}
        />
      </Grid>
    </Grid>
  );
}

function MenuCard(attrs: {
  title: string;
  description: string;
  image?: string;
  icon?: any;
  onClick: () => void;
}) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea
        onClick={attrs.onClick}
        sx={{ display: "flex", width: "100%" }}
      >
        <CardMedia
          component={attrs.icon ? attrs.icon : "img"}
          sx={{ width: 100 }}
          image={attrs.image}
          alt={attrs.title}
        />

        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {attrs.title}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {attrs.description}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
