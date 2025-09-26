import React from "react";
import { Box, Typography, Container, Divider, Grid, Paper } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";

const About = () => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Paper
      elevation={16}
      sx={{
        p: { xs: 4, md: 7 },
        borderRadius: 8,
        bgcolor: "white",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Tiêu đề */}
      <Typography
        variant="h3"
        component="h1"
        fontWeight={900}
        gutterBottom
        sx={{
          textAlign: "center",
          fontSize: { xs: "2.4rem", md: "3.4rem" },
          mb: 1.5,
          fontFamily: "Inter, sans-serif",
          background: "linear-gradient(90deg, #00bcd4, #0097a7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Giới thiệu hệ thống đặt sân thể thao
      </Typography>

      <Divider
        sx={{
          mb: 5,
          mt: 3,
          height: "3px",
          width: "90px",
          mx: "auto",
          borderRadius: 2,
          background: "linear-gradient(90deg, #e0f7fa 0%, #00bcd4 50%, #e0f7fa 100%)",
        }}
      />

      {/* SECTION 1 */}
      <Box component="section" sx={{ mb: 6 }}>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            lineHeight: 1.9,
            color: "#333",
            fontSize: "1.08rem",
            textAlign: "justify",
          }}
        >
          <b>FPT Sports Field (FSF)</b> là nền tảng đặt sân thể thao trực tuyến hàng đầu, giúp
          người dùng dễ dàng tìm kiếm, đặt lịch và quản lý các sân bóng đá, cầu lông, tennis, và
          bóng rổ. Sứ mệnh của chúng tôi là mang đến trải nghiệm đặt sân{" "}
          <b>nhanh chóng, minh bạch và tiện lợi</b> nhất cho mọi đối tượng khách hàng.
        </Typography>
      </Box>

      {/* SECTION 2 */}
      <Box component="section" sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mt: 2,
            mb: 2,
            color: "#333",
            borderBottom: "2px solid #00bcd4",
            pb: 1,
            display: "inline-block",
          }}
        >
          🚀 Tính năng nổi bật
        </Typography>

        <Box component="ul" sx={{ listStyleType: "none", pl: 0, mb: 3 }}>
          {[
            { icon: <SportsSoccerIcon color="primary" />, text: "Đặt sân 24/7 với giao diện thân thiện, dễ dùng trên cả di động và máy tính." },
            { icon: <PaymentIcon color="primary" />, text: "Thanh toán linh hoạt (ví điện tử, VNPAY, tiền mặt) nhanh chóng và an toàn." },
            { icon: <StarIcon color="primary" />, text: "Quản lý lịch sử đặt sân, đánh giá và phản hồi chất lượng dịch vụ." },
            { icon: <GroupIcon color="primary" />, text: "Ghép trận (Matchmaking) giúp tìm đối thủ hoặc đồng đội nhanh chóng." },
            { icon: <BarChartIcon color="primary" />, text: "Giải pháp cho chủ sân: quản lý bảo trì, thiết bị, và thống kê doanh thu." },
          ].map((item, idx) => (
            <Typography
              key={idx}
              component="li"
              variant="body1"
              sx={{
                mb: 2,
                color: "#555",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.2,
                borderRadius: 2,
                transition: "all 0.25s",
                "&:hover": { bgcolor: "#f0fafc" }, // đổi nhẹ màu hover
              }}
            >
              {item.icon}
              {item.text}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* SECTION 3 */}
      <Box component="section">
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mt: 4,
            mb: 2,
            color: "#333",
            borderBottom: "2px solid #00bcd4",
            pb: 1,
            display: "inline-block",
          }}
        >
          👥 Đội ngũ phát triển & Liên hệ
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: "#4a4a4a" }}>
          Chúng tôi là đội ngũ lập trình viên trẻ từ FPT, đam mê ứng dụng công nghệ để nâng cao trải
          nghiệm thể thao cộng đồng.
        </Typography>

        <Grid container spacing={4} sx={{ mb: 3 }}>
          {[
            {
              title: "Liên hệ hỗ trợ",
              lines: ["Email: support@fsf.vn", "Hotline: 0374.857.068"],
            },
            {
              title: "Địa chỉ",
              lines: ["Trường Đại học FPT Hà Nội", "Km29, Đại lộ Thăng Long, Thạch Thất, Hà Nội"],
            },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Box
                sx={{
                  p: 3,
                  borderLeft: "5px solid #00bcd4",
                  bgcolor: "#e0f7fa",
                  borderRadius: 3, // tăng nhẹ
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 18px rgba(0, 188, 212, 0.25)",
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} color="#00bcd4" sx={{ mb: 0.5 }}>
                  {item.title}:
                </Typography>
                {item.lines.map((line, i) => (
                  <Typography key={i} variant="body2" color="#4a4a4a">
                    {line}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>


      <Divider sx={{ my: 5, borderColor: "#ccc" }} />  {/* đổi màu divider */}

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "rgba(0, 188, 212, 0.05)", // thêm nền mờ xanh nhạt
          py: 2,
          borderRadius: 2,
          borderTop: "1px solid #eee",
        }}
      >
        <Typography
          variant="body2"
          align="center"
          sx={{ fontWeight: 600, color: "#555" }}
        >
          © {new Date().getFullYear()} FPT Sports Field. All rights reserved.
        </Typography>
      </Box>
    </Paper>
  </Container>
);

export default About;