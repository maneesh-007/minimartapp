import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart({
  open,
  onClose,
  cart,
  onRemoveItem,
  totalItems,
  totalPrice,
  onCheckout,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 380 }, p: 3 } }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" fontWeight={800}>
          Shopping Bag ({totalItems})
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {cart.length === 0 ? (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <ShoppingBagOutlinedIcon
            sx={{ fontSize: 48, color: "#cbd5e1", mb: 1 }}
          />
          <Typography variant="body1" fontWeight={600} color="text.secondary">
            Your bag is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add items from the catalog to get started.
          </Typography>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {cart.map((item) => (
              <ListItem
                key={item.id}
                disableGutters
                secondaryAction={
                  <IconButton edge="end" onClick={() => onRemoveItem(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={700}>
                      {item.name}
                    </Typography>
                  }
                  secondary={`Qty: ${item.qty} × ₹${item.price.toLocaleString("en-IN")}`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Subtotal
            </Typography>
            <Typography variant="h6" fontWeight={800}>
              ₹{totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </Typography>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            size="large"
            disableElevation
            onClick={onCheckout}
            sx={{
              bgcolor: "#0f172a",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              py: 1.3,
              "&:hover": { bgcolor: "#1e293b" },
            }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Drawer>
  );
}