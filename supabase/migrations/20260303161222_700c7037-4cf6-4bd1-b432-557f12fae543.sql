-- Allow service role to delete newsletter subscribers
CREATE POLICY "Service role can delete subscribers"
ON public.newsletter_subscribers
FOR DELETE
USING (true);

-- Allow service role to select newsletter subscribers
CREATE POLICY "Service role can select subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (true);