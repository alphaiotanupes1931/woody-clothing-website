CREATE TABLE public.order_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  product_name text NOT NULL,
  size text,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.order_exceptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on order_exceptions"
  ON public.order_exceptions
  FOR ALL
  TO public
  USING (false)
  WITH CHECK (false);