# WAHA (WhatsApp HTTP API) Dockerfile
# Leverages the official supported WAHA image by devlikeapro
FROM devlikeapro/waha:latest

# Ensure default environment defaults are populated
ENV WHATSAPP_DEFAULT_ENGINE=WEBJS
ENV WAHA_PRINT_QR=true
ENV WAHA_DASHBOARD_ENABLED=true
ENV WAHA_LOG_LEVEL=info

# Expose default HTTP API port
EXPOSE 3000

# Volume mount point for persistent session tokens
VOLUME ["/app/.sessions"]
