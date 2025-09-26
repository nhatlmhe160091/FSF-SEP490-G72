import React from "react";
import { Box, Typography, Container, Divider, Grid, Paper } from "@mui/material";

// Component giới thiệu (About Page) của hệ thống đặt sân thể thao FPT Sports Field
const About = () => (
  // Container giới hạn chiều rộng nội dung và thêm padding dọc
  <Container maxWidth="md" sx={{ py: 8 }}>
    {/* Paper bọc nội dung, tạo hiệu ứng thẻ nổi bật với bóng và bo góc lớn hơn */}
    <Paper 
      elevation={16} // Tăng độ nổi khối thêm một chút
      sx={{ 
        p: { xs: 4, md: 7 }, // Tăng padding để nội dung thoáng hơn
        borderRadius: 4, 
        bgcolor: 'white', 
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)', // Tăng độ bóng
      }}
    >
      
      {/* Tiêu đề chính của trang */}
      <Typography 
        variant="h3" 
        component="h1"
        fontWeight={900} // Cực kỳ đậm
        color="#00bcd4" 
        gutterBottom
        sx={{ 
          textAlign: 'center', 
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          mb: 1.5,
          fontFamily: 'Inter, sans-serif' 
        }}
      >
        Giới thiệu hệ thống đặt sân thể thao
      </Typography>
      
      {/* Đường phân cách lớn, thêm hiệu ứng gradient nhẹ */}
      <Divider sx={{ mb: 5, mt: 3, background: 'linear-gradient(90deg, #e0f7fa 0%, #00bcd4 50%, #e0f7fa 100%)', height: '3px', width: '80px', mx: 'auto' }} />
      
      {/* SECTION 1: Giới thiệu chung */}
      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: '#333', fontSize: '1.05rem' }}>
          **FPT Sports Field (FSF)** là nền tảng đặt sân thể thao trực tuyến hàng đầu, giúp người dùng dễ dàng tìm kiếm, đặt lịch và quản lý các sân bóng đá, cầu lông, tennis, và bóng rổ. Sứ mệnh của chúng tôi là mang đến trải nghiệm đặt sân **nhanh chóng, minh bạch và tiện lợi** nhất cho mọi đối tượng khách hàng, từ cá nhân đến các câu lạc bộ thể thao.
        </Typography>
      </Box>
      
      {/* SECTION 2: Tính năng nổi bật */}
      <Box component="section" sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mt: 2, mb: 2, color: '#333', borderBottom: '2px solid #00bcd4', pb: 1, display: 'inline-block' }}>
          🚀 Tính năng nổi bật:
        </Typography>
        {/* Sử dụng Box cho danh sách, tối ưu hóa CSS cho list items */}
        <Box component="ul" sx={{ listStyleType: 'none', pl: 0, mb: 3 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1.5, color: '#555', display: 'flex', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: '#00bcd4', mr: 2, fontSize: '1.2rem', fontWeight: 700 }}>1.</Box>
            **Đặt sân 24/7:** Đặt sân trực tuyến mọi lúc, mọi nơi với giao diện thân thiện, dễ sử dụng trên cả di động và máy tính.
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5, color: '#555', display: 'flex', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: '#00bcd4', mr: 2, fontSize: '1.2rem', fontWeight: 700 }}>2.</Box>
            **Thanh toán linh hoạt:** Hỗ trợ đa dạng phương thức (ví điện tử, VNPAY, tiền mặt tại sân) đảm bảo giao dịch an toàn và nhanh chóng.
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5, color: '#555', display: 'flex', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: '#00bcd4', mr: 2, fontSize: '1.2rem', fontWeight: 700 }}>3.</Box>
            **Quản lý & Đánh giá:** Dễ dàng theo dõi lịch sử đặt sân, gửi đánh giá (rating) và phản hồi chất lượng dịch vụ.
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5, color: '#555', display: 'flex', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: '#00bcd4', mr: 2, fontSize: '1.2rem', fontWeight: 700 }}>4.</Box>
            **Hỗ trợ ghép trận (Matchmaking):** Tính năng độc quyền giúp người chơi nhanh chóng tìm đối thủ hoặc đồng đội.
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1.5, color: '#555', display: 'flex', alignItems: 'flex-start' }}>
            <Box component="span" sx={{ color: '#00bcd4', mr: 2, fontSize: '1.2rem', fontWeight: 700 }}>5.</Box>
            **Giải pháp cho chủ sân:** Công cụ toàn diện quản lý bảo trì, thiết bị, và thống kê doanh thu theo thời gian thực.
          </Typography>
        </Box>
      </Box>

      {/* SECTION 3: Đội ngũ và Liên hệ */}
      <Box component="section">
        <Typography variant="h5" fontWeight={700} sx={{ mt: 4, mb: 2, color: '#333', borderBottom: '2px solid #00bcd4', pb: 1, display: 'inline-block' }}>
          👥 Đội ngũ phát triển & Liên hệ
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: '#4a4a4a' }}>
          Chúng tôi là đội ngũ lập trình viên trẻ tuổi từ FPT, đam mê ứng dụng công nghệ để giải quyết các vấn đề thực tế trong cộng đồng thể thao.
        </Typography>
        
        {/* Thông tin liên hệ và địa chỉ (sử dụng Grid) */}
        <Grid container spacing={4} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              p: 3, 
              borderLeft: '5px solid #00bcd4', 
              bgcolor: '#e0f7fa', 
              borderRadius: 2, 
              transition: 'all 0.3s', 
              '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 15px rgba(0, 188, 212, 0.2)' } // Hiệu ứng nổi
            }}>
              <Typography variant="subtitle1" fontWeight={700} color="#00bcd4" sx={{ mb: 0.5 }}>Liên hệ hỗ trợ:</Typography>
              <Typography variant="body2" color="#4a4a4a">Email: **support@fsf.vn**</Typography>
              <Typography variant="body2" color="#4a4a4a">Hotline: **0374.857.068**</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ 
              p: 3, 
              borderLeft: '5px solid #00bcd4', 
              bgcolor: '#e0f7fa', 
              borderRadius: 2,
              transition: 'all 0.3s', 
              '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 15px rgba(0, 188, 212, 0.2)' } // Hiệu ứng nổi
            }}>
              <Typography variant="subtitle1" fontWeight={700} color="#00bcd4" sx={{ mb: 0.5 }}>Địa chỉ:</Typography>
              <Typography variant="body2" color="#4a4a4a">Trường Đại học FPT Hà Nội</Typography>
              <Typography variant="body2" color="#4a4a4a">Km29, Đại lộ Thăng Long, Thạch Thất, Hà Nội</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Divider sx={{ my: 5, borderColor: '#ccc' }} />
      
      {/* Bản quyền (Footer) */}
      <Typography variant="body2" color="text.secondary" align="center" sx={{ fontWeight: 600, color: '#777' }}>
        &copy; {new Date().getFullYear()} FPT Sports Field. All rights reserved.
      </Typography>
      
    </Paper>
  </Container>
);

export default About;
