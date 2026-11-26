import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Chip,
  Rating,
  Stack,
  Typography,
  Dialog,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";




export default function Product({ searchQuery = "", onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const url = process.env.REACT_APP_BACKEND_URL;
  //const CATEGORIES = ["All", "Groceries", "Electronics", "Dress"];

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const fetchProduct = async () => {
    const p_url = url + "product/all-products";

    const result = await fetch(p_url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const response = await result.json();
    setProducts(response);
  };

  const fetchCategorries = async() =>{
    const result = await fetch(url+"product/all-category", {
      method:"GET",
      headers: {
        Accept: "application/json",
      }

    });

    const res = await result.json()

    const categoryNames = ["All", ...res.map((category) => category.name)];

    setCategories(categoryNames);


  }


  useEffect(() => {
    fetchProduct();
    fetchCategorries();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box id="catalog" sx={{ mt: 6, mb: 8 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Product Catalog
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredProducts.length} available item(s)
          </Typography>
        </Box>

        {/* Category Filter Chips */}
        <Stack direction="row" spacing={1}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              onClick={() => setSelectedCategory(category)}
              sx={{
                fontWeight: 600,
                bgcolor: selectedCategory === category ? "#0f172a" : "#fff",
                color: selectedCategory === category ? "#fff" : "#475569",
                border: "1px solid",
                borderColor: selectedCategory === category ? "#0f172a" : "#e2e8f0",
                "&:hover": {
                  bgcolor: selectedCategory === category ? "#1e293b" : "#f1f5f9",
                },
              }}
            />
          ))}
        </Stack>
      </Stack>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  bgcolor: "#fff",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "#cbd5e1",
                    boxShadow: "0 12px 24px -10px rgba(15, 23, 42, 0.12)",
                    "& .product-img": {
                      transform: "scale(1.04)",
                    },
                  },
                }}
              >
                {/* Image Wrapper with Floating Badge & Wishlist */}
                <Box sx={{ position: "relative", overflow: "hidden", bgcolor: "#f1f5f9" }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.name}
                    className="product-img"
                    onClick={() => setPreviewProduct(product)}
                    sx={{
                      objectFit: "cover",
                      cursor: "zoom-in",
                      transition: "transform 0.35s ease",
                    }}
                  />

                  {product.badge && (
                    <Chip
                      label={product.badge}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor: "#0f172a",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        borderRadius: 1.5,
                      }}
                    />
                  )}

                  <IconButton
                    onClick={() => toggleWishlist(product.id)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "rgba(255,255,255,0.9)",
                      "&:hover": { bgcolor: "#fff" },
                    }}
                  >
                    {isWishlisted ? (
                      <FavoriteIcon fontSize="small" sx={{ color: "#e11d48" }} />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" sx={{ color: "#475569" }} />
                    )}
                  </IconButton>
                </Box>

                {/* Product Details */}
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {product.category}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mt: 0.5,
                      mb: 1,
                      lineHeight: 1.35,
                      color: "#0f172a",
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* Rating Row */}
                  <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 2 }}>
                    <Rating
                      value={product.rating}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      ({product.reviews})
                    </Typography>
                  </Stack>

                  {/* Pricing Row */}
                  <Stack direction="row" alignItems="baseline" spacing={1}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 800, color: "#0f172a" }}
                    >
                      ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "#94a3b8",
                        }}
                      >
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>

                {/* Action Footer */}
                <Box sx={{ px: 2.5, pb: 2.5 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    onClick={() => onAddToCart?.(product)}
                    sx={{
                      bgcolor: "#0f172a",
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: 600,
                      py: 1.1,
                      borderRadius: 2,
                      "&:hover": { bgcolor: "#1e293b" },
                    }}
                  >
                    Add to Bag
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Blurred Backdrop Image Pop-up */}
      <Dialog
        open={Boolean(previewProduct)}
        onClose={() => setPreviewProduct(null)}
        maxWidth="md"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(8px)",
            },
          },
          paper: {
            sx: {
              position: "relative",
              bgcolor: "#fff",
              borderRadius: 3,
              p: 2,
              overflow: "hidden",
              boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.35)",
            },
          },
        }}
      >
        <IconButton
          onClick={() => setPreviewProduct(null)}
          size="small"
          aria-label="Close image preview"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 1,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            "&:hover": { bgcolor: "#fff" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {previewProduct && (
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={previewProduct.image}
              alt={previewProduct.name}
              sx={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: 2,
                mx: "auto",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mt: 1.5, color: "#0f172a" }}
            >
              {previewProduct.name}
            </Typography>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}