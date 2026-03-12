CREATE TABLE public.inventory_shipped (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name text NOT NULL,
  shipped boolean NOT NULL DEFAULT false,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(product_name)
);

ALTER TABLE public.inventory_shipped ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on inventory_shipped"
ON public.inventory_shipped
FOR ALL
TO public
USING (false)
WITH CHECK (false);
