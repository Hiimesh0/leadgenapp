# BACKUP_AND_RECOVERY.md — Disaster Recovery & Data Durability
## Persistence Policies, Backup Schedules & Restore Drills

---

## 1. Storage & Persistence Hierarchy

| Data Category | Storage Engine | Location | Durability Strategy |
| :--- | :--- | :--- | :--- |
| **Appointments & Leads** | SQLite (WAL mode) / PostgreSQL | `database/campaigns.db` | Daily snapshot to S3 bucket |
| **WhatsApp Sessions** | File tokens & Chromium state | `/app/.sessions` | Docker persistent volume / disk |
| **Media Assets & Images** | Local WebP / S3 Object Storage | `assets/images/` | Content-hashed immutable files |
| **Audit Logs** | SQLite WAL | `database/campaigns.db` | Append-only audit table |

---

## 2. Automated SQLite Backup Script
```bash
#!/bin/bash
# Hourly SQLite checkpoint and compressed backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/clinic-platform"
mkdir -p "$BACKUP_DIR"

# Safe non-blocking SQLite backup using sqlite3 CLI
sqlite3 /var/data/outreach/campaigns.db ".backup '$BACKUP_DIR/campaigns_$TIMESTAMP.db'"
gzip "$BACKUP_DIR/campaigns_$TIMESTAMP.db"

# Delete backups older than 14 days
find "$BACKUP_DIR" -type f -name "*.db.gz" -mtime +14 -delete
```

---

## 3. Disaster Recovery Restore Procedure
1. Stop the application services: `docker compose down`.
2. Locate the most recent valid backup: `ls -la /var/backups/clinic-platform/`.
3. Uncompress and restore database:
   ```bash
   gunzip -c campaigns_20261105_090000.db.gz > database/campaigns.db
   ```
4. Restart application services: `docker compose up -d`.
5. Run health check probe to confirm database integrity.
