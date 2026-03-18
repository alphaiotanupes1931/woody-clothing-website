-- Remove "Kream" truncated artifact items (duplicates of "KREAM Dry-Fit Polo")
DELETE FROM order_items WHERE product_name = 'Kream';