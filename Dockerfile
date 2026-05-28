FROM python:3.9-slim

WORKDIR /app

# Salin file requirements backend
COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Salin folder backend dan model
COPY backend /app/backend
COPY model /app/model


WORKDIR /app/backend

EXPOSE 7860

# Jalankan server Flask menggunakan Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
