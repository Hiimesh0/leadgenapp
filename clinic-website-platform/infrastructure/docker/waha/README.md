# WAHA Docker Container Setup & Operations

This directory contains the Docker configuration for running **WAHA (WhatsApp HTTP API)** using the official `devlikeapro/waha:latest` image.

## Quick Start
```bash
docker compose -f ../docker-compose.yml up -d
```

## Environment Variables
Copy `.env.example` to `.env` and configure your permanent secret keys.
- `WAHA_API_KEY`: Fixed secret key for server-to-server API communication.
- `WHATSAPP_DEFAULT_ENGINE`: `WEBJS`
- `WAHA_DASHBOARD_ENABLED`: `true`
- `WAHA_DASHBOARD_USERNAME`: `admin`
- `WAHA_DASHBOARD_PASSWORD`: Strong password for QR code pairing.

