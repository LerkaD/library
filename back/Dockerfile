# FROM python:3.12-slim

# ENV POETRY_VERSION=1.6.1
# ENV POETRY_NO_INTERACTION=1
# ENV PYTHONUNBUFFERED=1

# ENV POETRY_VIRTUALENVS_CREATE=true
# ENV POETRY_VIRTUALENVS_IN_PROJECT=true

# RUN apt-get update && apt-get install -y --no-install-recommends \
#     gcc \
#     default-libmysqlclient-dev \
#     build-essential \
#     pkg-config \
#     default-mysql-client \
#     && rm -rf /var/lib/apt/lists/*

# ENV PATH="/root/.local/bin:/app/.venv/bin:$PATH"
# RUN pip install "poetry==$POETRY_VERSION"


# WORKDIR /app

# COPY pyproject.toml poetry.lock /app/
# RUN poetry install --no-root --only main

# COPY . /app/

# EXPOSE 8000
# CMD ["/app/.venv/bin/python", "manage.py", "runserver", "0.0.0.0:8000"]


FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
ENV POETRY_VERSION=1.6.1

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc=4:13.2.0-7ubuntu1 \
    default-libmysqlclient-dev=8.0.36-0ubuntu0.24.04.1 \
    build-essential=12.10ubuntu1 \
    pkg-config=1.8.1-1ubuntu2 \
    default-mysql-client=8.0.36-0ubuntu0.24.04.1 \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /venv \
    && /venv/bin/pip install --upgrade pip \
    && /venv/bin/pip install "poetry==$POETRY_VERSION"

ENV PATH="/venv/bin:$PATH"

WORKDIR /app

COPY pyproject.toml poetry.lock /app/

RUN poetry config virtualenvs.create false \
    && poetry install --no-root --only main

COPY . /app/

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
