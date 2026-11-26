import { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Button,
  Paper,
  Chip,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Cart from "../layout_parts/Cart";
import Product from "../layout_parts/Product";

export default function Home() {
  const backend_url = process.env.BACKEND_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToastMessage(`Added "${product.name}" to your bag`);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCheckout = () => {
    // Add checkout navigation or order logic here
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
        minHeight: "100vh",
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Navigation */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalCartItems={totalCartItems}
        onOpenCart={() => setDrawerOpen(true)}
      />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 3, flexGrow: 1 }}>
        {/* Hero Banner Section */}
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            color: "#fff",
            backgroundImage: `linear-gradient(95deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.72) 55%, rgba(15, 23, 42, 0.35) 100%), url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=85")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box sx={{ px: { xs: 3, sm: 6, md: 8 }, py: { xs: 6, md: 9 }, maxWidth: 680 }}>
            <Chip
              label="EVERYDAY ESSENTIALS & ELECTRONICS"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.14)",
                color: "#e2e8f0",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
                mb: 2,
                backdropFilter: "blur(4px)",
              }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.25rem", md: "3.25rem" },
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                mb: 1.5,
              }}
            >
              Mini Mart
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#cbd5e1",
                fontWeight: 400,
                mb: 4,
                lineHeight: 1.5,
              }}
            >
              Welcome to Mini Mart — curated daily groceries, snacks, and home electronics delivered straight to your doorstep.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                href="#catalog"
                sx={{
                  bgcolor: "#fff",
                  color: "#0f172a",
                  fontWeight: 700,
                  textTransform: "none",
                  px: 3.5,
                  py: 1.4,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                Shop Catalog
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* Value Proposition Strip */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "#eff6ff",
                  color: "#1d4ed8",
                  display: "flex",
                }}
              >
                <LocalMallOutlinedIcon />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  Mini Store
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  One Pocket Store — compact, fast & effortless
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "#f0fdf4",
                  color: "#15803d",
                  display: "flex",
                }}
              >
                <AllInclusiveIcon />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  A to Z
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All your needs fulfilled here under one roof
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "#fefce8",
                  color: "#a16207",
                  display: "flex",
                }}
              >
                <VerifiedOutlinedIcon />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  Genuine Quality
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100% authentic products with assured warranty
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Product Catalog Section */}
        <Box id="catalog">
          <Product searchQuery={searchQuery} onAddToCart={handleAddToCart} />
        </Box>
      </Container>

      {/* Footer */}
      <Footer />

      {/* Slide-out Shopping Bag Drawer */}
      <Cart
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        totalItems={totalCartItems}
        totalPrice={totalCartPrice}
        onCheckout={handleCheckout}
      />

      {/* Add-to-Bag Feedback Notification */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={2500}
        onClose={() => setToastMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToastMessage("")}
          severity="success"
          variant="filled"
          sx={{ bgcolor: "#0f172a", borderRadius: 2 }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}