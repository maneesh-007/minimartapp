import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Chip,
  alpha,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Inventory2 as ProductIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  RestartAlt as ResetIcon,
} from "@mui/icons-material";

const CATEGORIES = [
  "Electronics",
  "Apparel & Fashion",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books & Media",
  "Other",
];

const INITIAL_FORM_STATE = {
  name: "",
  price: "",
  originalPrice: "",
  category: "",
  description: "",
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          border: "1px solid",
          borderColor: "error.light",
          borderRadius: 3,
          bgcolor: (theme) => alpha(theme.palette.error.main, 0.04),
        }}
      >
        <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Something went wrong
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {error?.message || "An unexpected error occurred. Please contact the Administrator."}
        </Typography>
        <Button variant="outlined" color="error" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      </Paper>
    </Container>
  );
}

export default function AddProduct() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast({
        open: true,
        message: "Please upload a valid image file (PNG, JPG, WEBP).",
        severity: "error",
      });
      return;
    }
    setImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleImageSelect(file);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setImageFile(null);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Enter a valid selling price";
    if (
      formData.originalPrice &&
      Number(formData.originalPrice) < Number(formData.price)
    ) {
      newErrors.originalPrice = "Original price should be greater than or equal to selling price";
    }
    if (!formData.category) newErrors.category = "Please select a category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("price", String(parseFloat(formData.price) || 0));
      payload.append(
        "originalPrice",
        String(parseFloat(formData.originalPrice) || 0)
      );
      payload.append("category", formData.category);
      payload.append("status", "true");
      payload.append("description", formData.description.trim());

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const result = await fetch("http://localhost:8000/product/add", {
        method: "POST",
        body: payload,
      });

      const response = await result.json();
      console.log(response);

      if (!result.ok) {
        throw new Error(response?.message || "Failed to add product");
      }

      setToast({
        open: true,
        message: "Product added to catalog successfully!",
        severity: "success",
      });
      handleReset();
    } catch (err) {
      console.error(err);
      setToast({
        open: true,
        message: err.message || "Network error while saving product.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const discountPercent =
    Number(formData.originalPrice) > Number(formData.price) &&
    Number(formData.price) > 0
      ? Math.round(
          ((Number(formData.originalPrice) - Number(formData.price)) /
            Number(formData.originalPrice)) *
            100
        )
      : 0;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    display: "flex",
                  }}
                >
                  <ProductIcon />
                </Box>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  Add New Product
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Create a new item listing, configure pricing, and upload product media.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ResetIcon />}
                onClick={handleReset}
                disabled={loading}
                sx={{
                  bgcolor: "background.paper",
                  borderColor: "divider",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                onClick={handleAddProduct}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <SuccessIcon />
                  )
                }
                sx={{
                  px: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.25)",
                }}
              >
                {loading ? "Saving..." : "Publish Product"}
              </Button>
            </Stack>
          </Stack>

          <Box component="form" onSubmit={handleAddProduct} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        General Information
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                      >
                        Basic details that help customers identify your product.
                      </Typography>

                      <Stack spacing={2.5}>
                        <TextField
                          fullWidth
                          required
                          label="Product Name"
                          placeholder="e.g., Wireless Noise-Canceling Headphones"
                          value={formData.name}
                          onChange={handleChange("name")}
                          error={Boolean(errors.name)}
                          helperText={errors.name}
                        />

                        <TextField
                          select
                          fullWidth
                          required
                          label="Category"
                          value={formData.category}
                          onChange={handleChange("category")}
                          error={Boolean(errors.category)}
                          helperText={errors.category}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CategoryIcon fontSize="small" color="action" />
                              </InputAdornment>
                            ),
                          }}
                        >
                          {CATEGORIES.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Product Description"
                          placeholder="Write a compelling description highlighting key features, materials, and specifications..."
                          value={formData.description}
                          onChange={handleChange("description")}
                        />
                      </Stack>
                    </CardContent>
                  </Card>

                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 0.5 }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          Pricing
                        </Typography>
                        {discountPercent > 0 && (
                          <Chip
                            label={`${discountPercent}% OFF`}
                            color="success"
                            size="small"
                            sx={{ fontWeight: 700 }}
                          />
                        )}
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                      >
                        Set the selling price and optional compare-at retail price.
                      </Typography>

                      <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            required
                            type="number"
                            label="Selling Price"
                            placeholder="0.00"
                            inputProps={{ step: "0.01", min: "0" }}
                            value={formData.price}
                            onChange={handleChange("price")}
                            error={Boolean(errors.price)}
                            helperText={errors.price}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MoneyIcon fontSize="small" color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Original Price (Compare at)"
                            placeholder="0.00"
                            inputProps={{ step: "0.01", min: "0" }}
                            value={formData.originalPrice}
                            onChange={handleChange("originalPrice")}
                            error={Boolean(errors.originalPrice)}
                            helperText={
                              errors.originalPrice ||
                              "Leave blank if not on sale"
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MoneyIcon fontSize="small" color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Product Media
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2.5 }}
                      >
                        Upload a high-resolution cover photo.
                      </Typography>

                      {!imagePreview ? (
                        <Box
                          component="label"
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleDrop}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 4,
                            borderRadius: 2.5,
                            border: "2px dashed",
                            borderColor: isDragging
                              ? "primary.main"
                              : "divider",
                            bgcolor: (theme) =>
                              isDragging
                                ? alpha(theme.palette.primary.main, 0.06)
                                : alpha(theme.palette.action.hover, 0.4),
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            textAlign: "center",
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, 0.04),
                            },
                          }}
                        >
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) =>
                              handleImageSelect(e.target.files?.[0])
                            }
                          />
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: "50%",
                              bgcolor: "background.paper",
                              boxShadow: 1,
                              mb: 1.5,
                              color: "primary.main",
                            }}
                          >
                            <CloudUploadIcon fontSize="medium" />
                          </Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Click to upload or drag & drop
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            PNG, JPG, or WEBP (Max 5MB)
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          component="label"
                          sx={{
                            display: "block",
                            cursor: "pointer",
                            borderRadius: 2.5,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) =>
                              handleImageSelect(e.target.files?.[0])
                            }
                          />
                          <Box
                            component="img"
                            src={imagePreview}
                            alt="Product Preview"
                            sx={{
                              width: "100%",
                              height: 240,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          <Divider />
                          <Typography
                            variant="caption"
                            noWrap
                            sx={{
                              display: "block",
                              px: 2,
                              py: 1,
                              bgcolor: "background.paper",
                              fontWeight: 500,
                            }}
                          >
                            {imageFile?.name} (click to change)
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>

                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Visibility & Status
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 1.5 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Storefront Status
                        </Typography>
                        <Chip
                          label="Active"
                          color="success"
                          variant="outlined"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={4500}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ErrorBoundary>
  );
}