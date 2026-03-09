# HP Registration API

**Base URL:** `http://localhost:8000` (local) | `https://hp-registration-api.onrender.com` (production)

**Swagger Docs:** `{BASE_URL}/docs`

---

## POST `/register`

Register a group with one or more members. Generates QR codes and sends 3 emails per member.

### Rules

- First member **must** have an email (primary contact)
- Other members: email and phone are **optional**
- If a member has no email, their QR code is sent to the first member's email
- All data is sent in **one request** after the form is fully filled

### Request

```json
{
  "country": "DE",
  "karyakarta": "John Doe",
  "terms_accepted": true,
  "members": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "gender": "male",
      "dob": "1990-05-15",
      "email": "john@example.com",
      "phone": "+491234567890"
    },
    {
      "first_name": "Jane",
      "last_name": "Doe",
      "middle_name": "",
      "gender": "female",
      "dob": "1992-08-20"
    },
    {
      "first_name": "Bob",
      "last_name": "Smith",
      "gender": "male",
      "dob": "1985-03-10",
      "email": "bob@example.com"
    }
  ]
}
```

### Success Response — `200 OK`

```json
{
  "success": true,
  "reference": "HP-2026-00001",
  "member_count": 3,
  "payment_url": "https://checkout.stripe.com/pay/cs_live_..."
}
```

### Error Responses

**400 — Validation error:**

```json
{
  "detail": "First member must have an email address"
}
```

**400 — Terms not accepted:**

```json
{
  "detail": "Terms and conditions must be accepted"
}
```

**400 — Country quota exceeded:**

```json
{
  "detail": "Registration limit reached for country DE. Only 5 spots remain."
}
```

---

## Payment Flow

Registration creates a `payments` record with status `pending`. The user is redirected to Stripe or PayPal to complete payment.

### Supported Payment Methods

- `stripe`
- `paypal`

### Payment Statuses

| Status    | Description                          |
| --------- | ------------------------------------ |
| `pending` | Payment created, awaiting completion |
| `paid`    | Payment confirmed via webhook        |
| `failed`  | Payment failed or was cancelled      |

### POST `/webhook/stripe`

Stripe webhook endpoint. Receives payment events and updates the `payments` table.

- Sets `status` to `paid` or `failed`
- Sets `transaction_id` from Stripe
- Sets `paid_at` timestamp on success
- Triggers confirmation emails on successful payment

### POST `/webhook/paypal`

PayPal webhook endpoint. Same behavior as Stripe webhook.

---

## Country Quotas

Each country has a maximum member limit. The API checks quota **against paid registrations only** (via `get_paid_member_count` RPC) before allowing new registrations.

| Country        | Code | Max Members |
| -------------- | ---- | ----------- |
| Germany        | `DE` | 100         |
| Austria        | `AT` | 50          |
| Switzerland    | `CH` | 50          |
| United Kingdom | `GB` | 30          |
| United States  | `US` | 20          |
| India          | `IN` | 30          |
| New Zealand    | `NZ` | 20          |

---

## What happens after a successful registration?

1. A `payments` record is created with status `pending` and the calculated amount
2. The user is redirected to Stripe/PayPal to complete payment
3. On successful payment (via webhook):
   - Each member gets a unique ticket number (e.g. `HP-2026-00001-M1`, `HP-2026-00001-M2`)
   - A QR code is generated for each member (encodes their ticket number)
   - **3 emails** are sent per member:
     - **Registration confirmation** — ticket number + QR code image
     - **Travel guide** — event travel information
     - **WhatsApp & Instagram** — social media QR codes to connect
   - If a member has no email, all 3 emails go to the first member's email instead

---

## GET `/health`

Health check endpoint.

### Response — `200 OK`

```json
{
  "status": "ok"
}
```
