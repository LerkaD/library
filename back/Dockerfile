FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
ENV POETRY_VERSION=1.6.1

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    default-mysql-client \
    curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml poetry.lock* ./

RUN pip install "poetry==$POETRY_VERSION" && \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

COPY . .

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
