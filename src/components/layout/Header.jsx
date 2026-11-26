import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Badge,
  IconButton,
  InputBase,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Featured", href: "#catalog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header({
  searchQuery,
  setSearchQuery,
  totalCartItems,
  onOpenCart,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Strip */}
      <Box
        sx={{
          bgcolor: "#0f172a",
          color: "#f8fafc",
          py: 0.75,
          px: 2,
          textAlign: "center",
          fontSize: "0.75rem",
          letterSpacing: "0.04em",
          fontWeight: 500,
        }}
      >
        FREE EXPRESS DELIVERY ON ORDERS ABOVE ₹499 &nbsp;•&nbsp; INSTANT STORE PICKUP AVAILABLE
      </Box>

      {/* Main Sticky Navigation Bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #e2e8f0",
          color: "#0f172a",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2, py: 0.75 }}>
            {/* Mobile Hamburger Button */}
            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, color: "#0f172a" }}
              aria-label="open navigation menu"
            >
              <MenuIcon />
            </IconButton>

            {/* Brand Logo */}
            <Stack
              component="a"
              href="/"
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ textDecoration: "none", color: "inherit", flexShrink: 0 }}
            >
              <Box
                sx={{
                  bgcolor: "#0f172a",
                  color: "#fff",
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                M
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a" }}
              >
                MINI MART
              </Typography>
            </Stack>

            {/* Desktop Navigation Links */}
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { xs: "none", md: "flex" }, ml: 1 }}
            >
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: "#334155",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    textTransform: "none",
                    px: 1.5,
                    borderRadius: 1.5,
                    "&:hover": { bgcolor: "#f1f5f9", color: "#0f172a" },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            {/* Search Input */}
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 380,
                display: "flex",
                alignItems: "center",
                bgcolor: "#f1f5f9",
                borderRadius: 2,
                px: 1.75,
                py: 0.45,
                border: "1px solid transparent",
                transition: "all 0.2s",
                "&:focus-within": {
                  bgcolor: "#fff",
                  borderColor: "#0f172a",
                  boxShadow: `0 0 0 3px ${alpha("#0f172a", 0.08)}`,
                },
              }}
            >
              <SearchIcon sx={{ color: "#64748b", mr: 1, fontSize: 19 }} />
              <InputBase
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: "100%", fontSize: "0.875rem" }}
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }} />

            {/* Desktop Auth Buttons (Login / Sign In) */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", sm: "flex" }, flexShrink: 0 }}
            >
              <Button
                href="/login"
                sx={{
                  color: "#0f172a",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  px: 1.75,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                disableElevation
                href="/signin"
                sx={{
                  bgcolor: "#0f172a",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  px: 2,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#1e293b" },
                }}
              >
                Sign In
              </Button>
            </Stack>

            {/* Cart Trigger */}
            <IconButton
              onClick={onOpenCart}
              sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                px: 1.5,
                py: 0.8,
                gap: 1,
                color: "#0f172a",
                flexShrink: 0,
                "&:hover": { bgcolor: "#f1f5f9" },
              }}
            >
              <Badge badgeContent={totalCartItems} color="primary">
                <ShoppingBagOutlinedIcon fontSize="small" />
              </Badge>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, display: { xs: "none", lg: "block" } }}
              >
                Bag
              </Typography>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { width: 270, bgcolor: "#fff", p: 2 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            MINI MART
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 1 }} />

        <List disablePadding>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                sx={{ borderRadius: 1.5 }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "0.95rem" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.25}>
          <Button
            fullWidth
            variant="outlined"
            href="/login"
            sx={{
              borderColor: "#cbd5e1",
              color: "#0f172a",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            href="/signin"
            sx={{
              bgcolor: "#0f172a",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Sign In
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}