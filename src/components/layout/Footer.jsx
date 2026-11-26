import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Link,
  Divider,
} from "@mui/material";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Featured", href: "#catalog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const accountLinks = [
    { label: "Login", href: "/login" },
    { label: "Sign In", href: "/signin" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0f172a",
        color: "#cbd5e1",
        mt: 8,
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 2 }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  color: "#0f172a",
                  width: 34,
                  height: 34,
                  borderRadius: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.05rem",
                }}
              >
                M
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}
              >
                MINI MART
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{ color: "#94a3b8", maxWidth: 360, lineHeight: 1.65 }}
            >
              Your neighborhood pocket store — daily groceries, snacks, and genuine home electronics delivered straight to your doorstep.
            </Typography>
          </Grid>

          {/* Explore Links */}
          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#fff",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Explore
            </Typography>
            <Stack spacing={1.25}>
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  underline="none"
                  sx={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Account & Support Links */}
          <Grid size={{ xs: 6, sm: 4, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#fff",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Account & Support
            </Typography>
            <Stack spacing={1.25}>
              {accountLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  underline="none"
                  sx={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Typography variant="body2" sx={{ color: "#64748b", pt: 0.5 }}>
                support@minimart.in • +91 98765 43210
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 4 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="caption" sx={{ color: "#64748b" }}>
            © {new Date().getFullYear()} Mini Mart. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748b" }}>
            Free Express Delivery on orders above ₹499
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}