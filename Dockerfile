FROM python:3.9-slim

# Atur direktori kerja
WORKDIR /app

# Salin file requirements backend
COPY backend/requirements.txt .

# Install dependencies (menggunakan versi ringan PyTorch CPU)
RUN pip install --no-cache-dir -r requirements.txt

# Salin folder backend dan model
COPY backend /app/backend
COPY model /app/model

# Pindah ke folder backend agar app.py bisa dijalankan dari sana
WORKDIR /app/backend

# Buka port 7860 (Hugging Face Spaces mewajibkan aplikasi berjalan di port ini)
EXPOSE 7860

# Jalankan server Flask menggunakan Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
