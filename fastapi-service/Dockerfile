# 1. Imagen base Python
FROM python:3.11-slim

WORKDIR /app

# 2. Copiar requirements e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copiar el código de la app
COPY ./app ./app

# 4. Exponer puerto y arrancar Uvicorn
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
