import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const INITIAL_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: null, // "success" | "error" | null
    message: "",
  });
  const [toastOpen, setToastOpen] = useState(false);

  const baseUrl = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (status.type) {
      setStatus({ type: null, message: "" });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: null, message: "" });

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields before submitting.",
      });
      return;
    }

    setLoading(true);

    try {
      const url = `${baseUrl}/customer/register`;
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.detail || `Registration failed (${response.status})`
        );
      }

      setStatus({
        type: "success",
        message: data.message || "Account created successfully! Welcome aboard.",
      });
      setToastOpen(true);
      setFormData(INITIAL_FORM);
      setFieldErrors({});
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Unable to complete registration. Please try again.",
      });
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.50",
      }}
    >
      <Header />

      <Container maxWidth="sm" sx={{ flex: 1, py: { xs: 4, md: 7 } }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
          }}
        >
          <Stack spacing={1} alignItems="center" textAlign="center" mb={3}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PersonAddOutlinedIcon />
            </Box>
            <Typography component="h1" variant="h5" fontWeight={700}>
              Create Customer Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in your details below to get started.
            </Typography>
          </Stack>

          {status.type && (
            <Alert
              severity={status.type}
              onClose={() => setStatus({ type: null, message: "" })}
              sx={{ mb: 3 }}
            >
              {status.message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="first_name"
                  fullWidth
                  required
                  disabled={loading}
                  value={formData.first_name}
                  onChange={handleChange("first_name")}
                  error={Boolean(fieldErrors.first_name)}
                  helperText={fieldErrors.first_name}
                  autoComplete="given-name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="last_name"
                  fullWidth
                  required
                  disabled={loading}
                  value={formData.last_name}
                  onChange={handleChange("last_name")}
                  error={Boolean(fieldErrors.last_name)}
                  helperText={fieldErrors.last_name}
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  disabled={loading}
                  value={formData.email}
                  onChange={handleChange("email")}
                  error={Boolean(fieldErrors.email)}
                  helperText={fieldErrors.email}
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  fullWidth
                  required
                  disabled={loading}
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  error={Boolean(fieldErrors.phone)}
                  helperText={fieldErrors.phone}
                  autoComplete="tel"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required
                  disabled={loading}
                  value={formData.password}
                  onChange={handleChange("password")}
                  error={Boolean(fieldErrors.password)}
                  helperText={fieldErrors.password || "At least 6 characters"}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                          disabled={loading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                  sx={{ py: 1.3, fontWeight: 600 }}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={toastOpen && Boolean(status.type)}
        autoHideDuration={5000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={status.type || "info"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {status.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}