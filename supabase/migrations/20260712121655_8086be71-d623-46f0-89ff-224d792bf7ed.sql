UPDATE public.tours
SET price = ROUND((price * 150) / 1000.0) * 1000
WHERE price IS NOT NULL AND price < 100000;

UPDATE public.vehicles
SET price_per_day = ROUND((price_per_day * 150) / 500.0) * 500
WHERE price_per_day IS NOT NULL AND price_per_day < 100000;